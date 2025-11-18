// Importa APENAS os "verbos" de que precisa do assistente de UI
import {
  lerDoRegistrador,
  lerDaMemoria,
  escreverNaMemoria,
  escreverNoRegistrador,
} from "../modules/simuladorUI.js";

export async function simularXCHG_Reg_Mem(params) {
  const regNome = params.op1.nome;
  const memOffset = params.op2.endereco; 
  
  
  const valorReg = await lerDoRegistrador(regNome, params.op1.valorInicial);
  const valorMem = await lerDaMemoria("dataSegment", memOffset, params.op2.valorInicial);

  
  await escreverNaMemoria("dataSegment", memOffset, valorReg);
  await escreverNoRegistrador(regNome, valorMem);
}