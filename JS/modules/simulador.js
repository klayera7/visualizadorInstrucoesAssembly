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
      console.log("Instrução encontrada na memória.");
    } else {
      const ipPopupNum = parseInt(paramsDoPopup.deslocamento, 16);

      if (ipAtualNum === ipPopupNum) {
        console.log("Memória vazia. Gravando nova instrução...");

        const nome = paramsDoPopup.instrucaoCompleta
          .split("_")[0]
          .toUpperCase();
        const op1 = paramsDoPopup.op1?.nome || paramsDoPopup.op1?.valor || "";
        let op2 = "";

        if (paramsDoPopup.op2) {
          if (paramsDoPopup.op2.tipo === "memoria") {
            const end = paramsDoPopup.op2.endereco || "";
            op2 = end.startsWith("[") ? end : `[${end}]`;
          } else {
            op2 = paramsDoPopup.op2.valor || "";
          }
        }

        let textoVisual;
        // Inverte visualmente se for Store ou Out
        if (
          paramsDoPopup.instrucaoCompleta === "mov_mem_reg" ||
          paramsDoPopup.instrucaoCompleta === "out"
        ) {
          textoVisual = `${nome} ${op2}, ${op1}`;
        }else if(paramsDoPopup.instrucaoCompleta==="mov_reg_val"){
          textoVisual = `${nome} ${op1}, ${paramsDoPopup.op1.valorInicial}`
        }
        else {
          textoVisual = `${nome} ${op1}, ${op2}`;
        }
        textoVisual = textoVisual.replace(/,\s*$/, "").trim();

        await salvarInstrucaoNaMemoria(ipAtualHex, textoVisual, paramsDoPopup);
        instrucaoParaExecutar = paramsDoPopup;
      } else {
        throw new Error(
          `Segmentation Fault: Nenhuma instrução em CS:[${ipAtualHex}]`,
        );
      }
    }

    if (
      instrucaoParaExecutar.op2 &&
      instrucaoParaExecutar.op2.tipo === "memoria"
    ) {
      // Remove colchetes se houver para pegar o número puro
      const enderecoLimpo = instrucaoParaExecutar.op2.endereco.replace(
        /[\[\]]/g,
        "",
      );
      const valorOffset = parseInt(enderecoLimpo, 16);

      if (!isNaN(valorOffset)) {
        // DECISÃO: É escrita ou leitura?
        if (instrucaoParaExecutar.instrucaoCompleta === "mov_mem_reg") {
          // Destino = Memória -> Usa DI (Destination Index)
          await escreverNoRegistrador("DI", valorOffset);
        } else {
          // Fonte = Memória -> Usa SI (Source Index)
          // (Isso cobre MOV Reg,Mem; ADD Reg,Mem; CMP Reg,Mem; etc.)
          await escreverNoRegistrador("SI", valorOffset);
        }
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
      const instrucoesDePulo = [
        "jmp",
        "call",
        "ret",
        "iret",
        "loop",
        "jxx",
        "je",
        "jne",
        "jg",
        "jge",
        "jl",
        "jle",
        "int",
      ];
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
