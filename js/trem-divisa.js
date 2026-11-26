/* ══════════════════════════════════════════════════════════════
   O TREM INFINITO (22/11/2026) — a divisa entre "Sistemas" e "Sites"
   Uma faixa de ponta a ponta da tela (#tremDivisa) com um trem sem fim passando em alta
   velocidade, no mesmo visual das imagens do site: casco marfim, painéis pretos, frisos e
   luzes cobre, janelas acesas. Three.js r128 (o mesmo já carregado pelo site).

   · cada vagão: casco arredondado (extrusão) + "decalques" desenhados em canvas na lateral
     (sulcos de painel, rebites, faixa de vidro, portas, cunhas pretas) + uma camada de luz
     (janelas, frisos cobre, luzes de posição) + teto escuro com grades + truques com rodas
     girando + fole entre os vagões + brilho cobre embaixo;
   · dois modelos de vagão (passageiros e serviço) se alternando;
   · os vagões andam para a esquerda e, ao sair, voltam lá para a direita (trem infinito);
   · velocidade: borrão de movimento só no trem (passada própria + desfoque horizontal),
     linhas de velocidade, faíscas nas rodas e as luzes dos dormentes correndo junto;
   · reflexos: um "céu" noturno já processado como mapa de ambiente (assets/ambiente-trem.webp).

   Só desenha com a faixa na tela e a aba visível. Com "reduzir movimento", fica parado.
   Sem WebGL ou sem Three.js, a faixa fica vazia (só o respiro entre as partes).
   Continua em 3D no site (é rápido demais para vídeo), mas com menos pixels: ~75% da resolução da tela no
   computador e ~90% no celular; o borrão de movimento esconde a diferença.
══════════════════════════════════════════════════════════════ */
Cenas.preparar('tremDivisa', function tremDaDivisa() {
  'use strict';
  var faixa = document.getElementById('tremDivisa');
  var tela = document.getElementById('tremTela');
  if (!faixa || !tela || typeof THREE === 'undefined') return;
  var reduzido = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var renderer;
  try {
    renderer = Cenas.renderizador(tela);                       // o motor 3D compartilhado (js/cenas.js)
  } catch (e) { return; }
  // compilação dos shaders sem travar a página: o Three não fica esperando cada shader só para conferir
  // erros, e o navegador compila em paralelo (em placas integradas no Windows cada um levava ~0,5 s)
  renderer.debug.checkShaderErrors = false;
  try { renderer.getContext().getExtension('KHR_parallel_shader_compile'); } catch (e) { /* sem a extensão */ }
  renderer.setClearColor(0x000000, 0);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;       // o marfim não estoura: brilho com volume
  renderer.toneMappingExposure = 0.95;
  var ANISO = renderer.capabilities.getMaxAnisotropy();

  var cenaTrem = new THREE.Scene();      // o trem (vai para a passada com borrão)
  var cenaTrilho = new THREE.Scene();    // trilho, dormentes e luzes (nítidos)
  var camera = new THREE.PerspectiveCamera(20, 5, 1, 700);
  var CAM = { x: -4, y: 8.4, z: 30.5, alvoY: 3.6 };   // bem perto: o trem ocupa quase a faixa toda

  /* ───────── utilidades de desenho ───────── */
  function tela2d(w, h) { var c = document.createElement('canvas'); c.width = w; c.height = h; return c; }
  function textura(c) { var t = new THREE.CanvasTexture(c); t.encoding = THREE.sRGBEncoding; t.anisotropy = ANISO; return t; }
  function retRedondo(x, X, Y, W, H, R) {
    R = Math.min(R, W / 2, H / 2);
    x.beginPath(); x.moveTo(X + R, Y);
    x.arcTo(X + W, Y, X + W, Y + H, R); x.arcTo(X + W, Y + H, X, Y + H, R);
    x.arcTo(X, Y + H, X, Y, R); x.arcTo(X, Y, X + W, Y, R); x.closePath();
  }

  /* ───────── mapa de ambiente (os reflexos): imagem pronta, assets/ambiente-trem.webp ─────────
     Um céu noturno com faixa quente no horizonte e janelas de luz. Já vem processado no formato de reflexo do Three
     (PMREM, "cube UV"): antes esse processamento rodava aqui e compilava shaders pesados ao abrir a
     página; agora foi feito uma vez, fora do site, com o mesmo céu desenhado. */
  var ambientePronto = false;
  Cenas.imagem('assets/ambiente-trem.webp', false).then(function (r) {
    var env = new THREE.Texture(r.img);
    env.mapping = THREE.CubeUVReflectionMapping; env.encoding = THREE.sRGBEncoding;
    env.minFilter = env.magFilter = THREE.NearestFilter; env.generateMipmaps = false; env.flipY = false;
    env.needsUpdate = true;
    cenaTrem.environment = env; cenaTrilho.environment = env;
    ambientePronto = true;
    Cenas.ocioso(function () {                           // num momento ocioso: envia à placa e compila já com o reflexo
      try { renderer.initTexture(env); } catch (e) { /* vai no primeiro quadro */ }
      precompilar();
      if (!rodando) desenhar(0);                         // quadro de aquecimento, mesmo fora da tela: envia as texturas
                                                         // e prepara tudo agora, e não no primeiro quadro que aparece
    }, faixa);
  }, function () { /* sem o reflexo a cena não aparece; o resto da seção segue normal */ });

  function luzes(c) {
    c.add(new THREE.HemisphereLight(0xa9b8ff, 0x1a120a, 0.35));
    var chave = new THREE.DirectionalLight(0xffe7cf, 1.15); chave.position.set(14, 34, 18); c.add(chave);
    var contra = new THREE.DirectionalLight(0x86a6ff, 0.9); contra.position.set(-24, 12, -30); c.add(contra);
    var baixo = new THREE.DirectionalLight(0xff8a3c, 0.7); baixo.position.set(4, -14, 16); c.add(baixo);
  }
  luzes(cenaTrem); luzes(cenaTrilho);

  /* ───────── a lateral do vagão, em canvas ─────────
     30 unidades de comprimento x 4,82 de altura (do y 0,78 ao 5,6), 2048 x 320 px.
     "detalhe" = cores e sulcos (por cima do casco marfim); "luz" = o que brilha. */
  var LAT = { w: 2048, h: 320, y0: 0.78, y1: 5.6, len: 30 };
  function PX(u) { return u / LAT.len * LAT.w; }
  function PY(v) { return (LAT.y1 - v) / (LAT.y1 - LAT.y0) * LAT.h; }
  function poligono(x, pts) {
    x.beginPath(); x.moveTo(PX(pts[0][0]), PY(pts[0][1]));
    for (var i = 1; i < pts.length; i++) x.lineTo(PX(pts[i][0]), PY(pts[i][1]));
    x.closePath(); x.fill();
  }
  function lateral(tipo) {
    var c = tela2d(LAT.w, LAT.h), x = c.getContext('2d');
    var cl = tela2d(LAT.w, LAT.h), y = cl.getContext('2d');
    function sulco(x1, y1, x2, y2) {
      x.strokeStyle = 'rgba(64,54,48,0.55)'; x.lineWidth = 2.2;
      x.beginPath(); x.moveTo(PX(x1), PY(y1)); x.lineTo(PX(x2), PY(y2)); x.stroke();
      x.strokeStyle = 'rgba(255,255,255,0.5)'; x.lineWidth = 1;
      x.beginPath(); x.moveTo(PX(x1) + 2, PY(y1) + 1.5); x.lineTo(PX(x2) + 2, PY(y2) + 1.5); x.stroke();
    }
    function rebites(x1, x2, v) {
      x.fillStyle = 'rgba(78,66,58,0.55)';
      for (var u = x1; u <= x2; u += 0.55) { x.beginPath(); x.arc(PX(u), PY(v) + 5, 1.7, 0, Math.PI * 2); x.fill(); }
    }
    function luzLinha(v, x1, x2, cor, larg, brilho) {
      y.shadowColor = cor; y.shadowBlur = brilho; y.strokeStyle = cor; y.lineWidth = larg; y.lineCap = 'round';
      y.beginPath(); y.moveTo(PX(x1), PY(v)); y.lineTo(PX(x2), PY(v)); y.stroke();
    }
    function ponto(u, v, r, cor, brilho) {
      y.shadowColor = cor; y.shadowBlur = brilho; y.fillStyle = cor;
      y.beginPath(); y.arc(PX(u), PY(v), r, 0, Math.PI * 2); y.fill();
    }

    // painéis com leve variação de tom (chapas diferentes)
    for (var pv = 0; pv < 7; pv++) {
      x.fillStyle = pv % 2 ? 'rgba(120,100,84,0.07)' : 'rgba(255,255,255,0.05)';
      x.fillRect(PX(4.4 + pv * 3.4), PY(3.28), PX(3.4), PY(1.8) - PY(3.28));
    }
    // calha escura no ombro do teto
    x.fillStyle = 'rgba(28,26,30,0.6)'; x.fillRect(0, PY(5.58), LAT.w, 3);
    // saia escura com fendas de ventilação
    x.fillStyle = '#131419'; x.fillRect(0, PY(1.75), LAT.w, LAT.h - PY(1.75));
    x.fillStyle = '#262730';
    for (var u = 2; u < 28; u += 1.1) x.fillRect(PX(u), PY(1.45), PX(0.62), PY(1.22) - PY(1.45));
    // cunhas pretas nas pontas (como os painéis escuros da nave)
    x.fillStyle = '#16171d';
    poligono(x, [[0, 1.75], [4.6, 1.75], [3.2, 3.05], [0, 3.05]]);
    poligono(x, [[30, 1.75], [25.4, 1.75], [26.8, 3.05], [30, 3.05]]);
    // portas nas duas pontas, com janelinha
    [1.2, 27.1].forEach(function (p) {
      sulco(p, 1.8, p, 5.15); sulco(p + 1.7, 1.8, p + 1.7, 5.15); sulco(p, 5.15, p + 1.7, 5.15);
      x.fillStyle = '#0b0d14'; retRedondo(x, PX(p + 0.4), PY(4.75), PX(0.9), PY(3.55) - PY(4.75), 10); x.fill();
      x.fillStyle = '#2a2a30'; x.fillRect(PX(p + 1.3), PY(3.15), PX(0.22), PY(2.75) - PY(3.15));      // maçaneta
      x.save(); x.beginPath(); x.rect(PX(p + 0.08), PY(2.25), PX(1.54), PY(1.85) - PY(2.25)); x.clip();
      x.fillStyle = 'rgba(30,30,36,0.75)';                                                            // listras de aviso
      for (var ls = -2; ls < 4; ls++) { x.beginPath(); x.moveTo(PX(p + ls * 0.4), PY(1.85)); x.lineTo(PX(p + ls * 0.4 + 0.2), PY(1.85));
        x.lineTo(PX(p + ls * 0.4 + 0.45), PY(2.25)); x.lineTo(PX(p + ls * 0.4 + 0.25), PY(2.25)); x.closePath(); x.fill(); }
      x.restore();
      ponto(p + 0.85, 5.32, 3.2, '#ffd9a0', 10);
    });

    if (tipo === 'passageiros') {
      // faixa de vidro escuro com as janelas acesas
      x.fillStyle = '#0b0d14'; retRedondo(x, PX(4.4), PY(4.82), PX(21.2), PY(3.33) - PY(4.82), 22); x.fill();
      x.strokeStyle = 'rgba(150,132,112,0.75)'; x.lineWidth = 2.5;                                    // moldura metálica
      retRedondo(x, PX(4.36), PY(4.86), PX(21.28), PY(3.29) - PY(4.86), 24); x.stroke();
      x.strokeStyle = 'rgba(255,255,255,0.22)'; x.lineWidth = 1.5;
      x.beginPath(); x.moveTo(PX(4.8), PY(4.78)); x.lineTo(PX(25.2), PY(4.78)); x.stroke();
      var n = 8, ini = 4.68, fim = 25.32, vao = 0.3, lj = (fim - ini - vao * (n - 1)) / n;
      for (var i = 0; i < n; i++) {
        var X = ini + i * (lj + vao);
        var gr = y.createLinearGradient(0, PY(4.64), 0, PY(3.5));
        gr.addColorStop(0, '#fff4dc'); gr.addColorStop(0.45, '#ffd08c'); gr.addColorStop(1, '#ff9a48');
        y.shadowColor = 'rgba(255,150,60,0.9)'; y.shadowBlur = 16; y.fillStyle = gr;
        retRedondo(y, PX(X), PY(4.64), PX(lj), PY(3.5) - PY(4.64), 9); y.fill();
        // luz interna mais forte no alto de cada janela
        y.shadowBlur = 0; y.fillStyle = 'rgba(255,255,240,0.55)';
        y.fillRect(PX(X + 0.25), PY(4.56), PX(lj - 0.5), 4);
      }
      // painéis abaixo e acima da faixa de vidro
      for (var s = 4.4; s <= 25.7; s += 3.4) { sulco(s, 1.8, s, 3.28); sulco(s, 4.88, s, 5.6); }
      sulco(4.6, 2.55, 25.4, 2.55); rebites(4.8, 25.2, 2.55);
      // emblema
      x.fillStyle = '#14151a'; x.beginPath(); x.arc(PX(15), PY(2.2), 18, 0, Math.PI * 2); x.fill();
      y.shadowColor = '#ffae5c'; y.shadowBlur = 10; y.strokeStyle = '#ffae5c'; y.lineWidth = 3;
      y.beginPath(); y.arc(PX(15), PY(2.2), 12, 0, Math.PI * 2); y.stroke();
    } else {
      // vagão de serviço: painel preto anguloso com escotilhas e fendas de luz cobre
      x.fillStyle = '#15161c';
      poligono(x, [[6.2, 3.1], [23.8, 3.1], [22.6, 5.25], [7.4, 5.25]]);
      x.fillStyle = '#20212a';
      for (var f = 3.4; f < 5.0; f += 0.28) x.fillRect(PX(9.6), PY(f + 0.1), PX(10.8), 3);
      [8.2, 21.8].forEach(function (u) {
        x.fillStyle = '#0b0d14'; x.beginPath(); x.arc(PX(u), PY(4.15), 30, 0, Math.PI * 2); x.fill();
        var gr = y.createRadialGradient(PX(u), PY(4.15), 2, PX(u), PY(4.15), 26);
        gr.addColorStop(0, '#fff2d6'); gr.addColorStop(0.6, '#ffb466'); gr.addColorStop(1, '#ff8a3a');
        y.shadowColor = 'rgba(255,150,60,0.9)'; y.shadowBlur = 16; y.fillStyle = gr;
        y.beginPath(); y.arc(PX(u), PY(4.15), 24, 0, Math.PI * 2); y.fill();
      });
      for (var k = 0; k < 6; k++) {
        y.shadowColor = '#ff8a2a'; y.shadowBlur = 12; y.fillStyle = '#ff9a3c';
        y.fillRect(PX(11.2 + k * 1.35), PY(4.95), PX(0.16), PY(3.45) - PY(4.95));
      }
      for (var s2 = 4.4; s2 <= 25.7; s2 += 3.4) sulco(s2, 1.8, s2, 3.05);
      sulco(4.6, 2.5, 25.4, 2.5); rebites(4.8, 25.2, 2.5);
      ponto(15, 2.05, 4, '#ff7a3a', 14);
    }

    // grade fina perto do teto
    x.fillStyle = 'rgba(40,36,34,0.55)';
    for (var gg = 5.2; gg < 24.8; gg += 0.35) x.fillRect(PX(gg), PY(5.5), 2, PY(5.32) - PY(5.5));
    // frisos cobre: um sob a faixa de vidro, outro sobre a saia
    luzLinha(3.2, 0.25, 29.75, '#ff8a2a', 5, 20);
    luzLinha(1.82, 0.25, 29.75, 'rgba(255,122,26,0.85)', 3, 12);
    // luzes de status na saia e de posição nas pontas
    for (var st = 5; st < 26; st += 5) ponto(st, 1.33, 2.6, '#ffb36b', 8);
    ponto(0.45, 5.0, 4, '#ff5a2a', 12); ponto(29.55, 5.0, 4, '#ff5a2a', 12);

    return {
      mat: new THREE.MeshStandardMaterial({ map: textura(c), transparent: true, roughness: 0.3, metalness: 0.15,
        polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }),
      luz: new THREE.MeshBasicMaterial({ map: textura(cl), transparent: true, blending: THREE.AdditiveBlending,
        depthWrite: false, toneMapped: false, polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4 })
    };
  }
  var LATERAIS = { passageiros: lateral('passageiros'), servico: lateral('servico') };

  /* ───────── teto: chapas escuras, grades e luzinhas ───────── */
  var matTeto = (function () {
    var W = 2048, H = 112, c = tela2d(W, H), x = c.getContext('2d'), cl = tela2d(W, H), y = cl.getContext('2d');
    x.fillStyle = '#1b1c22'; x.fillRect(0, 0, W, H);
    x.fillStyle = 'rgba(255,255,255,0.06)';
    for (var u = 0; u < W; u += W / 9) x.fillRect(u, 0, 2, H);
    x.fillStyle = '#0c0d11';
    [[260, 560], [1480, 1780]].forEach(function (g) { for (var k = g[0]; k < g[1]; k += 14) x.fillRect(k, 26, 6, H - 52); });
    x.fillStyle = '#2a2b33'; x.fillRect(0, H / 2 - 3, W, 6);
    y.fillStyle = '#000'; y.fillRect(0, 0, W, H);
    [[60, '#ff8a3a'], [W - 60, '#ff8a3a'], [W / 2, '#8fb4ff']].forEach(function (p) {
      y.shadowColor = p[1]; y.shadowBlur = 14; y.fillStyle = p[1];
      y.beginPath(); y.arc(p[0], H / 2, 9, 0, Math.PI * 2); y.fill();
    });
    var luz = new THREE.CanvasTexture(cl); luz.encoding = THREE.sRGBEncoding;
    return new THREE.MeshStandardMaterial({ map: textura(c), emissiveMap: luz, emissive: 0xffffff, roughness: 0.5,
      metalness: 0.5, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
  })();

  /* ───────── fole entre vagões (listras) e brilhos ───────── */
  var matFole = (function () {
    var c = tela2d(64, 256), x = c.getContext('2d');
    x.fillStyle = '#121318'; x.fillRect(0, 0, 64, 256);
    x.fillStyle = '#22232a'; for (var i = 0; i < 64; i += 8) x.fillRect(i, 0, 3, 256);
    return new THREE.MeshStandardMaterial({ map: textura(c), roughness: 0.8, metalness: 0.1 });
  })();
  function texturaBrilho(cor0, cor1) {
    var c = tela2d(128, 128), x = c.getContext('2d'), g = x.createRadialGradient(64, 64, 0, 64, 64, 64);
    g.addColorStop(0, cor0); g.addColorStop(1, cor1);
    x.fillStyle = g; x.fillRect(0, 0, 128, 128);
    return textura(c);
  }
  var BRILHO_COBRE = texturaBrilho('rgba(255,150,70,0.75)', 'rgba(255,120,40,0)');
  var BRILHO_BRANCO = texturaBrilho('rgba(255,255,255,1)', 'rgba(255,200,140,0)');

  /* ───────── materiais e geometrias do vagão ───────── */
  var matCasco = new THREE.MeshStandardMaterial({ color: 0xdcd5ca, roughness: 0.36, metalness: 0.15, envMapIntensity: 0.75 });
  var matEscuro = new THREE.MeshStandardMaterial({ color: 0x16171c, roughness: 0.45, metalness: 0.6 });
  var matCobre = new THREE.MeshStandardMaterial({ color: 0xb87333, roughness: 0.3, metalness: 0.9, emissive: 0x4a1e06 });
  var matRoda = new THREE.MeshStandardMaterial({ color: 0x2c2d33, roughness: 0.32, metalness: 0.9 });
  var matBrilhoBaixo = new THREE.MeshBasicMaterial({ map: BRILHO_COBRE, transparent: true, blending: THREE.AdditiveBlending,
    depthWrite: false, toneMapped: false });

  var geoCorpo = (function () {
    var s = new THREE.Shape();                          // seção do vagão (largura em x, altura em y)
    s.moveTo(-2.5, 0.9); s.lineTo(2.5, 0.9); s.lineTo(2.5, 5.4);
    s.quadraticCurveTo(2.5, 7.25, 0, 7.25);
    s.quadraticCurveTo(-2.5, 7.25, -2.5, 5.4);
    s.lineTo(-2.5, 0.9);
    var g = new THREE.ExtrudeGeometry(s, { depth: 29.2, bevelEnabled: true, bevelThickness: 0.4, bevelSize: 0.12,
      bevelSegments: 4, curveSegments: 14, steps: 1 });
    g.rotateY(Math.PI / 2); g.translate(-14.6, 0, 0);     // comprimento no eixo x, de -15 a 15
    return g;
  })();
  var geoLado = new THREE.PlaneGeometry(29.6, 4.82);
  var geoTeto = new THREE.PlaneGeometry(29.2, 1.6);
  var geoFole = new THREE.BoxGeometry(1.8, 5.2, 3.8);
  var geoQuadro = new THREE.BoxGeometry(7, 0.8, 4.3);
  var geoRoda = new THREE.CylinderGeometry(0.82, 0.82, 0.3, 24);
  var geoRaio = new THREE.BoxGeometry(1.3, 0.06, 0.22);
  var geoCubo = new THREE.CylinderGeometry(0.26, 0.26, 0.34, 14);
  var geoBrilhoBaixo = new THREE.PlaneGeometry(28, 6.5);
  var geoCapsula = new THREE.BoxGeometry(7, 0.55, 1.5);

  var rodas = [];
  function truque(xc) {
    var g = new THREE.Group(); g.position.x = xc;
    var q = new THREE.Mesh(geoQuadro, matEscuro); q.position.y = 1.0; g.add(q);
    [-2.1, 2.1].forEach(function (dx) {
      [-2.3, 2.3].forEach(function (dz) {
        var r = new THREE.Group(); r.position.set(dx, 0.82, dz); r.rotation.x = Math.PI / 2;
        r.add(new THREE.Mesh(geoRoda, matRoda));
        var raio = new THREE.Mesh(geoRaio, matEscuro); raio.position.y = dz > 0 ? 0.17 : -0.17; r.add(raio);   // na face de fora
        var cubo = new THREE.Mesh(geoCubo, matCobre); r.add(cubo);
        g.add(r); rodas.push(r);
      });
    });
    return g;
  }
  function vagao(tipo) {
    var g = new THREE.Group();
    g.add(new THREE.Mesh(geoCorpo, matCasco));
    var lat = LATERAIS[tipo];
    var d = new THREE.Mesh(geoLado, lat.mat); d.position.set(0, 3.19, 2.64); g.add(d);
    var l = new THREE.Mesh(geoLado, lat.luz); l.position.set(0, 3.19, 2.66); g.add(l);
    var t = new THREE.Mesh(geoTeto, matTeto); t.rotation.x = -Math.PI / 2; t.position.set(0, 7.39, 0); g.add(t);
    if (tipo === 'servico') {
      var cap = new THREE.Mesh(geoCapsula, matEscuro); cap.position.set(0, 7.6, 0); g.add(cap);
      var friso = new THREE.Mesh(new THREE.BoxGeometry(6.6, 0.08, 1.52), matCobre); friso.position.set(0, 7.66, 0); g.add(friso);
    }
    g.add(truque(-9.6)); g.add(truque(9.6));
    var f = new THREE.Mesh(geoFole, matFole); f.position.set(15.8, 3.7, 0); g.add(f);
    var b = new THREE.Mesh(geoBrilhoBaixo, matBrilhoBaixo); b.rotation.x = -Math.PI / 2; b.position.set(0, 0.34, 0); g.add(b);
    return g;
  }

  /* ───────── o trem sem fim ───────── */
  var PASSO = 31.6;                                       // vagão + fole
  var TIPOS = ['passageiros', 'passageiros', 'servico', 'passageiros', 'passageiros', 'servico', 'passageiros'];
  var N = TIPOS.length, LIMITE = N * PASSO / 2;
  var vagoes = TIPOS.map(function (tp, i) {
    var v = vagao(tp); v.position.x = -LIMITE + PASSO * (i + 0.5); cenaTrem.add(v); return v;
  });
  var VEL = 132;                                          // unidades por segundo: uns 4 vagões por segundo
  var PULSO = 15;                                         // as luzes dos dormentes correndo

  /* ───────── trilho: dois trilhos de metal, dormentes com luzes que correm, viga e canal de energia ───────── */
  var LARG = 460;
  var matMetal = new THREE.MeshStandardMaterial({ color: 0xaab0bb, roughness: 0.25, metalness: 0.95 });
  var matBase = new THREE.MeshStandardMaterial({ color: 0x0f1014, roughness: 0.6, metalness: 0.7, envMapIntensity: 0.4 });
  [-2.3, 2.3].forEach(function (z) {
    var tr = new THREE.Mesh(new THREE.BoxGeometry(LARG, 0.3, 0.26), matMetal); tr.position.set(0, -0.02, z); cenaTrilho.add(tr);
    var ba = new THREE.Mesh(new THREE.BoxGeometry(LARG, 0.16, 0.62), matBase); ba.position.set(0, -0.24, z); cenaTrilho.add(ba);
  });
  var viga = new THREE.Mesh(new THREE.BoxGeometry(LARG, 0.8, 2.8), matBase); viga.position.set(0, -0.95, 0); cenaTrilho.add(viga);
  var canal = new THREE.Mesh(new THREE.PlaneGeometry(LARG, 0.5), new THREE.MeshBasicMaterial({ color: 0xff8a2a,
    transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }));
  canal.rotation.x = -Math.PI / 2; canal.position.set(0, -0.3, 0); cenaTrilho.add(canal);

  var ESP = 2.4, ND = Math.round(LARG / ESP);
  var dorm = new THREE.InstancedMesh(new THREE.BoxGeometry(0.8, 0.24, 6.4), matBase, ND);
  var luzD = new THREE.InstancedMesh(new THREE.BoxGeometry(0.36, 0.1, 0.36),
    new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false }), ND * 2);
  var halo = new THREE.InstancedMesh(new THREE.PlaneGeometry(1.7, 1.7),
    new THREE.MeshBasicMaterial({ map: BRILHO_BRANCO, transparent: true, blending: THREE.AdditiveBlending,
      depthWrite: false, toneMapped: false }), ND * 2);
  var mtx = new THREE.Matrix4(), q0 = new THREE.Quaternion(), qPlano = new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0));
  var um = new THREE.Vector3(1, 1, 1), pos = new THREE.Vector3(), cor = new THREE.Color();
  var xs = [];
  for (var di = 0; di < ND; di++) {
    var dx = -LARG / 2 + di * ESP; xs.push(dx);
    dorm.setMatrixAt(di, mtx.compose(pos.set(dx, -0.34, 0), q0, um));
    [-3.05, 3.05].forEach(function (z, k) {
      luzD.setMatrixAt(di * 2 + k, mtx.compose(pos.set(dx, -0.2, z), q0, um));
      halo.setMatrixAt(di * 2 + k, mtx.compose(pos.set(dx, -0.12, z), qPlano, um));
      luzD.setColorAt(di * 2 + k, cor.setRGB(0.3, 0.15, 0.05));
      halo.setColorAt(di * 2 + k, cor.setRGB(0.2, 0.1, 0.03));
    });
  }
  [dorm, luzD, halo].forEach(function (o) { o.frustumCulled = false; cenaTrilho.add(o); });
  function luzesCorrendo(t) {                              // pulsos que andam para a esquerda, junto com o trem
    for (var i = 0; i < ND; i++) {
      var b = 0.18 + 0.82 * Math.pow(Math.max(0, Math.sin(xs[i] * 0.21 + t * PULSO)), 10);
      for (var k = 0; k < 2; k++) {
        luzD.setColorAt(i * 2 + k, cor.setRGB(1.0 * b + 0.15, 0.55 * b + 0.06, 0.2 * b + 0.02));
        halo.setColorAt(i * 2 + k, cor.setRGB(0.9 * b, 0.45 * b, 0.15 * b));
      }
    }
    luzD.instanceColor.needsUpdate = true; halo.instanceColor.needsUpdate = true;
  }

  /* ───────── linhas de velocidade (no trem: entram no borrão) ───────── */
  var RISCO = (function () {
    var c = tela2d(256, 8), x = c.getContext('2d'), g = x.createLinearGradient(0, 0, 256, 0);
    g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(0.15, 'rgba(255,236,210,0.9)'); g.addColorStop(1, 'rgba(255,200,150,0)');
    x.fillStyle = g; x.fillRect(0, 2, 256, 4);
    return textura(c);
  })();
  var riscos = [];
  for (var ri = 0; ri < 26; ri++) {
    var m = new THREE.Mesh(new THREE.PlaneGeometry(1, 0.07), new THREE.MeshBasicMaterial({ map: RISCO, transparent: true,
      blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false, opacity: 0.5 }));
    sortearRisco(m, true); cenaTrem.add(m); riscos.push(m);
  }
  function sortearRisco(m, qualquerX) {
    var frente = Math.random() < 0.45;
    m.position.set(qualquerX ? (Math.random() - 0.5) * 160 : 80 + Math.random() * 60,
      frente ? 0.4 + Math.random() * 3.2 : -1 + Math.random() * 11, frente ? 3.6 + Math.random() * 5 : -4 - Math.random() * 10);
    m.scale.x = 8 + Math.random() * 22;
    m.material.opacity = 0.25 + Math.random() * 0.45;
    m.userData.vel = VEL * (1.6 + Math.random() * 1.2);
  }

  /* ───────── faíscas nas rodas ───────── */
  var NF = 140, fPos = new Float32Array(NF * 3), fCor = new Float32Array(NF * 3), fVel = new Float32Array(NF * 3);
  var fIdade = new Float32Array(NF).fill(9), fProx = 0;
  var geoF = new THREE.BufferGeometry();
  geoF.setAttribute('position', new THREE.BufferAttribute(fPos, 3));
  geoF.setAttribute('color', new THREE.BufferAttribute(fCor, 3));
  var faiscas = new THREE.Points(geoF, new THREE.PointsMaterial({ size: 0.16, vertexColors: true, transparent: true,
    blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }));
  faiscas.frustumCulled = false; cenaTrem.add(faiscas);
  var VIDA_F = 0.4, roda = new THREE.Vector3();
  function soltarFaiscas(dt) {
    if (Math.random() < dt * 9) {                         // de vez em quando, um punhado numa roda do lado de cá
      var r = rodas[(Math.random() * rodas.length) | 0];
      r.getWorldPosition(roda);
      if (roda.z > 0 && Math.abs(roda.x) < 60) {
        for (var k = 0; k < 7; k++) {
          var i = fProx; fProx = (fProx + 1) % NF; fIdade[i] = 0;
          fPos[i*3] = roda.x + (Math.random() - 0.5) * 0.6; fPos[i*3+1] = 0.05; fPos[i*3+2] = roda.z + 0.1;
          fVel[i*3] = -VEL * (0.25 + Math.random() * 0.45); fVel[i*3+1] = 1.5 + Math.random() * 4.5; fVel[i*3+2] = Math.random() * 2;
        }
      }
    }
    for (var j = 0; j < NF; j++) {
      fIdade[j] += dt;
      var f = Math.max(0, 1 - fIdade[j] / VIDA_F);
      fVel[j*3+1] -= 18 * dt;
      fPos[j*3] += fVel[j*3] * dt; fPos[j*3+1] += fVel[j*3+1] * dt; fPos[j*3+2] += fVel[j*3+2] * dt;
      fCor[j*3] = f; fCor[j*3+1] = 0.62 * f; fCor[j*3+2] = 0.25 * f;
    }
    geoF.attributes.position.needsUpdate = true; geoF.attributes.color.needsUpdate = true;
  }

  /* ───────── borrão de movimento: o trem vai para uma textura e volta desfocado na horizontal ───────── */
  var rt = renderer.capabilities.isWebGL2
    ? new THREE.WebGLMultisampleRenderTarget(4, 4, { format: THREE.RGBAFormat })
    : new THREE.WebGLRenderTarget(4, 4, { format: THREE.RGBAFormat });
  rt.texture.encoding = THREE.sRGBEncoding;
  var camQuad = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  var matQuad = new THREE.ShaderMaterial({
    uniforms: { tMapa: { value: rt.texture }, uPasso: { value: 0 } },
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }',
    fragmentShader: [
      'uniform sampler2D tMapa; uniform float uPasso; varying vec2 vUv;',
      'void main(){',
      '  vec4 s = vec4(0.0);',
      '  for (int i = 0; i < 12; i++) { float k = float(i) / 11.0 - 0.5; s += texture2D(tMapa, vUv + vec2(k * uPasso, 0.0)); }',
      '  gl_FragColor = s / 12.0;',                        // já vem pré-multiplicado pelo alfa
      '}'].join('\n'),
    transparent: true, depthTest: false, depthWrite: false,
    blending: THREE.CustomBlending, blendSrc: THREE.OneFactor, blendDst: THREE.OneMinusSrcAlphaFactor,
    blendSrcAlpha: THREE.OneFactor, blendDstAlpha: THREE.OneMinusSrcAlphaFactor
  });
  var cenaQuad = new THREE.Scene();
  cenaQuad.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), matQuad));
  var buf = new THREE.Vector2();

  /* ───────── tamanho ───────── */
  var pxPorUnidade = 10;
  function medir() {
    var w = faixa.clientWidth, h = faixa.clientHeight;
    if (!w || !h) return;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, w < 700 ? 0.9 : 0.75));   // menos pixels: o borrão esconde
    renderer.setSize(w, h, false);
    renderer.getDrawingBufferSize(buf);
    rt.setSize(buf.x, buf.y);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    var dist = Math.hypot(CAM.x, CAM.y - CAM.alvoY, CAM.z);
    pxPorUnidade = buf.y / (2 * dist * Math.tan(camera.fov * Math.PI / 360));
    if (!rodando && cena3d && cena3d.visivel()) desenhar(0);    // longe da tela não desenha (o maestro pinta quando aparecer)
  }

  /* ───────── laço ───────── */
  var tempo = 0;
  function desenhar(dt) {
    if (!ambientePronto) return;                         // espera o reflexo chegar (evita compilar duas vezes)
    tempo += dt;
    var v = reduzido ? 0 : VEL;
    for (var i = 0; i < N; i++) {
      var vg = vagoes[i];
      vg.position.x -= v * dt;
      if (vg.position.x < -LIMITE) vg.position.x += N * PASSO;   // saiu pela esquerda: volta lá na direita
      vg.position.y = v ? Math.sin(tempo * 37 + i * 1.7) * 0.025 : 0;
    }
    if (v) {
      for (var r = 0; r < rodas.length; r++) rodas[r].rotation.y -= v * dt / 0.82;
      for (var k = 0; k < riscos.length; k++) {
        var m = riscos[k]; m.position.x -= m.userData.vel * dt;
        if (m.position.x < -90) sortearRisco(m, false);
      }
      soltarFaiscas(dt);
    }
    luzesCorrendo(reduzido ? 0 : tempo);
    camera.position.set(CAM.x + (v ? (Math.random() - 0.5) * 0.05 : 0), CAM.y + (v ? (Math.random() - 0.5) * 0.04 : 0), CAM.z);
    camera.lookAt(0, CAM.alvoY, 0);

    // 1) o trem numa textura; 2) o trilho direto na tela; 3) o trem por cima, borrado na horizontal
    renderer.setRenderTarget(rt); renderer.clear(); renderer.render(cenaTrem, camera);
    renderer.setRenderTarget(null); renderer.clear(); renderer.render(cenaTrilho, camera);
    var borrao = v && dt ? Math.min(60, v * dt * pxPorUnidade * 0.5) : 0;
    matQuad.uniforms.uPasso.value = borrao / Math.max(1, buf.x);
    renderer.autoClear = false; renderer.render(cenaQuad, camQuad); renderer.autoClear = true;
  }
  var rodando = false, ultimo = 0, quadro = 0, cena3d = null;
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
  // os shaders compilam em segundo plano assim que o reflexo chega; o primeiro quadro só sai quando o trem aparece
  function precompilar() {
    try {
      renderer.setRenderTarget(rt); renderer.compile(cenaTrem, camera); renderer.setRenderTarget(null);
      renderer.compile(cenaTrilho, camera); renderer.compile(cenaQuad, camQuad);
    } catch (e) { renderer.setRenderTarget(null); }
  }
  if ('ResizeObserver' in window) new ResizeObserver(medir).observe(faixa);
  else window.addEventListener('resize', medir, { passive: true });
  // a vez de desenhar vem do maestro (js/cenas.js); o trem é rápido (60 quadros) e, mesmo sendo uma faixa
  // baixa, ganha a vez do fundo quando aparece (peso maior)
  cena3d = Cenas.registrar({ nome: 'trem', el: faixa, peso: 2.5, fps: 60, ligar: ligar, desligar: desligar,
    motor: renderer, aoMudarQualidade: medir,             // o borrão usa o tamanho da imagem: recalcula
    pintar: function () { if (!rodando) desenhar(0); } });
  tela.addEventListener('webglcontextlost', function (e) { e.preventDefault(); desligar(); });
}, { sempre: true });
