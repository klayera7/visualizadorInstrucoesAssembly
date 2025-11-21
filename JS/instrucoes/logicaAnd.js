import {
  lerDoRegistrador,
  lerDaMemoria,
  escreverNoRegistrador,
  animarBarramentos,
} from "../modules/simuladorUI.js";

export async function simular_AND_Reg_Mem(params) {
  const nomeReg = params.op1.nome;
  const offSetHex = params.op2.endereco;
  const segmento = "dataSegment";

  const valorInicialReg = params.op1.valorInicial;
  const valorInicialMem = params.op2.valorInicial;

  const valorAtualReg = await lerDoRegistrador(nomeReg, valorInicialReg);
  const valorAtualMem = await lerDaMemoria(
    segmento,
    offSetHex,
    valorInicialMem
  );

  const resultadoAND = valorAtualReg & valorAtualMem;

  await animarBarramentos("----", resultadoAND, 600);

  await escreverNoRegistrador(nomeReg, resultadoAND);
}
