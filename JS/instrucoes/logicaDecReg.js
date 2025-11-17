import { lerDoRegistrador, escreverNoRegistrador } from "../modules/simuladorUI.js";

export async function simularDecReg(params){
  const nome = params.op1.nome
  let valor = await lerDoRegistrador(nome, params.op1.valorInicial)
  valor--
  if (valor<0) return
  await escreverNoRegistrador(nome, valor)
}