
// Objeto de Configuração
const CONFIGURACOES_INSTRUCOES = {
  //instrucoes com 2 operandos
  xchg: { qtd_operandos: 2, p1: "Operando 1", p2: "Operando 2" },
  cmp: { qtd_operandos: 2, p1: "Operando 1", p2: "Operando 2" },

  // 1 Operando
  inc: { qtd_operandos: 1, p1: "Operando (ex: AX)" },
  dec: { qtd_operandos: 1, p1: "Operando (ex: AX)" },
  not: { qtd_operandos: 1, p1: "Operando (ex: AX)" },
};

export function updateInputs(iframeDoc) {
  const instructionSelect =
    iframeDoc.contentDocument.getElementById("instruction");
  const op1Container =
    iframeDoc.contentDocument.getElementById("operand1-container");
  const op2Container =
    iframeDoc.contentDocument.getElementById("operand2-container");
  const op1Input = iframeDoc.contentDocument.getElementById("operand1");
  const op2Input = iframeDoc.contentDocument.getElementById("operand2");
  const selectedInstruction = instructionSelect.value;

  const config = CONFIGURACOES_INSTRUCOES[selectedInstruction] || {
    qtd_operandos: 0,
  };

  op1Container.classList.add("hidden");
  op2Container.classList.add("hidden");

  if (config.qtd_operandos >= 1) {
    op1Input.placeholder = config.p1 || "Operando 1";
    op1Container.classList.remove("hidden");
  }
  if (config.qtd_operandos === 2) {
    op2Input.placeholder = config.p2 || "Operando 2";
    op2Container.classList.remove("hidden");
  }
}
