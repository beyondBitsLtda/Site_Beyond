/* ══════════════════════════════════════════════════════════════
   CONTATO — um buraco negro e um buraco branco em 3D (22/11/2026)
   Os dois giram um em volta do outro. O branco brilha e cospe matéria (um disco que escorre
   para fora e dois jatos); um fio dessa matéria atravessa o espaço em espiral e cai no disco
   do buraco negro, que engole tudo.

   É um "ray marching" de verdade: para cada pixel um raio de luz sai da câmera e vai sendo
   curvado pela gravidade dos dois (a aproximação de Schwarzschild). Por isso aparecem a sombra
   negra, o anel de luz em volta dela e a parte de trás do disco dobrada por cima e por baixo.

   O fundo é o mesmo céu estrelado da seção (desenhado em js/vitrine.js). O canvas 3D só pinta
   perto dos buracos: ali ele usa esse céu como textura e mostra as estrelas distorcidas; longe
   deles fica transparente e aparece o céu de verdade, sem emenda.
   Só desenha com a seção na tela, e baixa a resolução sozinho se o computador sofrer.
══════════════════════════════════════════════════════════════ */
(function buracos() {
  'use strict';
  var secao = document.getElementById('contato');
  var tela = document.getElementById('ctaBuracos');
  if (!secao || !tela || typeof THREE === 'undefined') return;
  var reduzido = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var base = document.getElementById('ctaEstrelas');
  var brilhoA = document.getElementById('ctaBrilhoA');
  var brilhoB = document.getElementById('ctaBrilhoB');
  if (!base || !brilhoA || !brilhoB) return;

  var montado = false;
  if ('IntersectionObserver' in window) {
    var espia = new IntersectionObserver(function (e) {
      if (e[0].isIntersecting && !montado) { montado = true; espia.disconnect(); montar(); }
    }, { rootMargin: '600px 0px' });
    espia.observe(secao);
  } else {
    montado = true; montar();
  }

  var VERT = 'void main() { gl_Position = vec4(position.xy, 0.0, 1.0); }';

  var FRAG = [
    'uniform vec2 uRes;',
    'uniform vec2 uCentro;',
    'uniform float uFoco;',
    'uniform vec3 uCam, uF, uR, uU;',
    'uniform vec3 uB, uW, uN, uA1, uA2, uE1, uE2;',
    'uniform float uXB, uXW, uT, uPassos, uExpo;',
    'uniform sampler2D uCeu, uBrA, uBrB;',

    'const float RCB = 12.5;',   // esfera onde o canvas pinta, em volta do buraco negro (raio de Schwarzschild = 1)
    'const float KB = 10.0;',    // a partir daqui o céu não se distorce (emenda invisível)
    'const float RCW = 8.0;',    // o mesmo para o buraco branco
    'const float KW = 6.5;',
    'const float RSW = 0.5;',    // a "massa" do branco (curva a luz menos)
    'const float RW = 0.62;',    // a superfície do branco
    'const float DIN = 2.35;',   // disco do negro: borda de dentro e de fora
    'const float DOUT = 8.4;',
    'const float WOUT = 4.4;',   // até onde vai o disco que o branco cospe
    'const float TAU = 6.2831853;',

    'float hash(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }',
    'float ruido(vec2 p) {',
    '  vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);',
    '  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);',
    '}',
    // ruído que se repete em y (para dar a volta no ângulo sem emenda)
    'float ruidoP(vec2 p, float per) {',
    '  vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);',
    '  float y0 = mod(i.y, per), y1 = mod(i.y + 1.0, per);',
    '  return mix(mix(hash(vec2(i.x, y0)), hash(vec2(i.x + 1.0, y0)), f.x),',
    '             mix(hash(vec2(i.x, y1)), hash(vec2(i.x + 1.0, y1)), f.x), f.y);',
    '}',
    'float fbmP(vec2 p, float per) {',
    '  float s = 0.0, a = 0.5;',
    '  for (int i = 0; i < 4; i++) { s += a * ruidoP(p, per); p = p * 2.0 + vec2(13.7, 0.0); per *= 2.0; a *= 0.5; }',
    '  return s / 0.9375;',
    '}',

    'float entra(vec3 o, vec3 d, vec3 c, float r) {',
    '  vec3 oc = o - c; float b = dot(oc, d); float h = b * b - dot(oc, oc) + r * r;',
    '  if (h < 0.0) return -1.0;',
    '  h = sqrt(h);',
    '  if (-b + h < 0.0) return -1.0;',
    '  return max(-b - h, 0.0);',
    '}',

    // a faixa leitosa da galáxia do CSS (.depo-ceu::before), refeita para o trecho distorcido
    'vec4 faixa(vec2 p) {',
    '  vec2 dg = vec2(0.8829, 0.4695);',
    '  float L = 1.2 * uRes.x * 0.8829 + 1.4 * uRes.y * 0.4695;',
    '  float t = 0.5 + dot(p - uRes * 0.5, dg) / L;',
    '  vec4 c1 = vec4(150.0, 140.0, 220.0, 17.85) / 255.0; c1.rgb *= c1.a;',
    '  vec4 c2 = vec4(212.0, 170.0, 140.0, 15.3) / 255.0;  c2.rgb *= c2.a;',
    '  vec4 c3 = vec4(120.0, 150.0, 230.0, 15.3) / 255.0;  c3.rgb *= c3.a;',
    '  if (t < 0.30 || t > 0.70) return vec4(0.0);',
    '  if (t < 0.44) return c1 * (t - 0.30) / 0.14;',
    '  if (t < 0.50) return mix(c1, c2, (t - 0.44) / 0.06);',
    '  if (t < 0.56) return mix(c2, c3, (t - 0.50) / 0.06);',
    '  return c3 * (1.0 - (t - 0.56) / 0.14);',
    '}',

    // o céu na direção d: projeta de volta na tela e lê as estrelas desenhadas no canvas da seção
    'vec3 fundo(vec3 d) {',
    '  float z = max(dot(d, uF), 0.06);',
    '  vec2 q = vec2(dot(d, uR), dot(d, uU)) / z * uFoco + uCentro;',
    '  vec2 uv = q / uRes;',
    '  uv = 1.0 - abs(1.0 - mod(uv, 2.0));',
    '  vec3 c = vec3(8.0, 8.0, 24.0) / 255.0;',
    '  vec4 f = faixa(vec2(uv.x * uRes.x, (1.0 - uv.y) * uRes.y));',
    '  c = c * (1.0 - f.a) + f.rgb;',
    '  vec4 s = texture2D(uCeu, uv); c = mix(c, s.rgb, s.a);',
    '  vec4 a = texture2D(uBrA, uv); c = mix(c, a.rgb, a.a * 0.6);',
    '  vec4 b = texture2D(uBrB, uv); c = mix(c, b.rgb, b.a * 0.6);',
    '  return c;',
    '}',

    // o disco do negro gira mais rápido por dentro; duas fases que se revezam evitam que ele se enrole demais
    'float discoRuido(float r, float u, float w) {',
    '  const float P = 24.0;',
    '  float t1 = mod(uT, P), t2 = mod(uT + P * 0.5, P);',
    '  float k = 1.0 - abs(2.0 * t1 / P - 1.0);',
    '  float n1 = fbmP(vec2(r * 3.0, (u - w * t1 / TAU) * 12.0), 12.0);',
    '  float n2 = fbmP(vec2(r * 3.0 + 7.3, (u - w * t2 / TAU + 0.5) * 12.0), 12.0);',
    '  return mix(n2, n1, k);',
    '}',

    // o que está no plano da órbita: o disco do negro, o disco que o branco cospe e o fio entre os dois
    'vec4 plano(vec3 p, vec3 v) {',
    '  vec3 cor = vec3(0.0); float a = 0.0;',
    '  vec3 rb = p - uB; float r = length(rb);',
    '  if (r > DIN - 0.3 && r < DOUT) {',
    '    vec2 bi = vec2(dot(rb, uA1), dot(rb, uA2));',
    '    float u = atan(bi.y, bi.x) / TAU;',
    '    float n = discoRuido(r, u, 1.9 * pow(r, -1.5));',
    '    float borda = smoothstep(DIN - 0.3, DIN + 0.35, r) * smoothstep(DOUT, DOUT - 3.4, r);',
    '    vec3 c = mix(vec3(0.62, 0.20, 0.06), vec3(0.95, 0.55, 0.22), smoothstep(DOUT, 4.2, r));',
    '    c = mix(c, vec3(1.0, 0.86, 0.66), smoothstep(4.0, DIN, r));',
    '    float beta = 0.42 * sqrt(DIN / r);',
    '    float dop = pow(max(1.0 + beta * dot(normalize(cross(uN, rb)), -v), 0.15), 3.0);',   // o lado que vem na nossa direção brilha mais
    '    float dens = (0.3 + 0.9 * n * n) * borda;',
    '    cor += c * pow(DIN / r, 1.6) * 3.2 * dens * dop;',
    '    a = clamp(dens * 0.95, 0.0, 0.95);',
    '  }',
    '  vec3 rw = p - uW; float r2 = length(rw);',
    '  if (r2 < WOUT) {',
    '    vec2 wi = vec2(dot(rw, uA1), dot(rw, uA2));',
    '    float u = atan(wi.y, wi.x) / TAU;',
    '    float lr = log(max(r2, 0.05));',
    '    float n = fbmP(vec2(lr * 4.0 - uT * 0.7, (u - uT * 0.03 + lr * 0.35) * 10.0), 10.0);',   // escorre para fora, em espiral
    '    float borda = smoothstep(RW * 0.9, RW * 1.5, r2) * smoothstep(WOUT, WOUT * 0.45, r2);',
    '    float dens = (0.25 + 0.9 * n * n) * borda;',
    '    vec3 c = mix(vec3(0.85, 0.92, 1.0), vec3(0.42, 0.52, 1.0), smoothstep(RW, WOUT, r2));',
    '    cor += c * 2.4 * pow(RW * 1.5 / max(r2, RW), 1.5) * dens;',
    '    a = 1.0 - (1.0 - a) * (1.0 - dens * 0.8);',
    '  }',
    '  vec2 pr = vec2(dot(p, uE1), dot(p, uE2));',
    '  vec2 bB = vec2(-uXB, 0.0);',
    '  vec2 P2 = bB + 7.0 * vec2(0.248, 0.969);',
    '  vec2 P1 = P2 - vec2(-0.969, 0.248) * 4.2;',          // chega tangente ao giro do disco
    '  vec2 P0 = vec2(uXW - 0.9, 0.45);',
    '  if (length(pr - P1) < 9.0) {',
    '    float best = 1e9, bs = 0.0; vec2 ant = P0;',
    '    for (int i = 1; i <= 12; i++) {',
    '      float s = float(i) / 12.0;',
    '      vec2 q = mix(mix(P0, P1, s), mix(P1, P2, s), s);',
    '      vec2 ab = q - ant; float h = clamp(dot(pr - ant, ab) / dot(ab, ab), 0.0, 1.0);',
    '      float dd = length(pr - ant - ab * h);',
    '      if (dd < best) { best = dd; bs = (float(i) - 1.0 + h) / 12.0; }',
    '      ant = q;',
    '    }',
    '    float larg = mix(0.22, 0.72, bs);',
    '    float g = exp(-pow(best / larg, 2.0) * 2.2) * smoothstep(1.0, 0.8, bs) * smoothstep(0.0, 0.06, bs);',
    '    if (g > 0.002) {',
    '      float fl = ruido(vec2(bs * 16.0 - uT * 2.6, best * 2.5));',   // bolhas correndo do branco para o negro
    '      float dens = g * (0.35 + 0.9 * fl);',
    '      vec3 c = mix(vec3(0.82, 0.9, 1.0), vec3(1.0, 0.62, 0.28), smoothstep(0.1, 0.85, bs));',
    '      cor += c * 2.0 * dens;',
    '      a = 1.0 - (1.0 - a) * (1.0 - dens * 0.7);',
    '    }',
    '  }',
    '  return vec4(cor, a);',
    '}',

    // o brilho em volta do branco e os dois jatos que saem dos polos
    'vec3 volBranco(vec3 rw, float dw) {',
    '  vec3 c = vec3(0.55, 0.7, 1.0) * 0.95 * exp(-(dw - RW) * 1.6);',
    '  float hh = dot(rw, uN), ah = abs(hh);',
    '  float rho = length(rw - uN * hh);',
    '  float larg = 0.18 + ah * 0.1;',
    '  float j = exp(-pow(rho / larg, 2.0)) * smoothstep(0.3, 1.2, ah) * smoothstep(7.0, 2.5, ah);',
    '  j *= 0.55 + 0.6 * ruido(vec2(ah * 1.4 - uT * 3.2, sign(hh) * 3.0 + rho * 2.0));',
    '  return c + vec3(0.6, 0.75, 1.0) * 0.85 * j;',
    '}',

    'vec3 aces(vec3 x) { return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0); }',

    'void main() {',
    '  vec2 px = gl_FragCoord.xy;',
    '  vec3 dir = normalize(uF * uFoco + uR * (px.x - uCentro.x) + uU * (px.y - uCentro.y));',
    '  float tB = entra(uCam, dir, uB, RCB), tW = entra(uCam, dir, uW, RCW);',
    '  if (tB < 0.0 && tW < 0.0) { gl_FragColor = vec4(0.0); return; }',   // longe dos dois: aparece o céu de verdade
    '  float t0 = tB < 0.0 ? tW : (tW < 0.0 ? tB : min(tB, tW));',
    '  vec3 pos = uCam + dir * t0, vel = dir;',
    '  vec3 emis = vec3(0.0);',
    '  float trans = 1.0, mB = 1e9, mW = 1e9;',
    '  bool engolido = false;',
    '  for (int i = 0; i < 240; i++) {',
    '    if (float(i) >= uPassos) break;',
    '    vec3 rb = pos - uB, rw = pos - uW;',
    '    float db = length(rb), dw = length(rw);',
    '    mB = min(mB, db); mW = min(mW, dw);',
    '    if (db < 1.0) { engolido = true; break; }',                                 // passou do horizonte
    '    if (dw < RW) { emis += trans * vec3(0.9, 0.95, 1.0) * 7.0; trans = 0.0; break; }',   // bateu no branco
    '    if (db > RCB && dw > RCW && dot(rb, vel) > 0.0 && dot(rw, vel) > 0.0) break;',      // saiu da área dos dois
    '    float dt = clamp(min(db - 1.0, dw - RW) * 0.1 + 0.015, 0.015, 1.0);',
    '    vec3 hb = cross(rb, vel), hw = cross(rw, vel);',
    '    float db2 = db * db, dw2 = dw * dw;',
    '    vec3 acc = -1.5 * dot(hb, hb) * rb / (db2 * db2 * db) - 1.5 * RSW * dot(hw, hw) * rw / (dw2 * dw2 * dw);',
    '    vec3 ant = pos;',
    '    vel = normalize(vel + acc * dt);',
    '    pos += vel * dt;',
    '    if (dw < 7.5) emis += trans * volBranco(pos - uW, length(pos - uW)) * dt;',
    '    float s0 = dot(ant, uN), s1 = dot(pos, uN);',                                 // cruzou o plano da órbita?
    '    if (s0 * s1 < 0.0) {',
    '      vec4 e = plano(mix(ant, pos, s0 / (s0 - s1)), vel);',
    '      emis += trans * e.rgb;',
    '      trans *= 1.0 - e.a;',
    '      if (trans < 0.01) break;',
    '    }',
    '  }',
    // o céu atrás: distorcido perto dos buracos e igual ao de verdade na borda da área
    '  float kB = smoothstep(KB, 2.7, mB); kB *= kB;',
    '  float kW = smoothstep(KW, 1.4, mW); kW *= kW;',
    '  vec3 dirCeu = normalize(dir + (vel - dir) * max(kB, kW));',
    '  vec3 bg = engolido ? vec3(0.0) : fundo(dirCeu);',
    '  vec3 c = bg * trans + pow(aces(emis * uExpo), vec3(1.0 / 2.2));',
    '  float alfa = max(smoothstep(RCB, KB, mB), smoothstep(RCW, KW, mW));',
    '  gl_FragColor = vec4(c * alfa, alfa);',
    '}'
  ].join('\n');

  function montar() {
    var renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas: tela, antialias: false, alpha: true, premultipliedAlpha: true, powerPreference: 'high-performance' });
    } catch (err) {
      tela.style.display = 'none';
      return;
    }
    renderer.setPixelRatio(1);
    renderer.setClearColor(0x000000, 0);

    function texturaDe(c) {
      var t = new THREE.CanvasTexture(c);
      t.minFilter = THREE.LinearFilter;
      t.magFilter = THREE.LinearFilter;
      t.generateMipmaps = false;
      t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
      return t;
    }
    var texCeu = texturaDe(base), texA = texturaDe(brilhoA), texB = texturaDe(brilhoB);

    var V3 = function () { return new THREE.Vector3(); };
    var u = {
      uRes: { value: new THREE.Vector2(1, 1) },
      uCentro: { value: new THREE.Vector2(0, 0) },
      uFoco: { value: 1000 },
      uCam: { value: V3() }, uF: { value: V3() }, uR: { value: V3() }, uU: { value: V3() },
      uB: { value: V3() }, uW: { value: V3() }, uN: { value: V3() },
      uA1: { value: V3() }, uA2: { value: V3() }, uE1: { value: V3() }, uE2: { value: V3() },
      uXB: { value: 4 }, uXW: { value: 9 },
      uT: { value: 0 },
      uPassos: { value: 200 },
      uExpo: { value: 1.0 },
      uCeu: { value: texCeu }, uBrA: { value: texA }, uBrB: { value: texB }
    };
    var mat = new THREE.ShaderMaterial({ uniforms: u, vertexShader: VERT, fragmentShader: FRAG, depthTest: false, depthWrite: false });
    var cena = new THREE.Scene();
    var quad = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), mat);
    quad.frustumCulled = false;
    cena.add(quad);
    var cam2d = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    /* ── o tamanho e o lugar dos buracos na seção ── */
    var celular = Math.min(window.innerWidth, window.innerHeight) < 700;
    var escalaMax = celular ? 0.75 : 1.0;
    var escala = celular ? 0.55 : 0.6;               // começa leve e sobe sozinho se a máquina aguentar
    u.uPassos.value = celular ? 130 : 180;
    var D = 52;                                    // distância da câmera ao centro da órbita
    var lugar = { cx: 0, cy: 0, U: 30, w: 1, h: 1 };

    function direitaDoTexto() {
      var sr = secao.getBoundingClientRect();
      var direita = 0, baixo = 0;
      var titulo = secao.querySelector('.cta-title');
      if (titulo && document.createRange) {
        var rg = document.createRange(); rg.selectNodeContents(titulo);
        var rt = rg.getBoundingClientRect();
        direita = Math.max(direita, rt.right - sr.left); baixo = Math.max(baixo, rt.bottom - sr.top);
      }
      secao.querySelectorAll('.cta-sub p, .cta-actions > *').forEach(function (el) {
        var r = el.getBoundingClientRect();
        direita = Math.max(direita, r.right - sr.left); baixo = Math.max(baixo, r.bottom - sr.top);
      });
      return { direita: direita, baixo: baixo };
    }

    function medir() {
      var w = secao.clientWidth, h = secao.clientHeight;
      if (!w || !h) return;
      lugar.w = w; lugar.h = h;
      var t = direitaDoTexto();
      if (w < 900) {                                // texto em cima, buracos embaixo
        lugar.cx = w * 0.5;
        lugar.cy = t.baixo + (h - t.baixo) * 0.5 + 6;
        lugar.U = Math.max(9, Math.min(w / 29, (h - t.baixo) / 24));
      } else {                                      // texto à esquerda, buracos à direita
        var livre = w - t.direita;
        lugar.cx = Math.max(w * 0.6, t.direita + livre * 0.47);
        lugar.cy = h * 0.5;
        lugar.U = Math.max(12, Math.min(livre / 29, h / 28, 38));
      }
      aplicarTamanho();
      pedir();
      if (cena3d) cena3d.repintar();
    }
    function aplicarTamanho() {
      var bw = Math.max(2, Math.round(lugar.w * escala)), bh = Math.max(2, Math.round(lugar.h * escala));
      renderer.setSize(bw, bh, false);
      u.uRes.value.set(bw, bh);
      u.uCentro.value.set(lugar.cx * escala, (lugar.h - lugar.cy) * escala);
      u.uFoco.value = lugar.U * D * escala;
    }

    /* ── o movimento: a órbita, a distância que respira e a câmera que passeia (e segue o mouse) ── */
    var mouse = { x: 0, y: 0, ax: 0, ay: 0 };
    var t = reduzido ? 16 : 0, relogio = 0, rodando = false, visivel = false, cena3d = null;
    var UP = new THREE.Vector3(0, 1, 0);
    var RHO = 0.2;                                  // o plano da órbita um pouco inclinado na tela
    u.uN.value.set(-Math.sin(RHO), Math.cos(RHO), 0);
    u.uA1.value.set(Math.cos(RHO), Math.sin(RHO), 0);
    u.uA2.value.crossVectors(u.uN.value, u.uA1.value);

    function atualizar(dt) {
      mouse.x += (mouse.ax - mouse.x) * (1 - Math.exp(-dt * 2));
      mouse.y += (mouse.ay - mouse.y) * (1 - Math.exp(-dt * 2));
      var th = t * 0.11;
      var sep = 13 + Math.sin(t * 0.17) * 1.0;
      var xb = sep * 0.32, xw = sep * 0.68;
      var E1 = u.uE1.value, E2 = u.uE2.value;
      E1.copy(u.uA1.value).multiplyScalar(Math.cos(th)).addScaledVector(u.uA2.value, Math.sin(th));
      E2.crossVectors(u.uN.value, E1);
      u.uB.value.copy(E1).multiplyScalar(-xb);
      u.uW.value.copy(E1).multiplyScalar(xw);
      u.uXB.value = xb; u.uXW.value = xw;
      var el = 0.25 + 0.05 * Math.sin(t * 0.07) + mouse.y * 0.07;
      var az = 0.12 * Math.sin(t * 0.05) + mouse.x * 0.12;
      var cam = u.uCam.value.set(Math.sin(az) * Math.cos(el), Math.sin(el), Math.cos(az) * Math.cos(el)).multiplyScalar(D);
      u.uF.value.copy(cam).multiplyScalar(-1).normalize();
      u.uR.value.crossVectors(u.uF.value, UP).normalize();
      u.uU.value.crossVectors(u.uR.value, u.uF.value);
      u.uT.value = t;
    }

    /* resolução que se ajusta: se os quadros ficarem lentos, desenha com menos pixels */
    var media = 34, contagem = 0;                  // a 30 quadros por segundo, um quadro a cada ~33 ms
    function ajustarQualidade(ms) {
      if (ms > 250) return;                         // voltou de uma pausa: não conta
      media += (ms - media) * 0.05;
      if (++contagem < 40) return;
      contagem = 0;
      if (media > 46 && escala > 0.45) { escala = Math.max(0.45, escala * 0.85); aplicarTamanho(); }
      else if (media < 36 && escala < escalaMax) { escala = Math.min(escalaMax, escala * 1.08); aplicarTamanho(); }
    }

    function quadro(agora) {
      if (!visivel || document.hidden) { rodando = false; return; }
      if (!cena3d.vez(agora)) { requestAnimationFrame(quadro); return; }   // limite de fps (js/cenas.js)
      var ms = agora - relogio;
      var dt = Math.min(0.05, Math.max(0, ms / 1000));
      relogio = agora;
      if (!reduzido) { t += dt; ajustarQualidade(ms); }
      atualizar(dt);
      renderer.render(cena, cam2d);
      if (!reduzido && visivel && !document.hidden) requestAnimationFrame(quadro);
      else rodando = false;
    }
    function pedir() {
      if (rodando || !visivel || document.hidden) return;
      rodando = true;
      relogio = performance.now();
      requestAnimationFrame(quadro);
    }

    secao.addEventListener('ceu:desenhado', function () {
      texCeu.needsUpdate = texA.needsUpdate = texB.needsUpdate = true;
      medir();
    });
    secao.addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse') return;
      var r = secao.getBoundingClientRect();
      mouse.ax = ((e.clientX - r.left) / r.width) * 2 - 1;
      mouse.ay = -(((e.clientY - r.top) / r.height) * 2 - 1);
    });
    secao.addEventListener('pointerleave', function () { mouse.ax = 0; mouse.ay = 0; });

    medir();
    if ('ResizeObserver' in window) {
      var espera = null;
      new ResizeObserver(function () { clearTimeout(espera); espera = setTimeout(medir, 120); }).observe(secao);
    } else {
      window.addEventListener('resize', medir, { passive: true });
    }
    // a vez de desenhar vem do maestro (js/cenas.js): fora da tela ou sem a vez, para
    cena3d = Cenas.registrar({ nome: 'buracos', el: tela, peso: 1, fps: 30,
      ligar: function () { visivel = true; pedir(); },
      desligar: function () { visivel = false; },
      pintar: function () { atualizar(0); renderer.render(cena, cam2d); } });
    tela.addEventListener('webglcontextlost', function (e) { e.preventDefault(); visivel = false; });
    // o texto do contato aparece com uma animação: mede de novo quando ela termina
    setTimeout(medir, 1200);
  }
})();
