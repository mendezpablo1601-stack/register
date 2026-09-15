const modal=document.getElementById("modal");
const img=document.getElementById("modalImg");
const title=document.getElementById("modalTitle");
const desc=document.getElementById("modalDesc");
const num=document.getElementById("modalNum");

document.querySelectorAll(".work").forEach((card,i)=>{
  card.addEventListener("click",()=>{
    img.src=card.dataset.img;
    title.textContent=card.dataset.title;
    desc.textContent=card.dataset.desc;
    num.textContent=`0${i+1} / COLECCIÓN`;
    modal.classList.add("show");
    document.body.style.overflow="hidden";
  });
});
function closeModal(){
  modal.classList.remove("show");
  document.body.style.overflow="";
}
document.getElementById("close").onclick=closeModal;
modal.addEventListener("click",e=>{if(e.target===modal)closeModal()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});

document.getElementById("theme").onclick=()=>{
  document.body.classList.toggle("light");
};

const cards=[...document.querySelectorAll(".work")];
const count=document.getElementById("count");
const observer=new IntersectionObserver(entries=>{
 entries.forEach(entry=>{
   if(entry.isIntersecting){
     const i=cards.indexOf(entry.target);
     if(i>=0) count.textContent=String(i+1).padStart(2,"0");
   }
 });
},{threshold:.55});
cards.forEach(c=>observer.observe(c));
