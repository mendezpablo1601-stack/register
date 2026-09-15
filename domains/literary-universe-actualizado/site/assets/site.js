/* =====================================================
   LITERARY UNIVERSE — shared site chrome
   Hamburger constellation menu + generative ambient audio.
   No external audio files: the soundscape is synthesized in
   the browser with the Web Audio API, so there's nothing to
   license or fail to load.
===================================================== */

(function (global) {

    const CATEGORY_LINKS = [
        { name: 'Mecanica',     url: 'mecanica.html',     color: '#ff2b35' },
        { name: 'Vida Marina',  url: 'vida-marina.html',  color: '#20c9e8' },
        { name: 'Arte',         url: 'arte.html',         color: '#e87524' },
        { name: 'Realeza',      url: 'realeza.html',      color: '#b987ff' },
        { name: 'Cosmetologia', url: 'cosmetologia.html', color: '#16c784' },
        { name: 'Dashboard Oceánico', url: 'dashboard-oceanico.html', color: '#6fc2ff' },
    ];

    /* ---------------- Hamburger + constellation menu ---------------- */
    function buildMenu(opts) {
        const chrome = document.createElement('div');
        chrome.id = 'lu-chrome';
        chrome.innerHTML = `
            <div id="lu-audio-toggle" role="button" aria-label="Silenciar música" title="Música ambiental">
                <svg class="lu-wave" viewBox="0 0 24 24"><path d="M3 10v4h4l5 5V5L7 10H3z"/><path d="M16 8.5a4.5 4.5 0 0 1 0 7" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M18.5 6a8 8 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="1.6" opacity="0.6"/></svg>
            </div>
            <div id="lu-hamburger" role="button" aria-label="Abrir menú" aria-expanded="false">
                <div class="lu-line"></div><div class="lu-line"></div><div class="lu-line"></div>
            </div>
        `;
        document.body.appendChild(chrome);

        const menu = document.createElement('div');
        menu.id = 'lu-menu';
        const catItems = CATEGORY_LINKS.map(c => `
            <li><a href="${c.url}" style="color:${opts.activeUrl === c.url ? c.color : ''}">
                <span class="lu-dot" style="background:${c.color}; color:${c.color};"></span>${c.name}
            </a></li>
        `).join('');
        menu.innerHTML = `
            <div id="lu-menu-inner">
                <div id="lu-menu-label">NAVEGAR</div>
                <ul id="lu-menu-primary">
                    <li><a href="index.html">Universo</a></li>
                    <li><a href="manual.html">Manual de marca</a></li>
                    <li><a href="manual-corporativo.html">Manual de identidad</a></li>
                </ul>
                <div id="lu-menu-label">CATEGORÍAS PLANETARIAS</div>
                <ul id="lu-menu-categories">${catItems}</ul>
            </div>
            <div id="lu-menu-close-hint">ESC PARA CERRAR</div>
        `;
        document.body.appendChild(menu);

        const hamburger = document.getElementById('lu-hamburger');
        let open = false;
        function setOpen(v) {
            open = v;
            hamburger.classList.toggle('open', open);
            hamburger.setAttribute('aria-expanded', String(open));
            menu.classList.toggle('open', open);
        }
        hamburger.addEventListener('click', () => setOpen(!open));
        menu.addEventListener('click', (e) => { if (e.target === menu) setOpen(false); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && open) setOpen(false); });
    }

    /* ---------------- Generative ambient audio ---------------- */
    function buildAudio(opts) {
        const toggleBtn = document.getElementById('lu-audio-toggle');
        const STORAGE_KEY = 'lu-audio-muted';
        let muted = localStorage.getItem(STORAGE_KEY) === '1';
        let ctx = null, master = null, started = false;
        const nodes = [];
        const melodyStopFns = [];

        function setIcon() {
            toggleBtn.classList.toggle('muted', muted);
        }
        setIcon();

        function startEngine() {
            if (started) return;
            started = true;
            ctx = new (window.AudioContext || window.webkitAudioContext)();
            master = ctx.createGain();
            master.gain.value = muted ? 0 : 0.14;
            master.connect(ctx.destination);

            // A slow, gentle delay so notes trail off softly instead of stopping hard
            const delay = ctx.createDelay();
            delay.delayTime.value = 0.55;
            const feedback = ctx.createGain();
            feedback.gain.value = 0.32;
            delay.connect(feedback);
            feedback.connect(delay);
            delay.connect(master);

            const warmth = ctx.createBiquadFilter();
            warmth.type = 'lowpass';
            warmth.frequency.value = 2200;
            warmth.connect(master);
            warmth.connect(delay);

            // Base tone derived from the page's theme (root frequency in Hz)
            const root = opts.rootFreq || 110; // A2 by default

            // --- Soft sustained pad underneath, very quiet, just for warmth ---
            const padRatios = opts.chordRatios ? opts.chordRatios.slice(0, 2) : [1, 1.5];
            padRatios.forEach((ratio, i) => {
                const osc = ctx.createOscillator();
                osc.type = 'sine';
                osc.frequency.value = root * ratio * 0.5;
                const gain = ctx.createGain();
                gain.gain.value = 0;
                osc.connect(gain);
                gain.connect(warmth);
                osc.start();
                const lfoRate = 0.045 + Math.random() * 0.03;
                nodes.push({ gain, phase: Math.random() * Math.PI * 2, lfoRate, peak: 0.02 + Math.random() * 0.015 });
            });

            function breathe() {
                const t = ctx.currentTime;
                nodes.forEach(n => {
                    const v = n.peak * (0.5 + 0.5 * Math.sin(t * n.lfoRate * Math.PI * 2 + n.phase));
                    n.gain.gain.setTargetAtTime(v, t, 0.6);
                });
                requestAnimationFrame(breathe);
            }
            breathe();

            // --- Gentle generative melody: soft plucked notes on a pentatonic scale ---
            // Minor pentatonic ratios over the root keep any theme's melody consonant and calm.
            const scale = [1, 1.2, 1.35, 1.5, 1.8, 2, 2.4, 2.7];
            let stopped = false;
            melodyStopFns.push(() => { stopped = true; });

            function pluckNote() {
                if (stopped) return;
                const degree = scale[Math.floor(Math.random() * scale.length)];
                const octave = Math.random() < 0.75 ? 2 : 1;
                const freq = root * degree * octave;

                const osc = ctx.createOscillator();
                osc.type = 'sine';
                osc.frequency.value = freq;

                const noteGain = ctx.createGain();
                const now = ctx.currentTime;
                const peak = 0.05 + Math.random() * 0.035;
                noteGain.gain.setValueAtTime(0, now);
                noteGain.gain.linearRampToValueAtTime(peak, now + 0.35); // soft attack
                noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2 + Math.random() * 1.5); // slow release

                osc.connect(noteGain);
                noteGain.connect(warmth);
                osc.start(now);
                osc.stop(now + 5);

                const nextIn = 2.4 + Math.random() * 3.2; // unhurried, non-repetitive spacing
                setTimeout(pluckNote, nextIn * 1000);
            }
            // Stagger the first note so it doesn't feel abrupt on start
            setTimeout(pluckNote, 900);
        }

        function applyMute() {
            localStorage.setItem(STORAGE_KEY, muted ? '1' : '0');
            setIcon();
            if (master) {
                master.gain.setTargetAtTime(muted ? 0 : 0.14, ctx.currentTime, 0.3);
            }
        }

        toggleBtn.addEventListener('click', () => {
            if (!started) startEngine();
            if (ctx && ctx.state === 'suspended') ctx.resume();
            muted = !muted;
            applyMute();
        });

        // Try to start softly on first real user gesture anywhere on the page,
        // respecting the stored mute preference (browsers block audio before a gesture).
        function firstGesture() {
            if (!muted) { startEngine(); if (ctx.state === 'suspended') ctx.resume(); }
            window.removeEventListener('pointerdown', firstGesture);
            window.removeEventListener('keydown', firstGesture);
        }
        window.addEventListener('pointerdown', firstGesture, { once: true });
        window.addEventListener('keydown', firstGesture, { once: true });
    }

    global.LiteraryUniverse = {
        initChrome(opts) {
            opts = opts || {};
            buildMenu(opts);
            buildAudio(opts);
        }
    };

})(window);
