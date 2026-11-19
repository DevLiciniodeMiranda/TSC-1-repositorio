Etapa 06 — Desenvolvimento e Documentação da API REST (Backend)Projeto: NextLevel (Rastreador de Hábitos Gamificado — Dark RPG)Aluno: João Pedro Fragoso de Almeida Licinio de MirandaStack Backend: Node.js, Express, CORS e persistência em arquivo JSON1. Visão Geral e Arquitetura do BackendNesta etapa, foi desenvolvida a camada de backend do projeto NextLevel seguindo os princípios arquiteturais REST, estruturada no diretório server/ na raiz do repositório (separada do front-end em client/ e da documentação em docs/).NextLevel/
├── client/                   # Interface Web (HTML, CSS, ES6 Modules, Fetch API)
├── docs/                     # Documentação das etapas e evidências
│   ├── evidencias/
│   │   └── etapa-06/         # Prints de execução dos testes da API
│   └── etapa-06.md
└── server/                   # API REST (Node.js + Express)
    ├── data/
    │   └── missoes.json      # Base de dados persistida em JSON
    ├── routes/
    │   └── missoes.routes.js # Controlador e rotas REST do recurso /api/missoes
    ├── package.json          # Dependências e scripts de execução
    └── server.js             # Configuração do servidor, CORS e middlewares de erro

Principais Características ImplementadasRecurso Principal: /api/missoes (gerenciamento de missões e hábitos diários).Persistência em Arquivo: Leitura e escrita assíncrona via node:fs/promises no arquivo server/data/missoes.json.Validação e Tratamento de Erros: Respostas padronizadas em JSON com códigos HTTP semânticos (200, 201, 400, 404 e 500), incluindo captura de payloads inválidos e JSON malformado (SyntaxError tratado como 400 Bad Request).CORS Habilitado: Configurado com o middleware cors() para permitir integração direta com o front-end (client/).2. Como Executar o Servidor LocalmenteAbra o terminal na raiz do projeto e acesse a pasta server/:cd server

Instale as dependências (express e cors):npm install

Inicie o servidor:npm start

(Para modo de desenvolvimento com reinicialização automática, utilize npm run dev.)O servidor ficará disponível em: http://localhost:3000 (rota de verificação: GET http://localhost:3000/api/health).3. Documentação dos Endpoints (/api/missoes)MétodoRotaDescriçãoCódigos HTTPGET/api/healthVerifica se o serviço da API está online.200GET/api/missoesLista todas as missões (aceita filtros opcionais ?status= e ?foco=).200, 500GET/api/missoes/:idBusca uma missão específica pelo seu id numérico.200, 400, 404, 500POST/api/missoesCria uma nova missão e persiste em missoes.json.201, 400, 500PATCH/api/missoes/:idAtualiza parcialmente os dados de uma missão existente.200, 400, 404, 500DELETE/api/missoes/:idRemove permanentemente uma missão pelo id.200, 400, 404, 500Regras de Validação do Recurso Missãotitulo (string, obrigatório no POST): mínimo de 3 caracteres.foco (string, padrão "estudos"): valores permitidos — estudos, academia, nextlevel.dificuldade (string, padrão "facil"): valores permitidos — facil, medio, dificil.status (string, padrão "pendente"): valores permitidos — pendente, concluida, falhada.4. Exemplos de Requisições e Respostas4.1. Listar todas as missões (GET /api/missoes)Resposta (200 OK):{
  "total": 3,
  "dados": [
    {
      "id": 1,
      "titulo": "Derrotar o Bug do CSS",
      "foco": "estudos",
      "dificuldade": "medio",
      "status": "concluida"
    },
    {
      "id": 2,
      "titulo": "Ler 10 páginas do grimório",
      "foco": "estudos",
      "dificuldade": "facil",
      "status": "pendente"
    },
    {
      "id": 3,
      "titulo": "Treino de Força (Academia)",
      "foco": "academia",
      "dificuldade": "dificil",
      "status": "pendente"
    }
  ]
}

4.2. Consultar missão por ID (GET /api/missoes/1)Resposta (200 OK):{
  "dados": {
    "id": 1,
    "titulo": "Derrotar o Bug do CSS",
    "foco": "estudos",
    "dificuldade": "medio",
    "status": "concluida"
  }
}

Resposta para ID inexistente (GET /api/missoes/999 — 404 Not Found):{
  "erro": {
    "status": 404,
    "mensagem": "Missão com ID 999 não encontrada.",
    "detalhes": []
  }
}

4.3. Criar nova missão (POST /api/missoes)Requisição (Content-Type: application/json):{
  "titulo": "Revisar redes e sockets",
  "foco": "estudos",
  "dificuldade": "medio"
}

