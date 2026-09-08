# NextLevel

**O RPG da sua evolução pessoal e qualidade de vida.**  
Aplicação Web para gerenciamento de rotinas diárias com mecânicas de gamificação que ajudam você a se tornar a sua melhor versão.

**Status:** Projeto em desenvolvimento

## Sobre o projeto

O NextLevel tem como objetivo auxiliar os usuários a criar e manter bons hábitos através de um sistema de recompensas virtuais.
A aplicação permitirá registrar rotinas diárias e utilizar esses dados para calcular o progresso do usuário em um formato semelhante a um jogo (RPG).

A partir das informações e check-ins diários registrados, o sistema deverá apresentar:
* composição e lista de hábitos diários e semanais pendentes;
* barra de progresso, nível atual e pontos de experiência (XP);
* dias consecutivos de sucesso (ofensivas/streaks);
* histórico de conclusão de tarefas;
* relatórios e gráficos de consistência.

O projeto será desenvolvido de forma incremental ao longo da disciplina Tecnologia de Construção de Software.

## Problema

Manter a consistência em novos hábitos (como estudar, ler ou fazer exercícios) é difícil porque a recompensa real costuma ser de longo prazo. 
À medida que o usuário falha um dia, é comum ocorrer a quebra de ritmo e a desistência, e ferramentas tradicionais de "To-Do List" não oferecem estímulos imediatos para manter o engajamento.
O NextLevel pretende resolver a falta de motivação de curto prazo inserindo mecânicas de jogos no rastreamento de tarefas reais.

## Objetivo

Permitir que o usuário registre, gerencie e acompanhe a execução de seus hábitos diários, sendo recompensado visualmente através de pontos de experiência (XP) e níveis.
O sistema também deverá penalizar inatividades quebrando "ofensivas" (streaks), criando um senso de urgência e consistência.

*O NextLevel é uma ferramenta de produtividade pessoal e organização. Seus níveis e pontuações são puramente virtuais e motivacionais.*

## Principais funcionalidades

**Hábitos**
* Cadastro de novos hábitos (nome, frequência, dificuldade);
* Edição de hábitos existentes;
* Exclusão ou arquivamento de hábitos;
* Filtros por categoria ou turno (manhã, tarde, noite).

**Check-ins (Execução)**
* Marcação de hábito concluído no dia;
* Desmarcar hábito concluído (desfazer);
* Consulta do histórico de dias anteriores.

**Gamificação e Dashboard**
* Cálculo e atribuição de XP baseado na dificuldade do hábito;
* Evolução de Nível (Level Up) ao atingir o teto de XP;
* Cálculo de Ofensiva (Streak) em dias consecutivos;
* Resete automático de Ofensiva (via rotina no servidor) caso o hábito não seja cumprido.

## Domínio

Os principais conceitos do sistema são:

```text
Usuário
   │
   └── possui
          │
          ▼
       Perfil (Nível e XP)

Usuário
   │
   └── gerencia
          │
          ▼
       Hábitos
          │
          └── geram
                 │
                 ▼
              Histórico (Check-ins)
```

## Entidades principais

* **Usuário** — pessoa que utiliza o sistema.
* **Perfil** — estado atual de gamificação do usuário (XP total, Nível atual).
* **Hábito** — rotina a ser acompanhada (ex: "Beber água", "Estudar 1h").
* **Check-in** — registro de que um hábito foi concluído em uma data específica.

## Tecnologias

**Front-end**
Tecnologias inicialmente previstas:
* HTML5;
* CSS3;
* JavaScript;
* React.

**Back-end**
Tecnologias inicialmente previstas:
* Node.js;
* Express;
* JavaScript/TypeScript;
* API REST;
* JSON;
* Ferramenta de Cron/Agendamento de tarefas.

**Banco de dados**
Será utilizado um banco de dados relacional. A tecnologia específica será definida durante a implementação.

## Arquitetura inicial

A visão inicial da aplicação é:

```text
┌─────────────────────┐
│      Front-end      │
│                     │
│ React / HTML / CSS  │
└──────────┬──────────┘
           │
           │ HTTP / JSON
           ▼
┌─────────────────────┐
│       API REST      │
│                     │
│ Node.js / Express   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Regras de negócio │
│                     │
│ Hábitos             │
│ Gamificação (XP)    │
│ Rotinas (Cron)      │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│    Banco de dados   │
└─────────────────────┘
```

