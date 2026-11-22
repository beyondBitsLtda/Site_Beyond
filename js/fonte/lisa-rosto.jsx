// A Lisa 3D no site da Beyond (vitrine): o mesmo Rosto do app (src/components/panels/visuais/Rosto.js do beyond-assist),
// num pacote só. No site o quadro é grande: o rosto ocupa menos dele, para a cabeça inteira caber.
import { createRoot } from "react-dom/client";
import Rosto from "@/components/panels/visuais/Rosto.js";

function montar(elemento, obterSinal, ajustes, opcoes) {
  const raiz = createRoot(elemento);
  const ocupacao = (opcoes && opcoes.ocupacao) || 0.72;
  raiz.render(<Rosto obterSinal={obterSinal} ajustes={ajustes} ocupacao={ocupacao} zoom={1} />);
  return () => raiz.unmount();
}

function temWebgl() {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

window.LisaRosto = { montar, temWebgl };

// ── Como refazer js/lisa-rosto.js ──
// O Rosto mora no repositório beyond-assist (com o React e o Three de lá). Na raiz do beyond-assist (a cópia com o
// node_modules instalado), rode o esbuild apontando para este arquivo:
//   npx esbuild <caminho>/Site_Beyond/js/fonte/lisa-rosto.jsx --bundle --minify --format=iife --platform=browser
//     --target=es2020 --jsx=automatic --loader:.js=jsx --alias:@=./src --define:process.env.NODE_ENV='"production"'
//     --outfile=<caminho>/Site_Beyond/js/lisa-rosto.js
