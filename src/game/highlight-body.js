import {sampleFootballPose} from './football-actions.js';

// These are body performances, not new outcomes. The existing player renderer
// supplies the same head and torso with eight-direction projection as V4.
export const HIGHLIGHT_BODY_IDS=new Set(['C02','C04','C05','C06','C07','C11','C24','C26','N01','N02']);
const clamp=x=>Math.max(0,Math.min(1,x));
const smooth=x=>{x=clamp(x);return x*x*(3-2*x);};
const rest=()=>sampleFootballPose('mark_run',0,{moving:false});

export function sampleHighlightBody(scene,role,q){
 q=clamp(q);
 if(q>=.94)return rest();
 if(role==='defender'){
  if(scene==='C02')return sampleFootballPose('slide_miss',clamp((q-.15)/.58));
  if(scene==='C24')return q<.68?sampleFootballPose('cut_lane_run',q/.68):sampleFootballPose('block_control',clamp((q-.68)/.25));
  if(scene==='C05'){const body=sampleFootballPose('cover_run',q);const brake=q>.42&&q<.78?Math.sin(Math.PI*(q-.42)/.36):0;body.lean+=32*brake;body.shift+=.27*brake;return body;}
  if(scene==='C07'){const body=sampleFootballPose('forward_run',q);const overrun=q>.68&&q<.94?Math.sin(Math.PI*(q-.68)/.26):0;body.lean+=20*overrun;return body;}
  if(scene==='C26'){const body=sampleFootballPose('press',clamp((q-.20)/.48));const reach=q>.28&&q<.68?Math.sin(Math.PI*(q-.28)/.40):0;body.shift+=.34*reach;body.sway+=.18*reach;body.lean+=24*reach;return body;}
  if(scene==='N02'){const body=sampleFootballPose('cover_run',q);body.head+=q>.27&&q<.72?-.28*Math.sin(Math.PI*(q-.27)/.45):0;return body;}
  return q<.65?sampleFootballPose('cover_run',q/.65):rest();
 }
 if(role==='receiver'){
  if(scene==='C26')return q<.77?sampleFootballPose('forward_run',q/.77):sampleFootballPose('receive_run',clamp((q-.77)/.19));
  return q<.72?sampleFootballPose('receive_run',q/.72):sampleFootballPose('block_control',clamp((q-.72)/.22));
 }
 if(scene==='C02'){
  const body=sampleFootballPose('forward_run',clamp((q-.15)/.57));
  body.lean=q<.47?-13:q<.72?19:8;
  body.lift=Math.max(body.lift,q>.28&&q<.69?1.0*Math.sin(Math.PI*(q-.28)/.41):0);
  return body;
 }
 if(scene==='C04'){
  const body=sampleFootballPose('feint_escape',q);
  body.lean+=Math.sin(Math.PI*2*smooth(clamp((q-.12)/.65)))*27;
  body.shift+=.16*Math.sin(Math.PI*2*clamp(q/.72));
  return body;
 }
 if(scene==='C05'){
  const body=sampleFootballPose('feint_escape',q);
  const touch=Math.sin(Math.PI*4*clamp(q/.66));
  body.sway+=.18*touch;body.shift+=.20*touch;body.lean+=8*touch;
  return body;
 }
 if(scene==='C06'){
  const body=sampleFootballPose('feint_escape',q);
  const out=Math.sin(Math.PI*2*clamp(q/.62));
  body.shift+=.27*out;body.sway+=.26*out;body.lean+=16*out;
  return body;
 }
 if(scene==='C07'){
  if(q<.20)return sampleFootballPose('forward_run',q/.20);
  if(q<.68){const body=sampleFootballPose('feint_escape',(q-.20)/.48*.66);body.lean-=16*smooth((q-.20)/.48);body.shift-=.16;return body;}
  return sampleFootballPose('forward_run',(q-.68)/.32);
 }
 if(scene==='C24')return q<.35?sampleFootballPose('cut_lane_run',q/.35):sampleFootballPose('block_control',clamp((q-.35)/.49));
 if(scene==='N02'){
  const body=sampleFootballPose('wall_pass',clamp(q/.13));
  if(q>.02&&q<.12)body.lift+=.17*Math.sin(Math.PI*(q-.02)/.10);
  return body;
 }
 if(scene==='N01')return sampleFootballPose('wall_return',clamp(q/.13));
 if(scene==='C11'){const body=sampleFootballPose('wall_pass',clamp(q/.17));const stroke=Math.sin(Math.PI*clamp((q-.03)/.17));body.sway+=.23*stroke;body.lean+=18*stroke;return body;}
 if(scene==='C26'||scene==='C24')return sampleFootballPose('wall_pass',clamp(q/.13));
 return rest();
}
