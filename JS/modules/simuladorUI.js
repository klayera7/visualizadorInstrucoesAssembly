import { valoresSegmentos } from "./logicaPopupSegmentos.js";

export function esperar(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function animarBarramentos(endereco, dado, duracao = 500) {
  const busEnd = document.getElementById("address_bus");
  const busDado = document.getElementById("data_bus");

  busEnd.innerText = endereco.toUpperCase();
  const dadoStr =
    typeof dado === "number"
      ? dado.toString(16).toUpperCase().padStart(4, "0")
      : dado;
  busDado.innerText = dadoStr.toUpperCase();

  busEnd.classList.add("bus-active");
  busDado.classList.add("bus-active");

  await esperar(duracao);

  busEnd.classList.remove("bus-active");
  busDado.classList.remove("bus-active");

  await esperar(100);
}

export async function animarDestaque(elemento) {
  if (!elemento) return;
  elemento.classList.add("highlight");
  await esperar(400);
  elemento.classList.remove("highlight");
}

export async function animarEtapa(etapa) {
  const todasEtapas = document.querySelectorAll(".ul_stages li");
  todasEtapas.forEach((li) => li.classList.remove("active"));

  const liEtapa = [...todasEtapas].find((li) => li.innerText === etapa);

  if (liEtapa) {
    liEtapa.classList.add("active");
    await esperar(300);
  }
}

export function calcularEnderecoFisico(nomeSegmento, offsetHex) {
  const valorSegmento = parseInt(valoresSegmentos[nomeSegmento], 16);
  const valorOffset = parseInt(offsetHex, 16);

  if (isNaN(valorSegmento) || isNaN(valorOffset)) {
    throw new Error(
      `Endereço ou offset inválido: ${nomeSegmento}, ${offsetHex}`,
    );
  }
  return valorSegmento * 16 + valorOffset;
}

export function formatarEnderecoFisico(num) {
  return num.toString(16).toUpperCase().padStart(5, "0");
}

function obterElementoRegistrador(regNome) {
  const nome = regNome.toUpperCase();
  const selector = `.registers_container .register h2`;
  const elemento = [...document.querySelectorAll(selector)]
    .find((h2) => h2.innerText === nome)
    ?.closest(".register")
    .querySelector(".register_data_container");

  if (elemento) return elemento;
  console.error("Elemento registrador não encontrado:", nome);
  return null;
}

export function obterElementoMemoria(
  nomeSegmento,
  deslocamentoFisicoStr,
  valorInicial = "0000",
) {
  const mapaRam = {
    codeSegment: "ram_code_segment",
    dataSegment: "ram_data_segment",
    stackSegment: "ram_stack_segment",
    extraSegment: "ram_extra_segment",
  };

  const ramContainerId = mapaRam[nomeSegmento];
  const memContainer = document.getElementById(ramContainerId);
  if (!memContainer) {
    console.error("Container da RAM não encontrado:", ramContainerId);
    return null;
  }

  const enderecoFisico = deslocamentoFisicoStr.toUpperCase();

  let linhas = [...memContainer.querySelectorAll(".linha-codigo")];

  let linhaMem = linhas.find(
    (l) => l.querySelector("h5").innerText.trim() === enderecoFisico,
  );

  if (!linhaMem) {
    linhaMem = document.createElement("div");
    linhaMem.classList.add("linha-codigo");

    const valorHex =
      typeof valorInicial === "number"
        ? valorInicial.toString(16)
        : valorInicial;

    linhaMem.innerHTML = `
      <h5>${enderecoFisico}</h5>
      <h4>${valorHex.padStart(4, "0").toUpperCase()}</h4>
    `;
    memContainer.prepend(linhaMem);
  }
  return linhaMem.querySelector("h4"); // Retorna o <h4>
}

export async function lerDaMemoria(
  nomeSegmento,
  offsetHex,
  valorInicialDecimal,
) {
  const endFisico = calcularEnderecoFisico(nomeSegmento, offsetHex);
  const endFisicoStr = formatarEnderecoFisico(endFisico);

  await animarBarramentos(endFisicoStr, "----", 500);

  const valorInicialNum = parseInt(valorInicialDecimal, 10);
  const elemMem = obterElementoMemoria(
    nomeSegmento,
    endFisicoStr,
    valorInicialNum,
  );
  await animarDestaque(elemMem);

  const valorHex = elemMem.innerText.trim();
  const valorNum = parseInt(valorHex, 16);

  await animarBarramentos(endFisicoStr, valorNum, 500);
  return valorNum; // Retorna um NÚMERO
}

export async function escreverNaMemoria(nomeSegmento, offsetHex, valorNum) {
  const endFisico = calcularEnderecoFisico(nomeSegmento, offsetHex);
  const endFisicoStr = formatarEnderecoFisico(endFisico);
  const valorFormatado = valorNum.toString(16).toUpperCase().padStart(4, "0");

  await animarBarramentos(endFisicoStr, valorNum, 500);

  const elemMem = obterElementoMemoria(nomeSegmento, endFisicoStr);
  elemMem.innerText = valorFormatado;
  await animarDestaque(elemMem);
}

export async function lerDoRegistrador(regNome, valorInicialDecimal) {
  const elemReg = obterElementoRegistrador(regNome);
  await animarDestaque(elemReg);

  let valorHex = elemReg.innerText.trim();

  if (valorHex === "0000" || valorHex === "") {
    return parseInt(valorInicialDecimal, 10);
  }
  return parseInt(valorHex, 16);
}

export async function escreverNoRegistrador(regNome, valorNum) {
  const elemReg = obterElementoRegistrador(regNome);
  const valorFormatado = valorNum.toString(16).toUpperCase().padStart(4, "0");
  elemReg.innerText = valorFormatado;
  await animarDestaque(elemReg);
}
