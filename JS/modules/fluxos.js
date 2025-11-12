function fluxoendereco() {
    
    const endereco = document.getElementById("address_bus");

    endereco.classList.add("active_bus_address");

    const time = 500; // Tempo em milissegundos para manter a cor destacada

    setTimeout(() => {
       endereco.classList.remove("active_bus_address");
    }, time);

}

function fluxodados() {
    const dados = document.getElementById("data_bus");

    dados.classList.add("active_bus_data");

    const time = 500; // Tempo em milissegundos para manter a cor destacada

    setTimeout(() => {
         dados.classList.remove("active_bus_data");
    }, time);
}

function fluxo_dados_endereco() {
    fluxoendereco();
    fluxodados();
}

const botaoIniciar = document.querySelector('.btn_icon_play');
botaoIniciar.addEventListener('click', fluxo_dados_endereco);
