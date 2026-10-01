// 1. Estado da Aplicação: Uso de Arrays e Objetos JSON
const missoes = [
    { id: 1, titulo: 'Derrotar o Bug do CSS', dificuldade: 'Média', status: 'concluida' },
    { id: 2, titulo: 'Ler 10 páginas do grimório', dificuldade: 'Fácil', status: 'pendente' },
    { id: 3, titulo: 'Treino de Força (Academia)', dificuldade: 'Difícil', status: 'falhada' },
    { id: 4, titulo: 'Beber 2L de Poção (Água)', dificuldade: 'Fácil', status: 'concluida' }
];

// 2. Selecionando Elementos (Fase de Leitura)[cite: 23]
const listaMissoes = document.querySelector('#lista-missoes');
const btnTodas = document.querySelector('#btn-todas');
const btnConcluidas = document.querySelector('#btn-concluidas');
const btnPendentes = document.querySelector('#btn-pendentes');

// 3. Uso de Funções e Métodos de Iteração
function renderizarMissoes(arrayDeMissoes) {
    // Limpa a lista antes de renderizar para evitar duplicações[cite: 23]
    listaMissoes.replaceChildren();

    // Uso do forEach para iteração declarativa[cite: 22]
    arrayDeMissoes.forEach(missao => {
        const li = document.createElement('li'); // Create[cite: 23]
        
        // Estilização base do card
        li.style.background = '#1e293b';
        li.style.padding = '15px';
        li.style.marginBottom = '10px';
        li.style.borderRadius = '8px';

        // Lógica de cores baseada no status
        let corStatus = '#94a3b8'; // Cinza (Pendente/Falhada)
        if (missao.status === 'concluida') corStatus = '#22c55e'; // Verde
        if (missao.status === 'pendente') corStatus = '#f59e0b'; // Laranja

        li.style.borderLeft = `4px solid ${corStatus}`;
        
        li.innerHTML = `
            <strong>${missao.titulo}</strong> <br>
            <small>Nível: ${missao.dificuldade} | Status: ${missao.status.toUpperCase()}</small>
        `;

        listaMissoes.appendChild(li); // Acoplamento[cite: 23]
    });
}

// 4. Tratamento de Eventos e Alteração Dinâmica da Interface[cite: 24]
// Botão Todas
btnTodas.addEventListener('click', () => {
    renderizarMissoes(missoes);
});

// Botão Concluídas usando o método .filter()[cite: 22]
btnConcluidas.addEventListener('click', () => {
    const apenasConcluidas = missoes.filter(missao => missao.status === 'concluida');
    renderizarMissoes(apenasConcluidas);
});

// Botão Pendentes usando o método .filter()[cite: 22]
btnPendentes.addEventListener('click', () => {
    const apenasPendentes = missoes.filter(missao => missao.status === 'pendente');
    renderizarMissoes(apenasPendentes);
});

// 5. Renderização Inicial
renderizarMissoes(missoes);