import { alternarParaPopupInstrucoes } from "./logicaPopupInstrucao.js"; // Importa o "alternador"

const iframeSegmentPopup = document.querySelector("#segment_popup");

// Objeto para referência dos valores dos segmentos
export const valoresSegmentos = {
  dataSegment: "0000",
  extraSegment: "0000",
  stackSegment: "0000",
  codeSegment: "0000",
  ioSegment: "0000",
};

// Objeto para mapear os campos (dentro do popup e no index)
const configSegmentos = {
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
    isStack: true
  },
  codeSegment: {
    inputId: "code_segment",
    registerSelector: '[data-name-segment="code"]',
    ramContainerId: "ram_code_segment",
  }
};

// Atualiza a UI dos registradores na CPU
const carregarSegmentosNosRegistradores = () => {
  for (const key in configSegmentos) {
    const selector = configSegmentos[key].registerSelector;
    const registerElement = document.querySelector(selector);
    const valorLido = valoresSegmentos[key];

    if (registerElement && valorLido !== undefined) {
      registerElement.textContent = valorLido;
    }
  }
};

// Atualiza a UI dos endereços na RAM
function atualizarVisualizacaoRAM(containerId, segmentAddressHex, isStack=false) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const segmentAddress = parseInt(segmentAddressHex, 16);
  if (isNaN(segmentAddress)) return;

  const endFisico = segmentAddress * 16;
  const linhas = container.querySelectorAll(".linha-codigo");

  linhas.forEach((linha, index) => {
    const addressElement = linha.querySelector("h5");
    if (addressElement) {
      let offSetDoSegmento;
      if (isStack){
        offSetDoSegmento = 0xFFFF - index
      }
      else{
        const numLinhas = linhas.length
        offSetDoSegmento = (numLinhas-1) - index
      }
      const novoEnderecoNum = endFisico + offSetDoSegmento;
      const novoEnderecoHex = novoEnderecoNum.toString(16).toUpperCase();
      addressElement.textContent = novoEnderecoHex.padStart(5, "0");
    }
  });
}

// Atualiza todos os blocos da RAM
const carregarSegmentosNaRAM = () => {
  for (const key in configSegmentos) {
    const info = configSegmentos[key];
    const valorLido = valoresSegmentos[key];

    if (info.ramContainerId && valorLido !== undefined) {
      atualizarVisualizacaoRAM(info.ramContainerId, valorLido, info.isStack);
    }
  }
};

// Define o listener do botão "Confirmar" de dentro do popup de segmentos
const anexarListenerPopupSegmentos = () => {
  const iframeWindow = iframeSegmentPopup.contentWindow;
  const confirmBtn = iframeWindow.document.querySelector("#confirm_btn");
  const cancelBtn = iframeWindow.document.querySelector("#cancel_btn");
  if (!confirmBtn) {
    console.error(
      "Botão de confirmação de segmentos não encontrado no iframe.",
    );
    return;
  }
  if (cancelBtn){
  cancelBtn.addEventListener("click", () => {
        const modalNoParent = window.parent.document.querySelector('[data-modal="container"]');
        if (modalNoParent) {
          modalNoParent.classList.remove("ativo");
        }
    })
  }

  confirmBtn.addEventListener("click", () => {
    if (!iframeWindow) return;
    const inputs = {};

    for (const key in configSegmentos) {
      const inputId = configSegmentos[key].inputId;
      const valorResgatado = iframeWindow.document.querySelector(`#${inputId}`).value
      const valorConvertido = parseInt(valorResgatado, 16)
      if (isNaN(valorConvertido) || valorConvertido < 0) return iframeWindow.alert("Insira um valor hexadecimal válido")
      const inputElement = iframeWindow.document.querySelector(`#${inputId}`);
      if (inputElement) {
        inputs[key] = valorResgatado.trim().toUpperCase().padStart(4, "0");
      }
    }

    const TAMANHO_MINIMO_SEGMENTO_HEX = 0x1000;

    const segmentosParaValidar = [
      { nome: "Segmento de Código", valor: parseInt(inputs.codeSegment, 16) },
      { nome: "Segmento de Dados", valor: parseInt(inputs.dataSegment, 16) },
      { nome: "Segmento de Pilha", valor: parseInt(inputs.stackSegment, 16) },
      { nome: "Segmento Extra", valor: parseInt(inputs.extraSegment, 16) },
      { nome: "Segmento de I/O", valor: parseInt(inputs.ioSegment, 16) },
    ];

    const valoresUnicos = new Set(segmentosParaValidar.map((s) => s.valor));
    if (valoresUnicos.size < segmentosParaValidar.length) {
      iframeWindow.alert(
        "Os valores dos segmentos de memória (CS, DS, SS, ES) devem ser diferentes um dos outros.",
      );
      return;
    }
    
    segmentosParaValidar.sort((a, b) => a.valor - b.valor);

    for (let i = 1; i < segmentosParaValidar.length; i++) {
      const segAnterior = segmentosParaValidar[i - 1];
      const segAtual = segmentosParaValidar[i];

      const diferenca = segAtual.valor - segAnterior.valor;

      if (diferenca < TAMANHO_MINIMO_SEGMENTO_HEX) {
        const msg = `Conflito de Segmento! Cada segmento ocupa 64KB, então os valores de início devem ter uma diferença de pelo menos 1000h.`;
        iframeWindow.alert(msg);
        return; 
      }
    }

    // Atualiza o objeto para mapeamento dos segmentos
    Object.assign(valoresSegmentos, inputs);

    // Funções de atualização da UI
    alternarParaPopupInstrucoes();
    carregarSegmentosNosRegistradores();
    carregarSegmentosNaRAM();
  });
};

// Função principal de inicialização
export const inicializarLogicaSegmentos = () => {
  if (iframeSegmentPopup) {
    iframeSegmentPopup.addEventListener("load", anexarListenerPopupSegmentos);
  }
};
