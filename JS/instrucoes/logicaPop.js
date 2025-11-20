import {
  lerDoRegistrador,
  escreverNoRegistrador,
  lerDaMemoria
} from "../modules/simuladorUI.js";

/**
 * Simula a instrução POP (Desempilhar)
 * Sintaxe: POP destino
 * Lógica:
 * 1. DESTINO = Memória[SS:SP]
 * 2. SP = SP + 1 (Incrementa/Libera espaço)
 */
export async function POP_Reg(params) {
  const regDestino = params.op1.nome;
  let spAtual = await lerDoRegistrador("SP", "0000");
  const spHex = spAtual.toString(16).toUpperCase().padStart(4, "0");
  const valorRecuperado = await lerDaMemoria("stackSegment", spHex, "0");
  spAtual = spAtual + 1;

  if (spAtual > 0xFFFF) {
    spAtual = 0;
  }

  await escreverNoRegistrador("SP", spAtual);

  await escreverNoRegistrador(regDestino, valorRecuperado);
}