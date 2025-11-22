import { escreverNoRegistrador } from "../modules/simuladorUI.js"


export async function movRegVal(params){
  const regNome = params.op1.nome
  const valor = params.op1.valorInicial
  await escreverNoRegistrador(regNome, valor)
}