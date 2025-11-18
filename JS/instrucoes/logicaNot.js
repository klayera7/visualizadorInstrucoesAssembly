import {
    lerDoRegistrador,
    escreverNoRegistrador,
} from "../modules/simuladorUI.js"; 

export async function executarNot(params) {
    const nomeRegistrador = params.op1.nome;
const valorRegistrador = await lerDoRegistrador(nomeRegistrador, params.op1.valorInicial)
console.log(valorRegistrador)
let resultado = ~valorRegistrador & 0xFFFF; 
await escreverNoRegistrador(nomeRegistrador, resultado);
}