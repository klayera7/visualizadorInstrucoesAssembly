import { alternarParaPopupSegmentos } from "./logicaPopupInstrucao.js"; // Importa o "alternador"

// Seletores dos elementos principais do modal
const botaoAbrir = document.querySelector('[data-modal="abrir"]');
const botaoFechar = document.querySelector('[data-modal="fechar"]');
const containerModal = document.querySelector('[data-modal="container"]');
const cancelarInputModal = document.querySelector(
  '[data-modal="cancel_segment_input"]'
); // (Este parece ser de dentro de um iframe, pode causar bugs)

// Funções de controle
const abrirModal = () => {
  alternarParaPopupSegmentos(); // Garante que o popup de segmentos seja o primeiro a ser visto
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

// para fechar o modal a partir do iframe (clicando no botao de cancelar)
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

// Função principal de inicialização que será chamada pelo principal.js
export const inicializarModalPrincipal = () => {
  if (containerModal && botaoAbrir && botaoFechar) {
    botaoAbrir.addEventListener("click", abrirModal);
    botaoFechar.addEventListener("click", fecharModal);
    containerModal.addEventListener("click", cliqueForaDoModal);
  }

  // (Este listener pode precisar ir para o logicaPopupSegmentos.js se o botão estiver lá)
  if (cancelarInputModal)
    return cancelarInputModal.addEventListener("click", fecharModalPeloIframe);
};