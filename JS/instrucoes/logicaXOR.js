import {
    lerDoRegistrador,
    escreverNoRegistrador,
    lerDaMemoria,
    animarBarramentos
} from "../modules/simuladorUI.js";

export async function simularXOR_Reg_Mem(params) {
    const regNome = params.op1.nome;             
    const valorInicialReg = params.op1.valorInicial;
    const offsetHex = params.op2.endereco; 
    const valorInicialMem = params.op2.valorInicial;
    const nomeSegmento = "dataSegment"; 
    const valorRegAtual = await lerDoRegistrador(regNome, valorInicialReg);
    const valorMemoria = await lerDaMemoria(nomeSegmento, offsetHex, valorInicialMem);
    const resultadoXOR = valorRegAtual ^ valorMemoria;

    await escreverNoRegistrador(regNome, resultadoXOR);
}