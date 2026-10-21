import {PITCH_COLS,PITCH_ROWS,PITCH_CW,PITCH_CH} from './config/pitch.default.js';
// Pure pre-baked ball paths. The same samples drive grid coverage, contacts and rendering.
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const mix=(a,b,t)=>a+(b-a)*t;
export function routePoint(route,t){
 t=clamp(t,0,1);const a=route.from,b=route.to,c=route.control;
 return {x:c?(1-t)**2*a.x+2*(1-t)*t*c.x+t*t*b.x:mix(a.x,b.x,t),
 y:c?(1-t)**2*a.y+2*(1-t)*t*c.y+t*t*b.y:mix(a.y,b.y,t),
 z:mix(a.z||0,b.z||0,t)+4*route.apex*t*(1-t)};
}
export function buildBallRoute(from,to,{bend=0,apex=0,ratio=.82,speed=20,duration=null,kind='ground'}={}){
 const dx=to.x-from.x,dy=to.y-from.y,d=Math.hypot(dx,dy)||1;
 const r={from:{...from,z:from.z||0},to:{...to,z:to.z||0},bend,apex,ratio,speed,kind,
 control:bend?{x:(from.x+to.x)/2-dy/d*bend*2,y:(from.y+to.y)/2+dx/d*bend*2}:null,table:[]};
 let length=0,prev=routePoint(r,0);
 for(let i=0;i<=256;i++){const t=i/256,p=routePoint(r,t);if(i)length+=Math.hypot(p.x-prev.x,p.y-prev.y,p.z-prev.z);r.table.push({...p,t,d:length});prev=p;}
 r.length=length;r.duration=duration??clamp(length/(speed*(1+ratio)/2*1.5),.30,1.25);return r;
}
function distanceAtT(r,t){const index=clamp(t,0,1)*256,i=Math.min(255,Math.floor(index));return mix(r.table[i].d,r.table[i+1].d,index-i);}
export function routeTimeAtT(r,t){
 if(!r.length)return 0;const fraction=distanceAtT(r,t)/r.length;
 if(Math.abs(r.ratio-1)<1e-8)return fraction;
 return clamp(2*fraction*(1+r.ratio)/(2+Math.sqrt(Math.max(0,4+4*(r.ratio-1)*fraction*(1+r.ratio)))),0,1);
}
export function sampleBallRoute(r,progress){
 const f=clamp(progress,0,1),fraction=(2*f+(r.ratio-1)*f*f)/(1+r.ratio),target=fraction*r.length;
 let lo=0,hi=256;while(hi-lo>1){const mid=(lo+hi)>>1;if(r.table[mid].d<target)lo=mid;else hi=mid;}
 const a=r.table[lo],b=r.table[hi],t=mix(a.t,b.t,clamp((target-a.d)/(b.d-a.d||1),0,1));
 return {...routePoint(r,t),t,distance:target,speed:r.length?r.speed*(1+(r.ratio-1)*f):0};
}
function nearestOnPiece(point,a,b){const dx=b.x-a.x,dy=b.y-a.y,u=clamp(((point.x-a.x)*dx+(point.y-a.y)*dy)/(dx*dx+dy*dy||1),0,1);const p={x:mix(a.x,b.x,u),y:mix(a.y,b.y,u),z:mix(a.z,b.z,u),t:mix(a.t,b.t,u)};return {...p,distance:Math.hypot(point.x-p.x,point.y-p.y)};}
export function closestOnRoute(point,route){let best=null;for(let i=1;i<route.table.length;i++){const p=nearestOnPiece(point,route.table[i-1],route.table[i]);if(!best||p.distance<best.distance)best=p;}return {...best,point:routePoint(route,best.t)};}
function clippedInterval(a,b,x0,y0,x1,y1){
 let lo=0,hi=1;const dx=b.x-a.x,dy=b.y-a.y;
 for(const [p,q] of [[-dx,a.x-x0],[dx,x1-a.x],[-dy,a.y-y0],[dy,y1-a.y]]){
  if(Math.abs(p)<1e-12){if(q<0)return null;continue;}const r=q/p;if(p<0)lo=Math.max(lo,r);else hi=Math.min(hi,r);if(lo>hi)return null;
 }return [lo,hi];
}
export function contactOnRoute(point,route,{reachX=3.85,reachY=4.128,minT=.06,maxT=.96,maxHeight=1.35}={}){
 let best=null;
 for(let i=1;i<route.table.length;i++){
  const a=route.table[i-1],b=route.table[i];if(b.t<minT||a.t>maxT)continue;
  const cut=clippedInterval(a,b,point.x-reachX,point.y-reachY,point.x+reachX,point.y+reachY);if(!cut)continue;
  const make=u=>({x:mix(a.x,b.x,u),y:mix(a.y,b.y,u),z:mix(a.z,b.z,u),t:mix(a.t,b.t,u)});
  const begin=Math.max(cut[0],(minT-a.t)/(b.t-a.t)),end=Math.min(cut[1],(maxT-a.t)/(b.t-a.t));if(begin>end)continue;
  const p=nearestOnPiece(point,make(begin),make(end));if(p.z>maxHeight)continue;
  if(!best||p.distance<best.distance)best=p;
 }
 return best?{...best,point:routePoint(route,best.t),timeFraction:routeTimeAtT(route,best.t)}:null;
}
export function crossedRouteCells(route,{cols=PITCH_COLS,rows=PITCH_ROWS,width=105,height=68}={}){
 const entries=[];const cw=width/cols,ch=height/rows;
 // Clip every sampled piece against cells: even a brief corner crossing is retained.
 for(let row=0;row<rows;row++)for(let col=0;col<cols;col++){
  let first=Infinity,last=-Infinity;
  for(let i=1;i<route.table.length;i++){
   const a=route.table[i-1],b=route.table[i],cut=clippedInterval(a,b,col*cw,row*ch,(col+1)*cw,(row+1)*ch);
   if(cut){first=Math.min(first,mix(a.t,b.t,cut[0]));last=Math.max(last,mix(a.t,b.t,cut[1]));}
  }
  if(last>=first)entries.push({col,row,enter:Number(first.toFixed(5)),exit:Number(last.toFixed(5))});
 }
 return entries.sort((a,b)=>a.enter-b.enter||a.row-b.row||a.col-b.col);
}
export function routeSummary(route){return {kind:route.kind,start:route.from,end:route.to,bend:route.bend,apex:route.apex,length:Number(route.length.toFixed(3)),duration:Number(route.duration.toFixed(4)),ratio:route.ratio,control:route.control,cells:crossedRouteCells(route)};}

// A guaranteed controlled ball must remain on the pitch before its actual handoff.
export function ballRouteWithinPitch(route,until=1){
 if(!route?.from||!route?.to)return false;const a=route.from,b=route.to,c=route.control,end=clamp(until,0,1),ts=new Set([0,end]);
 for(const axis of ['x','y']){if(!Number.isFinite(a[axis])||!Number.isFinite(b[axis])||c&&!Number.isFinite(c[axis]))return false;if(c){const denominator=a[axis]-2*c[axis]+b[axis];if(Math.abs(denominator)>1e-12){const t=(a[axis]-c[axis])/denominator;if(t>0&&t<end)ts.add(t);}}}
 return [...ts].every(t=>{const p=routePoint(route,t);return p.x>=-1e-8&&p.x<=105+1e-8&&p.y>=-1e-8&&p.y<=68+1e-8;});
}
