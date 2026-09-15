
(() => {
const host=document.querySelector('#game-beauty');if(!host)return;
host.innerHTML=`<div class="game-screen"><div class="game-hud"><span>BEAUTY LAB</span><span>ARMONÍA: <b id="cgScore">0</b></span></div><canvas class="game-canvas" id="cgCanvas"></canvas></div><div class="game-help">Mueve el cursor y sigue las partículas para crear una rutina de cuidado.</div><button class="media-btn" id="cgReset">REINICIAR RUTINA</button>`;
const c=host.querySelector('canvas'),ctx=c.getContext('2d');let score=0,px=.5,py=.5,pts=[],raf,t=0;
function size(){c.width=c.clientWidth*devicePixelRatio;c.height=c.clientHeight*devicePixelRatio;ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0)}addEventListener('resize',size);size();
c.addEventListener('pointermove',e=>{let r=c.getBoundingClientRect();px=(e.clientX-r.left)/r.width;py=(e.clientY-r.top)/r.height;score++;host.querySelector('#cgScore').textContent=Math.floor(score/10)});
host.querySelector('#cgReset').onclick=()=>{score=0;host.querySelector('#cgScore').textContent=0};
function loop(){t++;const w=c.clientWidth,h=c.clientHeight;ctx.fillStyle='#031b16';ctx.fillRect(0,0,w,h);for(let i=0;i<30;i++){let x=(i*61+t*.25)%w,y=(i*37+t*.45)%h;ctx.fillStyle='rgba(70,255,190,.16)';ctx.beginPath();ctx.arc(x,y,3+Math.sin(t/15+i)*2,0,7);ctx.fill()}let x=px*w,y=py*h;ctx.shadowBlur=25;ctx.shadowColor='#16d6a0';ctx.fillStyle='#9fffe2';ctx.beginPath();ctx.arc(x,y,8,0,7);ctx.fill();ctx.shadowBlur=0;raf=requestAnimationFrame(loop)}loop();
})();
