/** Pure body samples. Ground positions belong exclusively to the game movement tracks.
 * q is clip-local time 0..1. Contact phase is exported for ball/body synchronization.
 * Existing renderer units: angles in degrees; other values in body radius units. */
export const FOOTBALL_CONTACT_PHASE = 0.45;
export const FOOTBALL_ACTIONS = Object.freeze({
 header_attack:'进攻争顶',header_defend:'防守争顶',header_miss:'争顶未触球',
 volley:'凌空射门',volley_miss:'凌空未踢到',slide_win:'铲球夺得控制',slide_loose:'铲球使球松开',slide_miss:'铲球未成功',
 feint_stay:'原地晃动护球',feint_escape:'晃动后变向带离',feint_lost:'假动作被识破',
 double_press:'夹抢主抢者',double_support:'夹抢协防者',dispossessed:'被断球后转身',
 block_miss:'封堵未挡住',block_control:'封堵后控球',save_miss:'扑救未挡住',
 mark_run:'盯人站位调整',cover_run:'补位跑动',cut_lane_run:'沿真实线路封线',support_run:'接应跑动',wide_support_run:'拉边跑动',receive_run:'迎球跑动',forward_run:'前插跑动',second_ball_run:'跟进第二落点',receive_miss:'没有接到球',
 keeper_release:'门将放球到脚下',keeper_second_claim:'门将二次收球',followup_shot:'跟进补射',wall_pass:'二过一第一脚',wall_return:'二过一回传'
});
const clamp=x=>Number.isFinite(x)?Math.max(0,Math.min(1,x)):0;
const base=()=>({lean:0,shift:0,lift:0,lag:0,head:0,sway:0,slideFoot:0,squash:[1,1]});
const frame=(t,p)=>[t,{...base(),...p}];
const clips={
 header_attack:[frame(0,{lean:-8,lift:-.10}),frame(.22,{lean:-13,lift:-.16,squash:[1.03,.91]}),frame(.40,{lean:-12,lift:1.10,lag:.08}),frame(.45,{lean:25,lift:1.16,head:.18,lag:-.23}),frame(.62,{lean:18,lift:.80,head:.08}),frame(.82,{lean:9,lift:-.18,squash:[1.07,.88]}),frame(1,{})],
 header_defend:[frame(0,{lean:-5,lift:-.1}),frame(.22,{lean:-15,lift:-.15,squash:[1.06,.9]}),frame(.40,{lean:-18,lift:1.08,head:-.05,lag:.10}),frame(.45,{lean:21,lift:1.16,head:.12,lag:-.2}),frame(.62,{lean:11,lift:.80}),frame(.82,{lean:6,lift:-.16,squash:[1.08,.9]}),frame(1,{})],
 header_miss:[frame(0,{lean:-5,lift:-.1}),frame(.23,{lean:-9,lift:-.15}),frame(.43,{lean:-8,lift:1.08,head:-.04}),frame(.62,{lean:3,lift:.85}),frame(.83,{lean:7,lift:-.17,squash:[1.05,.90]}),frame(1,{})],
 volley:[frame(0,{lean:11,shift:.1}),frame(.26,{lean:-24,shift:-.16,lift:.10,lag:.13}),frame(.45,{lean:34,shift:.38,lift:.21,lag:-.17,squash:[1.07,.96]}),frame(.63,{lean:41,shift:.39,lift:.12,head:.05}),frame(.84,{lean:15,shift:.15,lift:-.12}),frame(1,{})],
 volley_miss:[frame(0,{lean:11}),frame(.26,{lean:-24,shift:-.16,lift:.1}),frame(.45,{lean:36,shift:.36,lift:.21}),frame(.66,{lean:48,shift:.31,lift:-.12,head:.15}),frame(.85,{lean:17,lift:-.1}),frame(1,{})],
 slide_win:[frame(0,{lean:12,lift:-.08}),frame(.14,{lean:-28,lift:-.28,slideFoot:.3}),frame(.30,{lean:-70,lift:-.65,slideFoot:.9}),frame(.45,{lean:-83,lift:-.75,lag:.06,head:-.02,slideFoot:1,squash:[1.06,.96]}),frame(.62,{lean:-78,lift:-.74,slideFoot:1}),frame(.76,{lean:-49,lift:-.50,slideFoot:.9,squash:[1.03,.91]}),frame(.88,{lean:-17,lift:-.22,slideFoot:.45}),frame(1,{lean:7})],
 slide_loose:[frame(0,{lean:12,lift:-.08}),frame(.14,{lean:-27,lift:-.28,slideFoot:.3}),frame(.30,{lean:-69,lift:-.65,slideFoot:.9}),frame(.45,{lean:-82,lift:-.75,lag:.05,head:-.02,slideFoot:1,squash:[1.05,.96]}),frame(.64,{lean:-79,lift:-.74,slideFoot:1}),frame(.78,{lean:-46,lift:-.49,slideFoot:.85,squash:[1.03,.9]}),frame(.90,{lean:-12,lift:-.19,slideFoot:.35}),frame(1,{})],
 slide_miss:[frame(0,{lean:12,lift:-.08}),frame(.14,{lean:-28,lift:-.27,slideFoot:.3}),frame(.30,{lean:-68,lift:-.65,slideFoot:.9}),frame(.45,{lean:-82,lift:-.75,lag:.05,head:-.02,slideFoot:1,squash:[1.05,.96]}),frame(.66,{lean:-80,lift:-.74,slideFoot:1}),frame(.79,{lean:-48,lift:-.49,slideFoot:.85,squash:[1.03,.9]}),frame(.91,{lean:-12,lift:-.18,slideFoot:.3}),frame(1,{})],
 feint_lost:[frame(0,{lean:6}),frame(.26,{lean:-19,sway:-.28,lag:.1}),frame(.45,{lean:18,sway:.29}),frame(.61,{lean:-21,shift:-.1,lift:-.1,head:.1}),frame(.85,{lean:9,head:-.07}),frame(1,{lean:4})],
 dispossessed:[frame(0,{lean:9}),frame(.25,{lean:-18,shift:-.13,lag:.1}),frame(.5,{lean:7,head:-.13,sway:.12}),frame(.75,{lean:17,shift:.1,lag:-.1}),frame(1,{lean:12})],
 block_miss:[frame(0,{lean:8}),frame(.25,{lean:14,lift:-.07}),frame(.45,{lean:23,shift:.23,lift:-.12,squash:[1.15,.88]}),frame(.63,{lean:26,shift:.18,head:.1}),frame(1,{})],
 block_control:[frame(0,{lean:8}),frame(.25,{lean:14,lift:-.07}),frame(.45,{lean:19,shift:.19,lift:-.12,squash:[1.12,.9]}),frame(.65,{lean:7,shift:.06,lift:-.17,lag:-.05}),frame(.83,{lean:9,lift:-.07}),frame(1,{lean:4})],
 save_miss:[frame(0,{lean:9,lift:-.13,squash:[1.04,.92]}),frame(.28,{lean:20,lift:-.1}),frame(.45,{lean:65,shift:.34,lift:.34,lag:-.2}),frame(.65,{lean:76,shift:.26,lift:-.20}),frame(.82,{lean:34,lift:-.24}),frame(1,{lean:8,lift:-.05})],
 receive_miss:[frame(0,{lean:16,shift:.15}),frame(.35,{lean:12,shift:.06}),frame(.6,{lean:-7,shift:-.03,head:-.1,sway:.06}),frame(.85,{lean:7,head:-.08}),frame(1,{})],
 keeper_release:[frame(0,{lean:3,lift:-.06}),frame(.3,{lean:15,lift:-.13,head:.1,lag:-.08}),frame(.45,{lean:28,lift:-.23,head:.16,lag:-.11}),frame(.64,{lean:18,lift:-.13}),frame(.82,{lean:6}),frame(1,{lean:-7,shift:-.05})],
 keeper_second_claim:[frame(0,{lean:20,shift:.17}),frame(.28,{lean:25,lift:-.16}),frame(.45,{lean:43,lift:-.32,head:.14,lag:-.14,squash:[1.05,.91]}),frame(.66,{lean:28,lift:-.24}),frame(.85,{lean:8,lift:-.10}),frame(1,{lean:3,lift:-.06})]
};
const kick=[frame(0,{lean:12,shift:.1}),frame(.26,{lean:-13,shift:-.12,lag:.07}),frame(.45,{lean:27,shift:.32,lag:-.17,lift:.04}),frame(.64,{lean:32,shift:.35,lag:-.1}),frame(.84,{lean:13,shift:.1}),frame(1,{})];
clips.followup_shot=kick;clips.wall_pass=kick;clips.wall_return=kick;
function sampleFrames(frames,q){let a=frames[0],b=frames.at(-1);for(let i=1;i<frames.length;i++){if(q<=frames[i][0]){a=frames[i-1];b=frames[i];break;}}let t=clamp((q-a[0])/(b[0]-a[0]||1));t=t*t*(3-2*t);const p=base();for(const k of ['lean','shift','lift','lag','head','sway','slideFoot'])p[k]=a[1][k]+(b[1][k]-a[1][k])*t;p.squash=a[1].squash.map((v,i)=>v+(b[1].squash[i]-v)*t);return p;}
/** No random numbers, no possession decisions, no ground translation. */
export function sampleFootballPose(kind,q,options={}) {
 q=clamp(q);const p=base();
 if(kind==='feint_stay'||kind==='feint_escape'){
  const end=kind==='feint_escape'?.66:1, local=clamp(q/end),wave=Math.sin(local*Math.PI*4)*Math.sin(local*Math.PI);
  p.sway=wave*.52;p.lean=wave*20;p.head=-wave*.20;p.lift=-.055*Math.sin(local*Math.PI);p.lag=-wave*.08;
  if(kind==='feint_escape'&&q>.66){const run=sampleFootballPose('forward_run',(q-.66)/.34,options),a=clamp((q-.66)/.12),t=a*a*(3-2*a);for(const k of ['lean','shift','lift','lag','head','sway','slideFoot'])run[k]*=t;return run;}
  return p;
 }
 if(kind.endsWith('_run')||kind==='double_press'||kind==='double_support'){
  const phase=q*Math.PI*6, pulse=Math.sin(phase), moving=options.moving!==false;
  const leaned={mark_run:8,cover_run:13,cut_lane_run:10,support_run:11,wide_support_run:10,receive_run:12,forward_run:19,second_ball_run:20,double_press:25,double_support:15}[kind]||12;
  p.lean=moving?leaned+pulse*3:leaned*.35;p.shift=moving?.12+pulse*.06:0;p.lift=moving?Math.abs(pulse)*.1-.02:-.07;p.lag=-.06;p.head=['mark_run','cover_run','cut_lane_run','double_support'].includes(kind)?-.1:.02;
  p.sway=['mark_run','wide_support_run','double_support'].includes(kind)?Math.sin(phase)*.09:0;
  if(q>.7&&kind==='double_press'){const t=(q-.7)/.3;p.lean+=t*7;p.lift-=t*.08;}
  return p;
 }
 return clips[kind]?sampleFrames(clips[kind],q):p;
}

/** Screen geometry for the existing torso + head renderer. The extra marker is
 * a single shoe, visible only while sliding: no limbs and no world-state changes.
 * footToe is the physical leading contact point; the head always trails it. */
export function footballPoseAnchors(root,r,pose,facing=1) {
 const f=facing<0?-1:1,p={...base(),...pose},theta=p.lean*Math.PI/180*f,c=Math.cos(theta),sn=Math.sin(theta);
 const pivot={x:root.x+f*p.shift*r,y:root.y-r*.75-p.lift*r+p.sway*r};
 const local=(x,y)=>({x:pivot.x+x*c-y*sn,y:pivot.y+x*sn+y*c});
 const head=local(f*p.lag*r*p.squash[0],(-2.65+p.head)*r*p.squash[1]);
 const shoe={x:pivot.x+f*.30*r,y:pivot.y};
 const footToe={x:pivot.x+f*.55*r,y:pivot.y};
 return {pivot,head,shoe,footToe,shoeAlpha:p.slideFoot};
}
