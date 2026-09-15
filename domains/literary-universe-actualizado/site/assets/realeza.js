const images=[
"assets/realeza/castillo-lago.jpg",
"assets/realeza/caballero-lavanda.jpg",
"assets/realeza/reino-catedral.jpg",
"assets/realeza/castillo-cielo.jpg"
];
const bg=document.getElementById("heroBg");
let current=0;
setInterval(()=>{
  bg.classList.add("fade");
  setTimeout(()=>{
    current=(current+1)%images.length;
    bg.style.backgroundImage=`url("${images[current]}")`;
    bg.classList.remove("fade");
  },650);
},6500);

const modal=document.getElementById("modal"), modalImg=document.getElementById("modalImg");
document.querySelectorAll(".card").forEach((card,i)=>{
 card.addEventListener("click",()=>{
   modalImg.src=images[i];
   modalImg.alt=card.querySelector(".caption").textContent;
   document.getElementById("modalNum").textContent=`0${i+1} / BIBLIOTECA`;
   document.getElementById("modalTitle").textContent=card.dataset.title;
   document.getElementById("modalText").textContent=card.dataset.text;
   modal.classList.add("show");
 });
});
document.getElementById("close").onclick=()=>modal.classList.remove("show");
modal.addEventListener("click",e=>{if(e.target===modal)modal.classList.remove("show")});
document.addEventListener("keydown",e=>{if(e.key==="Escape")modal.classList.remove("show")});

const sections=[...document.querySelectorAll("main section[id]")], links=[...document.querySelectorAll("nav a")];
window.addEventListener("scroll",()=>{
 let pos=scrollY+160;
 sections.forEach(s=>{
   if(pos>=s.offsetTop && pos<s.offsetTop+s.offsetHeight){
     links.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+s.id || (s.id==="aprender"&&a.getAttribute("href")==="#biblioteca")));
   }
 });
});

// Botón de ambiente: crea un pequeño pulso visual sin descargar audio externo.
document.getElementById("soundBtn").addEventListener("click",function(){
 this.classList.toggle("on");
 this.innerHTML=this.classList.contains("on")?'◉ <span>AMBIENTE ON</span>':'◉ <span>AMBIENTE</span>';
});
