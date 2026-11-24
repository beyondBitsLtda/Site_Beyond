/* ══════════════════════════════════════════════════════════════
   O PLANETA DAS ESTAÇÕES (22/11/2026) — seção "Ciclo de vida"
   Um planeta em 3D (Three.js r128, o mesmo do site), com relevo e muitos detalhes, que muda de
   estação a cada fase do projeto:
     0 · Imersão e arquitetura  → INVERNO: continentes cobertos de neve, mar congelando, poucas luzes;
     1 · Desenvolvimento        → PRIMAVERA: tudo verde, flores, gelo só nos polos, cidades surgindo;
     2 · Homologação e entrega  → VERÃO: florestas, desertos, mar turquesa e as cidades todas acesas.
   Na troca ele dá um giro rápido e a estação muda no meio do giro (js/vitrine.js avisa a fase pelo
   evento "ciclo:fase", quando o mouse passa num card).

   As texturas (relevo, cores das três estações, mar, luzes das cidades e nuvens) vêm prontas, em
   imagens (assets/planeta/), e só são baixadas quando a seção chega perto. Elas eram geradas aqui
   por um shader de ruído fractal, mas na placa de vídeo integrada (Intel, Windows) esse shader levava
   mais de um minuto para compilar e travava o navegador inteiro; agora são geradas uma vez, fora do
   site, com o mesmo shader. O planeta usa um shader próprio e leve: relevo de verdade na geometria,
   sol de um lado e noite do outro (com as luzes das cidades), brilho do sol no mar, nuvens numa
   camada acima e a atmosfera em volta.
   No fundo, atrás do planeta, as naves cruzando (HTML, assets/nave.webp).
   Só desenha com a seção na tela e a aba visível. "Reduzir movimento": sem giro e sem naves.
══════════════════════════════════════════════════════════════ */
Cenas.preparar('processo', function planetaDasEstacoes() {
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
  var cena = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);

  /* ══════════ as texturas prontas (assets/planeta/; o celular usa as de 1024 px) ══════════
       relevo                         normal do relevo (r, g) e altura (b)
       inverno / primavera / verao    as cores de cada estação
       agua                           onde é mar em cada estação (r inverno, g primavera, b verão)
       luzes                          as luzes das cidades em cada estação (r, g, b)
       nuvens                         as nuvens (r) */
  var PASTA = 'assets/planeta/' + (celular ? '1024' : '2048') + '/';
  var ANISO = renderer.capabilities.getMaxAnisotropy();
  function textura() {
    var t = new THREE.Texture();
    t.wrapS = THREE.RepeatWrapping; t.wrapT = THREE.ClampToEdgeWrapping;
    t.minFilter = THREE.LinearMipmapLinearFilter; t.magFilter = THREE.LinearFilter; t.anisotropy = ANISO;
    return t;
  }
  var texRelevo = textura(), texAgua = textura(), texLuzes = textura(), texNuvem = textura();
  var texCor = [textura(), textura(), textura()];
  var ARQUIVOS = [['relevo', texRelevo], ['inverno', texCor[0]], ['primavera', texCor[1]], ['verao', texCor[2]],
    ['agua', texAgua], ['luzes', texLuzes], ['nuvens', texNuvem]];
  var assado = false, pedidas = false;
  function carregarTexturas() {
    if (pedidas) return;
    pedidas = true;
    var faltam = ARQUIVOS.length;
    ARQUIVOS.forEach(function (arq) {
      Cenas.imagem(PASTA + arq[0] + '.webp', true).then(function (r) {
        arq[1].image = r.img; arq[1].flipY = !r.bitmap; arq[1].needsUpdate = true;
        // cada textura vai para a placa num momento ocioso, uma de cada vez (antes iam as sete juntas no
        // primeiro quadro do planeta, e a página travava ~3 s)
        Cenas.ocioso(function () {
          try { renderer.initTexture(arq[1]); } catch (e) { /* vai no primeiro quadro */ }
          if (--faltam === 0) { assado = true; aplicar(typeof window.__cicloFase === 'number' ? window.__cicloFase : 0); }
        }, tela);
      }, function () { /* sem a imagem o planeta não aparece; o resto da seção segue normal */ });
    });
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
    vt ? '  float e = texture2D(tRelevo, uv).b;' : '  float e = 0.0;',
    '  vec3 p = n*(1.0 + e*uRelevo);',
    '  vPos = p; vNor = n;',
    '  gl_Position = projectionMatrix*modelViewMatrix*vec4(p, 1.0);',
    '}'
  ].join('\n');
  var PLANETA_FRAG = [
    'uniform sampler2D tRelevo, tCorA, tCorB, tAgua, tLuzes;',
    'uniform float uMix; uniform vec3 uSol, uCam, uAtmA, uAtmB, uLuzA, uLuzB;',
    'varying vec2 vUv; varying vec3 vPos; varying vec3 vNor;',
    'void main(){',
    '  vec3 n0 = normalize(vNor);',
    '  vec3 leste = normalize(cross(vec3(0.0,1.0,0.0), n0) + vec3(1e-5));',
    '  vec3 norte = cross(n0, leste);',
    '  vec2 nxy = texture2D(tRelevo, vUv).rg*2.0 - 1.0;',
    '  vec3 tn = vec3(nxy, sqrt(max(1.0 - dot(nxy, nxy), 0.0)));',
    '  vec3 n = normalize(leste*tn.x + norte*tn.y + n0*tn.z);',
    '  vec3 cor = mix(texture2D(tCorA, vUv).rgb, texture2D(tCorB, vUv).rgb, uMix);',
    '  vec3 ag = texture2D(tAgua, vUv).rgb;',
    '  float agua = mix(dot(ag, uLuzA), dot(ag, uLuzB), uMix);',
    '  vec3 L = normalize(uSol);',
    '  float dif = max(dot(n, L), 0.0);',
    '  float dia = smoothstep(-0.16, 0.24, dot(n0, L));',
    '  vec3 V = normalize(uCam - vPos);',
    '  float esp = pow(max(dot(n0, normalize(L + V)), 0.0), 70.0)*agua;',
    '  vec3 luz = cor*(0.04 + 1.22*dif) + vec3(1.0,0.93,0.82)*esp*0.9*dia;',
    '  vec3 cid = texture2D(tLuzes, vUv).rgb;',
    '  float cidades = mix(dot(cid, uLuzA), dot(cid, uLuzB), uMix);',
    '  luz += vec3(1.0,0.70,0.34)*cidades*5.0*(1.0 - smoothstep(-0.3, 0.12, dot(n0, L)));',
    '  float fres = pow(1.0 - max(dot(n0, V), 0.0), 2.6);',
    '  luz += mix(uAtmA, uAtmB, uMix)*fres*(0.12 + 0.88*dia)*1.15;',
    '  gl_FragColor = vec4(luz, 1.0);',
    '}'
  ].join('\n');
  var uPlaneta = {
    tRelevo: { value: texRelevo }, tCorA: { value: texCor[0] }, tCorB: { value: texCor[0] },
    tAgua: { value: texAgua }, tLuzes: { value: texLuzes }, uRelevo: { value: 0.045 }, uMix: { value: 0 },
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
  var uNuvem = { tNuvem: { value: texNuvem }, uDesl: { value: 0 }, uCob: { value: EST[0].nuvem },
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
    uPlaneta.tCorB.value = texCor[i];
    uPlaneta.uAtmB.value.copy(EST[i].atm); uPlaneta.uLuzB.value.copy(EST[i].luz);
  }
  function aplicar(i) {
    atual = i;
    uPlaneta.tCorA.value = uPlaneta.tCorB.value = texCor[i];
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
    desenhar(dt);
  }
  function ligar() {
    carregarTexturas();
    if (rodando || document.hidden) return;
    if (reduzido && assado) { desenhar(0); return; }
    rodando = true; ultimo = performance.now(); quadro = requestAnimationFrame(passo);
  }
  function desligar() { rodando = false; cancelAnimationFrame(quadro); }
  // com "reduzir movimento": desenha só quando algo muda (as texturas chegando chamam aplicar, que desenha)
  if (reduzido) {
    ligar = function () { carregarTexturas(); if (assado) desenhar(0); };
    window.addEventListener('ciclo:fase', function () { if (assado) desenhar(0); });
  }
  medir();
  if ('ResizeObserver' in window) new ResizeObserver(medir).observe(tela); else window.addEventListener('resize', medir, { passive: true });
  // a vez de desenhar vem do maestro (js/cenas.js); ao trocar de etapa o planeta ganha a vez enquanto gira
  var cena3d = Cenas.registrar({ nome: 'planeta', el: tela, peso: 1, fps: 30,
    ligar: function () { ligar(); }, desligar: desligar,
    pintar: function () { carregarTexturas(); if (assado) desenhar(0); } });
  window.addEventListener('ciclo:fase', function () { cena3d.focar(2200); });
  // as imagens começam a baixar quando a seção está a umas duas telas de distância
  if ('IntersectionObserver' in window) {
    var perto = new IntersectionObserver(function (e) {
      if (e[0].isIntersecting) { carregarTexturas(); perto.disconnect(); }
    }, { rootMargin: '1600px 0px' });
    perto.observe(secao);
  } else {
    carregarTexturas();
  }
  if (window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    window.addEventListener('pointermove', function (e) {
      if (!visivel) return;
      mouse.x = e.clientX / window.innerWidth - 0.5; mouse.y = e.clientY / window.innerHeight - 0.5;
    }, { passive: true });
  }
  tela.addEventListener('webglcontextlost', function (e) { e.preventDefault(); desligar(); });
});
