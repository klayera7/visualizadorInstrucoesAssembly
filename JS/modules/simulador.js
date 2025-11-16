import { fecharModal } from "./controleModal.js";
import { MAPA_DE_INSTRUCOES } from "../instrucoes/importacaoInstrucoes.js";

import {
  animarEtapa,
  animarBarramentos,
  animarDestaque,
  obterElementoMemoria,
  calcularEnderecoFisico,
  formatarEnderecoFisico,
  esperar,
} from "./simuladorUI.js";

async function executarCicloCompleto(params) {
  try {
    await animarEtapa("Busca");

    const endFisicoInstrucao = calcularEnderecoFisico(
      "codeSegment",
      params.deslocamento,
    );
    const endFisicoStr = formatarEnderecoFisico(endFisicoInstrucao);

    const nomeInstrucao = params.instrucaoCompleta.split("_")[0].toUpperCase();
    const op1Str = params.op1?.nome || params.op1?.valor || "";

    const op2Str = params.op2 ? params.op2.endereco || params.op2.valor : "";
    const instrucaoCompletaStr = `${nomeInstrucao} ${op1Str}, ${op2Str}`.trim();

    await animarBarramentos(endFisicoStr, "...", 400);
    const elemInstrucao = obterElementoMemoria(
      "codeSegment",
      endFisicoStr,
      instrucaoCompletaStr,
    );

    elemInstrucao.innerText = instrucaoCompletaStr.padEnd(20, " ");

    await animarBarramentos(endFisicoStr, instrucaoCompletaStr, 800);
    await animarDestaque(elemInstrucao);

    await animarEtapa("Decodificação");
    const funcaoDeSimulacao = MAPA_DE_INSTRUCOES[params.instrucaoCompleta];
    if (!funcaoDeSimulacao) {
      console.warn(
        `Função de simulação não encontrada: ${params.instrucaoCompleta}. Pulando execução.`,
      );
      await esperar(500);
    } else {
      await esperar(500);

      await animarEtapa("Execução");

      await funcaoDeSimulacao(params);
    }

    await animarEtapa("Busca");
    await animarBarramentos("----", "----", 200);
  } catch (error) {
    console.error("Erro na simulação:", error);
    alert("Erro na simulação: " + error.message);
  }
}

export function prepararExecucaoInstrucao(params) {
  fecharModal();

  const botaoIniciar = document.querySelector(".btn_icon_play");

  if (botaoIniciar) {
    const novoBotao = botaoIniciar.cloneNode(true);
    botaoIniciar.parentNode.replaceChild(novoBotao, botaoIniciar);

    novoBotao.addEventListener("click", () => {
      console.log(
        `Botão 'Play' clicado. Iniciando ciclo para: ${params.instrucaoCompleta}`,
      );
      executarCicloCompleto(params);
    });
  }
}
