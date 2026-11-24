/* ── PROGRESS BAR ──
   A altura da página fica guardada (é medida só quando muda de tamanho) e a barra é atualizada uma vez por
   quadro: ler a altura a cada evento de rolagem obrigava o navegador a recalcular o layout da página inteira. */
const progressBar = document.getElementById('progressBar');
if (progressBar) {
  let totalRolagem = 1, barraPedida = false;
  const medirRolagem = () => { totalRolagem = Math.max(1, document.documentElement.scrollHeight - window.innerHeight); };
  medirRolagem();
  window.addEventListener('resize', medirRolagem, { passive: true });
  window.addEventListener('load', medirRolagem);
  if ('ResizeObserver' in window) new ResizeObserver(medirRolagem).observe(document.body);
  window.addEventListener('scroll', () => {
    if (barraPedida) return;
    barraPedida = true;
    requestAnimationFrame(() => { barraPedida = false; progressBar.style.width = (window.scrollY / totalRolagem * 100) + '%'; });
  }, { passive: true });
}

/* ══════════════════════════════════════════
   DARK MODE — sempre escuro, sem toggle
   isDark sempre true; imagens do hero sempre diurnas (1/2)
══════════════════════════════════════════ */
const img1 = document.getElementById('img1');
const img2 = document.getElementById('img2');

// Sincroniza dark-mode do <html> para o <body>
if (document.documentElement.classList.contains('dark-mode')) {
  document.body.classList.add('dark-mode');
  document.documentElement.classList.remove('dark-mode');
}

// Imagens do hero: sempre as diurnas (assets/1 e assets/2), na versão 2400px.
// No hero novo o robô aparece bem grande em qualquer tela, então a versão menor ficaria borrada.
// A 2 (olhos fechados) é a 1 com só a região dos olhos trocada: nada mais se mexe na piscada.
const DAY_IMAGES = {
  open:   'assets/1-desktop.webp',
  closed: 'assets/2-desktop.webp',
};

/* ══════════════════════════════════════════
   PROGRESSIVE BLUR-UP LOADER
══════════════════════════════════════════ */
function loadHD(imgEl, hdSrc, onReady) {
  if (!imgEl || !hdSrc) return;
  function applyLoaded() {
    imgEl.src = hdSrc;
    imgEl.removeAttribute('data-src-hd');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        imgEl.classList.remove('img-loading');
        imgEl.classList.add('img-loaded');
        if (onReady) onReady();
      });
    });
  }
  const preloader = new Image();
  preloader.onload  = applyLoaded;
  preloader.onerror = applyLoaded;
  preloader.src = hdSrc;
  if (preloader.complete) applyLoaded();
}

// Carrega sempre as imagens diurnas
loadHD(img1, DAY_IMAGES.open);
loadHD(img2, DAY_IMAGES.closed);

/* ══════════════════════════════════════════
   BLINK — usa sempre imagens diurnas
══════════════════════════════════════════ */
// A img1 fica sempre visível por baixo; só a img2 (olhos fechados) aparece e some por cima.
// Antes as duas trocavam de opacidade ao mesmo tempo: no meio da troca o robô ficava
// meio transparente (e agora o título atrás dele apareceria através do rosto).
// A duração vai por --blink-ms, sem sobrescrever as outras transições (ex.: o desfoque do carregamento).
const BLINK_CLOSE_MS = 140;   // fechar
const BLINK_HOLD_MS  = 380;   // olhos fechados
const BLINK_OPEN_MS  = 240;   // abrir
function blink() {
  if (!img1 || !img2) return;
  img2.style.setProperty('--blink-ms', BLINK_CLOSE_MS + 'ms');
  img2.style.opacity = '1';
  setTimeout(() => {
    img2.style.setProperty('--blink-ms', BLINK_OPEN_MS + 'ms');
    img2.style.opacity = '0';
  }, BLINK_CLOSE_MS + BLINK_HOLD_MS);
  setTimeout(blink, BLINK_CLOSE_MS + BLINK_HOLD_MS + BLINK_OPEN_MS + 3500 + Math.random() * 4000);
}
setTimeout(blink, 3500);

