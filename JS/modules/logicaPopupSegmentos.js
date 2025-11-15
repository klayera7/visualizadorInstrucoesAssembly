import { ativaIfInstrucao } from "./logicaPopupInstrucao.js";
const iframeSegmentPopup = document.querySelector("#segment_popup");

export const segmentValues = {
  dataSegment: "0000",
  extraSegment: "0000",
  stackSegment: "0000",
  codeSegment: "0000",
  cxCounter: "0000",
};

// O seu mapeamento 'segmentDataInfos' está perfeito.
const segmentDataInfos = {
  dataSegment: {
    inputId: "data_segment",
    registerSelector: '[data-name-segment="data"]',
    ramContainerId: "ram_data_segment",
  },
  extraSegment: {
    inputId: "extra_segment",
    registerSelector: '[data-name-segment="extra"]',
    ramContainerId: "ram_extra_segment",
  },
  stackSegment: {
    inputId: "stack_segment",
    registerSelector: '[data-name-segment="stack"]',
    ramContainerId: "ram_stack_segment",
  },
  codeSegment: {
    inputId: "code_segment",
    registerSelector: '[data-name-segment="code"]',
    ramContainerId: "ram_code_segment",
  },
  cxCounter: {
    inputId: "cx_counter",
    registerSelector: '[data-register="cx"]',
  },
};

// Sua função 'loadSegmentsIntoRegisters' está perfeita.
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


function updateRamView(containerId, segmentAddressHex) {
  const container = document.getElementById(containerId);
  if (!container) return; 

  // 1. Converte o valor do SEGMENTO (4 dígitos) para um número
  const segmentAddress = parseInt(segmentAddressHex, 16);
  if (isNaN(segmentAddress)) return;

  
  const physicalBaseAddress = segmentAddress * 16; 

  const linhas = container.querySelectorAll(".linha-codigo");
  const numLinhas = linhas.length;

  linhas.forEach((linha, offset) => {
    const addressElement = linha.querySelector("h5");
    if (addressElement) {
      
      //    Inverte a ordem: a célula mais baixa (offset N-1)
      //    deve ter o endereço base (physicalBaseAddress + 0).
      //    A célula mais alta (offset 0) deve ter o endereço (physicalBaseAddress + N - 1).
      const reverseOffset = numLinhas - 1 - offset;
      const novoEnderecoNum = physicalBaseAddress + reverseOffset;
      
      const novoEnderecoHex = novoEnderecoNum.toString(16).toUpperCase();
      
      // 4. (Goal 2) Formata para 5 dígitos hexadecimais (20 bits)
      addressElement.textContent = novoEnderecoHex.padStart(5, "0");
    }
  });
}

// Sua função 'loadSegmentsIntoRAM' está perfeita.
const loadSegmentsIntoRAM = () => {
  for (const key in segmentDataInfos) {
    const info = segmentDataInfos[key];
    const valorLido = segmentValues[key];

    if (info.ramContainerId && valorLido !== undefined) {
      updateRamView(info.ramContainerId, valorLido);
    }
  }
};

// Sua função 'getSegmentValues' está perfeita.
// Ela já padroniza para 4 dígitos (padStart(4, "0")),
// que é o correto para o valor do segmento.
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
        // padStart(4, "0") está CORRETO aqui.
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
    loadSegmentsIntoRAM(); 
  });
};

// Sua função 'initSegments' está perfeita.
export const initSegments = () => {
  if (iframeSegmentPopup) {
    return iframeSegmentPopup.addEventListener("load", getSegmentValues);
  }
};