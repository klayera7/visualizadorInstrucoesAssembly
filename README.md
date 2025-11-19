# 💻 Visualizador de Instruções Assembly x86

**Link do visualizador:** [https://klayera7.github.io/visualizadorInstrucoesAssembly/](https://klayera7.github.io/visualizadorInstrucoesAssembly/)
<img width="1280" height="720" alt="image" src="https://github.com/user-attachments/assets/dedc8057-0e43-4365-a191-d7767abc1ad7" />

---

### ✨ Entenda o Projeto

Trata-se de um simulador de instruções assembly do Intel x86 em **modo real**. A ideia é permitir, de forma visual, entender o **fluxo de execução** das instruções, passo a passo.

**🎯 Objetivo Principal:** Este projeto é uma **ferramenta didática e educacional**, focada em desmistificar a arquitetura de computadores e a programação de baixo nível. É ideal para estudantes e entusiastas que estão aprendendo sobre **Assembly x86**.

**🏗️ Simplificação da CPU:** Vale observar que a CPU está **super simplificada** para fins de clareza, omitindo complexas conexões e unidades. O foco está em visualizar o **fluxo de execução**, como os registradores são afetados, a utilização dos barramentos e o acesso à memória (RAM).

**🧠 Ciclo de Instrução em Destaque:** A simulação ilustra claramente as três etapas fundamentais do ciclo de instrução do processador, listadas no cabeçalho do visualizador: **Busca** (Fetch), **Decodificação** (Decode) e **Execução** (Execute).

---

### ⚙️ Funcionalidades e Como Utilizar

#### 1. Definindo Segmentos

Você pode carregar um programa na tela inicial, clicando no botão **"Carregar Programa"**. Neste passo, você determina onde deseja começar o segmento de dados, código, pilha e extra de dados.

**📝 Por que definir segmentos?** Na arquitetura x86 modo real, o Sistema Operacional aloca automaticamente os segmentos. **Aqui, você tem o controle** para definir isso e entender como funciona o endereçamento de 20 bits e a lógica de segmentação, que é fundamental no modo real.

🔍 **Por que os segmentos distam 0x1000 entre si?** No modo real do x86, cada segmento possui um tamanho máximo de 64KB. Em hexadecimal, 64KB equivale a 0x10000. Como o cálculo do endereço físico é (Segmento * 16) + Offset, um valor de 0x1000 no registrador de segmento, multiplicado por 16, resulta exatamente no início do próximo bloco de 64KB (0x10000). Isso garante que os segmentos de Código, Dados e Pilha não se sobreponham.

**Registradores de Segmento em Foco:** A ferramenta permite visualizar como os registradores **CS (Code Segment), DS (Data Segment), SS (Stack Segment) e ES (Extra Segment)** definem os limites de memória para o programa.

#### 2. Definindo as Instruções

As instruções disponíveis estão visíveis no *select menu* do visualizador. Você pode definir a instrução e o seu endereço.

**⚠️ Nota Importante sobre Endereçamento:** Primeiro, verifique se a instrução está **dentro do Segmento de Código (CS)**. O segmento de código possui um tamanho total de 64KB, e o endereço da instrução deve estar nesse intervalo, tendo como base o valor base do segmento de código definido por você. **Endereços fora do segmento de código causarão erros de execução.**

---

### 🛠️ Ferramentas e Metodologia

Este projeto foi desenvolvido utilizando uma *stack* de tecnologias e práticas de desenvolvimento que garantem a organização, a eficiência e a qualidade do código.

#### 💻 Tecnologias Utilizadas

| Ferramenta | Descrição |
| :--- | :--- |
| **HTML** | Estruturação e organização do conteúdo visual do simulador. |
| **CSS** | Estilização da interface, garantindo uma visualização clara e intuitiva. |
| **JavaScript (JS)** | Lógica principal do simulador, responsável pela interpretação das instruções Assembly, manipulação dos registradores e atualização dinâmica da interface. |
| **VS Code (Visual Studio Code)** | Ambiente de Desenvolvimento Integrado (IDE) utilizado para a codificação e *debugging*. |

#### 🚀 Metodologia de Desenvolvimento

O projeto adotou o uso de **Metodologias Ágeis** (Agile) para gerenciar o desenvolvimento, focar na entrega de valor contínua e garantir a flexibilidade na evolução da ferramenta.

* **Organização e Rastreamento:** A gestão das tarefas, funcionalidades e correções de *bugs* foi realizada utilizando o **Trello**. Isso permitiu a visualização clara do *backlog* e o acompanhamento do progresso de cada etapa.
* **Controle de Versão:** O **Git** e o **GitHub** foram utilizados para o controle de versão, permitindo a colaboração organizada, a criação de *branches* isoladas (`feature/`) e a integração segura através de *pull requests*.

---
