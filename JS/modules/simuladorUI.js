import { valoresSegmentos } from "./logicaPopupSegmentos.js";

export function esperar(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function formatarWord(valor) {
  let num = typeof valor === "string" ? parseInt(valor, 10) : valor;

  if (isNaN(num)) num = 0;

  const word16Bit = (num & 0xffff) >>> 0;

  return word16Bit.toString(16).toUpperCase().padStart(4, "0");
}

export async function animarBarramentos(endereco, dado, duracao = 500) {
  const busEnd = document.getElementById("address_bus");
  const busDado = document.getElementById("data_bus");

  busEnd.innerText = endereco.toUpperCase();

  busDado.innerText = formatarWord(dado);

  busEnd.classList.add("active_bus_address");
  busDado.classList.add("active_bus_data");

  await esperar(duracao);

  busEnd.classList.remove("active_bus_address");
  busDado.classList.remove("active_bus_data");

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
  valorInicial = 0,
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
  if (linhaMem) {
    const h4 = linhaMem.querySelector("h4");
    if (h4.dataset.modificado !== "true" && valorInicial !== undefined) {
      h4.innerText = formatarWord(valorInicial);
    }
    return h4;
  }

  if (!linhaMem) {
    linhaMem = document.createElement("div");
    linhaMem.classList.add("linha-codigo");

    const valorParaEscrever = valorInicial !== undefined ? valorInicial : 0;
    const valorHexFormatado = formatarWord(valorParaEscrever);

    linhaMem.innerHTML = `
      <h5>${enderecoFisico}</h5>
      <h4>${valorHexFormatado}</h4>
    `;
    memContainer.prepend(linhaMem);
  }
  return linhaMem.querySelector("h4");
}

function parseDecimalInput(valorStr) {
  if (!valorStr) return 0;
  const num = parseInt(valorStr, 10);
  return isNaN(num) ? 0 : num;
}

export async function lerDaMemoria(
  nomeSegmento,
  offsetHex,
  valorInicialDecimalStr,
) {
  const endFisico = calcularEnderecoFisico(nomeSegmento, offsetHex);
  const endFisicoStr = formatarEnderecoFisico(endFisico);

  await animarBarramentos(endFisicoStr, "----", 500);

  const valorInicialNum = parseDecimalInput(valorInicialDecimalStr);

  const elemMem = obterElementoMemoria(
    nomeSegmento,
    endFisicoStr,
    valorInicialNum,
  );
  await animarDestaque(elemMem);

  const valorHexNaUI = elemMem.innerText.trim();

  const valorNum = parseInt(valorHexNaUI, 16);

  await animarBarramentos(endFisicoStr, valorNum, 500);
  return valorNum;
}

export async function escreverNaMemoria(nomeSegmento, offsetHex, valorNum) {
  const endFisico = calcularEnderecoFisico(nomeSegmento, offsetHex);
  const endFisicoStr = formatarEnderecoFisico(endFisico);

  await animarBarramentos(endFisicoStr, valorNum, 500);

  const elemMem = obterElementoMemoria(nomeSegmento, endFisicoStr);
  elemMem.innerText = formatarWord(valorNum);
  elemMem.dataset.modificado = "true";
  await animarDestaque(elemMem);
}

export async function escreverNoRegistrador(regNome, valorNum) {
  const elemReg = obterElementoRegistrador(regNome);
  const valorFormatado = formatarWord(valorNum);
  elemReg.innerText = valorFormatado;
  elemReg.dataset.modificado = "true";
  await animarDestaque(elemReg);
}

export async function lerDoRegistrador(regNome, valorInicialDecimalStr) {
  const elemReg = obterElementoRegistrador(regNome);
  await animarDestaque(elemReg);

  let valorParaUsar;

  if (elemReg.dataset.modificado === "true") {
    const valorHexNaUI = elemReg.innerText.trim();
    valorParaUsar = parseInt(valorHexNaUI, 16);
  } else {
    valorParaUsar = parseDecimalInput(valorInicialDecimalStr);

    elemReg.innerText = formatarWord(valorParaUsar);
  }

  return valorParaUsar;
}
