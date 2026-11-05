# Documentação da Etapa 05 - Modularização e Comunicação Assíncrona

Este documento detalha a evolução arquitetural implementada no projeto **NextLevel**, preparando o front-end para consumir dados externos de forma assíncrona e organizando o código JavaScript de maneira modular (ES Modules), mantendo a identidade visual e temática de "Dark RPG".

---

## 1. Arquitetura Modular e Separação de Responsabilidades

Para evitar a concentração de toda a lógica num único ficheiro e promover o reaproveitamento de código, os scripts da aplicação foram refatorados utilizando o sistema de módulos nativo do ECMAScript 6 (`import` e `export`), ativado nos documentos HTML através do atributo `<script type="module">`.

*   **Módulo de Serviços (`api.js`):** Centraliza toda a comunicação externa da aplicação. Implementa funções assíncronas reutilizáveis para operações de consulta (`GET`) e submissão (`POST`) utilizando a **Fetch API**, `Promises` e a sintaxe `async/await`.
*   **Módulo de Interface (`feedback.js`):** Encapsula a manipulação visual dos estados de rede no DOM (`exibirCarregamento`, `exibirSucesso`, `exibirErro` e `exibirAviso`), padronizando as cores temáticas do sistema (`#8b5cf6` para carregamento, `#22c55e` para sucesso e `#ef4444` para falhas).
*   **Fonte de Dados Externa (`dados.json`):** Os dados de estado que anteriormente estavam fixos no código (catálogo de produtos d'*O Mercador* e histórico de missões do *Diário de Batalha*) foram extraídos para um ficheiro JSON independente.
*   **Módulos de Página (`habitos.js`, `diario.js`, `loja.js`):** Passaram a atuar como controladores específicos de cada ecrã, importando apenas as funções necessárias dos módulos `api.js` e `feedback.js`.

---

## 2. Operações Assíncronas Implementadas

### Operação A: Consulta Assíncrona de Dados (`GET`)
*   **Como funciona:** Ao aceder às páginas **Diário de Batalha** (`diario.html`) e **O Mercador** (`loja.html`), a aplicação realiza uma requisição assíncrona via `fetch('./dados.json')` através da função `consultarDadosReino()`. Enquanto aguarda a resolução da `Promise`, a interface exibe um indicador de carregamento. Assim que os dados JSON são recebidos e convertidos, os cartões de missões e a vitrine de equipamentos são renderizados dinamicamente no DOM.
*   **Arquivos envolvidos:** `api.js`, `feedback.js`, `dados.json`, `diario.js` e `loja.js`.

### Operação B: Submissão de Dados ao Servidor (`POST`)
*   **Como funciona:** Na **Forja de Hábitos** (`habitos.html`) e ao finalizar uma compra n'**O Mercador** (`loja.html`), após a validação local dos campos do formulário, os dados são empacotados num objeto e enviados para uma API REST simulada (`https://jsonplaceholder.typicode.com/posts`) através da função `submeterDadosServidor()`. O sistema aguarda a confirmação do servidor (`status 201 Created`) antes de anexar o novo hábito à lista (exibindo o ID gerado pelo servidor) ou transferir os itens comprados para o inventário.
*   **Arquivos envolvidos:** `api.js`, `feedback.js`, `habitos.js` e `loja.js`.

---

## 3. Tratamento de Estados de Carregamento, Sucesso e Erro

Todas as operações assíncronas foram envolvidas em blocos estruturados `try / catch / finally` para garantir resiliência e feedback visual contínuo ao utilizador:

*   **Tratamento de Carregamento:** Antes do início de cada requisição (`await`), a função `exibirCarregamento()` injeta um aviso em destaque roxo (ex: *"⏳ Forjando hábito e salvando no servidor da Guilda..."*) e os botões de submissão são temporariamente desativados (`disabled = true`) para evitar envios duplicados. No bloco `finally`, os botões são reativados.
*   **Tratamento de Sucesso:** Quando a propriedade `resposta.ok` confirma o êxito da comunicação HTTP, a interface atualiza os elementos dinâmicos e aciona `exibirSucesso()`, apresentando confirmação em verde ao jogador.
*   **Tratamento de Erro de Comunicação:** Caso o ficheiro externo não seja encontrado (Erro 404) ou ocorra falha de conexão com o servidor, a função `api.js` lança uma exceção (`throw new Error(...)`). O bloco `catch (erro)` captura a falha e aciona `exibirErro()`, informando o problema no DOM sem quebrar a execução da página.

---

## 4. Matriz de Evidências

Abaixo encontra-se a correlação entre os requisitos exigidos para a Etapa 05 e a sua respetiva implementação no projeto:

====================================================
MATRIZ DE EVIDÊNCIAS - ETAPA 05
====================================================

REQUISITO: Separar o código em módulos e evitar arquivo único
FUNCIONALIDADE: Arquitetura modular com ES Modules
ARQUIVO(S): api.js, feedback.js, habitos.js, diario.js, loja.js
EVIDÊNCIA: Uso das diretivas `export` nas funções de serviço/UI e `import { ... } from` nos scripts das páginas, aliados a `<script type="module">` nos HTMLs.
----------------------------------------------------

REQUISITO: Implementar chamadas assíncronas com Fetch API
FUNCIONALIDADE: Consulta de catálogo/missões e envio de formulários
ARQUIVO(S): api.js
EVIDÊNCIA: Utilização nativa de `fetch(endpoint)` para leitura GET e `fetch(url, { method: 'POST', headers: {...}, body: JSON.stringify(dados) })` para submissão.
----------------------------------------------------

REQUISITO: Trabalhar com Promises e/ou async/await
FUNCIONALIDADE: Controle de fluxo assíncrono e simulação de latência
ARQUIVO(S): api.js, habitos.js, diario.js, loja.js
EVIDÊNCIA: Instanciação de `new Promise(resolve => setTimeout(resolve, ms))` e uso de funções `async` com `await` na espera das respostas HTTP e parsing `.json()`.
----------------------------------------------------

REQUISITO: Operação de consulta e uso de dados externos
FUNCIONALIDADE: Carregamento do Diário de Batalha e Vitrine do Mercador
ARQUIVO(S): dados.json, api.js, diario.js, loja.js
EVIDÊNCIA: Extração dos arrays estáticos para `dados.json` e consumo dinâmico via `await consultarDadosReino('./dados.json')` ao inicializar as páginas.
----------------------------------------------------

REQUISITO: Operação submetida ao servidor ou serviço simulado
FUNCIONALIDADE: Registro de novos hábitos e checkout de compra na loja
ARQUIVO(S): api.js, habitos.js, loja.js
EVIDÊNCIA: Envio de payload JSON via requisição POST para o endpoint simulado do JSONPlaceholder em `submeterDadosServidor()`, retornando o objeto registrado.
----------------------------------------------------

REQUISITO: Tratamento de estados de carregamento e sucesso
FUNCIONALIDADE: Feedback visual durante e após requisições HTTP
ARQUIVO(S): feedback.js, habitos.js, diario.js, loja.js
EVIDÊNCIA: Chamada de `exibirCarregamento()` e bloqueio do botão (`btnSubmit.disabled = true`) antes do `await`, seguidos por `exibirSucesso()` após o retorno da API.
----------------------------------------------------

REQUISITO: Tratamento de erros de comunicação
FUNCIONALIDADE: Captura de falhas de rede ou status HTTP inválidos
ARQUIVO(S): api.js, feedback.js, diario.js, habitos.js, loja.js
EVIDÊNCIA: Verificação `if (!resposta.ok) throw new Error(...)` na API e captura com blocos `try / catch (erro)` exibindo a falha no DOM via `exibirErro()`.

====================================================

## 5. Evidências do Funcionamento

**1. Operação de Consulta e Tratamento de Carregamento (Diário de Batalha / Mercador):**
![Carregamento Consulta](evidencias/etapa-05/consulta-carregando.png)
![Sucesso Consulta](evidencias/etapa-05/consulta-sucesso.png)

**2. Operação Submetida ao Servidor e Tratamento de Sucesso (Forja de Hábitos):**
![Carregamento Submissão](evidencias/etapa-05/submissao-carregando.png)
![Sucesso Submissão](evidencias/etapa-05/submissao-sucesso.png)

**3. Tratamento de Erro de Comunicação (Simulação de Falha HTTP 404):**
![Erro de Comunicação](evidencias/etapa-05/erro-comunicacao.png)