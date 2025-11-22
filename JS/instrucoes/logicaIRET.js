import {
  lerDoRegistrador,
  escreverNoRegistrador,
  escreverNaMemoria,
  lerDaMemoria,
} from "../modules/simuladorUI.js";

import { valoresSegmentos } from "../modules/logicaPopupSegmentos.js"; 

export async function IRET() {
  const strCS = valoresSegmentos.codeSegment || "0000";
  const fallbackCS = parseInt(strCS, 16);

  let csNum = await lerDoRegistrador("CS", fallbackCS); 
  let ipNum = await lerDoRegistrador("IP", 0);
  let spLocal = await lerDoRegistrador("SP", 0);

  const ipParaSalvar = ipNum + 1;

  const pushInterno = async (valorNum) => {
    let novoSP = spLocal - 1;

    if (novoSP < 0) novoSP = 0xFFFF;

    spLocal = novoSP;

    const spHex = (spLocal ).toString(16).toUpperCase().padStart(4, "0");
    const valorHex = (valorNum);

    await escreverNaMemoria("stackSegment", spHex, valorHex);
    await escreverNoRegistrador("SP", spLocal);
  };

  const popInterno = async () => {
   
    const spHex = (spLocal ).toString(16).toUpperCase().padStart(4, "0");
    

    const valorLido = await lerDaMemoria("stackSegment", spHex);
    await escreverNaMemoria("stackSegment", spHex, "0000");
    
    let novoSP = spLocal + 1;
    if (novoSP > 0xFFFF) novoSP = 0;

    spLocal = novoSP;

    await escreverNoRegistrador("SP", spLocal);
    
    return valorLido; 
  };

  await pushInterno(csNum);
  await pushInterno(ipParaSalvar);

  const ipRecuperado = await popInterno();
  await escreverNoRegistrador("IP", ipRecuperado);

  const csRecuperado = await popInterno();
  await escreverNoRegistrador("CS", csRecuperado);
}