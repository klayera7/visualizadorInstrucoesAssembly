import { fecharModal } from "./modules/modalAnimado.js";
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
      const valorFormatado = valorLido.toUpperCase().padStart(4, "0");
      registerElement.textContent = valorFormatado;
    }
  }
};

const hasDuplicates = (valueToBeAdded, object) => {
  const normalizedValue = valueToBeAdded.trim().toUpperCase();
  const values = Object.values(object).map((v) => v.trim().toUpperCase());
  return values.includes(normalizedValue);
};

const getSegmentValues = () => {
  const iframeWindow = iframeSegmentPopup.contentWindow;
  const confirmBtn = iframeWindow.document.querySelector("#confirm_btn");
  if (!confirmBtn) {
    console.log("Botão de confirmação não encontrado no iframe.");
    return;
  }
  confirmBtn.addEventListener("click", () => {
    if (iframeWindow) {
      for (const key in segmentDataInfos) {
        const inputId = segmentDataInfos[key].inputId;
        const inputElement = iframeWindow.document.querySelector(`#${inputId}`);

        if (inputElement) {
          if (hasDuplicates(inputElement.value, segmentValues)) {
            iframeWindow.alert("Os valores devem ser únicos");
            break;
          } else {
            segmentValues[key] = inputElement.value;
          }
        }
      }

      fecharModal();
      loadSegmentsIntoRegisters();
      console.log("Valores dos segmentos lidos e armazenados:", segmentValues);
    }
  });
};

if (iframeSegmentPopup) {
  iframeSegmentPopup.addEventListener("load", getSegmentValues);
}
