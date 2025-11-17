import { escreverNoRegistrador, animarBarramentos, lerDaMemoria, lerDoRegistrador } from "../modules/simuladorUI.js";


export async function movRegMem(params) {
  const regNome = params.op1.nome; 
  const memOffset = params.op2.endereco; 
  const memValorIncial = params.op2.valorInicial
  
  const valorDaMem = await lerDaMemoria('dataSegment', memOffset, memValorIncial)
  await escreverNoRegistrador(regNome, valorDaMem)
}
