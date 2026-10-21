// src/game/football-actions.js
var FOOTBALL_ACTIONS = Object.freeze({
  header_attack: "\u8FDB\u653B\u4E89\u9876",
  header_defend: "\u9632\u5B88\u4E89\u9876",
  header_miss: "\u4E89\u9876\u672A\u89E6\u7403",
  volley: "\u51CC\u7A7A\u5C04\u95E8",
  volley_miss: "\u51CC\u7A7A\u672A\u8E22\u5230",
  slide_win: "\u94F2\u7403\u593A\u5F97\u63A7\u5236",
  slide_loose: "\u94F2\u7403\u4F7F\u7403\u677E\u5F00",
  slide_miss: "\u94F2\u7403\u672A\u6210\u529F",
  feint_stay: "\u539F\u5730\u6643\u52A8\u62A4\u7403",
  feint_escape: "\u6643\u52A8\u540E\u53D8\u5411\u5E26\u79BB",
  feint_lost: "\u5047\u52A8\u4F5C\u88AB\u8BC6\u7834",
  double_press: "\u5939\u62A2\u4E3B\u62A2\u8005",
  double_support: "\u5939\u62A2\u534F\u9632\u8005",
  dispossessed: "\u88AB\u65AD\u7403\u540E\u8F6C\u8EAB",
  block_miss: "\u5C01\u5835\u672A\u6321\u4F4F",
  block_control: "\u5C01\u5835\u540E\u63A7\u7403",
  save_miss: "\u6251\u6551\u672A\u6321\u4F4F",
  mark_run: "\u76EF\u4EBA\u7AD9\u4F4D\u8C03\u6574",
  cover_run: "\u8865\u4F4D\u8DD1\u52A8",
  cut_lane_run: "\u6CBF\u771F\u5B9E\u7EBF\u8DEF\u5C01\u7EBF",
  support_run: "\u63A5\u5E94\u8DD1\u52A8",
  wide_support_run: "\u62C9\u8FB9\u8DD1\u52A8",
  receive_run: "\u8FCE\u7403\u8DD1\u52A8",
  forward_run: "\u524D\u63D2\u8DD1\u52A8",
  second_ball_run: "\u8DDF\u8FDB\u7B2C\u4E8C\u843D\u70B9",
  receive_miss: "\u6CA1\u6709\u63A5\u5230\u7403",
  keeper_release: "\u95E8\u5C06\u653E\u7403\u5230\u811A\u4E0B",
  keeper_second_claim: "\u95E8\u5C06\u4E8C\u6B21\u6536\u7403",
  followup_shot: "\u8DDF\u8FDB\u8865\u5C04",
  wall_pass: "\u4E8C\u8FC7\u4E00\u7B2C\u4E00\u811A",
  wall_return: "\u4E8C\u8FC7\u4E00\u56DE\u4F20"
}), clamp = (x) => Number.isFinite(x) ? Math.max(0, Math.min(1, x)) : 0, base = () => ({ lean: 0, shift: 0, lift: 0, lag: 0, head: 0, sway: 0, slideFoot: 0, squash: [1, 1] }), frame = (t, p) => [t, { ...base(), ...p }], clips = {
  header_attack: [frame(0, { lean: -8, lift: -0.1 }), frame(0.22, { lean: -13, lift: -0.16, squash: [1.03, 0.91] }), frame(0.4, { lean: -12, lift: 1.1, lag: 0.08 }), frame(0.45, { lean: 25, lift: 1.16, head: 0.18, lag: -0.23 }), frame(0.62, { lean: 18, lift: 0.8, head: 0.08 }), frame(0.82, { lean: 9, lift: -0.18, squash: [1.07, 0.88] }), frame(1, {})],
  header_defend: [frame(0, { lean: -5, lift: -0.1 }), frame(0.22, { lean: -15, lift: -0.15, squash: [1.06, 0.9] }), frame(0.4, { lean: -18, lift: 1.08, head: -0.05, lag: 0.1 }), frame(0.45, { lean: 21, lift: 1.16, head: 0.12, lag: -0.2 }), frame(0.62, { lean: 11, lift: 0.8 }), frame(0.82, { lean: 6, lift: -0.16, squash: [1.08, 0.9] }), frame(1, {})],
  header_miss: [frame(0, { lean: -5, lift: -0.1 }), frame(0.23, { lean: -9, lift: -0.15 }), frame(0.43, { lean: -8, lift: 1.08, head: -0.04 }), frame(0.62, { lean: 3, lift: 0.85 }), frame(0.83, { lean: 7, lift: -0.17, squash: [1.05, 0.9] }), frame(1, {})],
  volley: [frame(0, { lean: 11, shift: 0.1 }), frame(0.26, { lean: -24, shift: -0.16, lift: 0.1, lag: 0.13 }), frame(0.45, { lean: 34, shift: 0.38, lift: 0.21, lag: -0.17, squash: [1.07, 0.96] }), frame(0.63, { lean: 41, shift: 0.39, lift: 0.12, head: 0.05 }), frame(0.84, { lean: 15, shift: 0.15, lift: -0.12 }), frame(1, {})],
  volley_miss: [frame(0, { lean: 11 }), frame(0.26, { lean: -24, shift: -0.16, lift: 0.1 }), frame(0.45, { lean: 36, shift: 0.36, lift: 0.21 }), frame(0.66, { lean: 48, shift: 0.31, lift: -0.12, head: 0.15 }), frame(0.85, { lean: 17, lift: -0.1 }), frame(1, {})],
  slide_win: [frame(0, { lean: 12, lift: -0.08 }), frame(0.14, { lean: -28, lift: -0.28, slideFoot: 0.3 }), frame(0.3, { lean: -70, lift: -0.65, slideFoot: 0.9 }), frame(0.45, { lean: -83, lift: -0.75, lag: 0.06, head: -0.02, slideFoot: 1, squash: [1.06, 0.96] }), frame(0.62, { lean: -78, lift: -0.74, slideFoot: 1 }), frame(0.76, { lean: -49, lift: -0.5, slideFoot: 0.9, squash: [1.03, 0.91] }), frame(0.88, { lean: -17, lift: -0.22, slideFoot: 0.45 }), frame(1, { lean: 7 })],
  slide_loose: [frame(0, { lean: 12, lift: -0.08 }), frame(0.14, { lean: -27, lift: -0.28, slideFoot: 0.3 }), frame(0.3, { lean: -69, lift: -0.65, slideFoot: 0.9 }), frame(0.45, { lean: -82, lift: -0.75, lag: 0.05, head: -0.02, slideFoot: 1, squash: [1.05, 0.96] }), frame(0.64, { lean: -79, lift: -0.74, slideFoot: 1 }), frame(0.78, { lean: -46, lift: -0.49, slideFoot: 0.85, squash: [1.03, 0.9] }), frame(0.9, { lean: -12, lift: -0.19, slideFoot: 0.35 }), frame(1, {})],
  slide_miss: [frame(0, { lean: 12, lift: -0.08 }), frame(0.14, { lean: -28, lift: -0.27, slideFoot: 0.3 }), frame(0.3, { lean: -68, lift: -0.65, slideFoot: 0.9 }), frame(0.45, { lean: -82, lift: -0.75, lag: 0.05, head: -0.02, slideFoot: 1, squash: [1.05, 0.96] }), frame(0.66, { lean: -80, lift: -0.74, slideFoot: 1 }), frame(0.79, { lean: -48, lift: -0.49, slideFoot: 0.85, squash: [1.03, 0.9] }), frame(0.91, { lean: -12, lift: -0.18, slideFoot: 0.3 }), frame(1, {})],
  feint_lost: [frame(0, { lean: 6 }), frame(0.26, { lean: -19, sway: -0.28, lag: 0.1 }), frame(0.45, { lean: 18, sway: 0.29 }), frame(0.61, { lean: -21, shift: -0.1, lift: -0.1, head: 0.1 }), frame(0.85, { lean: 9, head: -0.07 }), frame(1, { lean: 4 })],
  dispossessed: [frame(0, { lean: 9 }), frame(0.25, { lean: -18, shift: -0.13, lag: 0.1 }), frame(0.5, { lean: 7, head: -0.13, sway: 0.12 }), frame(0.75, { lean: 17, shift: 0.1, lag: -0.1 }), frame(1, { lean: 12 })],
  block_miss: [frame(0, { lean: 8 }), frame(0.25, { lean: 14, lift: -0.07 }), frame(0.45, { lean: 23, shift: 0.23, lift: -0.12, squash: [1.15, 0.88] }), frame(0.63, { lean: 26, shift: 0.18, head: 0.1 }), frame(1, {})],
  block_control: [frame(0, { lean: 8 }), frame(0.25, { lean: 14, lift: -0.07 }), frame(0.45, { lean: 19, shift: 0.19, lift: -0.12, squash: [1.12, 0.9] }), frame(0.65, { lean: 7, shift: 0.06, lift: -0.17, lag: -0.05 }), frame(0.83, { lean: 9, lift: -0.07 }), frame(1, { lean: 4 })],
  save_miss: [frame(0, { lean: 9, lift: -0.13, squash: [1.04, 0.92] }), frame(0.28, { lean: 20, lift: -0.1 }), frame(0.45, { lean: 65, shift: 0.34, lift: 0.34, lag: -0.2 }), frame(0.65, { lean: 76, shift: 0.26, lift: -0.2 }), frame(0.82, { lean: 34, lift: -0.24 }), frame(1, { lean: 8, lift: -0.05 })],
  receive_miss: [frame(0, { lean: 16, shift: 0.15 }), frame(0.35, { lean: 12, shift: 0.06 }), frame(0.6, { lean: -7, shift: -0.03, head: -0.1, sway: 0.06 }), frame(0.85, { lean: 7, head: -0.08 }), frame(1, {})],
  keeper_release: [frame(0, { lean: 3, lift: -0.06 }), frame(0.3, { lean: 15, lift: -0.13, head: 0.1, lag: -0.08 }), frame(0.45, { lean: 28, lift: -0.23, head: 0.16, lag: -0.11 }), frame(0.64, { lean: 18, lift: -0.13 }), frame(0.82, { lean: 6 }), frame(1, { lean: -7, shift: -0.05 })],
  keeper_second_claim: [frame(0, { lean: 20, shift: 0.17 }), frame(0.28, { lean: 25, lift: -0.16 }), frame(0.45, { lean: 43, lift: -0.32, head: 0.14, lag: -0.14, squash: [1.05, 0.91] }), frame(0.66, { lean: 28, lift: -0.24 }), frame(0.85, { lean: 8, lift: -0.1 }), frame(1, { lean: 3, lift: -0.06 })]
}, kick = [frame(0, { lean: 12, shift: 0.1 }), frame(0.26, { lean: -13, shift: -0.12, lag: 0.07 }), frame(0.45, { lean: 27, shift: 0.32, lag: -0.17, lift: 0.04 }), frame(0.64, { lean: 32, shift: 0.35, lag: -0.1 }), frame(0.84, { lean: 13, shift: 0.1 }), frame(1, {})];
clips.followup_shot = kick;
clips.wall_pass = kick;
clips.wall_return = kick;
function sampleFrames(frames, q) {
  let a = frames[0], b = frames.at(-1);
  for (let i = 1; i < frames.length; i++)
    if (q <= frames[i][0]) {
      a = frames[i - 1], b = frames[i];
      break;
    }
  let t = clamp((q - a[0]) / (b[0] - a[0] || 1));
  t = t * t * (3 - 2 * t);
  let p = base();
  for (let k of ["lean", "shift", "lift", "lag", "head", "sway", "slideFoot"]) p[k] = a[1][k] + (b[1][k] - a[1][k]) * t;
  return p.squash = a[1].squash.map((v, i) => v + (b[1].squash[i] - v) * t), p;
}
function sampleFootballPose(kind, q, options = {}) {
  q = clamp(q);
  let p = base();
  if (kind === "feint_stay" || kind === "feint_escape") {
    let end = kind === "feint_escape" ? 0.66 : 1, local = clamp(q / end), wave = Math.sin(local * Math.PI * 4) * Math.sin(local * Math.PI);
    if (p.sway = wave * 0.52, p.lean = wave * 20, p.head = -wave * 0.2, p.lift = -0.055 * Math.sin(local * Math.PI), p.lag = -wave * 0.08, kind === "feint_escape" && q > 0.66) {
      let run = sampleFootballPose("forward_run", (q - 0.66) / 0.34, options), a = clamp((q - 0.66) / 0.12), t = a * a * (3 - 2 * a);
      for (let k of ["lean", "shift", "lift", "lag", "head", "sway", "slideFoot"]) run[k] *= t;
      return run;
    }
    return p;
  }
  if (kind.endsWith("_run") || kind === "double_press" || kind === "double_support") {
    let phase = q * Math.PI * 6, pulse = Math.sin(phase), moving = options.moving !== !1, leaned = { mark_run: 8, cover_run: 13, cut_lane_run: 10, support_run: 11, wide_support_run: 10, receive_run: 12, forward_run: 19, second_ball_run: 20, double_press: 25, double_support: 15 }[kind] || 12;
    if (p.lean = moving ? leaned + pulse * 3 : leaned * 0.35, p.shift = moving ? 0.12 + pulse * 0.06 : 0, p.lift = moving ? Math.abs(pulse) * 0.1 - 0.02 : -0.07, p.lag = -0.06, p.head = ["mark_run", "cover_run", "cut_lane_run", "double_support"].includes(kind) ? -0.1 : 0.02, p.sway = ["mark_run", "wide_support_run", "double_support"].includes(kind) ? Math.sin(phase) * 0.09 : 0, q > 0.7 && kind === "double_press") {
      let t = (q - 0.7) / 0.3;
      p.lean += t * 7, p.lift -= t * 0.08;
    }
    return p;
  }
  return clips[kind] ? sampleFrames(clips[kind], q) : p;
}

