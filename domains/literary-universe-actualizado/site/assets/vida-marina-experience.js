
(()=>{const body=document.body, sections=[...document.querySelectorAll('section[id]')];if(!sections.length)return;
let top=document.createElement('div');top.className='xp-top';body.appendChild(top);
function update(){let max=document.documentElement.scrollHeight-innerHeight,p=max?scrollY/max:0;top.style.width=p*100+'%';}
addEventListener('scroll',update,{passive:true});update();
sections.forEach(s=>s.classList.add('xp-reveal'));new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('xp-visible')),{threshold:.12}).observe(sections[0]);let io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('xp-visible')),{threshold:.12});sections.forEach(s=>io.observe(s));
})();
