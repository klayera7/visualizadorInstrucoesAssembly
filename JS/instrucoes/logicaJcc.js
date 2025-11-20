import { lerFlag, animarBarramentos, escreverNoRegistrador } from "../modules/simuladorUI.js";

async function doJumpIf(params, cond, label) {
  const destinoHex = params.op1.valor;
  const destinoNum = parseInt(destinoHex, 16);

  if (cond) {
    await animarBarramentos(destinoHex.padStart(5, "0"), label || "J", 600);
    await escreverNoRegistrador("IP", destinoNum);
  } 
}

export async function jeADDR(params) {
  const zf = lerFlag("ZF");
  await doJumpIf(params, zf === 1, "JE");
}

export async function jneADDR(params) {
  const zf = lerFlag("ZF");
  await doJumpIf(params, zf === 0, "JNE");
}

export async function jgADDR(params) {
  const zf = lerFlag("ZF");
  const sf = lerFlag("SF");
  const of = lerFlag("OF");
  await doJumpIf(params, zf === 0 && sf === of, "JG");
}

export async function jgeADDR(params) {
  const sf = lerFlag("SF");
  const of = lerFlag("OF");
  await doJumpIf(params, sf === of, "JGE");
}

export async function jlADDR(params) {
  const sf = lerFlag("SF");
  const of = lerFlag("OF");
  await doJumpIf(params, sf !== of, "JL");
}

export async function jleADDR(params) {
  const zf = lerFlag("ZF");
  const sf = lerFlag("SF");
  const of = lerFlag("OF");
  await doJumpIf(params, zf === 1 || sf !== of, "JLE");
}
