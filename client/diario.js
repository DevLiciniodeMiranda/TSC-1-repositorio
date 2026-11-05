import { consultarDadosReino } from './api.js';
import { exibirCarregamento, exibirErro } from './feedback.js';

// Estado da aplicação preenchido via requisição assíncrona
let missoes = [];

// Selecionando Elementos do DOM
const listaMissoes = document.querySelector('#lista-missoes');
const btnTodas = document.querySelector('#btn-todas');
const btnConcluidas = document.querySelector('#btn-concluidas');
const btnPendentes = document.querySelector('#btn-pendentes');

// Elemento dinâmico para exibir feedback de carregamento/erro na consulta
const statusDiario = document.createElement('p');
statusDiario.style.fontWeight = 'bold';
listaMissoes.parentNode.insertBefore(statusDiario, listaMissoes);

function renderizarMissoes(arrayDeMissoes) {
    listaMissoes.replaceChildren();

    arrayDeMissoes.forEach(missao => {
        const li = document.createElement('li');
        li.style.background = '#1e293b';
        li.style.padding = '15px';
        li.style.marginBottom = '10px';
        li.style.borderRadius = '8px';

        let corStatus = '#94a3b8';
        if (missao.status === 'concluida') corStatus = '#22c55e';
        if (missao.status === 'pendente') corStatus = '#f59e0b';

        li.style.borderLeft = `4px solid ${corStatus}`;
        li.innerHTML = `
            <strong>${missao.titulo}</strong> <br>
            <small>Nível: ${missao.dificuldade} | Status: ${missao.status.toUpperCase()}</small>
        `;

        listaMissoes.appendChild(li);
    });
}

// Função Assíncrona de Consulta (GET) com Tratamento de Carregamento, Sucesso e Erro
async function carregarDiario() {
    try {
        exibirCarregamento(statusDiario, '⏳ Carregando histórico de batalhas do servidor...');
        
        // DICA PARA O PRINT DE ERRO: troque './dados.json' por './arquivo-inexistente.json'
        const dados = await consultarDadosReino('./dados.json');
        
        missoes = dados.missoes;
        statusDiario.textContent = ''; // Limpa o carregamento após o sucesso
        renderizarMissoes(missoes);
    } catch (erro) {
        exibirErro(statusDiario, `Erro ao carregar o Diário: ${erro.message}`);
    }
}

// Eventos de Filtragem
btnTodas.addEventListener('click', () => renderizarMissoes(missoes));

btnConcluidas.addEventListener('click', () => {
    const apenasConcluidas = missoes.filter(missao => missao.status === 'concluida');
    renderizarMissoes(apenasConcluidas);
});

btnPendentes.addEventListener('click', () => {
    const apenasPendentes = missoes.filter(missao => missao.status === 'pendente');
    renderizarMissoes(apenasPendentes);
});

// Inicializa a consulta assíncrona
carregarDiario();