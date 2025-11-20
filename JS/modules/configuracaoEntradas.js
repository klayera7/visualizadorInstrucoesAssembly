export const CONFIGURACAO_ENTRADAS_INSTRUCAO = {
  push_reg: { inputs: ["cont_registrador"] },
  pop_reg: { inputs: ["cont_registrador"] },
  inc_reg: { inputs: ["cont_registrador"] },
  dec_reg: { inputs: ["cont_registrador"] },
  mul_reg: { inputs: ["cont_registrador"] },
  neg_reg: { inputs: ["cont_registrador"] },
  div_reg: { inputs: ["cont_registrador"] },
  not_reg: { inputs: ["cont_registrador"] },

  mov_reg_mem: { inputs: ["cont_registrador", "cont_memoria"] },
  xchg_reg_mem: { inputs: ["cont_registrador", "cont_memoria"] },
  add_reg_mem: { inputs: ["cont_registrador", "cont_memoria"] },
  sub_reg_mem: { inputs: ["cont_registrador", "cont_memoria"] },
  and_reg_mem: { inputs: ["cont_registrador", "cont_memoria"] },
  or_reg_mem: { inputs: ["cont_registrador", "cont_memoria"] },
  xor_reg_mem: { inputs: ["cont_registrador", "cont_memoria"] },
  cmp_reg_mem: { inputs: ["cont_registrador", "cont_memoria"] },


  jmp: { inputs: ["cont_endereco"] },
  je: { inputs: ["cont_endereco"] },
  jne: { inputs: ["cont_endereco"] },
  jg: { inputs: ["cont_endereco"] },
  jge: { inputs: ["cont_endereco"] },
  jl: { inputs: ["cont_endereco"] },
  jle: { inputs: ["cont_endereco"] },
  call: { inputs: ["cont_endereco"] },
  loop: { inputs: ["cont_endereco"] },

  in_ax: { inputs: ["cont_endereco"] },
  out: { inputs: ["cont_endereco"] },

  ret: { inputs: [] },
  iret: { inputs: [] },
};

export function atualizarCamposDeEntrada(iframeDoc) {
  const instructionSelect =
    iframeDoc.contentDocument.getElementById("instruction");
  const selectedInstruction = instructionSelect.value;

  const allContainers = [
    iframeDoc.contentDocument.getElementById("cont_registrador"),
    iframeDoc.contentDocument.getElementById("cont_memoria"),
    iframeDoc.contentDocument.getElementById("cont_endereco"),
    iframeDoc.contentDocument.getElementById("cont_imediato"),
  ];

  allContainers.forEach((container) => {
    if (container) {
      container.classList.add("hidden");
    }
  });

  const config = CONFIGURACAO_ENTRADAS_INSTRUCAO[selectedInstruction] || {
    inputs: [],
  };

  config.inputs.forEach((containerId) => {
    const containerToShow =
      iframeDoc.contentDocument.getElementById(containerId);
    if (containerToShow) {
      containerToShow.classList.remove("hidden");
    }
  });
}
