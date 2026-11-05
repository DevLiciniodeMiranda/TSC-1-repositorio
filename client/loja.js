import { consultarDadosReino, submeterDadosServidor } from './api.js';
import { exibirCarregamento, exibirSucesso, exibirErro, exibirAviso } from './feedback.js';

let saldoAtual = 500;
let produtos = [];

// Seleção de elementos do DOM
const listaProdutos = document.querySelector('#lista-produtos');
const displaySaldo = document.querySelector('#saldo-ouro');
const displayTotal = document.querySelector('#valor-total');
const formLoja = document.querySelector('#form-loja');
const mensagemLoja = document.querySelector('#mensagem-loja');
const listaInventario = document.querySelector('#lista-inventario');
const inventarioVazio = document.querySelector('#inventario-vazio');
const btnComprar = formLoja.querySelector('button[type="submit"]');

function renderizarLoja() {
    listaProdutos.replaceChildren();

    produtos.forEach(produto => {
        const li = document.createElement('li');
        li.style.background = '#0f172a';
        li.style.padding = '10px';
        li.style.marginBottom = '8px';
        li.style.borderRadius = '5px';
        li.style.display = 'flex';
        li.style.justifyContent = 'space-between';

        li.innerHTML = `
            <label style="cursor: pointer;">
                <input type="checkbox" name="item-compra" value="${produto.preco}" data-nome="${produto.nome}" data-icone="${produto.icone}">
                ${produto.icone} ${produto.nome}
            </label>
            <span style="color: #fbbf24;">${produto.preco} 💰</span>
        `;
        listaProdutos.appendChild(li);
    });
}

// 1. Operação de Consulta Assíncrona (GET) para carregar a vitrine do Mercador
async function carregarCatalogoMercador() {
    try {
        exibirCarregamento(mensagemLoja, '⏳ Carregando estoque do Mercador...');
        const dados = await consultarDadosReino('./dados.json');
        produtos = dados.produtos;
        renderizarLoja();
        mensagemLoja.textContent = '';
    } catch (erro) {
        exibirErro(mensagemLoja, `Não foi possível abrir a tenda do Mercador: ${erro.message}`);
    }
}

// Calcula o valor total em tempo real
listaProdutos.addEventListener('change', () => {
    const checkboxesMarcados = Array.from(document.querySelectorAll('input[name="item-compra"]:checked'));
    const total = checkboxesMarcados.reduce((acumulador, checkbox) => acumulador + Number(checkbox.value), 0);
    displayTotal.textContent = total;
});

// 2. Operação de Submissão Assíncrona (POST) ao finalizar a compra
formLoja.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const checkboxesMarcados = Array.from(document.querySelectorAll('input[name="item-compra"]:checked'));
    const custoTotal = Number(displayTotal.textContent);

    if (custoTotal === 0) {
        exibirAviso(mensagemLoja, 'Atenção: Selecione pelo menos um equipamento no Mercador.');
        return;
    }

    if (custoTotal > saldoAtual) {
        exibirErro(mensagemLoja, 'Erro: Você não tem moedas de ouro suficientes!');
        return;
    }

    const itensSelecionados = checkboxesMarcados.map(cb => ({
        nome: cb.getAttribute('data-nome'),
        icone: cb.getAttribute('data-icone'),
        preco: Number(cb.value)
    }));

    try {
        btnComprar.disabled = true;
        exibirCarregamento(mensagemLoja, '⏳ Processando transação de ouro com o servidor...');

        await submeterDadosServidor({ itens: itensSelecionados, total: custoTotal });

        saldoAtual -= custoTotal;
        displaySaldo.textContent = saldoAtual;
        
        if (inventarioVazio) {
            inventarioVazio.remove();
        }

        itensSelecionados.forEach(item => {
            const itemInventario = document.createElement('li');
            itemInventario.style.background = '#0f172a';
            itemInventario.style.padding = '10px';
            itemInventario.style.marginBottom = '8px';
            itemInventario.style.borderRadius = '5px';
            itemInventario.style.borderLeft = '3px solid #22c55e';
            itemInventario.textContent = `${item.icone} ${item.nome}`;
            listaInventario.appendChild(itemInventario);
        });

        exibirSucesso(mensagemLoja, 'Compra confirmada pelo servidor! Verifique sua mochila.');
        formLoja.reset();
        displayTotal.textContent = '0';
    } catch (erro) {
        exibirErro(mensagemLoja, `Erro na transação: ${erro.message}`);
    } finally {
        btnComprar.disabled = false;
    }
});

carregarCatalogoMercador();