import { atualizarCamposDeEntrada } from "./configuracaoEntradas.js";
import { fecharModal } from "./controleModal.js";
import { prepararExecucaoInstrucao } from "./simulador.js";

const iframeInstruction = document.getElementById("instruction_iframe");
const ifrmaeSegment = document.getElementById("segment_popup");

export function alternarParaPopupInstrucoes() {
  iframeInstruction.classList.remove("disable_if_instruction");
  ifrmaeSegment.classList.add("disable_if_instruction");
}
export function alternarParaPopupSegmentos() {
  iframeInstruction.classList.add("disable_if_instruction");
  ifrmaeSegment.classList.remove("disable_if_instruction");
}

function obterDadosDaInstrucao(doc) {
  if (!doc) doc = iframeInstruction.contentDocument;
  const instrucao = doc.getElementById("instruction").value;
  const offset_instrucao = doc
    .getElementById("offset-address-instruction")
    .value.trim();

  let op1;
  let op2;

  const contRegistrador = doc.getElementById("cont_registrador");
  const contMemoria = doc.getElementById("cont_memoria");
  const contImediato = doc.getElementById("cont_imediato");
  const contEndereco = doc.getElementById("cont_endereco");

  if (contRegistrador && !contRegistrador.classList.contains("hidden")) {
    op1 = {
      tipo: "registrador",
      nome: doc.getElementById("input_registrador").value,
      valorInicial: doc.getElementById("value_reg").value.trim(),
    };
  } else if (contEndereco && !contEndereco.classList.contains("hidden")) {
    op1 = {
      tipo: "endereco",
      valor: doc.getElementById("input_endereco").value.trim(),
    };
  }

  if (contMemoria && !contMemoria.classList.contains("hidden")) {
    op2 = {
      tipo: "memoria",
      endereco: doc.getElementById("input_memoria").value.trim(),
      valorInicial: doc.getElementById("value_mem")
        ? doc.getElementById("value_mem").value.trim()
        : null,
    };
  } else if (contImediato && !contImediato.classList.contains("hidden")) {
    op2 = {
      tipo: "imediato",
      valor: doc.getElementById("input_imediato").value.trim(),
    };
  }

  return {
    instrucaoCompleta: instrucao,
    deslocamento: offset_instrucao,
    op1: op1,
    op2: op2,
  };
}

function eHexValido16Bit(valorHex) {
  if (!valorHex) return false;

  let valorLimpo = valorHex.toUpperCase();
  if (valorLimpo.endsWith("H")) {
    valorLimpo = valorLimpo.slice(0, -1);
  }
  if (!valorLimpo) return false;
  const charsHex = "0123456789ABCDEF";
  for (const char of valorLimpo) {
    if (!charsHex.includes(char)) {
      return false;
    }
  }

  const valorNum = parseInt(valorLimpo, 16);
  return valorNum >= 0 && valorNum <= 0xffff;
}

function eDecimalValido16Bit(valorDecimal) {
  if (!valorDecimal) return false;

  const charsDec = "0123456789";

  for (const char of valorDecimal) {
    if (!charsDec.includes(char)) {
      return false;
    }
  }

  const valorNum = parseInt(valorDecimal, 10);
  return valorNum >= 0 && valorNum <= 65535;
}

function validarEntradasDaInstrucao(dados, janelaAlerta) {
  const alertar = (mensagem) => {
    if (janelaAlerta && janelaAlerta.alert) {
      janelaAlerta.alert(mensagem);
    } else {
      alert(mensagem);
    }
  };

  if (!dados.instrucaoCompleta) {
    alertar("Erro: Nenhuma instrução foi selecionada.");
    return false;
  }

  if (!eHexValido16Bit(dados.deslocamento)) {
    alertar(
      "Erro: O 'Endereço da instrução' (IP) deve ser um valor HEXADECIMAL válido (0000-FFFF).",
    );
    return false;
  }

  if (dados.op1) {
    if (dados.op1.tipo === "registrador") {
      if (!dados.op1.nome) {
        alertar("Erro: O Registrador (Operando 1) não foi selecionado.");
        return false;
      }
      if (!eDecimalValido16Bit(dados.op1.valorInicial)) {
        alertar(
          "Erro: O 'Valor Inicial do Registrador' deve ser um valor DECIMAL válido (0-65535).",
        );
        return false;
      }
    }
    if (dados.op1.tipo === "endereco" && !eHexValido16Bit(dados.op1.valor)) {
      alertar(
        "Erro: O 'Endereço (JMP/CALL)' deve ser um valor HEXADECIMAL válido (0000-FFFF).",
      );
      return false;
    }
  }

  if (dados.op2) {
    if (dados.op2.tipo === "memoria") {
      if (!dados.op2.endereco) {
        alertar(
          "Erro: O 'Endereço de Memória' (Operando 2) não foi preenchido.",
        );
        return false;
      }

      if (!eDecimalValido16Bit(dados.op2.valorInicial)) {
        alertar(
          "Erro: O 'Valor Inicial na Memória' deve ser um valor DECIMAL válido (0-65535).",
        );
        return false;
      }
    }
    if (
      dados.op2.tipo === "imediato" &&
      !eDecimalValido16Bit(dados.op2.valor)
    ) {
      alertar(
        "Erro: O 'Valor Imediato' (Operando 2) deve ser um valor DECIMAL válido (0-65535).",
      );
      return false;
    }
  }

  return true;
}

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
          atualizarCamposDeEntrada(iframeInstruction),
        );
        atualizarCamposDeEntrada(iframeInstruction);
      }

      if (confirmButton) {
        confirmButton.addEventListener("click", (e) => {
          const dadosDaInstrucao = obterDadosDaInstrucao(doc);

          if (validarEntradasDaInstrucao(dadosDaInstrucao, doc.defaultView)) {
            prepararExecucaoInstrucao(dadosDaInstrucao);
          }
        });
      }
    });
  }
};
