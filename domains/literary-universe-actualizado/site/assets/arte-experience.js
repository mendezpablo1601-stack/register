
(() => {
 const q=s=>document.querySelector(s);
 document.body.insertAdjacentHTML('afterbegin','<div class="arte-experience-bg"></div><div class="arte-palette"><b></b><b></b><b></b><b></b></div>');
 document.querySelectorAll('main section').forEach(x=>x.classList.add('exp-reveal','arte-frame'));
 window.addEventListener('pointermove',e=>{document.documentElement.style.setProperty('--mx',e.clientX+'px');document.documentElement.style.setProperty('--my',e.clientY+'px')});
})();