A arquitetura será refinada conforme o projeto evoluir.

## Estrutura prevista do projeto

A estrutura poderá evoluir ao longo das etapas. Inicialmente, será adotada uma organização semelhante a:

```text
uplife/
│
├── docs/
│   ├── proposta.md
│   └── diagrama-inicial.*
│
├── client/
│
├── server/
│
├── README.md
│
└── .gitignore
```

A estrutura definitiva será definida conforme as tecnologias e decisões arquiteturais adotadas durante o desenvolvimento.

## Escopo inicial

**Incluído**
* cadastro de usuários;
* CRUD (Criar, Ler, Atualizar, Deletar) de hábitos;
* registro diário de conclusão (check-in);
* cálculo de ganho de XP e subida de nível;
* cálculo de ofensivas (streaks) e dias consecutivos;
* visualização do painel de progresso (dashboard);
* rotina de background (cron job) para validar perdas de ofensiva.

**Não incluído inicialmente**
* elementos sociais (adicionar amigos, feed de atividades);
* multiplayer ou guildas;
* recompensas financeiras ou moedas virtuais complexas (loja de itens);
* árvore de habilidades complexa (skill trees);
* aplicativos nativos para Android/iOS.

## Desenvolvimento por etapas

O projeto será desenvolvido incrementalmente.

| Etapa | Objetivo |
| :--- | :--- |
| 01 | Proposta e especificação |
| 02 | Protótipo estrutural com HTML semântico |
| 03 | Interface responsiva com CSS |
| 04 | Interatividade com JavaScript |
| 05 | Modularização e comunicação assíncrona |
| 06 | API REST |
| 07 | Persistência e CRUD com banco de dados |
| 08 | Organização arquitetural |
| 09 | Aplicação com framework front-end (React) |
| 10 | Qualidade, versionamento e release candidate |

Cada etapa deverá representar uma evolução do mesmo projeto.

## Versionamento

O projeto utilizará Git durante todo o desenvolvimento.
As versões das etapas serão identificadas preferencialmente por tags:
* `etapa-01`
* `etapa-02`
* `etapa-03`
* `etapa-04`
* `etapa-05`
* `etapa-06`
* `etapa-07`
* `etapa-08`
* `etapa-09`
* `etapa-10`
* `final`

## Documentação

A documentação do projeto será mantida no diretório: `/docs`

A documentação inicial inclui: `/docs/proposta.md`

Novos documentos serão adicionados conforme as etapas do projeto forem concluídas.

## Execução

As instruções de instalação e execução serão adicionadas e atualizadas conforme as tecnologias forem implementadas.

A versão inicial do projeto ainda não possui uma aplicação executável completa. Quando o front-end e o back-end forem implementados, esta seção deverá conter:
* pré-requisitos;
* instalação das dependências;
* configuração das variáveis de ambiente;
* configuração do banco de dados;
* inicialização do servidor;
* inicialização do cliente;
* instruções para utilização da aplicação.

## Testes

Os procedimentos e evidências de testes serão documentados conforme as funcionalidades forem implementadas.
A aplicação deverá evoluir para possuir mecanismos que permitam verificar principalmente:
* validação de formulários;
* cálculo correto de XP e limites de nível;
* execução correta das rotinas diárias (resete de dias);
* operações da API;
* persistência de dados;
* integração entre front-end e back-end.

## Decisões e limitações

Algumas decisões ainda serão tomadas durante o desenvolvimento, incluindo:
* tecnologia específica do banco de dados relacional;
* ferramenta de agendamento de tarefas no servidor (ex: node-cron);
* lógica matemática exata da curva de XP por nível;
* mecanismo de autenticação;
* arquitetura definitiva do servidor.

Essas decisões deverão ser registradas na documentação do projeto conforme forem tomadas.

## Responsabilidade sobre as informações

O NextLevel tem finalidade exclusivamente educacional. Os dados gerados e a mecânica de pontuação são lúdicos e não refletem avaliações profissionais de saúde mental ou produtividade do usuário.

## Licença

A licença do projeto será definida posteriormente
