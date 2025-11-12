const botaoAbrir = document.querySelector('[data-modal="abrir"]');
const botaoFechar = document.querySelector('[data-modal="fechar"]');
const containerModal = document.querySelector('[data-modal="container"]');

const abrirModal = ()=>{
  if (botaoAbrir && botaoFechar && containerModal) {
    containerModal.classList.add("ativo");
  }
}

const fecharModal = () => {
  containerModal.classList.remove("ativo");
}

const cliqueForaModal = ()=> {
  if ('click'.target === this) {
    fecharModal();
  }
}

botaoAbrir.addEventListener("click", abrirModal);
botaoFechar.addEventListener("click", fecharModal);
containerModal.addEventListener("click", cliqueForaModal);