import {
    lerDoRegistrador,
    lerDaMemoria,
    escreverNoRegistrador,
    escreverNaMemoria,
}
from "../modules/simuladorUI.js"

export async function subFunction(params) {
    const regNome = params.op1.nome;
    const offSetMem = params.op2.endereco;

    let valorRegistrador = await lerDoRegistrador(regNome, params.op1.valorInicial)
    await escreverNaMemoria('dataSegment', offSetMem, params.op2.valorInicial)
    const valorMemoria = await lerDaMemoria('dataSegment', offSetMem, params.op2.valorInicial)

    valorRegistrador -= valorMemoria;
    await escreverNoRegistrador(regNome, valorRegistrador)
}