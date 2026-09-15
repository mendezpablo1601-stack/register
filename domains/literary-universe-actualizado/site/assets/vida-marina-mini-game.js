
(() => {
const host=document.querySelector('#game-vida'); if(!host)return;
host.innerHTML=`<div class="game-screen"><div class="game-hud"><span>DEEP DIVE</span><span>TESOROS: <b id="vgScore">0</b></span></div><canvas class="game-canvas" id="vgCanvas"></canvas></div><div class="game-help">Mueve el submarino y recoge burbujas luminosas mientras desciendes.</div><button class="media-btn" id="vgReset">INICIAR DE NUEVO</button>`;
const c=host.querySelector('canvas'),ctx=c.getContext('2d');let score=0,px=.5,py=.55,items=[],raf,t=0;
function size(){c.width=c.clientWidth*devicePixelRatio;c.height=c.clientHeight*devicePixelRatio;ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0)}addEventListener('resize',size);size();
host.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();px=Math.max(.1,Math.min(.9,(e.clientX-r.left)/r.width));py=Math.max(.12,Math.min(.86,(e.clientY-r.top)/r.height))});
function reset(){score=0;items=[];t=0;cancelAnimationFrame(raf);loop()}host.querySelector('#vgReset').onclick=reset;
function loop(){t++;const w=c.clientWidth,h=c.clientHeight;let g=ctx.createLinearGradient(0,0,0,h);g.addColorStop(0,'#061b36');g.addColorStop(1,'#020611');ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
for(let i=0;i<22;i++){ctx.fillStyle='rgba(80,190,255,.18)';ctx.beginPath();ctx.arc((i*97)%w,(i*53+t*.3)%h,2,0,7);ctx.fill()}
if(Math.random()<.025)items.push({x:Math.random()*.86+.07,y:1.05,r:5+Math.random()*5});
items.forEach(o=>o.y-=.004);items=items.filter(o=>o.y>-.1);
const sx=px*w,sy=py*h;ctx.strokeStyle='rgba(90,220,255,.5)';ctx.beginPath();ctx.arc(sx,sy,22+Math.sin(t/8)*3,0,7);ctx.stroke();ctx.fillStyle='#48d8ff';ctx.beginPath();ctx.roundRect(sx-22,sy-12,44,24,9);ctx.fill();
items.forEach(o=>{let ox=o.x*w,oy=o.y*h;ctx.fillStyle='#72f3ff';ctx.shadowBlur=18;ctx.shadowColor='#36ddff';ctx.beginPath();ctx.arc(ox,oy,o.r,0,7);ctx.fill();ctx.shadowBlur=0;if(Math.hypot(ox-sx,oy-sy)<30){o.y=-1;score++;host.querySelector('#vgScore').textContent=score}});
raf=requestAnimationFrame(loop)}loop();
})();
