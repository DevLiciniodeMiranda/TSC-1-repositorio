// api.js — Módulo responsável pelas chamadas assíncronas (Fetch API + Promises + async/await)

// Função auxiliar com Promise para simular o tempo de resposta do servidor (1 segundo)
const aguardarLatencia = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

// 1. OPERAÇÃO DE CONSULTA (GET) — Consome os dados externos do arquivo dados.json
export async function consultarDadosReino(endpoint = './dados.json') {
    await aguardarLatencia(1000);
    
    const resposta = await fetch(endpoint);
    
    if (!resposta.ok) {
        throw new Error(`Falha ao comunicar com os arquivos do Reino (Status: ${resposta.status})`);
    }
    
    return await resposta.json();
}

// 2. OPERAÇÃO SUBMETIDA AO SERVIDOR (POST) — Envia dados para uma API pública simulada
export async function submeterDadosServidor(dados, url = 'https://jsonplaceholder.typicode.com/posts') {
    await aguardarLatencia(1200);

    const resposta = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(dados)
    });

    if (!resposta.ok) {
        throw new Error(`O servidor da Guilda recusou a requisição (Status: ${resposta.status})`);
    }

    return await resposta.json();
}