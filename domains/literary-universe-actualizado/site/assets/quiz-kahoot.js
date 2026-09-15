/* =====================================================
   QUIZ ESTILO KAHOOT
   Toma cada bloque .lu-q (pregunta + data-correct) ya
   existente en la página, y reconstruye sus opciones como
   fichas de color con el orden de respuestas mezclado al
   azar. No depende del orden original A/B/C/D: la posición
   correcta cambia en cada carga de la página.
===================================================== */
(function () {
    var SHAPES = ['▲', '◆', '●', '■'];

    function shuffle(arr) {
        for (var i = arr.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
        }
        return arr;
    }

    function stripLabel(text) {
        return text.replace(/^[A-D]\.\s*/, '').trim();
    }

    function enhanceQuestion(q) {
        var correctLetter = q.dataset.correct;
        var optsWrap = q.querySelector('.lu-q-opts');
        var feedback = q.querySelector('.lu-q-feedback');
        var oldButtons = optsWrap ? optsWrap.querySelectorAll('.lu-q-opt') : [];
        if (!optsWrap || !feedback || !oldButtons.length) return;

        var pool = Array.prototype.map.call(oldButtons, function (btn) {
            return {
                label: stripLabel(btn.textContent),
                isCorrect: btn.dataset.opt === correctLetter
            };
        });

        function render() {
            shuffle(pool);
            optsWrap.innerHTML = '';
            optsWrap.classList.add('kh-opts');
            feedback.textContent = '';

            pool.forEach(function (item, i) {
                var btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'lu-q-opt kh-opt';
                btn.setAttribute('data-kh-slot', String(i % 4));
                btn.innerHTML =
                    '<span class="kh-shape">' + SHAPES[i % 4] + '</span>' +
                    '<span class="kh-label"></span>';
                btn.querySelector('.kh-label').textContent = item.label;

                btn.addEventListener('click', function () {
                    var buttons = optsWrap.querySelectorAll('.kh-opt');
                    if (btn.disabled) return;

                    Array.prototype.forEach.call(buttons, function (b, bi) {
                        b.disabled = true;
                        if (pool[bi].isCorrect) {
                            b.classList.add('kh-correct');
                            b.insertAdjacentHTML('beforeend', '<span class="kh-mark">✔</span>');
                        } else {
                            b.classList.add('kh-incorrect');
                            if (b === btn) {
                                b.insertAdjacentHTML('beforeend', '<span class="kh-mark">✘</span>');
                            }
                        }
                    });

                    feedback.textContent = item.isCorrect
                        ? '¡Correcto! ✅'
                        : 'Incorrecto. La respuesta correcta quedó resaltada.';
                });

                optsWrap.appendChild(btn);
            });
        }

        render();

        var quizBlock = q.closest('.lu-quiz');
        if (quizBlock) quizBlock.classList.add('kh-ready');
    }

    function init() {
        document.querySelectorAll('.lu-q').forEach(enhanceQuestion);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
