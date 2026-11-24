/* ══════════════════════════════════════════════════════════════
   TRILHOS ESPACIAIS (22/11/2026) — fundo da seção "Soluções entregues"
   Um trilho luminoso flutuando no espaço profundo, em 3D (Three.js r128, o mesmo já
   carregado pelo site), e um trem de locomotiva clássica com as janelas acesas e um
   rastro de poeira estelar. Tudo bem longe da câmera: o trem nasce como um ponto de luz
   no fundo (em cima, à esquerda), faz a curva e cruza a cena inteira até sair pela
   direita, embaixo. Uma linha só, de propósito: fundo limpo.
   A câmera desce um pouco conforme a seção rola (profundidade) e balança devagar.

   (O trem de perto, infinito, que divide Sistemas e Sites fica em js/trem-divisa.js.)

   Só desenha com a seção na tela e a aba visível; com "reduzir movimento", fica parado.
   Sem WebGL ou sem Three.js, simplesmente não aparece.
══════════════════════════════════════════════════════════════ */
Cenas.preparar('projetos', function trilhosEspaciais() {
  'use strict';
  var tela = document.getElementById('vitTrilhos');
  var janela = document.getElementById('vitCeu');
  var secao = document.getElementById('projetos');
  if (!tela || !janela || !secao || typeof THREE === 'undefined') return;
  var reduzido = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: tela, alpha: true, antialias: true, powerPreference: 'low-power' });
  } catch (e) { return; }
  renderer.setClearColor(0x000000, 0);

  var cena = new THREE.Scene();
  cena.fog = new THREE.Fog(0x080818, 900, 3800);          // o fundo some na névoa: dá profundidade
  var camera = new THREE.PerspectiveCamera(36, 1, 30, 6000);   // nada fica mais perto que isso: profundidade precisa

  function luzes(c) {
    c.add(new THREE.AmbientLight(0x7782c4, 0.95));
    var sol = new THREE.DirectionalLight(0xffe2c4, 0.9);
    sol.position.set(1, 2, 1.4);
    c.add(sol);
  }
  luzes(cena);

  var V = function (x, y, z) { return new THREE.Vector3(x, y, z); };
  var CIMA = V(0, 1, 0);

  // textura de brilho redondo (cabeçote do trem, balizas da linha, poeira)
  function texturaBrilho() {
    var c = document.createElement('canvas'); c.width = c.height = 64;
    var x = c.getContext('2d'), g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.22, 'rgba(255,236,205,0.85)');
    g.addColorStop(0.5, 'rgba(255,200,140,0.25)');
    g.addColorStop(1, 'rgba(255,200,140,0)');
    x.fillStyle = g; x.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  }
  var BRILHO = texturaBrilho();

  /* ── um trilho: dois fios de luz paralelos, dormentes e balizas acesas de tempos em tempos ── */
  function trilho(pontos, o) {
    var alvoCena = o.cena || cena;
    var curva = new THREE.CatmullRomCurve3(pontos, false, 'centripetal');
    var comp = curva.getLength();
    var n = Math.max(80, Math.round(comp / 4));               // um dormente a cada ~4 unidades
    var esq = [], dir = [], dorm = [], bal = [];
    for (var i = 0; i <= n; i++) {
      var u = i / n, p = curva.getPointAt(u), t = curva.getTangentAt(u);
      var lado = new THREE.Vector3().crossVectors(t, CIMA);
      if (lado.lengthSq() < 1e-4) lado.set(1, 0, 0);
      lado.normalize();
      esq.push(p.clone().addScaledVector(lado, -2.2));
      dir.push(p.clone().addScaledVector(lado, 2.2));
      dorm.push(p.clone().addScaledVector(lado, -3.4), p.clone().addScaledVector(lado, 3.4));
      if (!o.semBalizas && i % 40 === 20) bal.push(p.clone().addScaledVector(CIMA, 1.2));
    }
    var mats = [], objs = [];
    function por(obj) { obj.material.userData.base = obj.material.opacity; mats.push(obj.material); objs.push(obj); alvoCena.add(obj); }
    var matTrilho = new THREE.LineBasicMaterial({ color: o.cor, transparent: true, opacity: o.forca, blending: THREE.AdditiveBlending, depthWrite: false });
    por(new THREE.Line(new THREE.BufferGeometry().setFromPoints(esq), matTrilho));
    var l2 = new THREE.Line(new THREE.BufferGeometry().setFromPoints(dir), matTrilho); objs.push(l2); alvoCena.add(l2);
    por(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(dorm),
      new THREE.LineBasicMaterial({ color: 0x8b97e8, transparent: true, opacity: o.forca * 0.6, blending: THREE.AdditiveBlending, depthWrite: false })));
    if (bal.length) {
      por(new THREE.Points(new THREE.BufferGeometry().setFromPoints(bal),
        new THREE.PointsMaterial({ map: BRILHO, color: 0xffc98a, size: 9, transparent: true, opacity: o.forca,
          blending: THREE.AdditiveBlending, depthWrite: false })));
    }
    return { curva: curva, comp: comp, mats: mats, objs: objs };
  }

  // principal: nasce na névoa lá no fundo (em cima, à esquerda), faz a curva pela esquerda,
  // cruza o meio da cena e vem chegando mais perto até sair por baixo, à direita
  var principal = trilho([
    V(-670, 333, -3400), V(-1132, 89, -2300), V(-295, -50, -1500), V(197, -69, -1000),
    V(271, -139, -750), V(305, -229, -620), V(331, -285, -560)
  ], { cor: 0xf6c98e, forca: 0.8 });

  /* ── o trem: locomotiva + 6 vagões. Comprimento no eixo z (a frente é +z) ── */
  function janelas() {                                     // faixa de janelas acesas
    var c = document.createElement('canvas'); c.width = 256; c.height = 32;
    var x = c.getContext('2d');
    for (var i = 0; i < 8; i++) {
      x.fillStyle = 'rgba(255, 210, 140, 1)'; x.fillRect(10 + i * 31, 6, 22, 20);
      x.fillStyle = 'rgba(255, 245, 220, 0.9)'; x.fillRect(12 + i * 31, 8, 18, 6);
    }
    return new THREE.CanvasTexture(c);
  }
  var TEX_JANELAS = janelas();
  var matCorpo = new THREE.MeshLambertMaterial({ color: 0xd9d3c8 });
  var matTeto = new THREE.MeshLambertMaterial({ color: 0x1c1d23 });
  var matCobre = new THREE.MeshLambertMaterial({ color: 0xb87333, emissive: 0x3a1c08 });
  var matJanela = new THREE.MeshBasicMaterial({ map: TEX_JANELAS, transparent: true, side: THREE.DoubleSide,
    polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4 });

  function vagao() {
    var g = new THREE.Group();
    var corpo = new THREE.Mesh(new THREE.BoxGeometry(4, 4.2, 12), matCorpo); corpo.position.y = 3; g.add(corpo);
    var teto = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.8, 11.6), matTeto); teto.position.y = 5.5; g.add(teto);
    var faixa = new THREE.Mesh(new THREE.BoxGeometry(4.05, 0.35, 12.05), matCobre); faixa.position.y = 1.6; g.add(faixa);
    [-2.18, 2.18].forEach(function (x) {                    // janelas um pouco para fora da lateral
      var j = new THREE.Mesh(new THREE.PlaneGeometry(11, 1.8), matJanela);
      j.position.set(x, 3.6, 0); j.rotation.y = Math.PI / 2; g.add(j);
    });
    return g;
  }
  function locomotiva() {
    var g = new THREE.Group();
    var caldeira = new THREE.Mesh(new THREE.CylinderGeometry(1.9, 1.9, 9, 14), matCorpo);
    caldeira.rotation.x = Math.PI / 2; caldeira.position.set(0, 3, 2); g.add(caldeira);
    var frente = new THREE.Mesh(new THREE.CylinderGeometry(1.95, 1.95, 0.5, 14), matCobre);
    frente.rotation.x = Math.PI / 2; frente.position.set(0, 3, 6.6); g.add(frente);
    var cabine = new THREE.Mesh(new THREE.BoxGeometry(4, 5, 4), matCorpo); cabine.position.set(0, 3.5, -4.4); g.add(cabine);
    var tetoCab = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.6, 4.8), matTeto); tetoCab.position.set(0, 6.2, -4.4); g.add(tetoCab);
    var chamine = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.5, 2.4, 10), matCobre); chamine.position.set(0, 5.6, 4.2); g.add(chamine);
    var base = new THREE.Mesh(new THREE.BoxGeometry(3.6, 1, 13.5), matCobre); base.position.set(0, 0.9, 0.2); g.add(base);
    [-2.18, 2.18].forEach(function (x) {
      var j = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 1.6), matJanela);
      j.position.set(x, 4.2, -4.4); j.rotation.y = Math.PI / 2; g.add(j);
    });
    var farol = new THREE.Sprite(new THREE.SpriteMaterial({ map: BRILHO, color: 0xfff1d6, transparent: true,
      blending: THREE.AdditiveBlending, depthWrite: false }));
    farol.scale.set(26, 26, 1); farol.position.set(0, 3.2, 7.4); g.add(farol);
    return g;
  }
  var COMP = { loco: 14, vagao: 12, folga: 1.6 };
  var TREM_COMP = COMP.loco + 6 * (COMP.vagao + COMP.folga);
  var trem = [locomotiva()];
  for (var v = 0; v < 6; v++) trem.push(vagao());
  trem.forEach(function (p) { cena.add(p); });

  /* ── poeira estelar saindo da chaminé ── */
  var NP = 220, poeiraPos = new Float32Array(NP * 3), poeiraCor = new Float32Array(NP * 3);
  var vel = new Float32Array(NP * 3), idade = new Float32Array(NP).fill(99), proxima = 0;
  var geoPoeira = new THREE.BufferGeometry();
  geoPoeira.setAttribute('position', new THREE.BufferAttribute(poeiraPos, 3));
  geoPoeira.setAttribute('color', new THREE.BufferAttribute(poeiraCor, 3));
  var poeira = new THREE.Points(geoPoeira, new THREE.PointsMaterial({ map: BRILHO, size: 11, vertexColors: true,
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
  poeira.frustumCulled = false;                               // as partículas andam: não usar a caixa calculada no início
  cena.add(poeira);
  var VIDA = 3;

  /* ── posição do trem numa curva: "frente" = onde está o bico da locomotiva (em unidades) ── */
  var L = principal.comp, VEL = L / 52;                       // ~52 s do fundo até sair pela direita
  var s = reduzido ? L * 0.62 : 0;
  var alvo = new THREE.Vector3(), chamine = new THREE.Vector3(), frenteDir = new THREE.Vector3();
  function posicionar(curva, comp, frente) {
    var d = frente;
    for (var i = 0; i < trem.length; i++) {
      var len = i === 0 ? COMP.loco : COMP.vagao;
      var u = (d - len / 2) / comp, p = trem[i];
      p.visible = u > 0 && u < 0.999;
      if (p.visible) {
        p.position.copy(curva.getPointAt(u));
        p.lookAt(alvo.copy(curva.getPointAt(Math.min(1, u + 0.002))));
      }
      d -= len + COMP.folga;
    }
  }
  function soltarPoeira(dt) {
    var loco = trem[0];
    if (loco.visible) {
      frenteDir.set(0, 0, 1).applyQuaternion(loco.quaternion);
      chamine.set(0, 7, 4.2).applyQuaternion(loco.quaternion).add(loco.position);
      var quantas = Math.min(4, Math.round(dt * 70));
      for (var k = 0; k < quantas; k++) {
        var i = proxima; proxima = (proxima + 1) % NP;
        idade[i] = 0;
        poeiraPos[i*3] = chamine.x; poeiraPos[i*3+1] = chamine.y; poeiraPos[i*3+2] = chamine.z;
        vel[i*3]   = -frenteDir.x * 10 + (Math.random() - 0.5) * 4;
        vel[i*3+1] = 5 + Math.random() * 4;
        vel[i*3+2] = -frenteDir.z * 10 + (Math.random() - 0.5) * 4;
      }
    }
    for (var j = 0; j < NP; j++) {
      idade[j] += dt;
      var f = Math.max(0, 1 - idade[j] / VIDA);
      poeiraPos[j*3] += vel[j*3] * dt; poeiraPos[j*3+1] += vel[j*3+1] * dt; poeiraPos[j*3+2] += vel[j*3+2] * dt;
      poeiraCor[j*3] = f; poeiraCor[j*3+1] = 0.85 * f; poeiraCor[j*3+2] = 0.62 * f;   // apaga para o preto (= some)
    }
    geoPoeira.attributes.position.needsUpdate = true;
    geoPoeira.attributes.color.needsUpdate = true;
  }

  /* ── câmera: desce um pouco conforme a seção rola e balança devagar ── */
  var tempo = 0;
  function moverCamera() {
    var r = secao.getBoundingClientRect();
    var prog = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - window.innerHeight)));
    camera.position.set(Math.sin(tempo * 0.06) * 30, 40 - prog * 110, 0);
    camera.lookAt(0, -20 - prog * 70, -1000);
  }

  /* ── tamanho ── */
  var feito = { w: 0, h: 0 };
  function medir() {
    var w = janela.clientWidth, h = janela.clientHeight;
    if (!w || !h) return;
    if (Math.abs(w - feito.w) < 2 && Math.abs(h - feito.h) < 140) return;    // barra de endereço do celular
    feito = { w: w, h: h };
    var asp = w / h;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, asp < 1 ? 1 : 1.5));
    renderer.setSize(w, h, false);
    camera.aspect = asp;
    camera.fov = asp < 1 ? 62 : (asp < 1.4 ? 46 : 36);           // em pé, abre o ângulo para caber a curva
    camera.updateProjectionMatrix();
    if (!rodando) desenhar(0);
  }

  /* ── laço ── */
  var rodando = false, ultimo = 0, quadro = 0, cena3d = null;
  function desenhar(dt) {
    tempo += dt;
    if (!reduzido && dt > 0) {
      s += VEL * dt;
      if (s > L + TREM_COMP + VEL * 4) s = 0;                  // depois de sair, uns segundos e recomeça lá no fundo
      soltarPoeira(dt);
    }
    posicionar(principal.curva, L, s);
    moverCamera();
    renderer.render(cena, camera);
  }
  function passo(agora) {
    if (!rodando) return;
    quadro = requestAnimationFrame(passo);
    if (!cena3d.vez(agora)) return;              // não é a vez desta cena (js/cenas.js) ou passou do limite de fps
    var dt = Math.min(0.05, (agora - ultimo) / 1000 || 0);
    ultimo = agora;
    desenhar(dt);
  }
  function ligar() {
    if (rodando || reduzido || document.hidden) return;
    rodando = true; ultimo = performance.now();
    quadro = requestAnimationFrame(passo);
  }
  function desligar() { rodando = false; cancelAnimationFrame(quadro); }

  medir();
  desenhar(0);
  if ('ResizeObserver' in window) new ResizeObserver(medir).observe(janela);
  else window.addEventListener('resize', medir, { passive: true });
  // a vez de desenhar vem do maestro (js/cenas.js): os trilhos são fundo e cedem para as cenas da frente
  cena3d = Cenas.registrar({ nome: 'trilhos', el: janela, peso: 0.3, fps: 30, ligar: ligar, desligar: desligar,
    pintar: function () { if (!rodando) desenhar(0); } });
  if (reduzido) {                                              // parado: só redesenha a câmera ao rolar
    window.addEventListener('scroll', function () { if (cena3d.visivel()) desenhar(0); }, { passive: true });
  }
  tela.addEventListener('webglcontextlost', function (e) { e.preventDefault(); desligar(); reduzido = true; });
});