/* ══════════════════════════════════════════
   PIXEL ASSEMBLY — "BEYOND BITS"
══════════════════════════════════════════ */
const pixelCanvas = document.getElementById('pixelCanvas');
const heroTitle   = document.getElementById('heroTitle');
const pCtx        = pixelCanvas ? pixelCanvas.getContext('2d') : null;
const PIXEL_SIZE = 3, SAMPLE_STEP = 3, ANIM_DURATION = 1800, ANIM_DELAY = 600, SCATTER_RANGE = 1.8;
function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }
function getTextColor() { return '#e8e8e6'; } // sempre claro (dark mode fixo)

function runPixelAnimation() {
  if (!pixelCanvas || !pCtx || !heroTitle) return;

  // Mede o título real no DOM: o canvas usa a mesma fonte, tamanho e posição
  // de cada linha, então a troca pixels → texto acontece sem "pulo".
  const lines = [...heroTitle.querySelectorAll('.line')];
  if (!lines.length) return;
  const wrapBox = pixelCanvas.parentElement.getBoundingClientRect();
  const cs   = getComputedStyle(lines[0]);
  const fs   = parseFloat(cs.fontSize);
  const font = `${cs.fontWeight} ${fs}px ${cs.fontFamily}`;

  const off  = document.createElement('canvas');
  const oCtx = off.getContext('2d');
  // mesmo espaçamento entre letras do CSS (navegadores sem suporte ignoram)
  const setFont = () => { oCtx.font = font; if ('letterSpacing' in oCtx) oCtx.letterSpacing = cs.letterSpacing; };
  setFont();
  const rows = lines.map(el => {
    const text = el.textContent.trim();
    const box  = el.getBoundingClientRect();
    const m    = oCtx.measureText(text);
    const asc  = m.fontBoundingBoxAscent  ?? fs * 0.8;
    const desc = m.fontBoundingBoxDescent ?? fs * 0.2;
    return {
      text,
      x: box.left - wrapBox.left,
      // linha de base dentro da caixa da linha (mesma conta que o navegador faz)
      y: box.top - wrapBox.top + (box.height - (asc + desc)) / 2 + asc,
      right:  box.left - wrapBox.left + m.width,
      bottom: box.bottom - wrapBox.top
    };
  });

  const cW = Math.ceil(Math.max(...rows.map(r => r.right))  + fs * 0.1);
  const cH = Math.ceil(Math.max(...rows.map(r => r.bottom)) + fs * 0.1);
  const dpr = window.devicePixelRatio || 1;
  pixelCanvas.width  = cW * dpr; pixelCanvas.height = cH * dpr;
  pixelCanvas.style.width  = cW + 'px'; pixelCanvas.style.height = cH + 'px';
  pCtx.scale(dpr, dpr);

  off.width = cW; off.height = cH;   // redimensionar zera o contexto: define a fonte de novo
  setFont();
  oCtx.fillStyle = '#000'; oCtx.textBaseline = 'alphabetic';
  rows.forEach(r => oCtx.fillText(r.text, r.x, r.y));

  const imgData = oCtx.getImageData(0, 0, cW, cH).data;
  const targets = [];
  for (let y = 0; y < cH; y += SAMPLE_STEP)
    for (let x = 0; x < cW; x += SAMPLE_STEP)
      if (imgData[(y * cW + x) * 4 + 3] > 80) targets.push({ x, y });

  const particles = targets.map(t => {
    const a  = Math.random() * Math.PI * 2;
    const d  = (0.5 + Math.random()) * Math.max(cW, cH) * SCATTER_RANGE * 0.5;
    const dc = Math.sqrt(Math.pow(t.x - cW/2, 2) + Math.pow(t.y - cH/2, 2));
    const md = Math.sqrt(cW*cW + cH*cH) / 2;
    return {
      sx: cW/2 + Math.cos(a)*d, sy: cH/2 + Math.sin(a)*d,
      tx: t.x, ty: t.y,
      delay: (dc / md) * 0.35 + (Math.random() - 0.5) * 0.15,
      cx: 0, cy: 0
    };
  });

  let st = null, done = false;
  function anim(ts) {
    if (!st) st = ts;
    const p = Math.min((ts - st) / ANIM_DURATION, 1);
    pCtx.clearRect(0, 0, cW, cH);
    const col = getTextColor();
    for (const pt of particles) {
      const ap = Math.max(0, Math.min(1, (p - pt.delay) / (1 - pt.delay)));
      const e  = easeOutQuart(ap);
      pt.cx = pt.sx + (pt.tx - pt.sx) * e;
      pt.cy = pt.sy + (pt.ty - pt.sy) * e;
      pCtx.globalAlpha = Math.min(1, ap * 1.8);
      pCtx.fillStyle   = col;
      pCtx.fillRect(Math.round(pt.cx), Math.round(pt.cy), PIXEL_SIZE, PIXEL_SIZE);
    }
    pCtx.globalAlpha = 1;
    if (p < 1) {
      requestAnimationFrame(anim);
    } else if (!done) {
      done = true;
      setTimeout(() => {
        if (heroTitle) heroTitle.classList.add('revealed');
        pixelCanvas.style.opacity = '0';
        setTimeout(() => { pixelCanvas.style.display = 'none'; }, 450);
      }, 150);
    }
  }
  setTimeout(() => requestAnimationFrame(anim), ANIM_DELAY);
}

