import {
  lerDoRegistrador,
  escreverNoRegistrador,
} from "../modules/simuladorUI.js";

export async function simularLoop(params) {
  const enderecoDestinoHex = params.op1.valor;

  let valCX = await lerDoRegistrador("CX", "0");

  if (valCX === 0) {
    const continuar = confirm(
        "Aviso de Loop Infinito/Longo!\n\n" +
        "O registrador CX está com valor 0.\n" +
        "Ao executar o LOOP, ele virará FFFFh (65.535) e o loop rodará milhares de vezes.\n\n" +
        "Você provavelmente esqueceu de inicializar o CX\n\n" +
        "Deseja continuar mesmo assim?",
    );

    if (!continuar) return;
  }
  valCX = valCX - 1;

  if (valCX < 0) {
    valCX = 0xffff;
  }
  await escreverNoRegistrador("CX", valCX);

  if (valCX !== 0) {
    const enderecoDestinoNum = parseInt(enderecoDestinoHex, 16);
    await escreverNoRegistrador("IP", enderecoDestinoNum);
  } else {
    const ipAtual = await lerDoRegistrador("IP", "0");
    await escreverNoRegistrador("IP", ipAtual + 1);
  }
}
