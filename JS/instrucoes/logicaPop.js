import {
  lerDoRegistrador,
  escreverNoRegistrador,
  lerDaMemoria,
  escreverNaMemoria
} from "../modules/simuladorUI.js";


export async function POP_Reg(params) {
  const regDestino = params.op1.nome;
  let spAtual = await lerDoRegistrador("SP", "0000");
  if (spAtual === 0) {
    alert("Não há nada a ser deletado da pilha");
    return;
  };
  const spHex = spAtual.toString(16).toUpperCase().padStart(4, "0");
  const valorRecuperado = await lerDaMemoria("stackSegment", spHex, "0");
  await escreverNaMemoria("stackSegment", spHex, "0000");
  spAtual = spAtual + 1;

  if (spAtual > 0xFFFF) {
    spAtual = 0;
  }

  await escreverNoRegistrador("SP", spAtual);

  await escreverNoRegistrador(regDestino, valorRecuperado);
}