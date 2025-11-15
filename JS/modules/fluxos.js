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
  add_reg_mem: simularADD, // (Você precisará criar a função simularADD)
  add_reg_val: simularADD, // (Você precisará criar a função simularADD)
  inc_reg: simularINC,
  jmp: simularJMP,
  // ... (Adicione TODAS as suas 24 instruções aqui)
  // 'dec_reg': simularDEC,
  // 'not_reg': simularNOT,
};

function formatarParametros(infosBrutas) {
  const {
    instruction,
    instructionAdress,
    operando1,
    operando2,
    valorInicialReg,
  } = infosBrutas;

  let op1_formatado = null;
  let op2_formatado = null;

  // Lógica para determinar os tipos com base na string da instrução
  if (instruction.includes("_reg_mem")) {
    op1_formatado = {
      tipo: "registrador",
      nome: operando1,
      valorInicial: valorInicialReg,
    };
    op2_formatado = { tipo: "memoria", endereco: operando2 };
  } else if (instruction.includes("_reg_val")) {
    op1_formatado = {
      tipo: "registrador",
      nome: operando1,
      valorInicial: valorInicialReg,
    };
    op2_formatado = { tipo: "imediato", valor: operando2 };
  } else if (instruction.includes("_reg")) {
    // Para instruções de 1 operando (ex: 'inc_reg')
    op1_formatado = {
      tipo: "registrador",
      nome: operando1,
      valorInicial: valorInicialReg,
    };
  } else if (
    instruction === "jmp" ||
    instruction === "call" ||
    instruction === "jxx"
  ) {
    // Para instruções de pulo
    op1_formatado = { tipo: "endereco", valor: operando1 }; // (Baseado no seu JS anterior)
  }
  return {
    instrucaoCompleta: instruction,
    endereco: instructionAdress,
    op1: op1_formatado,
    op2: op2_formatado,
  };
}

export function exibirValoresInstrucao(infosBrutas) {
  fecharModal();
  // 1. Limpa o objeto bruto para ficar legível
  const params = formatarParametros(infosBrutas);
  // 2. Encontra a função de simulação correta no MAPA
  const funcaoDeSimulacao = MAPA_DE_INSTRUCOES[params.instrucaoCompleta];

  if (!funcaoDeSimulacao) {
    console.error(
      `Simulação não encontrada para a instrução: ${params.instrucaoCompleta}`,
    );
    // (Você pode mostrar um alerta para o usuário aqui)
    return;
  }

  const botaoIniciar = document.querySelector(".btn_icon_play");

  if (botaoIniciar) {
    // --- Ponto Crítico ---
    // Clonamos o botão para REMOVER listeners antigos.
    // Isso impede que o botão "Play" execute 5 instruções de uma vez.
    const novoBotao = botaoIniciar.cloneNode(true);
    botaoIniciar.parentNode.replaceChild(novoBotao, botaoIniciar);

    // 3. Adiciona o novo listener que chama a função ESPECÍFICA
    novoBotao.addEventListener("click", () => {
      console.log(
        `Botão 'Play' clicado. Executando: ${params.instrucaoCompleta}`,
      );
      // CHAMA A FUNÇÃO MAPEADA (ex: simularXCHG(params))
      funcaoDeSimulacao(params);
    });
  }
}
