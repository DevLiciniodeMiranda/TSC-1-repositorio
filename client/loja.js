// Estado inicial do jogador
let saldoAtual = 500;

// Catálogo de produtos disponíveis agora com a propriedade 'icone'
const produtos = [
    { id: 1, nome: 'Espada Longa de Aço', preco: 150, icone: '🗡️' },
    { id: 2, nome: 'Poção de Foco Profundo', preco: 40, icone: '🧪' },
    { id: 3, nome: 'Armadura da Disciplina', preco: 300, icone: '🛡️' },
    { id: 4, nome: 'Amuleto do Tempo', preco: 600, icone: '⏳' } 
];

// Seleção de elementos do DOM
const listaProdutos = document.querySelector('#lista-produtos');
const displaySaldo = document.querySelector('#saldo-ouro');
const displayTotal = document.querySelector('#valor-total');
const formLoja = document.querySelector('#form-loja');
const mensagemLoja = document.querySelector('#mensagem-loja');
const listaInventario = document.querySelector('#lista-inventario');
const inventarioVazio = document.querySelector('#inventario-vazio');

// Renderiza os produtos na interface
function renderizarLoja() {
    produtos.forEach(produto => {
        const li = document.createElement('li');
        li.style.background = '#0f172a';
        li.style.padding = '10px';
        li.style.marginBottom = '8px';
        li.style.borderRadius = '5px';
        li.style.display = 'flex';
        li.style.justifyContent = 'space-between';

        // Injetamos o data-icone no input para o JavaScript saber qual emoji usar depois
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

// Calcula o valor total em tempo real
listaProdutos.addEventListener('change', () => {
    const checkboxesMarcados = Array.from(document.querySelectorAll('input[name="item-compra"]:checked'));
    
    const total = checkboxesMarcados.reduce((acumulador, checkbox) => {
        return acumulador + Number(checkbox.value);
    }, 0);

    displayTotal.textContent = total;
});

// Processa a compra ao enviar o formulário
formLoja.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const checkboxesMarcados = Array.from(document.querySelectorAll('input[name="item-compra"]:checked'));
    const custoTotal = Number(displayTotal.textContent);

    if (custoTotal === 0) {
        mensagemLoja.style.color = '#f59e0b';
        mensagemLoja.textContent = 'Atenção: Selecione pelo menos um equipamento no Mercador.';
        return;
    }

    if (custoTotal > saldoAtual) {
        mensagemLoja.style.color = '#ef4444';
        mensagemLoja.textContent = 'Erro: Você não tem moedas de ouro suficientes!';
        return;
    }

    // Processa o pagamento
    saldoAtual -= custoTotal;
    displaySaldo.textContent = saldoAtual;
    
    if (inventarioVazio) {
        inventarioVazio.remove();
    }

    // Adiciona cada item comprado no Inventário com seu respectivo emoji
    checkboxesMarcados.forEach(checkbox => {
        const nomeDoItem = checkbox.getAttribute('data-nome');
        const iconeDoItem = checkbox.getAttribute('data-icone'); // Captura o emoji específico
        
        const itemInventario = document.createElement('li');
        itemInventario.style.background = '#0f172a';
        itemInventario.style.padding = '10px';
        itemInventario.style.marginBottom = '8px';
        itemInventario.style.borderRadius = '5px';
        itemInventario.style.borderLeft = '3px solid #22c55e'; 
        
        // Aplica o ícone correto junto com o nome
        itemInventario.textContent = `${iconeDoItem} ${nomeDoItem}`;
        
        listaInventario.appendChild(itemInventario);
    });
    
    mensagemLoja.style.color = '#22c55e';
    mensagemLoja.textContent = 'Compra realizada! Verifique sua mochila.';
    
    formLoja.reset();
    displayTotal.textContent = '0';
});

renderizarLoja();