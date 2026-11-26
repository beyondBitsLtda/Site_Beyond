// Grava UMA cena 3D do site em vídeo (H.264/MP4) em loop sem emenda (use o gravar.mjs, que chama este para cada cena).
// Uso: node gravar-uma.mjs <config.json>
//   config: { url, saida, largura, altura, dpr, alvo (elemento de referência do recorte),
//             camadas: [ seletor | { sel, alfa } ] (canvas desenhados em ordem; padrão: o próprio alvo),
//             recorte {x,y,w,h} ou recorteJs (px CSS, relativo ao alvo; padrão: o alvo inteiro),
//             escala (px do vídeo por px CSS; padrão: dpr), fundo ('#000'), fundoJs (pinta por baixo das camadas),
//             periodo (s), fps (30), sub (passos por quadro), fundir (s), aquecer (s), qp, bitrate, esperaCarga (ms),
//             antes (js antes de congelar), rolarPara (seletor), hw (codificador da placa: true), reduzido (true: prefers-reduced-motion),
//             mascara (true: grava também o alfa do canvas, com o quadrilátero quadJs opaco), mascaraSel, quadJs, mascaraEscala, porta }
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const cfg = JSON.parse(readFileSync(process.argv[2], 'utf8'));
const C = Object.assign({ fps: 30, sub: 2, fundir: 1, aquecer: 2, fundo: '#000', dpr: 1, qp: 30, esperaCarga: 9000, porta: 9671, hw: true }, cfg);
const edge = ['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Microsoft/Edge/Application/msedge.exe'].find(existsSync);
const prof = join(tmpdir(), 'gravar-cenas-' + Date.now()); mkdirSync(prof, { recursive: true });
const proc = spawn(edge, ['--headless=new', '--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist',
  `--remote-debugging-port=${C.porta}`, `--user-data-dir=${prof}`, '--no-first-run', 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
for (let i = 0; i < 80; i++) { try { await fetch(`http://127.0.0.1:${C.porta}/json/version`); break; } catch { await sleep(200); } }

const tgt = await (await fetch(`http://127.0.0.1:${C.porta}/json/new?about:blank`, { method: 'PUT' })).json();
const ws = new WebSocket(tgt.webSocketDebuggerUrl);
await new Promise(r => ws.addEventListener('open', r, { once: true }));
let id = 0; const pend = new Map(); const logs = [];
ws.addEventListener('message', ev => {
  const m = JSON.parse(ev.data);
  if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); }
  if (m.method === 'Runtime.exceptionThrown') logs.push('EXC ' + (m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text).slice(0, 300));
  if (m.method === 'Runtime.consoleAPICalled' && (m.params.type === 'error' || m.params.type === 'warning')) logs.push(m.params.type + ' ' + (m.params.args || []).map(a => a.value || a.description).join(' ').slice(0, 300));
});
const send = (method, params = {}, limite = 120000) => new Promise((r, falha) => {
  const i = ++id;
  const t = setTimeout(() => { pend.delete(i); falha(new Error('sem resposta em ' + limite + ' ms: ' + method)); }, limite);
  pend.set(i, m => { clearTimeout(t); r(m); });
  ws.send(JSON.stringify({ id: i, method, params }));
});
const ev = async (e) => {
  const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true });
  if (r.result?.exceptionDetails) throw new Error(r.result.exceptionDetails.exception?.description || r.result.exceptionDetails.text);
  return r.result?.result?.value;
};
const chamar = async (fn, ...args) => {
  const r = await send('Runtime.evaluate', { expression: 'globalThis', returnByValue: false });
  const o = await send('Runtime.callFunctionOn', { functionDeclaration: fn.toString(), objectId: r.result.result.objectId, arguments: args.map(v => ({ value: v })), returnByValue: true, awaitPromise: true });
  if (o.result?.exceptionDetails) throw new Error(o.result.exceptionDetails.exception?.description || o.result.exceptionDetails.text);
  return o.result?.result?.value;
};

