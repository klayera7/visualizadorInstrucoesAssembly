import { updateInputs } from "./initInputInstructions.js";
import { fecharModal } from "./modalAnimado.js";

const iframeInstruction = document.getElementById("instruction_iframe");
const ifrmaeSegment = document.getElementById("segment_popup");


export function ativaIfInstrucao() {
  iframeInstruction.classList.remove("disable_if_instruction");
  ifrmaeSegment.classList.add("disable_if_instruction");
}

export function ativaIfSegmento() {
  iframeInstruction.classList.add("disable_if_instruction");
  ifrmaeSegment.classList.remove("disable_if_instruction");
}

if (iframeInstruction){
  const cancelInputButton = iframeInstruction.contentDocument.getElementById("btn_cancel_instruction")
  const select = iframeInstruction.contentDocument.getElementById("instruction")
  cancelInputButton.addEventListener('click', fecharModal)
  select.addEventListener('change', ()=> updateInputs(iframeInstruction))
  
}


