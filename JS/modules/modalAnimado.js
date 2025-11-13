import { ativaIfSegmento } from "./modalAnimadoInstruction.js";
import { desativaIframes } from "./modalAnimadoInstruction.js";
const botaoAbrir = document.querySelector('[data-modal="abrir"]');
const botaoFechar = document.querySelector('[data-modal="fechar"]');
const containerModal = document.querySelector('[data-modal="container"]');
const cancelarInputModal = document.querySelector(
  '[data-modal="cancel_segment_input"]'
);

const abrirModal = () => {
  ativaIfSegmento();
  containerModal.classList.add("ativo");
};

export const fecharModal = () => {
  containerModal.classList.remove("ativo");
  desativaIframes();
};

const cliqueForaModal = (event) => {
  if (event.target === event.currentTarget) {
    fecharModal();
  }
};

// para fechar o modal a partir do iframe (clicando no botao de cancelar)
const fecharModalDoIframe = () => {
  const modalNoParent = window.parent.document.querySelector(
    '[data-modal="container"]'
  );
  if (modalNoParent) {
    modalNoParent.classList.remove("ativo");
    desativaIframes();
  } else {
    console.error("Erro: O container modal não foi encontrado na janela pai.");
  }
};

export const initModals = () => {
  if (containerModal && botaoAbrir && botaoFechar) {
    botaoAbrir.addEventListener("click", abrirModal);
    botaoFechar.addEventListener("click", fecharModal);
    containerModal.addEventListener("click", cliqueForaModal);
  }

  if (cancelarInputModal)
    return cancelarInputModal.addEventListener("click", fecharModalDoIframe);
};