/* ── relógio virtual: o tempo da página só anda quando o gravador manda ── */
const RELOGIO = `(function () {
  var realNow = performance.now.bind(performance), realDate = Date.now;
  var realRaf = window.requestAnimationFrame.bind(window), realCaf = window.cancelAnimationFrame.bind(window);
  var V = { ativo: false, agora: 0, fila: [], seq: 1, epoca: 0, anims: new Map() };
  performance.now = function () { return V.ativo ? V.agora : realNow(); };
  Date.now = function () { return V.ativo ? Math.round(V.epoca + V.agora) : realDate(); };
  window.requestAnimationFrame = function (cb) { if (!V.ativo) return realRaf(cb); var id = -(V.seq++); V.fila.push({ id: id, cb: cb }); return id; };
  window.cancelAnimationFrame = function (id) { if (id < 0) { V.fila = V.fila.filter(function (i) { return i.id !== id; }); return; } realCaf(id); };
  function animacoes() {
    document.getAnimations().forEach(function (a) {
      if (!V.anims.has(a)) { try { a.pause(); } catch (e) {} V.anims.set(a, { base: a.currentTime || 0, v: V.agora }); }
      var s = V.anims.get(a); try { a.currentTime = s.base + (V.agora - s.v); } catch (e) {}
    });
  }
  window.__relogio = {
    congelar: function () { V.agora = realNow(); V.epoca = realDate() - V.agora; V.ativo = true; animacoes(); },
    avancar: function (ms) {
      V.agora += ms;
      var f = V.fila; V.fila = [];
      for (var i = 0; i < f.length; i++) { try { f[i].cb(V.agora); } catch (e) { console.error(e && e.stack || e); } }
      animacoes();
    }
  };
})();`;

