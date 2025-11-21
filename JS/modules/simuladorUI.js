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

function atualizarDisplayCalculo(nomeSegmento, offsetHex, enderecoFisicoVal) {
  const MAPA_NOMES_SEGMENTOS = {
    codeSegment: "CS",
    dataSegment: "DS",
    stackSegment: "SS",
    extraSegment: "ES",
    ioSegment: "IO",
  };
  const containerCalc = document.querySelector(".cont_calc #calc");
  const segment = document.querySelector(".cont_calc #segment");
  const offset = document.querySelector(".cont_calc #offset");
  if (!containerCalc || !offset || !segment) return;

  const valorSegmentoHex = valoresSegmentos[nomeSegmento];

  const nomeCurto = MAPA_NOMES_SEGMENTOS[nomeSegmento] || "SEG";
  const endFisicoHex = formatarEnderecoFisico(enderecoFisicoVal);

  const textoEquacao = {
    nomeSegment: nomeCurto,
    resultado: endFisicoHex,
    multiplicador: "10H",
    valorBase: valorSegmentoHex,
  };
  segment.innerText = `Segmento: ${textoEquacao.nomeSegment}`
  offset.innerHTML = `Deslocamento: ${offsetHex}`
  containerCalc.innerText = `(${valorSegmentoHex}H x ${textoEquacao.multiplicador}) + ${offsetHex} = ${textoEquacao.resultado}`;

  animarDestaque(containerCalc.parentElement);
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

function obterElementoFlag(flagNome) {
  const nome = String(flagNome).toUpperCase();
  const selector = ".flags_container .register h2";
  const h2 = [...document.querySelectorAll(selector)].find(
    (el) => el.innerText && el.innerText.trim().toUpperCase() === nome,
  );
  if (!h2) return null;
  const container = h2.closest(".register");
  if (!container) return null;
  return container.querySelector(".register_data_container");
}

export function lerFlag(flagNome) {
  const dataContainer = obterElementoFlag(flagNome);
  if (!dataContainer) return 0;
  const text = dataContainer.innerText.trim();
  const num = parseInt(text, 10);
  return isNaN(num) ? 0 : num;
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
    ioSegment: "ram_io_segment"
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

  atualizarDisplayCalculo(nomeSegmento, offsetHex, endFisico);

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
  atualizarDisplayCalculo(nomeSegmento, offsetHex, endFisico);
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

export async function escreverFlag(nomeFlag, valor) {
  const dataContainer = obterElementoFlag(nomeFlag);
  if (!dataContainer) return;

  const novoValor = String(valor).trim();
  const valorAtual = dataContainer.innerText ? dataContainer.innerText.trim() : "";

  if (valorAtual === novoValor) {
    return;
  }

  dataContainer.innerText = novoValor;
  dataContainer.dataset.modificado = "true";
  await animarDestaque(dataContainer);
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

export async function salvarInstrucaoNaMemoria(
  offsetHex,
  textoVisual,
  objetoParams,
) {
  const endFisico = calcularEnderecoFisico("codeSegment", offsetHex);
  atualizarDisplayCalculo("codeSegment", offsetHex, endFisico);
  const endFisicoStr = formatarEnderecoFisico(endFisico);
  await animarBarramentos(endFisicoStr, "WRITE", 500);
  const elemH4 = obterElementoMemoria("codeSegment", endFisicoStr, textoVisual);

  elemH4.innerText = textoVisual.padEnd(20, " ");
  elemH4.dataset.modificado = "true";

  const linhaDiv = elemH4.parentElement;
  linhaDiv.dataset.instrucao = JSON.stringify(objetoParams);

  await animarDestaque(elemH4);
}

export async function recuperarInstrucaoDaMemoria(offsetHex) {
  const endFisico = calcularEnderecoFisico("codeSegment", offsetHex);
  atualizarDisplayCalculo("codeSegment", offsetHex, endFisico);
  const endFisicoStr = formatarEnderecoFisico(endFisico);

  const container = document.getElementById("ram_code_segment");
  if (!container) return null;

  const linha = [...container.querySelectorAll(".linha-codigo")].find(
    (l) => l.querySelector("h5").innerText.trim() === endFisicoStr,
  );

  if (linha && linha.dataset.instrucao) {
    await animarBarramentos(endFisicoStr, "FETCH", 400);

    const elemH4 = linha.querySelector("h4");
    await animarDestaque(elemH4);

    return JSON.parse(linha.dataset.instrucao);
  }

  return null;
}

function obterElementoPorta(portaHex) {
  const container = document.getElementById("io_ports_container");
  if (!container) return null;

  const placeholder = container.querySelector("span");
  if (placeholder) placeholder.parentElement.remove();

  const portaFormatada = portaHex.toUpperCase().padStart(4, "0");

  let linhaPorta = [...container.querySelectorAll(".linha-codigo")].find(
    (l) => l.querySelector("h5").innerText.trim() === portaFormatada
  );

  if (!linhaPorta) {
    linhaPorta = document.createElement("div");
    linhaPorta.classList.add("linha-codigo");
    linhaPorta.innerHTML = `
      <h5>${portaFormatada}</h5>
      <h4>0000</h4>
    `;
    container.prepend(linhaPorta);
  }
  return linhaPorta.querySelector("h4");
}

export async function escreverNaPorta(portaHex, valorNum) {
  const valorFormatado = valorNum.toString(16).toUpperCase().padStart(4, "0");

  await animarBarramentos("I/O " + portaHex, valorFormatado, 500);

  const elemPorta = obterElementoPorta(portaHex);
  if (elemPorta) {
    elemPorta.innerText = valorFormatado;
    await animarDestaque(elemPorta);
  }
}

export async function lerDaPorta(portaHex) {
  await animarBarramentos("I/O " + portaHex, "READ", 500);

  const elemPorta = obterElementoPorta(portaHex);
  let valorNum = 0;

  if (elemPorta) {
    const valorAtual = elemPorta.innerText.trim();
    if (valorAtual === "0000") {
       const entrada = prompt(`\nA CPU está lendo da Porta ${portaHex}h.\nDigite o valor (Hex) que este dispositivo deve enviar:`);
       if (entrada) {
         valorNum = parseInt(entrada, 16);
         if (isNaN(valorNum)) valorNum = 0;
         elemPorta.innerText = valorNum.toString(16).toUpperCase().padStart(4, "0");
       }
    } else {
       valorNum = parseInt(valorAtual, 16);
    }
    await animarDestaque(elemPorta);
  }
  await animarBarramentos("I/O " + portaHex, valorNum, 500);
  return valorNum;
}