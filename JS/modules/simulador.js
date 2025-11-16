import { fecharModal } from "./controleModal.js";
import { executarXCHG_Reg_Mem } from "../instrucoes/importacaoInstrucoes.js";
import { valoresSegmentos } from "./logicaPopupSegmentos.js";

const MAPA_SIMULACAO_INSTRUCAO = {
  xchg_reg_mem: executarXCHG_Reg_Mem,
  mov_reg_mem: simularMOV,
  mov_reg_val: simularMOV,
  add_reg_mem: simularADD,
  add_reg_val: simularADD,
  inc_reg: simularINC,
  jmp: simularJMP,
  not_reg: simularNot,
};

export function animarBarramentoEndereco() {
  const endereco = document.getElementById("address_bus");
  endereco.classList.add("active_bus_address");
  const time = 500;
  setTimeout(() => {
    endereco.classList.remove("active_bus_address");
  }, time);
}

export function animarBarramentoDados() {
  const dados = document.getElementById("data_bus");
  dados.classList.add("active_bus_data");
  const time = 500;
  setTimeout(() => {
    dados.classList.remove("active_bus_data");
  }, time);
}

function animarBarramentosAmbos() {
  animarBarramentoEndereco();
  animarBarramentoDados();
}

function converter_hex_formatar_16bits(valorDecimal) {
  const valor16Bits = valorDecimal & 0xffff;

  return valor16Bits.toString(16).toUpperCase().padStart(4, "0");
}

function simularNot(params) {
  const valorDecimal = parseInt(params, 16);

  let valorDecimalNegado = ~valorDecimal & 0xffff;

  let resultadoHex = converter_hex_formatar_16bits(valorDecimalNegado);

  return resultadoHex;
}

function simularINC(params) {
  let valorRegistrador = parseInt(params, 16);

  valorRegistrador = valorRegistrador + 1;

  let resultadoHex = converter_hex_formatar_16bits(valorRegistrador);

  return resultadoHex;
}

function simularDEC(params) {
  let valorRegistrador = parseInt(params, 16);

  valorRegistrador = valorRegistrador - 1;

  let resultadoHex = converter_hex_formatar_16bits(valorRegistrador);

  return resultadoHex;
}

function simularNeg(params) {
  let valorRegistrador = simularNot(params);

  valorRegistrador = simularINC(valorRegistrador);

  return valorRegistrador;
}

function simularMOV(params) {
  console.log("SIMULANDO MOV:", params);

  animarBarramentosAmbos();
}

function simularJMP(params) {
  console.log("SIMULANDO JMP:", params);

  animarBarramentoEndereco();
}

function simularADD(params) {
  console.log("SIMULANDO ADD:", params);

  animarBarramentoEndereco();
}


export function prepararExecucaoInstrucao(params) {
  fecharModal();

  const funcaoDeSimulacao = MAPA_SIMULACAO_INSTRUCAO[params.instrucaoCompleta];

  if (!funcaoDeSimulacao) {
    console.error(
      `Simulação não encontrada para a instrução: ${params.instrucaoCompleta}`
    );
    return;
  }

  const botaoIniciar = document.querySelector(".btn_icon_play");

  if (botaoIniciar) {
    const novoBotao = botaoIniciar.cloneNode(true);
    botaoIniciar.parentNode.replaceChild(novoBotao, botaoIniciar);

    novoBotao.addEventListener("click", () => {
      console.log(
        `Botão 'Play' clicado. Executando: ${params.instrucaoCompleta}`
      );
      funcaoDeSimulacao(params);
    });
  }
}
