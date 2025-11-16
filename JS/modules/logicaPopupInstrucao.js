import { atualizarCamposDeEntrada } from "./configuracaoEntradas.js"; // Renomeado
import { fecharModal } from "./controleModal.js"; // Renomeado
import { prepararExecucaoInstrucao } from "./simulador.js"; // Renomeado

const iframeInstruction = document.getElementById("instruction_iframe");
const ifrmaeSegment = document.getElementById("segment_popup");

// Funções que trocam a visibilidade dos iframes
export function alternarParaPopupInstrucoes() {
  iframeInstruction.classList.remove("disable_if_instruction");
  ifrmaeSegment.classList.add("disable_if_instruction");
}

export function alternarParaPopupSegmentos() {
  iframeInstruction.classList.add("disable_if_instruction");
  ifrmaeSegment.classList.remove("disable_if_instruction");
}

// Renomeado de receberValoresInputsInstrucoes
function obterDadosDaInstrucao(doc) {
  if (!doc) doc = iframeInstruction.contentDocument;

  const instrucao = doc.getElementById("instruction").value;
  const endereco_instrucao = doc.getElementById("instruction_address").value;

  let op1 = null;
  let op2 = null;

  const contRegistrador = doc.getElementById("cont_registrador");
  const contMemoria = doc.getElementById("cont_memoria");
  const contImediato = doc.getElementById("cont_imediato");
  const contEndereco = doc.getElementById("cont_endereco");

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

  if (contMemoria && !contMemoria.classList.contains("hidden")) {
    op2 = {
      tipo: "memoria",
      endereco: doc.getElementById("input_memoria").value,
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

  return {
    instrucaoCompleta: instrucao,
    endereco: endereco_instrucao,
    op1: op1,
    op2: op2,
  };
}

// Função principal de inicialização
export const inicializarLogicaPopupInstrucao = () => {
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
        select.addEventListener("change", () =>
          atualizarCamposDeEntrada(iframeInstruction)
        ); // Renomeado
        atualizarCamposDeEntrada(iframeInstruction); // Renomeado
      }

      if (confirmButton) {
        confirmButton.addEventListener("click", (e) => {
          // Passa os dados formatados para o simulador
          prepararExecucaoInstrucao(obterDadosDaInstrucao(doc)); // Renomeado
        });
      }
    });
  }
};
