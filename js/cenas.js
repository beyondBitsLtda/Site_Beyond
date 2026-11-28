/* ══════════════════════════════════════════════════════════════
   MAESTRO DAS CENAS 3D (23/11/2026; vídeos em 26/11/2026)
   O site tem várias cenas em WebGL: o globo, os trilhos, o trem, o beco, o planeta, o disco de
   ouro e os buracos (e o rosto da Lisa, que tem o próprio motor).
   NO SITE, ELAS APARECEM COMO VÍDEOS gravados do próprio 3D (parte 5, abaixo; a ferramenta que grava
   fica em ferramentas/gravar-cenas/): nada de shader para compilar nem cena para desenhar a cada quadro,
   e o Three.js nem é baixado. O 3D de verdade só monta nas cenas interativas (o disco, o planeta, a
   Lisa) quando o visitante mexe nelas, e no modo gravação (index.html?gravar=<cena>).
   Quando o 3D roda, este arquivo cuida de quatro coisas para ele não pesar:

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
  /* MODO GRAVAÇÃO (index.html?gravar=<cena>): o site volta a desenhar tudo em 3D ao vivo, para as cenas serem
     gravadas em vídeo (ferramenta fora do site). A cena pedida fica sempre com a vez, sem qualidade
     adaptativa, e cada cena faz o movimento dela fechar um ciclo em "periodo" segundos (loop sem emenda). */
  var gravar = (location.search.match(/[?&]gravar=([\w-]+)/) || [])[1] || null;
  var gravacao = gravar ? { cena: gravar, periodo: Number((location.search.match(/[?&]periodo=([\d.]+)/) || [])[1]) || 0 } : null;
  // o Three.js: na gravação vem já (o 3D desenha tudo); no site, só quando uma cena interativa é usada
  var THREE_URL = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
  if (gravacao && !window.THREE) document.write('<script src="' + THREE_URL + '"><\/script>');
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
    } catch (e) { return; /* contexto perdido: o próximo quadro tenta de novo */ }
    // o primeiro quadro de verdade: quem esperava (o vídeo no lugar da cena) pode sair
    if (!tela.__desenhou) { tela.__desenhou = true; try { tela.dispatchEvent(new Event('cena:primeiro')); } catch (e) { /* navegador antigo */ } }
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
      if (gravacao) {
        for (i = 0; i < lista.length; i++) if (lista[i].nome === gravacao.cena && lista[i].visivel) melhor = lista[i];
      }
      if (melhor) {
        /* gravando: a vez é da cena gravada */
      } else if (foco && foco.visivel && performance.now() < focoAte) {
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
    if (gravacao) return;                           // gravando: sempre resolução cheia
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
  var fila = [], montando = false, ultimaRolagem = 0, historico = [], seguraAte = 0;
  window.addEventListener('scroll', function () { ultimaRolagem = performance.now(); }, { passive: true });
  function distancia(item) {
    if (!item.el) return 1e9;                                                  // sem lugar na página: nunca é urgente
    // mede a seção (não o elemento lá dentro): seções puladas pelo navegador não são recalculadas à força
    var alvo = item.secao || (item.secao = (item.el.closest && item.el.closest('section')) || item.el);
    var r = alvo.getBoundingClientRect(), vh = window.innerHeight || 800;
    return r.top > vh ? r.top - vh : (r.bottom < 0 ? -r.bottom : 0);
  }
  function naTelaAgora(item) {
    if (!item.el) return false;
    var r = (item.secao || item.el).getBoundingClientRect();
    return r.top < (window.innerHeight || 800) && r.bottom > 0;
  }
  function proxima() {
    if (montando || !fila.length) return;
    fila.sort(function (a, b) { return distancia(a) - distancia(b); });       // a mais perto primeiro
    var item = fila[0], vh = window.innerHeight || 800;
    var urgente = distancia(item) < vh * 1.3;
    if (!urgente && performance.now() - ultimaRolagem < 400) { setTimeout(proxima, 200); return; }   // espera parar de rolar
    // alguém pediu a placa (Cenas.segurar; ou a entrada do título do hero, window.__seguraCenas): só passa o que já está na tela
    var segura = Math.max(seguraAte, window.__seguraCenas || 0);
    if (performance.now() < segura && !naTelaAgora(item)) { setTimeout(proxima, 250); return; }
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
  function preparar(el, fn, opcoes) {
    el = typeof el === 'string' ? document.getElementById(el) : el;
    if (!el) return;
    // no site (fora da gravação), a cena aparece em vídeo: o 3D só monta se for pedido (Cenas.ativar);
    // as cenas que continuam em 3D no site ({ sempre: true }: o trem, os panfletos) montam como sempre
    if (emVideo && !(opcoes && opcoes.sempre)) { sobDemanda.push({ el: el, fn: fn, promessa: null }); return; }
    var item = { el: el, fn: function () { if (window.THREE) fn(); }, pedido: false };
    function pedir() {
      if (item.pedido) return;
      item.pedido = true;
      carregar3d().then(function () { fila.push(item); proxima(); }, function () { /* sem Three.js: a cena não aparece */ });
    }
    // 1) em segundo plano, um pouco depois de a página terminar de carregar: montar uma cena (e compilar os
    //    shaders dela) é um custo único que não dá para dividir; feito com a página parada no topo, ninguém vê
    //    (feito na hora em que a cena chega perto, travava a rolagem por ~2 s em placas integradas)
    function depoisDaCarga() { setTimeout(pedir, 1500); }
    if (document.readyState === 'complete') depoisDaCarga(); else window.addEventListener('load', depoisDaCarga);
    // 2) ou antes, se o visitante chegar perto (na direção da rolagem; js: a janela, abaixo)
    janela.observar(el, { carregar: pedir });
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

  /* ═════════════ 6. a janela: só existe o que está perto da tela (como no Doom) ═════════════
     A página é dividida em blocos (as seções e as partes grandes de dentro delas). A posição de cada bloco fica
     guardada (medida só quando o layout muda); a cada quadro de rolagem, só com conta, cada bloco ganha um estado:
       visível — na tela (com uma folguinha): anima, toca, desenha;
       perto   — logo à frente na direção da rolagem (1,5 tela, mais quanto mais rápido se rola) ou logo atrás
                 (0,6 tela): tudo carregado e pronto, mas parado;
       longe   — além disso: as camadas decorativas somem; e, a mais de LONGE telas por ESPERA ms, o que pesa
                 na memória (vídeos, céus, imagens grandes) é solto. Volta sozinho quando o bloco chega perto.
     Classes no bloco: "parado" (fora da tela: as animações CSS param) e "longe" (camadas decorativas escondidas;
     css/vitrine.css). Quem precisa saber usa Cenas.janela.observar(elemento, { carregar, mostrar, esconder, soltar }):
     vale o bloco mais de dentro que contém o elemento. */
  var janela = (function () {
    var SELETORES = ['#inicio', '#solucoes', '#depoimentos', '#projetos', '#proj-sistemas', '#proj-sistemas > .mock-cena',
      '#tremDivisa', '#proj-sites', '#proj-lab', '#lisaHero', '#proj-lab > .mock-cena', '#processo', '#seguranca', '#contato', 'footer'];
    var LONGE = 2.5, ESPERA = 3000;
    var blocos = [], marcado = false, timerSoltar = 0;
    var yAnt = window.scrollY || 0, tAnt = performance.now(), vel = 0, dir = 1;

    function novo(el) { var b = { el: el, topo: 0, base: 0, visivel: null, perto: false, carregado: false, longeDesde: 0, obs: [] }; blocos.push(b); return b; }
    function achar(el) { for (var i = 0; i < blocos.length; i++) if (blocos[i].el === el) return blocos[i]; return null; }
    // o bloco mais de dentro que contém o elemento (sem nenhum, o próprio elemento vira um bloco)
    function blocoDe(el) {
      var melhor = null;
      for (var i = 0; i < blocos.length; i++) {
        var b = blocos[i];
        if (b.el === el || b.el.contains(el)) { if (!melhor || melhor.el.contains(b.el)) melhor = b; }
      }
      if (!melhor) { melhor = novo(el); medir(); }
      return melhor;
    }
    function medir() {
      var sy = window.scrollY || 0;
      for (var i = 0; i < blocos.length; i++) {
        var r = blocos[i].el.getBoundingClientRect();
        blocos[i].topo = r.top + sy; blocos[i].base = r.bottom + sy;
      }
    }
    function chamar(b, qual) {
      for (var i = 0; i < b.obs.length; i++) { var f = b.obs[i][qual]; if (f) { try { f(); } catch (e) { if (window.console) console.error(e); } } }
    }
    function atualizar() {
      marcado = false;
      var agora = performance.now(), y = window.scrollY || 0, vh = window.innerHeight || 800;
      var dy = y - yAnt, dt = Math.max(1, agora - tAnt);
      if (Math.abs(dy) > 1) dir = dy > 0 ? 1 : -1;
      vel = dt > 400 ? 0 : vel * 0.6 + (Math.abs(dy) / dt) * 0.4;          // px por ms
      yAnt = y; tAnt = agora;
      var frente = vh * 1.5 + Math.min(vh * 3, vel * 700), tras = vh * 0.6, folga = vh * 0.05;
      var pendente = false;
      for (var i = 0; i < blocos.length; i++) {
        var b = blocos[i];
        if (b.base <= b.topo) continue;                                      // escondido (sem tamanho)
        var acima = y - b.base, abaixo = b.topo - (y + vh);                  // > 0: o bloco está acima / abaixo da tela
        var visivel = acima < folga && abaixo < folga;
        var dist = visivel ? 0 : Math.max(acima, abaixo);
        var aFrente = (dir > 0 && abaixo > 0) || (dir < 0 && acima > 0);
        var perto = visivel || dist <= (aFrente ? frente : tras);
        if (perto && !b.carregado) { b.carregado = true; chamar(b, 'carregar'); }
        if (visivel !== b.visivel) { b.visivel = visivel; b.el.classList.toggle('parado', !visivel); chamar(b, visivel ? 'mostrar' : 'esconder'); }
        if (perto !== b.perto) { b.perto = perto; b.el.classList.toggle('longe', !perto); }
        if (!perto && dist > vh * LONGE && b.carregado) {
          if (!b.longeDesde) b.longeDesde = agora;
          if (agora - b.longeDesde >= ESPERA) { b.carregado = false; b.longeDesde = 0; chamar(b, 'soltar'); }
          else pendente = true;
        } else b.longeDesde = 0;
      }
      // quem está esperando para soltar é conferido de novo (a página pode ficar parada)
      clearTimeout(timerSoltar);
      if (pendente) timerSoltar = setTimeout(agendarJanela, ESPERA + 50);
    }
    function agendarJanela() { if (marcado) return; marcado = true; requestAnimationFrame(atualizar); }
    function remedir() { medir(); agendarJanela(); }

    SELETORES.forEach(function (sel) { Array.prototype.forEach.call(document.querySelectorAll(sel), function (el) { if (!achar(el)) novo(el); }); });
    medir();
    window.addEventListener('scroll', agendarJanela, { passive: true });
    window.addEventListener('resize', remedir, { passive: true });
    window.addEventListener('load', remedir);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(remedir);
    if ('ResizeObserver' in window) {
      var esperaRO = 0;
      var ro = new ResizeObserver(function () { clearTimeout(esperaRO); esperaRO = setTimeout(remedir, 60); });
      blocos.forEach(function (b) { ro.observe(b.el); });
    }
    atualizar();

    return {
      observar: function (el, h) {
        var b = blocoDe(el);
        b.obs.push(h);
        if (b.carregado && h.carregar) { try { h.carregar(); } catch (e) { /* segue */ } }
        if (b.visivel && h.mostrar) { try { h.mostrar(); } catch (e) { /* segue */ } }
        agendarJanela();
      },
      estado: function () {
        return blocos.map(function (b) { return (b.el.id || b.el.className.split(' ')[0] || b.el.tagName) + ':' + (b.visivel ? 'visível' : b.perto ? 'perto' : 'longe') + (b.carregado ? '' : '(solto)'); });
      }
    };
  })();

  /* ═════════════ 5. as cenas já renderizadas, em vídeo ═════════════
     No site, as cenas 3D aparecem como vídeos gravados do próprio 3D (assets/videos/<cena>-<pc|cel>.mp4,
     ferramenta de gravação: index.html?gravar=<cena>). A placa de vídeo só decodifica o vídeo, quase de
     graça: sem shaders para compilar, sem desenhar a cena a cada quadro e sem baixar o Three.js.
     O 3D de verdade só é montado nas cenas interativas (o disco, o planeta, a Lisa) quando o visitante
     mexe nelas: o Three.js chega, a cena monta por baixo do vídeo e, no primeiro quadro, troca de lugar
     com ele. Cada vídeo só é baixado quando a cena chega perto, e só toca com ela na tela.
     Com "reduzir movimento", fica a primeira imagem, parada. */
  var emVideo = !gravacao;
  if (emVideo) document.documentElement.classList.add('cenas-em-video');
  /* vídeo TRANSPARENTE (WebM VP9 com alfa): nos navegadores baseados no Chrome (Chrome, Edge, Opera, Samsung,
     Android). Nos outros (Safari, iPhone, Firefox) vai o MP4 com fundo preto, e o CSS soma a luz dele ao fundo
     (classe videos-sem-alfa); nos baseados no Chrome, nada de mistura: a placa de vídeo às vezes mostra o vídeo
     por um atalho que ignora a mistura, e o fundo preto aparecia. */
  var alfaOk = (function () {
    var ua = navigator.userAgent || '';
    var ios = /iP(hone|ad|od)/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    if (ios || !/Chrome\/|Chromium\//.test(ua)) return false;
    try { return !!document.createElement('video').canPlayType('video/webm; codecs="vp09.00.10.08"'); } catch (e) { return false; }
  })();
  if (emVideo && !alfaOk) document.documentElement.classList.add('videos-sem-alfa');
  var reduzido = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var sobDemanda = [], tres = null;
  function versao() { return (window.innerWidth || document.documentElement.clientWidth || 1024) < 700 ? 'cel' : 'pc'; }
  // o HD perdeu quadros nesta visita: as outras cenas também vêm na versão comum
  var hdDesligado = false;
  function semHD() { if (hdDesligado) return true; try { return sessionStorage.getItem('beyond-sem-hd') === '1'; } catch (e) { return false; } }
  function desligarHD() { hdDesligado = true; try { sessionStorage.setItem('beyond-sem-hd', '1'); } catch (e) { /* sem armazenamento: vale só para esta página */ } }
  function carregar3d() {
    if (window.THREE) return Promise.resolve();
    if (tres) return tres;
    tres = new Promise(function (ok, erro) {
      var s = document.createElement('script');
      s.src = THREE_URL; s.async = true;
      s.onload = function () { ok(); };
      s.onerror = function () { tres = null; erro(new Error('Three.js não carregou')); };
      document.head.appendChild(s);
    });
    return tres;
  }
  // monta o 3D de uma cena interativa (preparada com Cenas.preparar); o vídeo fica até o primeiro quadro
  function ativar(el) {
    el = typeof el === 'string' ? document.getElementById(el) : el;
    var item = null;
    for (var i = 0; i < sobDemanda.length; i++) if (sobDemanda[i].el === el) item = sobDemanda[i];
    if (!item) return Promise.reject(new Error('cena sem 3D sob demanda'));
    if (!item.promessa) item.promessa = carregar3d().then(function () { item.fn(); });
    return item.promessa;
  }
  /* o vídeo de uma cena. o: { nome, lugar (onde entra), antes (entra antes deste elemento), classe,
     versao ('pc' | 'cel'; sem ela, pela largura da tela), alfa (true: a cena tem a versão transparente),
     posterOpaco (true: mesmo com o vídeo transparente, o primeiro quadro comum, mais leve), hd (true: tem a versão HD) } */
  function video(o) {
    var v = document.createElement('video');
    v.className = 'cena-video' + (o.classe ? ' ' + o.classe : '');
    v.muted = true; v.defaultMuted = true; v.loop = true; v.playsInline = true; v.preload = 'none';
    ['muted', 'loop', 'playsinline', 'disablepictureinpicture', 'disableremoteplayback'].forEach(function (a) { v.setAttribute(a, ''); });
    v.setAttribute('aria-hidden', 'true');
    // versões: 'cel' (tela estreita), 'pc' e, nas cenas com detalhe fino (o: hd), 'hd' — 1,5× mais pixels, só para
    // computador com tela de alta densidade (zoom de 130% ou mais), onde o 'pc' apareceria esticado
    var ver = o.versao || versao();
    if (o.hd && ver === 'pc' && (window.devicePixelRatio || 1) >= 1.3 && !semHD()) ver = 'hd';
    var base = 'assets/videos/' + o.nome + '-' + ver;
    var carregado = false, naTela = false, parado = false, pedido = false;
    // cada vídeo entra na fila de tarefas (um de cada vez; na frente, o que está para aparecer): criar o
    // tocador de vídeo custa algumas dezenas de ms, e vários juntos no mesmo quadro dariam um tranco
    var transparente = o.alfa && alfaOk;
    // o primeiro quadro (uma imagem): aparece assim que a cena chega perto, sem esperar a fila; transparente junto
    // com o vídeo transparente (posterOpaco: o comum, quando o fundo atrás já é preto)
    function mostrarPoster() { if (!v.poster) v.poster = base + (transparente && !o.posterOpaco ? '-alfa.webp' : '.webp'); }
    function carregar() {
      if (carregado || pedido) return;
      pedido = true;
      mostrarPoster();
      ocioso(function () { if (pedido) { carregarJa(); tocar(); } }, o.lugar);
    }
    // longe: o vídeo é solto (o tocador, o que já baixou e o decodificador); fica a primeira imagem
    function soltar() {
      pedido = false;
      vigiarHD(false);
      if (!carregado) return;
      carregado = false;
      try { v.pause(); v.removeAttribute('src'); v.load(); } catch (e) { /* segue */ }
    }
    function carregarJa() {
      if (carregado) return;
      carregado = true;
      mostrarPoster();
      if (!reduzido) { v.src = base + (transparente ? '.webm' : '.mp4'); v.preload = 'auto'; }
    }
    function tocar() {
      if (reduzido || !carregado) return;
      if (parado || document.hidden || !naTela) { if (!v.paused) v.pause(); vigiarHD(false); return; }
      if (v.paused) { var p = v.play(); if (p && p.catch) p.catch(function () { /* sem autoplay (economia de bateria): fica a imagem */ }); }
      vigiarHD(true);
    }
    /* o HD perdendo quadros (máquina sem fôlego para decodificar): troca, no mesmo ponto, pela versão comum, e as
       próximas cenas desta visita já vêm na comum */
    var vigia = 0, perdidos0 = 0, totais0 = 0;
    function vigiarHD(ligar) {
      clearInterval(vigia); vigia = 0;
      if (!ligar || ver !== 'hd' || !v.getVideoPlaybackQuality) return;
      var q = v.getVideoPlaybackQuality(); perdidos0 = q.droppedVideoFrames; totais0 = q.totalVideoFrames;
      vigia = setInterval(function () {
        var q = v.getVideoPlaybackQuality(), perd = q.droppedVideoFrames - perdidos0, tot = q.totalVideoFrames - totais0;
        perdidos0 = q.droppedVideoFrames; totais0 = q.totalVideoFrames;
        if (tot < 20 || perd / tot < 0.08) return;
        clearInterval(vigia); vigia = 0;
        desligarHD();
        var t = v.currentTime || 0;
        ver = 'pc'; base = 'assets/videos/' + o.nome + '-pc';
        v.addEventListener('loadedmetadata', function () { try { v.currentTime = t; } catch (e) { /* segue */ } tocar(); }, { once: true });
        v.src = base + (transparente ? '.webm' : '.mp4');
      }, 2000);
    }
    o.lugar.insertBefore(v, o.antes || null);
    janela.observar(o.lugar, {
      carregar: function () { carregar(); tocar(); },
      mostrar: function () { naTela = true; carregar(); tocar(); },
      esconder: function () { naTela = false; tocar(); },
      soltar: soltar
    });
    document.addEventListener('visibilitychange', tocar);
    return {
      el: v,
      tempo: function () { return v.currentTime || 0; },
      parar: function (sim) { parado = !!sim; tocar(); },
      carregar: function () { carregarJa(); tocar(); }
    };
  }

  return {
    gravacao: gravacao,
    // gravando: segundos desde o primeiro quadro do vídeo (a ferramenta avisa quando ele começa)
    tempoGravacao: function () { return (performance.now() - (window.__inicioGravacao || 0)) / 1000; },
    emVideo: emVideo,
    janela: janela,
    videoTransparente: emVideo && alfaOk,
    video: video,
    ativar: ativar,
    carregar3d: carregar3d,
    renderizador: renderizador,
    registrar: registrar,
    preparar: preparar,
    imagem: imagem,
    ocioso: ocioso,
    // segura a fila por um tempo (ex.: o rosto da Lisa, que tem motor próprio, está compilando os shaders dele)
    segurar: function (ms) { seguraAte = Math.max(seguraAte, performance.now() + ms); },
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
