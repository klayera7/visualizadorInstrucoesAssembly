


import {
  lerDoRegistrador,
  escreverNoRegistrador,
} from "../modules/simuladorUI.js";

export async function mul(params) {
  
  const valorReg = params.op1.nome; 
  const valorSrc = await lerDoRegistrador(valorReg, params.op1.valorInicial);
  const valorAX = await lerDoRegistrador("AX", "0");
  const resultadoCompleto = valorSrc * valorAX;
  //p pegar a parte baixa do valor (resto)
  const novoValorAX = resultadoCompleto % 0x10000;
  //para pegar a parte alta do valor
  const novoValorDX = Math.floor(resultadoCompleto / 0x10000);
  await escreverNoRegistrador("AX", novoValorAX);
  await escreverNoRegistrador("DX", novoValorDX);
}