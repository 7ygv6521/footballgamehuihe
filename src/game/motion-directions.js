/** Pure eight-direction motion geometry. Never rotates an upright sprite into
 * the pitch plane; vertical height stays a separate screen axis. No RNG/state. */
const finite=(n,f=0)=>Number.isFinite(n)?n:f;
const clamp=(n,a=0,b=1)=>Math.max(a,Math.min(b,finite(n)));
export const DIRECTIONS_8=Object.freeze([
 {id:'E',label:'右',x:1,y:0},{id:'SE',label:'右下',x:Math.SQRT1_2,y:Math.SQRT1_2},
 {id:'S',label:'下',x:0,y:1},{id:'SW',label:'左下',x:-Math.SQRT1_2,y:Math.SQRT1_2},
 {id:'W',label:'左',x:-1,y:0},{id:'NW',label:'左上',x:-Math.SQRT1_2,y:-Math.SQRT1_2},
 {id:'N',label:'上',x:0,y:-1},{id:'NE',label:'右上',x:Math.SQRT1_2,y:-Math.SQRT1_2}
].map(Object.freeze));
export function normalizeDirection(v,fallback={x:1,y:0}){
 const x=finite(v?.x),y=finite(v?.y),len=Math.hypot(x,y);
 if(len>1e-9)return {x:x/len,y:y/len};
 const fx=finite(fallback?.x,1),fy=finite(fallback?.y),fl=Math.hypot(fx,fy)||1;
 return {x:fx/fl,y:fy/fl};
}
const delta=(a,b)=>a&&b?{x:finite(b.x)-finite(a.x),y:finite(b.y)-finite(a.y)}:null;
/** Physical direction: pass/shot toward real target; tackle toward contact;
 * otherwise actual active path segment. Zero-length candidates are skipped. */
export function chooseMotionDirection({type,player,movement,target,contact,fallback}){
 const segment=movement&&delta(movement.from||player,movement.to);
 const preferred=/^(pass|shoot|volley|header)$/.test(type)?[delta(player,target),segment,delta(player,contact)]:/^(tackle|duel|slide|double_press)$/.test(type)?[delta(player,contact),segment,delta(player,target)]:[segment,delta(player,target),delta(player,contact)];
 const actual=preferred.find(v=>v&&Math.hypot(v.x,v.y)>1e-9);
 return normalizeDirection(actual,fallback);
}
/** Project a local world tangent through the provided game projection.
 * Perspective may alter the angle; never use raw pitch atan2 for screen poses. */
export function projectWorldDirection(project,origin,worldDirection,epsilon=1){
 const d=normalizeDirection(worldDirection),a=project(finite(origin?.x),finite(origin?.y)),b=project(finite(origin?.x)+d.x*epsilon,finite(origin?.y)+d.y*epsilon);
 return normalizeDirection({x:b.x-a.x,y:b.y-a.y},d);
}
export function nearestDirection8(v){const d=normalizeDirection(v);return DIRECTIONS_8.reduce((a,b)=>d.x*b.x+d.y*b.y>d.x*a.x+d.y*a.y?b:a);}
/** Converts legacy scalar shift/sway into pitch-plane screen offsets.
 * rendererFacing=1 prevents multiplying a screen-directed lean twice. */
export function orientFootballPose(basePose,screenDirection,{slide=false,radius=14,q=0}={}){
 const d=normalizeDirection(screenDirection),side={x:-d.y,y:d.x},r=Math.max(.01,finite(radius,14));
 const forward=finite(basePose?.shift),lateral=finite(basePose?.sway);
 const pose={...basePose,shift:0,sway:0,lag:finite(basePose?.lag)*d.x,lean:finite(basePose?.lean)*d.x};
 const slideWeight=slide?clamp(finite(basePose?.slideFoot,Math.sin(clamp(q)*Math.PI))):0;
 // A tackle is drawn as a body stretched along the pitch in figure.js.
 // Squashing the upright torso used to make the defender simply look shorter.
 if(slide){pose.lean=0;pose.lift=0;pose.squash=[1,1];}
 return {pose,rendererFacing:1,direction:d,sideDirection:side,slideWeight,groundOffset:{x:r*(forward*d.x+lateral*side.x),y:r*(forward*d.y+lateral*side.y)}};
}
/** Directional slide anchors are explicit, so the round head stays upright.
 * The toe point is an invisible contact reference; the rendered figure has no
 * feet. No overall atan2 rotation or hidden root translation. */
export function directionalFootballAnchors(root,radius,oriented){
 const r=Math.max(.01,finite(radius,14)),d=oriented.direction,side=oriented.sideDirection,w=oriented.slideWeight||0,p=oriented.pose;
 const shift=oriented.groundOffset;
 const center={x:finite(root?.x)+shift.x-d.x*r*1.0*w,y:finite(root?.y)+shift.y-d.y*r*1.0*w};
 const pivot={x:center.x,y:center.y-r*.75-finite(p.lift)*r};
 const theta=finite(p.lean)*Math.PI/180,sy=p.squash?.[1]||1;
 const head={x:pivot.x+Math.sin(theta)*r*2.65*sy+finite(p.lag)*r,y:pivot.y-Math.cos(theta)*r*2.65*sy};
 const footToe={x:finite(root?.x)+shift.x+d.x*r*(.30+1.60*w)+side.x*r*finite(p.shoeSide),y:finite(root?.y)+shift.y+d.y*r*(.30+1.60*w)+side.y*r*finite(p.shoeSide)};
 const shoe={x:footToe.x-d.x*r*.24,y:footToe.y-d.y*r*.24};
 return {pivot,head,footToe,shoe,headRadius:r*.60,torsoHeight:r*2.25*sy,shoeAlpha:Math.max(w,finite(p.shoeAlpha)),direction:d};
}
