const iframeInstruction = document.getElementById("instruction_iframe");
const ifrmaeSegment = document.getElementById("segment_popup");

export function ativaIfInstrucao() {
  iframeInstruction.classList.remove("active_if_instruction");
  ifrmaeSegment.classList.add("active_if_instruction");
}

export function ativaIfSegmento() {
  iframeInstruction.classList.add("active_if_instruction");
  ifrmaeSegment.classList.remove("active_if_instruction");
}
