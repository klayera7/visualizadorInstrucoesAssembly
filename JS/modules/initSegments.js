import { ativaIfInstrucao } from "./modalAnimadoInstruction.js";
const iframeSegmentPopup = document.querySelector("#segment_popup");

export const segmentValues = {
  dataSegment: "0000",
  extraSegment: "0000",
  stackSegment: "0000",
  codeSegment: "0000",
  cxCounter: "0000",
};

// --- MODIFICAÇÃO 1: Mapeie os novos IDs da RAM aqui ---
const segmentDataInfos = {
  dataSegment: {
    inputId: "data_segment",
    registerSelector: '[data-name-segment="data"]',
    ramContainerId: "ram_data_segment", // <-- NOVO
  },
  extraSegment: {
    inputId: "extra_segment",
    registerSelector: '[data-name-segment="extra"]',
    ramContainerId: "ram_extra_segment", // <-- NOVO
  },
  stackSegment: {
    inputId: "stack_segment",
    registerSelector: '[data-name-segment="stack"]',
    ramContainerId: "ram_stack_segment", // <-- NOVO
  },
  codeSegment: {
    inputId: "code_segment",
    registerSelector: '[data-name-segment="code"]',
    ramContainerId: "ram_code_segment", // <-- NOVO
  },
  cxCounter: {
    inputId: "cx_counter",
    registerSelector: '[data-register="cx"]',
    // (CX não tem um visualizador de RAM, então deixamos em branco)
  },
};

// Esta função (atualizar registradores da CPU) está perfeita, sem mudanças.
const loadSegmentsIntoRegisters = () => {
  for (const key in segmentDataInfos) {
    const selector = segmentDataInfos[key].registerSelector;
    const registerElement = document.querySelector(selector);
    const valorLido = segmentValues[key];

    if (registerElement && valorLido !== undefined) {
      registerElement.textContent = valorLido;
    }
  }
};



function updateRamView(containerId, baseAddressHex) {
  const container = document.getElementById(containerId);
  if (!container) return; // Retorna se o ID não for encontrado (ex: para CX)

  const baseAddress = parseInt(baseAddressHex, 16);
  if (isNaN(baseAddress)) return; // Retorna se o valor não for um hex válido

  // Pega todas as "linhas" de código dentro daquele container
  const linhas = container.querySelectorAll(".linha-codigo");

  linhas.forEach((linha, offset) => {
    const addressElement = linha.querySelector("h5");
    if (addressElement) {
      // Calcula o novo endereço (Base + offset)
      // (Assumindo que cada linha é 1 byte. Se for 2, use 'offset * 2')
      const novoEndereco = (baseAddress + offset).toString(16).toUpperCase();
      
      // Formata para 4 dígitos (ex: 1000, 100A, 100B)
      addressElement.textContent = novoEndereco.padStart(4, "0");
    }
  });
}

/**
 * Loop principal que atualiza TODOS os visualizadores da RAM.
 */
const loadSegmentsIntoRAM = () => {
  for (const key in segmentDataInfos) {
    const info = segmentDataInfos[key];
    const valorLido = segmentValues[key];

    // Se o segmento tiver um ID de RAM e um valor, atualize-o
    if (info.ramContainerId && valorLido !== undefined) {
      updateRamView(info.ramContainerId, valorLido);
    }
  }
};

// --- MODIFICAÇÃO 3: Chame a nova função no listener do botão ---
const getSegmentValues = () => {
  const iframeWindow = iframeSegmentPopup.contentWindow;
  const confirmBtn = iframeWindow.document.querySelector("#confirm_btn");

  confirmBtn.addEventListener("click", () => {
    if (!iframeWindow) return;
    const inputs = {};

    for (const key in segmentDataInfos) {
      const inputId = segmentDataInfos[key].inputId;
      const inputElement = iframeWindow.document.querySelector(`#${inputId}`);
      if (inputElement) {
        inputs[key] = inputElement.value.trim().toUpperCase().padStart(4, "0");
      }
    }
    const inputHexValues = Object.values(inputs);
    const uniqueValues = new Set(inputHexValues);
    if (inputHexValues.length !== uniqueValues.size) {
      iframeWindow.alert(
        "Os valores dos segmentos devem ser diferentes um dos outros",
      );
      return;
    }
    Object.assign(segmentValues, inputs);

    ativaIfInstrucao();
    loadSegmentsIntoRegisters();
    loadSegmentsIntoRAM(); // <-- ADICIONE ESTA LINHA
  });
};

// Esta função está perfeita, sem mudanças.
export const initSegments = () => {
  if (iframeSegmentPopup) {
    return iframeSegmentPopup.addEventListener("load", getSegmentValues);
  }
};