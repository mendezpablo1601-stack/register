
(() => {
 document.querySelectorAll('.multimedia-section').forEach(sec=>{
   const a=getComputedStyle(sec).getPropertyValue('--media-accent').trim();
   sec.style.setProperty('--exp-accent',a);
 });
 // Keyboard shortcut: M jumps to multimedia zone.
 addEventListener('keydown',e=>{
   if(e.key.toLowerCase()==='m'){
     document.querySelector('.multimedia-section')?.scrollIntoView({behavior:'smooth'});
   }
 });
})();
