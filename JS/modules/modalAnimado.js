const botaoAbrir = document.querySelector('[data-modal="abrir"]');
const botaoFechar = document.querySelector('[data-modal="fechar"]');
const containerModal = document.querySelector('[data-modal="container"]');
const cancelarInputModal = document.querySelector('[data-modal="cancel_segment_input"]')

const abrirModal = ()=>{
    containerModal.classList.add("ativo");
}

export const fecharModal = () => {
  containerModal.classList.remove("ativo");
}

const cliqueForaModal = (event)=> {
  if (event.target === event.currentTarget) {
    fecharModal();
  }
}

// para fechar o modal a partir do iframe (clicando no botao de cancelar)
const fecharModalDoIframe = () => {
    const modalNoParent = window.parent.document.querySelector('[data-modal="container"]');
    if (modalNoParent) {
        modalNoParent.classList.remove("ativo");
    } else {
        console.error("Erro: O container modal não foi encontrado na janela pai.");
    }
}

// para evitar que os itens sejam nulos (o browser acusava erro no console)
if (containerModal && botaoAbrir && botaoFechar){
  botaoAbrir.addEventListener("click", abrirModal);
  botaoFechar.addEventListener("click", fecharModal);
  containerModal.addEventListener("click", cliqueForaModal);
}

if (cancelarInputModal) cancelarInputModal.addEventListener('click', fecharModalDoIframe)

