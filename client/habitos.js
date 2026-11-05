import { submeterDadosServidor } from './api.js';
import { exibirCarregamento, exibirSucesso, exibirErro } from './feedback.js';

// 1. Selecionando Elementos do DOM
const formHabito = document.querySelector('#form-habito');
const selectFoco = document.querySelector('#foco');
const inputPeso = document.querySelector('#peso');
const inputMissao = document.querySelector('#nome-habito');
const selectDificuldade = document.querySelector('#dificuldade');
const mensagemFeedback = document.querySelector('#mensagem-erro');
const listaHabitos = document.querySelector('#lista-habitos');
const btnSubmit = formHabito.querySelector('button[type="submit"]');

// Função modularizada para criar o elemento no DOM
function adicionarHabitoNaTela(habito) {
    const novoHabitoLi = document.createElement('li');
    novoHabitoLi.style.background = '#1e293b';
    novoHabitoLi.style.padding = '15px';
    novoHabitoLi.style.marginBottom = '10px';
    novoHabitoLi.style.borderRadius = '8px';
    novoHabitoLi.style.borderLeft = '4px solid #8b5cf6';
    
    novoHabitoLi.innerHTML = `
        <strong>Foco:</strong> ${habito.foco} <br>
        <strong>Peso:</strong> ${habito.peso}kg <br>
        <strong>Missão:</strong> ${habito.missao} <br>
        <strong>Nível:</strong> ${habito.dificuldade} <br>
        <small style="color: #94a3b8;">ID no Servidor: #${habito.id || 101}</small><br>
    `;

    const btnRemover = document.createElement('button');
    btnRemover.textContent = 'Abandonar Missão';
    btnRemover.style.marginTop = '10px';
    btnRemover.style.backgroundColor = '#ef4444';
    btnRemover.addEventListener('click', () => novoHabitoLi.remove());

    novoHabitoLi.appendChild(btnRemover);
    listaHabitos.appendChild(novoHabitoLi);
}

// 2. Tratamento de Eventos Assíncrono (async/await)
formHabito.addEventListener('submit', async function(event) {
    event.preventDefault(); 

    const foco = selectFoco.options[selectFoco.selectedIndex].text;
    const pesoValue = inputPeso.value.trim();
    const missao = inputMissao.value.trim() || "Nenhuma missão extra";
    const dificuldade = selectDificuldade.options[selectDificuldade.selectedIndex].text;

    // 3. Validações locais
    if (pesoValue === '') {
        exibirErro(mensagemFeedback, 'Erro: O campo "Peso Atual" é obrigatório para forjar o hábito!');
        return;
    }

    if (Number(pesoValue) <= 0) {
        exibirErro(mensagemFeedback, 'Erro: O peso deve ser um valor válido maior que zero!');
        return;
    }

    const novoHabitoPayload = { foco, peso: Number(pesoValue), missao, dificuldade };

    // 4. Submissão Assíncrona ao Servidor com Tratamento de Carregamento, Sucesso e Erro
    try {
        btnSubmit.disabled = true;
        exibirCarregamento(mensagemFeedback, '⏳ Forjando hábito e salvando no servidor da Guilda...');

        const respostaServidor = await submeterDadosServidor(novoHabitoPayload);

        adicionarHabitoNaTela(respostaServidor);
        exibirSucesso(mensagemFeedback, 'Hábito forjado e sincronizado com o servidor!');
        formHabito.reset();
    } catch (erro) {
        exibirErro(mensagemFeedback, `Falha de comunicação ao salvar hábito: ${erro.message}`);
    } finally {
        btnSubmit.disabled = false;
    }
});