Resposta (201 Created):{
  "mensagem": "Missão criada com sucesso.",
  "dados": {
    "id": 4,
    "titulo": "Revisar redes e sockets",
    "foco": "estudos",
    "dificuldade": "medio",
    "status": "pendente"
  }
}

Resposta para dados inválidos (400 Bad Request):{
  "erro": {
    "status": 400,
    "mensagem": "Dados inválidos para criar a missão.",
    "detalhes": [
      "O campo \"titulo\" é obrigatório e deve ter pelo menos 3 caracteres."
    ]
  }
}

4.4. Atualizar missão parcialmente (PATCH /api/missoes/2)Requisição (Content-Type: application/json):{
  "status": "concluida"
}

Resposta (200 OK):{
  "mensagem": "Missão atualizada com sucesso.",
  "dados": {
    "id": 2,
    "titulo": "Ler 10 páginas do grimório",
    "foco": "estudos",
    "dificuldade": "facil",
    "status": "concluida"
  }
}

4.5. Excluir missão (DELETE /api/missoes/4)Resposta (200 OK):{
  "mensagem": "Missão removida com sucesso.",
  "dados": {
    "id": 4,
    "titulo": "Revisar redes e sockets",
    "foco": "estudos",
    "dificuldade": "medio",
    "status": "pendente"
  }
}

5. Comandos e Coleção de TestesComandos de Teste (PowerShell)# 1. Listar todas as missões (200 OK)
curl.exe -i http://localhost:3000/api/missoes

# 2. Buscar missão por ID existente (200 OK) e inexistente (404 Not Found)
curl.exe -i http://localhost:3000/api/missoes/1
curl.exe -i http://localhost:3000/api/missoes/999

# 3. Criar nova missão (201 Created)
Invoke-WebRequest -UseBasicParsing -Uri http://localhost:3000/api/missoes -Method POST -ContentType "application/json" -Body '{"titulo":"Revisar redes e sockets","foco":"estudos","dificuldade":"medio"}'

# 4. Testar validação de entrada inválida (400 Bad Request)
try { Invoke-WebRequest -UseBasicParsing -Uri http://localhost:3000/api/missoes -Method POST -ContentType "application/json" -Body '{"titulo":"ab","foco":"estudos"}' } catch { $_.Exception.Response.StatusCode.value__; $sr = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream()); $sr.ReadToEnd() }

# 5. Atualizar status de missão existente (200 OK)
Invoke-WebRequest -UseBasicParsing -Uri http://localhost:3000/api/missoes/2 -Method PATCH -ContentType "application/json" -Body '{"status":"concluida"}'

# 6. Excluir missão (200 OK)
Invoke-WebRequest -UseBasicParsing -Uri http://localhost:3000/api/missoes/4 -Method DELETE

Coleção Importável (Postman v2.1){
  "info": {
    "name": "NextLevel API - Etapa 06",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Listar Missões (GET)",
      "request": {
        "method": "GET",
        "url": "http://localhost:3000/api/missoes"
      }
    },
    {
      "name": "Buscar Missão por ID (GET)",
      "request": {
        "method": "GET",
        "url": "http://localhost:3000/api/missoes/1"
      }
    },
    {
      "name": "Criar Missão (POST)",
      "request": {
        "method": "POST",
        "header": [{ "key": "Content-Type", "value": "application/json" }],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"titulo\": \"Revisar redes e sockets\",\n  \"foco\": \"estudos\",\n  \"dificuldade\": \"medio\"\n}"
        },
        "url": "http://localhost:3000/api/missoes"
      }
    },
    {
      "name": "Atualizar Missão (PATCH)",
      "request": {
        "method": "PATCH",
        "header": [{ "key": "Content-Type", "value": "application/json" }],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"status\": \"concluida\"\n}"
        },
        "url": "http://localhost:3000/api/missoes/2"
      }
    },
    {
      "name": "Excluir Missão (DELETE)",
      "request": {
        "method": "DELETE",
        "url": "http://localhost:3000/api/missoes/4"
      }
    }
  ]
}

6. Evidências de Execução6.1. Consulta Geral (GET /api/missoes — 200 OK)6.2. Consulta por ID (GET /api/missoes/1 — 200 OK) e ID Inexistente (404 Not Found)6.3. Criação de Recurso (POST /api/missoes — 201 Created)6.4. Validação de Entrada Inválida (POST /api/missoes — 400 Bad Request)6.5. Atualização Parcial (PATCH /api/missoes/2 — 200 OK)6.6. Exclusão de Recurso (DELETE /api/missoes/4 — 200 OK)