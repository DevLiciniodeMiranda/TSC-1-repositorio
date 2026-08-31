# Etapa 02: Protótipo Estrutural com HTML Semântico

## Funcionalidades Implementadas
* Estruturação visual da navegação entre as principais telas do sistema.
* Formulário de autenticação (simulação de entrada no sistema).
* Visualização do estado do perfil (Nível, Barra de XP e Ofensiva).
* Listagem de hábitos do dia em formato de "missões".
* Formulário para criação de novos hábitos com definição de dificuldade e recompensas.

## Páginas Criadas
1. **`index.html`**: Tela inicial contendo o formulário de login.
2. **`dashboard.html`**: Painel principal do usuário, contendo o progresso da gamificação e as tarefas pendentes do dia.
3. **`habitos.html`**: Interface de cadastro (formulário) para adição de novos hábitos na rotina do usuário.

## Decisões Relacionadas à Estrutura HTML
* **Tags Semânticas de Layout:** Utilizamos `<header>`, `<main>` e `<footer>` em todas as páginas para demarcar claramente o cabeçalho, o conteúdo principal e o rodapé da aplicação, facilitando a indexação e acessibilidade.
* **Agrupamento de Conteúdo:** O dashboard foi dividido utilizando a tag `<section>` para isolar o resumo do perfil da lista de tarefas.
* **Itens Independentes:** Cada hábito renderizado no dashboard foi encapsulado em uma tag `<article>`, pois representam blocos de conteúdo com sentido próprio (nome, dificuldade e ação de concluir).
* **Acessibilidade em Formulários:** Todos os inputs possuem a tag `<label>` associada através do atributo `for` referenciando o `id` do campo de entrada correspondente.
* **Indicadores Visuais:** Utilização da tag semântica `<progress>` para representar a barra de XP do usuário de forma nativa pelo navegador.