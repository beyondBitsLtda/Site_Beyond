/* ══════════════════════════════════════════════════════════════
   MAESTRO DAS CENAS 3D (23/11/2026)
   O site tem várias cenas em WebGL: o globo, os trilhos, o trem, o beco, o planeta, o disco de
   ouro e os buracos (e o rosto da Lisa, que tem o próprio motor). Este arquivo cuida de quatro
   coisas para elas não pesarem:

   1. UM SÓ MOTOR 3D. Todas usam o mesmo contexto WebGL, desenhando fora da tela; a cena que
      desenha entrega o quadro pronto ao canvas dela na página (transferToImageBitmap, sem cópia).
      Assim o site cria um contexto só (antes eram oito), os shaders iguais compilam uma vez só e
      sobra memória de vídeo. Cada cena recebe um "renderizador" com as mesmas funções do Three
      que ela usava (Cenas.renderizador(canvas)).

   2. UMA CENA POR VEZ. Só desenha a que ocupa mais a tela (com peso: o fundo dos trilhos cede
      para qualquer cena da frente); as outras que aparecem ficam paradas no último quadro, e a que
      sai da tela para de vez. Cada uma tem um limite de quadros por segundo: as de fundo 30; as
      rápidas, ou as que o visitante está mexendo, 60.

   3. QUALIDADE ADAPTATIVA. Se a cena não consegue manter o ritmo dela, passa a desenhar com menos
      pixels (nunca abaixo de 0,75 pixel por pixel da página); quando volta a sobrar folga, sobe de
      novo. Em máquina boa, nada muda.

   4. TRABALHO PESADO NA HORA CERTA. Montar uma cena, mandar texturas para a placa e o primeiro
      quadro de cada uma acontecem em segundo plano, uma coisa por vez e só com a rolagem parada
      (ou na hora, se o visitante chegar perto).

   E, para o resto da página: seções a mais de uma tela de distância ganham a classe "longe", que
   pausa as animações CSS e esconde as camadas decorativas (céus, órbitas, naves) — ver css/vitrine.css.

   Uso, em cada cena:
     var renderer = Cenas.renderizador(canvas);
     var c = Cenas.registrar({ nome, el, peso, fps, ligar, desligar, pintar, motor: renderer, aoMudarQualidade });
     no laço:  if (!c.vez(agora)) return;   // não é a vez (outra cena ativa ou limite de fps)
     c.focar(ms) dá a vez para a cena por um tempo; c.fps(n) muda o limite; c.repintar() desenha um
     quadro se ela aparece mas não está ativa.
   No console: Cenas.estado(), Cenas.historico(), Cenas.pendentes().
══════════════════════════════════════════════════════════════ */
window.Cenas = (function () {
  'use strict';
  var lista = [];
  var ativa = null;
  var foco = null, focoAte = 0;
  var agendado = false;
  function nada() {}

  /* ═════════════ 1. o motor 3D compartilhado ═════════════ */
  var motor = null, pendente = null, entregaMarcada = false, telasDoMotor = [];
  var microtarefa = window.queueMicrotask || function (f) { Promise.resolve().then(f); };

  function criarMotor() {
    var canvas = null, fora = false, r = null;
    function tentar(c) {
      return new THREE.WebGLRenderer({ canvas: c, alpha: true, antialias: true, premultipliedAlpha: true });
    }
    if (typeof OffscreenCanvas === 'function' && OffscreenCanvas.prototype && typeof OffscreenCanvas.prototype.transferToImageBitmap === 'function') {
      try { canvas = new OffscreenCanvas(16, 16); r = tentar(canvas); fora = true; } catch (e) { r = null; }
    }
    if (!r) {                                       // sem canvas fora da tela: um <canvas> solto, copiado com drawImage
      canvas = document.createElement('canvas'); canvas.width = canvas.height = 16;
      r = tentar(canvas); fora = false;
    }
    r.setPixelRatio(1);
    r.debug.checkShaderErrors = false;              // não esperar cada shader compilar só para conferir erros
    try { r.getContext().getExtension('KHR_parallel_shader_compile'); } catch (e) { /* sem a extensão */ }
    canvas.addEventListener('webglcontextlost', function (e) {
      e.preventDefault();
      if (window.console) console.warn('[cenas] o motor 3D perdeu o contexto WebGL');
      telasDoMotor.forEach(function (t) { try { t.dispatchEvent(new Event('webglcontextlost', { cancelable: true })); } catch (x) { /* segue */ } });
    });
    motor = { r: r, canvas: canvas, fora: fora, w: 16, h: 16 };
  }

  // entrega à página o quadro desenhado no motor (da cena que desenhou por último)
  function entregar() {
    var p = pendente; pendente = null;
    if (!p || !motor) return;
    var tela = p.domElement;
    if (tela.width !== motor.w) tela.width = motor.w;
    if (tela.height !== motor.h) tela.height = motor.h;
    try {
      if (motor.fora) p._ctx.transferFromImageBitmap(motor.canvas.transferToImageBitmap());
      else { p._ctx.clearRect(0, 0, tela.width, tela.height); p._ctx.drawImage(motor.canvas, 0, 0); }
    } catch (e) { /* contexto perdido: o próximo quadro tenta de novo */ }
  }
  function marcar(p) {
    pendente = p;
    if (entregaMarcada) return;
    entregaMarcada = true;
    microtarefa(function () { entregaMarcada = false; entregar(); });   // depois de todas as passadas do quadro
  }

  function renderizador(tela) {
    if (!motor) criarMotor();
    var R = motor.r;
    if (!tela) tela = document.createElement('canvas');
    var ctx = motor.fora ? tela.getContext('bitmaprenderer') : tela.getContext('2d');
    if (!ctx) throw new Error('canvas sem contexto para receber o quadro');
    telasDoMotor.push(tela);
    var cor = new THREE.Color(0x000000), alfa = 0, largura = 1, altura = 1, razao = 1;
    var p = {
      domElement: tela, _ctx: ctx,
      capabilities: R.capabilities, extensions: R.extensions, properties: R.properties, info: R.info,
      debug: { checkShaderErrors: false },
      outputEncoding: THREE.LinearEncoding, toneMapping: THREE.NoToneMapping, toneMappingExposure: 1,
      autoClear: true,
      fator: 1,                                     // qualidade adaptativa (1 = resolução cheia)
      razaoPedida: function () { return razao; },
      setPixelRatio: function (v) { razao = v || 1; },
      getPixelRatio: function () { return razao * p.fator; },
      setSize: function (w, h, estilo) {
        largura = w; altura = h;
        if (estilo !== false) { tela.style.width = w + 'px'; tela.style.height = h + 'px'; }
      },
      getSize: function (alvo) { return alvo.set(largura, altura); },
      getDrawingBufferSize: function (alvo) { return alvo.set(bw(), bh()); },
      setClearColor: function (c, a) { cor.set(c); alfa = a === undefined ? 1 : a; },
      getContext: function () { return R.getContext(); },
      initTexture: function (t) { R.initTexture(t); },
      compile: function (cena, cam) { config(); R.compile(cena, cam); },
      setRenderTarget: function (rt) { if (!rt) tomar(); config(); R.setRenderTarget(rt); },
      getRenderTarget: function () { return R.getRenderTarget(); },
      clear: function (a, b, c) {
        var naTela = !R.getRenderTarget();
        if (naTela) tomar();
        config(); R.clear(a, b, c);
        if (naTela) marcar(p);
      },
      render: function (cena, cam) {
        var naTela = !R.getRenderTarget();
        if (naTela) tomar();
        config(); R.render(cena, cam);
        if (naTela) marcar(p);
      },
      dispose: nada
    };
    function bw() { return Math.max(1, Math.floor(largura * razao * p.fator)); }
    function bh() { return Math.max(1, Math.floor(altura * razao * p.fator)); }
    function config() {
      R.outputEncoding = p.outputEncoding; R.toneMapping = p.toneMapping;
      R.toneMappingExposure = p.toneMappingExposure; R.autoClear = p.autoClear;
      R.setClearColor(cor, alfa);
    }
    // a tela do motor passa a ser desta cena: entrega o quadro de outra que estivesse pendente e ajusta o tamanho
    function tomar() {
      if (pendente && pendente !== p) entregar();
      var w = bw(), h = bh();
      if (motor.w !== w || motor.h !== h) { R.setSize(w, h, false); motor.w = w; motor.h = h; }
    }
    return p;
  }

  /* ═════════════ 2. uma cena por vez ═════════════ */
  // a visibilidade vem do IntersectionObserver; a área só é medida de quem está na tela (sem forçar layout)
  function medir(c) {
    if (!c.naTela) { c.area = 0; c.visivel = false; return; }
    var r = c.el.getBoundingClientRect();
    var vw = window.innerWidth || document.documentElement.clientWidth;
    var vh = window.innerHeight || document.documentElement.clientHeight;
    var w = Math.min(r.right, vw) - Math.max(r.left, 0);
    var h = Math.min(r.bottom, vh) - Math.max(r.top, 0);
    c.area = (w > 0 && h > 0) ? w * h : 0;
    c.visivel = c.area > 0;
  }

  function escolher() {
    agendado = false;
    var oculto = document.hidden;
    var melhor = null, nota = 0, i, c;
    for (i = 0; i < lista.length; i++) medir(lista[i]);
    if (!oculto) {
      if (foco && foco.visivel && performance.now() < focoAte) {
        melhor = foco;
      } else {
        for (i = 0; i < lista.length; i++) {
          c = lista[i];
          if (c.visivel && c.area * c.peso > nota) { nota = c.area * c.peso; melhor = c; }
        }
        // um pouco de inércia: não fica trocando quando duas cenas ocupam quase o mesmo espaço
        if (ativa && melhor && ativa !== melhor && ativa.visivel && ativa.area * ativa.peso * 1.2 >= nota) melhor = ativa;
      }
    }
    if (melhor !== ativa) {
      var antiga = ativa;
      ativa = melhor;
      if (antiga) { antiga.ligada = false; try { antiga.desligar(); } catch (e) { /* segue */ } }
      if (ativa) { ativa.ligada = true; ativa.ultimo = 0; ativa.ultimoOk = 0; try { ativa.ligar(); } catch (e) { /* segue */ } }
    }
    // quem aparece sem ser a vez dela e nunca foi desenhada ganha um quadro, para não ficar em branco
    if (!oculto) {
      for (i = 0; i < lista.length; i++) {
        c = lista[i];
        if (c.visivel && c !== ativa && !c.pintada && c.pintar) { c.pintada = true; try { c.pintar(); } catch (e) { /* segue */ } }
      }
    }
  }
  function agendar() {
    if (agendado) return;
    agendado = true;
    requestAnimationFrame(escolher);
  }

  var io = ('IntersectionObserver' in window) ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { lista.forEach(function (c) { if (c.el === e.target) c.naTela = e.isIntersecting; }); });
    agendar();
  }) : null;
  window.addEventListener('scroll', agendar, { passive: true });
  window.addEventListener('resize', agendar, { passive: true });
  document.addEventListener('visibilitychange', function () { agendado = false; escolher(); });
  // o layout também muda sem rolagem (textos que entram, imagens que carregam): confere de vez em quando
  setInterval(function () { if (!document.hidden && lista.length) agendar(); }, 1000);

  /* ═════════════ 3. qualidade adaptativa ═════════════ */
  function ritmo(c, agora) {
    var dt = c.ultimoOk ? agora - c.ultimoOk : 0;
    c.ultimoOk = agora;
    if (!dt || dt > 300) return;                    // pausa, troca de cena: não conta
    c.media = c.media ? c.media + (dt - c.media) * 0.08 : dt;
    if (++c.conta < 40) return;
    c.conta = 0;
    var m = c.motor, alvo = 1000 / c.fps;
    var minimo = Math.min(1, 0.75 / Math.max(0.75, m.razaoPedida()));
    if (c.media > alvo * 1.35 && m.fator > minimo + 0.01) {
      mudarQualidade(c, Math.max(minimo, m.fator * 0.85)); c.folga = 0;
    } else if (c.media < alvo * 1.1 && m.fator < 1) {
      if (++c.folga >= 3) { c.folga = 0; mudarQualidade(c, Math.min(1, m.fator * 1.12)); }
    } else {
      c.folga = 0;
    }
  }
  function mudarQualidade(c, f) {
    c.motor.fator = f;
    if (c.aoMudarQualidade) { try { c.aoMudarQualidade(); } catch (e) { /* segue */ } }
  }

  function registrar(o) {
    var c = {
      nome: o.nome || '', el: o.el, peso: o.peso || 1, fps: o.fps || 30,
      ligar: o.ligar || nada, desligar: o.desligar || nada, pintar: o.pintar || null,
      motor: o.motor || null, aoMudarQualidade: o.aoMudarQualidade || null,
      area: 0, visivel: false, naTela: !io, ligada: false, pintada: false, ultimo: 0, quadros: 0,
      ultimoOk: 0, media: 0, conta: 0, folga: 0
    };
    lista.push(c);
    if (io) io.observe(c.el);
    agendar();
    return {
      vez: function (agora) {
        if (ativa !== c) return false;
        if (c.ultimo && agora - c.ultimo < 1000 / c.fps - 4) return false;   // limite de quadros por segundo
        c.ultimo = agora;
        c.pintada = true;
        c.quadros++;
        if (c.motor) ritmo(c, agora);
        return true;
      },
      focar: function (ms) {
        foco = c;
        focoAte = performance.now() + (ms || 2500);
        setTimeout(agendar, (ms || 2500) + 60);
        agendado = false; escolher();
      },
      fps: function (n) { c.fps = n; },
      ativa: function () { return ativa === c; },
      visivel: function () { return c.visivel; },
      repintar: function () { if (c.visivel && ativa !== c && c.pintar) { c.pintada = true; c.pintar(); } }
    };
  }

  /* ═════════════ 4. trabalho pesado na hora certa ═════════════
     Montar as cenas: criar a geometria e os materiais custa de 0,1 s a 1 s por cena em placas integradas.
     Depois que a página termina de carregar, elas são montadas uma de cada vez, só nos momentos em que o
     visitante não está rolando, para já estarem prontas (e com os shaders compilados) quando ele chegar.
     Se ele chegar perto de uma antes disso, ela passa na frente e é montada na hora. */
  var fila = [], montando = false, ultimaRolagem = 0, historico = [];
  window.addEventListener('scroll', function () { ultimaRolagem = performance.now(); }, { passive: true });
  function distancia(item) {
    if (!item.el) return 1e9;                                                  // sem lugar na página: nunca é urgente
    // mede a seção (não o elemento lá dentro): seções puladas pelo navegador não são recalculadas à força
    var alvo = item.secao || (item.secao = (item.el.closest && item.el.closest('section')) || item.el);
    var r = alvo.getBoundingClientRect(), vh = window.innerHeight || 800;
    return r.top > vh ? r.top - vh : (r.bottom < 0 ? -r.bottom : 0);
  }
  function proxima() {
    if (montando || !fila.length) return;
    fila.sort(function (a, b) { return distancia(a) - distancia(b); });       // a mais perto primeiro
    var item = fila[0], vh = window.innerHeight || 800;
    var urgente = distancia(item) < vh * 1.3;
    if (!urgente && performance.now() - ultimaRolagem < 400) { setTimeout(proxima, 200); return; }   // espera parar de rolar
    montando = true;
    var esperar = window.requestIdleCallback || function (fn) { return setTimeout(fn, 50); };
    esperar(function () {
      var i = fila.indexOf(item); if (i >= 0) fila.splice(i, 1);
      var t0 = performance.now();
      try { item.fn(); } catch (e) { if (window.console) console.error(e); }
      historico.push([item.el ? (item.el.id || item.el.className.split(' ')[0]) : '-', item.leve ? 'tarefa' : 'montagem', Math.round(performance.now() - t0), urgente ? 'urgente' : 'parado']);
      montando = false;
      setTimeout(proxima, item.leve ? 60 : 300);
    }, { timeout: urgente ? 120 : 1500 });
  }
  function preparar(el, fn) {
    el = typeof el === 'string' ? document.getElementById(el) : el;
    if (!el) return;
    var item = { el: el, fn: fn, pedido: false };
    function pedir() { if (item.pedido) return; item.pedido = true; fila.push(item); proxima(); }
    // 1) em segundo plano, um pouco depois de a página terminar de carregar
    function depoisDaCarga() { setTimeout(pedir, 1500); }
    if (document.readyState === 'complete') depoisDaCarga(); else window.addEventListener('load', depoisDaCarga);
    // 2) ou antes, se o visitante chegar perto
    if ('IntersectionObserver' in window) {
      var io2 = new IntersectionObserver(function (e) {
        if (e[0].isIntersecting) { io2.disconnect(); pedir(); }
      }, { rootMargin: '1800px 0px' });
      io2.observe(el);
    }
  }

  /* imagens para texturas: decodificadas fora da tarefa principal (createImageBitmap) e sem conversão de
     cor (são dados); "virar" deixa de cabeça para baixo, como o WebGL espera nas texturas comuns.
     Sem suporte, cai no <img> de sempre (aí quem usa deixa flipY ligado). */
  function imagem(url, virar) {
    function comImg() {
      return new Promise(function (ok, erro) {
        var im = new Image(); im.crossOrigin = 'anonymous';
        im.onload = function () { ok({ img: im, bitmap: false }); }; im.onerror = erro; im.src = url;
      });
    }
    if (!window.createImageBitmap || !window.fetch) return comImg();
    return fetch(url, { mode: 'cors' })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.blob(); })
      .then(function (b) {
        var op = { premultiplyAlpha: 'none', colorSpaceConversion: 'none' };
        if (virar) op.imageOrientation = 'flipY';
        return createImageBitmap(b, op);
      })
      .then(function (bm) { return { img: bm, bitmap: true }; })
      .catch(comImg);
  }
  /* tarefas pesadas de "primeira vez" (enviar texturas à placa, quadro de aquecimento, redesenhar um céu):
     entram na mesma fila das montagens, uma por vez e só com a rolagem parada; "el" é o lugar da página a
     que a tarefa serve, e ela passa na frente se esse lugar estiver para aparecer */
  function ocioso(fn, el) { fila.push({ el: el || null, fn: fn, leve: true }); proxima(); }

  /* ═════════════ e o resto da página, "por hero" ═════════════
     Seção a mais de uma tela de distância: classe "longe" (pausa as animações CSS e esconde as camadas
     decorativas; regras em css/vitrine.css). */
  if ('IntersectionObserver' in window) {
    var ioSecoes = new IntersectionObserver(function (es) {
      es.forEach(function (e) { e.target.classList.toggle('longe', !e.isIntersecting); });
    }, { rootMargin: '100% 0px' });
    Array.prototype.forEach.call(document.querySelectorAll('section'), function (s) { ioSecoes.observe(s); });
  }

  return {
    renderizador: renderizador,
    registrar: registrar,
    preparar: preparar,
    imagem: imagem,
    ocioso: ocioso,
    historico: function () { return historico.slice(); },
    pendentes: function () { return fila.map(function (i) { return (i.el ? (i.el.id || i.el.className.split(' ')[0]) : '-') + ':' + Math.round(distancia(i)); }).concat(montando ? ['(montando)'] : []); },
    estado: function () {
      return lista.map(function (c) {
        return { nome: c.nome, visivel: c.visivel, area: Math.round(c.area), ativa: c === ativa, fps: c.fps, quadros: c.quadros,
          qualidade: c.motor ? Math.round(c.motor.fator * 100) / 100 : null };
      });
    },
    motor: function () { return motor ? { fora: motor.fora, w: motor.w, h: motor.h } : null; }
  };
})();
