/* ══════════════════════════════════════════════════════════════
   O PLANETA DAS ESTAÇÕES (22/11/2026) — seção "Ciclo de vida"
   Um planeta em 3D (Three.js r128, o mesmo do site), com relevo e muitos detalhes, que muda de
   estação a cada fase do projeto:
     0 · Imersão e arquitetura  → INVERNO: continentes cobertos de neve, mar congelando, poucas luzes;
     1 · Desenvolvimento        → PRIMAVERA: tudo verde, flores, gelo só nos polos, cidades surgindo;
     2 · Homologação e entrega  → VERÃO: florestas, desertos, mar turquesa e as cidades todas acesas.
   Na troca ele dá um giro rápido e a estação muda no meio do giro (js/vitrine.js avisa a fase pelo
   evento "ciclo:fase", quando o mouse passa num card).

   Tudo é gerado na placa de vídeo, uma vez só, quando a seção chega perto da tela ("assado" em
   texturas): o relevo (ruído fractal com cristas de montanha), a normal do relevo, as cores das três
   estações, as nuvens e as luzes das cidades. O planeta usa um shader próprio: relevo de verdade na
   geometria, sol de um lado e noite do outro (com as luzes das cidades), brilho do sol no mar,
   nuvens numa camada acima e a atmosfera em volta.
   No fundo, atrás do planeta, as naves cruzando (HTML, assets/nave.webp).
   Só desenha com a seção na tela e a aba visível. "Reduzir movimento": sem giro e sem naves.
══════════════════════════════════════════════════════════════ */
(function planetaDasEstacoes() {
  'use strict';
  var secao = document.getElementById('processo');
  var tela = document.getElementById('cicloPlaneta');
  var navesEl = document.getElementById('cicloNaves');
  if (!secao) return;
  var reduzido = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var visivel = false;
  var aoMudarVisibilidade = [];
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (e) {
      visivel = e[0].isIntersecting;
      aoMudarVisibilidade.forEach(function (fn) { fn(visivel); });
    }, { rootMargin: '200px 0px' }).observe(secao);
  } else { visivel = true; }

  /* ══════════ as naves no fundo (da direita para a esquerda, a maioria bem longe) ══════════ */
  (function naves() {
    if (!navesEl || reduzido || !navesEl.animate) return;
    var EIXO = 11.1, vivas = 0, timer = null;            // na imagem, o bico aponta 11,1° para baixo
    function soltar() {
      timer = null;
      if (!visivel) return;
      if (!document.hidden && vivas < 3) {
        var W = navesEl.clientWidth, H = navesEl.clientHeight, longe = Math.random() < 0.7;
        var w = W * (longe ? 0.025 + Math.random() * 0.035 : 0.07 + Math.random() * 0.05);
        var ang = 2 + Math.random() * 5, y = H * (0.08 + Math.random() * 0.62);
        var x0 = W + w * 0.2, x1 = -w * 1.2, queda = (x0 - x1) * Math.tan(ang * Math.PI / 180);
        var el = document.createElement('div');
        el.className = 'ciclo-nave';
        el.style.width = w.toFixed(1) + 'px';
        el.style.opacity = longe ? (0.45 + Math.random() * 0.3).toFixed(2) : '0.9';
        var img = new Image(); img.src = 'assets/nave.webp'; img.alt = ''; img.decoding = 'async';
        el.appendChild(img); navesEl.appendChild(el); vivas++;
        var rot = (EIXO - ang).toFixed(2);
        var anim = el.animate([
          { transform: 'translate(' + x0.toFixed(0) + 'px,' + (y - queda / 2).toFixed(0) + 'px) rotate(' + rot + 'deg)' },
          { transform: 'translate(' + x1.toFixed(0) + 'px,' + (y + queda / 2).toFixed(0) + 'px) rotate(' + rot + 'deg)' }
        ], { duration: longe ? 9000 + Math.random() * 6000 : 3200 + Math.random() * 1600, easing: 'linear', fill: 'both' });
        anim.onfinish = anim.oncancel = function () { el.remove(); vivas--; };
      }
      timer = setTimeout(soltar, 2600 + Math.random() * 4200);
    }
    aoMudarVisibilidade.push(function (v) { if (v && !timer) timer = setTimeout(soltar, 900); });
    if (visivel) timer = setTimeout(soltar, 900);
  })();

  if (!tela || typeof THREE === 'undefined') return;
  var renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas: tela, alpha: true, antialias: true }); } catch (e) { return; }
  renderer.setClearColor(0x000000, 0);
  var celular = Math.min(window.innerWidth, window.innerHeight) < 700;
  var TW = celular ? 1024 : 2048, TH = TW / 2;
  var cena = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);

  /* ══════════ o ruído e o mundo (GLSL, usado no "assado") ══════════ */
  var RUIDO = [
    'float hash(vec3 p){ p = fract(p*0.3183099 + 0.1); p *= 17.0; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }',
    'float ruido(vec3 x){ vec3 i = floor(x); vec3 f = fract(x); f = f*f*(3.0-2.0*f);',
    '  return mix(mix(mix(hash(i), hash(i+vec3(1.0,0.0,0.0)), f.x), mix(hash(i+vec3(0.0,1.0,0.0)), hash(i+vec3(1.0,1.0,0.0)), f.x), f.y),',
    '             mix(mix(hash(i+vec3(0.0,0.0,1.0)), hash(i+vec3(1.0,0.0,1.0)), f.x), mix(hash(i+vec3(0.0,1.0,1.0)), hash(i+vec3(1.0,1.0,1.0)), f.x), f.y), f.z); }',
    'float fbm(vec3 p){ float s = 0.0, a = 0.5; for (int i = 0; i < 7; i++){ s += a*ruido(p); p = p*2.03 + vec3(1.7,9.2,3.1); a *= 0.5; } return s; }',
    'float crista(vec3 p){ float s = 0.0, a = 0.5; for (int i = 0; i < 6; i++){ float n = 1.0 - abs(ruido(p)*2.0 - 1.0); s += a*n*n; p = p*2.1 + vec3(3.1,1.7,5.3); a *= 0.5; } return s; }',
    'vec3 esfera(vec2 uv){ float phi = uv.x*6.2831853, th = (1.0 - uv.y)*3.1415927; return vec3(-cos(phi)*sin(th), cos(th), sin(phi)*sin(th)); }',
    'const float MAR = 0.52;',
    // continentes com o domínio "torcido" (costas recortadas) e cordilheiras só em terra
    'float altura(vec3 p){',
    '  vec3 q = p*1.7 + vec3(fbm(p*2.2 + 3.0), fbm(p*2.2 + 7.0), fbm(p*2.2 + 11.0))*0.9;',
    '  float h = fbm(q);',
    '  float terra = smoothstep(0.47, 0.62, h);',
    '  return h + terra*crista(p*3.2 + 5.0)*0.24;',
    '}',
    'float umidade(vec3 p){ return fbm(p*2.4 + vec3(20.0)); }'
  ].join('\n');

  // as cores de cada estação (e = 0 inverno, 1 primavera, 2 verão); "agua" sai 1 no mar (para o brilho do sol)
  var ESTACOES = [
    'vec3 corEstacao(float e, float h, float m, vec3 p, out float agua){',
    '  float lat = abs(p.y);',
    '  float det = fbm(p*28.0), det2 = ruido(p*95.0);',
    '  float alt = h - MAR;',
    '  float prof = clamp(-alt/0.16, 0.0, 1.0);',
    '  float costa = 1.0 - smoothstep(0.0, 0.016, abs(alt));',
    '  vec3 cor; agua = 0.0;',
    '  if (e < 0.5) {',                                             // INVERNO
    '    vec3 mar = mix(vec3(0.20,0.36,0.46), vec3(0.03,0.07,0.15), prof);',
    '    float gelo = smoothstep(0.50, 0.60, lat + det*0.18 - 0.09);',
    '    gelo = max(gelo, step(-0.025, alt)*smoothstep(0.22, 0.38, lat));',
    '    vec3 marCor = mix(mar, vec3(0.80,0.88,0.94)*(0.85 + 0.15*det2), gelo);',
    '    vec3 neve = vec3(0.90,0.93,0.97)*(0.80 + 0.20*det);',
    '    vec3 tundra = mix(vec3(0.20,0.26,0.23), vec3(0.42,0.40,0.36), det);',
    '    float cobre = smoothstep(0.06, 0.30, lat + alt*2.6 + (det - 0.5)*0.45);',
    '    vec3 terraCor = mix(tundra, neve, cobre);',
    '    terraCor = mix(terraCor, vec3(0.46,0.49,0.56)*(0.7 + 0.5*det2), smoothstep(0.22, 0.32, alt)*0.65);',
    '    if (alt < 0.0) { cor = marCor; agua = 1.0 - gelo*0.85; } else cor = terraCor;',
    '  } else if (e < 1.5) {',                                      // PRIMAVERA
    '    vec3 mar = mix(vec3(0.12,0.46,0.58), vec3(0.02,0.10,0.25), prof);',
    '    float gelo = smoothstep(0.80, 0.88, lat + det*0.1 - 0.05);',
    '    vec3 marCor = mix(mar, vec3(0.86,0.92,0.96), gelo);',
    '    vec3 verde = mix(vec3(0.28,0.54,0.19), vec3(0.50,0.70,0.30), m)*(0.78 + 0.38*det);',
    '    float flor = smoothstep(0.66, 0.74, fbm(p*22.0 + 7.0))*step(lat, 0.62);',
    '    vec3 florCor = mix(vec3(0.93,0.52,0.72), vec3(0.97,0.86,0.36), step(0.5, ruido(p*30.0)));',
    '    vec3 terraCor = mix(verde, florCor, flor*0.75);',
    '    terraCor = mix(terraCor, vec3(0.45,0.40,0.34)*(0.8 + 0.3*det2), smoothstep(0.16, 0.26, alt));',
    '    terraCor = mix(terraCor, vec3(0.92,0.95,0.98), max(smoothstep(0.28, 0.34, alt), smoothstep(0.78, 0.86, lat)));',
    '    terraCor = mix(terraCor, vec3(0.80,0.76,0.56), costa*0.55);',
    '    if (alt < 0.0) { cor = marCor; agua = 1.0 - gelo; } else cor = terraCor;',
    '  } else {',                                                   // VERÃO
    '    vec3 mar = mix(vec3(0.05,0.56,0.62), vec3(0.01,0.12,0.32), smoothstep(0.0, 0.6, prof));',
    '    float gelo = smoothstep(0.90, 0.95, lat);',
    '    vec3 marCor = mix(mar, vec3(0.90,0.94,0.97), gelo);',
    '    float seco = smoothstep(0.44, 0.32, m)*(1.0 - smoothstep(0.55, 0.70, lat));',
    '    vec3 floresta = mix(vec3(0.09,0.34,0.11), vec3(0.24,0.50,0.16), m)*(0.74 + 0.42*det);',
    '    vec3 deserto = mix(vec3(0.76,0.58,0.36), vec3(0.88,0.74,0.50), det);',
    '    vec3 terraCor = mix(floresta, deserto, seco);',
    '    terraCor = mix(terraCor, vec3(0.50,0.37,0.25)*(0.8 + 0.3*det2), smoothstep(0.18, 0.30, alt));',
    '    terraCor = mix(terraCor, vec3(0.95,0.96,0.98), smoothstep(0.34, 0.40, alt));',
    '    terraCor = mix(terraCor, vec3(0.86,0.80,0.62), costa*0.7);',
    '    if (alt < 0.0) { cor = marCor; agua = 1.0 - gelo; } else cor = terraCor;',
    '  }',
    '  return cor;',
    '}'
  ].join('\n');

  var BAKE_VERT = 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }';
  var BAKE_FRAG = [
    'precision highp float;',
    'uniform float uModo; uniform float uEps; varying vec2 vUv;',
    RUIDO, ESTACOES,
    'void main(){',
    '  vec3 p = esfera(vUv);',
    '  if (uModo < 0.5) {',                                         // relevo: normal (rgb) e altura (a)
    '    vec3 e = normalize(cross(vec3(0.0,1.0,0.0), p) + vec3(1e-5));',
    '    vec3 nn = cross(p, e);',
    '    float hc = max(altura(p), MAR);',
    '    float hx = max(altura(normalize(p + e*uEps)), MAR);',
    '    float hy = max(altura(normalize(p + nn*uEps)), MAR);',
    '    vec3 tn = normalize(vec3(-(hx - hc)/uEps*0.16, -(hy - hc)/uEps*0.16, 1.0));',
    '    gl_FragColor = vec4(tn*0.5 + 0.5, clamp((hc - MAR)/0.5, 0.0, 1.0));',
    '  } else if (uModo > 3.5) {',                                  // nuvens (r) e luzes das cidades por estação (g, b, a)
    '    vec3 q = p*2.0 + vec3(fbm(p*1.4 + 40.0), fbm(p*1.4 + 50.0), fbm(p*1.4 + 60.0))*1.3;',
    '    float c = fbm(q*1.7) + 0.05*sin(p.y*14.0);',
    '    float h = altura(p), alt = h - MAR, lat = abs(p.y);',
    '    float baixa = step(0.0, alt)*(1.0 - smoothstep(0.0, 0.08, alt))*step(lat, 0.82);',
    '    float grupo = smoothstep(0.52, 0.70, fbm(p*8.0 + 30.0));',
    '    float pt = hash(floor(p*520.0));',
    '    float base = baixa*grupo;',
    '    gl_FragColor = vec4(c, base*step(0.975, pt), base*step(0.90, pt), base*step(0.76, pt) + baixa*step(0.995, pt));',
    '  } else {',                                                    // cores de uma estação; a = água
    '    float h = altura(p), agua;',
    '    vec3 cor = corEstacao(uModo - 1.0, h, umidade(p), p, agua);',
    '    gl_FragColor = vec4(cor, agua);',
    '  }',
    '}'
  ].join('\n');

  /* ══════════ o "assado" das texturas (uma passada por quadro, para não travar) ══════════ */
  var cenaAssar = new THREE.Scene(), camAssar = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  var matAssar = new THREE.ShaderMaterial({ uniforms: { uModo: { value: 0 }, uEps: { value: Math.PI * 2 / TW } },
    vertexShader: BAKE_VERT, fragmentShader: BAKE_FRAG, depthTest: false, depthWrite: false });
  cenaAssar.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), matAssar));
  var ANISO = renderer.capabilities.getMaxAnisotropy();
  function alvo() {
    var r = new THREE.WebGLRenderTarget(TW, TH, { minFilter: THREE.LinearMipmapLinearFilter, magFilter: THREE.LinearFilter,
      generateMipmaps: true, wrapS: THREE.RepeatWrapping, wrapT: THREE.ClampToEdgeWrapping, depthBuffer: false, stencilBuffer: false });
    r.texture.anisotropy = ANISO; return r;
  }
  var rtRelevo = alvo(), rtNuvem = alvo(), rtCor = [alvo(), alvo(), alvo()];
  var fila = [[rtRelevo, 0], [rtCor[0], 1], [rtCor[1], 2], [rtCor[2], 3], [rtNuvem, 4]], assado = false;
  function assarUm() {
    var item = fila.shift(); if (!item) return true;
    matAssar.uniforms.uModo.value = item[1];
    renderer.setRenderTarget(item[0]); renderer.render(cenaAssar, camAssar); renderer.setRenderTarget(null);
    return !fila.length;
  }

  /* ══════════ o planeta ══════════ */
  var EST = [   // atmosfera, cobertura de nuvens (limiar: maior = menos nuvem) e luzes (peso de cada camada)
    { atm: new THREE.Vector3(0.70, 0.86, 1.00), nuvem: 0.50, luz: new THREE.Vector3(1, 0, 0) },
    { atm: new THREE.Vector3(0.40, 0.95, 0.74), nuvem: 0.555, luz: new THREE.Vector3(0, 1, 0) },
    { atm: new THREE.Vector3(0.32, 0.64, 1.00), nuvem: 0.60, luz: new THREE.Vector3(0, 0, 1) }
  ];
  var vt = renderer.capabilities.vertexTextures;
  var PLANETA_VERT = [
    'uniform sampler2D tRelevo; uniform float uRelevo;',
    'varying vec2 vUv; varying vec3 vPos; varying vec3 vNor;',
    'void main(){',
    '  vUv = uv; vec3 n = normalize(position);',
    vt ? '  float e = texture2D(tRelevo, uv).a;' : '  float e = 0.0;',
    '  vec3 p = n*(1.0 + e*uRelevo);',
    '  vPos = p; vNor = n;',
    '  gl_Position = projectionMatrix*modelViewMatrix*vec4(p, 1.0);',
    '}'
  ].join('\n');
  var PLANETA_FRAG = [
    'uniform sampler2D tRelevo, tCorA, tCorB, tNuvem;',
    'uniform float uMix; uniform vec3 uSol, uCam, uAtmA, uAtmB, uLuzA, uLuzB;',
    'varying vec2 vUv; varying vec3 vPos; varying vec3 vNor;',
    'void main(){',
    '  vec3 n0 = normalize(vNor);',
    '  vec3 leste = normalize(cross(vec3(0.0,1.0,0.0), n0) + vec3(1e-5));',
    '  vec3 norte = cross(n0, leste);',
    '  vec3 tn = texture2D(tRelevo, vUv).rgb*2.0 - 1.0;',
    '  vec3 n = normalize(leste*tn.x + norte*tn.y + n0*tn.z);',
    '  vec4 a = texture2D(tCorA, vUv), b = texture2D(tCorB, vUv);',
    '  vec3 cor = mix(a.rgb, b.rgb, uMix);',
    '  float agua = mix(a.a, b.a, uMix);',
    '  vec3 L = normalize(uSol);',
    '  float dif = max(dot(n, L), 0.0);',
    '  float dia = smoothstep(-0.16, 0.24, dot(n0, L));',
    '  vec3 V = normalize(uCam - vPos);',
    '  float esp = pow(max(dot(n0, normalize(L + V)), 0.0), 70.0)*agua;',
    '  vec3 luz = cor*(0.04 + 1.22*dif) + vec3(1.0,0.93,0.82)*esp*0.9*dia;',
    '  vec3 cid = texture2D(tNuvem, vUv).gba;',
    '  float cidades = mix(dot(cid, uLuzA), dot(cid, uLuzB), uMix);',
    '  luz += vec3(1.0,0.70,0.34)*cidades*5.0*(1.0 - smoothstep(-0.3, 0.12, dot(n0, L)));',
    '  float fres = pow(1.0 - max(dot(n0, V), 0.0), 2.6);',
    '  luz += mix(uAtmA, uAtmB, uMix)*fres*(0.12 + 0.88*dia)*1.15;',
    '  gl_FragColor = vec4(luz, 1.0);',
    '}'
  ].join('\n');
  var uPlaneta = {
    tRelevo: { value: rtRelevo.texture }, tCorA: { value: rtCor[0].texture }, tCorB: { value: rtCor[0].texture },
    tNuvem: { value: rtNuvem.texture }, uRelevo: { value: 0.045 }, uMix: { value: 0 },
    uSol: { value: new THREE.Vector3() }, uCam: { value: new THREE.Vector3() },
    uAtmA: { value: EST[0].atm.clone() }, uAtmB: { value: EST[0].atm.clone() },
    uLuzA: { value: EST[0].luz.clone() }, uLuzB: { value: EST[0].luz.clone() }
  };
  var eixo = new THREE.Group(); eixo.rotation.z = 0.36; eixo.rotation.x = 0.12; cena.add(eixo);
  var segs = celular ? [192, 96] : [384, 192];
  var planeta = new THREE.Mesh(new THREE.SphereGeometry(1, segs[0], segs[1]),
    new THREE.ShaderMaterial({ uniforms: uPlaneta, vertexShader: PLANETA_VERT, fragmentShader: PLANETA_FRAG }));
  eixo.add(planeta);

  // as nuvens: uma casca um pouco acima, que corre devagar sobre o planeta
  var uNuvem = { tNuvem: { value: rtNuvem.texture }, uDesl: { value: 0 }, uCob: { value: EST[0].nuvem },
    uSol: uPlaneta.uSol, uCam: uPlaneta.uCam };
  var nuvens = new THREE.Mesh(new THREE.SphereGeometry(1.028, 160, 80), new THREE.ShaderMaterial({
    uniforms: uNuvem, transparent: true, depthWrite: false,
    vertexShader: 'varying vec2 vUv; varying vec3 vN; varying vec3 vP; void main(){ vUv = uv; vN = normalize(position); vP = position; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }',
    fragmentShader: [
      'uniform sampler2D tNuvem; uniform float uDesl, uCob; uniform vec3 uSol, uCam;',
      'varying vec2 vUv; varying vec3 vN; varying vec3 vP;',
      'void main(){',
      '  float c = texture2D(tNuvem, vec2(vUv.x + uDesl, vUv.y)).r;',
      '  float a = smoothstep(uCob, uCob + 0.2, c)*0.94;',
      '  float d = dot(normalize(vN), normalize(uSol));',
      '  float dia = smoothstep(-0.12, 0.3, d);',
      '  vec3 V = normalize(uCam - vP);',
      '  float borda = 1.0 - max(dot(normalize(vN), V), 0.0);',
      '  vec3 cor = vec3(1.0)*(0.05 + 1.0*max(d, 0.0));',
      '  gl_FragColor = vec4(cor, a*(0.2 + 0.8*dia)*(1.0 - borda*borda*0.6));',
      '}'].join('\n')
  }));
  eixo.add(nuvens);

  // a atmosfera em volta (casca maior, vista por dentro, somando luz)
  var uAtm = { uCor: { value: EST[0].atm.clone() }, uSolV: { value: new THREE.Vector3() } };
  var atmosfera = new THREE.Mesh(new THREE.SphereGeometry(1.13, 96, 48), new THREE.ShaderMaterial({
    uniforms: uAtm, side: THREE.BackSide, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    vertexShader: 'varying vec3 vN; varying vec3 vV; void main(){ vec4 mv = modelViewMatrix*vec4(position,1.0); vN = normalize(normalMatrix*normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix*mv; }',
    fragmentShader: [
      'uniform vec3 uCor, uSolV; varying vec3 vN; varying vec3 vV;',
      'void main(){',
      '  float d = clamp(-dot(vN, vV)/0.46, 0.0, 1.0);',
      '  float i = pow(d, 2.4);',
      '  float lado = dot(normalize(vN.xy + vec2(1e-5)), normalize(uSolV.xy + vec2(1e-5)));',
      '  gl_FragColor = vec4(uCor*(0.3 + 0.7*max(lado, 0.0)), i*0.95);',
      '}'].join('\n')
  }));
  cena.add(atmosfera);

  /* ══════════ a troca de estação: um giro rápido e a estação muda no meio ══════════ */
  var atual = 0, destino = 0, troca = null, rot = 0, extra = 0;
  function suave(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function pedir(i) {
    i = Math.max(0, Math.min(2, i | 0));
    destino = i;
    if (troca || i === atual) return;
    if (reduzido) { aplicar(i); return; }
    troca = { para: i, t: 0, dur: 1.7, base: extra };
    uPlaneta.tCorB.value = rtCor[i].texture;
    uPlaneta.uAtmB.value.copy(EST[i].atm); uPlaneta.uLuzB.value.copy(EST[i].luz);
  }
  function aplicar(i) {
    atual = i;
    uPlaneta.tCorA.value = uPlaneta.tCorB.value = rtCor[i].texture;
    uPlaneta.uAtmA.value.copy(EST[i].atm); uPlaneta.uAtmB.value.copy(EST[i].atm);
    uPlaneta.uLuzA.value.copy(EST[i].luz); uPlaneta.uLuzB.value.copy(EST[i].luz);
    uPlaneta.uMix.value = 0; uNuvem.uCob.value = EST[i].nuvem; uAtm.uCor.value.copy(EST[i].atm);
    if (!rodando) desenhar(0);
  }
  function andarTroca(dt) {
    if (!troca) return;
    troca.t += dt;
    var k = Math.min(1, troca.t / troca.dur), de = EST[atual], para = EST[troca.para];
    extra = troca.base + suave(k) * Math.PI * 2;                         // uma volta inteira a mais
    var m = smoothstep(0.3, 0.72, k);
    uPlaneta.uMix.value = m;
    uNuvem.uCob.value = de.nuvem + (para.nuvem - de.nuvem) * m;
    uAtm.uCor.value.copy(de.atm).lerp(para.atm, m).multiplyScalar(1 + Math.sin(k * Math.PI) * 0.6);   // a atmosfera brilha no meio
    pulso = Math.sin(k * Math.PI);
    if (k >= 1) {
      var i = troca.para; troca = null; pulso = 0; aplicar(i);
      if (destino !== atual) pedir(destino);
    }
  }
  function smoothstep(a, b, v) { var t = Math.min(1, Math.max(0, (v - a) / (b - a))); return t * t * (3 - 2 * t); }
  window.addEventListener('ciclo:fase', function (e) { pedir(e.detail); });

  /* ══════════ câmera, tamanho e laço ══════════ */
  var SOL = new THREE.Vector3(-0.92, 0.32, 0.28).normalize(), q = new THREE.Quaternion(), dist = 5, pulso = 0;
  var mouse = { x: 0, y: 0, sx: 0, sy: 0 };
  function medir() {
    var w = tela.clientWidth, h = tela.clientHeight;
    if (!w || !h) return;
    var asp = w / h;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setSize(w, h, false);
    camera.aspect = asp; camera.updateProjectionMatrix();
    dist = 2.42 / (2 * Math.tan(camera.fov * Math.PI / 360) * Math.min(1, asp));
    if (!rodando) desenhar(0);
  }
  var tempo = 0;
  function desenhar(dt) {
    tempo += dt;
    if (!assado) return;
    if (dt) { rot += dt * 0.06; uNuvem.uDesl.value += dt * 0.004; andarTroca(dt); }
    planeta.rotation.y = rot + extra;
    nuvens.rotation.y = planeta.rotation.y;
    mouse.sx += (mouse.x - mouse.sx) * Math.min(1, dt * 3 || 1); mouse.sy += (mouse.y - mouse.sy) * Math.min(1, dt * 3 || 1);
    camera.position.set(mouse.sx * 0.35, -mouse.sy * 0.25, dist * (1 + pulso * 0.08));
    camera.lookAt(0, 0, 0);
    cena.updateMatrixWorld();
    planeta.getWorldQuaternion(q).invert();
    uPlaneta.uSol.value.copy(SOL).applyQuaternion(q);
    uPlaneta.uCam.value.copy(camera.position); planeta.worldToLocal(uPlaneta.uCam.value);
    uAtm.uSolV.value.copy(SOL).transformDirection(camera.matrixWorldInverse);
    renderer.render(cena, camera);
  }
  var rodando = false, ultimo = 0, quadro = 0;
  function passo(agora) {
    if (!rodando) return;
    quadro = requestAnimationFrame(passo);
    if (!cena3d.vez(agora)) return;              // não é a vez desta cena (js/cenas.js) ou passou do limite de fps
    var dt = Math.min(0.05, (agora - ultimo) / 1000 || 0); ultimo = agora;
    if (!assado) { assado = assarUm(); if (assado) aplicar(typeof window.__cicloFase === 'number' ? window.__cicloFase : 0); }
    desenhar(dt);
  }
  function ligar() {
    if (rodando || document.hidden) return;
    if (reduzido && assado) { desenhar(0); return; }
    rodando = true; ultimo = performance.now(); quadro = requestAnimationFrame(passo);
  }
  function desligar() { rodando = false; cancelAnimationFrame(quadro); }
  // com "reduzir movimento": assa tudo de uma vez e desenha só quando algo muda
  if (reduzido) {
    var antigoLigar = ligar;
    ligar = function () {
      if (!assado) { while (!assarUm()) { /* assa todas */ } assado = true; aplicar(window.__cicloFase || 0); }
      desenhar(0);
    };
    window.addEventListener('ciclo:fase', function () { if (assado) desenhar(0); });
    antigoLigar = null;
  }
  medir();
  if ('ResizeObserver' in window) new ResizeObserver(medir).observe(tela); else window.addEventListener('resize', medir, { passive: true });
  // a vez de desenhar vem do maestro (js/cenas.js); ao trocar de etapa o planeta ganha a vez enquanto gira
  var cena3d = Cenas.registrar({ nome: 'planeta', el: tela, peso: 1, fps: 30,
    ligar: function () { ligar(); }, desligar: desligar,
    pintar: function () { if (assado) desenhar(0); } });   // sem pressa: as texturas são feitas quando for a vez dele
  window.addEventListener('ciclo:fase', function () { cena3d.focar(2200); });
  if (window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    window.addEventListener('pointermove', function (e) {
      if (!visivel) return;
      mouse.x = e.clientX / window.innerWidth - 0.5; mouse.y = e.clientY / window.innerHeight - 0.5;
    }, { passive: true });
  }
  tela.addEventListener('webglcontextlost', function (e) { e.preventDefault(); desligar(); });
})();
