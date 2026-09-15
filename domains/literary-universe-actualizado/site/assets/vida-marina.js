/*==================================================
              CURSOR PERSONALIZADO
==================================================*/


const cursor1 = document.querySelector(".cursor1");
const cursorDot1 = document.querySelector(".cursor-dot1");


document.addEventListener("mousemove", (e)=>{


    cursor1.style.left = e.clientX + "px";
    cursor1.style.top = e.clientY + "px";


    cursorDot1.style.left = e.clientX + "px";
    cursorDot1.style.top = e.clientY + "px";


});





/*==================================================
              EFECTO HOVER CURSOR
==================================================*/


const hoverElements1 = document.querySelectorAll(
"a, button, .card1, .gallery-item1"
);



hoverElements1.forEach(element=>{


    element.addEventListener("mouseenter",()=>{


        cursor1.style.width="70px";
        cursor1.style.height="70px";


    });



    element.addEventListener("mouseleave",()=>{


        cursor1.style.width="45px";
        cursor1.style.height="45px";


    });


});






/*==================================================
              NAVBAR SCROLL
==================================================*/


const header1 =
document.querySelector(".HEADER1");



window.addEventListener("scroll",()=>{


    if(window.scrollY > 80){


        header1.classList.add("scrolled1");


    }else{


        header1.classList.remove("scrolled1");


    }


});







/*==================================================
              SCROLL REVEAL
==================================================*/


const revealElements1 =
document.querySelectorAll(".reveal1");



const revealObserver1 =
new IntersectionObserver((entries)=>{


entries.forEach(entry=>{


    if(entry.isIntersecting){


        entry.target.classList.add("active1");


    }


});


},{

    threshold:.15

});




revealElements1.forEach(element=>{


    revealObserver1.observe(element);


});







/*==================================================
              MENU HAMBURGUESA
==================================================*/


const menuButton1 =
document.querySelector(".menu-toggle1");


const menuList1 =
document.querySelector(".nav-list1");



if(menuButton1){


menuButton1.addEventListener("click",()=>{


    menuList1.classList.toggle("active1");


    menuButton1.classList.toggle("open1");


});



}






/*==================================================
              CERRAR MENU AL NAVEGAR
==================================================*/


const menuLinks1 =
document.querySelectorAll(".nav-list1 a");



menuLinks1.forEach(link=>{


    link.addEventListener("click",()=>{


        menuList1.classList.remove("active1");


    });


});







/*==================================================
              PARALLAX OCEAN
==================================================*/


const oceanText1 =
document.querySelector(".ocean-text1");



window.addEventListener("scroll",()=>{


    if(oceanText1){


        let movement =
        window.scrollY * 0.08;


        oceanText1.style.transform =
        `
        translate(-50%,calc(-50% + ${movement}px))
        `;


    }


});






/*==================================================
              ANIMACIÓN SUAVE DE ENTRADA
==================================================*/


window.addEventListener("load",()=>{


    document.body.classList.add("loaded1");


});