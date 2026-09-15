
(() => {
const host=document.querySelector('#game-realeza');if(!host)return;
host.innerHTML=`<div class="game-screen"><div class="game-hud"><span>TRONO REAL</span><span>PRESTIGIO: <b id="rgScore">0</b></span></div><canvas class="game-canvas" id="rgCanvas"></canvas></div><div class="game-help">Pulsa cuando el medallón coincida con el círculo real. Cada acierto aumenta tu rango.</div><button class="media-btn" id="rgPlay">NUEVO DESAFÍO</button>`;
const c=host.querySelector('canvas'),ctx=c.getContext('2d');let score=0,target=0,angle=0,raf;
function size(){c.width=c.clientWidth*devicePixelRatio;c.height=c.clientHeight*devicePixelRatio;ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0)}addEventListener('resize',size);size();
function draw(){const w=c.clientWidth,h=c.clientHeight;ctx.clearRect(0,0,w,h);ctx.fillStyle='#130b1b';ctx.fillRect(0,0,w,h);let cx=w/2,cy=h/2,r=80;ctx.strokeStyle='#b889ff';ctx.lineWidth=5;ctx.beginPath();ctx.arc(cx,cy,r,0,7);ctx.stroke();ctx.strokeStyle='rgba(255,255,255,.25)';ctx.beginPath();ctx.arc(cx,cy,r+25,0,7);ctx.stroke();ctx.fillStyle='#d9c1ff';ctx.font='42px serif';ctx.textAlign='center';ctx.fillText('♛',cx,cy+15);ctx.fillStyle='#fff';ctx.font='11px Arial';ctx.fillText('PULSA AQUÍ',cx,cy+115);angle+=.035;target=(Math.sin(angle)*.5+.5);raf=requestAnimationFrame(draw)}
c.addEventListener('pointerdown',e=>{const r=c.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;if(Math.hypot(x-c.clientWidth/2,y-c.clientHeight/2)<105){score++;host.querySelector('#rgScore').textContent=score}});
host.querySelector('#rgPlay').onclick=()=>{score=0;host.querySelector('#rgScore').textContent=0};draw();
})();