// src/game/highlight-body.js
var HIGHLIGHT_BODY_IDS = /* @__PURE__ */ new Set(["C02", "C04", "C05", "C06", "C07", "C11", "C24", "C26", "N01", "N02"]), clamp2 = (x) => Math.max(0, Math.min(1, x)), smooth = (x) => (x = clamp2(x), x * x * (3 - 2 * x)), rest = () => sampleFootballPose("mark_run", 0, { moving: !1 });
function sampleHighlightBody(scene, role, q) {
  if (q = clamp2(q), q >= 0.94) return rest();
  if (role === "defender") {
    if (scene === "C02") return sampleFootballPose("slide_miss", clamp2((q - 0.15) / 0.58));
    if (scene === "C24") return q < 0.68 ? sampleFootballPose("cut_lane_run", q / 0.68) : sampleFootballPose("block_control", clamp2((q - 0.68) / 0.25));
    if (scene === "C05") {
      let body = sampleFootballPose("cover_run", q), brake = q > 0.42 && q < 0.78 ? Math.sin(Math.PI * (q - 0.42) / 0.36) : 0;
      return body.lean += 32 * brake, body.shift += 0.27 * brake, body;
    }
    if (scene === "C07") {
      let body = sampleFootballPose("forward_run", q), overrun = q > 0.68 && q < 0.94 ? Math.sin(Math.PI * (q - 0.68) / 0.26) : 0;
      return body.lean += 20 * overrun, body;
    }
    if (scene === "C26") {
      let body = sampleFootballPose("press", clamp2((q - 0.2) / 0.48)), reach = q > 0.28 && q < 0.68 ? Math.sin(Math.PI * (q - 0.28) / 0.4) : 0;
      return body.shift += 0.34 * reach, body.sway += 0.18 * reach, body.lean += 24 * reach, body;
    }
    if (scene === "N02") {
      let body = sampleFootballPose("cover_run", q);
      return body.head += q > 0.27 && q < 0.72 ? -0.28 * Math.sin(Math.PI * (q - 0.27) / 0.45) : 0, body;
    }
    return q < 0.65 ? sampleFootballPose("cover_run", q / 0.65) : rest();
  }
  if (role === "receiver")
    return scene === "C26" ? q < 0.77 ? sampleFootballPose("forward_run", q / 0.77) : sampleFootballPose("receive_run", clamp2((q - 0.77) / 0.19)) : q < 0.72 ? sampleFootballPose("receive_run", q / 0.72) : sampleFootballPose("block_control", clamp2((q - 0.72) / 0.22));
  if (scene === "C02") {
    let body = sampleFootballPose("forward_run", clamp2((q - 0.15) / 0.57));
    return body.lean = q < 0.47 ? -13 : q < 0.72 ? 19 : 8, body.lift = Math.max(body.lift, q > 0.28 && q < 0.69 ? 1 * Math.sin(Math.PI * (q - 0.28) / 0.41) : 0), body;
  }
  if (scene === "C04") {
    let body = sampleFootballPose("feint_escape", q);
    return body.lean += Math.sin(Math.PI * 2 * smooth(clamp2((q - 0.12) / 0.65))) * 27, body.shift += 0.16 * Math.sin(Math.PI * 2 * clamp2(q / 0.72)), body;
  }
  if (scene === "C05") {
    let body = sampleFootballPose("feint_escape", q), touch = Math.sin(Math.PI * 4 * clamp2(q / 0.66));
    return body.sway += 0.18 * touch, body.shift += 0.2 * touch, body.lean += 8 * touch, body;
  }
  if (scene === "C06") {
    let body = sampleFootballPose("feint_escape", q), out = Math.sin(Math.PI * 2 * clamp2(q / 0.62));
    return body.shift += 0.27 * out, body.sway += 0.26 * out, body.lean += 16 * out, body;
  }
  if (scene === "C07") {
    if (q < 0.2) return sampleFootballPose("forward_run", q / 0.2);
    if (q < 0.68) {
      let body = sampleFootballPose("feint_escape", (q - 0.2) / 0.48 * 0.66);
      return body.lean -= 16 * smooth((q - 0.2) / 0.48), body.shift -= 0.16, body;
    }
    return sampleFootballPose("forward_run", (q - 0.68) / 0.32);
  }
  if (scene === "C24") return q < 0.35 ? sampleFootballPose("cut_lane_run", q / 0.35) : sampleFootballPose("block_control", clamp2((q - 0.35) / 0.49));
  if (scene === "N02") {
    let body = sampleFootballPose("wall_pass", clamp2(q / 0.13));
    return q > 0.02 && q < 0.12 && (body.lift += 0.17 * Math.sin(Math.PI * (q - 0.02) / 0.1)), body;
  }
  if (scene === "N01") return sampleFootballPose("wall_return", clamp2(q / 0.13));
  if (scene === "C11") {
    let body = sampleFootballPose("wall_pass", clamp2(q / 0.17)), stroke = Math.sin(Math.PI * clamp2((q - 0.03) / 0.17));
    return body.sway += 0.23 * stroke, body.lean += 18 * stroke, body;
  }
  return scene === "C26" || scene === "C24" ? sampleFootballPose("wall_pass", clamp2(q / 0.13)) : rest();
}

