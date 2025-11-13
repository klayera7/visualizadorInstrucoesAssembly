import { ativaIfInstrucao } from "./modalAnimadoInstruction.js";
const iframeSegmentPopup = document.querySelector("#segment_popup");

const segmentValues = {
  dataSegment: "0000",
  extraSegment: "0000",
  stackSegment: "0000",
  codeSegment: "0000",
  cxCounter: "0000",
};

const segmentDataInfos = {
  dataSegment: {
    inputId: "data_segment",
    registerSelector: '[data-name-segment="data"]',
  },
  extraSegment: {
    inputId: "extra_segment",
    registerSelector: '[data-name-segment="extra"]',
  },
  stackSegment: {
    inputId: "stack_segment",
    registerSelector: '[data-name-segment="stack"]',
  },
  codeSegment: {
    inputId: "code_segment",
    registerSelector: '[data-name-segment="code"]',
  },
  cxCounter: {
    inputId: "cx_counter",
    registerSelector: '[data-register="cx"]',
  },
};

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


const getSegmentValues = () => {
  const iframeWindow = iframeSegmentPopup.contentWindow;
  const confirmBtn = iframeWindow.document.querySelector("#confirm_btn");
  if (!confirmBtn) {
    console.log("Botão de confirmação não encontrado no iframe.");
    return;
  }
  
  confirmBtn.addEventListener("click", () => {
    if (!iframeWindow) return
    const inputs = {}
    
    for (const key in segmentDataInfos) {
      
      const inputId = segmentDataInfos[key].inputId;
      const inputElement = iframeWindow.document.querySelector(`#${inputId}`);
      if (inputElement) {
        inputs[key] = inputElement.value.trim().toUpperCase().padStart(4, "0")
        }
      }
      const inputHexValues = Object.values(inputs) 
      const uniqueValues = new Set(inputHexValues)
      console.log(uniqueValues, inputHexValues)
      if (inputHexValues.length !== uniqueValues.size){
        iframeWindow.alert("Os valores dos segmentos devem ser diferentes um dos outros")
        return
      }
      console.log("Segmentos adicionados: ", segmentValues)
      Object.assign(segmentValues, inputs)
      ativaIfInstrucao()
      loadSegmentsIntoRegisters()
    }
    
  );
};

export const initSegments = () => {
  if (iframeSegmentPopup) {
    return iframeSegmentPopup.addEventListener("load", getSegmentValues);
  }
};
