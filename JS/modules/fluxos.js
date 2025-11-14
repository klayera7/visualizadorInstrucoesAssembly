import { fecharModal } from "./modalAnimado.js";

function fluxoendereco() {
  const endereco = document.getElementById("address_bus");

  endereco.classList.add("active_bus_address");

  const time = 500; // Tempo em milissegundos para manter a cor destacada

  setTimeout(() => {
    endereco.classList.remove("active_bus_address");
  }, time);
}

function fluxodados() {
  const dados = document.getElementById("data_bus");

  dados.classList.add("active_bus_data");

  const time = 500; // Tempo em milissegundos para manter a cor destacada

  setTimeout(() => {
    dados.classList.remove("active_bus_data");
  }, time);
}

function fluxo_dados_endereco() {
  fluxoendereco();
  fluxodados();
}


export function exibirValoresInstrucao({ ...infos }) {
  fecharModal()
  const botaoIniciar = document.querySelector(".btn_icon_play");
  if (botaoIniciar) botaoIniciar.addEventListener("click", ()=>{
    fluxo_dados_endereco()
    fecharModal()
    console.log(infos)
  } );
}
