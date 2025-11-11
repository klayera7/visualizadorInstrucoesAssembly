# visualizadorInstrucoesAssembly
Link do visualizador: https://klayera7.github.io/visualizadorInstrucoesAssembly/


## Entenda o projeto
Trata-se de um simulador de instruções assembly do intel x86 em modo real, a ideia é permitir, de forma visual, entender a execução de instruções. Vale observar que a CPU está super simplificada, omitindo conexões e unidades, a ideia é ver o fluxo de execução, como os barramentos são utilizados e acesso à memória

## Como utilizar?

#### Definindo segmentos
Você pode carregar um programa na tela inicial, clicando no botão "Carregar Programa", você determina onde deseja começar o segmento de dados, código, pilha e extra de dados. 

Na arquitetura x86 modo real, o Sistema Operacional aloca automaticamente os segmentos, mas aqui você pode fazer isso e entender como funciona cada etapa, listadas no header (busca, decodificação e execução)

#### Definindo as instruções 
As instruções disponíveis estão visíveis no select menu. Você pode definir a instrução e o seu endereço
- Nota: primeiro, verifique se a instrução está dentro do segmento de código, ele possui um tamanho total de 64KB e a instrução deve estar nesse intervalo, tendo como base o valor base do segmento de código definido por você 
