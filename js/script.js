/* ── PROGRESS BAR ── */
const progressBar = document.getElementById('progressBar');
window.addEventListener('scroll', () => {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (window.scrollY / total * 100) + '%';
}, { passive: true });

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

;(function() {
  const physicalW = window.innerWidth * (window.devicePixelRatio || 1);
  window.__bbSfx  = physicalW <= 1600 ? 'mobile' : 'desktop';
})();

// Imagens do hero: sempre as diurnas (assets/1 e assets/2)
const DAY_IMAGES = {
  open:   `assets/1-${window.__bbSfx}.webp`,
  closed: `assets/2-${window.__bbSfx}.webp`,
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
const BLINK_MS    = 280;
const DARK_HOLD_MS = 400;
function blink() {
  if (!img1 || !img2) return;
  img2.style.transition = `opacity ${BLINK_MS * 0.4}ms cubic-bezier(0.4,0,0.2,1)`;
  img1.style.transition = `opacity ${BLINK_MS * 0.4}ms cubic-bezier(0.4,0,0.2,1)`;
  img2.style.opacity = '1'; img1.style.opacity = '0';
  const hold = BLINK_MS * 0.45 + DARK_HOLD_MS;
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
const heroTitle   = document.getElementById('heroTitle');
const pCtx        = pixelCanvas ? pixelCanvas.getContext('2d') : null;
const PIXEL_SIZE = 3, SAMPLE_STEP = 3, ANIM_DURATION = 1800, ANIM_DELAY = 600, SCATTER_RANGE = 1.8;
function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }
function getTextColor() { return '#e8e8e6'; } // sempre claro (dark mode fixo)
function getFontSize() {
  const min = window.innerWidth <= 600 ? 56 : 110;
  return Math.min(Math.max(min, window.innerWidth * 0.18), 260);
}

function runPixelAnimation() {
  if (!pixelCanvas || !pCtx) return;
  const fs = getFontSize(), lh = fs * 0.88;
  const cW = Math.ceil(fs * 5.5), cH = Math.ceil(lh * 2.15);
  const dpr = window.devicePixelRatio || 1;
  pixelCanvas.width  = cW * dpr; pixelCanvas.height = cH * dpr;
  pixelCanvas.style.width  = cW + 'px'; pixelCanvas.style.height = cH + 'px';
  pCtx.scale(dpr, dpr);

  const off  = document.createElement('canvas');
  off.width  = cW; off.height = cH;
  const oCtx = off.getContext('2d');
  oCtx.font        = `400 ${fs}px 'Bebas Neue', cursive`;
  oCtx.fillStyle   = '#000'; oCtx.textBaseline = 'top';
  oCtx.fillText('BEYOND', 0, 0);
  oCtx.fillText('BITS',   0, lh);

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
  document.fonts.load("400 100px 'Bebas Neue'").then(runPixelAnimation).catch(runPixelAnimation);
});

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

  const loader = new THREE.TextureLoader();
  loader.crossOrigin = 'anonymous';

  // Versão fixa: a URL sem versão redireciona e a resposta perde o cabeçalho CORS
  const TEX = 'https://unpkg.com/three-globe@2.45.6/example/img/';
  const earthMat = new THREE.MeshPhongMaterial({
    map:         loader.load(TEX + 'earth-night.jpg'),
    bumpMap:     loader.load(TEX + 'earth-topology.png'),
    bumpScale:   0.05,
    specularMap: loader.load(TEX + 'earth-water.png'),
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

  ;(function animateEarth() {
    requestAnimationFrame(animateEarth);
    earthGlobeMesh.rotation.y += 0.0015;
    earthGlobeRenderer.render(scene, camera);
  })();
}

const earthObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      initEarthGlobe();
      earthObserver.disconnect();
    }
  });
}, { threshold: 0.05 });
const benefitsSec = document.querySelector('.benefits-section');
if (benefitsSec) earthObserver.observe(benefitsSec);

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
