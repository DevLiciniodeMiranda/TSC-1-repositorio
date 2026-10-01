Documentação da Etapa 04 - Interatividade com JavaScriptEste documento detalha as funcionalidades interativas implementadas no projeto NextLevel utilizando JavaScript puro (Vanilla JS), cumprindo os requisitos de manipulação do DOM, tratamento de eventos, validação de formulários, uso de arrays e métodos de iteração.
   1. Funcionalidades Interativas ImplementadasNesta etapa, o projeto recebeu três grandes blocos de interatividade dinâmica para reforçar a temática de "Dark RPG".
   Funcionalidade A: A Forja de Hábitos (Criação Dinâmica)
   Como funciona: O utilizador preenche um formulário para definir um novo hábito ou missão. O sistema valida os dados e, caso estejam corretos, constrói e acopla um novo "card" de missão diretamente na interface, acompanhado de um botão que permite "Abandonar Missão" (remover o elemento).

   Arquivos envolvidos: habitos.html e habitos.js

   Conceitos utilizados: Seleção de elementos (querySelector), Tratamento de eventos (addEventListener('submit')), Prevenção de comportamento padrão (preventDefault()), Manipulação do DOM (createElement, appendChild, remove).
   
   Funcionalidade B: O Pergaminho de Batalha (Filtragem de Missões)
   Como funciona: Uma lista de missões passadas é exibida. O utilizador pode clicar nos botões "Concluídas", "Pendentes" ou "Todas as Missões" para que a interface se redesenhe instantaneamente, exibindo apenas os itens correspondentes ao filtro.

   Arquivos envolvidos: diario.html e diario.js
   
   Conceitos utilizados: Estrutura de dados com Arrays de Objetos JSON, Métodos declarativos de iteração (forEach, filter), Manipulação do DOM (replaceChildren(), innerHTML), Arrow Functions.
   
   Funcionalidade C: O Mercador (Loja, Cálculo e Inventário)
   
   Como funciona: A vitrine da loja é renderizada dinamicamente a partir de um Array de produtos. Ao selecionar equipamentos, o sistema calcula o valor total da compra em tempo real. Ao submeter o formulário, o sistema valida se o utilizador possui "ouro" suficiente, deduz o saldo e transfere visualmente os itens comprados (com os respetivos emojis) para uma aba separada de "Inventário".
   
   Arquivos envolvidos: loja.html e loja.js
   
   Conceitos utilizados: Pipeline de dados, Métodos de agregação (reduce), Alteração de Estado (let saldoAtual), Tratamento de eventos (change e submit), Atributos de dados (data-icone, data-nome).
   
   2. Validações e Situações Inválidas Tratadas
   
   Para garantir a estabilidade da aplicação, as seguintes situações inválidas foram tratadas sem o uso de alertas intrusivos (mensagens renderizadas diretamente no DOM)
   
    Forja de Hábitos (Campos Vazios): O sistema utiliza igualdade estrita (===) para impedir a criação de um hábito se o campo "Peso Atual" estiver vazio.
    
    Forja de Hábitos (Valores Negativos/Zerados): O sistema converte a entrada para número (Number()) e bloqueia envios com peso <= 0, exibindo uma mensagem de erro em vermelho.
    
    O Mercador (Compra Vazia): Tentativas de clicar em "Finalizar Compra" com o valor total em 0 (sem itens selecionados) disparam um aviso amarelo orientando a seleção de um equipamento.
    
    O Mercador (Saldo Insuficiente): Se o total calculado pelo .reduce() ultrapassar o saldoAtual, a compra é bloqueada preventivamente e uma mensagem de erro alerta que faltam moedas de ouro.

    3. Matriz de Evidências
    Abaixo encontra-se a correlação entre os requisitos exigidos para a Etapa 04 e a sua respectiva implementação:

