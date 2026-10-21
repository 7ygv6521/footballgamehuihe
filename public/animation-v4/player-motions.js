// R1 push/roll/catch motion adapted to actual game paths. Pure: no match state or RNG.
export const CELL={x:7,y:68/9};
export const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const mix=(a,b,t)=>a+(b-a)*clamp(t);
const ease=t=>{t=clamp(t);return t*t*(3-2*t);};
const phase=(t,a,b)=>clamp((t-a)/(b-a));
const p=(x,y=34,z=.12)=>({x,y,z});
const lerp=(a,b,q)=>p(mix(a.x,b.x,q),mix(a.y,b.y,q),mix(a.z??.12,b.z??.12,q));
const distance=(a,b)=>Math.hypot(b.x-a.x,b.y-a.y);
const unit=(a,b)=>{const d=distance(a,b)||1;return {x:(b.x-a.x)/d,y:(b.y-a.y)/d};};
const offset=(a,v,d)=>p(a.x+v.x*d,a.y+v.y*d);
const hermite=(q,m0,m1)=>{q=clamp(q);return (q*q*q-2*q*q+q)*m0+(-2*q*q*q+3*q*q)+(q*q*q-q*q)*m1;};
const pulse=(t,c,w=.09)=>Math.exp(-(((t-c)/w)**2));
const at=(t,a,b,from,to)=>lerp(from,to,ease(phase(t,a,b)));
const poses={
 stand:{lean:0,bob:0,width:1,sway:0,head:0},
 ready:{lean:6,bob:-.06,width:1,sway:0,head:.08},
 touch:{lean:14,bob:-.05,width:.94,sway:0,head:-.06},
 cushion:{lean:-8,bob:-.11,width:1.06,sway:0,head:.09},
 turn:{lean:3,bob:-.05,width:.65,sway:0,head:.09},
 shield:{lean:-12,bob:-.12,width:.76,sway:0,head:.10},
 challenge:{lean:22,bob:-.12,width:.96,sway:0,head:-.09},
 beaten:{lean:-23,bob:-.09,width:.88,sway:0,head:.15},
 brake:{lean:-9,bob:-.10,width:1,sway:0,head:.10},
 shotSet:{lean:-12,bob:-.11,width:.87,sway:0,head:.06},
 strike:{lean:25,bob:-.02,width:.94,sway:0,head:-.12},
 follow:{lean:30,bob:.05,width:1,sway:0,head:-.10},
 hold:{lean:2,bob:-.05,width:1.03,sway:0,head:0},
 observe:{lean:2,bob:0,width:.95,sway:0,head:.12},
};
function blend(a,b,q){a=typeof a==='string'?poses[a]:a;b=typeof b==='string'?poses[b]:b;return Object.fromEntries(Object.keys(poses.stand).map(k=>[k,mix(a[k]??0,b[k]??0,q)]));}
function poseKeys(t,keys){let i=0;while(i+1<keys.length&&t>=keys[i+1][0])i++;const a=keys[i],b=keys[Math.min(i+1,keys.length-1)];return blend(a[1],b[1],a===b?0:ease(phase(t,a[0],b[0])));}
function running(t,speed=1){return {...poses.ready,lean:9,bob:.055*Math.sin(t*20*speed),head:-.045*Math.sin(t*20*speed),width:.97};}
function figure(id,root,pose='stand',facing=1,team='blue'){return {id,root,pose:typeof pose==='string'?poses[pose]:pose,facing,team};}
function face(v){return Math.abs(v.x)>.1?Math.sign(v.x):1;}
function strokePose(t,touches){let q=0;for(const c of touches)q=Math.max(q,pulse(t,c,.075));return blend(running(t),poses.touch,q);}
// Separate player and ball tracks. A touch accelerates the ball; the player catches up.
// Player velocity is continuous at touches along a straight route. Only ball velocity changes.
export function dribble(points,start,end,{initialSlope=0,startBall=null,endBall=null}={}){
 const lengths=points.slice(1).map((v,i)=>distance(points[i],v));const length=lengths.reduce((a,b)=>a+b,0);
 const touches=[start];for(const l of lengths)touches.push(touches.at(-1)+(end-start)*l/length);
 const ballPoints=points.map((v,i)=>{
  const tangent=unit(points[Math.min(i,points.length-2)],points[Math.min(i+1,points.length-1)]),front=offset(v,tangent,.90);
  // A controlled near-side offset keeps vertical advancement visible beside the torso.
  const side=Math.abs(tangent.x)<.45?.75:0;
  return p(front.x-tangent.y*side,front.y+tangent.x*side);
 });
 if(startBall)ballPoints[0]={...startBall,z:startBall.z||0};
 if(endBall)ballPoints[ballPoints.length-1]={...endBall,z:0};
 function sample(t){
  let i=0;while(i<points.length-2&&t>=touches[i+1])i++;
  const q=phase(t,touches[i],touches[i+1]);
  const root=lerp(points[i],points[i+1],hermite(q,i===0?initialSlope:1,i===points.length-2?0:1));
  const ball=lerp(ballPoints[i],ballPoints[i+1],hermite(q,1.85,i===points.length-2?0:.20));
  return {root,ball,pose:t<start?poses.ready:t>end?poses.stand:strokePose(t,touches.slice(0,-1)),facing:face(unit(points[i],points[i+1]))};
 }
 return {sample,touches,endBall:ballPoints.at(-1),endRoot:points.at(-1)};
}
