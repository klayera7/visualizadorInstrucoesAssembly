import { fecharModal } from "./modalAnimado.js";

function fluxoendereco() {
  const endereco = document.getElementById("address_bus");
  endereco.classList.add("active_bus_address");
  const time = 500;
  setTimeout(() => {
    endereco.classList.remove("active_bus_address");
  }, time);
}

function fluxodados() {
  const dados = document.getElementById("data_bus");
  dados.classList.add("active_bus_data");
  const time = 500;
  setTimeout(() => {
    dados.classList.remove("active_bus_data");
  }, time);
}

function fluxo_dados_endereco() {
  fluxoendereco();
  fluxodados();
}

function simularXCHG(params) {
  console.log("SIMULANDO XCHG (Reg, Mem):", params);

  // Exemplo de manipulação do HTML:
  // 1. Coloca o valor inicial no registrador (ex: 'reg-bx')
  // const regElement = document.getElementById(`reg-${params.op1.nome.toLowerCase()}`);
  // if (regElement) regElement.innerText = params.op1.valorInicial;

  // 2. Destaca o endereço de memória
  // const memElement = document.getElementById(`mem-${params.op2.endereco}`);
  // if (memElement) memElement.classList.add('highlight');

  // 3. Chama a animação do barramento
  fluxo_dados_endereco();
}

function simularINC(params) {
  console.log("SIMULANDO INC (Reg):", params);
  // Ex: Coloca o valor inicial no registrador
  // const regElement = document.getElementById(`reg-${params.op1.nome.toLowerCase()}`);
  // if (regElement) regElement.innerText = params.op1.valorInicial;

  // INC pode usar só o barramento de dados (busca, ULA, escrita)
  fluxodados();
}

function simularMOV(params) {
  console.log("SIMULANDO MOV:", params);
  // (Lógica visual do MOV...)
  fluxo_dados_endereco();
}

function simularJMP(params) {
  console.log("SIMULANDO JMP:", params);
  // JMP mexe no registrador IP e usa o barramento de endereço
  fluxoendereco();
}

function simularADD(params) {
  console.log("SIMULANDO ADD:", params);
  // JMP mexe no registrador IP e usa o barramento de endereço
  fluxoendereco();
}

// ... Adicione funções para ADD, SUB, NOT, etc. ...
const MAPA_DE_INSTRUCOES = {
  xchg_reg_mem: simularXCHG,
  mov_reg_mem: simularMOV,
  mov_reg_val: simularMOV,
  add_reg_mem: simularADD, 
  add_reg_val: simularADD, 
  inc_reg: simularINC,
  jmp: simularJMP,
  // ... (Adicione TODAS as suas 24 instruções aqui)
  // 'dec_reg': simularDEC,
  // 'not_reg': simularNOT,
};


export function exibirValoresInstrucao(params) {
  fecharModal();
  


  // 2. Encontra a função de simulação correta no MAPA
  const funcaoDeSimulacao = MAPA_DE_INSTRUCOES[params.instrucaoCompleta];

  if (!funcaoDeSimulacao) {
    console.error(
      `Simulação não encontrada para a instrução: ${params.instrucaoCompleta}`,
    );
    return;
  }

  const botaoIniciar = document.querySelector(".btn_icon_play");

  if (botaoIniciar) {
    // A sua lógica de clonar o botão para limpar listeners antigos está perfeita.
    const novoBotao = botaoIniciar.cloneNode(true);
    botaoIniciar.parentNode.replaceChild(novoBotao, botaoIniciar);

    // 3. Adiciona o novo listener que chama a função ESPECÍFICA
    novoBotao.addEventListener("click", () => {
      console.log(
        `Botão 'Play' clicado. Executando: ${params.instrucaoCompleta}`,
      );
      // Chama a função mapeada (ex: simularXCHG(params))
      funcaoDeSimulacao(params);
    });
  }
}
