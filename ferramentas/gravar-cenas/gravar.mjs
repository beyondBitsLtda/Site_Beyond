/* ══════════════════════════════════════════════════════════════
   GRAVADOR DAS CENAS — transforma as cenas 3D do site nos vídeos de assets/videos/
   No site, as cenas aparecem como vídeos (js/cenas.js). Quando uma cena 3D mudar, grave de novo:

     1. na pasta do site:   python -m http.server 8792 --bind 127.0.0.1
     2. noutro terminal:    node ferramentas/gravar-cenas/gravar.mjs <cena | prefixo | todas>
                            ex.: trem-pc · disco (as duas versões) · lisa (os três estados) · todas

   Para cada cena de cenas.json, abre o site no Edge (sem janela, com a placa de vídeo) no modo gravação
   (index.html?gravar=<cena>&periodo=N): o 3D desenha ao vivo, cada cena faz o movimento dela fechar o
   ciclo em N segundos, o relógio da página só anda quando o gravador manda, e cada quadro é copiado do
   canvas e codificado em H.264 na própria página (WebCodecs + mp4-muxer). O fim do loop é fundido com o
   começo. Saem <cena>.mp4 e <cena>.webp (o primeiro quadro), e no outdoor também a máscara e os cantos
   da tela (copie os cantos impressos para CANTOS, em js/beco.js).
══════════════════════════════════════════════════════════════ */
import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

const aqui = dirname(fileURLToPath(import.meta.url));
const raiz = join(aqui, '..', '..');
const { servidor, cenas } = JSON.parse(readFileSync(join(aqui, 'cenas.json'), 'utf8'));
const pedido = process.argv[2];
if (!pedido) { console.log('Uso: node ferramentas/gravar-cenas/gravar.mjs <cena | prefixo | todas>\nCenas:', Object.keys(cenas).join(', ')); process.exit(1); }
const nomes = Object.keys(cenas).filter(n => pedido === 'todas' || n === pedido || n.startsWith(pedido + '-'));
if (!nomes.length) { console.log('Nenhuma cena com esse nome. Cenas:', Object.keys(cenas).join(', ')); process.exit(1); }

let porta = 9671, falhas = 0;
for (const nome of nomes) {
  const cfg = Object.assign({}, cenas[nome], { url: servidor + cenas[nome].url, saida: join(raiz, 'assets', 'videos', nome).split('\\').join('/'), porta: porta++ });
  if (process.env.SO_MP4) cfg.alfa = false;          // SO_MP4=1: refaz só o MP4 (e o pôster dele), sem mexer no WebM transparente
  const tmp = join(tmpdir(), 'gravar-cena-' + nome + '.json');
  writeFileSync(tmp, JSON.stringify(cfg));
  console.log('\n── ' + nome);
  const r = spawnSync(process.execPath, [join(aqui, 'gravar-uma.mjs'), tmp], { stdio: 'inherit', timeout: 10 * 60 * 1000 });
  rmSync(tmp, { force: true });
  if (r.status !== 0) { falhas++; console.log('   (falhou: ' + (r.error ? r.error.message : 'saída ' + r.status) + ')'); }
}
console.log(falhas ? `\n${falhas} cena(s) falharam.` : '\nPronto.');
process.exit(falhas ? 1 : 0);
