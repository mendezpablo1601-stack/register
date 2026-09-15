
(() => {
 const labels=[...document.querySelectorAll('main section[id]')].filter(s=>s.id!=='lecturas');
 const progress=document.createElement('div'); progress.className='exp-progress'; progress.innerHTML='<i></i>';
 document.body.appendChild(progress);
 const cursor=document.createElement('div');cursor.className='exp-cursor';document.body.appendChild(cursor);
 addEventListener('pointermove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'},{passive:true});
 const reveal=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('is-visible')}),{threshold:.12});
 document.querySelectorAll('.exp-reveal').forEach(x=>reveal.observe(x));
 const update=()=>{
   const max=document.documentElement.scrollHeight-innerHeight;
   const p=max>0?Math.min(1,Math.max(0,scrollY/max)):0;
   progress.firstElementChild.style.width=(p*100)+'%';
 };
 addEventListener('scroll',update,{passive:true}); addEventListener('resize',update); update();
 addEventListener('keydown',e=>{
   if(e.key==='Home'){e.preventDefault();scrollTo({top:0,behavior:'smooth'})}
   if(e.key==='End'){e.preventDefault();scrollTo({top:document.documentElement.scrollHeight,behavior:'smooth'})}
   if(e.key==='ArrowDown'){e.preventDefault();labels[Math.min(labels.length-1,Math.max(0,(labels.findIndex(s=>s.getBoundingClientRect().top>30))))]?.scrollIntoView({behavior:'smooth'})}
 });
})();
