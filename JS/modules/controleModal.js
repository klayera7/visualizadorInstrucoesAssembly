import { alternarParaPopupSegmentos } from "./logicaPopupInstrucao.js"; // Importa o "alternador"

const botaoAbrir = document.querySelector('[data-modal="abrir"]');
const botaoFechar = document.querySelector('[data-modal="fechar"]');
const containerModal = document.querySelector('[data-modal="container"]');
const cancelarInputModal = document.querySelector(
  '[data-modal="cancel_segment_input"]'
); 


const abrirModal = () => {
  const iframeSegmento = document.getElementById("segment_popup");
  const iframeInstrucao = document.getElementById("instruction_iframe");

  const carregarIframeSeNecessario = (iframe) => {
    const srcAtual = iframe.getAttribute("src");
    const srcReal = iframe.getAttribute("data-src");
    
    if (!srcAtual || srcAtual === "") {
      iframe.setAttribute("src", srcReal);
    }
  };

  carregarIframeSeNecessario(iframeSegmento);
  carregarIframeSeNecessario(iframeInstrucao);

  alternarParaPopupSegmentos();
  containerModal.classList.add("ativo");
};

export const fecharModal = () => {
  containerModal.classList.remove("ativo");
};

const cliqueForaDoModal = (event) => {
  if (event.target === event.currentTarget) {
    fecharModal();
  }
};

// p fechar o modal a partir do iframe (clicando no botao de cancelar)
const fecharModalPeloIframe = () => {
  const modalNoParent = window.parent.document.querySelector(
    '[data-modal="container"]'
  );
  if (modalNoParent) {
    modalNoParent.classList.remove("ativo");
  } else {
    console.error("Erro: O container modal não foi encontrado na janela pai.");
  }
};

// inicialização que será chamada pelo principal.js
export const inicializarModalPrincipal = () => {
  if (containerModal && botaoAbrir && botaoFechar) {
    botaoAbrir.addEventListener("click", abrirModal);
    botaoFechar.addEventListener("click", fecharModal);
    containerModal.addEventListener("click", cliqueForaDoModal);
  }

  if (cancelarInputModal)
    return cancelarInputModal.addEventListener("click", fecharModalPeloIframe);
};