/* ══════════════════════════════════════════════════════════════
   O OUTDOOR ATRÁS DA CERCA (22/11/2026) — "Sites que trazem clientes"
   Um terreno de noite sob o céu estrelado com meteoros (o céu é HTML/canvas atrás, em
   js/vitrine.js; este canvas é transparente). Three.js r128.

   · OUTDOOR: estrutura de ferro (pernas, travessas, passarela com guarda-corpo), moldura escura
     com friso cobre, lâmpadas de letreiro piscando em sequência e três refletores no alto com
     cones de luz. Na tela, os sites um de cada vez, rolando a página em "golpes" como alguém
     navegando de verdade, com barra de endereço; entre um site e outro, uma interferência de
     sinal. O brilho da tela tinge o chão molhado (reflexo) e a luz ao redor.
     A TELA É A IMAGEM DE VERDADE: o 3D "fura" o painel (pixels transparentes, com profundidade)
     e por baixo do canvas fica o HTML #becoSiteTela, encaixado por perspectiva (matrix3d) nos
     quatro cantos do painel a cada quadro. Assim a imagem do site sai nítida e com as cores
     exatas (sem textura, sem compressão de GPU, sem tone mapping), e o que está na frente do
     painel (guarda-corpo, panfletos, luz dos refletores) continua passando por cima.
   · CERCA DE MADEIRA na frente do outdoor (tábuas com veios, nós, pregos e umidade, algumas
     faltando), com panfletos da Beyond Bits colados, sobre a calçada.
   · POSTE de luz ao lado do outdoor, com braço curvo, luminária, cone de luz, poça de luz
     no chão, caixa de força e fios até o outdoor.
   · PANFLETOS da Beyond Bits voando com o vento (papel que ondula e dobra), alguns no chão.
   · A CIDADE só lá longe: silhuetas baixas com poucas janelas acesas e um brilho no horizonte.
   · PERSONAGEM (HTML por cima do canvas): bola de chiclete pequena ⇄ grande, troca seca.
   · A LISTA embaixo acompanha o outdoor (site no ar aceso, barra de tempo) e escolhe o site.

   Só desenha com a cena na tela e a aba visível. Com "reduzir movimento": tudo parado no
   primeiro site (a lista ainda troca o site). Sem WebGL: fica a imagem de reserva.
══════════════════════════════════════════════════════════════ */
(function becoDoOutdoor() {
  'use strict';
  var beco = document.getElementById('beco');
  var tela = document.getElementById('becoTela');
  var lista = document.getElementById('becoLista');
  if (!beco || !tela || typeof THREE === 'undefined') return;
  var reduzido = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var itens = lista ? Array.prototype.slice.call(lista.querySelectorAll('.beco-site')) : [];

  /* ══════════ personagem: bola pequena ⇄ grande (corte seco) ══════════ */
  (function chiclete() {
    var caixa = document.getElementById('becoPersonagem');
    if (!caixa || reduzido) return;
    var base = caixa.querySelector('.beco-quadro:not(.beco-quadro--bola)');
    var bola = caixa.querySelector('.beco-quadro--bola');
    if (!base || !bola) return;
    var timer = null, visivel = false;
    function depois(ms, fn) { clearTimeout(timer); timer = setTimeout(fn, ms); }
    function soprar() {                                    // a bola cresce
      if (!visivel) return;
      bola.style.opacity = 1;
      depois(60, function () { base.style.opacity = 0; depois(1400 + Math.random() * 900, estourar); });
    }
    function estourar() {                                  // e volta ao chiclete na boca
      base.style.opacity = 1;
      depois(60, function () { bola.style.opacity = 0; if (visivel) depois(3200 + Math.random() * 3200, soprar); });
    }
    function parar() { clearTimeout(timer); base.style.opacity = 1; bola.style.opacity = 0; }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e) {
        visivel = e[0].isIntersecting;
        if (visivel) depois(2200, soprar); else parar();
      }, { threshold: 0.25 }).observe(caixa);
    }
  })();

  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: tela, alpha: true, antialias: true });
  } catch (e) { return; }
  beco.classList.add('beco--3d');
  renderer.setClearColor(0x000000, 0);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  var ANISO = renderer.capabilities.getMaxAnisotropy();

  var cena = new THREE.Scene();
  cena.fog = new THREE.Fog(0x0a0a1c, 45, 190);
  var camera = new THREE.PerspectiveCamera(40, 2, 0.5, 200);

  /* ───────── utilidades ───────── */
  function tela2d(w, h) { var c = document.createElement('canvas'); c.width = w; c.height = h; return c; }
  function textura(c, srgb) { var t = new THREE.CanvasTexture(c); if (srgb !== false) t.encoding = THREE.sRGBEncoding; t.anisotropy = ANISO; return t; }
  function retRedondo(x, X, Y, W, H, R) {
    R = Math.min(R, W / 2, H / 2);
    x.beginPath(); x.moveTo(X + R, Y);
    x.arcTo(X + W, Y, X + W, Y + H, R); x.arcTo(X + W, Y + H, X, Y + H, R);
    x.arcTo(X, Y + H, X, Y, R); x.arcTo(X, Y, X + W, Y, R); x.closePath();
  }
  function brilho(cor0, cor1) {
    var c = tela2d(128, 128), x = c.getContext('2d'), g = x.createRadialGradient(64, 64, 0, 64, 64, 64);
    g.addColorStop(0, cor0); g.addColorStop(0.35, cor1); g.addColorStop(1, 'rgba(0,0,0,0)');
    x.fillStyle = g; x.fillRect(0, 0, 128, 128); return textura(c);
  }
  var GLOW_QUENTE = brilho('rgba(255,244,222,1)', 'rgba(255,170,90,0.35)');
  var GLOW_FRIO = brilho('rgba(240,246,255,1)', 'rgba(150,190,255,0.3)');
  function aditivo(map, cor, op) {
    return new THREE.MeshBasicMaterial({ map: map, color: cor || 0xffffff, transparent: true, opacity: op == null ? 1 : op,
      blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false, side: THREE.DoubleSide });
  }
  function sprite(map, cor, escala) {
    var s = new THREE.Sprite(new THREE.SpriteMaterial({ map: map, color: cor || 0xffffff, transparent: true,
      blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }));
    s.scale.set(escala, escala, 1); return s;
  }
  // cone de luz: gradiente vertical (forte no bico, some na boca)
  var GRAD_CONE = (function () {
    var c = tela2d(4, 256), x = c.getContext('2d'), g = x.createLinearGradient(0, 0, 0, 256);
    g.addColorStop(0, 'rgba(255,255,255,0.55)'); g.addColorStop(0.5, 'rgba(255,255,255,0.14)'); g.addColorStop(1, 'rgba(255,255,255,0)');
    x.fillStyle = g; x.fillRect(0, 0, 4, 256); return textura(c);
  })();
  function cone(alt, raio, cor, op) {
    var g = new THREE.CylinderGeometry(0.06, raio, alt, 28, 1, true);
    g.translate(0, -alt / 2, 0);                         // o bico fica na origem, a boca para baixo
    return new THREE.Mesh(g, aditivo(GRAD_CONE, cor, op));
  }

  /* ───────── ambiente para os reflexos do metal ───────── */
  (function ambiente() {
    var c = tela2d(512, 256), x = c.getContext('2d'), g = x.createLinearGradient(0, 0, 0, 256);
    g.addColorStop(0, '#0b0d22'); g.addColorStop(0.46, '#2a2440'); g.addColorStop(0.52, '#6d4e48'); g.addColorStop(1, '#050508');
    x.fillStyle = g; x.fillRect(0, 0, 512, 256);
    x.filter = 'blur(8px)';
    x.fillStyle = 'rgba(255,226,190,0.9)'; x.fillRect(120, 70, 160, 40);
    x.fillStyle = 'rgba(160,200,255,0.5)'; x.fillRect(330, 60, 90, 30);
    var t = new THREE.CanvasTexture(c); t.mapping = THREE.EquirectangularReflectionMapping; t.encoding = THREE.sRGBEncoding;
    var pm = new THREE.PMREMGenerator(renderer); cena.environment = pm.fromEquirectangular(t).texture; t.dispose(); pm.dispose();
  })();
  cena.add(new THREE.HemisphereLight(0x8a9cff, 0x140e0a, 0.42));
  var lua = new THREE.DirectionalLight(0xb7c6ff, 0.55); lua.position.set(-10, 18, 8); cena.add(lua);

  /* ───────── materiais ───────── */
  var matFerro = new THREE.MeshStandardMaterial({ color: 0x24262e, roughness: 0.55, metalness: 0.75 });
  var matFerroClaro = new THREE.MeshStandardMaterial({ color: 0x4a4d57, roughness: 0.4, metalness: 0.85 });
  var matCobre = new THREE.MeshStandardMaterial({ color: 0xb87333, roughness: 0.32, metalness: 0.9, emissive: 0x3a1806 });
  var matPreto = new THREE.MeshStandardMaterial({ color: 0x0e0f13, roughness: 0.6, metalness: 0.4 });
  var matFio = new THREE.MeshStandardMaterial({ color: 0x0b0b0e, roughness: 0.7, metalness: 0.2 });

  /* ══════════ O OUTDOOR ══════════ */
  var BW = 16.4, BH = 8.2;                                // tela 2:1, como os outdoors de rua
  var baseY = 3.05;                                       // a passarela fica logo acima da cerca
  var bx = 0, by = baseY + 0.36 + BH / 2, PERNA = 5;      // centro da tela e posição das pernas
  var outdoor = new THREE.Group(); cena.add(outdoor);

  // moldura, fundo e friso cobre
  var moldura = new THREE.Mesh(new THREE.BoxGeometry(BW + 0.7, BH + 0.7, 0.42), matFerro);
  moldura.position.set(bx, by, -0.05); outdoor.add(moldura);
  var costas = new THREE.Mesh(new THREE.BoxGeometry(BW + 0.4, BH + 0.4, 0.5), matPreto);
  costas.position.set(bx, by, -0.45); outdoor.add(costas);
  [[0, BH / 2 + 0.06, BW + 0.12, 0.06], [0, -BH / 2 - 0.06, BW + 0.12, 0.06], [-BW / 2 - 0.06, 0, 0.06, BH + 0.12], [BW / 2 + 0.06, 0, 0.06, BH + 0.12]]
    .forEach(function (f) { var m = new THREE.Mesh(new THREE.BoxGeometry(f[2], f[3], 0.08), matCobre); m.position.set(bx + f[0], by + f[1], 0.17); outdoor.add(m); });
  // nervuras atrás
  for (var nv = -2; nv <= 2; nv++) {
    var nerv = new THREE.Mesh(new THREE.BoxGeometry(0.18, BH + 0.3, 0.5), matFerro); nerv.position.set(bx + nv * 3.4, by, -0.8); outdoor.add(nerv);
  }
  // pernas, sapatas e travessas em X
  [-PERNA, PERNA].forEach(function (lx) {
    var perna = new THREE.Mesh(new THREE.BoxGeometry(0.5, baseY + 0.4, 0.5), matFerro);
    perna.position.set(bx + lx, (baseY + 0.4) / 2, -0.7); outdoor.add(perna);
    var aba = new THREE.Mesh(new THREE.BoxGeometry(0.16, baseY + 0.4, 0.75), matFerroClaro);
    aba.position.set(bx + lx, (baseY + 0.4) / 2, -0.7); outdoor.add(aba);
    var sapata = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.3, 1.3), matPreto); sapata.position.set(bx + lx, 0.15, -0.7); outdoor.add(sapata);
  });
  (function travessas() {
    var L = Math.hypot(2 * PERNA, baseY - 0.8), ang = Math.atan2(baseY - 0.8, 2 * PERNA);
    [ang, -ang].forEach(function (a) {
      var t = new THREE.Mesh(new THREE.BoxGeometry(L, 0.12, 0.12), matFerroClaro);
      t.position.set(bx, (baseY + 0.8) / 2, -0.7); t.rotation.z = a; outdoor.add(t);
    });
    var h = new THREE.Mesh(new THREE.BoxGeometry(2 * PERNA, 0.16, 0.16), matFerroClaro); h.position.set(bx, 0.9, -0.7); outdoor.add(h);
  })();
  // passarela com grade e guarda-corpo
  var GRADE = (function () {
    var c = tela2d(512, 64), x = c.getContext('2d'); x.fillStyle = '#17181e'; x.fillRect(0, 0, 512, 64);
    x.fillStyle = '#3a3c46'; for (var i = 0; i < 512; i += 10) x.fillRect(i, 0, 3, 64);
    x.fillStyle = '#2a2c34'; x.fillRect(0, 30, 512, 4); return textura(c);
  })();
  var passarela = new THREE.Mesh(new THREE.BoxGeometry(BW + 1, 0.1, 1.2),
    new THREE.MeshStandardMaterial({ map: GRADE, roughness: 0.6, metalness: 0.7 }));
  passarela.position.set(bx, baseY, 0.55); outdoor.add(passarela);
  var geoPoste = new THREE.CylinderGeometry(0.035, 0.035, 0.95, 8);
  for (var pr = -BW / 2 - 0.4; pr <= BW / 2 + 0.41; pr += 1.3) {
    var p = new THREE.Mesh(geoPoste, matFerroClaro); p.position.set(bx + pr, baseY + 0.5, 1.1); outdoor.add(p);
  }
  [0.95, 0.5].forEach(function (hh) {
    var corr = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, BW + 0.8, 8), matFerroClaro);
    corr.rotation.z = Math.PI / 2; corr.position.set(bx, baseY + hh, 1.1); outdoor.add(corr);
  });
  // placa da Beyond Bits no alto da moldura
  (function placa() {
    var c = tela2d(512, 96), x = c.getContext('2d');
    x.fillStyle = '#0f1015'; x.fillRect(0, 0, 512, 96);
    x.font = '700 44px Unbounded, "Arial Black", sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle';
    x.fillStyle = '#d4944a'; x.shadowColor = 'rgba(255,150,60,0.9)'; x.shadowBlur = 14; x.fillText('BEYOND BITS', 256, 52);
    var m = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 0.49), new THREE.MeshBasicMaterial({ map: textura(c), toneMapped: false }));
    m.position.set(bx, by + BH / 2 + 0.62, 0.02); outdoor.add(m);
    var caixa = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.62, 0.2), matFerro); caixa.position.set(bx, by + BH / 2 + 0.62, -0.1); outdoor.add(caixa);
    placa.redesenhar = function () {
      x.shadowBlur = 0; x.fillStyle = '#0f1015'; x.fillRect(0, 0, 512, 96);
      x.font = '700 44px Unbounded, "Arial Black", sans-serif'; x.fillStyle = '#e8a660'; x.shadowColor = 'rgba(255,150,60,0.9)'; x.shadowBlur = 14;
      x.fillText('BEYOND BITS', 256, 52); m.material.map.needsUpdate = true;
    };
    if (document.fonts && document.fonts.load) document.fonts.load('700 44px "Unbounded"').then(placa.redesenhar, function () {});
  })();
  // três refletores no alto, apontados para a tela
  var refletores = [];
  [-5.8, 0, 5.8].forEach(function (rx) {
    var g = new THREE.Group(); g.position.set(bx + rx, by + BH / 2 + 0.35, 0.1); outdoor.add(g);
    var haste = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 1.7), matFerroClaro); haste.position.set(0, 0.25, 0.85); g.add(haste);
    var cab = new THREE.Group(); cab.position.set(0, 0.25, 1.75); cab.rotation.x = -0.62; g.add(cab);
    var capa = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.32, 0.5, 18, 1, true), matFerro); capa.rotation.x = Math.PI; cab.add(capa);
    var lente = new THREE.Mesh(new THREE.CircleGeometry(0.29, 20), new THREE.MeshBasicMaterial({ color: 0xfff1da, toneMapped: false }));
    lente.rotation.x = Math.PI / 2; lente.position.y = -0.25; cab.add(lente);
    var c = cone(4.2, 2.1, 0xffe4bf, 0.3); c.position.y = -0.25; cab.add(c);     // suave: não lava as cores do site
    var s = sprite(GLOW_QUENTE, 0xffd9a6, 1.5); s.position.y = -0.3; cab.add(s);
    refletores.push(c);
  });
  var luzRefletor = new THREE.PointLight(0xffd9a6, 1.1, 14, 2); luzRefletor.position.set(bx, by + BH / 2 + 0.4, 1.8); cena.add(luzRefletor);

  // lâmpadas de letreiro em volta da moldura (acendem em sequência)
  var NL = 0, lampPos = [];
  (function () {
    var passo = 0.62, X0 = -BW / 2 - 0.35, Y0 = -BH / 2 - 0.35, W = BW + 0.7, H = BH + 0.7;
    for (var u = 0; u <= W + 0.01; u += passo) { lampPos.push([X0 + u, Y0 + H]); }
    for (var v = H - passo; v >= -0.01; v -= passo) { lampPos.push([X0 + W, Y0 + v]); }
    for (var u2 = W - passo; u2 >= -0.01; u2 -= passo) { lampPos.push([X0 + u2, Y0]); }
    for (var v2 = passo; v2 <= H - passo + 0.01; v2 += passo) { lampPos.push([X0, Y0 + v2]); }
    NL = lampPos.length;
  })();
  var lampadas = new THREE.InstancedMesh(new THREE.SphereGeometry(0.075, 10, 8), new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false }), NL);
  var halos = new THREE.InstancedMesh(new THREE.PlaneGeometry(0.55, 0.55), aditivo(GLOW_QUENTE, 0xffffff, 0.9), NL);
  var mtx = new THREE.Matrix4(), q0 = new THREE.Quaternion(), um = new THREE.Vector3(1, 1, 1), vp = new THREE.Vector3(), cor = new THREE.Color();
  lampPos.forEach(function (p, i) {
    lampadas.setMatrixAt(i, mtx.compose(vp.set(bx + p[0], by + p[1], 0.24), q0, um));
    halos.setMatrixAt(i, mtx.compose(vp.set(bx + p[0], by + p[1], 0.26), q0, um));
    lampadas.setColorAt(i, cor.setRGB(1, 0.7, 0.4)); halos.setColorAt(i, cor.setRGB(1, 0.7, 0.4));
  });
  [lampadas, halos].forEach(function (o) { o.frustumCulled = false; outdoor.add(o); });
  function letreiro(t) {
    for (var i = 0; i < NL; i++) {
      var b = 0.25 + 0.75 * Math.pow(0.5 + 0.5 * Math.sin(i * 0.9 - t * 7), 6);
      lampadas.setColorAt(i, cor.setRGB(1.0 * b + 0.25, 0.68 * b + 0.12, 0.36 * b + 0.05));
      halos.setColorAt(i, cor.setRGB(0.95 * b, 0.6 * b, 0.3 * b));
    }
    lampadas.instanceColor.needsUpdate = true; halos.instanceColor.needsUpdate = true;
  }

  /* ───────── a tela: os sites rolando (HTML de verdade por baixo do canvas) ───────── */
  // altura de cada captura em relação à largura (as imagens têm 1920 px de largura no HD)
  var SITES = [
    { nome: 'versatte', prop: 7680 / 1920, url: 'versattesports.com.br', cor: 0xff9a5c },
    { nome: 'montador', prop: 7680 / 1920, url: 'aluisiomontadordemoveis.com.br', cor: 0xffcf6a },
    // o fundo deste site é um degradê FIXO na tela (o conteúdo rola por cima dele): a captura é só o
    // conteúdo, com fundo transparente, e o degradê fica parado na janela do outdoor, como no site
    { nome: 'mundo-feliz', prop: 6123 / 1920, url: 'mundofelizlocacoes.com.br', cor: 0x7cc0ff,
      fundo: 'linear-gradient(rgb(30,167,255) 0%, rgb(59,182,255) 25%, rgb(108,200,255) 50%, rgb(159,220,255) 75%, rgb(207,236,255) 100%)' }
  ];
  var LOGICO = { w: 1280, h: 640, barra: 48 };          // tamanho do HTML da tela (o site tem 1280 de largura)
  SITES.forEach(function (s) { s.altura = LOGICO.w * s.prop; s.rep = (LOGICO.h - LOGICO.barra) / s.altura; s.fim = 1 - s.rep; });
  var telaSite = document.getElementById('becoSiteTela');
  var urlTexto = document.getElementById('becoUrl');
  var paginas = telaSite ? Array.prototype.slice.call(telaSite.querySelectorAll('.beco-pagina')) : [];
  var janelaSite = telaSite && telaSite.querySelector('.beco-janela');
  // o painel "fura" o canvas: grava cor e alfa zero (com profundidade), e o HTML aparece por baixo
  var matFuro = new THREE.MeshBasicMaterial({ color: 0x000000, blending: THREE.CustomBlending, blendEquation: THREE.AddEquation,
    blendSrc: THREE.ZeroFactor, blendDst: THREE.ZeroFactor, blendSrcAlpha: THREE.ZeroFactor, blendDstAlpha: THREE.ZeroFactor });
  var painel = new THREE.Mesh(new THREE.PlaneGeometry(BW, BH), matFuro);
  painel.position.set(bx, by, 0.18); outdoor.add(painel);
  // perspectiva: leva o retângulo do HTML aos quatro cantos do painel na tela (homografia → matrix3d)
  function adj(m) { return [m[4] * m[8] - m[5] * m[7], m[2] * m[7] - m[1] * m[8], m[1] * m[5] - m[2] * m[4],
    m[5] * m[6] - m[3] * m[8], m[0] * m[8] - m[2] * m[6], m[2] * m[3] - m[0] * m[5],
    m[3] * m[7] - m[4] * m[6], m[1] * m[6] - m[0] * m[7], m[0] * m[4] - m[1] * m[3]]; }
  function mm(a, b) { var c = []; for (var i = 0; i < 3; i++) for (var j = 0; j < 3; j++) { var s = 0; for (var k = 0; k < 3; k++) s += a[3 * i + k] * b[3 * k + j]; c[3 * i + j] = s; } return c; }
  function mv(m, v) { return [m[0] * v[0] + m[1] * v[1] + m[2] * v[2], m[3] * v[0] + m[4] * v[1] + m[5] * v[2], m[6] * v[0] + m[7] * v[1] + m[8] * v[2]]; }
  function base4(p) { var m = [p[0], p[2], p[4], p[1], p[3], p[5], 1, 1, 1], v = mv(adj(m), [p[6], p[7], 1]); return mm(m, [v[0], 0, 0, 0, v[1], 0, 0, 0, v[2]]); }
  var cantos = [new THREE.Vector3(bx - BW / 2, by + BH / 2, 0.18), new THREE.Vector3(bx + BW / 2, by + BH / 2, 0.18),
                new THREE.Vector3(bx - BW / 2, by - BH / 2, 0.18), new THREE.Vector3(bx + BW / 2, by - BH / 2, 0.18)];
  var origem = base4([0, 0, LOGICO.w, 0, 0, LOGICO.h, LOGICO.w, LOGICO.h]), adjOrigem = adj(origem), pv = new THREE.Vector3();
  function encaixarTela() {
    if (!telaSite) return;
    var W = beco.clientWidth, H = beco.clientHeight, q = [];
    camera.updateMatrixWorld();
    for (var i = 0; i < 4; i++) { pv.copy(cantos[i]).project(camera); q.push((pv.x + 1) / 2 * W, (1 - pv.y) / 2 * H); }
    var t = mm(base4(q), adjOrigem);
    for (var k = 0; k < 9; k++) t[k] /= t[8];
    telaSite.style.transform = 'matrix3d(' + [t[0], t[3], 0, t[6], t[1], t[4], 0, t[7], 0, 0, 1, 0, t[2], t[5], 0, t[8]].join(',') + ')';
  }
  // chiado da troca de sinal (textura de ruído gerada uma vez)
  (function () {
    var r = telaSite && telaSite.querySelector('.beco-ruido'); if (!r) return;
    var c = tela2d(160, 160), x = c.getContext('2d'), d = x.createImageData(160, 160);
    for (var i = 0; i < d.data.length; i += 4) { var v = Math.random() * 255; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255; }
    x.putImageData(d, 0, 0); r.style.backgroundImage = 'url(' + c.toDataURL() + ')';
  })();
  // brilho da tela vazando em volta e a luz que ela joga no chão
  var vazamento = new THREE.Mesh(new THREE.PlaneGeometry(BW * 1.6, BH * 1.9), aditivo(GLOW_FRIO, 0x9fb0ff, 0.22));
  vazamento.position.set(bx, by, -0.9); outdoor.add(vazamento);
  var luzTela = new THREE.PointLight(0xffb37a, 1.6, 22, 2); luzTela.position.set(bx, by - 1, 3.2); cena.add(luzTela);

  /* ───────── o chão (asfalto molhado), a calçada e o reflexo da tela ───────── */
  var CERCA_Z = 2.2;                                      // a cerca fica entre o outdoor e a câmera
  (function chao() {
    var c = tela2d(512, 512), x = c.getContext('2d');
    x.fillStyle = '#1b1b23'; x.fillRect(0, 0, 512, 512);
    for (var i = 0; i < 9000; i++) {
      x.fillStyle = Math.random() < 0.5 ? 'rgba(255,255,255,' + (Math.random() * 0.08).toFixed(3) + ')' : 'rgba(0,0,0,' + (Math.random() * 0.35).toFixed(3) + ')';
      x.fillRect(Math.random() * 512, Math.random() * 512, 1 + Math.random() * 2, 1 + Math.random() * 2);
    }
    var t = textura(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(36, 15);
    var m = new THREE.Mesh(new THREE.PlaneGeometry(240, 100), new THREE.MeshStandardMaterial({ map: t, color: 0x70707e, roughness: 0.3, metalness: 0.45 }));
    m.rotation.x = -Math.PI / 2; m.position.set(0, 0, -20); cena.add(m);
    var calcada = new THREE.Mesh(new THREE.BoxGeometry(240, 0.14, 1.8), new THREE.MeshStandardMaterial({ map: t, color: 0x8a8a98, roughness: 0.75, metalness: 0.1 }));
    calcada.position.set(0, 0.07, CERCA_Z + 0.95); cena.add(calcada);
    var guia = new THREE.Mesh(new THREE.BoxGeometry(240, 0.18, 0.16), new THREE.MeshStandardMaterial({ color: 0x5c5c66, roughness: 0.6 }));
    guia.position.set(0, 0.09, CERCA_Z + 1.86); cena.add(guia);
  })();
  var REFLEXO = (function () {
    var c = tela2d(256, 256), x = c.getContext('2d');
    var g = x.createLinearGradient(0, 0, 0, 256); g.addColorStop(0, 'rgba(255,255,255,0.75)'); g.addColorStop(1, 'rgba(255,255,255,0)');
    x.fillStyle = g;
    for (var i = 0; i < 46; i++) { var w = 2 + Math.random() * 7; x.globalAlpha = 0.25 + Math.random() * 0.75; x.fillRect(Math.random() * 256, 0, w, 120 + Math.random() * 136); }
    x.globalAlpha = 1; x.globalCompositeOperation = 'destination-in';
    var h = x.createLinearGradient(0, 0, 256, 0); h.addColorStop(0, 'rgba(0,0,0,0)'); h.addColorStop(0.15, '#000'); h.addColorStop(0.85, '#000'); h.addColorStop(1, 'rgba(0,0,0,0)');
    x.fillStyle = h; x.fillRect(0, 0, 256, 256);
    return textura(c);
  })();
  var reflexo = new THREE.Mesh(new THREE.PlaneGeometry(BW, 7), aditivo(REFLEXO, 0xffb37a, 0.3));
  reflexo.rotation.x = -Math.PI / 2; reflexo.position.set(bx, 0.03, CERCA_Z + 5.6); cena.add(reflexo);   // na rua, na frente da cerca

  /* ══════════ O POSTE DE LUZ (ao lado do outdoor, na calçada; posição ajustada no medir) ══════════ */
  var poste = new THREE.Group(); cena.add(poste);
  (function () {
    var base = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.42, 0.9, 16), matFerro); base.position.y = 0.45; poste.add(base);
    var anel = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.05, 8, 20), matCobre); anel.rotation.x = Math.PI / 2; anel.position.y = 0.92; poste.add(anel);
    var tubo = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.17, 8.2, 14), matFerro); tubo.position.y = 4.9; poste.add(tubo);
    var caixa = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.75, 0.3), matPreto); caixa.position.set(0, 3.1, 0.24); poste.add(caixa);
    var aviso = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.3), new THREE.MeshBasicMaterial({ color: 0xffb03a, toneMapped: false }));
    aviso.position.set(0, 3.2, 0.4); aviso.rotation.z = Math.PI / 4; aviso.scale.set(0.5, 0.5, 1); poste.add(aviso);
    // braço curvo
    var curva = new THREE.QuadraticBezierCurve3(new THREE.Vector3(0, 8.6, 0), new THREE.Vector3(-0.1, 10, 0), new THREE.Vector3(-2.1, 9.75, 0.25));
    poste.add(new THREE.Mesh(new THREE.TubeGeometry(curva, 24, 0.075, 8, false), matFerro));
    var cab = new THREE.Group(); cab.position.set(-2.2, 9.62, 0.25); poste.add(cab);
    var capa = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.62, 0.42, 22, 1, true), matFerro); cab.add(capa);
    var tampa = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 0.12, 14), matFerro); tampa.position.y = 0.26; cab.add(tampa);
    var lamp = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 10), new THREE.MeshBasicMaterial({ color: 0xffe9c4, toneMapped: false })); lamp.position.y = -0.14; cab.add(lamp);
    var c = cone(9.4, 3.4, 0xffc983, 0.3); c.position.y = -0.2; cab.add(c);
    var s = sprite(GLOW_QUENTE, 0xffd29a, 3.2); s.position.y = -0.2; cab.add(s);
    var luz = new THREE.PointLight(0xffc27a, 2.4, 16, 2); luz.position.set(-2.2, 9.1, 0.25); poste.add(luz);
    // poça de luz no chão
    var poca = new THREE.Mesh(new THREE.CircleGeometry(3.6, 40), aditivo(GLOW_QUENTE, 0xffb36b, 0.35));
    poca.rotation.x = -Math.PI / 2; poca.position.set(-2.2, 0.03, 0.25); poste.add(poca);
  })();
  // fios do poste até o outdoor (com barriga)
  var fios = new THREE.Group(); cena.add(fios);
  function refazerFios() {
    while (fios.children.length) { var f = fios.children.pop(); f.geometry.dispose(); }
    var topo = new THREE.Vector3(poste.position.x, 8.4, poste.position.z);
    [[new THREE.Vector3(bx - PERNA, baseY + 0.2, -0.7), 1.6], [new THREE.Vector3(bx - BW / 2 - 0.2, by + 1.4, -0.3), 1.2], [new THREE.Vector3(bx - PERNA, 2.4, -0.7), 0.9]]
      .forEach(function (d, i) {
        var a = topo.clone().add(new THREE.Vector3(0, -i * 0.5, 0)), b = d[0];
        var meio = a.clone().lerp(b, 0.5); meio.y -= d[1];
        fios.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.QuadraticBezierCurve3(a, meio, b), 40, 0.02, 5, false), matFio));
      });
  }

  /* ══════════ A CIDADE, SÓ LÁ LONGE ══════════ */
  (function cidadeAoLonge() {
    var c = tela2d(64, 64), x = c.getContext('2d');
    x.fillStyle = '#0d0e1c'; x.fillRect(0, 0, 64, 64);
    var r = 7; function rnd() { r = (r * 16807) % 2147483647; return (r - 1) / 2147483646; }
    for (var y = 4; y < 64; y += 10) for (var X = 4; X < 64; X += 10) {
      var acesa = rnd() < 0.1;
      x.fillStyle = acesa ? (rnd() < 0.72 ? 'rgba(255,196,128,0.95)' : 'rgba(160,196,255,0.9)') : 'rgba(26,28,46,1)';
      x.fillRect(X, y, 4, 6);
    }
    var t = textura(c); t.wrapS = t.wrapT = THREE.RepeatWrapping;
    var mat = new THREE.MeshBasicMaterial({ map: t, color: 0x9a9ec0 });
    for (var i = 0; i < 40; i++) {
      var w = 3 + rnd() * 7, h = 3 + Math.pow(rnd(), 1.8) * 9, z = -80 - rnd() * 30, px = -120 + i * 6 + (rnd() - 0.5) * 4;
      var g = new THREE.BoxGeometry(w, h, 5), uv = g.attributes.uv;
      for (var k = 0; k < uv.count; k++) uv.setXY(k, uv.getX(k) * w / 4.5, uv.getY(k) * h / 4.5);
      var m = new THREE.Mesh(g, mat); m.position.set(px, h / 2, z); cena.add(m);
    }
    // o brilho da cidade no horizonte
    var gc = tela2d(4, 128), gx = gc.getContext('2d'), gr = gx.createLinearGradient(0, 128, 0, 0);
    gr.addColorStop(0, 'rgba(255,255,255,0.9)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); gx.fillStyle = gr; gx.fillRect(0, 0, 4, 128);
    var hz = new THREE.Mesh(new THREE.PlaneGeometry(260, 22), new THREE.MeshBasicMaterial({ map: textura(gc), color: 0xff9a66, transparent: true,
      opacity: 0.16, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false, fog: false }));
    hz.position.set(0, 7, -112); cena.add(hz);
  })();

  /* ══════════ A CERCA DE MADEIRA ══════════ */
  (function cerca() {
    var c = tela2d(128, 512), x = c.getContext('2d');
    x.fillStyle = '#7b6650'; x.fillRect(0, 0, 128, 512);
    for (var i = 0; i < 70; i++) {                         // veios
      x.strokeStyle = 'rgba(' + (Math.random() < 0.55 ? '42,28,18' : '160,136,104') + ',' + (0.1 + Math.random() * 0.25).toFixed(2) + ')';
      x.lineWidth = 0.6 + Math.random() * 1.8;
      var x0 = Math.random() * 128; x.beginPath(); x.moveTo(x0, 0);
      for (var y = 0; y <= 512; y += 32) x.lineTo(x0 + Math.sin(y * 0.02 + i) * 3, y);
      x.stroke();
    }
    for (var k = 0; k < 3; k++) {                          // nós
      var nx = 20 + Math.random() * 88, ny = 40 + Math.random() * 430;
      var g = x.createRadialGradient(nx, ny, 1, nx, ny, 11); g.addColorStop(0, 'rgba(40,26,14,0.85)'); g.addColorStop(1, 'rgba(40,26,14,0)');
      x.fillStyle = g; x.beginPath(); x.ellipse(nx, ny, 7, 12, 0, 0, Math.PI * 2); x.fill();
    }
    x.fillStyle = '#2a2620'; [123, 410].forEach(function (py) { [40, 88].forEach(function (px) { x.beginPath(); x.arc(px, py, 3.2, 0, Math.PI * 2); x.fill(); }); });
    var u = x.createLinearGradient(0, 360, 0, 512); u.addColorStop(0, 'rgba(20,14,10,0)'); u.addColorStop(1, 'rgba(20,14,10,0.6)');
    x.fillStyle = u; x.fillRect(0, 360, 128, 152);                // umidade embaixo
    x.fillStyle = 'rgba(0,0,0,0.35)'; x.fillRect(0, 0, 3, 512); x.fillRect(125, 0, 3, 512);
    var mat = new THREE.MeshStandardMaterial({ map: textura(c), roughness: 0.92, metalness: 0 });

    var r = 31; function rnd() { r = (r * 16807) % 2147483647; return (r - 1) / 2147483646; }
    var ESP = 0.275, X0 = -46, X1 = 46, n = Math.round((X1 - X0) / ESP);
    var tabuas = new THREE.InstancedMesh(new THREE.BoxGeometry(0.25, 1, 0.05), mat, n);
    var q = new THREE.Quaternion(), e = new THREE.Euler(), esc = new THREE.Vector3();
    for (var j = 0; j < n; j++) {
      var falta = rnd() < 0.025, alt = 2.4 + rnd() * 0.32;
      tabuas.setMatrixAt(j, mtx.compose(vp.set(X0 + j * ESP, alt / 2 - 0.04, CERCA_Z),
        q.setFromEuler(e.set(0, (rnd() - 0.5) * 0.06, (rnd() - 0.5) * 0.035)), esc.set(1, falta ? 0.001 : alt, 1)));
      var v = 0.62 + rnd() * 0.45; tabuas.setColorAt(j, cor.setRGB(v, v * 0.96, v * 0.9));
    }
    tabuas.frustumCulled = false; cena.add(tabuas);
    [0.55, 1.95].forEach(function (ry) {                    // travessas atrás das tábuas
      var tr = new THREE.Mesh(new THREE.BoxGeometry(X1 - X0, 0.15, 0.07), mat); tr.position.set(0, ry, CERCA_Z - 0.065); cena.add(tr);
    });
    for (var p = X0; p <= X1; p += 2.75) {                  // mourões
      var m = new THREE.Mesh(new THREE.BoxGeometry(0.15, 2.75, 0.15), mat); m.position.set(p, 1.37, CERCA_Z - 0.17); cena.add(m);
    }
  })();

  /* ══════════ PANFLETOS DA BEYOND BITS ══════════ */
  var PANF = { w: 0.9, h: 1.27 };
  var frenteC = tela2d(512, 724), versoC = tela2d(512, 724);
  var frenteT = textura(frenteC), versoT = textura(versoC);
  function desenharPanfleto() {
    var x = frenteC.getContext('2d'), W = 512, H = 724;
    var g = x.createLinearGradient(0, 0, W, H); g.addColorStop(0, '#f3ece0'); g.addColorStop(1, '#e2d8c8');
    x.fillStyle = g; x.fillRect(0, 0, W, H);
    for (var i = 0; i < 1800; i++) { x.fillStyle = 'rgba(80,60,40,' + (Math.random() * 0.06).toFixed(3) + ')'; x.fillRect(Math.random() * W, Math.random() * H, 1.4, 1.4); }
    // marca: um planeta com órbita, em cobre
    x.strokeStyle = '#b87333'; x.lineWidth = 6; x.beginPath(); x.arc(84, 92, 30, 0, Math.PI * 2); x.stroke();
    x.save(); x.translate(84, 92); x.rotate(-0.4); x.lineWidth = 4; x.beginPath(); x.ellipse(0, 0, 52, 14, 0, 0, Math.PI * 2); x.stroke(); x.restore();
    x.fillStyle = '#b87333'; x.beginPath(); x.arc(130, 74, 7, 0, Math.PI * 2); x.fill();
    // o nome
    x.fillStyle = '#121218'; x.textBaseline = 'alphabetic';
    x.font = '800 96px Unbounded, "Arial Black", sans-serif'; x.fillText('BEYOND', 40, 262);
    x.font = '800 96px Unbounded, "Arial Black", sans-serif'; x.fillText('BITS', 40, 364);
    x.fillStyle = '#b87333'; x.fillRect(44, 392, 128, 9);
    x.fillStyle = '#2a2a33'; x.font = '700 34px Manrope, system-ui, sans-serif';
    x.fillText('Sites que trazem', 44, 462); x.fillText('clientes.', 44, 504);
    x.fillStyle = '#6a6270'; x.font = '500 24px Manrope, system-ui, sans-serif'; x.fillText('Sistemas e sites sob medida', 44, 552);
    // faixa de baixo
    x.fillStyle = '#15151c'; x.fillRect(0, 604, W, 120);
    x.fillStyle = '#d4944a'; x.font = '700 28px "Space Mono", monospace'; x.fillText('beyond.dev.br', 44, 656);
    x.fillStyle = '#efe7da'; x.font = '600 22px Manrope, system-ui, sans-serif'; x.fillText('Seu projeto começa aqui', 44, 694);
    // vincos de dobra e borda gasta
    x.fillStyle = 'rgba(0,0,0,0.07)'; x.fillRect(W / 2 - 1, 0, 2, H); x.fillRect(0, H / 3, W, 2); x.fillRect(0, 2 * H / 3, W, 2);
    x.fillStyle = 'rgba(255,255,255,0.18)'; x.fillRect(W / 2 + 1, 0, 1, H);
    var v = x.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.75);
    v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(60,40,20,0.22)'); x.fillStyle = v; x.fillRect(0, 0, W, H);
    // verso: papel com a impressão transparecendo
    var y = versoC.getContext('2d');
    y.fillStyle = '#e8e0d2'; y.fillRect(0, 0, W, H);
    y.save(); y.globalAlpha = 0.1; y.translate(W, 0); y.scale(-1, 1); y.drawImage(frenteC, 0, 0); y.restore();
    y.fillStyle = 'rgba(0,0,0,0.07)'; y.fillRect(W / 2 - 1, 0, 2, H); y.fillRect(0, H / 3, W, 2); y.fillRect(0, 2 * H / 3, W, 2);
    frenteT.needsUpdate = true; versoT.needsUpdate = true;
  }
  desenharPanfleto();
  if (document.fonts && document.fonts.load) {
    Promise.all([document.fonts.load('800 96px "Unbounded"'), document.fonts.load('700 34px "Manrope"'), document.fonts.load('700 28px "Space Mono"')])
      .then(function () { desenharPanfleto(); }, function () {});
  }
  var matFrente = new THREE.MeshStandardMaterial({ map: frenteT, roughness: 0.85, metalness: 0, side: THREE.FrontSide });
  var matVerso = new THREE.MeshStandardMaterial({ map: versoT, roughness: 0.9, metalness: 0, side: THREE.BackSide });
  var panfletos = [], LIM = { x: 14, y0: 0.6, y1: 13.5 };
  function novoPanfleto(espalhar) {
    var geo = new THREE.PlaneGeometry(PANF.w, PANF.h, 8, 10);
    var g = new THREE.Group();
    g.add(new THREE.Mesh(geo, matFrente)); g.add(new THREE.Mesh(geo, matVerso));
    var pf = { g: g, geo: geo, base: geo.attributes.position.array.slice(), fase: Math.random() * 100,
      vento: new THREE.Vector3(0.45 + Math.random() * 0.6, 0.06 + Math.random() * 0.2, (Math.random() - 0.5) * 0.12),
      giro: new THREE.Vector3((Math.random() - 0.5) * 0.9, (Math.random() - 0.5) * 1.2, (Math.random() - 0.5) * 0.8) };
    sortear(pf, espalhar);
    g.rotation.set(Math.random() * 6, Math.random() * 6, Math.random() * 6);
    cena.add(g); panfletos.push(pf);
  }
  function sortear(pf, espalhar) {
    var z = -1.5 + Math.random() * 9.5;
    pf.g.position.set(espalhar ? (Math.random() * 2 - 1) * LIM.x : -LIM.x - 1 - Math.random() * 3, LIM.y0 + Math.random() * (LIM.y1 - LIM.y0), z);
  }
  for (var np = 0; np < 11; np++) novoPanfleto(true);
  // colados na cerca, uns por cima dos outros
  [[-3.6, 1.35, 0.07, 1], [-2.75, 1.15, -0.11, 1], [2.1, 1.42, 0.04, 1], [4.7, 1.22, -0.07, 0.92], [-9.4, 1.3, 0.09, 1], [8.8, 1.36, -0.05, 1], [9.5, 1.12, 0.12, 0.9]]
    .forEach(function (p, i) {
      var m = new THREE.Mesh(new THREE.PlaneGeometry(PANF.w * p[3], PANF.h * p[3]), matFrente);
      m.position.set(bx + p[0], p[1], CERCA_Z + 0.03 + i * 0.002); m.rotation.z = p[2]; cena.add(m);
    });
  // dois caídos na calçada
  [[-4.6, CERCA_Z + 1.2, 0.5], [2.6, CERCA_Z + 3.4, -0.9]].forEach(function (p) {
    var g = new THREE.Group(), geo = new THREE.PlaneGeometry(PANF.w, PANF.h);
    g.add(new THREE.Mesh(geo, matFrente)); g.add(new THREE.Mesh(geo, matVerso));
    g.rotation.set(-Math.PI / 2, 0, p[2]); g.position.set(p[0], p[1] < CERCA_Z + 1.85 ? 0.15 : 0.02, p[1]); cena.add(g);   // calçada ou rua
  });
  function voarPanfletos(dt, t) {
    for (var i = 0; i < panfletos.length; i++) {
      var pf = panfletos[i], g = pf.g, ph = pf.fase;
      g.position.x += (pf.vento.x + Math.sin(t * 0.6 + ph) * 0.3) * dt;
      g.position.y += (pf.vento.y + Math.sin(t * 0.9 + ph * 1.3) * 0.35) * dt;
      g.position.z += (pf.vento.z + Math.cos(t * 0.5 + ph) * 0.1) * dt;
      g.rotation.x += pf.giro.x * dt; g.rotation.y += pf.giro.y * dt; g.rotation.z += pf.giro.z * dt;
      if (g.position.x > LIM.x + 1.5 || g.position.y > LIM.y1 + 1.5) sortear(pf, false);
      if (g.position.y < LIM.y0) g.position.y = LIM.y0;
      // o papel ondula e a ponta dobra com o vento
      var a = pf.geo.attributes.position.array, b = pf.base;
      for (var k = 0; k < a.length; k += 3) {
        var x = b[k], y = b[k + 1];
        a[k + 2] = Math.sin(x * 3.4 + t * 4.1 + ph) * 0.05 + Math.sin(y * 2.3 + t * 3.0 + ph) * 0.06 +
                   Math.pow(Math.max(0, x + y * 0.5 + 0.3), 2) * 0.16 * Math.sin(t * 2.2 + ph);
      }
      pf.geo.attributes.position.needsUpdate = true;
      pf.geo.computeVertexNormals();
    }
  }

  /* ───────── poeira na luz ───────── */
  var NP = 160, pPos = new Float32Array(NP * 3), pVel = new Float32Array(NP);
  for (var di = 0; di < NP; di++) { pPos[di * 3] = (Math.random() - 0.5) * 22; pPos[di * 3 + 1] = Math.random() * 12; pPos[di * 3 + 2] = Math.random() * 7 - 1; pVel[di] = 0.05 + Math.random() * 0.15; }
  var geoP = new THREE.BufferGeometry(); geoP.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  var poeira = new THREE.Points(geoP, new THREE.PointsMaterial({ map: GLOW_QUENTE, color: 0xffe2bd, size: 0.12, transparent: true, opacity: 0.7,
    blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }));
  poeira.frustumCulled = false; cena.add(poeira);

  /* ══════════ o programa do outdoor ══════════ */
  var atual = 0, proximo = -1, trocou = false, timerTroca = null;
  var est = { fase: 'topo', t: 0, p: 0, de: 0, para: 0, mix: 0, total: 1, gasto: 0 };
  var corTela = new THREE.Color(SITES[0].cor), corAlvo = new THREE.Color(SITES[0].cor);
  // as imagens só carregam quando a cena está chegando na tela (HD no computador, SD no celular);
  // a do site no ar primeiro, as outras depois
  var carregou = false;
  function iniciarCarga() {
    if (carregou || !paginas.length) return; carregou = true;
    var suf = beco.clientWidth < 900 ? '-sd.webp' : '-hd.webp';
    function fonte(i) { return 'assets/portfolio/outdoor-' + SITES[i].nome + suf; }
    paginas[0].onload = function () { for (var i = 1; i < paginas.length; i++) paginas[i].src = fonte(i); };
    paginas[0].src = fonte(0);
  }
  if ('IntersectionObserver' in window) {
    var obsCarga = new IntersectionObserver(function (e) { if (e[0].isIntersecting) { iniciarCarga(); obsCarga.disconnect(); } }, { rootMargin: '900px 0px' });
    obsCarga.observe(beco);
  } else { iniciarCarga(); }
  var GOLPE = 0.82, T_GOLPE = 0.95, T_PAUSA = 0.85, T_TOPO = 1.6, T_FIM = 1.1, T_TROCA = 0.8;
  function duracao(i) { var s = SITES[i]; return T_TOPO + Math.ceil(s.fim / (s.rep * GOLPE)) * (T_GOLPE + T_PAUSA) + T_FIM; }
  function mostrar(i, p) {                               // qual página está no ar e onde ela está rolada
    paginas.forEach(function (img, k) { img.classList.toggle('is-no-ar', k === i); });
    if (urlTexto) urlTexto.textContent = SITES[i].url;
    if (janelaSite) janelaSite.style.background = SITES[i].fundo || '#fff';
    rolar(i, p);
  }
  function rolar(i, p) { if (paginas[i]) paginas[i].style.transform = 'translate3d(0,' + (-p * SITES[i].altura).toFixed(1) + 'px,0)'; }
  function iniciarSite(i) {
    atual = i; est = { fase: 'topo', t: 0, p: 0, de: 0, para: 0, mix: 0, total: duracao(i), gasto: 0 };
    mostrar(i, 0);
    corAlvo.set(SITES[i].cor);
    itens.forEach(function (li, k) { li.classList.toggle('is-ativo', k === i); });
  }
  function trocarPara(i) {
    if (est.fase === 'troca' || i === atual) return;
    proximo = i; trocou = false; est.fase = 'troca'; est.t = 0;
    if (telaSite) {                                       // a interferência de sinal (CSS)
      telaSite.classList.remove('is-trocando'); void telaSite.offsetWidth; telaSite.classList.add('is-trocando');
      clearTimeout(timerTroca); timerTroca = setTimeout(function () { telaSite.classList.remove('is-trocando'); }, T_TROCA * 1000 + 60);
    }
  }
  function suave(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function programa(dt) {
    var s = SITES[atual];
    est.t += dt; est.gasto += dt;
    if (est.fase === 'topo' && est.t > T_TOPO) { est.fase = 'pausa'; est.t = T_PAUSA; }
    if (est.fase === 'pausa' && est.t >= T_PAUSA) {
      if (est.p >= s.fim - 1e-4) { est.fase = 'fim'; est.t = 0; }
      else { est.fase = 'golpe'; est.t = 0; est.de = est.p; est.para = Math.min(s.fim, est.p + s.rep * GOLPE); }
    }
    if (est.fase === 'golpe') {
      var k = Math.min(1, est.t / T_GOLPE); est.p = est.de + (est.para - est.de) * suave(k);
      if (k >= 1) { est.fase = 'pausa'; est.t = 0; }
    }
    if (est.fase === 'fim' && est.t > T_FIM) trocarPara((atual + 1) % SITES.length);
    if (est.fase === 'troca') {
      var m = Math.min(1, est.t / T_TROCA);
      if (m >= 0.5 && !trocou) { trocou = true; mostrar(proximo, 0); corAlvo.set(SITES[proximo].cor); }   // no meio do chiado
      if (m >= 1) { var n = proximo; proximo = -1; iniciarSite(n); }
      return;
    }
    rolar(atual, est.p);
    var li = itens[atual];
    if (li) li.style.setProperty('--prog', Math.min(1, est.gasto / est.total).toFixed(3));
  }
  itens.forEach(function (li, i) {
    var b = li.querySelector('.beco-escolher');
    if (b) b.addEventListener('click', function () {
      if (reduzido) { iniciarSite(i); return; }
      trocarPara(i);
    });
  });

  /* ───────── câmera e enquadramento ───────── */
  var CAM = { alvo: new THREE.Vector3(), pos: new THREE.Vector3() }, mouse = { x: 0, y: 0, mx: 0, my: 0 };
  function medir() {
    var w = beco.clientWidth, h = beco.clientHeight;
    if (!w || !h) return;
    var asp = w / h, celular = asp < 1.2;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, celular ? 1.25 : 1.5));
    renderer.setSize(w, h, false);
    camera.aspect = asp; camera.fov = celular ? 52 : 40; camera.updateProjectionMatrix();
    var tg = Math.tan(camera.fov * Math.PI / 360);
    // cabe o outdoor inteiro, da cerca aos refletores; no celular, a tela ocupa ~94% da largura
    var yMin = 0.2, yMax = by + BH / 2 + 1.35;
    // (no computador, a tela ocupa no máximo ~66% da largura: sobra espaço para o poste e a personagem)
    var D = Math.max((yMax - yMin) / (2 * tg) * 1.03, BW / (celular ? 0.94 : 0.66) / (2 * tg * asp));
    var meiaLarg = D * tg * asp;
    // o outdoor fica centralizado
    var alvoY = celular ? by - 1.2 : (yMin + yMax) / 2;
    CAM.alvo.set(bx, alvoY, 0);
    CAM.pos.set(bx + (celular ? 0 : 0.6), alvoY - 2.4, D);
    // o poste fica ao lado do outdoor, na calçada (no celular, o mais perto da borda que couber)
    var zp = CERCA_Z + 0.8, dp = D - zp, meiaP = dp * tg * asp;
    poste.position.set(Math.max(bx - BW / 2 - 1.1, bx - meiaP * 0.72), 0, zp);
    refazerFios();
    LIM.x = meiaLarg + 3;
    if (!rodando) desenhar(0);
  }

  /* ───────── laço ───────── */
  var tempo = 0;
  function desenhar(dt) {
    tempo += dt;
    if (!reduzido && dt > 0) {
      programa(dt);
      voarPanfletos(dt, tempo);
      for (var i = 0; i < NP; i++) {
        pPos[i * 3 + 1] += pVel[i] * dt; pPos[i * 3] += Math.sin(tempo * 0.4 + i) * 0.05 * dt;
        if (pPos[i * 3 + 1] > 12) pPos[i * 3 + 1] = 0.2;
      }
      geoP.attributes.position.needsUpdate = true;
      refletores.forEach(function (c, k) { c.material.opacity = 0.3 + Math.sin(tempo * 9 + k * 2) * 0.02 + (Math.random() < 0.01 ? -0.12 : 0); });
    }
    letreiro(reduzido ? 0 : tempo);
    corTela.lerp(corAlvo, Math.min(1, dt * 2 || 1));
    luzTela.color.copy(corTela); reflexo.material.color.copy(corTela);
    mouse.mx += (mouse.x - mouse.mx) * Math.min(1, dt * 3 || 1); mouse.my += (mouse.y - mouse.my) * Math.min(1, dt * 3 || 1);
    camera.position.set(CAM.pos.x + mouse.mx * 0.9 + Math.sin(tempo * 0.15) * 0.25, CAM.pos.y - mouse.my * 0.5, CAM.pos.z);
    camera.lookAt(CAM.alvo);
    renderer.render(cena, camera);
    encaixarTela();
  }
  var rodando = false, ultimo = 0, quadro = 0, cena3d = null;
  function passo(agora) {
    if (!rodando) return;
    quadro = requestAnimationFrame(passo);
    if (!cena3d.vez(agora)) return;              // não é a vez desta cena (js/cenas.js) ou passou do limite de fps
    var dt = Math.min(0.05, (agora - ultimo) / 1000 || 0);
    ultimo = agora; desenhar(dt);
  }
  function ligar() {
    if (rodando || reduzido || document.hidden) return;
    rodando = true; ultimo = performance.now(); quadro = requestAnimationFrame(passo);
  }
  function desligar() { rodando = false; cancelAnimationFrame(quadro); }

  iniciarSite(0);
  medir();
  if ('ResizeObserver' in window) new ResizeObserver(medir).observe(beco); else window.addEventListener('resize', medir, { passive: true });
  // a vez de desenhar vem do maestro (js/cenas.js)
  cena3d = Cenas.registrar({ nome: 'beco', el: beco, peso: 1, fps: 30, ligar: ligar, desligar: desligar,
    pintar: function () { if (!rodando) desenhar(0); } });
  if (!reduzido && window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    window.addEventListener('mousemove', function (e) {
      if (!rodando) return;
      mouse.x = e.clientX / window.innerWidth - 0.5; mouse.y = e.clientY / window.innerHeight - 0.5;
    }, { passive: true });
  }
  tela.addEventListener('webglcontextlost', function (e) { e.preventDefault(); desligar(); beco.classList.remove('beco--3d'); });
})();
