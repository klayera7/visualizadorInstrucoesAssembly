import {
  escreverNaMemoria,
  lerDoRegistrador,
  escreverNoRegistrador,
} from "../modules/simuladorUI.js";

export async function movMemReg(params) {
  const regFonte = params.op1.nome;
  const memOffsetHex = params.op2.endereco;

  const valorParaSalvar = await lerDoRegistrador(
    regFonte,
    params.op1.valorInicial,
  );
  await escreverNaMemoria("dataSegment", memOffsetHex, valorParaSalvar);
}
