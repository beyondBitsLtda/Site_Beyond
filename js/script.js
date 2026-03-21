/* ── PROGRESS BAR ── */
const progressBar = document.getElementById('progressBar');
window.addEventListener('scroll', () => {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (window.scrollY / total * 100) + '%';
}, { passive: true });

/* ══════════════════════════════════════════
   DARK MODE
══════════════════════════════════════════ */
const img1 = document.getElementById('img1');
const img2 = document.getElementById('img2');
const themeToggle = document.getElementById('themeToggle');
let isDark = false;
let sphereReady = false;

const IMAGES = {
  light: { open: 'assets/1.png', closed: 'assets/2.png' },
  dark:  { open: 'assets/3.png', closed: 'assets/4.png' }
};

function initTheme() {
  const saved = localStorage.getItem('bb-theme');
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    enableDark(false);
  }
}
function enableDark(animate) {
  isDark = true;
  document.body.classList.add('dark-mode');
  swapImages(animate);
  localStorage.setItem('bb-theme', 'dark');
  if (sphereReady) updateSphereColors();
}
function enableLight(animate) {
  isDark = false;
  document.body.classList.remove('dark-mode');
  swapImages(animate);
  localStorage.setItem('bb-theme', 'light');
  if (sphereReady) updateSphereColors();
}
function swapImages(animate) {
  const theme = isDark ? 'dark' : 'light';
  if (animate) {
    img1.style.transition = 'opacity 0.5s ease';
    img2.style.transition = 'opacity 0.5s ease';
    img1.style.opacity = '0';
    img2.style.opacity = '0';
    setTimeout(() => {
      img1.src = IMAGES[theme].open;
      img2.src = IMAGES[theme].closed;
      let loaded = 0;
      const reveal = () => { loaded++; if (loaded >= 2) img1.style.opacity = '1'; };
      img1.onload = reveal; img2.onload = reveal;
      if (img1.complete) loaded++;
      if (img2.complete) loaded++;
      if (loaded >= 2) img1.style.opacity = '1';
    }, 500);
  } else {
    img1.src = IMAGES[theme].open;
    img2.src = IMAGES[theme].closed;
  }
}
themeToggle.addEventListener('click', () => isDark ? enableLight(true) : enableDark(true));
initTheme();

/* ══════════════════════════════════════════
   BLINK
══════════════════════════════════════════ */
const BLINK_MS = 280;
const DARK_HOLD_MS = 400;
function blink() {
  img2.style.transition = `opacity ${BLINK_MS * 0.4}ms cubic-bezier(0.4,0,0.2,1)`;
  img1.style.transition = `opacity ${BLINK_MS * 0.4}ms cubic-bezier(0.4,0,0.2,1)`;
  img2.style.opacity = '1'; img1.style.opacity = '0';
  const hold = isDark ? (BLINK_MS * 0.45) + DARK_HOLD_MS : BLINK_MS * 0.45;
  setTimeout(() => {
    img2.style.transition = `opacity ${BLINK_MS * 0.6}ms cubic-bezier(0.4,0,0.2,1)`;
    img1.style.transition = `opacity ${BLINK_MS * 0.6}ms cubic-bezier(0.4,0,0.2,1)`;
    img2.style.opacity = '0'; img1.style.opacity = '1';
  }, hold);
  setTimeout(() => setTimeout(blink, 3500 + Math.random() * 4000), hold + BLINK_MS * 0.6 + 200);
}
setTimeout(blink, 3500);

/* ══════════════════════════════════════════
   PIXEL ASSEMBLY — "BEYOND BITS"
══════════════════════════════════════════ */
const pixelCanvas = document.getElementById('pixelCanvas');
const heroTitle = document.getElementById('heroTitle');
const pCtx = pixelCanvas.getContext('2d');
const PIXEL_SIZE = 3, SAMPLE_STEP = 3, ANIM_DURATION = 1800, ANIM_DELAY = 600, SCATTER_RANGE = 1.8;
function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }
function getTextColor() { return isDark ? '#e8e8e6' : '#0a0a0a'; }
function getFontSize() { return Math.min(Math.max(110, window.innerWidth * 0.18), 260); }

