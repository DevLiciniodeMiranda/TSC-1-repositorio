// feedback.js — Módulo responsável por exibir estados de Carregamento, Sucesso e Erro no DOM

export function exibirCarregamento(elemento, texto = '⏳ Consultando os pergaminhos do servidor...') {
    elemento.style.color = '#8b5cf6'; // Roxo do tema Dark RPG
    elemento.textContent = texto;
}

export function exibirSucesso(elemento, texto) {
    elemento.style.color = '#22c55e'; // Verde
    elemento.textContent = `✅ ${texto}`;
}

export function exibirErro(elemento, texto) {
    elemento.style.color = '#ef4444'; // Vermelho
    elemento.textContent = `❌ ${texto}`;
}

export function exibirAviso(elemento, texto) {
    elemento.style.color = '#f59e0b'; // Laranja/Amarelo
    elemento.textContent = `⚠️ ${texto}`;
}