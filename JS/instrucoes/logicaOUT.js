import { lerDoRegistrador, escreverNaPorta } from "../modules/simuladorUI.js";

export async function simularOUT_AX(params) {

  const portaHex = params.op1.valor;
  const regFonte = params.op2.nome;  
  if (!portaHex) {
        alert("Erro: Você precisa especificar o número da porta de saída.");
        return;
  }

  const valorParaEnviar = await lerDoRegistrador(regFonte, "0");
  await escreverNaPorta(portaHex, valorParaEnviar);
}