function runPixelAnimation() {
  const fs = getFontSize(), lh = fs * 0.88;
  const cW = Math.ceil(fs * 5.5), cH = Math.ceil(lh * 2.15);
  const dpr = window.devicePixelRatio || 1;
  pixelCanvas.width = cW * dpr; pixelCanvas.height = cH * dpr;
  pixelCanvas.style.width = cW + 'px'; pixelCanvas.style.height = cH + 'px';
  pCtx.scale(dpr, dpr);

  const off = document.createElement('canvas');
  off.width = cW; off.height = cH;
  const oCtx = off.getContext('2d');
  oCtx.font = `400 ${fs}px 'Bebas Neue', cursive`;
  oCtx.fillStyle = '#000'; oCtx.textBaseline = 'top';
  oCtx.fillText('BEYOND', 0, 0);
  oCtx.fillText('BITS', 0, lh);

  const imgData = oCtx.getImageData(0, 0, cW, cH).data;
  const targets = [];
  for (let y = 0; y < cH; y += SAMPLE_STEP)
    for (let x = 0; x < cW; x += SAMPLE_STEP)
      if (imgData[(y * cW + x) * 4 + 3] > 80) targets.push({ x, y });

  const particles = targets.map(t => {
    const a = Math.random() * Math.PI * 2;
    const d = (0.5 + Math.random()) * Math.max(cW, cH) * SCATTER_RANGE * 0.5;
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
      const e = easeOutQuart(ap);
      pt.cx = pt.sx + (pt.tx - pt.sx) * e;
      pt.cy = pt.sy + (pt.ty - pt.sy) * e;
      pCtx.globalAlpha = Math.min(1, ap * 1.8);
      pCtx.fillStyle = col;
      pCtx.fillRect(Math.round(pt.cx), Math.round(pt.cy), PIXEL_SIZE, PIXEL_SIZE);
    }
    pCtx.globalAlpha = 1;
    if (p < 1) requestAnimationFrame(anim);
    else if (!done) {
      done = true;
      setTimeout(() => {
        heroTitle.classList.add('revealed');
        pixelCanvas.style.opacity = '0';
        setTimeout(() => pixelCanvas.style.display = 'none', 450);
      }, 150);
    }
  }
  setTimeout(() => requestAnimationFrame(anim), ANIM_DELAY);
}

document.fonts.ready.then(() => {
  document.fonts.load("400 100px 'Bebas Neue'").then(runPixelAnimation).catch(runPixelAnimation);
});

/* ══════════════════════════════════════════════════════
   ★ SLIDER SYSTEM ★
══════════════════════════════════════════════════════ */

