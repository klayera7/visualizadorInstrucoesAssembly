import {
  lerDoRegistrador,
  escreverNoRegistrador,
  escreverNaMemoria,
  animarBarramentos,
} from "../modules/simuladorUI.js";

export async function CALL(params) {
  const destinoHex = params.op1.valor;
  const destinoNum = parseInt(destinoHex, 16);

  const ipAtual = await lerDoRegistrador("IP", "0000");
  const ipRetorno = ipAtual + 1;

  let spAtual = await lerDoRegistrador("SP", "0000");

  spAtual = spAtual - 1;
  if (spAtual < 0) spAtual = 0xffff;

  const spHex = spAtual.toString(16).toUpperCase().padStart(4, "0");
  await escreverNaMemoria("stackSegment", spHex, ipRetorno);

  await escreverNoRegistrador("SP", spAtual);

  await animarBarramentos(destinoHex.padStart(5, "0"), "CALL", 600);
  await escreverNoRegistrador("IP", destinoNum);
}
