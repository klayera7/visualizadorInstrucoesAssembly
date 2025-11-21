import { lerDaMemoria, escreverNoRegistrador, animarBarramentos } from "../modules/simuladorUI.js";

function normalizeOffsetHex(raw) {
  if (!raw && raw !== 0) return "0000";
  let s = String(raw).toUpperCase();
  if (s.endsWith("H")) s = s.slice(0, -1);
  return s.padStart(4, "0");
}

export async function simularIN_AX(params) {
  const enderecoRaw = params.op1?.valor || params.op1 || "0";
  const offsetHex = normalizeOffsetHex(enderecoRaw);
  const ioSegment = "ioSegment";

  const valorDaPorta = await lerDaMemoria(ioSegment, offsetHex, 0);

  await animarBarramentos("----", valorDaPorta, 600);
  await escreverNoRegistrador("AX", valorDaPorta);
}
