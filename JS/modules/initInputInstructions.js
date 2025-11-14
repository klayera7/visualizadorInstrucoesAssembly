/**
 * Objeto de Configuração
 * Mapeia a instrução para um array de IDs de container que devem ser mostrados.
 */
const CONFIGURACOES_INSTRUCOES = {
  // --- REGRA 1: 1 Operando (Registrador) ---
  push_reg: { inputs: ["cont_registrador"] },
  pop_reg: { inputs: ["cont_registrador"] },
  inc_reg: { inputs: ["cont_registrador"] },
  dec_reg: { inputs: ["cont_registrador"] },
  mul_reg: { inputs: ["cont_registrador"] },
  neg_reg: { inputs: ["cont_registrador"] },
  div_reg: { inputs: ["cont_registrador"] },
  not_reg: { inputs: ["cont_registrador"] },

  // --- REGRA 2: 2 Operandos (Registrador + Memória) ---
  mov_reg_mem: { inputs: ["cont_registrador", "cont_memoria"] },
  xchg_reg_mem: { inputs: ["cont_registrador", "cont_memoria"] },
  add_reg_mem: { inputs: ["cont_registrador", "cont_memoria"] },
  sub_reg_mem: { inputs: ["cont_registrador", "cont_memoria"] },
  and_reg_mem: { inputs: ["cont_registrador", "cont_memoria"] },
  or_reg_mem: { inputs: ["cont_registrador", "cont_memoria"] },
  xor_reg_mem: { inputs: ["cont_registrador", "cont_memoria"] },
  cmp_reg_mem: { inputs: ["cont_registrador", "cont_memoria"] },

  // --- REGRA 3: 2 Operandos (Registrador + Valor) - O QUE VOCÊ PEDIU ---
  mov_reg_val: { inputs: ["cont_registrador", "cont_imediato"] },
  add_reg_val: { inputs: ["cont_registrador", "cont_imediato"] },
  sub_reg_val: { inputs: ["cont_registrador", "cont_imediato"] },
  cmp_reg_val: { inputs: ["cont_registrador", "cont_imediato"] },
  // (adicione and_reg_val, or_reg_val, xor_reg_val se precisar)

  // --- EXCEÇÕES (JMP, CALL, etc.) ---
  jmp: { inputs: ["cont_endereco"] },
  jxx: { inputs: ["cont_endereco"] },
  call: { inputs: ["cont_endereco"] },
  loop: { inputs: ["cont_endereco"] },

  // --- Casos Especiais ---
  in_ax: { inputs: ["cont_endereco"] },
  out: { inputs: ["cont_endereco"] },

  // --- 0 Operandos ---
  ret: { inputs: [] },
  iret: { inputs: [] },
};

/**
 * Atualiza a UI para mostrar apenas os inputs relevantes.
 * @param {HTMLIFrameElement} iframeDoc - O ELEMENTO iframe (conforme seu código)
 */
export function updateInputs(iframeDoc) {
  // Pega o <select> de instruções
  // Mantendo sua sintaxe .contentDocument
  const instructionSelect = iframeDoc.contentDocument.getElementById("instruction");
  const selectedInstruction = instructionSelect.value;

  // Lista de TODOS os containers de input possíveis
  const allContainers = [
    iframeDoc.contentDocument.getElementById("cont_registrador"),
    iframeDoc.contentDocument.getElementById("cont_memoria"),
    iframeDoc.contentDocument.getElementById("cont_endereco"),
    iframeDoc.contentDocument.getElementById("cont_imediato"), // ADICIONADO
  ];

  // 1. Reseta o estado (esconde tudo)
  allContainers.forEach((container) => {
    if (container) {
      container.classList.add("hidden");
    }
  });

  // 2. Pega a configuração para a instrução selecionada
  const config = CONFIGURACOES_INSTRUCOES[selectedInstruction] || { inputs: [] };

  // 3. Mostra apenas os inputs necessários
  config.inputs.forEach((containerId) => {
    const containerToShow = iframeDoc.contentDocument.getElementById(containerId);
    if (containerToShow) {
      containerToShow.classList.remove("hidden");
    }
  });
}