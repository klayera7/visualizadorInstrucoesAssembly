import {
  lerDoRegistrador,
  lerDaMemoria,
  escreverNoRegistrador,
  animarBarramentos,
} from "../modules/simuladorUI.js";

export async function simularADD_Reg_Mem(params) {
  const regNome = params.op1.nome;
  const offSetMem = params.op2.endereco;

  const ValorReg = parseInt(params.op1.valorInicial, 10);
  const ValorMem = parseInt(params.op2.valorInicial, 10);

  const valorAtualReg = await lerDoRegistrador(regNome, ValorReg);
  const valorAtualMem = await lerDaMemoria("dataSegment", offSetMem, ValorMem);

  const soma = valorAtualReg + valorAtualMem;

  await animarBarramentos("----", valorAtualMem, 600);

  await escreverNoRegistrador(regNome, soma);
}
