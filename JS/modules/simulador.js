import { fecharModal } from "./controleModal.js";
import { MAPA_DE_INSTRUCOES } from "../instrucoes/importacaoInstrucoes.js";

import {
  animarEtapa,
  animarBarramentos,
  esperar,
  escreverNoRegistrador,
  lerDoRegistrador,
  salvarInstrucaoNaMemoria,
  recuperarInstrucaoDaMemoria,
} from "./simuladorUI.js";

async function executarCicloCompleto(paramsDoPopup) {
  try {
    await animarEtapa("Busca");

    const ipAtualNum = await lerDoRegistrador(
      "IP",
      parseInt(paramsDoPopup.deslocamento, 16),
    );
    const ipAtualHex = ipAtualNum.toString(16).toUpperCase().padStart(4, "0");

    console.log(`FETCH: Buscando instrução em CS:[${ipAtualHex}]...`);

    let instrucaoParaExecutar = await recuperarInstrucaoDaMemoria(ipAtualHex);

    if (instrucaoParaExecutar) {
      console.log("Instrução encontrada");
    } else {
      const ipPopupNum = parseInt(paramsDoPopup.deslocamento, 16);

      if (ipAtualNum === ipPopupNum) {
        console.log("Memória vazia. Gravando a nova instrução do usuário...");

        if (paramsDoPopup.op2 && paramsDoPopup.op2.tipo === "memoria") {
          const enderecoLimpo = paramsDoPopup.op2.endereco.replace(
            /[\[\]]/g,
            "",
          ); //regex p remover colchetes
          const valorOffsetMemoria = parseInt(enderecoLimpo, 16);
          if (!isNaN(valorOffsetMemoria)) {
            await escreverNoRegistrador("SI", valorOffsetMemoria);
          }
        }

        const nome = paramsDoPopup.instrucaoCompleta
          .split("_")[0]
          .toUpperCase();
        const op1 = paramsDoPopup.op1?.nome || paramsDoPopup.op1?.valor || "";
        let op2 = "";
        if (paramsDoPopup.op2) {
          if (paramsDoPopup.op2.tipo === "memoria") {
            const end = paramsDoPopup.op2.endereco;
            op2 = end.startsWith("[") ? end : `[${end}]`;

            // Instrução CMP estava mostrando o deslocamento ao invés do valor, essa função corrige esse comportamento.
                if (paramsDoPopup.instrucaoCompleta && paramsDoPopup.instrucaoCompleta.startsWith("cmp")) {
                  op2 = paramsDoPopup.op2.valorInicial
                    ? `[${paramsDoPopup.op2.valorInicial}]`
                    : op2;
                }
          } else {
            op2 = paramsDoPopup.op2.valor || "";
          }
        }
        // regex q remove vírgula final se não tiver Op2
        const textoVisual = `${nome} ${op1}, ${op2}`
          .replace(/,\s*$/, "")
          .trim();

        await salvarInstrucaoNaMemoria(ipAtualHex, textoVisual, paramsDoPopup);
        instrucaoParaExecutar = paramsDoPopup;
      } else {
        throw new Error(
          `Nenhuma instrução em CS:[${ipAtualHex}]`
        );
      }
    }

    await animarEtapa("Decodificação");
    const funcaoDeSimulacao =
      MAPA_DE_INSTRUCOES[instrucaoParaExecutar.instrucaoCompleta];
    if (!funcaoDeSimulacao) {
      console.warn(
        `Instrução não implementada: ${instrucaoParaExecutar.instrucaoCompleta}`,
      );
      await esperar(500);
    } else {
      await esperar(500);
      await animarEtapa("Execução");
      await funcaoDeSimulacao(instrucaoParaExecutar);

      const tipoInstrucao = instrucaoParaExecutar.instrucaoCompleta;
      const instrucoesDePulo = ["jmp", "call", "ret", "iret", "loop", "jxx", "je", "jne", "jg", "jge", "jl", "jle"];
      const ehPulo = instrucoesDePulo.some((pulo) =>
        tipoInstrucao.startsWith(pulo),
      );

      if (!ehPulo) {
        const proximoIP = ipAtualNum + 1;
        await escreverNoRegistrador("IP", proximoIP);
      }
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
    //tava bugando antes
    botaoIniciar.parentNode.replaceChild(novoBotao, botaoIniciar);
    novoBotao.addEventListener("click", async () => {
      console.log("Play clicado.");
      await executarCicloCompleto(params);
    });
  }
}
