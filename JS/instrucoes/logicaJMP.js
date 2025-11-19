import {
  escreverNoRegistrador,
  animarBarramentos,
} from "../modules/simuladorUI.js";

export async function jmpADDR(params) {
  const destinoHex = params.op1.valor;
  const destinoNum = parseInt(destinoHex, 16);

  await animarBarramentos(destinoHex.padStart(5, "0"), "JMP", 600);

  await escreverNoRegistrador("IP", destinoNum);
}
