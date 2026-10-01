// 1. Selecionando Elementos do DOM (Fase de Leitura)[cite: 23]
const formHabito = document.querySelector('#form-habito');
const selectFoco = document.querySelector('#foco');
const inputPeso = document.querySelector('#peso');
const inputMissao = document.querySelector('#nome-habito');
const selectDificuldade = document.querySelector('#dificuldade');
const mensagemErro = document.querySelector('#mensagem-erro');
const listaHabitos = document.querySelector('#lista-habitos');

// 2. Tratamento de Eventos
formHabito.addEventListener('submit', function(event) {
    // Evita o comportamento padrão de recarregar a página[cite: 23]
    event.preventDefault(); 

    // Capturando os valores inseridos
    const foco = selectFoco.options[selectFoco.selectedIndex].text;
    const pesoValue = inputPeso.value.trim();
    const missao = inputMissao.value.trim() || "Nenhuma missão extra";
    const dificuldade = selectDificuldade.options[selectDificuldade.selectedIndex].text;

    // 3. Validação de Formulários e Situações Inválidas[cite: 24]
    // Utilizando igualdade estrita (===) para segurança de tipos
    if (pesoValue === '') {
        mensagemErro.textContent = 'Erro: O campo "Peso Atual" é obrigatório para forjar o hábito!';
        return; // Interrompe a execução caso seja inválido
    }

    // Convertendo para Number para validar o valor matemático[cite: 21]
    if (Number(pesoValue) <= 0) {
        mensagemErro.textContent = 'Erro: O peso deve ser um valor válido maior que zero!';
        return;
    }

    // Limpa a mensagem de erro se tudo estiver correto
    mensagemErro.textContent = '';

    // 4. Manipulação Dinâmica da Interface (Create e Acoplamento)
    // Fase 1: Construção do elemento na memória[cite: 23]
    const novoHabitoLi = document.createElement('li');
    novoHabitoLi.style.background = '#1e293b'; // Cor do painel do seu tema Dark RPG
    novoHabitoLi.style.padding = '15px';
    novoHabitoLi.style.marginBottom = '10px';
    novoHabitoLi.style.borderRadius = '8px';
    novoHabitoLi.style.borderLeft = '4px solid #8b5cf6';
    
    // Usando Template Literals (crase) para interpolar variáveis no HTML[cite: 21]
    novoHabitoLi.innerHTML = `
        <strong>Foco:</strong> ${foco} <br>
        <strong>Peso:</strong> ${pesoValue}kg <br>
        <strong>Missão:</strong> ${missao} <br>
        <strong>Nível:</strong> ${dificuldade}
    `;

    // Botão de remover (Demolição de Elementos)[cite: 23]
    const btnRemover = document.createElement('button');
    btnRemover.textContent = 'Abandonar Missão';
    btnRemover.style.marginTop = '10px';
    btnRemover.style.backgroundColor = '#ef4444'; // Cor de alerta
    
    // Usando Arrow Function para o evento de clique[cite: 22]
    btnRemover.addEventListener('click', () => {
        novoHabitoLi.remove(); // Destrói o elemento da tela[cite: 23]
    });

    // Fase 2: Acoplamento no DOM[cite: 23]
    novoHabitoLi.appendChild(btnRemover);
    listaHabitos.appendChild(novoHabitoLi);

    // 5. Limpar os campos após o sucesso
    formHabito.reset();
});