const ICONS = {
  radar:  `<circle cx="16" cy="16" r="10"/><circle cx="16" cy="16" r="4"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="16" y1="26" x2="16" y2="30"/><line x1="2" y1="16" x2="6" y2="16"/><line x1="26" y1="16" x2="30" y2="16"/>`,
  grid:   `<rect x="4" y="4" width="24" height="24" rx="3"/><path d="M4 12h24M12 4v24"/><circle cx="22" cy="22" r="3"/>`,
  hex:    `<path d="M16 4L28 12V24L16 28L4 24V12L16 4Z"/><path d="M16 4V28M4 12L28 12M4 24L28 24"/>`,
  star:   `<path d="M16 3l3.3 7.6 8.7.9-6.3 5.8 1.9 8.6L16 21.8l-7.6 4.1 1.9-8.6L4 11.5l8.7-.9z"/>`,
  loop:   `<path d="M5 16a11 11 0 0 1 18.7-7.8"/><path d="M27 16a11 11 0 0 1-18.7 7.8"/><polyline points="19.5,4.5 23.7,8 19.5,11.5"/><polyline points="12.5,20.5 8.3,24 12.5,27.5"/>`,
  check:  `<rect x="3" y="3" width="26" height="26" rx="4"/><polyline points="9,16 13,21 23,10"/>`,
  bolt:   `<path d="M19 3L7 18h9l-3 11L25 13h-9L19 3z"/>`,
  layers: `<polygon points="16,4 28,10 16,16 4,10"/><polyline points="4,16 16,22 28,16"/><polyline points="4,22 16,28 28,22"/>`,
  link:   `<path d="M10 22a6 6 0 0 0 8.5 0l4.5-4.5a6 6 0 0 0-8.5-8.5L13 10.5"/><path d="M22 10a6 6 0 0 0-8.5 0l-4.5 4.5a6 6 0 0 0 8.5 8.5L19 21.5"/>`,
  gift:   `<rect x="5" y="11" width="22" height="17" rx="2"/><line x1="3" y1="11" x2="29" y2="11"/><line x1="3" y1="16" x2="29" y2="16"/><line x1="16" y1="11" x2="16" y2="28"/><path d="M16 11c-1-3-5-6-5-2s5 2 5 2M16 11c1-3 5-6 5-2s-5 2-5 2"/>`,
  clock:  `<circle cx="16" cy="16" r="12"/><polyline points="16,8 16,16 21,21"/>`,
  shield: `<path d="M16 3L5 8v7.5c0 5.8 4.7 10.5 11 11.5 6.3-1 11-5.7 11-11.5V8L16 3z"/><polyline points="11,16 14,19 21,12"/>`,
};

const SLIDE_DATA = [
  {
    eyebrow: 'nossas soluções',
    titleLines: ['CRIADO', 'PARA VENDER'],
    cards: [
      {
        n:'01', icon:'radar',
        title:'Software Sob Medida',
        desc:'Sistemas construídos pro seu negócio exato. Sem limitação de template, sem gambiarra de plugin. Só o que você precisa, funcionando.',
        statNum:'100%', statLabel:'personalizado'
      },
      {
        n:'02', icon:'grid',
        title:'Sites & Sistemas Web',
        desc:'Performance, SEO e design que prende. Não é só bonito: é uma máquina de capturar e converter clientes reais — todo dia.',
        statNum:'3×', statLabel:'mais leads'
      },
      {
        n:'03', icon:'hex',
        title:'Design de Marca',
        desc:'Do logo à identidade completa — posts, apresentações, tudo com coerência visual que vende antes mesmo de você falar.',
        statNum:'∞', statLabel:'impacto'
      },
    ]
  },
  {
    eyebrow: 'resultados reais',
    titleLines: ['PROVA', 'QUE FUNCIONA'],
    cards: [
      {
        n:'01', icon:'star',
        title:'50+ Projetos Entregues',
        desc:'Startups, PMEs e profissionais liberais — cada entrega com cliente satisfeito. Nosso portfólio é a nossa maior prova social.',
        statNum:'50+', statLabel:'projetos'
      },
      {
        n:'02', icon:'loop',
        title:'Clientes que Voltam',
        desc:'Mais de 80% dos nossos clientes voltam para novos projetos. Relacionamento não acaba na entrega — começa nela.',
        statNum:'80%', statLabel:'retenção'
      },
      {
        n:'03', icon:'check',
        title:'Zero Retrabalho',
        desc:'Código limpo, documentado e escalável. Sua empresa cresce e o sistema acompanha — sem precisar refazer tudo mais tarde.',
        statNum:'0', statLabel:'lock-in'
      },
    ]
  },
  {
    eyebrow: 'nosso diferencial',
    titleLines: ['POR QUE', 'BEYOND?'],
    cards: [
      {
        n:'01', icon:'bolt',
        title:'Criatividade como Arma',
        desc:'Enquanto outros entregam o óbvio, a gente pensa diferente. Sua marca vai parecer maior do que é — e isso converte muito mais.',
        statNum:'#1', statLabel:'diferencial'
      },
      {
        n:'02', icon:'layers',
        title:'Estratégia + Execução',
        desc:'Não somos só executores. Questionamos, sugerimos e entregamos o que vai realmente funcionar para o seu mercado e seus objetivos.',
        statNum:'full', statLabel:'stack'
      },
      {
        n:'03', icon:'link',
        title:'Parceria Real',
        desc:'Você fala direto com quem desenvolve. Sem intermediários, sem caixa preta. Comunicação clara do briefing à entrega final.',
        statNum:'1:1', statLabel:'acesso direto'
      },
    ]
  },
  {
    eyebrow: 'comece agora',
    titleLines: ['SEU PROJETO', 'COMEÇA AQUI'],
    cards: [
      {
        n:'01', icon:'gift',
        title:'Briefing Gratuito',
        desc:'Antes de qualquer proposta, a gente entende de verdade o que você precisa. Sem custo, sem compromisso, sem enrolação.',
        statNum:'free', statLabel:'sem custo'
      },
      {
        n:'02', icon:'clock',
        title:'Resposta em 24h',
        desc:'Nada de esperar semanas. Você recebe uma proposta detalhada e personalizada em até 24 horas úteis — garantido.',
        statNum:'<24h', statLabel:'orçamento'
      },
      {
        n:'03', icon:'shield',
        title:'Vagas Limitadas',
        desc:'Trabalhamos com poucos clientes por mês para garantir qualidade e atenção total. Reserve sua vaga antes que feche.',
        statNum:'≤5', statLabel:'clientes/mês'
      },
    ]
  },
];

