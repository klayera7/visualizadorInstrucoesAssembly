# 💻 Visualizador de Instruções Assembly x86

**Link do visualizador:** [https://simulador-de-instrucoes-assembly.vercel.app/](https://simulador-de-instrucoes-assembly.vercel.app/)
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

**⚠️ Nota Importante sobre Endereçamento:** Primeiro, verifique se a instrução está **onde aponta IP**. Ele é atualizado após a execução de cada instrução, certifique-se de carregar a instrução desejada informando os operandos, caso não estejam inicializados e então **dê o play** e se divirta!

---
### 📘 Guia do Usuário: Instruções Suportadas

O simulador suporta um subconjunto essencial das instruções x86, divididas em categorias. Aqui está o que cada uma faz na nossa "máquina virtual":

#### 📦 Transferência de Dados

  * **`MOV` (Move):** Copia dados de uma origem para um destino.
      * *Ex:* `MOV AX, BX` (Copia o valor de BX para AX).
      * *Ex:* `MOV AX, [100h]` (Busca o valor na memória e coloca em AX).
  * **`PUSH`:** Empilha um valor no topo da Pilha (Stack). O registrador `SP` é decrementado automaticamente.
  * **`POP`:** Desempilha um valor do topo da Pilha para um registrador. O registrador `SP` é incrementado.
  * **`XCHG` (Exchange):** Troca os valores entre dois lugares (ex: troca o valor de AX com BX).

#### ➕ Aritmética

  * **`ADD` / `SUB`:** Soma ou Subtrai valores. O resultado fica no primeiro operando.
  * **`INC` / `DEC`:** Incrementa (+1) ou Decrementa (-1) um registrador.
  * **`MUL` (Multiplicação):** Multiplica `AX` pelo operando. O resultado é armazenado em `DX:AX` (parte alta em DX, baixa em AX).
  * **`DIV` (Divisão):** Divide o valor de `DX:AX` pelo operando. O quociente vai para `AX` e o resto para `DX`.
  * **`NEG`:** Inverte o sinal do número (Complemento de 2).

#### 🧠 Lógica e Comparação

  * **`AND` / `OR` / `XOR`:** Realiza operações lógicas bit-a-bit.
  * **`NOT`:** Inverte todos os bits (Complemento de 1).
  * **`CMP` (Compare):** Subtrai os valores temporariamente apenas para atualizar as **Flags** (usado antes de saltos condicionais).

#### 🔀 Controle de Fluxo (Saltos)

  * **`JMP` (Jump):** Salto incondicional. Força o registrador `IP` a apontar para um novo endereço.
  * **`Jxx` (Saltos Condicionais):** Pula apenas se uma condição for atendida (baseado nas Flags). Ex: `JE` (Jump if Equal), `JG` (Jump if Greater).
  * **`LOOP`:** Decrementa `CX` e pula para um endereço se `CX` ainda não for zero. Ideal para repetições.
  * **`CALL` / `RET`:** Usado para funções. `CALL` salva o endereço de retorno na pilha e pula. `RET` recupera o endereço da pilha e volta.

#### 🔌 Entrada e Saída (I/O)

  * **`IN`:** Lê um dado de uma porta de hardware simulada (via Prompt) para `AX`.
  * **`OUT`:** Envia um dado de `AX` para uma porta de hardware simulada (Visualizador de I/O).


---

### 🛠️ Ferramentas e Metodologia

Este projeto foi desenvolvido utilizando uma *stack* de tecnologias e práticas de desenvolvimento que garantem a organização, a eficiência e a qualidade do código.

#### 💻 Tecnologias Utilizadas

<p align="left">
  <img src="https://skillicons.dev/icons?i=html,css,js,git,vscode" />
</p>


#### 🚀 Metodologia de Desenvolvimento

O projeto adotou o uso de **Metodologias Ágeis** (Agile) para gerenciar o desenvolvimento, focar na entrega de valor contínua e garantir a flexibilidade na evolução da ferramenta.

* **Organização e Rastreamento:** A gestão das tarefas, funcionalidades e correções de *bugs* foi realizada utilizando o **Trello**. Isso permitiu a visualização clara do *backlog* e o acompanhamento do progresso de cada etapa.
* **Controle de Versão:** O **Git** e o **GitHub** foram utilizados para o controle de versão, permitindo a colaboração organizada, a criação de *branches* isoladas (`feature/`) e a integração segura através de *pull requests*.

---
