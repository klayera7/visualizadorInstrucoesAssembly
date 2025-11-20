import {
  lerDoRegistrador,
  lerDaMemoria,
  animarBarramentos,
  escreverFlag,
} from "../modules/simuladorUI.js";

export async function simularCMP_Reg_Mem(params) {
  const regNome = params.op1.nome;
  const offSetMem = params.op2.endereco;

  const ValorReg = parseInt(params.op1.valorInicial, 10);
  const ValorMem = parseInt(params.op2.valorInicial, 10);

  const valorAtualReg = await lerDoRegistrador(regNome, ValorReg);
  const valorAtualMem = await lerDaMemoria("dataSegment", offSetMem, ValorMem);

  // animação semelhante às outras instruções
  await animarBarramentos("----", valorAtualMem, 600);

  // Resultado da subtração (sem armazenar): reg - mem
  // Trabalhar em 16 bits (word) para flags
  const a = valorAtualReg & 0xffff;
  const b = valorAtualMem & 0xffff;

  // Resultado de 16 bits da subtração (minuend - subtrahend)
  const resultado16 = (a - b) & 0xffff;

  // ZF = 1 se resultado == 0
  const zf = resultado16 === 0 ? 1 : 0;

  // CF (carry/borrow) para SUB/CMP: é 1 quando há borrow (unsigned a < b)
  const cf = a < b ? 1 : 0;

  // OF (overflow) para SUB: ocorre se os sinais de a e b são diferentes
  // e o sinal do resultado é diferente do sinal de a.
  // Implementação bitwise padrão para detectar overflow em 2's complement:
  // OF = ((a ^ b) & (a ^ result)) & 0x8000 ? 1 : 0
  const of = (((a ^ b) & (a ^ resultado16)) & 0x8000) ? 1 : 0;

  // SF (sign flag) = MSB of result (1 if negative in two's complement)
  const sf = (resultado16 & 0x8000) ? 1 : 0;

  await escreverFlag("ZF", zf);
  await escreverFlag("CF", cf);
  await escreverFlag("OF", of);
  await escreverFlag("SF", sf);
}