/* ── Slider state (module-level so buttons + sphere can access) ── */
let currentSlide   = 0;
let isAnimating    = false;
let slideRotAccum  = 0;   // accumulated sphere Y rotation for slide trigger
let prevSphereY    = 0;   // sphere Y on last frame
let lastSlideChange = 0;  // timestamp of last slide change

const SLIDE_THRESHOLD = 1.5;  // radians of sphere rotation to trigger a slide
const SLIDE_COOLDOWN  = 900;  // ms between slide changes

function renderSlide(index, dir) {
  if (isAnimating) return;
  isAnimating = true;

  const data    = SLIDE_DATA[index];
  const fc      = document.querySelector('.floating-cards');
  const header  = document.querySelector('.benefits-header');
  const cardEls = document.querySelectorAll('.card-3d');
  const dots    = document.querySelectorAll('.slider-dot');

  /* Update dots */
  dots.forEach((d, i) => d.classList.toggle('active', i === index));

  /* ── Fade OUT ── */
  const outX = dir > 0 ? '-44px' : '44px';
  fc.style.transition     = 'opacity 0.3s ease, transform 0.3s ease';
  fc.style.opacity        = '0';
  fc.style.transform      = `translateX(${outX})`;
  header.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
  header.style.opacity    = '0';
  header.style.transform  = 'translateY(-10px)';

  setTimeout(() => {
    /* ── Update content ── */
    document.querySelector('.benefits-eyebrow').innerHTML =
      `<span class="line-accent"></span> ${data.eyebrow}`;
    document.querySelector('.benefits-title').innerHTML =
      data.titleLines.join('<br>');

    cardEls.forEach((card, i) => {
      const c = data.cards[i];
      card.querySelector('.card-index').textContent        = c.n;
      card.querySelector('.card-icon svg').innerHTML       = ICONS[c.icon];
      card.querySelector('.card-title').textContent        = c.title;
      card.querySelector('.card-desc').textContent         = c.desc;
      card.querySelector('.card-stat-num').textContent     = c.statNum;
      card.querySelector('.card-stat-label').textContent   = c.statLabel;
    });

    /* ── Set entry start position (opposite side) ── */
    const inX = dir > 0 ? '44px' : '-44px';
    fc.style.transition     = 'none';
    fc.style.transform      = `translateX(${inX})`;
    header.style.transition = 'none';
    header.style.transform  = 'translateY(10px)';

    /* ── Fade IN (double rAF ensures paint happened) ── */
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        fc.style.transition     = 'opacity 0.52s cubic-bezier(0.16,1,0.3,1), transform 0.52s cubic-bezier(0.16,1,0.3,1)';
        fc.style.opacity        = '1';
        fc.style.transform      = 'translateX(0)';
        header.style.transition = 'opacity 0.48s ease, transform 0.48s ease';
        header.style.opacity    = '1';
        header.style.transform  = 'translateY(0)';
        setTimeout(() => { isAnimating = false; }, 540);
      });
    });
  }, 320);
}

