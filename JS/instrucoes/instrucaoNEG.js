import {
  lerDoRegistrador,
  escreverNoRegistrador,
} from "../modules/simuladorUI.js";

export async function simularNEG_Reg(params) {
  const regNome = params.op1.nome;
  let valor = await lerDoRegistrador(regNome, params.op1.valorInicial);
  valor = (~valor + 1) & 0xFFFF; 
  await escreverNoRegistrador(regNome, valor);
}