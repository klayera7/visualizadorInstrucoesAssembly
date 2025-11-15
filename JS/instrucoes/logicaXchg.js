export function executarXCHG_Reg_Mem(instrucao) {
  const { op1, op2 } = instrucao;

  const regNome = op1.nome.toUpperCase();

  const regElemento = [
    ...document.querySelectorAll(".general_registers_container .register"),
  ]
    .find((r) => r.querySelector("h2").innerText === regNome)
    ?.querySelector(".register_data_container");

  if (!regElemento) {
    console.error("Registrador não encontrado:", regNome);
    return;
  }

  const memContainer = document.querySelector("#ram_data_segment");
  let linhas = [...memContainer.querySelectorAll(".linha-codigo")];

  let linhaMem = linhas.find(
    (l) =>
      l.querySelector("h5").innerText.trim().toLowerCase() ===
      op2.endereco.toLowerCase()
  );

  if (!linhaMem) {
    linhaMem = document.createElement("div");
    linhaMem.classList.add("linha-codigo");
    linhaMem.innerHTML = `
      <h5>${op2.endereco.toUpperCase()}</h5>
      <h4>${op2.valorInicial
        .replace("h", "")
        .padStart(4, "0")
        .toUpperCase()}</h4>
    `;
    memContainer.appendChild(linhaMem);
  }

  const memElemento = linhaMem.querySelector("h4");

  const valorReg_DOM = regElemento.innerText.trim();
  let valorMem_DOM = memElemento.innerText.trim();

  const valorRegOrigem =
    valorReg_DOM === "0000" || valorReg_DOM === ""
      ? op1.valorInicial
      : valorReg_DOM;

  const valorMemOrigem =
    valorMem_DOM.toLowerCase() === "conteúdo" ? op2.valorInicial : valorMem_DOM;

  const valorReg = valorRegOrigem
    .replace("h", "")
    .padStart(4, "0")
    .toUpperCase();
  const valorMem = valorMemOrigem
    .replace("h", "")
    .padStart(4, "0")
    .toUpperCase();

  let delay = 0;

  setTimeout(() => {
    atualizarBuses(op2.endereco, "--");
  }, (delay += 400));

  setTimeout(() => {
    atualizarBuses(op2.endereco, valorMem);
    linhaMem.classList.add("highlight");
    setTimeout(() => linhaMem.classList.remove("highlight"), 600);
  }, (delay += 1000));

  setTimeout(() => {
    regElemento.classList.add("highlight");
    atualizarBuses("REG-" + regNome, valorReg);
    setTimeout(() => regElemento.classList.remove("highlight"), 600);
  }, (delay += 1000));

  setTimeout(() => {
    memElemento.innerText = valorReg.toUpperCase();
    atualizarBuses(op2.endereco, valorReg);
  }, (delay += 1000));

  setTimeout(() => {
    regElemento.innerText = valorMem.toUpperCase();
    atualizarBuses("REG-" + regNome, valorMem);
  }, (delay += 900));

  setTimeout(() => {
    atualizarBuses("----", "----");
  }, (delay += 400));
}

function atualizarBuses(endereco, dado) {
  const busEnd = document.getElementById("address_bus");
  const busDado = document.getElementById("data_bus");

  busEnd.innerText = endereco.toUpperCase();
  busDado.innerText = dado.toUpperCase();

  busEnd.classList.add("bus-active");
  busDado.classList.add("bus-active");

  setTimeout(() => {
    busEnd.classList.remove("bus-active");
    busDado.classList.remove("bus-active");
  }, 350);
}
