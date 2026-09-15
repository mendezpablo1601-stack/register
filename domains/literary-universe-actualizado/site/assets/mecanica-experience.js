
(()=>{const root=document.documentElement, body=document.body;
const sections=[...document.querySelectorAll('section[id]')]; if(!sections.length)return;
let top=document.createElement('div');top.className='xp-top';body.appendChild(top);
function update(){let max=document.documentElement.scrollHeight-innerHeight, p=max>0?scrollY/max*100:0;top.style.width=p+'%';}
addEventListener('scroll',update,{passive:true});update();
sections.forEach(s=>s.classList.add('xp-reveal'));let io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('xp-visible')),{threshold:.12});sections.forEach(s=>io.observe(s));
addEventListener('keydown',e=>{if(e.key==='Home')scrollTo({top:0,behavior:'smooth'});if(e.key==='End')scrollTo({top:document.body.scrollHeight,behavior:'smooth'});});
})();
