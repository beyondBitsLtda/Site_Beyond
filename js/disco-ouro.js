/* ══════════════════════════════════════════════════════════════
   SEGURANÇA — o Disco de Ouro das Voyager em 3D (22/11/2026)
   Uma réplica do disco que as sondas Voyager levaram em 1977: de um lado a capa com as
   instruções gravadas (o toca-discos e a agulha, a forma de onda das imagens, o quadro com
   o círculo, o mapa dos pulsares e o átomo de hidrogênio); do outro, o disco com os sulcos,
   o rótulo "THE SOUNDS OF EARTH" e a dedicatória gravada à mão perto do rótulo.

   As gravações são pintadas num canvas pelo código abaixo (viram relevo no shader); para não
   gastar ~1 s desenhando a cada visita, elas já vêm prontas em imagens (assets/disco/, geradas
   com este mesmo código) e o desenho aqui só roda se as imagens faltarem. O metal é um shader próprio, com o dourado refletindo um estúdio de luz
   imaginário. Os sulcos têm brilho anisotrópico, como um disco de verdade: o reflexo é
   uma faixa que atravessa o centro e fica parada enquanto o disco gira.

   Interação: arrastar gira (com inércia), dois cliques / dois toques / Enter viram o disco,
   e a luz principal acompanha o mouse. Parado, ele balança devagar e de vez em quando vira
   sozinho para mostrar o outro lado. Fora da tela, para de desenhar.
══════════════════════════════════════════════════════════════ */
(function discoDeOuro() {
  'use strict';
  var secao = document.getElementById('seguranca');
  if (!secao) return;
  var reduzido = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* os cartões de princípios aparecem um a um quando entram na tela */
  (function revelarCartoes() {
    var cartoes = document.querySelectorAll('[data-seg-card]');
    if (!('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(cartoes, function (c) { c.classList.add('seg-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e, i) {
        if (!e.isIntersecting) return;
        setTimeout(function () { e.target.classList.add('seg-visible'); }, i * 90);
        io.unobserve(e.target);
      });
    }, { threshold: 0.15 });
    Array.prototype.forEach.call(cartoes, function (c) { io.observe(c); });
  })();

  /* o céu de fundo (rastros e órbitas) só anima com a seção na tela */
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (e) { secao.classList.toggle('in-view', e[0].isIntersecting); }).observe(secao);
  } else {
    secao.classList.add('in-view');
  }

  var palco = document.getElementById('segDisco');
  var tela = document.getElementById('segDiscoTela');
  var dica = document.getElementById('segDiscoDica');
  if (!palco || !tela) return;

  /* NO SITE, o disco é só o vídeo gravado deste 3D (assets/videos/disco-*, js/cenas.js), fazendo a coreografia
     de quando ninguém mexe: balança, gira devagar e vira duas vezes a cada 16 s. Não é interativo (o 3D abaixo só
     roda na gravação: index.html?gravar=disco&periodo=16). */
  var vid = null;
  if (window.Cenas && Cenas.emVideo) {
    vid = Cenas.video({ nome: 'disco', lugar: palco, antes: tela, classe: 'seg-disco-video', alfa: true, hd: true });
    palco.setAttribute('role', 'img');
    palco.setAttribute('aria-label', 'Réplica do Disco de Ouro das sondas Voyager, balançando devagar e virando para mostrar os dois lados.');
    tela.removeAttribute('tabindex'); tela.setAttribute('aria-hidden', 'true');
    return;
  } else if (typeof THREE === 'undefined') { palco.classList.add('is-sem-3d'); return; }
  var GRAV = window.Cenas && Cenas.gravacao && Cenas.gravacao.periodo;
  if (dica && window.matchMedia && window.matchMedia('(hover: none)').matches) {
    dica.textContent = 'arraste para girar · toque duas vezes para virar';
  }

  /* só monta a cena quando o palco chega perto da tela */
  // a cena é montada em segundo plano pelo maestro (js/cenas.js), num momento parado, ou na hora se o visitante chegar perto
  if (window.Cenas) window.Cenas.preparar(palco, montar); else montar();

  function sorteio(s) {
    return function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
  }

  function montar() {
    var renderer;
    try {
      renderer = Cenas.renderizador(tela);                     // o motor 3D compartilhado (js/cenas.js)
    } catch (err) {
      palco.classList.add('is-sem-3d');
      return;
    }
    var pequeno = Math.min(window.innerWidth, window.innerHeight) < 700;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, pequeno ? 1.5 : 2));
    renderer.setClearColor(0x000000, 0);

    var TX = pequeno ? 1024 : 2048;
    var ANISO = Math.min(8, renderer.capabilities.getMaxAnisotropy ? renderer.capabilities.getMaxAnisotropy() : 1);

    /* ── as texturas: desenhadas num espaço de 1000×1000 (centro 500,500; borda do disco no raio 500) ── */
    function textura(desenho) {
      var c = document.createElement('canvas');
      c.width = c.height = TX;
      var x = c.getContext('2d');
      x.fillStyle = '#000';
      x.fillRect(0, 0, TX, TX);
      x.save();
      x.scale(TX / 1000, TX / 1000);
      desenho(x);
      x.restore();
      var t = new THREE.CanvasTexture(c);
      t.anisotropy = ANISO;
      return t;
    }

    /* ferramentas de "gravura": tudo em vermelho (canal R = sulco gravado) */
    function gravador(x, rnd) {
      var g = {};
      g.linha = function (p) {
        x.beginPath(); x.moveTo(p[0], p[1]);
        for (var i = 2; i < p.length; i += 2) x.lineTo(p[i], p[i + 1]);
        x.stroke();
      };
      g.circ = function (cx, cy, r) { x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.stroke(); };
      g.ponto = function (cx, cy, r) { x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); };
      g.seta = function (x1, y1, x2, y2, s) {
        s = s || 7;
        g.linha([x1, y1, x2, y2]);
        var a = Math.atan2(y2 - y1, x2 - x1);
        g.linha([x2 - s * Math.cos(a - 0.42), y2 - s * Math.sin(a - 0.42), x2, y2,
                 x2 - s * Math.cos(a + 0.42), y2 - s * Math.sin(a + 0.42)]);
      };
      g.bits = function (n) { var s = ''; for (var i = 0; i < n; i++) s += rnd() < 0.5 ? '0' : '1'; return s; };
      /* números em binário como na capa: "|" é 1 e "—" é 0 */
      g.binario = function (cx, cy, ang, b, passo, alto) {
        x.save(); x.translate(cx, cy); x.rotate(ang);
        var ini = -(b.length - 1) * passo / 2;
        for (var i = 0; i < b.length; i++) {
          var px = ini + i * passo;
          if (b[i] === '1') g.linha([px, -alto / 2, px, alto / 2]);
          else g.linha([px - alto * 0.3, 0, px + alto * 0.3, 0]);
        }
        x.restore();
      };
      g.binarioArco = function (cx, cy, r, a0, a1, b, alto) {
        for (var i = 0; i < b.length; i++) {
          var a = a0 + (a1 - a0) * i / (b.length - 1);
          x.save(); x.translate(cx + r * Math.cos(a), cy + r * Math.sin(a)); x.rotate(a);
          if (b[i] === '1') g.linha([-alto / 2, 0, alto / 2, 0]);
          else g.linha([0, -alto * 0.3, 0, alto * 0.3]);
          x.restore();
        }
      };
      /* texto em arco: em cima lê da esquerda para a direita com o pé para o centro;
         embaixo, também da esquerda para a direita, com a cabeça para o centro */
      g.textoArco = function (txt, r, centro, fonte, esp, emCima) {
        x.save(); x.font = fonte; x.textAlign = 'center'; x.textBaseline = 'middle';
        var larg = [], total = 0, i;
        for (i = 0; i < txt.length; i++) { larg.push(x.measureText(txt[i]).width); total += larg[i] + (i ? esp : 0); }
        var pos = 0;
        for (i = 0; i < txt.length; i++) {
          var meio = pos + larg[i] / 2;
          var a = emCima ? centro - total / (2 * r) + meio / r : centro + total / (2 * r) - meio / r;
          x.save();
          x.translate(500 + r * Math.cos(a), 500 + r * Math.sin(a));
          x.rotate(emCima ? a + Math.PI / 2 : a - Math.PI / 2);
          x.fillText(txt[i], 0, 0);
          x.restore();
          pos += larg[i] + esp;
        }
        x.restore();
      };
      g.textoReto = function (txt, cx, cy, fonte, esp) {
        x.save(); x.font = fonte; x.textAlign = 'left'; x.textBaseline = 'middle';
        var total = 0, i;
        for (i = 0; i < txt.length; i++) total += x.measureText(txt[i]).width + (i ? esp : 0);
        var px = cx - total / 2;
        for (i = 0; i < txt.length; i++) { x.fillText(txt[i], px, cy); px += x.measureText(txt[i]).width + esp; }
        x.restore();
      };
      return g;
    }

    /* desgaste: arranhões finos, manchas e marcas de polimento, num canal só (cor = '0,255,0' ou '0,0,255') */
    function desgaste(x, rnd, cor) {
      x.save();
      x.globalCompositeOperation = 'lighter';
      x.lineCap = 'round';
      var i, a, r, cx, cy;
      for (i = 0; i < 46; i++) {                                       // marcas circulares de polimento
        x.strokeStyle = 'rgba(' + cor + ',' + (0.03 + rnd() * 0.05).toFixed(3) + ')';
        x.lineWidth = 0.3 + rnd() * 0.6;
        r = 30 + rnd() * 455; a = rnd() * Math.PI * 2;
        x.beginPath(); x.arc(500, 500, r, a, a + 0.6 + rnd() * 2.4); x.stroke();
      }
      for (i = 0; i < 16; i++) {                                       // manchas leves
        r = 30 + rnd() * 90; a = rnd() * Math.PI * 2;
        var d = Math.sqrt(rnd()) * 400;
        cx = 500 + Math.cos(a) * d; cy = 500 + Math.sin(a) * d;
        var gr = x.createRadialGradient(cx, cy, 0, cx, cy, r);
        gr.addColorStop(0, 'rgba(' + cor + ',' + (0.08 + rnd() * 0.1).toFixed(3) + ')');
        gr.addColorStop(1, 'rgba(' + cor + ',0)');
        x.fillStyle = gr; x.fillRect(cx - r, cy - r, r * 2, r * 2);
      }
      for (i = 0; i < 520; i++) {                                      // arranhões finos
        a = rnd() * Math.PI * 2;
        var dd = Math.sqrt(rnd()) * 478;
        cx = 500 + Math.cos(a) * dd; cy = 500 + Math.sin(a) * dd;
        var ang = rnd() * Math.PI * 2, len = 4 + Math.pow(rnd(), 2) * 46;
        x.strokeStyle = 'rgba(' + cor + ',' + (0.08 + rnd() * 0.22).toFixed(3) + ')';
        x.lineWidth = 0.25 + rnd() * 0.5;
        x.beginPath(); x.moveTo(cx, cy);
        x.quadraticCurveTo(cx + Math.cos(ang + 0.2) * len * 0.5, cy + Math.sin(ang + 0.2) * len * 0.5,
                           cx + Math.cos(ang) * len, cy + Math.sin(ang) * len);
        x.stroke();
      }
      x.restore();
    }

    /* A CAPA: as instruções gravadas para quem encontrar o disco */
    function desenharCapa(x) {
      var rnd = sorteio(19770820), g = gravador(x, rnd);
      x.strokeStyle = '#f00'; x.fillStyle = '#f00';
      x.lineCap = 'round'; x.lineJoin = 'round';
      var L = 1.7;

      // a borda da capa e o anel em volta do furo
      x.lineWidth = 1.1; g.circ(500, 500, 484); g.circ(500, 500, 22);
      x.lineWidth = L;

      // em cima, à esquerda: o disco visto de cima com a agulha, e o tempo de uma volta em binário
      var cx = 300, cy = 300;
      g.circ(cx, cy, 98); g.circ(cx, cy, 36); g.ponto(cx, cy, 3.4);
      x.lineWidth = 0.7; g.circ(cx, cy, 86); g.circ(cx, cy, 64); x.lineWidth = L;
      x.save(); x.translate(cx + 92 * Math.cos(-2.36), cy + 92 * Math.sin(-2.36)); x.rotate(-2.36);
      x.strokeRect(0, -5, 78, 10);                                     // o braço com a cápsula
      g.linha([0, -5, -9, 0, 0, 5]);                                   // a ponta da agulha
      g.linha([78, -9, 78, 9]);
      x.restore();
      x.beginPath(); x.arc(cx, cy, 110, 0.3, 1.25); x.stroke();          // o sentido do giro
      g.seta(cx + 110 * Math.cos(1.15), cy + 110 * Math.sin(1.15), cx + 110 * Math.cos(1.27), cy + 110 * Math.sin(1.27), 8);
      g.binarioArco(cx, cy, 120, -1.92, -0.22, g.bits(30), 10);

      // embaixo dele: o disco de perfil, a agulha e o tempo de duração em binário
      x.strokeRect(202, 452, 200, 7);
      g.linha([226, 452, 220, 431, 238, 431, 232, 452]);
      g.seta(302, 478, 205, 478, 7); g.seta(302, 478, 399, 478, 7);
      g.binario(302, 497, 0, g.bits(26), 7.2, 9);

      // em cima, à direita: a forma de onda do sinal das imagens
      var y0 = 238, p = [548, y0, 566, y0], k, xx;
      for (k = 0; k < 3; k++) { xx = 566 + k * 16; p.push(xx, y0, xx, y0 - 30, xx + 7, y0 - 30, xx + 7, y0); }
      for (xx = 618; xx <= 780; xx += 4) p.push(xx, y0 - 8 - rnd() * 24);
      p.push(786, y0, 862, y0);
      g.linha(p);
      g.linha([566, 189, 566, 201]); g.linha([780, 189, 780, 201]);
      g.seta(673, 195, 568, 195, 6); g.seta(673, 195, 778, 195, 6);
      g.binario(673, 175, 0, g.bits(22), 8, 10);

      // abaixo: como as linhas da imagem são traçadas, uma ao lado da outra
      for (k = 0; k < 6; k++) {
        xx = 598 + k * 30;
        var q = [xx, 290];
        for (var yy = 296, s = 1; yy <= 380; yy += 6, s = -s) q.push(xx + s * 5, yy);
        g.linha(q);
        if (k < 5) {
          x.save(); x.lineWidth = 0.8; x.setLineDash([3, 4]);
          g.linha([xx + 5, 380, xx + 30, 290]);
          x.restore();
        }
        g.binario(xx, 274, 0, (k + 1).toString(2), 5.5, 7);
      }
      g.binario(830, 336, Math.PI / 2, g.bits(10), 7, 8);

      // o quadro com o círculo: a primeira imagem do disco, para conferir a decodificação
      x.strokeRect(610, 428, 142, 112);
      g.circ(681, 484, 38);
      g.binario(681, 557, 0, g.bits(9), 7, 8);
      g.binario(770, 484, Math.PI / 2, g.bits(9), 7, 8);

      // embaixo, à esquerda: o mapa dos 14 pulsares, com a posição do Sol no centro
      var px0 = 300, py0 = 708;
      x.lineWidth = 1.15;
      for (k = 0; k < 14; k++) {
        var ang = k / 14 * Math.PI * 2 + (rnd() - 0.5) * 0.36 + 0.2;
        var len = 64 + rnd() * 110;
        // não deixa a linha passar da borda da capa
        while (len > 30) {
          var ex = px0 + Math.cos(ang) * len, ey = py0 + Math.sin(ang) * len;
          if (Math.hypot(ex - 500, ey - 500) < 455) break;
          len -= 8;
        }
        var ca = Math.cos(ang), sa = Math.sin(ang);
        g.linha([px0, py0, px0 + ca * len, py0 + sa * len]);
        var b = g.bits(8 + Math.floor(rnd() * 7));
        for (var j = 0; j < b.length; j++) {
          var tt = len - 4 - j * 4.2;
          if (tt < 18) break;
          var mx = px0 + ca * tt, my = py0 + sa * tt, m = b[j] === '1' ? 4.2 : 1.8;
          g.linha([mx - sa * m, my + ca * m, mx + sa * m, my - ca * m]);
        }
      }
      g.linha([px0, py0, px0 + 236, py0]);                              // a linha longa: o centro da galáxia
      g.ponto(px0, py0, 3.6);
      x.lineWidth = L;

      // embaixo, à direita: o hidrogênio nos dois estados de menor energia (a unidade de tempo)
      var hy = 738;
      g.circ(640, hy, 22); g.circ(762, hy, 22);
      g.ponto(640, hy, 3); g.ponto(762, hy, 3);
      g.seta(640, hy - 28, 640, hy - 48, 6);
      g.seta(762, hy - 48, 762, hy - 28, 6);
      g.linha([662, hy, 740, hy]);
      g.linha([701, hy - 9, 701, hy + 9]);

      desgaste(x, rnd, '0,255,0');
    }

    /* O DISCO: o rótulo, a dedicatória e os intervalos entre as faixas */
    function desenharDisco(x) {
      var rnd = sorteio(19770905), g = gravador(x, rnd);
      x.strokeStyle = '#f00'; x.fillStyle = '#f00';
      x.lineCap = 'round';
      x.lineWidth = 1.1;
      g.circ(500, 500, 163);                                            // a borda do rótulo
      g.circ(500, 500, 18);                                             // em volta do furo
      g.textoArco('THE SOUNDS OF EARTH', 122, -Math.PI / 2, '700 23px Arial, Helvetica, sans-serif', 2.4, true);
      g.textoReto('UNITED STATES OF AMERICA', 500, 556, '700 13px Arial, Helvetica, sans-serif', 1.5);
      g.textoArco('PLANET EARTH', 133, Math.PI / 2, '700 17px Arial, Helvetica, sans-serif', 2.6, false);
      // a dedicatória gravada à mão na área lisa entre os sulcos e o rótulo
      g.textoArco('To the makers of music — all worlds, all times', 171.5, Math.PI * 0.62,
        'italic 6.4px "Segoe Script", "Brush Script MT", cursive', 0.25, false);

      // canal G: os intervalos lisos entre as faixas (de 180 a 488)
      x.save();
      x.globalCompositeOperation = 'lighter';
      x.strokeStyle = '#0f0';
      [204, 226, 249, 268, 290, 316, 341, 360, 387, 410, 436, 458, 476].forEach(function (r) {
        x.lineWidth = 1.4 + rnd() * 1.3; g.circ(500, 500, r);
      });
      x.restore();

      desgaste(x, rnd, '0,0,255');
    }

    /* as gravações prontas (assets/disco/capa-2048.webp etc.): decodificadas fora da tarefa principal e
       enviadas à placa num momento parado; sem as imagens, desenha aqui mesmo */
    var texCapa = new THREE.Texture(), texDisco = new THREE.Texture(), prontas = 0;
    texCapa.anisotropy = texDisco.anisotropy = ANISO;
    function carregarGravacao(t, nome, desenho) {
      function pronta() {
        if (++prontas < 2) return;
        passo(0); desenhar(); pedir();                     // as duas chegaram: primeiro quadro (fora da tela, se for o caso)
      }
      Cenas.imagem('assets/disco/' + nome + '-' + TX + '.webp', true).then(function (r) {
        t.image = r.img; t.flipY = !r.bitmap; t.needsUpdate = true;
        Cenas.ocioso(function () { try { renderer.initTexture(t); } catch (e) { /* vai no primeiro quadro */ } pronta(); }, palco);
      }, function () {
        var c = textura(desenho); t.image = c.image; t.flipY = true; t.needsUpdate = true; pronta();
      });
    }
    carregarGravacao(texCapa, 'capa', desenharCapa);
    carregarGravacao(texDisco, 'disco', desenharDisco);

    /* ── a geometria: um disco fino com a borda arredondada e o furo do centro ── */
    var MEIA = 0.012, FURO = 0.024;
    var perfil = [new THREE.Vector2(FURO, MEIA), new THREE.Vector2(FURO, -MEIA), new THREE.Vector2(1 - MEIA, -MEIA)];
    for (var i = 1; i < 14; i++) {
      var a = -Math.PI / 2 + Math.PI * i / 14;
      perfil.push(new THREE.Vector2(1 - MEIA + MEIA * Math.cos(a), MEIA * Math.sin(a)));
    }
    perfil.push(new THREE.Vector2(1 - MEIA, MEIA), new THREE.Vector2(FURO, MEIA));
    var geo = new THREE.LatheGeometry(perfil, pequeno ? 160 : 220);

    var VERT = [
      'varying vec3 vP;',
      'varying vec3 vWP;',
      'void main() {',
      '  vP = position;',
      '  vec4 w = modelMatrix * vec4(position, 1.0);',
      '  vWP = w.xyz;',
      '  gl_Position = projectionMatrix * viewMatrix * w;',
      '}'
    ].join('\n');

    var FRAG = [
      'uniform sampler2D uCapa;',
      'uniform sampler2D uDisco;',
      'uniform mat3 uRot;',
      'uniform float uTexel;',
      'uniform float uMeia;',
      'uniform vec3 uLuzP[3];',
      'uniform vec3 uLuzC[3];',
      'uniform float uExpo;',
      'varying vec3 vP;',
      'varying vec3 vWP;',
      'const float PI = 3.14159265;',
      'const vec3 OURO = vec3(1.0, 0.74, 0.30);',

      'float hash1(float n) { return fract(sin(n) * 43758.5453); }',
      'float ruido1(float x) { float i = floor(x), f = fract(x); f = f * f * (3.0 - 2.0 * f); return mix(hash1(i), hash1(i + 1.0), f); }',

      /* o "estúdio" que o ouro reflete: uma grande caixa de luz na frente, uma faixa no alto,
         uma faixa vertical atrás à direita e o azul do espaço vindo da esquerda */
      'vec3 estudio(vec3 d, float r) {',
      '  vec3 c = mix(vec3(0.010, 0.010, 0.018), vec3(0.030, 0.034, 0.065), smoothstep(-0.5, 0.9, d.y));',
      '  float f = max(dot(d, normalize(vec3(-0.32, 0.38, 1.0))), 0.0);',
      '  c += vec3(1.0, 0.90, 0.76) * 0.62 * pow(f, mix(9.0, 2.6, r));',
      '  float alto = exp(-pow((d.y - 0.74) / mix(0.06, 0.32, r), 2.0)) * smoothstep(-0.5, 0.5, d.z + 0.2);',
      '  c += vec3(1.0, 0.93, 0.84) * 0.7 * alto;',
      '  float lado = exp(-pow((d.x - 0.84) / mix(0.045, 0.3, r), 2.0)) * smoothstep(-0.9, 0.3, d.y);',
      '  c += vec3(1.0, 0.80, 0.56) * 1.0 * lado;',
      '  c += vec3(0.25, 0.36, 0.85) * 0.32 * pow(max(dot(d, normalize(vec3(-1.0, -0.25, 0.3))), 0.0), mix(6.0, 2.0, r));',
      '  c += vec3(0.30, 0.22, 0.14) * 0.22 * exp(-abs(d.y + 0.15) * 3.0);',
      '  return c;',
      '}',

      'vec3 schlick(vec3 f0, float c) { return f0 + (1.0 - f0) * pow(1.0 - c, 5.0); }',

      /* brilho das luzes num metal liso (GGX) */
      'vec3 luzLisa(vec3 N, vec3 V, vec3 L, vec3 cor, vec3 f0, float rough) {',
      '  vec3 H = normalize(L + V);',
      '  float nl = max(dot(N, L), 0.0), nv = max(dot(N, V), 1e-3), nh = max(dot(N, H), 0.0), vh = max(dot(V, H), 0.0);',
      '  float a = max(rough * rough, 0.002), a2 = a * a;',
      '  float dd = nh * nh * (a2 - 1.0) + 1.0;',
      '  float D = a2 / (PI * dd * dd);',
      '  float k = a * 0.5;',
      '  float G = (nl / (nl * (1.0 - k) + k)) * (nv / (nv * (1.0 - k) + k));',
      '  return D * G * schlick(f0, vh) / (4.0 * nv * max(nl, 1e-3)) * nl * cor;',
      '}',

      /* brilho das luzes nos sulcos (Ashikhmin–Shirley): estreito ao longo do sulco (T) e
         esticado na direção do raio (B) — vira a faixa de luz que atravessa o centro */
      'vec3 luzSulco(vec3 N, vec3 T, vec3 B, vec3 V, vec3 L, vec3 cor, vec3 f0) {',
      '  vec3 H = normalize(L + V);',
      '  float nl = max(dot(N, L), 0.0), nv = max(dot(N, V), 1e-3), nh = max(dot(N, H), 1e-4), vh = max(dot(V, H), 1e-3);',
      '  float th = dot(T, H), bh = dot(B, H);',
      '  const float NU = 900.0, NV = 4.0;',
      '  float ex = (NU * th * th + NV * bh * bh) / max(1.0 - nh * nh, 1e-4);',
      '  float s = sqrt((NU + 1.0) * (NV + 1.0)) / (8.0 * PI) * pow(nh, ex) / (vh * max(nl, nv));',
      '  return s * schlick(f0, vh) * nl * cor;',
      '}',

      'vec3 aces(vec3 x) { return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0); }',

      'void main() {',
      '  float h = uMeia;',
      '  float rxy = length(vP.xz);',
      '  vec2 dir = rxy > 1e-5 ? vP.xz / rxy : vec2(1.0, 0.0);',
      '  vec3 nObj = vec3(0.0, 1.0, 0.0);',
      '  vec3 f0 = OURO;',
      '  float rough = 0.3;',
      '  float sulco = 0.0;',
      '  float faixa = 1.0;',
      '  float fino = 1.0;',
      '  float cav = 0.0;',
      '  float d = uTexel * 1.5;',
      '  const float K = 0.9;',
      '  if (rxy > 1.0 - h + 1e-4) {',                                   // a borda arredondada
      '    vec2 c = dir * (1.0 - h);',
      '    nObj = normalize(vec3(vP.x - c.x, vP.y, vP.z - c.y));',
      '    rough = 0.3; f0 = OURO * 0.95;',
      '  } else if (vP.y > h - 1e-4) {',                                  // A CAPA (gravações)
      '    vec2 uv = vec2(vP.x, -vP.z) * 0.5 + 0.5;',
      '    vec4 tx = texture2D(uCapa, uv);',
      '    float gx = texture2D(uCapa, uv + vec2(d, 0.0)).r - texture2D(uCapa, uv - vec2(d, 0.0)).r;',
      '    float gy = texture2D(uCapa, uv + vec2(0.0, d)).r - texture2D(uCapa, uv - vec2(0.0, d)).r;',
      '    vec3 nT = normalize(vec3(gx * K, gy * K, 1.0));',
      '    nObj = vec3(nT.x, nT.z, -nT.y);',
      '    cav = tx.r;',
      '    f0 = OURO * mix(1.0, 0.42, tx.r) * (1.0 - tx.g * 0.2);',
      '    rough = 0.26 + tx.r * 0.3 + tx.g * 0.2 + (ruido1(rxy * 380.0) - 0.5) * 0.025;',
      '  } else if (vP.y < -h + 1e-4) {',                                 // O DISCO (sulcos e rótulo)
      '    vec2 uv = vec2(-vP.x, -vP.z) * 0.5 + 0.5;',
      '    vec4 tx = texture2D(uDisco, uv);',
      '    float gx = texture2D(uDisco, uv + vec2(d, 0.0)).r - texture2D(uDisco, uv - vec2(d, 0.0)).r;',
      '    float gy = texture2D(uDisco, uv + vec2(0.0, d)).r - texture2D(uDisco, uv - vec2(0.0, d)).r;',
      '    vec3 nT = normalize(vec3(gx * K, gy * K, 1.0));',
      '    nObj = vec3(-nT.x, -nT.z, -nT.y);',
      '    cav = tx.r;',
      '    sulco = smoothstep(0.357, 0.363, rxy) * (1.0 - smoothstep(0.972, 0.978, rxy)) * (1.0 - tx.g);',
      '    faixa = mix(0.72, 1.3, ruido1(rxy * 96.0) * 0.6 + ruido1(rxy * 21.0 + 7.0) * 0.4);',
      '    float gr = rxy * 560.0;',
      '    float fw = fwidth(gr);',
      '    fino = mix(1.0, 0.78 + 0.44 * (0.5 + 0.5 * sin(gr * 6.2831853)), clamp(1.0 - fw * 1.4, 0.0, 1.0));',
      '    f0 = OURO * mix(1.0, 0.32, tx.r) * (1.0 - tx.b * 0.18) * mix(1.0, 0.9, sulco);',
      '    rough = mix(0.15 + tx.r * 0.3 + tx.b * 0.2, 0.3, sulco);',
      '  } else {',                                                       // a parede do furo
      '    nObj = vec3(-dir.x, 0.0, -dir.y);',
      '    rough = 0.4; f0 = OURO * 0.7;',
      '  }',

      '  vec3 N = normalize(uRot * nObj);',
      '  vec3 T = normalize(uRot * vec3(-dir.y, 0.0, dir.x));',
      '  vec3 B = normalize(uRot * vec3(dir.x, 0.0, dir.y));',
      '  vec3 V = normalize(cameraPosition - vWP);',
      '  float nv = max(dot(N, V), 1e-3);',
      '  vec3 F = schlick(f0, nv);',

      // reflexo do estúdio: liso no rótulo e na capa; esticado na direção do raio nos sulcos
      '  vec3 refl = estudio(reflect(-V, N), rough);',
      '  if (sulco > 0.001) {',
      '    vec3 esp = vec3(0.0);',
      '    for (int i = 0; i < 5; i++) {',
      '      float s = (float(i) - 2.0) * 0.5;',
      '      esp += estudio(reflect(-V, normalize(N + B * s * 0.5)), 0.22);',
      '    }',
      '    refl = mix(refl, esp * 0.2 * faixa * fino, sulco);',
      '  }',
      '  vec3 cor = F * refl * (1.0 - cav * 0.35);',

      '  for (int i = 0; i < 3; i++) {',
      '    vec3 Ld = uLuzP[i] - vWP;',
      '    float dist2 = dot(Ld, Ld);',
      '    vec3 L = Ld * inversesqrt(dist2);',
      '    vec3 c = uLuzC[i] * (12.0 / dist2);',
      '    vec3 lisa = luzLisa(N, V, L, c, f0, rough);',
      '    if (sulco > 0.001) lisa = mix(lisa, luzSulco(N, T, B, V, L, c, f0) * faixa * fino, sulco);',
      '    cor += lisa;',
      '  }',

      '  cor = aces(cor * uExpo);',
      '  gl_FragColor = vec4(pow(cor, vec3(1.0 / 2.2)), 1.0);',
      '}'
    ].join('\n');

    var luzP = [new THREE.Vector3(-1.6, 1.4, 3.4), new THREE.Vector3(3.2, 2.0, -2.6), new THREE.Vector3(-3.6, -1.8, 2.0)];
    var luzC = [new THREE.Vector3(1.0, 0.93, 0.82).multiplyScalar(0.12),
                new THREE.Vector3(1.0, 0.82, 0.6).multiplyScalar(0.28),
                new THREE.Vector3(0.45, 0.55, 1.0).multiplyScalar(0.1)];
    var uniforms = {
      uCapa: { value: texCapa },
      uDisco: { value: texDisco },
      uRot: { value: new THREE.Matrix3() },
      uTexel: { value: 1 / TX },
      uMeia: { value: MEIA },
      uLuzP: { value: luzP },
      uLuzC: { value: luzC },
      uExpo: { value: 1.0 }
    };
    var mat = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: VERT,
      fragmentShader: FRAG,
      side: THREE.DoubleSide,
      extensions: { derivatives: true }
    });

    var cena = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(26, 1, 0.1, 60);
    var pivo = new THREE.Group();                 // inclinação (pitch) e giro em volta do eixo vertical (yaw)
    cena.add(pivo);
    var disco = new THREE.Mesh(geo, mat);         // o eixo do disco é o Y do modelo; deitado para olhar a câmera
    pivo.add(disco);

    function medir() {
      var w = palco.clientWidth, h = palco.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      var meiaAltura = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      camera.position.set(0, 0, 1 / (0.8 * meiaAltura * Math.min(1, camera.aspect)));
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
      pedir();
      if (cena3d) cena3d.repintar();
    }

    /* ── o estado do movimento ── */
    var PI = Math.PI, PITCH = -0.3;
    /* a coreografia de quando ninguém mexe, em função do tempo (a mesma do vídeo): balança, gira devagar e vira
       duas vezes a cada CICLO segundos (aos 6 s e aos 18 s), voltando exatamente ao começo */
    var CICLO = GRAV || 24;
    var pose = { yaw: 0, pitch: PITCH, spin: -0.2, bob: 0, lx: -0.55, ly: 0.45 };
    function suave01(x) { x = Math.min(1, Math.max(0, x)); return x * x * (3 - 2 * x); }
    function poseOciosa(tau) {
      var f = ((tau % CICLO) + CICLO) % CICLO, w = 2 * PI / CICLO;
      var vira = suave01((f - CICLO * 0.25) / 1.4) + suave01((f - CICLO * 0.75) / 1.4);
      pose.yaw = vira * PI + Math.sin(f * w) * 0.34;
      pose.pitch = PITCH + Math.sin(f * w + 1.3) * 0.07;
      pose.bob = Math.sin(f * w * 2) * 0.025;
      pose.spin = -0.2 + Math.sin(f * w) * 0.25;
      pose.lx = -0.55 + Math.sin(f * w) * 0.4;
      pose.ly = 0.45 + Math.sin(f * w + 0.7) * 0.25;
      return pose;
    }
    // gravando, ou recém-saído do vídeo: segue a coreografia até o visitante mexer
    var coreografia = !!(GRAV || vid), inicioCoreo = vid ? vid.tempo() - performance.now() / 1000 : 0;
    var yaw = reduzido ? 0 : -1.5, yawAlvo = 0, yawVel = 0, virando = false;
    var pitch = PITCH, spin = -0.2, balanco = 0, entrada = reduzido ? 1 : 0;
    var arrastando = false, ultimaAcao = performance.now(), ultimoGiro = performance.now();
    var luz = { x: -0.6, y: 0.5, ax: -0.6, ay: 0.5, mouse: false };
    var t = 0, relogio = 0, rodando = false, visivel = false;

    function virar() {
      yawVel = 0;
      yawAlvo = Math.round(yaw / PI) * PI + PI;
      virando = true;
      ultimoGiro = performance.now();
      if (reduzido) yaw = yawAlvo;
      pedir();
    }
    var cena3d = null, ultimoFoco = 0, voltaFps = 0;
    function usou() {
      if (coreografia && !GRAV) {                         // o visitante assumiu: a partir daqui, a física de sempre
        coreografia = false;
        yawAlvo = Math.round(yaw / PI) * PI; balanco = 1; entrada = 1;
        ultimoGiro = performance.now();
      }
      ultimaAcao = performance.now();
      palco.classList.add('is-usado');
      if (!cena3d) return;
      cena3d.fps(60);                                     // mexendo: 60 quadros e a vez é dele
      clearTimeout(voltaFps);
      voltaFps = setTimeout(function () { cena3d.fps(30); }, 3000);
      if (ultimaAcao - ultimoFoco > 500) { ultimoFoco = ultimaAcao; cena3d.focar(3000); }
    }

    function passo(dt) {
      if (coreografia) {
        poseOciosa(GRAV ? Cenas.tempoGravacao() : inicioCoreo + performance.now() / 1000);
        yaw = pose.yaw; pitch = pose.pitch; spin = pose.spin; entrada = 1;
        if (!luz.mouse) { luz.ax = pose.lx; luz.ay = pose.ly; }
        luz.x += (luz.ax - luz.x) * (1 - Math.exp(-dt * 4)); luz.y += (luz.ay - luz.y) * (1 - Math.exp(-dt * 4));
        if (!dt && !luz.mouse) { luz.x = luz.ax; luz.y = luz.ay; }
        pivo.scale.setScalar(1);
        pivo.rotation.set(pitch, yaw, 0);
        pivo.position.y = pose.bob;
        disco.rotation.set(PI / 2, spin, 0);
        luzP[0].set(luz.x * 2.8, luz.y * 2.4 + 0.3, 3.4);
        return true;
      }
      var agora = performance.now();
      var ocioso = (agora - ultimaAcao) / 1000;
      var mexendo = false;
      if (entrada < 1) { entrada = Math.min(1, entrada + dt / 1.8); mexendo = true; }
      var bAlvo = (!reduzido && !arrastando && ocioso > 2.5) ? 1 : 0;
      balanco += (bAlvo - balanco) * (1 - Math.exp(-dt * 0.7));
      // parado há um tempo: vira sozinho para mostrar o outro lado
      if (!reduzido && !arrastando && ocioso > 12 && (agora - ultimoGiro) / 1000 > 12) virar();

      if (!arrastando) {
        if (Math.abs(yawVel) > 0.06) {
          yaw += yawVel * dt;
          yawVel *= Math.exp(-dt * 2.6);
          if (Math.abs(yawVel) <= 0.06) { yawVel = 0; yawAlvo = Math.round(yaw / PI) * PI; }
          mexendo = true;
        } else {
          var alvo = yawAlvo + Math.sin(t * 0.31) * 0.34 * balanco;
          var dy = alvo - yaw;
          yaw += dy * (1 - Math.exp(-dt * (virando ? 3.4 : 2.2)));
          if (virando && Math.abs(yawAlvo - yaw) < 0.03) virando = false;
          if (Math.abs(dy) > 0.0008) mexendo = true;
        }
        var pAlvo = PITCH + Math.sin(t * 0.23 + 1.3) * 0.07 * balanco;
        var dp = pAlvo - pitch;
        pitch += dp * (1 - Math.exp(-dt * 2.4));
        if (Math.abs(dp) > 0.0008) mexendo = true;
      } else {
        mexendo = true;
      }
      if (!reduzido) spin += dt * 0.05;

      // a luz principal: segue o mouse; sem mouse, passeia devagar
      if (!luz.mouse && !reduzido) {
        luz.ax = -0.55 + Math.sin(t * 0.19) * 0.4;
        luz.ay = 0.45 + Math.sin(t * 0.13 + 0.7) * 0.25;
      }
      var lx = luz.ax - luz.x, ly = luz.ay - luz.y;
      luz.x += lx * (1 - Math.exp(-dt * 4));
      luz.y += ly * (1 - Math.exp(-dt * 4));
      if (Math.abs(lx) + Math.abs(ly) > 0.002) mexendo = true;

      var e = 1 - Math.pow(1 - entrada, 3);
      pivo.scale.setScalar(0.84 + 0.16 * e);
      pivo.rotation.set(pitch, yaw, 0);
      pivo.position.y = reduzido ? 0 : Math.sin(t * 0.6) * 0.025;
      disco.rotation.set(PI / 2, spin, 0);
      luzP[0].set(luz.x * 2.8, luz.y * 2.4 + 0.3, 3.4);
      return mexendo;
    }

    function desenhar() {
      if (prontas < 2) return;                           // sem as gravações ainda: nada a mostrar
      cena.updateMatrixWorld();
      uniforms.uRot.value.setFromMatrix4(disco.matrixWorld);
      renderer.render(cena, camera);
    }

    function quadro(agora) {
      if (!visivel || document.hidden) { rodando = false; return; }
      if (!cena3d.vez(agora)) { requestAnimationFrame(quadro); return; }   // limite de fps (js/cenas.js)
      var dt = Math.min(0.05, Math.max(0, (agora - relogio) / 1000));
      relogio = agora;
      t += dt;
      var mexendo = passo(dt);
      desenhar();
      if (visivel && !document.hidden && (!reduzido || mexendo)) requestAnimationFrame(quadro);
      else rodando = false;
    }
    function pedir() {
      if (rodando || !visivel || document.hidden) return;
      rodando = true;
      relogio = performance.now();
      requestAnimationFrame(quadro);
    }

    /* ── arrastar, virar, teclado e a luz seguindo o mouse ── */
    var toque = null, ultimoToque = 0;
    tela.addEventListener('pointerdown', function (e) {
      if (e.button !== undefined && e.button !== 0) return;
      toque = { id: e.pointerId, x0: e.clientX, y0: e.clientY, x: e.clientX, y: e.clientY, t0: performance.now(), tAnt: performance.now(), tipo: e.pointerType, longe: false };
      arrastando = true;
      yawVel = 0; virando = false;
      try { tela.setPointerCapture(e.pointerId); } catch (err) { /* sem captura */ }
      tela.classList.add('is-arrastando');
      usou(); pedir();
    });
    tela.addEventListener('pointermove', function (e) {
      if (!toque || e.pointerId !== toque.id) return;
      var agora = performance.now();
      var dx = e.clientX - toque.x, dy = e.clientY - toque.y;
      toque.x = e.clientX; toque.y = e.clientY;
      if (Math.abs(e.clientX - toque.x0) + Math.abs(e.clientY - toque.y0) > 6) toque.longe = true;
      var escala = 3.2 / Math.max(260, palco.clientWidth);
      yaw += dx * escala;
      if (toque.tipo === 'mouse') pitch = Math.max(-1.25, Math.min(1.25, pitch + dy * escala * 0.8));
      var dtm = Math.max(8, agora - toque.tAnt) / 1000;
      yawVel = yawVel * 0.6 + (dx * escala / dtm) * 0.4;
      toque.tAnt = agora;
      usou();
    });
    function soltar(e) {
      if (!toque || e.pointerId !== toque.id) return;
      var agora = performance.now();
      if (agora - toque.tAnt > 90) yawVel = 0;                         // parou antes de soltar: sem inércia
      yawVel = Math.max(-9, Math.min(9, yawVel));
      if (Math.abs(yawVel) <= 0.06) yawAlvo = Math.round(yaw / PI) * PI;
      var foiToque = !toque.longe && agora - toque.t0 < 320;
      toque = null;
      arrastando = false;
      tela.classList.remove('is-arrastando');
      if (foiToque && e.type === 'pointerup') {
        if (agora - ultimoToque < 340) { virar(); ultimoToque = 0; } else ultimoToque = agora;
      }
      usou(); pedir();
    }
    tela.addEventListener('pointerup', soltar);
    tela.addEventListener('pointercancel', soltar);
    tela.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); usou(); virar(); }
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault(); usou();
        yawVel = (e.key === 'ArrowLeft' ? -1 : 1) * 2.4;
        pedir();
      }
    });
    palco.addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse') return;
      var r = palco.getBoundingClientRect();
      luz.ax = ((e.clientX - r.left) / r.width) * 2 - 1;
      luz.ay = -(((e.clientY - r.top) / r.height) * 2 - 1);
      luz.mouse = true;
      pedir();
    });
    palco.addEventListener('pointerleave', function () { luz.mouse = false; pedir(); });

    /* ── tamanho, visibilidade e economia ── */
    medir();
    if ('ResizeObserver' in window) new ResizeObserver(medir).observe(palco);
    else window.addEventListener('resize', medir, { passive: true });
    // a vez de desenhar vem do maestro (js/cenas.js): fora da tela ou sem a vez, para
    cena3d = Cenas.registrar({ nome: 'disco', el: palco, peso: 1, fps: 30, motor: renderer,
      ligar: function () { visivel = true; pedir(); },
      desligar: function () { visivel = false; },
      pintar: function () { desenhar(); } });
    tela.addEventListener('webglcontextlost', function (e) { e.preventDefault(); visivel = false; });

    // o primeiro quadro sai quando as gravações chegam (carregarGravacao)
    passo(0);
    pedir();
  }
})();
