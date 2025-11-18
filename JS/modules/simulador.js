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
  escreverNoRegistrador,
} from "./simuladorUI.js";

async function executarCicloCompleto(params, jaBuscada = false) {
  try {
    if (!jaBuscada) {
      await animarEtapa("Busca");
      const valorIP = parseInt(params.deslocamento, 16);
      if (!isNaN(valorIP)) {
        await escreverNoRegistrador("IP", valorIP);
      } else {
        throw new Error(`Offset (IP) inválido: ${params.deslocamento}`);
      }


      if (params.op2 && params.op2.tipo === "memoria") {
        const enderecoLimpo = params.op2.endereco.replace(/[\[\]]/g, '');
        const valorOffsetMemoria = parseInt(enderecoLimpo, 16);
        
        if (!isNaN(valorOffsetMemoria)) {
          await escreverNoRegistrador("SI", valorOffsetMemoria);
        }
      }

      const endFisicoInstrucao = calcularEnderecoFisico(
        "codeSegment",
        params.deslocamento,
      );
      const endFisicoStr = formatarEnderecoFisico(endFisicoInstrucao);
      const nomeInstrucao = params.instrucaoCompleta.split("_")[0].toUpperCase();
      const op1Str = params.op1?.nome || params.op1?.valor || "";
      
      let op2Str = "";
      if (params.op2) {
        if (params.op2.tipo === "memoria") {
           const end = params.op2.endereco;
           op2Str = end.startsWith("[") ? end : `[${end}]`;
        } else {
           op2Str = params.op2.valor || "";
        }
      }
      let instrucaoCompletaStr = `${nomeInstrucao} ${op1Str}, ${op2Str}`.trim();
      if (instrucaoCompletaStr.endsWith(",")) {
          instrucaoCompletaStr = instrucaoCompletaStr.slice(0, -1);
      }

      await animarBarramentos(endFisicoStr, "...", 400);
      const elemInstrucao = obterElementoMemoria(
        "codeSegment",
        endFisicoStr,
        instrucaoCompletaStr,
      );

      elemInstrucao.innerText = instrucaoCompletaStr.padEnd(20, " ");
      await animarBarramentos(endFisicoStr, instrucaoCompletaStr, 800);
      await animarDestaque(elemInstrucao);
    }

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
    return true;
  } catch (error) {
    console.error("Erro na simulação:", error);
    alert("Erro na simulação: " + error.message);
    return false;
  }
}

export function prepararExecucaoInstrucao(params) {
  fecharModal();
  const botaoIniciar = document.querySelector(".btn_icon_play");
  if (botaoIniciar) {
    const novoBotao = botaoIniciar.cloneNode(true);
    botaoIniciar.parentNode.replaceChild(novoBotao, botaoIniciar);
    let instrucaoJaBuscada = false;
    novoBotao.addEventListener("click", async () => {
      console.log(`Botão 'Play' clicado. Já buscada: ${instrucaoJaBuscada}`);
      const sucesso = await executarCicloCompleto(params, instrucaoJaBuscada);
      if (sucesso) {
        instrucaoJaBuscada = true;
      }
    });
  }
}