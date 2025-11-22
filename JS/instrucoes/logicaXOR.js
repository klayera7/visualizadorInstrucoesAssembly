import {
    lerDoRegistrador,
    escreverNoRegistrador,
    animarBarramentos
} from "../modules/simuladorUI.js";

export async function simularXOR_Reg_Val(params) {
    const regNome = params.op1.nome;
    const valorImediatoStr = params.op2.valor;
    const valorInicialReg = params.op1.valorInicial;

    const valorImediatoNum = parseInt(valorImediatoStr, 10);
    
    if (isNaN(valorImediatoNum)) {
        throw new Error(`Valor imediato inválido: ${valorImediatoStr}`);
    }
    
    const valorRegAtual = await lerDoRegistrador(regNome, valorInicialReg);
    const resultadoXOR = valorRegAtual ^ valorImediatoNum;

    await animarBarramentos("----", valorImediatoNum, 600);
    await escreverNoRegistrador(regNome, resultadoXOR);
}