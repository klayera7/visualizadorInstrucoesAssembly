import { lerDoRegistrador, escreverNaPorta } from "../modules/simuladorUI.js";

export async function simularOUT_AX(params) {

  const nomeReg = params.op1.nome;
  const portaHex = params.op2.valor;  

  const valorParaEnviar = await lerDoRegistrador(nomeReg, params.op1.valorInicial);
  console.log(params, portaHex)
  if (!portaHex) {
        alert("Erro: Você precisa especificar o número da porta de saída.");
        return;
  }
  await escreverNaPorta(portaHex, valorParaEnviar);
}