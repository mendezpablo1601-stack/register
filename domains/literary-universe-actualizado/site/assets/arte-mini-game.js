
(() => {
const host=document.querySelector('#game-arte');if(!host)return;

const PALETTE=[
  '#e63946','#ff4d4d','#c1272d','#7a1f1f',      // rojos
  '#f77f00','#e77b2f','#c96a1a',                // naranjas
  '#ffd60a','#f2c14e','#e9b44c',                // amarillos
  '#2a9d3f','#4a7c59','#1b5e3f',                // verdes
  '#3a6ea5','#1d6fa5','#0b3d91','#39c5f2',      // azules
  '#7b2cbf','#5a3ea1','#9d4edd',                // morados
  '#ff8fab','#ffb3c6',                          // rosados
  '#7a4a2b','#5a3a22','#9c6b3f',                // marrones
  '#0a0a0a','#f4f4f2'                           // negro / blanco
];

host.innerHTML=`
  <div class="game-screen ag-screen">
    <div class="game-hud"><span>Estudio de color</span><span>Obras: <b id="agScore">0</b></span></div>
    <canvas class="game-canvas" id="agCanvas"></canvas>
  </div>
  <div class="ag-toolbar">
    <div class="ag-row">
      <div class="ag-group ag-colors" id="agColors"></div>
      <div class="ag-group ag-custom">
        <label class="ag-custom-label" for="agCustomColor">Personalizado</label>
        <input type="color" id="agCustomColor" value="#e77b2f" aria-label="Elegir color personalizado">
      </div>
    </div>
    <div class="ag-row">
      <div class="ag-group ag-tools">
        <button type="button" class="ag-tool active" data-tool="brush">Pincel</button>
        <button type="button" class="ag-tool" data-tool="eraser">Borrador</button>
        <button type="button" class="ag-tool" data-tool="circle">Círculo</button>
        <button type="button" class="ag-tool" data-tool="square">Cuadrado</button>
        <button type="button" class="ag-tool" data-tool="line">Línea</button>
      </div>
      <button class="ag-clear" id="agClear">Nuevo lienzo</button>
    </div>
  </div>
  <div class="game-help">Elige un color (o crea el tuyo) y una herramienta. Dibuja libre con el pincel, borra con el borrador, o arrastra para crear figuras.</div>
`;

const CANVAS_BG='#21150f';
const c=host.querySelector('canvas'),ctx=c.getContext('2d');
let drawing=false,last=null,start=null,count=0;
let activeColor=PALETTE[4];
let activeTool='brush';

const colorsHost=host.querySelector('#agColors');
const customInput=host.querySelector('#agCustomColor');

function setActiveColor(col, swatchEl){
  activeColor=col;
  colorsHost.querySelectorAll('.ag-swatch').forEach(s=>s.classList.remove('active'));
  if(swatchEl) swatchEl.classList.add('active');
}

PALETTE.forEach((col)=>{
  const sw=document.createElement('button');
  sw.type='button';
  sw.className='ag-swatch'+(col===activeColor?' active':'');
  sw.style.background=col;
  sw.setAttribute('aria-label','Color '+col);
  sw.addEventListener('click',()=>{
    setActiveColor(col, sw);
    setTool('brush');
  });
  colorsHost.appendChild(sw);
});

customInput.addEventListener('input',()=>{
  setActiveColor(customInput.value, null);
  setTool('brush');
});

function setTool(tool){
  activeTool=tool;
  host.querySelectorAll('.ag-tool').forEach(b=>b.classList.toggle('active', b.dataset.tool===tool));
}
host.querySelectorAll('.ag-tool').forEach(btn=>{
  btn.addEventListener('click',()=>setTool(btn.dataset.tool));
});

function size(){
  ctx.fillStyle=CANVAS_BG;
  c.width=c.clientWidth*devicePixelRatio;
  c.height=c.clientHeight*devicePixelRatio;
  ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
  ctx.fillRect(0,0,c.clientWidth,c.clientHeight);
}
addEventListener('resize',size);
size();

function pos(e){const r=c.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top}}

c.addEventListener('pointerdown',e=>{
  drawing=true;
  start=pos(e);
  last=start;
  c.setPointerCapture(e.pointerId);
  if(activeTool==='eraser'){
    ctx.fillStyle=CANVAS_BG;
    ctx.beginPath();
    ctx.arc(start.x,start.y,16,0,Math.PI*2);
    ctx.fill();
  }
});

c.addEventListener('pointermove',e=>{
  if(!drawing)return;
  let p=pos(e);
  if(activeTool==='brush'){
    ctx.lineWidth=3+Math.random()*12;
    ctx.lineCap='round';
    ctx.strokeStyle=activeColor;
    ctx.beginPath();
    ctx.moveTo(last.x,last.y);
    ctx.lineTo(p.x,p.y);
    ctx.stroke();
  } else if(activeTool==='eraser'){
    ctx.fillStyle=CANVAS_BG;
    ctx.beginPath();
    ctx.arc(p.x,p.y,16,0,Math.PI*2);
    ctx.fill();
  }
  last=p;
});

c.addEventListener('pointerup',e=>{
  if(!drawing)return;
  drawing=false;
  const end=pos(e);
  if(activeTool==='circle' || activeTool==='square' || activeTool==='line'){
    ctx.fillStyle=activeColor;
    ctx.strokeStyle=activeColor;
    if(activeTool==='circle'){
      const dx=end.x-start.x, dy=end.y-start.y;
      const r=Math.max(8,Math.hypot(dx,dy));
      ctx.beginPath();
      ctx.arc(start.x,start.y,r,0,Math.PI*2);
      ctx.fill();
    } else if(activeTool==='square'){
      const w=end.x-start.x, h=end.y-start.y;
      ctx.fillRect(start.x, start.y, w, h);
    } else if(activeTool==='line'){
      ctx.lineWidth=6;
      ctx.lineCap='round';
      ctx.beginPath();
      ctx.moveTo(start.x,start.y);
      ctx.lineTo(end.x,end.y);
      ctx.stroke();
    }
  }
  start=null;last=null;
  count++;
  host.querySelector('#agScore').textContent=count;
});

host.querySelector('#agClear').onclick=()=>{
  ctx.fillStyle=CANVAS_BG;
  ctx.fillRect(0,0,c.clientWidth,c.clientHeight);
  count=0;
  host.querySelector('#agScore').textContent=0;
};
})();
