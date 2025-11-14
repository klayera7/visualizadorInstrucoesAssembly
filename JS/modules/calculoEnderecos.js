/**
 * @param {string} hexString
 * @returns {number}
 */
function hexParaDecimal(hexString) {
    return parseInt(hexString, 16);
}

/**
 * @param {string} segmentoHex
 * @param {string} offsetHex
 * @returns {string}
 */
function calcularEnderecoFisico(segmentoHex, offsetHex){
    const segmentoDecimal = hexParaDecimal(segmentoHex);
    const offsetDecimal = hexParaDecimal(offsetHex);
    const baseSegmento = segmentoDecimal * 16;
    const enderecoFisicoDecimal = baseSegmento + offsetDecimal;
    const enderecoFisicoHex = decimalParaHex(enderecoFisicoDecimal);
    return enderecoFisicoHex;
}

/**
 * @returns {object}
 */
function obterValoresSegmentos(){
    const ds = document.getElementById('input-ds').value.toUpperCase();
    const es = document.getElementById('input-es').value.toUpperCase();
    const ss = document.getElementById('input-ss').value.toUpperCase();
    const cs = document.getElementById('input-cs').value.toUpperCase();
    const cx = document.getElementById('input-cx').value.toUpperCase();
    return {
        DS: ds,
        ES: es,
        SS: ss,
        CS: cs,
        CX: cx
    };
}

function atualizarDisplaySegmento(segmento, valor){
    console.log(`[Display] Registrador ${segmento} atualizado para: ${valor}`);
}

function carregarProgramaECalcular(){
    const valoresSegmento = obterValoresSegmentos();
    atualizarDisplaySegmento('DS', valoresSegmento.DS);
    atualizarDisplaySegmento('ES', valoresSegmento.ES);
    atualizarDisplaySegmento('SS', valoresSegmento.SS);
    atualizarDisplaySegmento('CS', valoresSegmento.CS);
    atualizarDisplaySegmento('CX', valoresSegmento.CX);

    const IP_inicial = '0000';
    const enderecoBusca = calcularEnderecoFisico(valoresSegmento.CS, IP_inicial);
    exibirEnderecoFisico('CS:IP', enderecoBusca);
    fecharPopUpCarregamento();
}

/**
 * @param {string} source
 * @param {string} enderecoHex
 */
function exibirEnderecoFisico(source, enderecoHex){
    const elementoEndereco = document.getElementById('endereco-fisico-display');
    if (elementoEndereco) {
        elementoEndereco.textContent = '(${source}): ${enderecoHex})';
    }
    console.log('Endereço Físico para Busca: ${enderecoHex}');
}