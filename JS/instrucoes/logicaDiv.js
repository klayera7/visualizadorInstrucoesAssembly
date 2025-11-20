import {
  lerDoRegistrador,
  escreverNoRegistrador
} from "../modules/simuladorUI.js";

export async function divReg(params) {
  const regDivisor = params.op1.nome;
  const valorDivisor = await lerDoRegistrador(regDivisor, params.op1.valorInicial);

  if (valorDivisor === 0) {
    alert("Erro de Execução: Divisão por Zero!\nO processador não pode dividir por 0.");
    return;
  }

  const valorAX = await lerDoRegistrador("AX", "0");
  const valorDX = await lerDoRegistrador("DX", "0");

  const dividendo32Bits = (valorDX * 0x10000) + valorAX;

  if (dividendo32Bits === 0) {
      alert("Aviso: O dividendo (DX:AX) é 0.\n\nVocê provavelmente esqueceu de mover valores para AX ou DX antes de dividir.\nO resultado será 0.");
      return; 
  }

  const quociente = Math.floor(dividendo32Bits / valorDivisor);
  const resto = dividendo32Bits % valorDivisor;

  if (quociente > 0xFFFF) {
    alert("O resultado da divisão é muito grande para caber em AX.");
    return;
  }

  await escreverNoRegistrador("AX", quociente); 
  await escreverNoRegistrador("DX", resto); 
}