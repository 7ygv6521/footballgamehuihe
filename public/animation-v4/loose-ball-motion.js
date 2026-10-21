/** Compact loose-ball playback only. No verdict, RNG, possession or grid changes. */
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
export function quickLooseTiming(distance=0){
 const approach=clamp(.22+Math.max(0,distance)/110,.25,.36);
 return {approach,recover:.30,cushion:.035,total:approach+.30};
}
/** Brief acceleration/braking, steady middle; no whole-path slow glide. */
export function quickLooseProgress(q){
 q=clamp(q);const edge=.08,norm=1-edge;
 return q<edge?q*q/(2*edge*norm):q>1-edge?1-(1-q)*(1-q)/(2*edge*norm):(q-edge/2)/norm;
}
export function quickLoosePoint(from,to,start,end,elapsed){
 const q=quickLooseProgress((elapsed-start)/Math.max(.001,end-start));
 return {x:from.x+(to.x-from.x)*q,y:from.y+(to.y-from.y)*q};
}
/** One readable lean. No per-frame bounce or high-frequency gait. */
export function quickLoosePose(moving,controlled=false,keeper=false){
 return {lean:keeper&&controlled?3:moving?14:controlled?6:2,shift:0,lift:0,lag:-.03,head:0,sway:0,slideFoot:0,squash:[1,1]};
}
