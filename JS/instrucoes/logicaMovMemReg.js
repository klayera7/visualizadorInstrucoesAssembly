import {
  escreverNaMemoria,
  lerDoRegistrador,
  escreverNoRegistrador // <--- Importante
} from "../modules/simuladorUI.js";

export async function movMemReg(params) {

  const regFonte = params.op1.nome;       
  const memOffsetHex = params.op2.endereco; 

  const valorOffset = parseInt(memOffsetHex, 16);
  if (!isNaN(valorOffset)) {
      await escreverNoRegistrador("DI", valorOffset);
  }
  const valorParaSalvar = await lerDoRegistrador(regFonte, params.op1.valorInicial);
  await escreverNaMemoria("dataSegment", memOffsetHex, valorParaSalvar);
}