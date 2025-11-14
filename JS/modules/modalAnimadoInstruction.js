import { updateInputs } from "./initInputInstructions.js";
import { fecharModal } from "./modalAnimado.js";
import { exibirValoresInstrucao } from "./fluxos.js";
import { segmentValues } from "./initSegments.js";

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
  const confirmButton = iframeInstruction.contentDocument.getElementById('btn_confirm_instruction')
  cancelInputButton.addEventListener('click', fecharModal)
  select.addEventListener('change', ()=> updateInputs(iframeInstruction))
  confirmButton.addEventListener('click', ()=> {
    exibirValoresInstrucao(receberValoresInputsInstrucoes())
  })
}

function receberValoresInputsInstrucoes (){
  const instructionAdress = iframeInstruction.contentDocument.getElementById('instruction_address').value;
  const input1 = iframeInstruction.contentDocument.getElementById("operand1").value;
  const input2 = iframeInstruction.contentDocument.getElementById("operand2").value;
  console.log("valores", segmentValues)
  return {instructionAdress, input1, input2}
}