function goToSlide(n, dir) {
  const total = SLIDE_DATA.length;
  const next  = ((n % total) + total) % total;
  if (next === currentSlide || isAnimating) return;
  currentSlide = next;
  renderSlide(next, dir != null ? dir : 1);
}

/* ══════════════════════════════════════════════════════
   ★ THREE.JS — ESFERA 3D INTERATIVA + CARD CONTROL ★
══════════════════════════════════════════════════════ */

function initSphere() {
  const container = document.getElementById('sphereWrapper');
  const canvas    = document.getElementById('sphereCanvas');
  if (!container || !canvas || typeof THREE === 'undefined') return;

  const W = 420, H = 420;
  const dpr = Math.min(window.devicePixelRatio, 2);

  // ── Scene ──
  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(W, H);
  renderer.setPixelRatio(dpr);
  renderer.setClearColor(0x000000, 0);

  // ── Colors ──
  const COPPER_L = 0xb87333;
  const COPPER_D = 0xd4944a;
  function copperHex() { return isDark ? COPPER_D : COPPER_L; }
  function fgHex()     { return isDark ? 0xe8e8e6 : 0x0a0a0a; }

  // ── Icosahedron wireframe (outer cage) ──
  const icoGeo = new THREE.IcosahedronGeometry(1.6, 1);
  const icoMat = new THREE.MeshBasicMaterial({
    color: copperHex(), wireframe: true, transparent: true, opacity: 0.15
  });
  const icoMesh = new THREE.Mesh(icoGeo, icoMat);
  scene.add(icoMesh);

  // ── Inner sphere (glowing core) ──
  const coreGeo = new THREE.SphereGeometry(1.05, 32, 32);
  const coreMat = new THREE.MeshPhongMaterial({
    color: copperHex(), emissive: copperHex(), emissiveIntensity: 0.15,
    transparent: true, opacity: 0.08, shininess: 100,
  });
  const coreMesh = new THREE.Mesh(coreGeo, coreMat);
  scene.add(coreMesh);

  // ── Second wireframe (inner, denser) ──
  const innerWireGeo = new THREE.IcosahedronGeometry(1.1, 2);
  const innerWireMat = new THREE.MeshBasicMaterial({
    color: fgHex(), wireframe: true, transparent: true, opacity: 0.04
  });
  const innerWire = new THREE.Mesh(innerWireGeo, innerWireMat);
  scene.add(innerWire);

  // ── Particle nodes on icosahedron vertices ──
  const nodePositions  = icoGeo.attributes.position;
  const nodeGroup      = new THREE.Group();
  const nodeDots       = [];
  const usedPositions  = new Set();

  for (let i = 0; i < nodePositions.count; i++) {
    const x = nodePositions.getX(i);
    const y = nodePositions.getY(i);
    const z = nodePositions.getZ(i);
    const key = `${x.toFixed(2)},${y.toFixed(2)},${z.toFixed(2)}`;
    if (usedPositions.has(key)) continue;
    usedPositions.add(key);

    const dotGeo = new THREE.SphereGeometry(0.035, 8, 8);
    const dotMat = new THREE.MeshBasicMaterial({ color: copperHex() });
    const dot    = new THREE.Mesh(dotGeo, dotMat);
    dot.position.set(x, y, z);
    nodeGroup.add(dot);
    nodeDots.push({ mesh: dot, base: new THREE.Vector3(x, y, z), mat: dotMat });
  }
  scene.add(nodeGroup);

  // ── Floating orbital particles ──
  const orbitalCount = 60;
  const orbitalGeo   = new THREE.BufferGeometry();
  const orbPositions = new Float32Array(orbitalCount * 3);
  const orbData      = [];

  for (let i = 0; i < orbitalCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi   = Math.acos(2 * Math.random() - 1);
    const r     = 1.8 + Math.random() * 0.6;
    orbPositions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
    orbPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    orbPositions[i * 3 + 2] = r * Math.cos(phi);
    orbData.push({ r, theta, phi, speed: 0.1 + Math.random() * 0.3 });
  }

  orbitalGeo.setAttribute('position', new THREE.BufferAttribute(orbPositions, 3));
  const orbMat = new THREE.PointsMaterial({
    color: copperHex(), size: 0.025, transparent: true, opacity: 0.5, sizeAttenuation: true
  });
  const orbitalPoints = new THREE.Points(orbitalGeo, orbMat);
  scene.add(orbitalPoints);

  // ── Ring accents ──
  const ringGeo = new THREE.RingGeometry(1.75, 1.78, 64);
  const ringMat = new THREE.MeshBasicMaterial({
    color: copperHex(), transparent: true, opacity: 0.1, side: THREE.DoubleSide
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 2;
  scene.add(ring);

  const ring2 = new THREE.Mesh(ringGeo.clone(), ringMat.clone());
  ring2.rotation.x = Math.PI * 0.35;
  ring2.rotation.z = Math.PI * 0.25;
  ring2.material.opacity = 0.06;
  scene.add(ring2);

  // ── Lights ──
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(copperHex(), 1.5, 15);
  pointLight.position.set(3, 3, 5);
  scene.add(pointLight);
  const pointLight2 = new THREE.PointLight(copperHex(), 0.5, 10);
  pointLight2.position.set(-3, -2, 3);
  scene.add(pointLight2);

  // ── Theme update ──
  window.updateSphereColors = function() {
    const c = copperHex();
    const f = fgHex();
    icoMat.color.setHex(c);
    coreMat.color.setHex(c);
    coreMat.emissive.setHex(c);
    innerWireMat.color.setHex(f);
    orbMat.color.setHex(c);
    ringMat.color.setHex(c);
    ring2.material.color.setHex(c);
    pointLight.color.setHex(c);
    pointLight2.color.setHex(c);
    nodeDots.forEach(n => n.mat.color.setHex(c));
  };

  // ══════════════════════════════
  //  MOUSE / TOUCH DRAG
  // ══════════════════════════════
  let dragging   = false;
  let prevMouse  = { x: 0, y: 0 };
  const sphereRot     = { x: 0, y: 0 };
  const sphereVel     = { x: 0, y: 0 };
  const cardInfluence = { x: 0, y: 0 };

  const hint = container.querySelector('.sphere-hint');

  container.addEventListener('mousedown', (e) => {
    dragging = true;
    prevMouse.x = e.clientX;
    prevMouse.y = e.clientY;
    if (hint) hint.classList.add('hidden');
  });
  window.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    const dx = e.clientX - prevMouse.x;
    const dy = e.clientY - prevMouse.y;
    sphereVel.x = dy * 0.008;
    sphereVel.y = dx * 0.008;
    sphereRot.x += sphereVel.x;
    sphereRot.y += sphereVel.y;
    prevMouse.x = e.clientX;
    prevMouse.y = e.clientY;
  });
  window.addEventListener('mouseup', () => { dragging = false; });

  container.addEventListener('touchstart', (e) => {
    dragging = true;
    prevMouse.x = e.touches[0].clientX;
    prevMouse.y = e.touches[0].clientY;
    if (hint) hint.classList.add('hidden');
  }, { passive: true });
  window.addEventListener('touchmove', (e) => {
    if (!dragging) return;
    const dx = e.touches[0].clientX - prevMouse.x;
    const dy = e.touches[0].clientY - prevMouse.y;
    sphereVel.x = dy * 0.008;
    sphereVel.y = dx * 0.008;
    sphereRot.x += sphereVel.x;
    sphereRot.y += sphereVel.y;
    prevMouse.x = e.touches[0].clientX;
    prevMouse.y = e.touches[0].clientY;
  }, { passive: true });
  window.addEventListener('touchend', () => { dragging = false; });

  // ══════════════════════════════
  //  CARD HOVER TILT
  // ══════════════════════════════
  const cards          = document.querySelectorAll('.card-3d');
  const cardBaseOffsets = [-1, 0, 1];

  cards.forEach(card => {
    const inner = card.querySelector('.card-3d-inner');
    if (!inner) return;
    card.addEventListener('mousemove', (e) => {
      const r  = card.getBoundingClientRect();
      const rx = ((e.clientY - r.top  - r.height/2) / (r.height/2)) * -8;
      const ry = ((e.clientX - r.left - r.width /2) / (r.width /2)) *  8;
      inner.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.03,1.03,1.03)`;
      const gx = ((e.clientX - r.left) / r.width)  * 100;
      const gy = ((e.clientY - r.top)  / r.height) * 100;
      inner.style.background = isDark
        ? `radial-gradient(circle at ${gx}% ${gy}%, rgba(212,148,74,0.07), rgba(28,28,32,0.7) 60%)`
        : `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.15), rgba(232,232,230,0.6) 60%)`;
    });
    card.addEventListener('mouseleave', () => {
      inner.style.transform  = '';
      inner.style.background = '';
    });
  });

  // ══════════════════════════════
  //  RENDER LOOP
  // ══════════════════════════════
  const clock = new THREE.Clock();
  sphereReady = true;

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // ── Momentum decay ──
    if (!dragging) {
      sphereVel.x *= 0.95;
      sphereVel.y *= 0.95;
      sphereRot.x += sphereVel.x;
      sphereRot.y += sphereVel.y;
    }

    // ── Idle auto-rotation ──
    const idleX = Math.sin(t * 0.2) * 0.003;
    const isIdle = !dragging && Math.abs(sphereVel.x) < 0.001 && Math.abs(sphereVel.y) < 0.001;
    if (isIdle) {
      sphereRot.x += idleX;
      sphereRot.y += 0.003;
    }

    // ── Apply to meshes ──
    const targetQuat = new THREE.Quaternion();
    const euler      = new THREE.Euler(sphereRot.x, sphereRot.y, 0, 'XYZ');
    targetQuat.setFromEuler(euler);

    icoMesh.quaternion.copy(targetQuat);
    coreMesh.quaternion.copy(targetQuat);
    innerWire.quaternion.slerp(targetQuat, 0.6);
    nodeGroup.quaternion.copy(targetQuat);

    ring.rotation.z  = t * 0.15;
    ring2.rotation.y = t * 0.1;

    // ── Orbital particles ──
    const orbPos = orbitalPoints.geometry.attributes.position;
    for (let i = 0; i < orbitalCount; i++) {
      const d = orbData[i];
      d.theta += d.speed * 0.008;
      orbPos.setXYZ(i,
        d.r * Math.sin(d.phi) * Math.cos(d.theta),
        d.r * Math.sin(d.phi) * Math.sin(d.theta),
        d.r * Math.cos(d.phi)
      );
    }
    orbPos.needsUpdate = true;
    orbitalPoints.quaternion.slerp(targetQuat, 0.3);

    // ── Node pulsing ──
    nodeDots.forEach((n, i) => {
      const pulse = 0.7 + Math.sin(t * 2 + i * 0.5) * 0.3;
      n.mat.opacity = pulse;
      n.mesh.scale.setScalar(0.8 + Math.sin(t * 1.5 + i) * 0.3);
    });

    // ── Core glow pulse ──
    coreMat.emissiveIntensity = 0.1 + Math.sin(t * 1.2) * 0.08;
    coreMat.opacity           = 0.06 + Math.sin(t * 0.8) * 0.03;

    // ══ CARD MANIPULATION from sphere ══
    const lerpSpeed = 0.06;
    cardInfluence.x += (sphereRot.x - cardInfluence.x) * lerpSpeed;
    cardInfluence.y += (sphereRot.y - cardInfluence.y) * lerpSpeed;

    const maxTilt = 18, maxShift = 30, maxSpread = 40, maxLift = 20;
    const infX = Math.sin(cardInfluence.x * 0.5);
    const infY = Math.sin(cardInfluence.y * 0.5);

    cards.forEach((card, i) => {
      const idleFloat = Math.sin(t * 1.2 + i * 1.8) * 8;
      const tiltX     = infX * maxTilt * 0.4;
      const tiltY     = infY * maxTilt * cardBaseOffsets[i] * 0.6;
      const shiftY    = infX * maxShift + idleFloat;
      const spreadX   = infY * maxSpread * cardBaseOffsets[i];
      const liftZ     = Math.abs(infY) * maxLift * (i === 1 ? 1.2 : 0.8);
      card.style.transform =
        `translateX(${spreadX}px) translateY(${shiftY - liftZ}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });

    // ══ SLIDE NAVIGATION via sphere Y rotation ══
    // Only accumulate when the user is actively dragging or coasting (not idle auto-rotation)
    const deltaY = sphereRot.y - prevSphereY;
    prevSphereY  = sphereRot.y;

    if (!isIdle) {
      slideRotAccum += deltaY;
      // Decay accumulator gradually so small wobbles don't accumulate
      if (!dragging) slideRotAccum *= 0.97;

      if (Math.abs(slideRotAccum) > SLIDE_THRESHOLD && Date.now() - lastSlideChange > SLIDE_COOLDOWN) {
        const dir       = slideRotAccum > 0 ? 1 : -1;
        slideRotAccum   = 0;
        lastSlideChange = Date.now();
        goToSlide(currentSlide + dir, dir);
      }
    } else {
      // Slowly decay during idle so accumulated drift doesn't fire unexpectedly
      slideRotAccum *= 0.92;
    }

    renderer.render(scene, camera);
  }

  animate();
}

if (typeof THREE !== 'undefined') {
  initSphere();
} else {
  window.addEventListener('load', initSphere);
}

/* ── IntersectionObserver ── */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
      if (e.target.classList.contains('benefits-section')) {
        setTimeout(() => {
          document.querySelectorAll('.card-3d').forEach(c => c.classList.add('js-controlled'));
        }, 1200);
      }
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.stat-item, .benefits-section').forEach((el, i) => {
  el.style.transitionDelay = (i * 0.08) + 's';
  io.observe(el);
});

/* ══ SLIDER BUTTON EVENT LISTENERS ══ */
const prevBtn = document.getElementById('slidePrev');
const nextBtn = document.getElementById('slideNext');

if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    slideRotAccum = 0; // reset so sphere drag doesn't double-fire
    goToSlide(currentSlide - 1, -1);
  });
}
if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    slideRotAccum = 0;
    goToSlide(currentSlide + 1, 1);
  });
}

document.querySelectorAll('.slider-dot').forEach(dot => {
  dot.addEventListener('click', () => {
    const target = parseInt(dot.dataset.slide);
    const dir    = target > currentSlide ? 1 : -1;
    slideRotAccum = 0;
    goToSlide(target, dir);
  });
});
