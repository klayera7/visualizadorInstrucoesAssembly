import {
  lerDoRegistrador,
  escreverNoRegistrador,
  escreverNaMemoria,
  lerDaMemoria,
} from "../modules/simuladorUI.js";

export async function push_reg(params) {
  const regNome = params.op1.nome;
  const valorParaGuardar = await lerDoRegistrador(
    regNome,
    params.op1.valorInicial,
  );
  let spAtual = await lerDoRegistrador("SP", "0000");
  spAtual = spAtual - 1;
  if (spAtual < 0) {
    spAtual = 0xffff;
  }
  const spHex = spAtual.toString(16).toUpperCase().padStart(4, "0");
  await escreverNaMemoria("stackSegment", spHex, valorParaGuardar);
  await escreverNoRegistrador("SP", spAtual);
}
