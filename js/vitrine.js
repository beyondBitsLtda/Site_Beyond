/* ══════════════════════════════════════════════════════════════
   VITRINE (22/11/2026): os depoimentos e as demonstrações da Beyond
   Software House (a Lisa 3D, o quiz da Lisa Proof e o quadro do Abacato).
   Sem JS: os depoimentos aparecem (sem o céu animado), os cartões aparecem e a
   Lisa mostra a imagem de reserva — nada quebra.
══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  var reduzido = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('js-vitrine');

  /* ── entrada ao rolar ── */
  (function revelar() {
    var itens = document.querySelectorAll('.vit-revela');
    if (!('IntersectionObserver' in window) || reduzido) {
      itens.forEach(function (el) { el.classList.add('is-visivel'); });
      return;
    }
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var irmaos = Array.prototype.indexOf.call(el.parentNode.children, el);
        setTimeout(function () { el.classList.add('is-visivel'); }, Math.max(0, irmaos) * 90);
        io.unobserve(el);
      });
    }, { threshold: 0.12 });
    itens.forEach(function (el) { io.observe(el); });
  })();

  // sorteio com semente fixa: ao redimensionar, o céu continua o mesmo
  function sorteio(semente) {
    return function () { semente = (semente * 16807) % 2147483647; return (semente - 1) / 2147483646; };
  }

  /* ══════════════ CÉU ESTRELADO (depoimentos e "O que construímos") ══════════════
     As estrelas são desenhadas uma vez em canvas (e de novo se o tamanho do céu mudar).
     As mais brilhantes vão para duas camadas que piscam (CSS).
     ~1 estrela a cada `densidade` px², 1/3 delas puxadas para uma faixa na diagonal (a galáxia);
     `espelha` inverte a diagonal. */
  var CORES = ['255,255,255', '255,255,255', '255,255,255', '205,218,255', '255,234,214'];
  function ceuEstrelado(ceu, base, brilhos, semente, densidade, espelha) {
    if (!ceu || !base || !base.getContext) return;
    var tamanho = { w: 0, h: 0 };
    function desenhar() {
      var w = ceu.clientWidth, h = ceu.clientHeight;
      if (!w || !h || (Math.abs(w - tamanho.w) < 2 && Math.abs(h - tamanho.h) < 2)) return;
      tamanho = { w: w, h: h };
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var telas = [base].concat(brilhos.filter(Boolean));
      var ctxs = telas.map(function (c) {
        c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
        var x = c.getContext('2d'); x.setTransform(dpr, 0, 0, dpr, 0, 0); return x;
      });
      var rnd = sorteio(semente);
      var total = Math.round(w * h / densidade);
      for (var i = 0; i < total; i++) {
        var x = rnd() * w, y = rnd() * h;
        if (i % 3 === 0) {                          // 1/3 das estrelas puxadas para a faixa da galáxia
          var t = rnd(), espalha = (rnd() + rnd() + rnd() - 1.5) * h * 0.18;
          x = t * w * 1.2 - w * 0.1;
          y = h * 0.95 - t * h * 0.9 + espalha;
          if (espelha) x = w - x;
        }
        var r = 0.35 + Math.pow(rnd(), 3) * 1.35;
        var alfa = 0.3 + rnd() * 0.7;
        var cor = CORES[Math.floor(rnd() * CORES.length)];
        var brilhante = r > 1.05;
        var ctx = brilhante && ctxs.length > 1 ? ctxs[1 + (i % (ctxs.length - 1))] : ctxs[0];
        if (brilhante) {                            // halo das mais fortes
          var g = ctx.createRadialGradient(x, y, 0, x, y, r * 4);
          g.addColorStop(0, 'rgba(' + cor + ',' + (alfa * 0.5).toFixed(2) + ')');
          g.addColorStop(1, 'rgba(' + cor + ',0)');
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(x, y, r * 4, 0, Math.PI * 2); ctx.fill();
        }
        ctx.fillStyle = 'rgba(' + cor + ',' + alfa.toFixed(2) + ')';
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
      }
      // avisa quem usa o céu como textura (os buracos do contato, js/buracos.js)
      try { ceu.dispatchEvent(new CustomEvent('ceu:desenhado')); } catch (e) { /* navegador antigo */ }
    }
    desenhar();
    if ('ResizeObserver' in window) {
      var espera = null;
      new ResizeObserver(function () { clearTimeout(espera); espera = setTimeout(desenhar, 150); }).observe(ceu);
    } else {
      window.addEventListener('resize', desenhar, { passive: true });
    }
  }

  /* chuva de meteoros: riscos animados por CSS (.meteoro); a cada passagem cada um muda de lugar,
     para a chuva não se repetir. Desligada com "reduzir movimento". */
  function chuvaDeMeteoros(chuva, quantos) {
    if (!chuva || reduzido) return;
    function sortear(m, primeira) {
      var dur = 4 + Math.random() * 6;                       // a cada 4–10 s; aparece ~11% desse tempo
      m.style.setProperty('--x', (15 + Math.random() * 95).toFixed(1) + '%');
      m.style.setProperty('--y', (-5 + Math.random() * 80).toFixed(1) + '%');
      m.style.setProperty('--ang', (-(26 + Math.random() * 14)).toFixed(1) + 'deg');
      m.style.setProperty('--len', Math.round(70 + Math.random() * 110) + 'px');
      m.style.setProperty('--dist', Math.round(220 + Math.random() * 280) + 'px');
      if (primeira) {
        m.style.setProperty('--dur', dur.toFixed(2) + 's');
        m.style.setProperty('--delay', (-Math.random() * dur).toFixed(2) + 's');
      }
    }
    for (var k = 0; k < quantos; k++) {
      var m = document.createElement('span');
      m.className = 'meteoro';
      sortear(m, true);
      m.addEventListener('animationiteration', function (e) { sortear(e.currentTarget, false); });
      chuva.appendChild(m);
    }
  }

  /* ══════════════ DEPOIMENTOS: o céu estrelado com chuva de meteoros ══════════════
     Os meteoros são riscos animados por CSS; a cada passagem cada um muda de lugar, para a
     chuva não se repetir. Tudo pausa quando a seção sai da tela (classe .in-view). */
  (function ceuDosDepoimentos() {
    var secao = document.getElementById('depoimentos');
    var chuva = document.getElementById('depoMeteoros');
    if (!secao) return;

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e) { secao.classList.toggle('in-view', e[0].isIntersecting); }).observe(secao);
    } else {
      secao.classList.add('in-view');
    }
    ceuEstrelado(secao, document.getElementById('depoEstrelas'),
      [document.getElementById('depoBrilhoA'), document.getElementById('depoBrilhoB')], 20261122, 420, false);
    chuvaDeMeteoros(chuva, secao.clientWidth < 700 ? 8 : 14);
  })();

  /* ══════════════ SITES: o céu do beco (o mesmo céu dos depoimentos, com outra semente) ══════════════
     O céu cobre do título até o fim da cena do outdoor; abaixo dele fica a "rua" (só a cor de fundo),
     onde está a lista dos sites. A altura é recalculada quando o tamanho muda. */
  (function ceuDoBeco() {
    var fundo = document.getElementById('becoFundo');
    var ceu = document.getElementById('becoCeu');
    var beco = document.getElementById('beco');
    if (!fundo || !ceu || !beco) return;
    function ajustar() {
      var f = fundo.getBoundingClientRect(), b = beco.getBoundingClientRect();
      ceu.style.height = Math.max(200, Math.round(b.bottom - f.top)) + 'px';
    }
    ajustar();
    if ('ResizeObserver' in window) new ResizeObserver(ajustar).observe(fundo);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e) { fundo.classList.toggle('in-view', e[0].isIntersecting); }).observe(fundo);
    } else {
      fundo.classList.add('in-view');
    }
    ceuEstrelado(ceu, document.getElementById('becoEstrelas'),
      [document.getElementById('becoBrilhoA'), document.getElementById('becoBrilhoB')], 20261127, 420, true);
    chuvaDeMeteoros(document.getElementById('becoMeteoros'), ceu.clientWidth < 700 ? 6 : 11);
  })();

  /* ══════════════ CONTATO: o céu dos clientes atrás dos buracos negro e branco ══════════════ */
  (function ceuDoContato() {
    var secao = document.getElementById('contato');
    if (!secao) return;
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e) { secao.classList.toggle('in-view', e[0].isIntersecting); }).observe(secao);
    } else {
      secao.classList.add('in-view');
    }
    ceuEstrelado(secao, document.getElementById('ctaEstrelas'),
      [document.getElementById('ctaBrilhoA'), document.getElementById('ctaBrilhoB')], 20261201, 420, false);
    chuvaDeMeteoros(document.getElementById('ctaMeteoros'), secao.clientWidth < 700 ? 6 : 12);
  })();

  /* ══════════════ CICLO DE VIDA: o céu dos clientes e os cards das etapas ══════════════
     Passar o mouse num card (ou focar / tocar) avisa a fase ao planeta (js/planeta-ciclo.js, evento
     "ciclo:fase"), que gira e muda de estação. No celular os cards viram carrossel e a fase acompanha o
     card que está no centro. */
  (function cicloDeVida() {
    var secao = document.getElementById('processo');
    var caixa = document.getElementById('cicloCards');
    if (!secao) return;
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e) { secao.classList.toggle('in-view', e[0].isIntersecting); }).observe(secao);
    } else {
      secao.classList.add('in-view');
    }
    ceuEstrelado(secao, document.getElementById('cicloEstrelas'),
      [document.getElementById('cicloBrilhoA'), document.getElementById('cicloBrilhoB')], 20261122, 420, false);
    chuvaDeMeteoros(document.getElementById('cicloMeteoros'), secao.clientWidth < 700 ? 8 : 14);
    if (!caixa) return;

    var cards = Array.prototype.slice.call(caixa.querySelectorAll('.ciclo-card'));
    var atual = 0;
    window.__cicloFase = 0;
    function mostrar(i) {
      if (i === atual) return;
      atual = i;
      cards.forEach(function (c, k) { c.classList.toggle('is-ativo', k === i); });
      window.__cicloFase = i;
      try { window.dispatchEvent(new CustomEvent('ciclo:fase', { detail: i })); } catch (e) { /* navegador antigo: fica na estação atual */ }
    }
    cards.forEach(function (c) {
      var i = Number(c.dataset.fase);
      c.addEventListener('mouseenter', function () { mostrar(i); });
      c.addEventListener('focus', function () { mostrar(i); });
      c.addEventListener('click', function () { mostrar(i); });
    });

    // cards 3D: inclinam seguindo o mouse (só com mouse)
    if (!reduzido && window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      var GRAUS = 8;
      cards.forEach(function (c) {
        var vidro = c.querySelector('.ciclo-card-inner'), quadro = 0, ultimo = null;
        if (!vidro) return;
        c.addEventListener('mousemove', function (e) {
          ultimo = e;
          if (quadro) return;
          quadro = requestAnimationFrame(function () {
            quadro = 0;
            var r = c.getBoundingClientRect();
            var px = (ultimo.clientX - r.left) / r.width, py = (ultimo.clientY - r.top) / r.height;
            vidro.style.transform = 'perspective(1000px) rotateX(' + ((0.5 - py) * 2 * GRAUS).toFixed(2) + 'deg) rotateY(' +
              ((px - 0.5) * 2 * GRAUS).toFixed(2) + 'deg) translateY(-6px) scale3d(1.02, 1.02, 1.02)';
          });
        });
        c.addEventListener('mouseleave', function () { cancelAnimationFrame(quadro); quadro = 0; vidro.style.transform = ''; });
      });
    }

    // celular: o card no centro do carrossel define a fase
    if ('IntersectionObserver' in window && window.matchMedia && window.matchMedia('(max-width: 900px)').matches) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) mostrar(Number(e.target.dataset.fase)); });
      }, { root: caixa, threshold: 0.7 });
      cards.forEach(function (c) { io.observe(c); });
    }
  })();

  /* ══════════════ DEPOIMENTOS: cartões 3D ══════════════
     Mesma inclinação dos cards de soluções: o cartão gira seguindo o mouse e um
     reflexo de luz acompanha o cursor. Só com mouse (no toque eles só flutuam). */
  (function cartoes3d() {
    if (reduzido || !window.matchMedia || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    var GRAUS = 7;
    document.querySelectorAll('.depo').forEach(function (cartao) {
      var vidro = cartao.querySelector('.depo-inner');
      if (!vidro) return;
      var quadro = 0, ultimo = null;
      cartao.addEventListener('mousemove', function (e) {
        ultimo = e;
        if (quadro) return;
        quadro = requestAnimationFrame(function () {
          quadro = 0;
          var r = cartao.getBoundingClientRect();
          var px = (ultimo.clientX - r.left) / r.width, py = (ultimo.clientY - r.top) / r.height;
          vidro.style.transform = 'perspective(1100px) rotateX(' + ((0.5 - py) * 2 * GRAUS).toFixed(2) + 'deg) rotateY(' +
            ((px - 0.5) * 2 * GRAUS).toFixed(2) + 'deg) scale3d(1.02, 1.02, 1.02)';
          vidro.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
          vidro.style.setProperty('--my', (py * 100).toFixed(1) + '%');
        });
      });
      cartao.addEventListener('mouseleave', function () {
        cancelAnimationFrame(quadro); quadro = 0;
        vidro.style.transform = '';
      });
    });
  })();

  /* ══════════════ DEPOIMENTOS: o avatar vira o rosto para quem visita ══════════════
     Olha as estrelas → vira para a câmera (fica uns segundos) → volta a olhar o céu.
     Troca suave só de opacidade, sem mudar tamanho: os dois quadros têm o mesmo enquadramento.
     Os dois quadros foram alinhados pelo corpo e recortados com o mesmo enquadramento. */
  (function avatarOlha() {
    var caixa = document.getElementById('depoAvatar');
    var secao = document.getElementById('depoimentos');
    if (!caixa || !secao || reduzido || !('IntersectionObserver' in window)) return;
    var ceu = caixa.querySelector('.depo-avatar-quadro:not(.depo-avatar-quadro--olhando)');
    var olhando = caixa.querySelector('.depo-avatar-quadro--olhando');
    if (!ceu || !olhando || !olhando.dataset.src) return;
    // corte seco: o quadro que chega aparece na hora e, um instante depois (quando ele já está
    // na tela), o que sai é tirado — sem fusão e sem momento transparente no meio.
    // O corpo coincide nos dois quadros (foram alinhados), então ele não pula nem muda de tamanho.
    var ENTRA = 0, SAI = 0, ATRASO = 60, OLHANDO = 4200;
    var visivel = false, timer = null, pronta = false;

    function depois(ms, fn) { clearTimeout(timer); timer = setTimeout(fn, ms); }
    function opacidade(img, valor, ms) { img.style.setProperty('--troca', ms + 'ms'); img.style.opacity = valor; }
    function fundir(chega, sai, entao) {
      opacidade(chega, 1, ENTRA);
      depois(ATRASO, function () {
        opacidade(sai, 0, SAI);
        depois(Math.max(ENTRA, ATRASO + SAI) - ATRASO, entao);
      });
    }
    function virarParaCamera() {
      if (!visivel) return;
      fundir(olhando, ceu, function () { depois(OLHANDO, voltarAoCeu); });      // fica olhando uns segundos
    }
    function voltarAoCeu() {
      fundir(ceu, olhando, function () {
        if (visivel) depois(9000 + Math.random() * 6000, virarParaCamera);     // volta a olhar o céu
      });
    }
    function voltarJa() {                                             // saiu da tela: volta ao céu sem animação
      clearTimeout(timer);
      opacidade(ceu, 1, 0); opacidade(olhando, 0, 0);
    }

    // carrega o segundo quadro; se não existir, nada acontece
    var img = new Image();
    img.onload = function () {
      olhando.src = img.src; pronta = true;
      if (visivel) depois(2500, virarParaCamera);
    };
    img.src = olhando.dataset.src;

    new IntersectionObserver(function (e) {
      visivel = e[0].isIntersecting;
      if (!pronta) return;
      if (visivel) depois(2500, virarParaCamera); else voltarJa();
    }, { threshold: 0.3 }).observe(caixa);
  })();

  /* ══════════════ PROJETOS: os palcos com os aparelhos ══════════════
     Com o mouse sobre a cena, o palco inclina de leve e cada peça anda proporcional à
     sua profundidade (--prof no CSS): as que saltam para fora andam mais que os aparelhos.
     A flutuação das peças pausa quando a seção sai da tela (.in-view). */
  (function mockups() {
    var secao = document.getElementById('projetos');
    if (secao && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (e) { secao.classList.toggle('in-view', e[0].isIntersecting); }).observe(secao);
    } else if (secao) {
      secao.classList.add('in-view');
    }
    if (reduzido || !window.matchMedia || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    document.querySelectorAll('.mock-cena').forEach(function (cena) {
      var palco = cena.querySelector('.mock-palco');
      if (!palco) return;
      var quadro = 0, ultimo = null;
      cena.addEventListener('mousemove', function (e) {
        ultimo = e;
        if (quadro) return;
        quadro = requestAnimationFrame(function () {
          quadro = 0;
          var r = palco.getBoundingClientRect();
          var px = Math.max(-0.6, Math.min(0.6, (ultimo.clientX - r.left) / r.width - 0.5));
          var py = Math.max(-0.6, Math.min(0.6, (ultimo.clientY - r.top) / r.height - 0.5));
          palco.style.setProperty('--px', px.toFixed(3));
          palco.style.setProperty('--py', py.toFixed(3));
        });
      });
      cena.addEventListener('mouseleave', function () {
        cancelAnimationFrame(quadro); quadro = 0;
        palco.style.setProperty('--px', '0');
        palco.style.setProperty('--py', '0');
      });
    });
  })();

  /* ══════════════ SOLUÇÕES ENTREGUES: rastros de estrelas em volta do polo ══════════════
     Como uma foto de longa exposição: arcos concêntricos em volta do polo, que acendem do
     rabo para a ponta. São desenhados uma vez num canvas quadrado, grande o bastante para
     cobrir a tela em qualquer ângulo; o giro lento é só CSS (rotate), barato para a placa
     de vídeo. A camada é sticky: fica parada na tela enquanto a seção rola por cima.
     O mesmo céu se repete na seção de segurança, com o polo atrás do Disco de Ouro. */
  rastrosDeEstrelas('vitCeu', 'vitRastros', function () { return [0.5, 0.42]; }, 1122);
  rastrosDeEstrelas('segCeu', 'segRastros', function (w) { return w > 900 ? [0.71, 0.5] : [0.5, 0.36]; }, 1977);
  function rastrosDeEstrelas(idJanela, idTela, polo, semente) {
    var janela = document.getElementById(idJanela);
    var tela = document.getElementById(idTela);
    if (!janela || !tela || !tela.getContext) return;
    var feito = { w: 0, h: 0 };

    function desenhar() {
      var w = janela.clientWidth, h = janela.clientHeight;
      if (!w || !h) return;
      // no celular a barra de endereço muda a altura ao rolar: só redesenha se mudar de verdade
      if (Math.abs(w - feito.w) < 2 && Math.abs(h - feito.h) < 140) return;
      feito = { w: w, h: h };
      var p = polo(w), px = w * p[0], py = h * p[1];   // posição do polo na tela
      var R = Math.ceil(Math.max(Math.hypot(px, py), Math.hypot(w - px, py),
                                 Math.hypot(px, h - py), Math.hypot(w - px, h - py))) + 6;
      var D = 2 * R;
      var esc = Math.min(window.devicePixelRatio || 1, 1.5, 2800 / D);
      tela.width = tela.height = Math.round(D * esc);
      tela.style.width = tela.style.height = D + 'px';
      tela.style.left = (px - R) + 'px';
      tela.style.top = (py - R) + 'px';
      var ctx = tela.getContext('2d');
      ctx.setTransform(esc, 0, 0, esc, 0, 0);
      ctx.clearRect(0, 0, D, D);
      ctx.lineCap = 'round';

      // um brilho bem suave em volta do polo
      var halo = ctx.createRadialGradient(R, R, 0, R, R, R * 0.45);
      halo.addColorStop(0, 'rgba(120, 140, 255, 0.10)');
      halo.addColorStop(1, 'rgba(120, 140, 255, 0)');
      ctx.fillStyle = halo; ctx.fillRect(0, 0, D, D);

      var rnd = sorteio(semente);
      var conico = typeof ctx.createConicGradient === 'function';
      var total = Math.round(D * D / 2600);          // pouco denso: fundo, não protagonista
      for (var i = 0; i < total; i++) {
        var r = 10 + Math.sqrt(rnd()) * (R - 10);
        var ini = rnd() * Math.PI * 2;
        var arco = (0.3 + rnd() * 0.3) * (rnd() < 0.2 ? 0.45 : 1);   // ~17–34° (algumas mais curtas)
        var forca = Math.pow(rnd(), 2.4);
        var alfa = (0.07 + forca * 0.5).toFixed(3);
        var cor = rnd() < 0.12 ? '255, 214, 170' : (rnd() < 0.55 ? '190, 205, 255' : '235, 240, 255');
        ctx.lineWidth = 0.55 + forca * 1.2;
        if (conico) {                                // acende do rabo para a ponta
          var g = ctx.createConicGradient(ini, R, R), fim = arco / (Math.PI * 2);
          g.addColorStop(0, 'rgba(' + cor + ', 0)');
          g.addColorStop(fim * 0.9, 'rgba(' + cor + ', ' + alfa + ')');
          g.addColorStop(fim, 'rgba(' + cor + ', ' + alfa + ')');
          g.addColorStop(Math.min(1, fim + 0.002), 'rgba(' + cor + ', 0)');
          ctx.strokeStyle = g;
        } else {
          ctx.strokeStyle = 'rgba(' + cor + ', ' + (alfa * 0.7).toFixed(3) + ')';
        }
        ctx.beginPath(); ctx.arc(R, R, r, ini, ini + arco); ctx.stroke();
      }
      // a estrela do polo, parada no centro do giro
      var polar = ctx.createRadialGradient(R, R, 0, R, R, 9);
      polar.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      polar.addColorStop(0.25, 'rgba(210, 222, 255, 0.5)');
      polar.addColorStop(1, 'rgba(210, 222, 255, 0)');
      ctx.fillStyle = polar;
      ctx.beginPath(); ctx.arc(R, R, 9, 0, Math.PI * 2); ctx.fill();
    }
    desenhar();
    if ('ResizeObserver' in window) {
      var espera = null;
      new ResizeObserver(function () { clearTimeout(espera); espera = setTimeout(desenhar, 200); }).observe(janela);
    } else {
      window.addEventListener('resize', desenhar, { passive: true });
    }
  }

  /* ══════════════ LISA ASSISTENTE: o destaque da Beyond Software House ══════════════
     O rosto 3D (js/lisa-rosto.js) grande no centro, as tarefas que ela cuida à esquerda e o editor
     onde ela escreve código à direita. O estado da fala fica em window.LisaSinal (falando, nível
     da boca, pensando), para quem quiser reagir a ela.
     Na primeira vez que a cena aparece, ela se apresenta sozinha. Depois o visitante usa a VERSÃO DE
     DEMONSTRAÇÃO, com limites claros: 6 pedidos por visita, respostas prontas (por palavras-chave —
     não é a IA completa), código de uma lista de exemplos, e a voz do próprio navegador (pt-BR).
     Nada do que o visitante escreve sai do navegador. */
  (function lisa() {
    var $ = function (id) { return document.getElementById(id); };
    var hero = $('lisaHero'), palco = $('lisaPalco'), texto = $('lisaTexto');
    if (!hero || !palco || !texto) return;
    var voce = $('lisaVoce'), lista = $('lisaTarefas'), contagem = $('lisaContagem');
    var codigo = $('lisaCodigo'), linhas = $('lisaLinhas'), editor = $('lisaEditor');
    var arquivo = $('lisaArquivo'), gerando = $('lisaGerando');
    var form = $('lisaPergunte'), entrada = $('lisaEntrada'), botaoVoz = $('lisaVoz'), vozTexto = $('lisaVozTexto');
    var restamEl = $('lisaRestam'), fimEl = $('lisaFim'), limitesEl = hero.querySelector('.lisa-limites');
    var enviar = form ? form.querySelector('.lisa-enviar') : null;
    var chips = Array.prototype.slice.call(hero.querySelectorAll('[data-lisa]'));

    /* ── o estado da fala, lido pelo rosto e pelos monitores ── */
    var falando = false, codigoAtivo = false, inicioDaFala = 0, ultimaPalavra = 0, vozAtiva = false;
    function nivelBoca() {
      if (!falando) return 0;
      var agora = performance.now(), t = (agora - inicioDaFala) / 1000;
      var base = 0.35 + 0.55 * Math.abs(Math.sin(t * 9.5) * Math.sin(t * 3.1 + 1));
      if (!vozAtiva) return base;
      var pulso = Math.max(0, 1 - (agora - ultimaPalavra) / 220);     // cada palavra falada abre a boca
      return Math.min(1, base * 0.55 + pulso * 0.55);
    }
    window.LisaSinal = { ler: function () { return { falando: falando, nivel: nivelBoca(), pensando: codigoAtivo }; } };
    function sinal() {
      if (falando) return { estado: 'falando', nivel: nivelBoca() };
      return { estado: codigoAtivo ? 'pensando' : 'pronta', nivel: null };
    }

    /* ── o rosto: só baixa quando chega perto e desmonta quando sai da tela ── */
    var desmontar = null, carregando = false;
    function montar() {
      if (desmontar || !window.LisaRosto || !window.LisaRosto.temWebgl()) return;
      var alvo = palco.querySelector('.lisa-rosto');
      if (!alvo) { alvo = document.createElement('div'); alvo.className = 'lisa-rosto'; palco.appendChild(alvo); }
      try {
        desmontar = window.LisaRosto.montar(alvo, sinal, { paleta: 'holograma', cabelo: 'longo' }, { ocupacao: 0.98 });
        palco.classList.add('is-viva');
      } catch (e) { desmontar = null; }
    }
    function desmontarRosto() {
      if (!desmontar) return;
      try { desmontar(); } catch (e) { /* já saiu */ }
      desmontar = null;
      palco.classList.remove('is-viva');
    }
    function carregar() {
      if (window.LisaRosto) return montar();
      if (carregando) return;
      carregando = true;
      var s = document.createElement('script');
      s.src = 'js/lisa-rosto.js'; s.async = true; s.onload = montar;
      document.body.appendChild(s);
    }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e) { if (e[0].isIntersecting) carregar(); else desmontarRosto(); }, { rootMargin: '300px 0px' }).observe(palco);
    } else { carregar(); }

    /* ── relógio da cena: tudo que está agendado some quando chega um pedido novo ── */
    var timers = [], falaTimer = null, codTimer = null, falaId = 0;
    function depois(ms, fn) { var t = setTimeout(fn, reduzido ? Math.min(ms, 40) : ms); timers.push(t); return t; }
    function cancelarTudo() {
      timers.forEach(clearTimeout); timers = [];
      clearInterval(falaTimer); clearInterval(codTimer);
      falaId++;
      if (synth) synth.cancel();
      falando = false; codigoAtivo = false; vozFalando(false);
      texto.classList.remove('is-digitando');
      if (gerando) gerando.hidden = true;
    }

    /* ── a voz (a do próprio navegador, em português) ── */
    var synth = window.speechSynthesis && window.SpeechSynthesisUtterance ? window.speechSynthesis : null;
    var vozEscolhida = null;
    function escolherVoz() {
      var vs = synth.getVoices() || [];
      var pt = vs.filter(function (v) { return /^pt[-_]?br/i.test(v.lang); });
      if (!pt.length) pt = vs.filter(function (v) { return /^pt/i.test(v.lang); });
      var feminina = /francisca|thalita|maria|luciana|leila|yara|vit[oó]ria|camila|fernanda|helo[ií]sa|google portugu[eê]s do brasil/i;
      vozEscolhida = pt.filter(function (v) { return feminina.test(v.name); })[0] || pt[0] || null;
    }
    if (synth && botaoVoz) {
      escolherVoz();
      if (synth.addEventListener) synth.addEventListener('voiceschanged', escolherVoz); else synth.onvoiceschanged = escolherVoz;
      botaoVoz.hidden = false;
      botaoVoz.addEventListener('click', function () {
        ligarVoz(!vozAtiva);
        if (vozAtiva) { cancelarTudo(); falar('Pronto: agora você ouve a minha voz. Pode perguntar!'); }
        else if (synth) synth.cancel();
      });
    }
    function ligarVoz(sim) {
      vozAtiva = !!(sim && synth);
      if (botaoVoz) botaoVoz.setAttribute('aria-pressed', vozAtiva ? 'true' : 'false');
      if (vozTexto) vozTexto.textContent = vozAtiva ? 'Voz ligada' : 'Ouvir a voz';
    }
    function vozFalando(sim) { if (botaoVoz) botaoVoz.classList.toggle('is-falando', !!sim); }

    /* ── a fala: digitada, ou falada em voz alta com o texto acompanhando as palavras ── */
    function falar(frase, entao) {
      clearInterval(falaTimer);
      if (synth) synth.cancel();
      var id = ++falaId;
      texto.textContent = '';
      texto.classList.add('is-digitando');
      depois(360, function () {
        if (id !== falaId) return;
        falando = true; inicioDaFala = performance.now();
        if (vozAtiva && synth) return falarAlto(frase, id, fim);
        if (reduzido) { texto.textContent = frase; return fim(); }
        var k = 0;
        falaTimer = setInterval(function () {
          k += 2; texto.textContent = frase.slice(0, k);
          if (k >= frase.length) fim();
        }, 24);
      });
      function fim() {
        if (id !== falaId) return;
        clearInterval(falaTimer);
        texto.textContent = frase;
        texto.classList.remove('is-digitando');
        falando = false; vozFalando(false);
        if (entao) depois(260, entao);
      }
    }
    function falarAlto(frase, id, fim) {
      var u = new SpeechSynthesisUtterance(frase), mostrado = 0, temPalavras = false, comecou = false;
      u.lang = 'pt-BR'; if (vozEscolhida) u.voice = vozEscolhida;
      u.rate = 1.04; u.pitch = 1.08;
      // o texto acompanha a fala; se o navegador não avisar as palavras, segue num ritmo de fala
      falaTimer = setInterval(function () {
        if (temPalavras || !comecou) return;
        mostrado = Math.min(frase.length, mostrado + 1); texto.textContent = frase.slice(0, mostrado);
      }, 60);
      u.onstart = function () { comecou = true; vozFalando(true); inicioDaFala = performance.now(); };
      u.onboundary = function (e) {
        if (id !== falaId) return;
        temPalavras = true; comecou = true; ultimaPalavra = performance.now();
        var ate = e.charIndex + (e.charLength || (frase.slice(e.charIndex).search(/\s|$/)) || 1);
        mostrado = Math.max(mostrado, ate); texto.textContent = frase.slice(0, mostrado);
      };
      u.onend = u.onerror = function () { if (id === falaId) fim(); };
      synth.speak(u);
      // se o navegador não começar a falar (sem voz disponível), termina só escrevendo
      depois(2500, function () {
        if (id !== falaId || comecou) return;
        ligarVoz(false); synth.cancel(); fim();
        texto.textContent = 'Seu navegador não liberou a minha voz agora, então sigo escrevendo por aqui.';
      });
    }

    /* ── as tarefas: um exemplo genérico do dia de um time de desenvolvimento ── */
    var TAREFAS = [
      { id: 'testes', txt: 'Escrever os testes da API de pedidos', tag: 'Testes', meta: 'sex' },
      { id: 'erro', txt: 'Corrigir o erro 500 no checkout', tag: 'Bug', meta: '15h' },
      { id: 'pr', txt: 'Revisar o pull request #42', tag: 'Code review', meta: '11h' },
      { id: 'deps', txt: 'Atualizar as dependências do projeto', tag: 'Manutenção', meta: '16h30' }
    ];
    function itemTarefa(t) {
      var li = document.createElement('li');
      li.className = 'lisa-tarefa';
      li.dataset.id = t.id;
      li.innerHTML = '<span class="lisa-check" aria-hidden="true"></span><span><span class="lisa-tarefa-txt"></span><span class="lisa-tarefa-tag"></span></span><span class="lisa-tarefa-meta"></span>';
      li.querySelector('.lisa-tarefa-txt').textContent = t.txt;
      li.querySelector('.lisa-tarefa-tag').textContent = t.tag;
      li.querySelector('.lisa-tarefa-meta').textContent = t.meta;
      return li;
    }
    function contar() {
      if (contagem) contagem.textContent = lista.querySelectorAll('.lisa-tarefa:not(.is-feita)').length + ' pendentes';
    }
    function tarefasIniciais() {
      if (!lista) return;
      lista.innerHTML = '';
      TAREFAS.forEach(function (t) { lista.appendChild(itemTarefa(t)); });
      contar();
    }
    // reordenar com animação (FLIP): mede antes, muda, anima a diferença
    function reordenar(mudar) {
      var itens = Array.prototype.slice.call(lista.children), antes = itens.map(function (li) { return li.getBoundingClientRect().top; });
      mudar();
      itens.forEach(function (li, i) {
        var d = antes[i] - li.getBoundingClientRect().top;
        if (!d || reduzido) return;
        li.style.transition = 'none'; li.style.transform = 'translateY(' + d + 'px)';
        requestAnimationFrame(function () { requestAnimationFrame(function () {
          li.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'; li.style.transform = '';
        }); });
      });
    }
    function cuidarDasTarefas(entao) {
      if (!lista) return entao && entao();
      tarefasIniciais();
      depois(700, function () {                                   // o que já foi feito
        var li = lista.querySelector('[data-id="pr"]'); if (li) li.classList.add('is-feita'); contar();
      });
      depois(1500, function () {                                  // o que vence primeiro sobe
        var li = lista.querySelector('[data-id="erro"]'); if (!li) return;
        reordenar(function () { lista.prepend(li); });
        li.classList.add('is-urgente'); li.querySelector('.lisa-tarefa-meta').textContent = 'prioridade';
      });
      depois(2400, function () {                                  // e um lembrete novo
        var li = itemTarefa({ id: 'docs', txt: 'Documentar a rota /pedidos', tag: 'criada pela Lisa', meta: 'amanhã 10h' });
        li.classList.add('is-nova');
        reordenar(function () { lista.insertBefore(li, lista.children[1] || null); });
        contar();
      });
      if (entao) depois(3000, entao);
    }

    /* ── os códigos de exemplo (linhas curtas: cabem no painel sem quebrar) ── */
    var CODIGOS = {
      cep: { nome: 'busca de CEP', artigo: 'uma', arquivo: 'buscar-cep.js', lingua: 'js',
        fala: 'Fiz uma função que busca o endereço pelo CEP na API pública do ViaCEP. Ela limpa o que não é número e avisa se o CEP não existir.',
        texto: [
        '// Busca o endereço pelo CEP (ViaCEP)',
        'async function buscarCep(cep) {',
        "  const limpo = cep.replace(/\\D/g, '');",
        '  const url =',
        '    `https://viacep.com.br/ws/${limpo}/json/`;',
        '  const resp = await fetch(url);',
        '  const dados = await resp.json();',
        '  if (dados.erro) {',
        "    throw new Error('CEP não encontrado');",
        '  }',
        '  return `${dados.logradouro} - ${dados.uf}`;',
        '}',
        '',
        "buscarCep('01001-000');",
        "// → 'Praça da Sé - SP'"].join('\n') },
      email: { nome: 'validação de e-mail', artigo: 'uma', arquivo: 'email-valido.js', lingua: 'js',
        fala: 'Aqui está uma validação de e-mail: confere se tem texto, arroba, domínio e ponto, sem espaços.',
        texto: [
        '// Confere se o e-mail tem um formato válido',
        'function emailValido(email) {',
        '  const padrao = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;',
        '  return padrao.test(email.trim());',
        '}',
        '',
        "emailValido('ana@empresa.com'); // → true",
        "emailValido('ana@empresa');     // → false"].join('\n') },
      moeda: { nome: 'formatador em reais', artigo: 'um', arquivo: 'formatar-real.js', lingua: 'js',
        fala: 'Um formatador de dinheiro em reais, com o separador de milhar e os centavos do jeito brasileiro.',
        texto: [
        '// Formata números como dinheiro (R$)',
        "const brl = new Intl.NumberFormat('pt-BR', {",
        "  style: 'currency',",
        "  currency: 'BRL',",
        '});',
        '',
        'brl.format(1234.5);  // → R$ 1.234,50',
        'brl.format(5817);    // → R$ 5.817,00'].join('\n') },
      vendas: { nome: 'ranking de vendas', artigo: 'um', arquivo: 'ranking-vendas.js', lingua: 'js',
        fala: 'Escrevi uma função que soma as vendas por vendedor e devolve o ranking do mês, do maior para o menor. Dá pra plugar direto no seu CRM.',
        texto: [
        '// Ranking de vendas do mês por vendedor',
        'function rankingDeVendas(vendas) {',
        '  const total = {};',
        '  for (const v of vendas) {',
        '    total[v.vendedor] =',
        '      (total[v.vendedor] || 0) + v.valor;',
        '  }',
        '  return Object.entries(total)',
        '    .map(([nome, soma]) =>',
        '      ({ nome, soma }))',
        '    .sort((a, b) => b.soma - a.soma);',
        '}',
        '',
        'rankingDeVendas(vendasDoMes);',
        "// → [{ nome: 'Ana', soma: 18450 }, …]"].join('\n') },
      sql: { nome: 'consulta SQL', artigo: 'uma', arquivo: 'clientes-inativos.sql', lingua: 'sql',
        fala: 'Aqui está a consulta dos clientes que não compram há mais de 30 dias — ótima pra uma campanha de reativação.',
        texto: [
        '-- Clientes sem compra há mais de 30 dias',
        'SELECT c.nome,',
        '       c.telefone,',
        '       MAX(p.criado_em) AS ultima_compra',
        'FROM clientes c',
        'JOIN pedidos p ON p.cliente_id = c.id',
        'GROUP BY c.id, c.nome, c.telefone',
        'HAVING MAX(p.criado_em) <',
        "       NOW() - INTERVAL '30 days'",
        'ORDER BY ultima_compra;'].join('\n') },
      whats: { nome: 'botão de WhatsApp', artigo: 'um', arquivo: 'BotaoWhatsApp.jsx', lingua: 'jsx',
        fala: 'Um componente React que abre o WhatsApp com a mensagem pronta. É só passar o número e o texto.',
        texto: [
        '// Abre o WhatsApp com a mensagem pronta',
        'export function Whats({ numero, msg }) {',
        '  const link = `https://wa.me/${numero}` +',
        '    `?text=${encodeURIComponent(msg)}`;',
        '',
        '  return (',
        '    <a href={link} target="_blank"',
        '       className="btn-whats">',
        '      Chamar no WhatsApp',
        '    </a>',
        '  );',
        '}'].join('\n') }
    };
    var ORDEM = ['cep', 'email', 'moeda', 'vendas', 'sql', 'whats'], mostrados = {};
    var KW_JS = ' const let var function return if else for of in new export import from async await true false null undefined throw ';
    var KW_SQL = ' SELECT FROM JOIN ON GROUP BY HAVING ORDER WHERE AS AND OR NOW INTERVAL MAX COUNT SUM LEFT INNER LIMIT DESC ';
    function tokens(src, lingua) {
      var re = lingua === 'sql'
        ? /(--[^\n]*)|('(?:[^'\\]|\\.)*')|(\b\d+\b)|([A-Za-z_][\w]*)|(\s+)|([^\w\s])/g
        : /(\/\/[^\n]*)|(`(?:[^`\\]|\\.)*`|'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")|(\b\d+\b)|([A-Za-z_$][\w$]*)|(\s+)|([^\w\s])/g;
      var out = [], m, ant = '';
      while ((m = re.exec(src))) {
        var c = '';
        if (m[1]) c = 'com';
        else if (m[2]) c = 'str';
        else if (m[3]) c = 'num';
        else if (m[4]) {
          var w = m[4], prox = src.charAt(re.lastIndex);
          if (lingua === 'sql') c = KW_SQL.indexOf(' ' + w + ' ') >= 0 ? 'kw' : '';
          else if (KW_JS.indexOf(' ' + w + ' ') >= 0) c = 'kw';
          else if (lingua === 'jsx' && (ant === '<' || ant === '</')) c = 'tag';
          else if (lingua === 'jsx' && prox === '=') c = 'attr';
          else if (prox === '(') c = 'fn';
        } else if (m[6]) c = 'pt';
        var t = m[0];
        if (m[6] && t === '/' && ant === '<') { out[out.length - 1].t += '/'; ant = '</'; continue; }
        out.push({ t: t, c: c });
        if (!m[5]) ant = t;
      }
      return out;
    }
    function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
    function escrever(cod, entao) {
      if (!codigo) return entao && entao();
      clearInterval(codTimer);
      var tk = tokens(cod.texto, cod.lingua), total = cod.texto.length, n = 0;
      if (arquivo) arquivo.textContent = cod.arquivo;
      if (gerando) gerando.hidden = false;
      codigoAtivo = true;
      function desenhar(lim) {
        var html = '', usado = 0, txt = '';
        for (var i = 0; i < tk.length && usado < lim; i++) {
          var parte = tk[i].t.slice(0, lim - usado); usado += parte.length; txt += parte;
          html += tk[i].c ? '<span class="tk-' + tk[i].c + '">' + esc(parte) + '</span>' : esc(parte);
        }
        codigo.innerHTML = html + (lim < total ? '<span class="lisa-caret"></span>' : '');
        if (linhas) { var q = txt.split('\n').length, num = []; for (var j = 1; j <= q; j++) num.push(j); linhas.textContent = num.join('\n'); }
        if (editor) editor.scrollTop = editor.scrollHeight;
      }
      if (reduzido) { desenhar(total); return pronto(); }
      codTimer = setInterval(function () { n += 3; desenhar(n); if (n >= total) pronto(); }, 20);
      function pronto() {
        clearInterval(codTimer); desenhar(total);
        codigoAtivo = false; if (gerando) gerando.hidden = true;
        if (entao) depois(300, entao);
      }
    }
    function gerarCodigo(chave) {
      var cod = CODIGOS[chave];
      mostrados[chave] = true;
      falar(cod.fala);
      escrever(cod);
    }
    function lista6() { return ORDEM.map(function (k) { return CODIGOS[k].nome; }).join(', '); }

    /* ── as respostas da demonstração ── */
    var RESPOSTAS = {
      ola: function () { falar('Oi! Eu sou a Lisa, a assistente da Beyond. Eu cuido das suas tarefas — organizo, lembro e aviso o que vence — e escrevo código com você, explicando cada passo.'); },
      falar: function () {
        if (!synth) return falar('Seu navegador não tem voz disponível, então vou escrevendo. Na versão completa a gente conversa por voz de verdade: você fala e eu respondo.');
        ligarVoz(true);
        falar('Prontinho, agora você ouve a minha voz! Na versão completa a gente conversa por voz de verdade: você fala, eu respondo e ainda vejo a sua tela quando você pede ajuda.');
      },
      codigo: function () {
        var chave = ORDEM.filter(function (k) { return !mostrados[k]; })[0] || ORDEM[(Math.random() * ORDEM.length) | 0];
        var cod = CODIGOS[chave];
        mostrados[chave] = true;
        falar('Gerei ' + cod.artigo + ' ' + cod.nome + '. Também sei fazer: ' + lista6() + '. É só pedir pelo nome.');
        escrever(cod);
      },
      tarefas: function () {
        falar('Olhei o quadro do time: marquei a revisão do pull request #42 como feita, subi o erro 500 do checkout — é a prioridade de hoje — e criei uma tarefa para documentar a rota /pedidos.');
        cuidarDasTarefas();
      },
      beyond: function () { falar('A Beyond Bits cria sistemas sob medida, sites que trazem clientes e assistentes com IA — como eu. Tudo pensado para a rotina de cada empresa, com segurança e LGPD desde a primeira linha.'); },
      processo: function () { falar('São três etapas: imersão e arquitetura, desenvolvimento em ciclos — você testa cada módulo assim que fica pronto — e homologação com implantação. Sem caixa preta do começo ao fim.'); },
      preco: function () { falar('Preço eu não passo por aqui: cada projeto é feito sob medida. A primeira conversa de diagnóstico é sem custo — é só chamar a Beyond no WhatsApp.'); },
      seguranca: function () { falar('Segurança entra desde a primeira linha de código: LGPD por princípio, dados criptografados, backups automáticos e o código fica com a sua empresa.'); },
      contato: function () { falar('É só chamar a Beyond pelo botão de WhatsApp do site ou escrever para beyondbitsltda@gmail.com. A primeira conversa é sem custo.'); },
      recursos: function () { falar('Na versão completa eu converso por voz, leio seus quadros e documentos, vejo a tela quando você pede ajuda e escrevo código enquanto explico. Aqui é só uma amostra.'); },
      aberto: function () { falar('Eu vou ganhar uma versão de código aberto. Quando sair, a Beyond avisa por aqui.'); },
      limites: function () { falar('Nesta demonstração eu respondo sobre a Beyond e sobre mim, cuido das tarefas do exemplo e gero código de uma lista pronta: ' + lista6() + '. São 6 pedidos por visita.'); },
      obrigado: function () { falar('De nada! Se quiser me ver trabalhando de verdade no seu negócio, chama a Beyond no WhatsApp.'); },
      fora: function () { falar('Isso fica fora do que eu sei nesta demonstração. Aqui eu falo sobre a Beyond e sobre mim, cuido das tarefas e gero código de exemplo — tenta “busca de CEP” ou “o que a Beyond faz?”.'); }
    };
    function entender(frase) {
      var f = ' ' + frase.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '') + ' ';
      if (/\bcep\b|endereco|viacep/.test(f)) return 'c:cep';
      if (/(valid|confer|verific|checa).*e-?mail|e-?mail.*(valid|confer)/.test(f)) return 'c:email';
      if (/moeda|reais|\breal\b|dinheiro|r\$|currency|format\w* (valor|preco|numero)/.test(f)) return 'c:moeda';
      if (/ranking|vendas|vendedor|somar? /.test(f)) return 'c:vendas';
      if (/sql|consulta|select|banco de dados|inativ/.test(f)) return 'c:sql';
      if (/(botao|link|componente|react|codigo).*whats|whats.*(botao|link|componente)/.test(f)) return 'c:whats';
      if (/tarefa|agenda|lembr|organiz|semana|reuniao|pendenc|cuida/.test(f)) return 'tarefas';
      if (/preco|quanto custa|valor|orcamento|custo|caro|barato/.test(f)) return 'preco';
      if (/seguranc|lgpd|privacidade|criptograf|backup|meus dados/.test(f)) return 'seguranca';
      if (/processo|etapa|como funciona|quanto tempo|metodolog|prazo/.test(f)) return 'processo';
      if (/contato|whats|telefone|e-?mail|falar com (alguem|voces|a beyond)|chamar|humano|atendente/.test(f)) return 'contato';
      if (/codigo aberto|open ?source|github|gratis|gratuit/.test(f)) return 'aberto';
      if (/limite|pedidos|o que voce nao|nao sabe|demonstra/.test(f)) return 'limites';
      if (/codig|funcao|script|javascript|\bjs\b|program|exemplo|gera\w* (um|algo)|faz\w* um/.test(f)) return 'codigo';
      if (/beyond|empresa|voces fazem|servico|\bsites?\b|sistema|aplicativo|\bapp\b|software/.test(f)) return 'beyond';
      if (/o que voce (sabe|consegue|pode)|funcionalidade|recurso|completa|documento|quadro|\btela\b/.test(f)) return 'recursos';
      if (/\boi\b|\bola\b|quem|apresent|bom dia|boa tarde|boa noite|\be ai\b/.test(f)) return 'ola';
      if (/fala|fale|\bvoz\b|ouvir|escut|diga|\bdiz\b|conversa/.test(f)) return 'falar';
      if (/obrigad|valeu|\bshow\b|legal|\btop\b|massa|incrivel/.test(f)) return 'obrigado';
      return 'fora';
    }

    /* ── os limites: 6 pedidos por visita (guardados na sessão do navegador) ── */
    var LIMITE = 6, CHAVE = 'beyond-lisa-pedidos', usados = 0;
    try { usados = Math.min(LIMITE, parseInt(sessionStorage.getItem(CHAVE) || '0', 10) || 0); } catch (e) { usados = 0; }
    function mostrarLimite() {
      if (restamEl) restamEl.textContent = String(LIMITE - usados);
      var acabou = usados >= LIMITE;
      if (limitesEl) limitesEl.classList.toggle('is-acabou', acabou);
      if (!acabou) return;
      chips.forEach(function (b) { b.disabled = true; });
      if (entrada) { entrada.disabled = true; entrada.placeholder = 'Os pedidos desta demonstração acabaram'; }
      if (enviar) enviar.disabled = true;
      if (fimEl) fimEl.hidden = false;
    }
    function pedir(acao, pergunta) {
      if (usados >= LIMITE) return;
      apresentou = true;
      usados++;
      try { sessionStorage.setItem(CHAVE, String(usados)); } catch (e) { /* sem sessão: conta só nesta página */ }
      cancelarTudo();
      if (voce) { voce.textContent = pergunta || ''; voce.hidden = !pergunta; }
      chips.forEach(function (b) { b.classList.toggle('is-ativo', b.dataset.lisa === acao); });
      if (acao.indexOf('c:') === 0) gerarCodigo(acao.slice(2));
      else (RESPOSTAS[acao] || RESPOSTAS.fora)();
      mostrarLimite();
    }
    chips.forEach(function (b) { b.addEventListener('click', function () { pedir(b.dataset.lisa, b.textContent); }); });
    if (form && entrada) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var q = entrada.value.trim();
        if (!q) { entrada.focus(); return; }
        entrada.value = '';
        pedir(entender(q), q);
      });
    }

    /* ── a apresentação: uma vez, quando a cena aparece (não conta nos pedidos) ── */
    var apresentou = false;
    tarefasIniciais();
    mostrarLimite();
    function apresentar() {
      if (apresentou) return;
      apresentou = true;
      falar('Oi! Eu sou a Lisa, a assistente da Beyond. Deixa eu te mostrar o que eu faço.', function () {
        depois(500, function () {
          falar('Primeiro: eu cuido das tarefas do time. Marco o que já foi feito, subo o que é prioridade, como um bug em produção, e crio as próximas.');
          cuidarDasTarefas(function () {
            depois(1200, function () {
              falar('E escrevo código com você. Olha um ranking de vendas saindo agora:');
              mostrados.vendas = true;
              escrever(CODIGOS.vendas, function () {
                depois(700, function () {
                  falar(usados >= LIMITE ? 'Os pedidos desta visita acabaram, mas a versão completa te espera.'
                    : 'Agora é com você: aqui embaixo tem ' + (LIMITE - usados) + ' pedidos pra me testar. Se quiser, ligue a minha voz.');
                });
              });
            });
          });
        });
      });
    }
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (e) {
        if (e[0].isIntersecting) { io.disconnect(); depois(600, apresentar); }
      }, { threshold: 0.35 });
      io.observe(hero.querySelector('.lisa-cena') || hero);
    } else { apresentar(); }
  })();

  /* ══════════════ LISA PROOF: a trilha com a Lisa, o avatar do app ══════════════
     A trilha "JavaScript do zero": lições feitas (lima), a atual (acesa, pulsando) e as trancadas.
     A Lisa (o mesmo desenho do Lisa Proof) fica em cima da lição atual e comenta tudo, mudando de humor
     (feliz, comemorando, surpresa, pensando, triste). Tocar na lição atual abre o quiz dela; acertando,
     a lição é concluída, a próxima libera e a Lisa pula para lá. */
  (function proof() {
    var app = document.getElementById('proofApp');
    var trilha = document.getElementById('proofTrilha');
    var caminho = document.getElementById('proofCaminho');
    var neuro = document.getElementById('proofNeuro');
    var fala = document.getElementById('proofFala');
    if (!app || !trilha || !caminho || !neuro) return;
    var el = {
      licao: document.getElementById('proofLicao'), fechar: document.getElementById('proofFechar'),
      barra: document.getElementById('proofBarra'), rotulo: document.getElementById('proofRotulo'),
      pergunta: document.getElementById('proofPergunta'), opcoes: document.getElementById('proofOpcoes'),
      pontos: document.getElementById('proofPontos'), ofensiva: document.getElementById('proofOfensiva'),
      feitas: document.getElementById('proofFeitas'), ganho: document.getElementById('proofGanho')
    };
    var LICOES = [
      { nome: 'Variáveis' }, { nome: 'Condições' },
      { nome: 'Laços', qs: [
        { p: 'Quantas vezes o laço <code>for (let i = 0; i &lt; 3; i++)</code> roda?', o: ['2', '3', '4', 'Para sempre'], c: 1 },
        { p: 'Qual laço é o ideal para passar por cada item de um array?', o: ['for…of', 'if', 'switch', 'while (true)'], c: 0 }] },
      { nome: 'Funções', qs: [
        { p: 'O que o <code>return</code> faz numa função?', o: ['Repete a função', 'Devolve um valor e encerra', 'Cria uma variável', 'Mostra no console'], c: 1 },
        { p: 'Como se chama o valor que você passa ao chamar uma função?', o: ['Argumento', 'Retorno', 'Escopo', 'Laço'], c: 0 }] },
      { nome: 'Arrays', qs: [
        { p: 'Qual método devolve um array novo só com os itens que passam num teste?', o: ['map()', 'filter()', 'reduce()', 'forEach()'], c: 1 },
        { p: 'Qual é o índice do primeiro item de um array?', o: ['1', '0', '-1', 'Depende'], c: 1 }] },
      { nome: 'Objetos', qs: [
        { p: 'Como pegar o nome em <code>const c = { nome: \'Ana\' }</code>?', o: ['c[nome]', 'c.nome', 'c->nome', 'nome.c'], c: 1 },
        { p: 'O que <code>Object.keys(obj)</code> devolve?', o: ['Os valores', 'As chaves', 'O tamanho', 'Uma cópia'], c: 1 }] },
      { nome: 'Projeto final', trofeu: true, qs: [
        { p: 'Para somar o total de um carrinho, qual método junta tudo num valor só?', o: ['reduce()', 'filter()', 'find()', 'sort()'], c: 0 },
        { p: 'Onde guardar o carrinho para ele continuar lá depois de recarregar a página?', o: ['Numa variável', 'No localStorage', 'No console', 'Num comentário'], c: 1 }] }
    ];
    var LETRAS = ['A', 'B', 'C', 'D'];
    var INICIO = { atual: 2, pontos: 1240, ofensiva: 12 };
    var atual = INICIO.atual, pontos = INICIO.pontos, ofensiva = INICIO.ofensiva, subiuHoje = false;
    var fmt = function (n) { return n.toLocaleString('pt-BR'); };
    var ICONES = {
      feita: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
      atual: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z"/></svg>',
      trancada: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
      trofeu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8 20h8"/></svg>'
    };

    // os nós da trilha
    var nos = LICOES.map(function (l, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'proof-no' + (l.trofeu ? ' is-trofeu' : '');
      b.innerHTML = '<span class="proof-no-icone"></span><span class="proof-no-nome"></span>';
      b.querySelector('.proof-no-nome').textContent = l.nome;
      b.addEventListener('click', function () { tocar(i); });
      trilha.insertBefore(b, neuro);
      return b;
    });
    var pontosTrilha = [], vertical = false;
    var NS = 'http://www.w3.org/2000/svg';
    var trilho = document.createElementNS(NS, 'path'); trilho.setAttribute('class', 'trilho');
    var feito = document.createElementNS(NS, 'path'); feito.setAttribute('class', 'trilho-feito');
    caminho.appendChild(trilho); caminho.appendChild(feito);

    function caminhoPor(pts) {                               // curva suave passando pelos pontos
      var d = 'M' + pts[0].x.toFixed(1) + ' ' + pts[0].y.toFixed(1);
      for (var i = 0; i < pts.length - 1; i++) {
        var p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
        d += ' C' + (p1.x + (p2.x - p0.x) / 6).toFixed(1) + ' ' + (p1.y + (p2.y - p0.y) / 6).toFixed(1) + ' ' +
             (p2.x - (p3.x - p1.x) / 6).toFixed(1) + ' ' + (p2.y - (p3.y - p1.y) / 6).toFixed(1) + ' ' + p2.x.toFixed(1) + ' ' + p2.y.toFixed(1);
      }
      return d;
    }
    function layout() {
      var W = trilha.clientWidth, H = trilha.clientHeight, n = LICOES.length;
      if (!W || !H) return;
      vertical = W < 520;
      pontosTrilha = [];
      for (var i = 0; i < n; i++) {
        var t = i / (n - 1);
        pontosTrilha.push(vertical
          ? { x: W / 2 + Math.sin(t * Math.PI * 2.4) * W * 0.26, y: 200 + t * (H - 270) }
          : { x: 50 + t * (W - 100), y: H * 0.71 + Math.sin(t * Math.PI * 2.2 + 0.4) * H * 0.13 });
      }
      nos.forEach(function (b, i) { b.style.left = pontosTrilha[i].x + 'px'; b.style.top = pontosTrilha[i].y + 'px'; });
      caminho.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
      trilho.setAttribute('d', caminhoPor(pontosTrilha));
      atualizarFeito();
      posicionarNeuro();
    }
    function atualizarFeito() {
      var ate = Math.min(atual, LICOES.length - 1);
      if (ate < 1 || !pontosTrilha.length) { feito.setAttribute('d', ''); return; }
      feito.setAttribute('d', caminhoPor(pontosTrilha.slice(0, ate + 1)));
    }
    function posicionarNeuro() {
      var i = Math.min(atual, LICOES.length - 1), p = pontosTrilha[i];
      if (!p) return;
      var W = trilha.clientWidth, x, y;
      if (vertical) { x = -14; y = -4; }                   // no celular, fixa no topo da trilha
      else { var tam = neuro.offsetWidth || 132; x = p.x - tam / 2; y = p.y - 34 - tam * 0.915; }   // no computador, com os pés em cima da lição atual
      neuro.style.left = x + 'px';
      neuro.style.top = y + 'px';
      neuro.classList.toggle('balao-lado', vertical);
      var meio = x + (neuro.offsetWidth || 132) / 2;
      neuro.classList.toggle('balao-esq', !vertical && meio > W - 140);
      neuro.classList.toggle('balao-dir', !vertical && meio < 140);
    }
    function desenharNos() {
      nos.forEach(function (b, i) {
        var l = LICOES[i], st = i < atual ? 'feita' : (i === atual ? 'atual' : 'trancada');
        b.classList.toggle('is-feita', st === 'feita');
        b.classList.toggle('is-atual', st === 'atual');
        b.classList.toggle('is-trancada', st === 'trancada');
        b.querySelector('.proof-no-icone').innerHTML = l.trofeu && st !== 'atual' ? ICONES.trofeu : ICONES[st];
        b.setAttribute('aria-label', l.nome + (st === 'feita' ? ' — concluída' : st === 'atual' ? ' — começar' : ' — trancada'));
      });
      if (el.feitas) el.feitas.textContent = String(Math.min(atual, LICOES.length));
      atualizarFeito();
    }
    // o humor da Lisa: um de base (normal; "pensando" com a lição aberta) e um passageiro por 2,4 s
    var humorTimer = null, HUMORES = ['normal', 'feliz', 'comemorando', 'surpreso', 'pensando', 'triste'];
    function humor(h) {
      HUMORES.forEach(function (x) { neuro.classList.remove('humor-' + x); });
      void neuro.offsetWidth;                                  // reinicia a animação do pulo
      neuro.classList.add('humor-' + h);
    }
    function humorBase() { return el.licao && !el.licao.hidden ? 'pensando' : 'normal'; }
    function dizer(frase, h) {
      if (fala) fala.innerHTML = frase;
      clearTimeout(humorTimer);
      humor(h || humorBase());
      if (h) humorTimer = setTimeout(function () { humor(humorBase()); }, 2400);
    }
    function convite() {
      if (atual >= LICOES.length) return dizer('Trilha completa! Você desbloqueou o troféu. 🏆', 'feliz');
      dizer('Bora? Agora é <b>' + LICOES[atual].nome + '</b>. Toca no círculo aceso!');
    }

    /* a lição */
    var q = 0, acertos = 0;
    function tocar(i) {
      if (i < atual) return dizer('<b>' + LICOES[i].nome + '</b>: essa você já domina. ✔', 'feliz');
      if (i > atual) return dizer('Ei, essa ainda está trancada. Termina <b>' + LICOES[atual].nome + '</b> primeiro!', 'surpreso');
      abrir();
    }
    function abrir() {
      q = 0; acertos = 0;
      el.licao.hidden = false;
      dizer('Você consegue! Lê com calma.');
      mostrar();
      var b = el.opcoes.querySelector('button'); if (b) b.focus();
    }
    function fechar() { el.licao.hidden = true; convite(); var b = nos[Math.min(atual, nos.length - 1)]; if (b) b.focus(); }
    if (el.fechar) el.fechar.addEventListener('click', fechar);
    function mostrar() {
      var l = LICOES[atual], pq = l.qs[q];
      el.barra.style.width = (q / l.qs.length * 100) + '%';
      el.rotulo.textContent = 'Lição · ' + l.nome + ' · ' + (q + 1) + '/' + l.qs.length;
      el.pergunta.innerHTML = pq.p;
      el.opcoes.innerHTML = '';
      pq.o.forEach(function (txt, k) {
        var b = document.createElement('button');
        b.type = 'button'; b.className = 'proof-opcao';
        b.innerHTML = '<span class="proof-letra">' + LETRAS[k] + '</span><span></span>';
        b.lastChild.textContent = txt;
        b.addEventListener('click', function () { responder(k); });
        el.opcoes.appendChild(b);
      });
    }
    function responder(k) {
      var l = LICOES[atual], pq = l.qs[q];
      el.opcoes.querySelectorAll('.proof-opcao').forEach(function (b, j) {
        b.disabled = true;
        if (j === pq.c) b.classList.add('is-certa'); else if (j === k) b.classList.add('is-errada');
      });
      if (k === pq.c) { acertos++; dizer(['Isso! Mandou bem.', 'Certinho! 🔥', 'Exato!'][q % 3], 'feliz'); }
      else dizer('Quase! A certa era <b>' + pq.o[pq.c] + '</b>.', 'surpreso');
      el.barra.style.width = ((q + 1) / l.qs.length * 100) + '%';
      setTimeout(function () {
        q++;
        if (q < l.qs.length) mostrar(); else concluir();
      }, reduzido ? 300 : 1300);
    }
    function concluir() {
      var l = LICOES[atual], passou = acertos >= Math.ceil(l.qs.length / 2);
      if (passou) {
        var ganho = acertos * 15;
        pontos += ganho; el.pontos.textContent = fmt(pontos);
        if (!subiuHoje) { subiuHoje = true; ofensiva++; el.ofensiva.textContent = String(ofensiva); }
        el.ganho.textContent = '+' + ganho + ' pts';
        el.ganho.classList.remove('is-subindo'); void el.ganho.offsetWidth; el.ganho.classList.add('is-subindo');
      }
      el.pergunta.innerHTML = '';
      el.rotulo.textContent = 'Lição · ' + l.nome;
      el.opcoes.innerHTML = '<div class="proof-fim"><strong></strong><p></p><button type="button" class="proof-botao"></button></div>';
      var fim = el.opcoes.querySelector('.proof-fim');
      fim.querySelector('strong').textContent = acertos + ' de ' + l.qs.length + (passou ? ' · lição concluída' : '');
      fim.querySelector('p').textContent = passou
        ? (atual + 1 < LICOES.length ? 'A próxima lição já está liberada na trilha.' : 'Você chegou ao fim da trilha!')
        : 'Quase lá — tenta de novo, a Lisa espera.';
      var botao = fim.querySelector('button');
      botao.textContent = passou ? 'Continuar' : 'Tentar de novo';
      botao.addEventListener('click', function () {
        if (!passou) return abrir();
        el.licao.hidden = true;
        atual++;
        desenharNos();
        posicionarNeuro();
        if (atual >= LICOES.length) {
          dizer('Trilha completa! Você desbloqueou o troféu. 🏆', 'comemorando');
          setTimeout(oferecerRecomeco, reduzido ? 100 : 2600);
        } else {
          dizer('Lição concluída! Pula comigo: agora é <b>' + LICOES[atual].nome + '</b>.', 'comemorando');
        }
        var b = nos[Math.min(atual, nos.length - 1)]; if (b) b.focus();
      });
      botao.focus();
      dizer(passou ? 'Arrasou! 🎉' : 'Não desanima, todo mundo erra no começo.', passou ? 'comemorando' : 'triste');
    }
    function oferecerRecomeco() {
      if (fala) {
        fala.innerHTML = 'Trilha completa! 🏆 <button type="button" class="proof-botao" style="margin-top:8px;padding:7px 14px;font-size:.6rem">Recomeçar</button>';
        fala.querySelector('button').addEventListener('click', function () {
          atual = INICIO.atual; pontos = INICIO.pontos; ofensiva = INICIO.ofensiva; subiuHoje = false;
          el.pontos.textContent = fmt(pontos); el.ofensiva.textContent = String(ofensiva);
          desenharNos(); posicionarNeuro(); convite();
        });
      }
    }

    desenharNos();
    layout();
    convite();
    if ('ResizeObserver' in window) new ResizeObserver(layout).observe(trilha);
    else window.addEventListener('resize', layout, { passive: true });
  })();

  /* ══════════════ ABACATO: os quadros da equipe ══════════════
     Três quadros (Comercial, Projetos, Marketing) na lateral. Os cards se arrastam entre as colunas
     (ou andam uma coluna com um toque / Enter), dá para adicionar card e pedir para a Lisa criar. */
  (function abacato() {
    var app = document.getElementById('abaApp');
    if (!app) return;
    var quadros = Array.prototype.slice.call(app.querySelectorAll('.aba-quadro'));
    var botoes = Array.prototype.slice.call(app.querySelectorAll('.aba-quadro-btn'));
    var nome = document.getElementById('abaNome');
    var botaoLisa = document.getElementById('abaLisa');
    var rotuloLisa = document.getElementById('abaLisaTexto');
    var ativo = quadros[0], arr = null;

    function colunas(q) { return Array.prototype.slice.call((q || ativo).querySelectorAll('.aba-coluna')); }
    function listaDe(coluna) { return coluna.querySelector('.aba-lista'); }
    function contar() {
      quadros.forEach(function (q) {
        var total = 0;
        colunas(q).forEach(function (c) {
          var n = c.querySelectorAll('.aba-card').length; total += n;
          c.querySelector('.aba-titulo').setAttribute('data-qtd', n);
        });
        var b = app.querySelector('.aba-quadro-btn[data-quadro="' + q.dataset.quadro + '"] .aba-qtd');
        if (b) b.textContent = total;
      });
    }
    function mover(card, coluna, foco) {
      listaDe(coluna).appendChild(card);
      card.classList.remove('is-nova'); void card.offsetWidth; card.classList.add('is-nova');
      contar();
      if (foco) card.focus();
    }
    function proximaColuna(card) {
      var cs = colunas(), i = cs.indexOf(card.closest('.aba-coluna'));
      return cs[(i + 1) % cs.length];
    }
    function limparAlvo() { colunas().forEach(function (c) { c.classList.remove('is-alvo'); }); }

    // trocar de quadro
    var PEDIDOS = {
      comercial: [{ pedido: '“Lisa, cria um card pra ligar pro cliente amanhã”', cards: [{ t: 'Ligar para o cliente', m: 'amanhã 10h' }] },
                  { pedido: '“Lisa, lembra de cobrar o retorno da proposta”', cards: [{ t: 'Cobrar retorno da proposta', m: 'sex' }] }],
      projetos: [{ pedido: '“Lisa, quebra a landing em tarefas”', cards: [{ t: 'Landing: textos do topo', m: 'hoje' }, { t: 'Landing: formulário', m: 'amanhã' }] }],
      marketing: [{ pedido: '“Lisa, sugere um post pra essa semana”', cards: [{ t: '3 sinais de que você precisa de um sistema', m: 'qui' }] }]
    };
    var feitos = { comercial: 0, projetos: 0, marketing: 0 };
    function atualizarLisa() {
      if (!botaoLisa || !rotuloLisa) return;
      var lista = PEDIDOS[ativo.dataset.quadro] || [], i = feitos[ativo.dataset.quadro] || 0;
      rotuloLisa.textContent = lista[i] ? lista[i].pedido : '✓ Pronto — os cards estão na primeira coluna';
      botaoLisa.disabled = !lista[i];
    }
    function abrirQuadro(id) {
      var q = app.querySelector('.aba-quadro[data-quadro="' + id + '"]');
      if (!q || q === ativo) return;
      ativo.hidden = true; ativo.classList.remove('is-ativo');
      q.hidden = false; q.classList.add('is-ativo');
      q.classList.remove('is-entrando'); void q.offsetWidth; q.classList.add('is-entrando');
      ativo = q;
      botoes.forEach(function (b) { var on = b.dataset.quadro === id; b.classList.toggle('is-ativo', on); b.setAttribute('aria-selected', on ? 'true' : 'false'); });
      if (nome) nome.textContent = botoes.filter(function (b) { return b.dataset.quadro === id; })[0].textContent.replace(/\d+$/, '').trim();
      atualizarLisa();
    }
    botoes.forEach(function (b) { b.addEventListener('click', function () { abrirQuadro(b.dataset.quadro); }); });

    // arrastar
    app.addEventListener('pointerdown', function (e) {
      var card = e.target.closest('.aba-card');
      if (!card || (e.pointerType === 'mouse' && e.button !== 0)) return;
      arr = { card: card, x0: e.clientX, y0: e.clientY, movendo: false, fantasma: null, dx: 0, dy: 0 };
      try { card.setPointerCapture(e.pointerId); } catch (x) { /* sem captura: segue igual */ }
    });
    app.addEventListener('pointermove', function (e) {
      if (!arr) return;
      if (!arr.movendo) {
        if (Math.hypot(e.clientX - arr.x0, e.clientY - arr.y0) < 6) return;
        var r = arr.card.getBoundingClientRect();
        arr.dx = arr.x0 - r.left; arr.dy = arr.y0 - r.top;
        arr.fantasma = arr.card.cloneNode(true);
        arr.fantasma.classList.add('aba-fantasma');
        arr.fantasma.style.width = r.width + 'px';
        document.body.appendChild(arr.fantasma);
        arr.card.classList.add('is-arrastando');
        arr.movendo = true;
      }
      arr.fantasma.style.left = e.clientX - arr.dx + 'px';
      arr.fantasma.style.top = e.clientY - arr.dy + 'px';
      var sob = document.elementFromPoint(e.clientX, e.clientY);
      var coluna = sob && sob.closest ? sob.closest('.aba-coluna') : null;
      limparAlvo();
      if (coluna && ativo.contains(coluna)) coluna.classList.add('is-alvo');
    });
    function soltar(e) {
      if (!arr) return;
      var a = arr; arr = null;
      if (a.movendo) {
        var sob = document.elementFromPoint(e.clientX, e.clientY);
        var coluna = sob && sob.closest ? sob.closest('.aba-coluna') : null;
        if (a.fantasma) a.fantasma.remove();
        a.card.classList.remove('is-arrastando');
        limparAlvo();
        if (coluna && ativo.contains(coluna)) mover(a.card, coluna);
      } else if (e.type === 'pointerup') {
        mover(a.card, proximaColuna(a.card));                   // toque sem arrastar: anda uma coluna
      }
    }
    app.addEventListener('pointerup', soltar);
    app.addEventListener('pointercancel', soltar);
    app.addEventListener('click', function (e) {                // teclado (Enter/Espaço): anda uma coluna
      var card = e.target.closest('.aba-card');
      if (card && e.detail === 0) mover(card, proximaColuna(card), true);
    });

    // criar card
    function novoCard(texto, meta, tag, classeTag) {
      var card = document.createElement('button');
      card.type = 'button';
      card.className = 'aba-card is-nova';
      card.innerHTML = '<span class="aba-tag ' + classeTag + '"></span><span></span><span class="aba-meta"><i style="--c: #6fd3ff">LI</i><span></span></span>';
      card.firstChild.textContent = tag;
      card.childNodes[1].textContent = texto;
      card.querySelector('.aba-meta > span').textContent = meta;
      return card;
    }
    app.querySelectorAll('.aba-novo').forEach(function (b) {
      b.addEventListener('click', function () {
        var campo = document.createElement('input');
        campo.className = 'aba-novo-campo'; campo.maxLength = 60;
        campo.placeholder = 'Nome do card e Enter';
        campo.setAttribute('aria-label', 'Nome do novo card');
        b.hidden = true; b.parentNode.insertBefore(campo, b); campo.focus();
        var acabou = false;
        function fim(salvar) {
          if (acabou) return; acabou = true;                    // o Enter tira o campo, e isso dispara o blur
          var v = campo.value.trim();
          if (salvar && v) {
            var card = novoCard(v, 'hoje', 'novo', 'aba-tag--verde');
            card.querySelector('.aba-meta i').textContent = 'VC'; card.querySelector('.aba-meta i').style.setProperty('--c', '#f59e0b');
            listaDe(b.closest('.aba-coluna')).appendChild(card); contar();
          }
          campo.remove(); b.hidden = false; if (salvar) b.focus();
        }
        campo.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); fim(true); } else if (e.key === 'Escape') fim(false); });
        campo.addEventListener('blur', function () { fim(true); });
      });
    });

    // a Lisa cria os cards a partir do pedido
    if (botaoLisa && rotuloLisa) {
      botaoLisa.addEventListener('click', function () {
        var id = ativo.dataset.quadro, p = (PEDIDOS[id] || [])[feitos[id]];
        if (!p) return;
        botaoLisa.disabled = true;
        rotuloLisa.textContent = 'A Lisa está criando…';
        var alvo = listaDe(colunas()[0]);
        setTimeout(function () {
          p.cards.forEach(function (c, i) {
            setTimeout(function () { alvo.prepend(novoCard(c.t, c.m, 'criado pela Lisa', 'aba-tag--lisa')); contar(); }, reduzido ? 0 : i * 260);
          });
          feitos[id]++;
          setTimeout(atualizarLisa, reduzido ? 0 : p.cards.length * 260);
        }, reduzido ? 150 : 900);
      });
    }
    contar();
    atualizarLisa();
  })();
})();
