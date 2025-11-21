import {
  lerDoRegistrador,
  escreverNoRegistrador,
  lerDaMemoria,
  animarBarramentos,
} from "../modules/simuladorUI.js";

export async function RET(params) {
  let spAtual = await lerDoRegistrador("SP", "0000");

  if (spAtual === 0) {
    alert("Erro: A pilha está vazia.");
    return;
  }

  const spHex = spAtual.toString(16).toUpperCase().padStart(4, "0");

  const enderecoRetorno = await lerDaMemoria("stackSegment", spHex, "0");

  spAtual = spAtual + 1;
  if (spAtual > 0xffff) spAtual = 0;

  await escreverNoRegistrador("SP", spAtual);

  const endRetornoStr = enderecoRetorno
    .toString(16)
    .toUpperCase()
    .padStart(4, "0");
  await animarBarramentos(endRetornoStr, "RET", 600);

  await escreverNoRegistrador("IP", enderecoRetorno);
}