await send('Page.enable'); await send('Runtime.enable'); await send('Network.enable');
await send('Network.setCacheDisabled', { cacheDisabled: true });
await send('Emulation.setFocusEmulationEnabled', { enabled: true });
const movel = C.largura < 700;
await send('Emulation.setDeviceMetricsOverride', { width: C.largura, height: C.altura, deviceScaleFactor: C.dpr, mobile: movel });
if (movel) {
  await send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
  await send('Network.setUserAgentOverride', { userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36' });
}
if (C.reduzido) await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
await send('Page.addScriptToEvaluateOnNewDocument', { source: RELOGIO });
await send('Page.navigate', { url: C.url });
await sleep(2500);
await ev(`(function(){ var s = document.createElement('style'); s.textContent = 'html{scrollbar-width:none!important}'; document.head.appendChild(s); return 1; })()`);
const centralizar = `(function(){ var el = document.querySelector(${JSON.stringify(C.rolarPara || C.alvo)}); el.scrollIntoView({ block: 'center' }); return 1; })()`;
// espera a página montar o elemento (com o servidor ocupado, pode demorar)
for (let i = 0; i < 60; i++) { if (await ev(`!!document.querySelector(${JSON.stringify(C.rolarPara || C.alvo)})`)) break; await sleep(500); }
await ev(centralizar);
await sleep(C.esperaCarga);
await ev(centralizar);
if (C.antes) await ev(C.antes);
await sleep(500);
await ev('__relogio.congelar()');

const passo = 1000 / C.fps / C.sub;
async function avancarQuadro() { for (let k = 0; k < C.sub; k++) await ev(`__relogio.avancar(${passo})`); }
{ const ta = Date.now(); const n = Math.round(C.aquecer * C.fps); for (let i = 0; i < n; i++) await avancarQuadro(); console.log('aquecimento:', n, 'quadros em', Date.now() - ta, 'ms'); }

/* ── o gravador, dentro da página ── */
await ev(`new Promise(function (ok, erro) { var s = document.createElement('script'); s.src = 'https://cdn.jsdelivr.net/npm/mp4-muxer@5.1.3/build/mp4-muxer.js'; s.onload = ok; s.onerror = erro; document.head.appendChild(s); })`);
if (C.alfa) await ev(`(async function () {
  // a webm-muxer marca o arquivo como transparente, mas não grava o alfa de cada quadro: dois ajustes na hora
  // (o alfa vai em BlockAdditions, e os quadros que não são chave ganham um ReferenceBlock)
  var cod = await (await fetch('https://cdn.jsdelivr.net/npm/webm-muxer@5.0.3/build/webm-muxer.js')).text();
  var a = 'createInternalChunk_fn).call(this, data, type, timestamp, VIDEO_TRACK_NUMBER);';
  var b = 'chunk.additions ? { id: 30113 /* BlockAdditions */, data: chunk.additions } : null';
  if (cod.indexOf(a) < 0 || cod.indexOf(b) < 0) throw new Error('a webm-muxer mudou: confira os ajustes do alfa');
  cod = cod.replace(a, 'createInternalChunk_fn).call(this, data, type, timestamp, VIDEO_TRACK_NUMBER, void 0, meta && meta.adicoes);')
           .replace(b, 'chunk.additions ? { id: 30113, data: chunk.additions } : null, chunk.type === "delta" ? { id: 251, data: new Uint8Array([255, 255]) } : null');
  var s = document.createElement('script'); s.textContent = cod; document.head.appendChild(s);
  return 1;
})()`);
const L = Math.round(C.periodo * C.fps), F = Math.round(C.fundir * C.fps), N = L + F;
const info = await chamar(async function (C, L, F) {
  const g = globalThis.__grav = {};
  const alvo = document.querySelector(C.alvo);
  const ra = alvo.getBoundingClientRect();
  const rec = C.recorteJs ? (0, eval)(C.recorteJs) : (C.recorte || { x: 0, y: 0, w: ra.width, h: ra.height });
  const esc = C.escala || C.dpr;
  const W = Math.round(rec.w * esc / 2) * 2, H = Math.round(rec.h * esc / 2) * 2;
  g.rec = rec; g.esc = esc; g.alvoSel = C.alvo; g.W = W; g.H = H; g.L = L; g.F = F; g.cab = []; g.erro = null; g.fps = C.fps;
  g.camadas = (C.camadas || [C.alvo]).map(c => typeof c === 'string' ? { sel: c } : c);
  g.tela = new OffscreenCanvas(W, H); g.ctx = g.tela.getContext('2d', { willReadFrequently: true });   // o quadro sobre o fundo (MP4)
  // RGB → YUV 4:2:0, feito aqui (a conversão automática do navegador errava a faixa: pretos esmagados no MP4, lavados no WebM).
  // MP4 (H.264): BT.601 em faixa de vídeo, o que o tocador assume sem o espaço de cor no arquivo; WebM (VP9): BT.709 em faixa cheia.
  g.paraYUV = function (px, cheia) {
    const n = W * H, out = new Uint8Array(n * 3 / 2), Uo = n, Vo = n + n / 4, w2 = W / 2;
    const kr = cheia ? 0.2126 : 0.299, kb = cheia ? 0.0722 : 0.114, kg = 1 - kr - kb;
    const sy = cheia ? 1 : 219 / 255, oy = cheia ? 0 : 16, sc = cheia ? 1 : 224 / 255;
    const cbR = -kr / (2 * (1 - kb)) * sc, cbG = -kg / (2 * (1 - kb)) * sc, cbB = 0.5 * sc;
    const crR = 0.5 * sc, crG = -kg / (2 * (1 - kr)) * sc, crB = -kb / (2 * (1 - kr)) * sc;
    for (let p = 0, k = 0; p < n; p++, k += 4) out[p] = oy + (kr * px[k] + kg * px[k + 1] + kb * px[k + 2]) * sy;
    for (let y = 0; y < H; y += 2) for (let x = 0; x < W; x += 2) {
      const k0 = (y * W + x) * 4, k1 = k0 + W * 4;
      const r = (px[k0] + px[k0 + 4] + px[k1] + px[k1 + 4]) / 4, g2 = (px[k0 + 1] + px[k0 + 5] + px[k1 + 1] + px[k1 + 5]) / 4, b = (px[k0 + 2] + px[k0 + 6] + px[k1 + 2] + px[k1 + 6]) / 4;
      const c = (y / 2) * w2 + x / 2;
      out[Uo + c] = 128 + cbR * r + cbG * g2 + cbB * b; out[Vo + c] = 128 + crR * r + crG * g2 + crB * b;
    }
    return out;
  };
  g.espaco601 = { primaries: 'smpte170m', transfer: 'smpte170m', matrix: 'smpte170m', fullRange: false };
  g.espaco709 = { primaries: 'bt709', transfer: 'bt709', matrix: 'bt709', fullRange: true };
  g.telaA = new OffscreenCanvas(W, H); g.ctxA = g.telaA.getContext('2d', { willReadFrequently: true });   // sobre transparente
  g.tmp = new OffscreenCanvas(W, H); g.ctxT = g.tmp.getContext('2d');
  g.fundo = C.fundo;
  g.pintarFundo = C.fundoJs ? (0, eval)(C.fundoJs) : null;
  g.muxer = new Mp4Muxer.Muxer({ target: new Mp4Muxer.ArrayBufferTarget(), video: { codec: 'avc', width: W, height: H, frameRate: C.fps }, fastStart: 'in-memory' });
  const base = { codec: 'avc1.640028', width: W, height: H, framerate: C.fps, avc: { format: 'avc' }, hardwareAcceleration: C.hw ? 'prefer-hardware' : 'prefer-software' };
  let config = Object.assign({}, base, { bitrateMode: 'quantizer' });
  const s = await VideoEncoder.isConfigSupported(config);
  g.qp = s.supported ? C.qp : null;
  if (!s.supported) config = Object.assign({}, base, { bitrate: C.bitrate || 2e6, bitrateMode: 'variable' });
  g.enc = new VideoEncoder({ output: (chunk, meta) => g.muxer.addVideoChunk(chunk, meta), error: e => { g.erro = String(e); } });
  g.enc.configure(config);
  // o vídeo transparente (WebM VP9): as cores e o alfa em dois fluxos, juntados no fim
  g.alfa = !!C.alfa; g.porLuz = !!C.alfaPorLuz;
  if (g.alfa) {
    g.cores = []; g.alfas = [];
    // VP9 por taxa-alvo (kbps): no modo de qualidade fixa, o VP9 do navegador gasta muito mais que o H.264 em cenas lentas
    g.kbps = C.kbps || 300; g.kbpsAlfa = C.kbpsAlfa || Math.round(g.kbps / 3);
    const cfgC = { codec: 'vp09.00.10.08', width: W, height: H, framerate: C.fps, bitrateMode: 'variable', bitrate: g.kbps * 1000 };
    const cfgA = Object.assign({}, cfgC, { bitrate: g.kbpsAlfa * 1000 });
    if (!(await VideoEncoder.isConfigSupported(cfgC)).supported) throw new Error('VP9 não suportado');
    g.bytesC = 0; g.bytesA = 0;
    g.encC = new VideoEncoder({ output: (c, m) => { g.cores.push({ c, m }); g.bytesC += c.byteLength; }, error: e => { g.erro = String(e); } });
    g.encA = new VideoEncoder({ output: (c) => { g.alfas.push(c); g.bytesA += c.byteLength; }, error: e => { g.erro = String(e); } });
    g.encC.configure(cfgC); g.encA.configure(cfgA);
  }
  // as camadas (canvas da cena, céu...) sobre transparente, na posição delas em relação ao alvo
  g.desenharA = function () {
    const a = document.querySelector(C.alvo).getBoundingClientRect();
    const x = g.ctxA;
    x.globalAlpha = 1; x.globalCompositeOperation = 'source-over';
    x.clearRect(0, 0, W, H);
    if (g.pintarFundo) { x.save(); g.pintarFundo(x, a, rec, esc); x.restore(); x.globalAlpha = 1; }
    g.camadas.forEach(function (c) {
      const el = document.querySelector(c.sel);
      if (!el || !el.width || !el.height) return;
      const r = el.getBoundingClientRect();
      x.globalAlpha = c.alfa != null ? c.alfa : (parseFloat(getComputedStyle(el).opacity) || 0);
      if (x.globalAlpha <= 0) return;
      x.drawImage(el, (r.left - a.left - rec.x) * esc, (r.top - a.top - rec.y) * esc, r.width * esc, r.height * esc);
    });
    x.globalAlpha = 1;
  };
  g.compor = function () {
    const x = g.ctx;
    x.globalAlpha = 1; x.globalCompositeOperation = 'source-over';
    x.fillStyle = g.fundo; x.fillRect(0, 0, W, H); x.drawImage(g.telaA, 0, 0);
  };
  return { rec, W, H, modo: (s.supported ? 'quantizador ' + C.qp : 'bitrate ' + (C.bitrate || 2e6)) + (g.alfa ? ' + VP9 com alfa ' + g.kbps + '+' + g.kbpsAlfa + ' kbps' + (g.porLuz ? ' (alfa pelo brilho)' : '') : ''), camadas: g.camadas.map(c => c.sel + ':' + (document.querySelector(c.sel) ? 'ok' : 'FALTA')).join(' ') };
}, C, L, F);
console.log('recorte', JSON.stringify(info.rec)); console.log('vídeo', info.W + 'x' + info.H, '|', info.modo, '| camadas', info.camadas, '| quadros', N, '(loop', L, '+ fusão', F + ')');

const quadro = async function (i, sub, passo) {
  const g = globalThis.__grav, W = g.W, H = g.H;
  if (g.erro) return 'codificador: ' + g.erro;
  // o relógio anda e a cena é copiada na MESMA tarefa: um canvas WebGL comum é limpo depois de ir para a tela
  for (let k = 0; k < sub; k++) __relogio.avancar(passo);
  await null; await null;                          // a entrega do quadro ao canvas da cena é uma microtarefa (js/cenas.js)
  g.desenharA();
  if (i < g.F) {                                   // o começo fica guardado para a fusão do fim
    g.cab[i] = await createImageBitmap(g.telaA); return 'ok';
  }
  if (i >= g.L) {                                  // emenda: mistura com o começo (o fim termina exatamente no quadro F-1)
    const k = i - g.L, w = (k + 1) / g.F, t = g.ctxT;
    t.globalCompositeOperation = 'copy'; t.globalAlpha = 1 - w; t.drawImage(g.telaA, 0, 0);
    t.globalCompositeOperation = 'lighter'; t.globalAlpha = w; t.drawImage(g.cab[k], 0, 0);
    t.globalCompositeOperation = 'source-over'; t.globalAlpha = 1;
    g.ctxA.globalCompositeOperation = 'copy'; g.ctxA.drawImage(g.tmp, 0, 0); g.ctxA.globalCompositeOperation = 'source-over';
  }
  const j = i - g.F;                               // o quadro F vira o primeiro do vídeo
  const ts = Math.round(j * 1e6 / g.fps), du = Math.round(1e6 / g.fps), chave = j % (g.fps * 2) === 0;
  g.compor();
  if (j === 0) g.poster = await g.tela.convertToBlob({ type: 'image/webp', quality: 0.84 });
  const fr = new VideoFrame(g.paraYUV(g.ctx.getImageData(0, 0, W, H).data, false), { format: 'I420', codedWidth: W, codedHeight: H, timestamp: ts, duration: du, colorSpace: g.espaco601 });
  const op = { keyFrame: chave };
  if (g.qp != null) op.avc = { quantizer: g.qp };
  g.enc.encode(fr, op); fr.close();
  if (g.alfa) {
    const d = g.ctxA.getImageData(0, 0, W, H).data, n = W * H;
    const rgbx = new Uint8Array(n * 4), yuv = new Uint8Array(n * 3 / 2);
    for (let p = 0, k = 0; p < n; p++, k += 4) {
      let r = d[k], gg = d[k + 1], b = d[k + 2], a = d[k + 3];
      if (g.porLuz) {                              // cena de luz sobre o preto: o alfa vem do brilho (o "screen" ao contrário)
        const pr = r * a / 255, pg = gg * a / 255, pb = b * a / 255, m = Math.max(pr, pg, pb);
        a = m; if (m >= 12) { r = pr * 255 / m; gg = pg * 255 / m; b = pb * 255 / m; } else { r = pr; gg = pg; b = pb; }
      } else if (a < 12) {                         // quase transparente: a cor quase não aparece; escura, não vira ruído caro
        r = r * a / 255; gg = gg * a / 255; b = b * a / 255;
      }
      rgbx[k] = r; rgbx[k + 1] = gg; rgbx[k + 2] = b; rgbx[k + 3] = 255; yuv[p] = a;
    }
    yuv.fill(128, n);
    if (j === 0) {                                 // o primeiro quadro, transparente
      const id = new ImageData(W, H);
      for (let p = 0, k = 0; p < n; p++, k += 4) { id.data[k] = rgbx[k]; id.data[k + 1] = rgbx[k + 1]; id.data[k + 2] = rgbx[k + 2]; id.data[k + 3] = yuv[p]; }
      const pc = new OffscreenCanvas(W, H); pc.getContext('2d').putImageData(id, 0, 0);
      g.posterA = await pc.convertToBlob({ type: 'image/webp', quality: 0.84 });
    }
    const cor = g.paraYUV(rgbx, true);
    const fc = new VideoFrame(cor, { format: 'I420', codedWidth: W, codedHeight: H, timestamp: ts, duration: du, colorSpace: g.espaco709 });
    const fa = new VideoFrame(yuv, { format: 'I420', codedWidth: W, codedHeight: H, timestamp: ts, duration: du });
    const op9 = { keyFrame: chave };
    g.encC.encode(fc, op9); g.encA.encode(fa, op9); fc.close(); fa.close();
    while (g.encC.encodeQueueSize > 4 || g.encA.encodeQueueSize > 4) await new Promise(r => setTimeout(r, 10));
  }
  while (g.enc.encodeQueueSize > 6) await new Promise(r => setTimeout(r, 10));
  return g.erro || 'ok';
};

// máscara (opcional): o alfa do canvas num quadro (com o quadrilátero dos cantos opaco, se houver)
if (C.mascara) {
  const m = await chamar(async function (sel, quadJs, me) {
    const g = globalThis.__grav;
    __relogio.avancar(1000 / 30); await null; await null;
    const a = document.querySelector(g.alvoSel).getBoundingClientRect();
    const el = document.querySelector(sel), r = el.getBoundingClientRect();
    const c = new OffscreenCanvas(g.W, g.H), x = c.getContext('2d');
    x.drawImage(el, (r.left - a.left - g.rec.x) * g.esc, (r.top - a.top - g.rec.y) * g.esc, r.width * g.esc, r.height * g.esc);
    const Q = quadJs ? (0, eval)(quadJs) : null;
    if (Q && quadJs) {
      const q = Q.q.map((n, i) => (n - (i % 2 ? g.rec.y : g.rec.x)) * g.esc);
      x.fillStyle = '#fff'; x.beginPath(); x.moveTo(q[0], q[1]); x.lineTo(q[2], q[3]); x.lineTo(q[6], q[7]); x.lineTo(q[4], q[5]); x.closePath(); x.fill();
    }
    const d = x.getImageData(0, 0, g.W, g.H);
    for (let i = 0; i < d.data.length; i += 4) { d.data[i] = d.data[i + 1] = d.data[i + 2] = 255; }
    x.putImageData(d, 0, 0);
    let final = c;
    if (me && me !== 1) { final = new OffscreenCanvas(Math.round(g.W * me), Math.round(g.H * me)); final.getContext('2d').drawImage(c, 0, 0, final.width, final.height); }
    const u8 = new Uint8Array(await (await final.convertToBlob({ type: 'image/png' })).arrayBuffer());
    let bin = ''; for (let i = 0; i < u8.length; i += 0x8000) bin += String.fromCharCode.apply(null, u8.subarray(i, i + 0x8000));
    const cantos = C_CANTOS ? (0, eval)(C_CANTOS) : null;
    return { png: btoa(bin), cantos: cantos };
  }.toString().replace('C_CANTOS', JSON.stringify(C.cantosJs || '')).replace('C_CANTOS', JSON.stringify(C.cantosJs || '')), C.mascaraSel || C.alvo, C.quadJs || '', C.mascaraEscala || 1);
  mkdirSync(dirname(C.saida), { recursive: true });
  writeFileSync(C.saida.replace(/-(pc|cel)$/, '-mascara-$1') + '.png', Buffer.from(m.png, 'base64'));
  console.log('máscara:', (Buffer.from(m.png, 'base64').length / 1024).toFixed(0) + ' KB' + (m.cantos ? ' | cantos: ' + JSON.stringify(m.cantos) : ''));
}
// a página fica sabendo em que instante o vídeo começa (o quadro F): as cenas com coreografia usam esse relógio
await ev(`window.__inicioGravacao = performance.now() + ${(F + 1) * 1000 / C.fps}`);
const t0 = Date.now();
for (let i = 0; i < N; i++) {
  const r = await chamar(quadro, i, C.sub, passo);
  if (r !== 'ok') { console.log('erro no quadro', i, r); break; }
  if (i % 60 === 0) console.log(`  quadro ${i}/${N} (${((Date.now() - t0) / 1000).toFixed(0)} s)`);
}
const fim = await chamar(async function () {
  const g = globalThis.__grav;
  const b64 = async (u8) => { let s = ''; for (let i = 0; i < u8.length; i += 0x8000) s += String.fromCharCode.apply(null, u8.subarray(i, i + 0x8000)); return btoa(s); };
  await g.enc.flush(); g.muxer.finalize();
  const out = { mp4: await b64(new Uint8Array(g.muxer.target.buffer)), poster: await b64(new Uint8Array(await g.poster.arrayBuffer())), erro: g.erro };
  if (g.alfa) {
    await g.encC.flush(); await g.encA.flush();
    if (g.cores.length !== g.alfas.length) return Object.assign(out, { erro: 'cores e alfa com quantidades diferentes: ' + g.cores.length + ' x ' + g.alfas.length });
    const mux = new WebMMuxer.Muxer({ target: new WebMMuxer.ArrayBufferTarget(), video: { codec: 'V_VP9', width: g.W, height: g.H, frameRate: g.fps, alpha: true } });
    for (let i = 0; i < g.cores.length; i++) {
      const a = g.alfas[i], buf = new Uint8Array(a.byteLength); a.copyTo(buf);
      mux.addVideoChunk(g.cores[i].c, Object.assign({}, g.cores[i].m, { adicoes: [{ id: 0xA6, data: [{ id: 0xEE, data: 1 }, { id: 0xA5, data: buf }] }] }));
    }
    mux.finalize();
    out.webm = await b64(new Uint8Array(mux.target.buffer));
    out.posterA = await b64(new Uint8Array(await g.posterA.arrayBuffer()));
    out.erro = (out.erro || '') + ' [cores ' + Math.round(g.bytesC / 1024) + ' KB, alfa ' + Math.round(g.bytesA / 1024) + ' KB, chaves ' + g.cores.filter(x => x.c.type === 'key').length + '/' + g.cores.length + ']';
  }
  return out;
});
mkdirSync(dirname(C.saida), { recursive: true });
const mp4 = Buffer.from(fim.mp4, 'base64'), poster = Buffer.from(fim.poster, 'base64');
writeFileSync(C.saida + '.mp4', mp4);
writeFileSync(C.saida + '.webp', poster);
let resumo = (mp4.length / 1024).toFixed(0) + ' KB (mp4) | poster ' + (poster.length / 1024).toFixed(0) + ' KB';
if (fim.webm) {
  const webm = Buffer.from(fim.webm, 'base64'), posterA = Buffer.from(fim.posterA, 'base64');
  writeFileSync(C.saida + '.webm', webm);
  writeFileSync(C.saida + '-alfa.webp', posterA);
  resumo += ' | ' + (webm.length / 1024).toFixed(0) + ' KB (webm com alfa) | poster transparente ' + (posterA.length / 1024).toFixed(0) + ' KB';
}
console.log('pronto:', C.saida, '|', resumo, fim.erro || '', '| tempo', ((Date.now() - t0) / 1000).toFixed(0), 's');
if (logs.length) console.log('console da página:\n  ' + logs.slice(0, 12).join('\n  '));
ws.close(); proc.kill();
setTimeout(() => { try { rmSync(prof, { recursive: true, force: true }); } catch (e) { /* o navegador ainda segura algum arquivo */ } process.exit(0); }, 1500);