// src/game/motion-directions.js
var finite = (n, f = 0) => Number.isFinite(n) ? n : f, clamp3 = (n, a = 0, b = 1) => Math.max(a, Math.min(b, finite(n))), DIRECTIONS_8 = Object.freeze([
  { id: "E", label: "\u53F3", x: 1, y: 0 },
  { id: "SE", label: "\u53F3\u4E0B", x: Math.SQRT1_2, y: Math.SQRT1_2 },
  { id: "S", label: "\u4E0B", x: 0, y: 1 },
  { id: "SW", label: "\u5DE6\u4E0B", x: -Math.SQRT1_2, y: Math.SQRT1_2 },
  { id: "W", label: "\u5DE6", x: -1, y: 0 },
  { id: "NW", label: "\u5DE6\u4E0A", x: -Math.SQRT1_2, y: -Math.SQRT1_2 },
  { id: "N", label: "\u4E0A", x: 0, y: -1 },
  { id: "NE", label: "\u53F3\u4E0A", x: Math.SQRT1_2, y: -Math.SQRT1_2 }
].map(Object.freeze));
function normalizeDirection(v, fallback = { x: 1, y: 0 }) {
  let x = finite(v?.x), y = finite(v?.y), len = Math.hypot(x, y);
  if (len > 1e-9) return { x: x / len, y: y / len };
  let fx = finite(fallback?.x, 1), fy = finite(fallback?.y), fl = Math.hypot(fx, fy) || 1;
  return { x: fx / fl, y: fy / fl };
}
function orientFootballPose(basePose, screenDirection, { slide = !1, radius = 14, q = 0 } = {}) {
  let d = normalizeDirection(screenDirection), side = { x: -d.y, y: d.x }, r = Math.max(0.01, finite(radius, 14)), forward = finite(basePose?.shift), lateral = finite(basePose?.sway), pose = { ...basePose, shift: 0, sway: 0, lag: finite(basePose?.lag) * d.x, lean: finite(basePose?.lean) * d.x }, slideWeight = slide ? clamp3(finite(basePose?.slideFoot, Math.sin(clamp3(q) * Math.PI))) : 0;
  return slide && (pose.lean = 0, pose.lift = 0, pose.squash = [1, 1]), { pose, rendererFacing: 1, direction: d, sideDirection: side, slideWeight, groundOffset: { x: r * (forward * d.x + lateral * side.x), y: r * (forward * d.y + lateral * side.y) } };
}
function directionalFootballAnchors(root, radius, oriented) {
  let r = Math.max(0.01, finite(radius, 14)), d = oriented.direction, side = oriented.sideDirection, w = oriented.slideWeight || 0, p = oriented.pose, shift = oriented.groundOffset, center = { x: finite(root?.x) + shift.x - d.x * r * 1 * w, y: finite(root?.y) + shift.y - d.y * r * 1 * w }, pivot = { x: center.x, y: center.y - r * 0.75 - finite(p.lift) * r }, theta = finite(p.lean) * Math.PI / 180, sy = p.squash?.[1] || 1, head = { x: pivot.x + Math.sin(theta) * r * 2.65 * sy + finite(p.lag) * r, y: pivot.y - Math.cos(theta) * r * 2.65 * sy }, footToe = { x: finite(root?.x) + shift.x + d.x * r * (0.3 + 1.6 * w) + side.x * r * finite(p.shoeSide), y: finite(root?.y) + shift.y + d.y * r * (0.3 + 1.6 * w) + side.y * r * finite(p.shoeSide) }, shoe = { x: footToe.x - d.x * r * 0.24, y: footToe.y - d.y * r * 0.24 };
  return { pivot, head, footToe, shoe, headRadius: r * 0.6, torsoHeight: r * 2.25 * sy, shoeAlpha: Math.max(w, finite(p.shoeAlpha)), direction: d };
}

// src/game/presentation/figure.js
function prepareFootballFigure(root, radius, rawPose, screenDirection, { slide = !1, q = 0 } = {}) {
  let oriented = orientFootballPose(rawPose, screenDirection, { slide, radius, q });
  return { oriented, anchors: directionalFootballAnchors(root, radius, oriented) };
}
function drawFootballFigure(ctx, { radius, figure, side, num, goalkeeper = !1, offset = { x: 0, y: 0 }, numberFont }) {
  let r = radius, { oriented, anchors: a } = figure, pose = oriented.pose, d = oriented.direction, dx = offset.x || 0, dy = offset.y || 0;
  if (oriented.slideWeight > 0.04) {
    let w = oriented.slideWeight, root = { x: a.pivot.x + dx + d.x * r * w, y: a.pivot.y + dy + r * 0.75 + d.y * r * w }, hip = { x: root.x + d.x * r * 0.18 * w, y: root.y - r * 0.2 * (1 - w) + d.y * r * 0.18 * w }, shoulder = { x: hip.x - d.x * r * 1.85 * w, y: hip.y - r * 1.75 * (1 - w) - d.y * r * 1.85 * w }, head = { x: shoulder.x - d.x * r * 0.42 * w, y: shoulder.y - r * 0.58 * (1 - w) - d.y * r * 0.42 * w };
    return ctx.save(), ctx.lineCap = "round", ctx.strokeStyle = side === 0 ? goalkeeper ? "#f5c518" : "#1e6fff" : goalkeeper ? "#7dff6a" : "#e53935", ctx.lineWidth = r * 1.25, ctx.beginPath(), ctx.moveTo(hip.x, hip.y), ctx.lineTo(shoulder.x, shoulder.y), ctx.stroke(), ctx.fillStyle = "#f1c9a5", ctx.beginPath(), ctx.arc(head.x, head.y, r * 0.6, 0, Math.PI * 2), ctx.fill(), ctx.fillStyle = "#26343b", ctx.beginPath(), ctx.arc(head.x + d.x * r * 0.4, head.y + d.y * r * 0.25, r * 0.1, 0, Math.PI * 2), ctx.fill(), ctx.restore(), a;
  }
  return ctx.save(), ctx.translate(a.pivot.x + dx, a.pivot.y + dy), ctx.rotate(pose.lean * Math.PI / 180), pose.squash && ctx.scale(...pose.squash), ctx.fillStyle = side === 0 ? goalkeeper ? "#f5c518" : "#1e6fff" : goalkeeper ? "#7dff6a" : "#e53935", ctx.fillRect(-r * 0.72, -r * 2.25, r * 1.44, r * 2.25), ctx.fillStyle = "#fff", ctx.textAlign = "center", ctx.font = `bold ${Math.round(numberFont ?? r * 0.82)}px Inter,sans-serif`, ctx.fillText(String(num), 0, -r * 0.82), ctx.restore(), ctx.fillStyle = "#f1c9a5", ctx.beginPath(), ctx.arc(a.head.x + dx, a.head.y + dy, r * 0.6, 0, Math.PI * 2), ctx.fill(), ctx.fillStyle = "#26343b", ctx.beginPath(), ctx.arc(a.head.x + dx + d.x * r * 0.42, a.head.y + dy + d.y * r * 0.22, r * 0.1, 0, Math.PI * 2), ctx.fill(), a;
}

