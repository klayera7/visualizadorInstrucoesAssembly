import { escreverNoRegistrador, lerDaPorta } from "../modules/simuladorUI.js";

export async function simularIN_AX(params) {
  const regDestino = params.op1.nome;
  const portaHex = params.op2.valor;

  const valorRecebido = await lerDaPorta(portaHex);

  await escreverNoRegistrador(regDestino, valorRecebido);
}
