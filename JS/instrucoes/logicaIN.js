import { lerDaMemoria, escreverNoRegistrador, animarBarramentos } from "../modules/simuladorUI.js";


export async function simularIN_AX(params) {
  const regNome = params.op1?.nome;
  const ioSegment = "ioSegment";
  const offsetHex = "0000";

  const valorDaPorta = await lerDaMemoria("ioSegment", offsetHex, 0);

  await animarBarramentos("----", valorDaPorta, 600);
  await escreverNoRegistrador(regNome, valorDaPorta);
}
