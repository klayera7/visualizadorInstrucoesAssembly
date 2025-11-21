import { lerDoRegistrador, escreverNaMemoria, animarBarramentos } from "../modules/simuladorUI.js";

export async function simularOUT_AX(params) {
  const regNome = params.op1?.nome || "AX";
  const ioSegment = "ioSegment";
  const offsetHex = "0000";

  const valorReg = await lerDoRegistrador(regNome, 0);

  await animarBarramentos("----", valorReg, 600);
  await escreverNaMemoria(ioSegment, offsetHex, valorReg);
}