// src/game/presentation/recorded-event.js
var point = (value) => value && Number.isFinite(value.x) && Number.isFinite(value.y) ? { x: value.x, y: value.y, z: value.z || 0 } : null;
function controlledBallVisual(physical, owner, progress = 1) {
  let from = point(physical), to = point(owner);
  if (!to) return from;
  if (!from) return to;
  let t = Math.max(0, Math.min(1, progress));
  return { x: from.x + (to.x - from.x) * t, y: from.y + (to.y - from.y) * t, z: (from.z || 0) * (1 - t) + (to.z || 0) * t };
}
function recordedEventView(sample) {
  let before = point(sample.ballStateBefore?.renderedBall) || point(sample.ballStart) || point(sample.start), actionBall = sample.actionOutcomeState?.ball || null, phaseBall = sample.ballStateAfter || null, owner = actionBall?.carrier ? sample.players?.find((p) => p.name === actionBall.carrier) : null, impact = point(sample.result?.impactPoint) || point(sample.result?.landing) || point(sample.end), settled = owner ? controlledBallVisual(impact || actionBall?.renderedBall, owner.to) : point(actionBall?.renderedBall) || point(actionBall?.ball) || impact || point(sample.ballEnd) || before;
  return {
    ballStart: before,
    ballEnd: settled,
    impact,
    ownerId: owner?.id || null,
    actionBall,
    phaseBall,
    phaseStateAfter: sample.phaseStateAfter || null
  };
}

// src/game/presentation/highlight-choreography.js
var clamp4 = (x) => Math.max(0, Math.min(1, x)), ease = (x) => (x = clamp4(x), x * x * (3 - 2 * x)), mix = (a, b, t) => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, z: (a.z || 0) + ((b.z || 0) - (a.z || 0)) * t }), frame2 = (from, to) => {
  let dx = to.x - from.x, dy = to.y - from.y, n = Math.hypot(dx, dy) || 1;
  return { f: { x: dx / n, y: dy / n }, s: { x: -dy / n, y: dx / n } };
}, add = (p, v, d) => ({ x: p.x + v.x * d, y: p.y + v.y * d, z: p.z || 0 }), travel = (from, to, u, start = 0.1, end = 0.88) => mix(from, to, ease((u - start) / (end - start)));
function technicalPlayerPoint(scene, role, u, from, to, { actorFrom = from, actorTo = to, defenderFrom = null, attackDirection = 1 } = {}) {
  if (u = clamp4(u), u >= 0.94) return to;
  let { f, s } = scene === "C07" ? { f: { x: attackDirection, y: 0 }, s: { x: 0, y: attackDirection } } : frame2(actorFrom, actorTo);
  if (role === "defender" && scene === "C05") {
    let follow = u < 0.22 ? 0 : u < 0.42 ? 2.25 * ease((u - 0.22) / 0.2) : u < 0.56 ? 2.25 + 0.65 * ease((u - 0.42) / 0.14) : u < 0.82 ? 2.9 * (1 - ease((u - 0.56) / 0.26)) : 0;
    return add(travel(from, to, u), s, follow);
  }
  if (role === "defender" && scene === "C07") {
    let overrun = add(to, f, 0.9);
    return u < 0.75 ? mix(from, overrun, clamp4((u - 0.08) / 0.67)) : travel(overrun, to, u, 0.75, 0.94);
  }
  if (role !== "actor") return travel(from, to, u);
  if (scene === "C04") {
    if (!defenderFrom) return travel(from, to, u);
    let center = defenderFrom, r = Math.max(2.8, Math.hypot(from.x - center.x, from.y - center.y)), start = Math.atan2(from.y - center.y, from.x - center.x), end = Math.atan2(to.y - center.y, to.x - center.x), positive = Math.sin(end - start) >= 0 ? 1 : -1, theta = start + positive * Math.PI * ease((u - 0.2) / 0.52), around = { x: center.x + Math.cos(theta) * r, y: center.y + Math.sin(theta) * r };
    return u < 0.2 ? from : u < 0.72 ? around : mix(around, to, ease((u - 0.72) / 0.22));
  }
  return scene === "C05" ? u < 0.22 ? from : u < 0.43 ? add(from, s, 1.7 * ease((u - 0.22) / 0.21)) : u < 0.6 ? add(add(from, s, 1.7 - 3.7 * ease((u - 0.43) / 0.17)), f, 0.35 * ease((u - 0.43) / 0.17)) : travel(add(add(from, s, -2), f, 0.35), to, u, 0.6, 0.92) : scene === "C06" ? u < 0.24 ? from : u < 0.4 ? add(from, s, 0.65 * ease((u - 0.24) / 0.16)) : u < 0.54 ? add(from, s, 0.65 - 1.6 * ease((u - 0.4) / 0.14)) : travel(add(from, s, -0.95), to, u, 0.54, 0.91) : scene === "C07" ? u < 0.28 ? travel(from, add(from, f, 1.65), u, 0.08, 0.28) : u < 0.42 ? add(from, f, 1.65) : travel(add(from, f, 1.65), to, u, 0.42, 0.91) : travel(from, to, u);
}
function interceptionPlayerPoint(u, from, contact, control) {
  return u = clamp4(u), u < 0.12 ? from : u < 0.68 ? mix(from, contact, ease((u - 0.12) / 0.56)) : mix(contact, control, ease((u - 0.68) / 0.26));
}
function interceptionBallAfterTouch(u, contact, control, passStart) {
  u = clamp4(u);
  let dx = contact.x - passStart.x, dy = contact.y - passStart.y, n = Math.hypot(dx, dy) || 1, lateral = { x: -dy / n, y: dx / n }, toward = (control.x - contact.x) * lateral.x + (control.y - contact.y) * lateral.y, sign = toward ? -Math.sign(toward) : contact.y > 34 ? -1 : 1, out = { x: Math.max(0, Math.min(104.99, contact.x + (control.x - contact.x) * 0.42 + lateral.x * sign * 2.1)), y: Math.max(0, Math.min(67.99, contact.y + (control.y - contact.y) * 0.42 + lateral.y * sign * 2.1)), z: 0 };
  return u < 0.68 ? contact : u < 0.79 ? mix(contact, out, ease((u - 0.68) / 0.11)) : mix(out, control, ease((u - 0.79) / 0.15));
}
function technicalBallPoint(scene, u, start, end, actorPoint, actorFrom, actorTo, attackDirection = 1, defenderFrom = null) {
  if (u = clamp4(u), u >= 0.94) return end;
  let { f, s } = scene === "C07" ? { f: { x: attackDirection, y: 0 }, s: { x: 0, y: attackDirection } } : frame2(actorFrom, actorTo), foot = (p2) => add(p2, f, 0.62);
  if (scene === "C04") {
    let radial = defenderFrom ? frame2(defenderFrom, actorPoint).f : f, near = add(actorPoint, radial, 0.72);
    return u < 0.12 ? mix(start, near, u / 0.12) : u > 0.88 ? mix(near, end, ease((u - 0.88) / 0.06)) : near;
  }
  if (scene === "C05" || scene === "C06") {
    let first = scene === "C05" ? 2 : 2.1, second = scene === "C05" ? -1.7 : -2;
    if (u < 0.17) return start;
    if (u < 0.38) return mix(start, add(add(actorFrom, f, 0.7), s, first), ease((u - 0.17) / 0.21));
    if (u < 0.54) return mix(add(add(actorFrom, f, 0.7), s, first), add(add(actorFrom, f, 1.05), s, second), ease((u - 0.38) / 0.16));
    let pursuit = foot(actorPoint);
    return u < 0.88 ? pursuit : mix(pursuit, end, ease((u - 0.88) / 0.06));
  }
  if (scene === "C07") {
    let pushed = add(actorFrom, f, 2.35);
    return u < 0.14 ? start : u < 0.31 ? mix(start, pushed, ease((u - 0.14) / 0.17)) : u < 0.43 ? pushed : u < 0.65 ? mix(pushed, add(actorFrom, f, -0.35), ease((u - 0.43) / 0.22)) : mix(add(actorFrom, f, -0.35), end, ease((u - 0.65) / 0.29));
  }
  let p = foot(actorPoint);
  return u < 0.1 ? mix(start, p, u / 0.1) : u > 0.88 ? mix(p, end, ease((u - 0.88) / 0.06)) : p;
}
function spinDirection(scene, u, normal) {
  if (scene !== "C04" || u < 0.22 || u > 0.7) return normal;
  let a = (u - 0.22) / 0.48 * Math.PI * 2, c = Math.cos(a), s = Math.sin(a);
  return { x: normal.x * c - normal.y * s, y: normal.x * s + normal.y * c };
}

