// Importa APENAS os "verbos" de que precisa do assistente de UI
import {
  lerDoRegistrador,
  lerDaMemoria,
  escreverNaMemoria,
  escreverNoRegistrador,
} from "../modules/simuladorUI.js";

/**
 * Executa a lógica visual da instrução XCHG (Reg, Mem)
 */
export async function simularXCHG_Reg_Mem(params) {
  const regNome = params.op1.nome;
  const memOffset = params.op2.endereco; // Este é o offset (ex: "5555")

  // 1. Lê os valores (já vêm como números decimais)
  const valorReg = await lerDoRegistrador(regNome, params.op1.valorInicial);
  const valorMem = await lerDaMemoria("dataSegment", memOffset, params.op2.valorInicial);

  // 2. Escreve os valores trocados
  await escreverNaMemoria("dataSegment", memOffset, valorReg);
  await escreverNoRegistrador(regNome, valorMem);
}