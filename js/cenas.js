/* ══════════════════════════════════════════════════════════════
   MAESTRO DAS CENAS 3D (23/11/2026)
   O site tem várias cenas em WebGL: o globo, os trilhos, o trem, o beco, a Lisa, o planeta,
   o disco de ouro e os buracos. Para não pesar, só UMA desenha por vez: a que ocupa mais a
   tela (com peso: o fundo dos trilhos cede para qualquer cena da frente). As outras que estão
   aparecendo ficam paradas no último quadro, e a que sai da tela para de vez.
   Cada cena também tem um limite de quadros por segundo: as de fundo rodam a 30; as rápidas,
   ou as que o visitante está mexendo, a 60 (em monitores de 120/144 Hz também fica nesse limite).

   Uso, em cada cena:
     var c = Cenas.registrar({ nome, el, peso, fps, ligar, desligar, pintar });
     no laço:  if (!c.vez(agora)) return;   // não é a vez (outra cena ativa ou limite de fps)
     c.focar(ms)  dá a vez para a cena por um tempo (quando o visitante mexe nela)
     c.fps(n)     muda o limite de quadros
     c.repintar() desenha um quadro se ela aparece mas não está ativa (ex.: depois de mudar de tamanho)
══════════════════════════════════════════════════════════════ */
window.Cenas = (function () {
  'use strict';
  var lista = [];
  var ativa = null;
  var foco = null, focoAte = 0;
  var agendado = false;
  function nada() {}

  function medir(c) {
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
      if (ativa) { ativa.ligada = true; ativa.ultimo = 0; try { ativa.ligar(); } catch (e) { /* segue */ } }
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

  var io = ('IntersectionObserver' in window) ? new IntersectionObserver(agendar) : null;
  window.addEventListener('scroll', agendar, { passive: true });
  window.addEventListener('resize', agendar, { passive: true });
  document.addEventListener('visibilitychange', function () { agendado = false; escolher(); });
  // o layout também muda sem rolagem (textos que entram, imagens que carregam): confere de vez em quando
  setInterval(function () { if (!document.hidden && lista.length) agendar(); }, 1000);

  function registrar(o) {
    var c = {
      nome: o.nome || '', el: o.el, peso: o.peso || 1, fps: o.fps || 30,
      ligar: o.ligar || nada, desligar: o.desligar || nada, pintar: o.pintar || null,
      area: 0, visivel: false, ligada: false, pintada: false, ultimo: 0, quadros: 0
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

  /* montar as cenas em segundo plano: criar o contexto WebGL, a geometria e os materiais custa de 0,3 s
     a 1 s por cena em placas integradas. Depois que a página termina de carregar, elas são montadas uma de
     cada vez, só nos momentos em que o visitante não está rolando, para já estarem prontas (e com os
     shaders compilados) quando ele chegar. Se ele chegar perto de uma antes disso, ela passa na frente
     e é montada na hora. */
  var fila = [], montando = false, ultimaRolagem = 0, historico = [];
  window.addEventListener('scroll', function () { ultimaRolagem = performance.now(); }, { passive: true });
  function distancia(item) {
    if (!item.el) return 1e9;                                                  // sem lugar na página: nunca é urgente
    var r = item.el.getBoundingClientRect(), vh = window.innerHeight || 800;
    return r.top > vh ? r.top - vh : (r.bottom < 0 ? -r.bottom : 0);
  }
  function proxima() {
    if (montando || !fila.length) return;
    fila.sort(function (a, b) { return distancia(a) - distancia(b); });       // a mais perto primeiro
    var item = fila[0], vh = window.innerHeight || 800;
    var urgente = distancia(item) < vh * 1.3;
    if (!urgente && performance.now() - ultimaRolagem < 400) { setTimeout(proxima, 200); return; }   // espera parar de rolar
    montando = true;
    var ocioso = window.requestIdleCallback || function (fn) { return setTimeout(fn, 50); };
    ocioso(function () {
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

  return {
    registrar: registrar,
    preparar: preparar,
    imagem: imagem,
    ocioso: ocioso,
    // para conferir no console: Cenas.historico() (o que a fila fez e quanto custou) e Cenas.estado()
    historico: function () { return historico.slice(); },
    pendentes: function () { return fila.map(function (i) { return (i.el ? (i.el.id || i.el.className.split(' ')[0]) : '-') + ':' + Math.round(distancia(i)); }).concat(montando ? ['(montando)'] : []); },
    // para conferir no console: Cenas.estado()
    estado: function () {
      return lista.map(function (c) {
        return { nome: c.nome, visivel: c.visivel, area: Math.round(c.area), ativa: c === ativa, fps: c.fps, quadros: c.quadros };
      });
    }
  };
})();