// src/animation-review/review.js
var $ = (selector) => document.querySelector(selector), cards = $("#cards"), toast = $("#toast"), status = $("#cloud-status"), indicator = $("#cloud-indicator"), savedBoard = localStorage.getItem("footballAnimationReviewBoard"), queryBoard = new URL(location.href).searchParams.get("board"), validBoard = (value) => /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(value || ""), board = validBoard(queryBoard) ? queryBoard : validBoard(savedBoard) ? savedBoard : "e4d14dc0-8e16-40fa-9540-8a1663b85eaa";
localStorage.setItem("footballAnimationReviewBoard", board);
if (queryBoard !== board) {
  let url = new URL(location.href);
  url.searchParams.set("board", board), history.replaceState(null, "", url);
}
var scenes = [], comments = [], filter = "all", search = new URL(location.href).searchParams.get("scene")?.trim().toLowerCase() || "", timer = null, motion = /* @__PURE__ */ new Map(), observer = new IntersectionObserver((entries) => {
  for (let entry of entries) {
    let m = motion.get(entry.target.dataset.id);
    m && (m.visible = entry.isIntersecting);
  }
}, { rootMargin: "180px" }), clamp5 = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v)), lerp = (a, b, t) => a + (b - a) * t, ease2 = (t) => (t = clamp5(t), t * t * (3 - 2 * t)), mix2 = (a, b, t) => ({ x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t), z: lerp(a.z || 0, b.z || 0, t) }), dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y), esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
function notice(message) {
  toast.textContent = message, toast.classList.add("show"), clearTimeout(timer), timer = setTimeout(() => toast.classList.remove("show"), 2400);
}
function setCloud(ok, message) {
  indicator.classList.toggle("ok", ok), indicator.classList.toggle("error", !ok), status.textContent = message;
}
function routePoint(route, t) {
  if (!route?.start || !route?.end) return null;
  let a = route.start, b = route.end, q = clamp5(t), control = route.control, p = control ? { x: (1 - q) ** 2 * a.x + 2 * (1 - q) * q * control.x + q * q * b.x, y: (1 - q) ** 2 * a.y + 2 * (1 - q) * q * control.y + q * q * b.y } : mix2(a, b, q);
  if (!control && route.bend) {
    let dx = b.x - a.x, dy = b.y - a.y, length = Math.hypot(dx, dy) || 1, offset = 4 * q * (1 - q) * route.bend;
    p = { x: p.x - dy / length * offset, y: p.y + dx / length * offset };
  }
  return { ...p, z: lerp(a.z || 0, b.z || 0, q) + 4 * q * (1 - q) * (route.apex || 0) };
}
function routeSettled(route, start, end, t) {
  if (!route) return mix2(start, end, t);
  let p = routePoint(route, t), a = routePoint(route, 0), b = routePoint(route, 1), chord = mix2(a, b, t), base2 = mix2(start, end, t);
  return { x: base2.x + p.x - chord.x, y: base2.y + p.y - chord.y, z: p.z || 0 };
}
function pathPoint(points, t) {
  if (!points?.length) return null;
  if (points.length === 1) return points[0];
  let lengths = points.slice(1).map((p, i) => dist(points[i], p)), total = lengths.reduce((a, b) => a + b, 0) || 1, remaining = clamp5(t) * total;
  for (let i = 0; i < lengths.length; i++) {
    if (remaining <= lengths[i] || i === lengths.length - 1) return mix2(points[i], points[i + 1], lengths[i] ? remaining / lengths[i] : 1);
    remaining -= lengths[i];
  }
  return points.at(-1);
}
function samplePlayer(scene, player, u) {
  let sample = scene.sample, sequence = sample.sequence, active = player.participant || player.opponent || player.actor, start = 0.1, end = 0.86;
  sequence?.kind === "double-save" && player.id === sequence.secondShooterId && (start = 0.05, end = 0.48), sequence?.kind === "first-touch-escape" && player.id === sequence.receiverId && (start = 0.53, end = 0.9), sequence?.kind === "cut-through-pass" && player.id === sequence.defenderId && (start = 0.08, end = 0.58), scene.id === "C26" && player.opponent && (start = 0.04, end = 0.32), scene.id === "C11" && player.opponent && (start = 0.04, end = 0.32);
  let t = ease2(clamp5((u - start) / (end - start))), p = pathPoint(player.path, t) || mix2(player.from, player.to, t);
  if (sequence?.kind === "cut-through-pass" && player.id === sequence.defenderId) {
    let contact = sequence.steps.find((step) => step.kind === "intercept")?.at || sequence.controlAt;
    p = interceptionPlayerPoint(u, player.from, contact, sequence.controlAt);
  }
  if (active && ["C04", "C05", "C06", "C07"].includes(scene.id)) {
    let actor = sample.players.find((q) => q.actor), defender = sample.players.find((q) => q.opponent);
    actor && (player.actor || player.opponent) && (p = technicalPlayerPoint(scene.id, player.actor ? "actor" : "defender", u, player.from, player.to, { actorFrom: actor.from, actorTo: actor.to, defenderFrom: defender?.from, attackDirection: sample.side ? -1 : 1 }));
  }
  let pose = active && u > 0.12 && u < 0.85 ? "run" : "stand";
  if (player.participant && ["C18", "C19", "C20"].includes(scene.id) && u > 0.46 && u < 0.7 && (p = { ...p, z: 2.2 * Math.sin(Math.PI * clamp5((u - 0.46) / 0.24)) }, pose = "jump"), scene.id === "C02" && player.participant && u > 0.27 && u < 0.58 && (p = { ...p, z: 2.4 * Math.sin(Math.PI * clamp5((u - 0.27) / 0.31)) }, pose = "jump"), scene.id === "C01" && player.participant && u > 0.25 && u < 0.58 && (pose = "rainbow"), ["D02", "C02", "C01"].includes(scene.id) && player.opponent && u > 0.3 && u < 0.7 && (pose = "slide"), scene.id === "C17" && player.id === sequence?.keeperId && u > 0.26 && u < 0.88 && (pose = "save"), scene.id === "C21" && player.participant && u > 0.35 && u < 0.7 && (pose = "poke"), scene.id === "C24" && player.participant && u > 0.4 && u < 0.8 && (pose = "intercept"), ["C05", "C06", "C07", "C04"].includes(scene.id) && player.participant && u > 0.25 && u < 0.75 && (pose = "skill"), scene.id === "C26" && player.opponent && u > 0.32 && u < 0.7) {
    let hit = sample.route && routePoint(sample.route, 0.52);
    (hit ? dist(p, hit) : 1) < 8 && (p = { ...p, x: p.x + (hit.x - p.x) * 0.14 * Math.sin(Math.PI * (u - 0.32) / 0.38), y: p.y + (hit.y - p.y) * 0.14 * Math.sin(Math.PI * (u - 0.32) / 0.38) }), pose = "hook-miss";
  }
  return ["A05", "C19", "N03"].includes(scene.id) && player.actor && u > 0.35 && u < 0.65 && (pose = "shot"), { ...p, pose, active };
}
function stageRoute(sequence, index) {
  return sequence?.steps?.[index]?.route || null;
}
function sampleBall(scene, u, positions) {
  let s = scene.sample, seq = s.sequence, start = s.ballStart || s.start, end = s.ballEnd || s.end || start, route = s.route;
  if (!start || !end) return { x: 52.5, y: 34, z: 0 };
  let k = seq?.kind;
  if (k === "double-save")
    return u < 0.13 ? start : u < 0.36 ? routePoint(stageRoute(seq, 0), (u - 0.13) / 0.23) || mix2(start, end, u) : u < 0.54 ? routePoint(stageRoute(seq, 1), (u - 0.36) / 0.18) || end : u < 0.64 ? stageRoute(seq, 1)?.end || end : u < 0.84 ? routePoint(stageRoute(seq, 2), (u - 0.64) / 0.2) || end : { ...end, z: u < 0.94 ? 0.6 : 0 };
  if (k === "rainbow-over-scripted-slide" || k === "man-ball-split") return u < 0.1 ? start : u < 0.76 ? routePoint(route, (u - 0.1) / 0.66) || mix2(start, end, u) : end;
  if (k === "evade-scripted-slide") return u < 0.09 ? start : u < 0.34 ? mix2(start, end, ease2((u - 0.09) / 0.25)) : end;
  if (k === "pre-shot-poke") return u < 0.4 ? start : u < 0.75 ? mix2(start, end, ease2((u - 0.4) / 0.35)) : end;
  if (k === "cut-through-pass") {
    let hit = routePoint(route, seq.contactT || 0.65) || seq.steps?.find((v) => v.kind === "intercept")?.at || start, controlled = seq.controlAt || end;
    return u < 0.12 ? start : u < 0.68 ? routePoint(route, (u - 0.12) / 0.56 * (seq.contactT || 0.65)) || mix2(start, hit, u) : interceptionBallAfterTouch(u, hit, controlled, start);
  }
  if (k === "first-touch-escape") return u < 0.1 ? start : u < 0.56 ? routePoint(route, (u - 0.1) / 0.46) || mix2(start, end, u) : u < 0.86 ? mix2(seq.touch || end, seq.exit || end, ease2((u - 0.56) / 0.3)) : end;
  if (scene.id === "C12" && s.previous)
    return u < 0.08 ? s.previous.start || start : u < 0.44 ? routePoint(s.previous.route, (u - 0.08) / 0.36) || mix2(s.previous.start || start, s.previous.end || start, (u - 0.08) / 0.36) : u < 0.55 ? start : routePoint(route, (u - 0.55) / 0.38) || mix2(start, end, ease2((u - 0.55) / 0.38));
  if (scene.id === "N01" && s.previous)
    return u < 0.07 ? s.previous.start : u < 0.45 ? routeSettled(s.previous.route, s.previous.start, s.previous.end, (u - 0.07) / 0.38) : u < 0.5 ? s.previous.end : u < 0.87 ? routeSettled(route, start, end, (u - 0.5) / 0.37) : end;
  if (s.action === "pass" || ["C11", "N01", "N02", "C26", "S05", "N04"].includes(scene.id)) return u < 0.06 ? start : u < 0.73 ? routeSettled(route, start, end, (u - 0.06) / 0.67) : end;
  if (["C18", "C19", "C20"].includes(scene.id)) return u < 0.15 ? start : u < 0.62 ? routePoint(route, (u - 0.15) / 0.47) || mix2(start, end, ease2((u - 0.15) / 0.47)) : end;
  if (["A05", "N03"].includes(scene.id) && s.action === "shoot") return u < 0.36 ? start : u < 0.86 ? routePoint(route, (u - 0.36) / 0.5) || mix2(start, end, ease2((u - 0.36) / 0.5)) : end;
  if (["C04", "C05", "C06", "C07"].includes(scene.id)) {
    let actor = s.players.find((p2) => p2.actor), p = actor && positions.get(actor.id);
    if (p) return technicalBallPoint(scene.id, u, start, end, p, actor.from, actor.to, s.side ? -1 : 1, s.players.find((q) => q.opponent)?.from);
  }
  return u < 0.12 ? start : u < 0.78 ? routePoint(route, (u - 0.12) / 0.66) || mix2(start, end, ease2((u - 0.12) / 0.66)) : end;
}
function camera(scene) {
  let s = scene.sample, points = [s.ballStart, s.ballEnd, s.start, s.end, s.previous?.start, s.previous?.end, ...s.players.filter((p) => p.participant || p.opponent || p.actor).flatMap((p) => [p.from, p.to])].filter(Boolean), x0 = Math.min(...points.map((p) => p.x)), x1 = Math.max(...points.map((p) => p.x)), y0 = Math.min(...points.map((p) => p.y)), y1 = Math.max(...points.map((p) => p.y)), width = Math.max(38, x1 - x0 + 17, (y1 - y0 + 12) * 16 / 9), height = width * 9 / 16;
  height > 68 && (height = 68, width = height * 16 / 9);
  let cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
  return { left: cx - width / 2, top: cy - height / 2, width, height };
}
function drawBody(ctx, scene, p, q, u, sx, sy, W, H) {
  let x = sx(q.x), y = sy(q.y), z = (q.z || 0) * 9, r = 14;
  if (x < -25 || x > W + 25 || y < -25 || y > H + 25) return;
  let seq = scene.sample.sequence, role = p.id === seq?.defenderId || !p.actor && p.id === scene.sample.opponentId ? "defender" : p.actor || scene.id === "N01" && p.id === scene.sample.previous?.actorId ? "actor" : p.participant ? "receiver" : null, direction = { x: p.to.x - p.from.x, y: p.to.y - p.from.y };
  if (p.actor && scene.sample.action === "pass" && (direction = { x: scene.sample.ballEnd.x - p.from.x, y: scene.sample.ballEnd.y - p.from.y }), role === "defender") {
    let target = scene.id === "C02" && seq?.steps?.find((step) => step.kind === "ball-touch-away")?.to || scene.sample.ballStart;
    direction = { x: target.x - p.from.x, y: target.y - p.from.y };
  }
  role === "actor" && (direction = spinDirection(scene.id, u, direction)), scene.id === "C07" && u < 0.39 && (role === "actor" || role === "defender") && (direction = { x: scene.sample.side ? -1 : 1, y: 0 });
  let length = Math.hypot(direction.x, direction.y) || 1;
  direction = { x: direction.x / length, y: direction.y / length };
  let screen = { x: sx(q.x + direction.x) - sx(q.x), y: sy(q.y + direction.y) - sy(q.y) }, bodyTime = scene.id === "N01" && scene.sample.previous && p.actor ? clamp5((u - 0.49) / 0.51) : u, raw = role ? sampleHighlightBody(scene.id, role, bodyTime) : q.pose === "run" ? { lean: 12, lift: 0.05, shift: 0.1, lag: -0.04, squash: [1, 1] } : { lean: 0, shift: 0, lift: 0, lag: 0, squash: [1, 1] }, figure = prepareFootballFigure({ x, y: y - z }, r, raw, screen, { slide: scene.id === "C02" && role === "defender", q: u });
  ctx.fillStyle = "#081c20a8", ctx.beginPath(), ctx.ellipse(x, y + 2, r * 1.1, r * 0.39, 0, 0, Math.PI * 2), ctx.fill(), role && (ctx.strokeStyle = "#efffa9", ctx.lineWidth = 2, ctx.beginPath(), ctx.ellipse(x, y + 1, r * 1.5, r * 0.65, 0, 0, Math.PI * 2), ctx.stroke()), drawFootballFigure(ctx, { radius: r, figure, side: p.side, num: p.num, goalkeeper: p.num === 1 });
}
function drawScene(scene, canvas, u) {
  let ctx = canvas.getContext("2d"), W = canvas.width, H = canvas.height, view = scene._camera || (scene._camera = camera(scene)), sx = (x) => (x - view.left) / view.width * W, sy = (y) => (y - view.top) / view.height * H;
  ctx.clearRect(0, 0, W, H), ctx.fillStyle = "#25773b", ctx.fillRect(0, 0, W, H);
  for (let col = 0; col < 19; col++) {
    let x = sx(col * 105 / 19), next = sx((col + 1) * 105 / 19);
    ctx.fillStyle = col % 2 ? "#2b8540" : "#26793c", ctx.fillRect(x, 0, next - x, H);
  }
  ctx.save(), ctx.strokeStyle = "#ffffff24", ctx.lineWidth = 1;
  for (let col = 0; col <= 19; col++) {
    let x = sx(col * 105 / 19);
    ctx.beginPath(), ctx.moveTo(x, 0), ctx.lineTo(x, H), ctx.stroke();
  }
  for (let row = 0; row <= 11; row++) {
    let y = sy(row * 68 / 11);
    ctx.beginPath(), ctx.moveTo(0, y), ctx.lineTo(W, y), ctx.stroke();
  }
  ctx.restore(), ctx.save(), ctx.strokeStyle = "#ffffffb8", ctx.lineWidth = 2;
  let rect = (x, y, w, h) => ctx.strokeRect(sx(x), sy(y), w / view.width * W, h / view.height * H);
  rect(0, 0, 105, 68), ctx.beginPath(), ctx.moveTo(sx(52.5), sy(0)), ctx.lineTo(sx(52.5), sy(68)), ctx.stroke(), ctx.beginPath(), ctx.ellipse(sx(52.5), sy(34), 9.15 / view.width * W, 9.15 / view.height * H, 0, 0, Math.PI * 2), ctx.stroke();
  for (let side of [0, 1]) {
    rect(side ? 88.42105263157895 : 0, 204 / 11, 315 / 19, 340 / 11);
    let small = side ? 105 - 105 / 19 : 0;
    rect(small, 272 / 11, 105 / 19, 204 / 11);
  }
  ctx.restore();
  let positions = new Map(scene.sample.players.map((p) => [p.id, samplePlayer(scene, p, u)]));
  if (scene.id === "C11" && scene.sample.route) {
    let route = scene.sample.route, progress = clamp5((u - 0.06) / 0.67);
    ctx.save(), ctx.strokeStyle = "#ff7373bd", ctx.lineWidth = 2.5, ctx.setLineDash([7, 5]), ctx.beginPath(), ctx.moveTo(sx(route.start.x), sy(route.start.y)), ctx.lineTo(sx(route.end.x), sy(route.end.y)), ctx.stroke(), ctx.setLineDash([]), ctx.strokeStyle = "#fff0a9", ctx.lineWidth = 4, ctx.beginPath();
    for (let i = 0; i <= 40; i++) {
      let t = i / 40, p = routePoint(route, t);
      if (!p || t > progress) break;
      i ? ctx.lineTo(sx(p.x), sy(p.y)) : ctx.moveTo(sx(p.x), sy(p.y));
    }
    ctx.stroke(), ctx.restore();
  }
  if (scene.id === "N01" && scene.sample.previous) {
    let prev = scene.sample.previous;
    ctx.save(), ctx.setLineDash([5, 5]), ctx.strokeStyle = "#f6f6beaa", ctx.lineWidth = 2, ctx.beginPath(), ctx.moveTo(sx(prev.start.x), sy(prev.start.y)), ctx.lineTo(sx(prev.end.x), sy(prev.end.y)), ctx.stroke(), ctx.restore();
  }
  for (let p of scene.sample.players) {
    if (!p.participant && !p.opponent && !p.actor) continue;
    let actor = scene.sample.players.find((q) => q.actor), defender = scene.sample.players.find((q) => q.opponent), points = ["C04", "C05", "C06", "C07"].includes(scene.id) && (p.actor || p.opponent) ? Array.from({ length: 41 }, (_, i) => technicalPlayerPoint(scene.id, p.actor ? "actor" : "defender", i / 40, p.from, p.to, { actorFrom: actor.from, actorTo: actor.to, defenderFrom: defender?.from, attackDirection: scene.sample.side ? -1 : 1 })) : p.path?.length ? p.path : [p.from, p.to];
    ctx.save(), ctx.setLineDash([4, 5]), ctx.strokeStyle = p.side === 0 ? "#a7dbff99" : "#ffd4b599", ctx.lineWidth = 1.7, ctx.beginPath(), points.forEach((v, i) => i ? ctx.lineTo(sx(v.x), sy(v.y)) : ctx.moveTo(sx(v.x), sy(v.y))), ctx.stroke(), ctx.restore();
  }
  let ball = sampleBall(scene, u, positions);
  for (let p of [...scene.sample.players].sort((a, b) => positions.get(a.id).y - positions.get(b.id).y)) drawBody(ctx, scene, p, positions.get(p.id), u, sx, sy, W, H);
  let bx = sx(ball.x), by = sy(ball.y), height = (ball.z || 0) * 9;
  bx > -20 && bx < W + 20 && by > -20 && by < H + 20 && (ctx.fillStyle = "#10251e7a", ctx.beginPath(), ctx.ellipse(bx, by, 5, 2.2, 0, 0, Math.PI * 2), ctx.fill(), ctx.fillStyle = "#f5f8e9", ctx.strokeStyle = "#1d3128", ctx.lineWidth = 1.3, ctx.beginPath(), ctx.arc(bx, by - height - 3, 5.2, 0, Math.PI * 2), ctx.fill(), ctx.stroke(), ctx.fillStyle = "#26372b", ctx.beginPath(), ctx.arc(bx + 1, by - height - 4, 1.4, 0, Math.PI * 2), ctx.fill()), ctx.fillStyle = "#071a17b8", ctx.fillRect(9, H - 30, 194, 20), ctx.fillStyle = "#ddf3db", ctx.font = "700 10px Inter,sans-serif", ctx.fillText(`${scene.id} \xB7 ${scene.sample.actor} \xB7 E${scene.sourceEvent}`, 16, H - 16);
}
function stageLabel(scene, u) {
  let phases = scene.phases.length ? scene.phases : [scene.condition, scene.result];
  return phases[Math.min(phases.length - 1, Math.floor(u * phases.length))] || scene.name;
}
function animate(now) {
  for (let m of motion.values())
    m.visible && (m.playing ? (m.u = (now - m.started) / m.duration % 1, drawScene(m.scene, m.canvas, m.u), m.progress.style.width = m.u * 100 + "%", m.chip.textContent = stageLabel(m.scene, m.u)) : m.drawn || (drawScene(m.scene, m.canvas, m.u), m.drawn = !0));
  requestAnimationFrame(animate);
}
function download(name, mime, text) {
  let a = document.createElement("a"), url = URL.createObjectURL(new Blob([text], { type: mime }));
  a.href = url, a.download = name, a.click(), setTimeout(() => URL.revokeObjectURL(url), 1e3);
}
function exportPayload() {
  return { format: "football-animation-review-v464", board, source: "V4.64 \u7559\u8A00\u4FEE\u6B63\u7248\uFF1B\u6B21\u6570\u6765\u81EA\u5341\u573A\u65B0\u7248\u5B8C\u6574\u6BD4\u8D5B", exportedAt: (/* @__PURE__ */ new Date()).toISOString(), scenes: scenes.map((scene) => ({ id: scene.id, name: scene.name, expectedPerMatch: scene.count10 / 10, observedInTenMatches: scene.count10, condition: scene.condition, comments: comments.filter((c) => c.sceneId === scene.id), unsentDraft: document.querySelector(`#scene-${scene.id} textarea`)?.value.trim() || "" })) };
}
function markdown() {
  let d = exportPayload();
  return ["# \u8DB3\u7403\u7CBE\u5F69\u52A8\u4F5C\u8BC4\u5BA1", "", `\u5341\u573A\u539F\u751F\u6BD4\u8D5B\u5B9E\u6D4B\uFF1B\u9996\u6279 10 \u7C7B\u3002\u5BFC\u51FA\u65F6\u95F4\uFF1A${d.exportedAt}`, `\u7559\u8A00\u677F\u94FE\u63A5\uFF1A${location.href}`, "", ...d.scenes.flatMap((s) => [`## ${s.id} ${s.name}`, `\u5341\u573A ${s.observedInTenMatches} \u6B21\uFF1B\u573A\u5747\u53C2\u8003 ${s.expectedPerMatch.toFixed(1)} \u6B21\u3002`, `\u89E6\u53D1\u6761\u4EF6\uFF1A${s.condition}`, "", ...s.comments.length ? s.comments.map((c) => `- ${c.createdAt}\uFF1A${c.body.replace(/\n/g, `
  `)}`) : ["- \u6682\u65E0\u5DF2\u4FDD\u5B58\u7559\u8A00"], ...s.unsentDraft ? [`- \u3010\u672A\u63D0\u4EA4\u8349\u7A3F\u3011${s.unsentDraft.replace(/\n/g, `
  `)}`] : [], ""])].join(`
`);
}
function renderComments() {
  for (let scene of scenes) {
    let list = document.querySelector(`#comments-${scene.id}`), items = comments.filter((c) => c.sceneId === scene.id);
    list && (list.innerHTML = items.length ? items.map((c) => `<div class="comment"><p>${esc(c.body)}</p><div class="comment-footer"><time>${esc(new Date(c.createdAt).toLocaleString("zh-CN"))}</time><button class="comment-delete" data-delete="${esc(c.id)}" aria-label="\u5220\u9664\u8FD9\u6761\u7559\u8A00">\u5220\u9664</button></div></div>`).join("") : '<p class="empty-note">\u8FD8\u6CA1\u6709\u7559\u8A00\u3002\u53EF\u76F4\u63A5\u5199\u4E0B\u5E0C\u671B\u4FEE\u6539\u7684\u52A8\u4F5C\u6216\u89E6\u53D1\u6761\u4EF6\u3002</p>', document.querySelector(`#comment-total-${scene.id}`).textContent = `${items.length} \u6761`);
  }
  $("#comment-count").textContent = `${comments.filter((c) => HIGHLIGHT_BODY_IDS.has(c.sceneId)).length} \u6761\u672C\u671F\u7559\u8A00`, applyFilter();
}
function applyFilter() {
  let visible = 0;
  for (let scene of scenes) {
    let card = document.getElementById(`scene-${scene.id}`), matches = (filter === "all" || scene.group === filter || filter === "commented" && comments.some((c) => c.sceneId === scene.id)) && (!search || `${scene.id} ${scene.name} ${scene.condition}`.toLowerCase().includes(search));
    card.classList.toggle("hidden", !matches), visible += matches;
  }
  $("#all-count").textContent = String(scenes.length);
}
function cardHtml(scene) {
  let group = { individual: "\u4E2A\u4EBA\u6280\u672F", team: "\u56E2\u961F\u914D\u5408", defence: "\u7CBE\u5F69\u9632\u5B88" }[scene.group], reuse = "V4.64 \u7559\u8A00\u4FEE\u6B63\u7248", steps = scene.phases.length ? scene.phases : [scene.condition, scene.result];
  return `<article class="card" id="scene-${scene.id}" data-id="${scene.id}"><div class="card-head"><div class="card-kicker"><span class="id">${scene.id}</span><span class="pill">${group}</span><span class="pill">${reuse}</span></div><h3>${esc(scene.name)}</h3><div class="metrics"><div class="metric"><strong>${(scene.count10 / 10).toFixed(1)}</strong><span>\u65B0\u7248\u573A\u5747\u53C2\u8003</span></div><div class="metric"><strong>${scene.count10}</strong><span>\u65B0\u7248\u5341\u573A\u89E6\u53D1</span></div><div class="metric"><strong>${scene.matchesSeen}/10</strong><span>\u65B0\u7248\u51FA\u73B0\u6BD4\u8D5B</span></div></div><p class="condition"><b>\u89E6\u53D1\u6761\u4EF6\u3000</b>${esc(scene.condition)}</p><p class="outcome">\u7ED3\u679C\uFF1A${esc(scene.result)}</p></div><div class="motion-wrap"><div class="motion-stage"><canvas width="600" height="338" aria-label="${esc(scene.name)} \u52A8\u753B"></canvas><span class="stage-chip">${esc(steps[0])}</span><span class="source-chip">\u5B8C\u6574\u6A21\u62DF E${scene.sourceEvent}</span></div></div><div class="controls"><button data-replay="${scene.id}">\u21BA \u91CD\u65B0\u64AD\u653E</button><span class="progress"><span></span></span><button data-pause="${scene.id}">\u6682\u505C</button></div><div class="steps">${steps.map((step, i) => `<span>${i + 1} ${esc(step)}</span>`).join("")}</div><div class="feedback"><h4>\u7ED9 ${scene.id} \u7559\u8A00 <small id="comment-total-${scene.id}">0 \u6761</small></h4><div class="comment-list" id="comments-${scene.id}"></div><form class="comment-form" data-scene="${scene.id}"><textarea maxlength="4000" placeholder="\u4F8B\u5982\uFF1A\u8D77\u811A\u592A\u6162\uFF1B\u5E0C\u671B\u9632\u5B88\u8005\u4ECE\u7403\u5458\u53F3\u4FA7\u6ED1\u5165\u2026" aria-label="\u7ED9 ${esc(scene.name)} \u7559\u8A00"></textarea><div class="row"><small>\u9010\u6761\u4FDD\u5B58\u5230\u4E91\u7AEF\uFF0C\u53EF\u96C6\u4E2D\u5BFC\u51FA</small><button type="submit">\u6DFB\u52A0\u7559\u8A00</button></div></form></div></article>`;
}
async function loadComments() {
  try {
    let response = await fetch(`/api/animation-review?board=${encodeURIComponent(board)}`, { cache: "no-store" }), data = await response.json();
    if (!response.ok) throw Error(data.error || "\u8BFB\u53D6\u5931\u8D25");
    comments = data.comments || [], setCloud(!0, "\u4E91\u7AEF\u7559\u8A00\u5DF2\u540C\u6B65"), renderComments();
  } catch (error) {
    setCloud(!1, error.message || "\u4E91\u7AEF\u6682\u4E0D\u53EF\u7528"), renderComments();
  }
}
async function saveComment(form) {
  let textarea = form.querySelector("textarea"), body = textarea.value.trim();
  if (!body) {
    textarea.focus();
    return;
  }
  let button = form.querySelector("button");
  button.disabled = !0, button.textContent = "\u4FDD\u5B58\u4E2D\u2026";
  try {
    let response = await fetch("/api/animation-review", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ board, sceneId: form.dataset.scene, body }) }), data = await response.json();
    if (!response.ok) throw Error(data.error || "\u4FDD\u5B58\u5931\u8D25");
    comments.push(data.comment), textarea.value = "", localStorage.removeItem(`animationDraft:${board}:${form.dataset.scene}`), setCloud(!0, "\u4E91\u7AEF\u7559\u8A00\u5DF2\u540C\u6B65"), renderComments(), notice("\u7559\u8A00\u5DF2\u4FDD\u5B58");
  } catch (error) {
    setCloud(!1, error.message || "\u4FDD\u5B58\u5931\u8D25"), notice("\u4FDD\u5B58\u672A\u5B8C\u6210\uFF0C\u5185\u5BB9\u4ECD\u5728\u8F93\u5165\u6846");
  } finally {
    button.disabled = !1, button.textContent = "\u6DFB\u52A0\u7559\u8A00";
  }
}
async function deleteComment(id) {
  if (confirm("\u5220\u9664\u8FD9\u6761\u7559\u8A00\uFF1F"))
    try {
      let response = await fetch("/api/animation-review", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ board, id }) }), data = await response.json();
      if (!response.ok) throw Error(data.error || "\u5220\u9664\u5931\u8D25");
      comments = comments.filter((c) => c.id !== id), renderComments(), notice("\u7559\u8A00\u5DF2\u5220\u9664");
    } catch (error) {
      notice(error.message || "\u5220\u9664\u5931\u8D25");
    }
}
async function init() {
  try {
    if (scenes = (await (await fetch("./scenes.json")).json()).scenes.filter((scene) => HIGHLIGHT_BODY_IDS.has(scene.id)), scenes.length !== 10) throw Error("\u52A8\u4F5C\u6E05\u5355\u6570\u91CF\u5F02\u5E38");
    for (let scene of scenes) {
      let view = recordedEventView(scene.sample);
      scene.sample.ballStart = view.ballStart, scene.sample.ballEnd = view.ballEnd, scene.sample.presentation = view;
    }
    cards.innerHTML = scenes.map(cardHtml).join(""), $("#search").value = search;
    for (let scene of scenes) {
      let article = document.getElementById(`scene-${scene.id}`), canvas = article.querySelector("canvas"), chip = article.querySelector(".stage-chip"), progress = article.querySelector(".progress span");
      motion.set(scene.id, { scene, canvas, chip, progress, u: 0, started: performance.now() + Math.random() * 1600, duration: 4100, playing: !0, visible: !1, drawn: !1 }), observer.observe(article), drawScene(scene, canvas, 0);
      let input = article.querySelector("textarea");
      input.value = localStorage.getItem(`animationDraft:${board}:${scene.id}`) || "", input.addEventListener("input", () => localStorage.setItem(`animationDraft:${board}:${scene.id}`, input.value));
    }
    applyFilter(), requestAnimationFrame(animate), await loadComments();
  } catch (error) {
    cards.innerHTML = `<p>\u52A8\u753B\u6E05\u5355\u8BFB\u53D6\u5931\u8D25\uFF1A${esc(error.message)}</p>`, setCloud(!1, "\u9875\u9762\u6682\u4E0D\u53EF\u7528");
  }
}
cards.addEventListener("submit", (event) => {
  event.target.matches(".comment-form") && (event.preventDefault(), saveComment(event.target));
});
cards.addEventListener("click", (event) => {
  let replay = event.target.closest("[data-replay]"), pause = event.target.closest("[data-pause]"), del = event.target.closest("[data-delete]");
  if (replay) {
    let m = motion.get(replay.dataset.replay);
    m.started = performance.now(), m.u = 0, m.playing = !0, m.drawn = !1, replay.parentElement.querySelector("[data-pause]").textContent = "\u6682\u505C";
  }
  if (pause) {
    let m = motion.get(pause.dataset.pause);
    m.playing = !m.playing, m.playing ? m.started = performance.now() - m.u * m.duration : m.drawn = !1, pause.textContent = m.playing ? "\u6682\u505C" : "\u7EE7\u7EED";
  }
  del && deleteComment(del.dataset.delete);
});
document.querySelector(".filters").addEventListener("click", (event) => {
  let button = event.target.closest("[data-filter]");
  button && (filter = button.dataset.filter, document.querySelectorAll(".filters button").forEach((b) => b.classList.toggle("active", b === button)), applyFilter());
});
$("#search").addEventListener("input", (event) => {
  search = event.target.value.trim().toLowerCase(), applyFilter();
});
$("#share-board").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(location.href), notice("\u7559\u8A00\u677F\u94FE\u63A5\u5DF2\u590D\u5236");
  } catch {
    notice("\u8BF7\u4ECE\u6D4F\u89C8\u5668\u5730\u5740\u680F\u590D\u5236\u6B64\u94FE\u63A5");
  }
});
$("#export-markdown").addEventListener("click", () => {
  download("\u8DB3\u7403\u7CBE\u5F69\u52A8\u4F5C\u8BC4\u5BA1-\u7559\u8A00.md", "text/markdown;charset=utf-8", markdown()), notice("\u5DF2\u5BFC\u51FA Markdown");
});
$("#export-json").addEventListener("click", () => {
  download("\u8DB3\u7403\u7CBE\u5F69\u52A8\u4F5C\u8BC4\u5BA1-\u7559\u8A00.json", "application/json;charset=utf-8", JSON.stringify(exportPayload(), null, 2)), notice("\u5DF2\u5BFC\u51FA JSON");
});
init();
