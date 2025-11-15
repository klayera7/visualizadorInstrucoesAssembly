import { fecharModal } from "./controleModal.js";

function animarBarramentoEndereco() {
  const endereco = document.getElementById("address_bus");
  endereco.classList.add("active_bus_address");
  const time = 500;
  setTimeout(() => {
    endereco.classList.remove("active_bus_address");
  }, time);
}

function animarBarramentoDados() {
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
    // Aplica a máscara final (se a função chamadora não aplicou, garante 16 bits)
    const valor16Bits = valorDecimal & 0xFFFF;
    
    // Converte, coloca em maiúsculo e garante 4 dígitos
    return valor16Bits.toString(16).toUpperCase().padStart(4, '0');
}

/* =================================
Funções de Simulação Visual
================================= */
function simularNot(params) { 
    
    const valorDecimal = parseInt(params, 16);
    
    let valorDecimalNegado = ~valorDecimal & 0xFFFF; 

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


function simularXCHG(params) {
  console.log("SIMULANDO XCHG (Reg, Mem):", params);
  // ... (sua lógica visual aqui) ...
  animarBarramentosAmbos();
}

function simularMOV(params) {
  console.log("SIMULANDO MOV:", params);
  // ... (sua lógica visual aqui) ...
  animarBarramentosAmbos();
}

function simularJMP(params) {
  console.log("SIMULANDO JMP:", params);
  // ... (sua lógica visual aqui) ...
  animarBarramentoEndereco();
}

function simularADD(params) {
  console.log("SIMULANDO ADD:", params);
  // ... (sua lógica visual aqui) ...
  animarBarramentoEndereco();
}

// Mapeia a string da instrução para a função de simulação
const MAPA_SIMULACAO_INSTRUCAO = {
  xchg_reg_mem: simularXCHG,
  mov_reg_mem: simularMOV,
  mov_reg_val: simularMOV,
  add_reg_mem: simularADD,
  add_reg_val: simularADD,
  inc_reg: simularINC,
  jmp: simularJMP,
  not_reg: simularNOT, // Adicionei a 'simularNOT' que estava faltando
  // ... (Adicione todas as suas outras instruções)
};

// Renomeado de exibirValoresInstrucao
export function prepararExecucaoInstrucao(params) {
  fecharModal();

  // Encontra a função correta no mapa
  const funcaoDeSimulacao = MAPA_SIMULACAO_INSTRUCAO[params.instrucaoCompleta];

  if (!funcaoDeSimulacao) {
    console.error(
      `Simulação não encontrada para a instrução: ${params.instrucaoCompleta}`,
    );
    return;
  }

  const botaoIniciar = document.querySelector(".btn_icon_play");

  if (botaoIniciar) {
    const novoBotao = botaoIniciar.cloneNode(true);
    botaoIniciar.parentNode.replaceChild(novoBotao, botaoIniciar);

    // Adiciona o novo listener que chama a função de simulação específica
    novoBotao.addEventListener("click", () => {
      console.log(
        `Botão 'Play' clicado. Executando: ${params.instrucaoCompleta}`,
      );
      funcaoDeSimulacao(params);
    });
  }
}
