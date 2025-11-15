import { updateInputs } from "./configuracaoEntradas.js";
import { fecharModal } from "./controleModal.js";
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

  const instrucao = doc.getElementById("instruction").value;
  const endereco_instrucao = doc.getElementById("instruction_address").value;

  let op1 = null;
  let op2 = null;

  // Pega os containers
  const contRegistrador = doc.getElementById("cont_registrador");
  const contMemoria = doc.getElementById("cont_memoria");
  const contImediato = doc.getElementById("cont_imediato");
  const contEndereco = doc.getElementById("cont_endereco");

  // --- LÓGICA DE COLETA CORRIGIDA ---

  // Operando 1 (Registrador ou Endereço de Pulo)
  if (contRegistrador && !contRegistrador.classList.contains("hidden")) {
    op1 = {
      tipo: "registrador",
      nome: doc.getElementById("input_registrador").value,
      valorInicial: doc.getElementById("value_reg").value,
    };
  } else if (contEndereco && !contEndereco.classList.contains("hidden")) {
    op1 = {
      tipo: "endereco",
      valor: doc.getElementById("input_endereco").value,
    };
  }

  // Operando 2 (Memória ou Imediato)
  if (contMemoria && !contMemoria.classList.contains("hidden")) {
    op2 = {
      tipo: "memoria",
      endereco: doc.getElementById("input_memoria").value,
      // (Assumindo que você tem um input com id 'value_mem' dentro do 'cont_memoria')
      valorInicial: doc.getElementById("value_mem")
        ? doc.getElementById("value_mem").value
        : null,
    };
  } else if (contImediato && !contImediato.classList.contains("hidden")) {
    op2 = {
      tipo: "imediato",
      valor: doc.getElementById("input_imediato").value,
    };
  }

  // Retorna o objeto LIMPO e PRONTO para o 'fluxos.js'
  return {
    instrucaoCompleta: instrucao,
    endereco: endereco_instrucao,
    op1: op1,
    op2: op2,
  };
}
