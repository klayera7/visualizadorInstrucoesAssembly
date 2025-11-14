import { updateInputs } from "./initInputInstructions.js";
import { fecharModal } from "./modalAnimado.js";
import { exibirValoresInstrucao } from "./fluxos.js";

const iframeInstruction = document.getElementById("instruction_iframe");
const ifrmaeSegment = document.getElementById("segment_popup");

//ativar o iframe de instrucoes
export function ativaIfInstrucao() {
  iframeInstruction.classList.remove("disable_if_instruction");
  ifrmaeSegment.classList.add("disable_if_instruction");
}

//ativar o iframe de segmentos
export function ativaIfSegmento() {
  iframeInstruction.classList.add("disable_if_instruction");
  ifrmaeSegment.classList.remove("disable_if_instruction");
}

//a cada mudanca no select de instrucoes essa funcao eh chamada
if (iframeInstruction) {
  iframeInstruction.addEventListener("load", () => {
    const doc = iframeInstruction.contentDocument;
    if (!doc) {
      console.error("Falha ao carregar contentDocument do iframe.");
      return;
    }

    const cancelInputButton = doc.getElementById("btn_cancel_instruction");
    const select = doc.getElementById("instruction");
    const confirmButton = doc.getElementById("btn_confirm_instruction");

    if (cancelInputButton) {
      cancelInputButton.addEventListener("click", fecharModal);
    }
    if (select) {
      select.addEventListener("change", () => updateInputs(iframeInstruction));

      updateInputs(iframeInstruction);
    }

    if (confirmButton) {
      confirmButton.addEventListener("click", (e) => {
        //essa funcao ta no fluxos.js e vai manipular com base nesses valores
        exibirValoresInstrucao(receberValoresInputsInstrucoes(doc));
      });
    }
  });
}

function receberValoresInputsInstrucoes(doc) {
  if (!doc) doc = iframeInstruction.contentDocument;

  const instructionAdress = doc.getElementById("instruction_address").value;
  const instruction = doc.getElementById("instruction").value;

  let operando1 = "";
  let operando2 = "";
  let valorInicialReg = ""; 


  const contRegistrador = doc.getElementById("cont_registrador");
  const contMemoria = doc.getElementById("cont_memoria");
  const contImediato = doc.getElementById("cont_imediato");
  const contEndereco = doc.getElementById("cont_endereco");

  
  if (contRegistrador && !contRegistrador.classList.contains("hidden")) {
    operando1 = doc.getElementById("input_registrador").value;
    valorInicialReg = doc.getElementById("value_reg").value; 
  } else if (contEndereco && !contEndereco.classList.contains("hidden")) {
    operando1 = doc.getElementById("input_endereco").value;
  }

  if (contMemoria && !contMemoria.classList.contains("hidden")) {
    operando2 = doc.getElementById("input_memoria").value;
  } else if (contImediato && !contImediato.classList.contains("hidden")) {
    operando2 = doc.getElementById("input_imediato").value;
  }

  // Retorna tudo para 'fluxos.js'
  return {
    instructionAdress,
    instruction,
    operando1,
    operando2,
    valorInicialReg,
  };
}
