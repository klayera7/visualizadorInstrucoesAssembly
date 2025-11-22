import {
  lerDoRegistrador,
  escreverNoRegistrador,
  escreverNaMemoria,
  lerDaMemoria,
  esperar,
  lerFlag, 
  escreverFlag,
} from "../modules/simuladorUI.js";

import { valoresSegmentos } from "../modules/logicaPopupSegmentos.js"; 


function paraStringHexMemoria(numeroDecimal) {

  return (numeroDecimal & 0xFFFF).toString(16).toUpperCase().padStart(4, "0");
}

function flagParaWord(valor1Bit) {
    return valor1Bit & 0x1; 
}

function wordParaFlag(valorLidoWord) {
    return valorLidoWord & 0x1; 
}

export async function IRET() {
  

  const strCS = valoresSegmentos.codeSegment || "0000";
 
  const fallbackCS = parseInt(strCS, 16); 

  let csNum = await lerDoRegistrador("CS", fallbackCS); 
  let ipNum = await lerDoRegistrador("IP", 0);
  let spLocal = await lerDoRegistrador("SP", 0);
  
  const ofBit = await lerFlag("OF");
  const sfBit = await lerFlag("SF");
  const zfBit = await lerFlag("ZF");
  const cfBit = await lerFlag("CF");
  
  const ipParaSalvar = ipNum + 1;
  
  const pushInterno = async (valorNum) => {

    let novoSP = spLocal - 1;
    if (novoSP < 0) novoSP = 0xFFFF; 
    spLocal = novoSP;

    const spHex = paraStringHexMemoria(spLocal); 

    await escreverNaMemoria("stackSegment", spHex, valorNum);
    await escreverNoRegistrador("SP", spLocal);
  };

  const popInterno = async () => {
    const spHex = paraStringHexMemoria(spLocal);
    
    const valorLido = await lerDaMemoria("stackSegment", spHex);
    await escreverNaMemoria("stackSegment", spHex, "0000");
    
    let novoSP = spLocal + 1;
    if (novoSP > 0xFFFF) novoSP = 0;

    spLocal = novoSP;
    await escreverNoRegistrador("SP", spLocal);
    
    return valorLido; 
  };
  
  if (esperar) await esperar(800);
  
  // PUSH 1-4: FLAGS (Armazenadas como 1-bit Word)
  await pushInterno(flagParaWord(ofBit)); // PUSH OF
  await pushInterno(flagParaWord(sfBit)); // PUSH SF
  await pushInterno(flagParaWord(cfBit)); // PUSH CF
  await pushInterno(flagParaWord(zfBit)); // PUSH ZF
  
  
  await pushInterno(csNum);       // PUSH CS 
  await pushInterno(ipParaSalvar); // PUSH IP


  // POP 1-2: Registradores
  const ipRecuperado = await popInterno();
  await escreverNoRegistrador("IP", ipRecuperado);

  const csRecuperado = await popInterno();
  await escreverNoRegistrador("CS", csRecuperado);

  // POP 3-6: FLAGS
  
  const zfRecuperadoWord = await popInterno();
  await escreverFlag("ZF", wordParaFlag(zfRecuperadoWord)); // POP ZF
  
  const cfRecuperadoWord = await popInterno(); 
  await escreverFlag("CF", wordParaFlag(cfRecuperadoWord)); // POP CF

  const sfRecuperadoWord = await popInterno(); 
  await escreverFlag("SF", wordParaFlag(sfRecuperadoWord)); // POP SF
  
  const ofRecuperadoWord = await popInterno();
  await escreverFlag("OF", wordParaFlag(ofRecuperadoWord)); // POP OF
}