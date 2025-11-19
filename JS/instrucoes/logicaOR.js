import {
    lerDoRegistrador,
    lerDaMemoria,
    escreverNoRegistrador,
    animarBarramentos
} from "../modules/simuladorUI.js";

export async function simularOR_Reg_Mem(params) {
    const regNome = params.op1.nome;
    const offsetHex = params.op2.endereco;
    const dataSegment = "dataSegment";

    const valorInicialReg = params.op1.valorInicial;
    const valorInicialMem = params.op2.valorInicial;

    const valorAtualReg = await lerDoRegistrador(regNome, valorInicialReg);
    const valorAtualMem = await lerDaMemoria(dataSegment, offsetHex, valorInicialMem);

    const resultadoOR = valorAtualReg | valorAtualMem;

    await animarBarramentos("----", resultadoOR, 600); 
    await escreverNoRegistrador(regNome, resultadoOR); 
}