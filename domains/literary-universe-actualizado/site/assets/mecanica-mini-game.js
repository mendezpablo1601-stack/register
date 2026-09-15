
(() => {
const GAME_URL = "https://lab.patrickheintzmann.com/demo/demoFormula";
const host = document.querySelector('#game-mecanica'); if (!host) return;

host.innerHTML = `
  <div class="game-embed-frame" id="mgFrameWrap">
    <iframe
      id="mgFrame"
      src="${GAME_URL}"
      title="Formula — minijuego de carreras interactivo"
      loading="lazy"
      allow="autoplay; fullscreen; gamepad; pointer-lock"
      allowfullscreen
      sandbox="allow-scripts allow-same-origin allow-pointer-lock"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
  <div class="game-help">🎮 Usa <b>WASD</b> o las <b>flechas</b> del teclado para conducir. Haz clic sobre el juego para activarlo. Si tu navegador no lo muestra, usa el botón "ABRIR EN PESTAÑA NUEVA".</div>
  <div class="game-embed-actions">
    <button class="media-btn" id="mgReload" type="button">RECARGAR JUEGO</button>
    <button class="media-btn" id="mgFullscreen" type="button">PANTALLA COMPLETA</button>
    <a class="media-btn" id="mgOpenTab" href="${GAME_URL}" target="_blank" rel="noopener noreferrer">ABRIR EN PESTAÑA NUEVA</a>
  </div>
`;

const frame = host.querySelector('#mgFrame');
const wrap = host.querySelector('#mgFrameWrap');

host.querySelector('#mgReload').addEventListener('click', () => {
  frame.src = GAME_URL + (GAME_URL.includes('?') ? '&' : '?') + '_r=' + Date.now();
});

host.querySelector('#mgFullscreen').addEventListener('click', () => {
  if (wrap.requestFullscreen) wrap.requestFullscreen();
  else if (frame.requestFullscreen) frame.requestFullscreen();
});
})();
