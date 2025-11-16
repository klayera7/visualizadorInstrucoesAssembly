import {
  lerDoRegistrador,
  escreverNoRegistrador,
} from "../modules/simuladorUI.js";


export async function simularINC_Reg(params) {
  const regNome = params.op1.nome;
  let valor = await lerDoRegistrador(regNome, params.op1.valorInicial);
  valor++;
  if (valor > 0xFFFF) { 
    valor = 0; 
  }
  await escreverNoRegistrador(regNome, valor);
}