document.fonts.ready.then(() => {
  document.fonts.load("800 100px 'Unbounded'").then(runPixelAnimation).catch(runPixelAnimation);
});

/* ══════════════════════════════════════════
   CONTORNO DO "BEYOND" SOBRE O ROBÔ
   Posiciona a máscara do contorno exatamente onde o robô está,
   para o contorno aparecer só nas partes das letras que ficam atrás dele.
══════════════════════════════════════════ */
const heroGhost = document.getElementById('heroGhost');
const heroMedia = document.querySelector('.hero-media');
function syncHeroGhost() {
  if (!heroGhost || !heroMedia) return;
  const g = heroGhost.getBoundingClientRect(), m = heroMedia.getBoundingClientRect();
  heroGhost.style.setProperty('--gx', (m.left - g.left) + 'px');
  heroGhost.style.setProperty('--gy', (m.top - g.top) + 'px');
  heroGhost.style.setProperty('--gw', m.width + 'px');
  heroGhost.style.setProperty('--gh', m.height + 'px');
}
syncHeroGhost();
document.fonts.ready.then(syncHeroGhost);
window.addEventListener('resize', syncHeroGhost, { passive: true });

/* ══════════════════════════════════════════════════════
   ★ CARDS DE SOLUÇÕES — inclinação 3D seguindo o mouse
   Só em dispositivos com mouse; no toque os cards ficam parados.
══════════════════════════════════════════════════════ */
function initCardTilt() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  document.querySelectorAll('.card-3d').forEach(card => {
    const inner = card.querySelector('.card-3d-inner');
    if (!inner) return;
    card.addEventListener('mousemove', (e) => {
      const r  = card.getBoundingClientRect();
      const rx = ((e.clientY - r.top  - r.height/2) / (r.height/2)) * -8;
      const ry = ((e.clientX - r.left - r.width /2) / (r.width /2)) *  8;
      inner.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.03,1.03,1.03)`;
    });
    card.addEventListener('mouseleave', () => { inner.style.transform = ''; });
  });
}
initCardTilt();

/* ══════════════════════════════════════════════════════
   ★ EARTH GLOBE — Three.js r128
══════════════════════════════════════════════════════ */
let earthGlobeRenderer = null;
let earthGlobeMesh     = null;

function initEarthGlobe() {
  const el = document.getElementById('earthGlobeViz');
  if (!el || typeof THREE === 'undefined') return;
  if (earthGlobeRenderer) return;

  const W   = el.offsetWidth  || 520;
  const H   = el.offsetHeight || 520;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 1000);
  camera.position.z = 2.5;

  earthGlobeRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  earthGlobeRenderer.setSize(W, H);
  earthGlobeRenderer.setPixelRatio(dpr);
  earthGlobeRenderer.setClearColor(0x000000, 0);
  el.appendChild(earthGlobeRenderer.domElement);

  // as texturas da Terra são decodificadas fora da tarefa principal e vão para a placa num momento ocioso
  const texDe = (url) => {
    const t = new THREE.Texture();
    if (window.Cenas) {
      window.Cenas.imagem(url, true).then((r) => {
        t.image = r.img; t.flipY = !r.bitmap; t.needsUpdate = true;
        window.Cenas.ocioso(() => { try { earthGlobeRenderer.initTexture(t); } catch (e) { /* vai no primeiro quadro */ } }, el);
      }, () => {});
    } else {
      new THREE.TextureLoader().load(url, (tx) => { t.image = tx.image; t.needsUpdate = true; });
    }
    return t;
  };

  // Versão fixa: a URL sem versão redireciona e a resposta perde o cabeçalho CORS
  const TEX = 'https://unpkg.com/three-globe@2.45.6/example/img/';
  const earthMat = new THREE.MeshPhongMaterial({
    map:         texDe(TEX + 'earth-night.jpg'),
    bumpMap:     texDe(TEX + 'earth-topology.png'),
    bumpScale:   0.05,
    specularMap: texDe(TEX + 'earth-water.png'),
    specular:    new THREE.Color(0x003366),
    shininess:   20,
  });
  earthGlobeMesh = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 64), earthMat);
  earthGlobeMesh.rotation.x = THREE.MathUtils.degToRad(20);
  scene.add(earthGlobeMesh);

  const atmMat = new THREE.MeshPhongMaterial({
    color: 0x4488ff, transparent: true, opacity: 0.07,
    side: THREE.FrontSide, depthWrite: false,
  });
  scene.add(new THREE.Mesh(new THREE.SphereGeometry(1.06, 64, 64), atmMat));

  const starPos = new Float32Array(2500 * 3);
  for (let i = 0; i < 2500; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi   = Math.acos(2 * Math.random() - 1);
    const r     = 80 + Math.random() * 20;
    starPos[i*3]   = r * Math.sin(phi) * Math.cos(theta);
    starPos[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
    starPos[i*3+2] = r * Math.cos(phi);
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({
    color: 0xffffff, size: 0.18, sizeAttenuation: true, transparent: true, opacity: 0.9
  })));

  scene.add(new THREE.AmbientLight(0xffffff, 0.25));
  const sun = new THREE.DirectionalLight(0xffffff, 1.3);
  sun.position.set(5, 3, 5);
  scene.add(sun);

  // o globo só gira quando é a vez dele (js/cenas.js): fora da tela, ou com outra cena na frente, para de desenhar
  let rodando = false, quadro = 0, ultimo = 0;
  const desenharGlobo = (dt) => {
    earthGlobeMesh.rotation.y += 0.09 * dt;            // a mesma velocidade de antes (0.0015 por quadro a 60 fps)
    earthGlobeRenderer.render(scene, camera);
  };
  const passoGlobo = (agora) => {
    if (!rodando) return;
    quadro = requestAnimationFrame(passoGlobo);
    if (!cenaGlobo.vez(agora)) return;
    const dt = Math.min(0.05, (agora - ultimo) / 1000 || 0);
    ultimo = agora;
    desenharGlobo(dt);
  };
  const ligarGlobo = () => {
    if (rodando) return;
    rodando = true; ultimo = performance.now();
    quadro = requestAnimationFrame(passoGlobo);
  };
  const cenaGlobo = window.Cenas
    ? window.Cenas.registrar({
        nome: 'globo', el, peso: 0.8, fps: 30, ligar: ligarGlobo,
        desligar: () => { rodando = false; cancelAnimationFrame(quadro); },
        pintar: () => desenharGlobo(0)
      })
    : { vez: () => true };
  if (!window.Cenas) ligarGlobo();
  desenharGlobo(0);                                    // quadro de aquecimento: prepara o shader já na montagem
}

// o globo é montado em segundo plano pelo maestro (js/cenas.js), logo depois de a página carregar
const benefitsSec = document.querySelector('.benefits-section');
if (benefitsSec) {
  if (window.Cenas) window.Cenas.preparar(benefitsSec, initEarthGlobe);
  else initEarthGlobe();
}

/* ══════════════════════════════════════════════════════
   SEÇÃO "O QUE CONSTRUÍMOS" — cena espacial
   Poucas naves, todas da direita para a esquerda, em três distâncias:
   · fundo  — lá longe, quase pontos de luz cruzando o céu devagar, atrás do globo;
   · meio   — rasantes rápidos atrás dos cards, uma (às vezes duas) por vez;
   · câmera — de tempos em tempos uma passa raspando a lente: gigante, rapidíssima e
              desfocada (assets/nave-perto.webp), na frente de tudo (#spaceFrente).
   O satélite é animação CSS; aqui só ligamos/desligamos (.in-view) conforme a seção
   entra ou sai da tela. Nada roda com a aba escondida nem com "reduzir movimento".
══════════════════════════════════════════════════════ */
(function initSpaceScene() {
  if (!benefitsSec) return;
  const reduced  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const space    = document.getElementById('spaceBg');
  const frente   = document.getElementById('spaceFrente');
  const cardsEl  = document.getElementById('floatingCards');
  const headerEl = benefitsSec.querySelector('.benefits-header');
  const SHIP_SRC   = 'assets/nave.webp';
  const NEAR_SRC   = 'assets/nave-perto.webp';
  const SHIP_RATIO = 897 / 1998;   // altura / largura de nave.webp
  const NEAR_W     = 1042;         // largura de nave-perto.webp (com a margem do desfoque)
  const NEAR_RATIO = 491 / 1042;
  const SHIP_AXIS  = 11.1;         // na imagem, o bico aponta 11,1° abaixo da horizontal
  const rand  = (a, b) => a + Math.random() * (b - a);
  const lerp  = (a, b, t) => a + (b - a) * t;
  const clamp01 = v => Math.min(1, Math.max(0, v));
  const isMobile = () => window.innerWidth <= 900;
  const vivos  = { fundo: 0, meio: 0 };
  const timers = { fundo: null, meio: null, perto: null };
  let onScreen = false;

  // Uma passagem da direita para a esquerda (o bico da imagem já aponta para a esquerda).
  // ang > 0 = vai descendo um pouco; a imagem gira para o bico seguir o trajeto.
  // `base` = largura de layout da caixa (a nave de perto é desenhada pequena e ampliada
  // pela placa de vídeo, que é bem mais leve que uma caixa de 3000 px).
  function voar(alvo, o) {
    const { W, w, ratio, yMid, ang, duration } = o;
    const h = w * ratio, base = o.base || w, f = w / base;
    const x0 = W + w * 0.15, x1 = -w * 1.15;
    const drop = (x0 - x1) * Math.tan(ang * Math.PI / 180);
    const cy0 = yMid - drop / 2, cy1 = yMid + drop / 2;          // centro da nave
    const rot = (SHIP_AXIS - ang).toFixed(2);
    const s0 = (f * (o.s0 || 1)).toFixed(4), s1 = (f * (o.s1 || 1)).toFixed(4);
    const meio = `rotate(${rot}deg) scale(SC) translate(${(-base / 2).toFixed(1)}px, ${(-base * ratio / 2).toFixed(1)}px)`;

    const el = document.createElement('div');
    el.className = 'fleet-ship' + (o.classe ? ' ' + o.classe : '');
    el.style.width = base.toFixed(1) + 'px';
    el.style.transformOrigin = '0 0';
    if (o.z != null) el.style.zIndex = o.z;
    if (o.opacity != null) el.style.opacity = o.opacity;
    const img = new Image();
    img.src = o.src; img.alt = ''; img.decoding = 'async';
    el.appendChild(img);
    alvo.appendChild(el);
    if (o.camada) vivos[o.camada]++;
    const anim = el.animate([
      { transform: `translate(${(x0 + w / 2).toFixed(1)}px, ${cy0.toFixed(1)}px) ` + meio.replace('SC', s0) },
      { transform: `translate(${(x1 + w / 2).toFixed(1)}px, ${cy1.toFixed(1)}px) ` + meio.replace('SC', s1) }
    ], { duration, delay: o.delay || 0, easing: 'linear', fill: 'both' });
    const fim = () => { el.remove(); if (o.camada) vivos[o.camada]--; };
    anim.onfinish = fim; anim.oncancel = fim;
  }

  // ── fundo: bem lá atrás, quase uma estrela (10–16 px), cruzando o céu em 18–30 s ──
  function naveDoFundo(adiantar) {
    const W = space.clientWidth, H = space.clientHeight;
    const w = isMobile() ? rand(8, 12) : rand(10, 16);
    const duration = rand(18000, 30000);
    voar(space, {
      W, w, ratio: SHIP_RATIO, src: SHIP_SRC, duration,
      yMid: rand(H * 0.05, H * 0.9), ang: rand(-1.5, 3),
      delay: adiantar ? -rand(0.15, 0.8) * duration : 0,     // ao entrar na seção já tem uma cruzando
      z: 1, opacity: rand(0.6, 0.95).toFixed(2), classe: 'fleet-ship--fundo', camada: 'fundo'
    });
  }
  function fundo() {
    timers.fundo = null;
    if (!onScreen) return;
    if (!document.hidden && vivos.fundo < (isMobile() ? 2 : 3)) naveDoFundo(false);
    timers.fundo = setTimeout(fundo, rand(5000, 9000));
  }

  // ── meio: rasante rápido atrás dos cards (no celular, atrás do título) ──
  function meio() {
    timers.meio = null;
    if (!onScreen) return;
    if (!document.hidden && vivos.meio < 2) {
      const s = space.getBoundingClientRect();
      const r = (isMobile() ? headerEl : cardsEl).getBoundingClientRect();
      const top = r.top - s.top, span = r.height, W = s.width, mob = isMobile();
      const n = Math.random() < 0.75 ? 1 : 2;
      const k0 = Math.random(), ang = rand(2.5, 6.5);
      const yMid = rand(top + span * 0.15, top + span * 0.85);
      for (let i = 0; i < n; i++) {
        const k = clamp01(k0 + rand(-0.12, 0.12));
        voar(space, {
          W, w: W * (mob ? lerp(0.24, 0.44, k) : lerp(0.1, 0.22, k)), ratio: SHIP_RATIO, src: SHIP_SRC,
          duration: lerp(2100, 1000, k), yMid: yMid + (i === 0 ? 0 : rand(-1, 1) * span * 0.22), ang,
          delay: i * rand(140, 320), z: 3, opacity: lerp(0.75, 1, k).toFixed(2), camada: 'meio'
        });
      }
    }
    timers.meio = setTimeout(meio, rand(5000, 9000));
  }

  // ── câmera: uma de cada vez, raspando a lente. Gigante (2 a 2,6 vezes a largura da tela)
  // e rapidíssima (~0,3 s); passa pela borda de cima ou de baixo da parte da seção que está
  // na tela, com só a barriga da nave (22–35% da altura dela) entrando no quadro ──
  function perto() {
    timers.perto = null;
    if (!onScreen) return;
    if (!document.hidden && frente) {
      const s = benefitsSec.getBoundingClientRect();
      const vTop = Math.max(0, -s.top), vBot = Math.min(s.height, window.innerHeight - s.top);
      if (vBot - vTop > 240) {
        const W = frente.clientWidth;
        const w = W * (isMobile() ? rand(2.6, 3.2) : rand(2.0, 2.6)), h = w * NEAR_RATIO;
        const fora = h * rand(0.15, 0.28);                    // quanto do centro fica fora do quadro
        voar(frente, {
          W, w, base: NEAR_W, ratio: NEAR_RATIO, src: NEAR_SRC,
          duration: rand(260, 360), ang: rand(3, 7),
          yMid: Math.random() < 0.5 ? vTop - fora : vBot + fora,
          s0: 0.92, s1: 1.08                                  // vem chegando: cresce um pouco na passagem
        });
      }
    }
    timers.perto = setTimeout(perto, rand(9000, 15000));
  }

  new IntersectionObserver(([e]) => {
    onScreen = e.isIntersecting;
    benefitsSec.classList.toggle('in-view', onScreen);   // satélite (CSS) só anda com a seção na tela
    if (!onScreen || reduced || !space) return;
    if (!timers.fundo) {
      for (let i = vivos.fundo; i < 2; i++) naveDoFundo(true);
      timers.fundo = setTimeout(fundo, 4000);
    }
    if (cardsEl && !timers.meio) timers.meio = setTimeout(meio, 1800);
    if (!timers.perto) timers.perto = setTimeout(perto, 3200);
  }, { threshold: 0.2 }).observe(benefitsSec);
})();

/* ── IntersectionObserver ── */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
      if (e.target.classList.contains('benefits-section')) {
        setTimeout(() => {
          document.querySelectorAll('.card-3d').forEach(c => c.classList.add('js-controlled'));
        }, 1400);
      }
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.benefits-section, .cta-section').forEach(el => {
  el.classList.add('js-reveal');
  io.observe(el);
});

/* ══════════════════════════════════════════════════════
   ★ PROJETOS — filtro Entregues / Em desenvolvimento
   Sem JS todos os cards aparecem; com JS o filtro começa em "entregue".
══════════════════════════════════════════════════════ */
function initProjects() {
  const grid = document.getElementById('projGrid');
  if (!grid) return;
  const cards = grid.querySelectorAll('.proj-card');
  const tabs  = document.querySelectorAll('.proj-tab');
  let revealed = false;
  grid.classList.add('js-reveal');

  function revealVisible() {
    let i = 0;
    cards.forEach(c => {
      if (c.hidden) return;
      c.classList.remove('proj-visible');
      setTimeout(() => c.classList.add('proj-visible'), 40 + i++ * 90);
    });
  }

  function applyFilter(filter) {
    tabs.forEach(t => t.setAttribute('aria-pressed', String(t.dataset.filter === filter)));
    cards.forEach(c => { c.hidden = c.dataset.status !== filter; });
    if (revealed) revealVisible();
  }

  tabs.forEach(t => t.addEventListener('click', () => applyFilter(t.dataset.filter)));
  applyFilter('entregue');

  const gridObserver = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;
    revealed = true;
    revealVisible();
    gridObserver.disconnect();
  }, { threshold: 0.1 });
  gridObserver.observe(grid);
}
initProjects();

/* ── Âncoras internas com rolagem suave ── */
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');
  const hash = link ? link.getAttribute('href') : '';
  if (hash.length < 2) return;
  const target = document.getElementById(hash.slice(1));
  if (!target) return;
  e.preventDefault();
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
});
