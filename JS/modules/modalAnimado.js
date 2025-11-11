export default function initModalAnimado() {
    
    // 1. Seleciona os 3 elementos principais
    const botaoAbrir = document.querySelector('[data-modal="abrir"]');
    const botaoFechar = document.querySelector('[data-modal="fechar"]');
    const containerModal = document.querySelector('[data-modal="container"]');

    // 2. Verifica se os 3 elementos existem na página
    if (botaoAbrir && botaoFechar && containerModal) {
    
        // 3. Função para ABRIR o modal
        function abrirModal(event) {
            // event.preventDefault() previne o comportamento padrão do
            // elemento (ex: um link de navegar)
            event.preventDefault();
            containerModal.classList.add('ativo'); 
        }

        // 4. Função para FECHAR o modal
        function fecharModal(event) {
            event.preventDefault();
            containerModal.classList.remove('ativo'); 
        }

        // 5. Função para fechar ao clicar FORA do modal
        function cliqueForaModal(event) {
            // Se o alvo do clique (event.target) for exatamente
            // o contêiner (o fundo preto), ele fecha.
            if (event.target === this) {
                fecharModal(event);
            }
        }

        // 6. Adiciona os "escutadores" de evento
        botaoAbrir.addEventListener('click', abrirModal); 
        botaoFechar.addEventListener('click', fecharModal);
        // O clique "fora" é, na verdade, um clique no contêiner
        containerModal.addEventListener('click', cliqueForaModal);
    }
}