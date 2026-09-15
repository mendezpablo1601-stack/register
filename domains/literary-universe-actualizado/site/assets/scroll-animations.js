/* =========================================================
   SCROLL ANIMATIONS — capa aditiva y no destructiva
   - No modifica colores, textos ni estructura.
   - Detecta automáticamente secciones y tarjetas para
     revelarlas con fade + slide al hacer scroll.
   - Evita cualquier elemento que ya tenga su propio sistema
     de animación, juego, quiz, modal o tabs, para no
     interferir con esos scripts existentes.
========================================================= */
(function () {
    'use strict';

    var reduceMotion = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    // Selectores que nunca deben tocarse (sistemas propios, juegos, quizzes, etc.)
    var SKIP_SELECTOR = [
        '.game-shell', '.game-shell *',
        '[class*="lu-q"]', '[class*="lu-lect"]', '[class*="lu-lang"]', '[class*="lu-quiz"]',
        '.modal', '.modal *',
        '[class*="do-tab"]', '[class*="do-panel"]',
        'nav', '[class*="navbar"]', '[class*="topbar"]', '[class*="-top"]',
        '[class*="cursor"]', '[id*="cursor"]',
        'canvas', 'video', 'iframe',
        '[class*="noise"]', '[class*="grain"]',
        '[class*="menu-toggle"]',
        '#preloader', '#transition-layer', '#vignette', '#planet-tip',
        '[class*="reveal1"]', '[class*="card1"]', '[class*="gallery-item1"]', '[class*="stat-box1"]',
        'header'
    ].join(',');

    function isSkipped(el) {
        try {
            if (el.matches(SKIP_SELECTOR)) return true;
            return !!el.closest(SKIP_SELECTOR.replace(/(^|,)header/, '$1header'));
        } catch (e) {
            return false;
        }
    }

    function alreadyMarked(el) {
        return el.classList.contains('sr-reveal') ||
            el.classList.contains('sr-reveal-left') ||
            el.classList.contains('sr-reveal-right') ||
            el.classList.contains('sr-reveal-scale');
    }

    var candidates = [];

    // 1) Secciones y footers de nivel superior en toda la página
    Array.prototype.forEach.call(
        document.querySelectorAll('section, footer'),
        function (el) { candidates.push(el); }
    );

    // 2) Si el contenido vive dentro de <main>, también sus hijos directos
    var main = document.querySelector('main');
    if (main) {
        Array.prototype.forEach.call(main.children, function (el) {
            candidates.push(el);
        });
    }

    // Quitar duplicados y descendientes de otro candidato ya elegido
    candidates = candidates.filter(function (el, idx) {
        if (candidates.indexOf(el) !== idx) return false;
        if (isSkipped(el)) return false;
        for (var i = 0; i < candidates.length; i++) {
            if (candidates[i] !== el && candidates[i].contains(el)) return false;
        }
        return true;
    });

    candidates.forEach(function (el) {
        if (alreadyMarked(el)) return;
        el.classList.add('sr-reveal');
    });

    // 3) Tarjetas dentro de grids: revelado escalonado
    var gridContainers = document.querySelectorAll('[class*="grid"], [class*="grid" i]');
    Array.prototype.forEach.call(gridContainers, function (grid) {
        if (isSkipped(grid)) return;
        var children = Array.prototype.filter.call(grid.children, function (child) {
            return !isSkipped(child) && !alreadyMarked(child);
        });
        if (children.length < 2) return;
        children.forEach(function (child, idx) {
            child.classList.add('sr-reveal-scale', 'sr-stagger');
            child.style.setProperty('--sr-delay', Math.min(idx * 70, 420) + 'ms');
        });
    });

    // Observador único para todo
    var targets = document.querySelectorAll(
        '.sr-reveal, .sr-reveal-left, .sr-reveal-right, .sr-reveal-scale'
    );

    if (!('IntersectionObserver' in window) || targets.length === 0) {
        // Sin soporte: mostrar todo directamente, sin animación
        Array.prototype.forEach.call(targets, function (el) {
            el.classList.add('sr-visible');
        });
        return;
    }

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('sr-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -8% 0px'
    });

    Array.prototype.forEach.call(targets, function (el) {
        observer.observe(el);
    });
})();
