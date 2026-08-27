# NextLevel — Gestão de Hábitos e Produtividade Gamificada

## 1. Proposta

O **NextLevel** é uma aplicação Web destinada ao gerenciamento de rotinas diárias e construção de hábitos através de mecânicas de gamificação.

A aplicação permitirá que o usuário registre seus objetivos diários e acompanhe, de forma lúdica e visual, a sua evolução pessoal simulando a progressão de um personagem em um jogo de RPG (ganho de experiência, níveis e ofensivas).

Além do registro de tarefas concluídas, o sistema disponibilizará um painel de progresso calculando os dias consecutivos de sucesso (streaks) e aplicando penalidades em caso de falha, criando um senso de compromisso para o investimento do seu próprio tempo.

A aplicação terá como foco a **organização e motivação pessoal do usuário**, não tendo como objetivo substituir acompanhamento psicológico profissional, terapias comportamentais ou ferramentas corporativas de gestão de tarefas.

---

## 2. Problema

Pessoas que buscam melhorar a qualidade de vida adotando novos hábitos (como estudar diariamente, praticar exercícios ou ler) frequentemente esbarram na falta de recompensa imediata. O benefício real dessas ações costuma ser de longo prazo.

Com a ausência de estímulos de curto prazo, torna-se comum:

- a quebra de ritmo e consistência;
- a desmotivação após falhar um único dia;
- a perda da noção do quanto já foi progredido;
- o abandono de listas de tarefas tradicionais, que muitas vezes geram mais ansiedade do que engajamento.

Essas informações de progresso acabam se perdendo em agendas físicas ou aplicativos genéricos que não motivam o usuário.

O NextLevel pretende resolver esse problema centralizando a rotina do usuário e inserindo uma camada de jogo (gamificação) sobre tarefas reais, transformando a disciplina em algo visualmente recompensador.

---

## 3. Público-alvo

O público-alvo são jovens, prioritariamente na faixa etária entre **16 a 30 anos**, que buscam melhorar sua qualidade de vida, desempenho nos estudos ou projetos pessoais.

A aplicação será especialmente útil para estudantes, desenvolvedores e jovens adultos que já possuem familiaridade com dinâmicas de jogos (RPG, progressão de níveis) e desejam aplicar essa mesma lógica de recompensa no mundo real para se manterem motivados.

---

## 4. Objetivo

### 4.1 Objetivo principal

Desenvolver uma aplicação Web que permita ao usuário registrar e gerenciar seus hábitos diários, sendo recompensado visualmente através de pontos de experiência (XP) e evolução de níveis a cada tarefa concluída.

### 4.2 Objetivos secundários

A aplicação deverá:

- manter o histórico de dias que os hábitos foram realizados (check-ins);
- calcular informações consolidadas de progressão (XP total e Nível atual);
- contabilizar dias consecutivos de sucesso (ofensivas / streaks);
- executar rotinas autônomas no servidor para penalizar (zerar ofensivas) usuários que não cumprirem as tarefas do dia;
- disponibilizar painéis e gráficos para facilitar a análise da própria consistência.

---

## 5. Funcionalidades

A aplicação deverá possuir inicialmente as seguintes funcionalidades:

### 5.1 Cadastro e gestão de hábitos

Manter informações das rotinas que o usuário deseja acompanhar.

Cada hábito deverá possuir inicialmente:

- nome (ex: "Beber 2L de Água", "Estudar Programação");
- frequência (diária, semanal ou dias específicos);
- dificuldade (fácil, médio, difícil — que dita a quantidade de XP gerada);
- situação (ativo, arquivado).

### 5.2 Registro de execução (Check-in)

Permitir a marcação de que um hábito foi concluído em um determinado dia.

O check-in disparará:

- ganho de XP;
- incremento da ofensiva (streak);
- validação de subida de nível (Level Up).

### 5.3 Consulta de histórico

Permitir consultar os dias anteriores e o desempenho em cada hábito, apresentando as datas em que houve check-in.

### 5.4 Consolidação da Gamificação

Calcular o estado atual do perfil do usuário a partir das ações registradas. 

Para cada perfil deverão ser apresentadas informações como:

- nível atual;
- barra de progresso (XP atual e XP necessária para o próximo nível);
- ofensiva atual global.

### 5.5 Dashboard

Disponibilizar uma visão geral do dia contendo informações como:

- hábitos pendentes para o dia de hoje;
- hábitos já concluídos hoje;
- resumo do perfil e conquistas recentes.

### 5.6 Relatórios e indicadores

Disponibilizar métricas baseadas na consistência do usuário.

Entre os relatórios previstos estão:

- taxa de sucesso semanal e mensal;
- histórico de evolução de níveis;
- mapa de calor (heatmap) de check-ins (estilo contribuições do GitHub).

### 5.7 Validação Autônoma de Dias (Cron Job)

A aplicação possuirá uma rotina de verificação no servidor (independente da ação direta do usuário) que deverá:

- identificar a virada do dia (meia-noite);
- verificar quais usuários não completaram seus hábitos ativos;
- quebrar a ofensiva (zerar o contador de dias seguidos) de quem falhou, gerando um alerta de perda de combo.

---

## 6. Entidades e conceitos do domínio

### 6.1 Usuário

Pessoa que utiliza a aplicação para registrar sua rotina e progresso.

Um usuário poderá possuir diversos hábitos e um perfil de gamificação atrelado.

### 6.2 Perfil (Status)

Situação consolidada de gamificação do usuário. Contém o Nível atual e a XP acumulada derivada dos check-ins.

### 6.3 Hábito

A rotina em si que precisa ser acompanhada e executada de forma recorrente (ex: ações diárias).

### 6.4 Check-in (Histórico)

Registro imutável gerado quando o usuário marca um hábito como concluído em uma data específica. O conjunto de check-ins forma o histórico de consistência.

---

## 7. Interfaces previstas

### 7.1 Dashboard Principal

Tela inicial após o acesso do usuário.

Apresentará:

- cabeçalho com Nível e barra de XP;
- lista interativa de hábitos do dia (para marcar/desmarcar);
- indicador de ofensiva atual (streak flame).

### 7.2 Gerenciamento de Hábitos

Tela destinada à criação, edição e exclusão das rotinas.

Campos previstos:

- nome do hábito;
- frequência;
- nível de dificuldade.

### 7.3 Relatórios de Desempenho

Tela destinada à apresentação de gráficos de consistência, taxa de acertos e histórico de evolução de níveis.

---

## 8. Operações previstas

As principais operações da aplicação serão:

1. Cadastrar um novo usuário e iniciar o Perfil no Nível 1.
2. Criar um novo Hábito.
3. Editar ou excluir um Hábito existente.
4. Marcar um hábito como concluído no dia (gera Check-in e adiciona XP).
5. Desmarcar um hábito concluído (remove Check-in e reverte XP/nível se necessário).
6. Consultar o histórico de check-ins.
7. Execução de rotina de background (Varredura noturna para quebrar ofensivas).

A inclusão ou exclusão de um check-in deverá refletir imediatamente na consolidação da gamificação do usuário.

---

## 9. Tecnologias pretendidas

### 9.1 Cliente

Tecnologias inicialmente previstas:

- HTML5;
- CSS3;
- JavaScript;
- React.

A escolha poderá ser alterada durante o desenvolvimento.

### 9.2 Servidor

Tecnologias inicialmente previstas:

- Node.js;
- Express;
- JavaScript ou TypeScript;
- API REST;
- JSON;
- Ferramenta de Cron/Agendamento de tarefas (ex: node-cron).

### 9.3 Persistência

Será utilizado um banco de dados para armazenamento persistente das informações.

A princípio será utilizado um **banco de dados relacional**, cuja tecnologia específica será definida durante a implementação.

A escolha deverá considerar principalmente os relacionamentos entre:

- usuários;
- perfis;
- hábitos;
- histórico (check-ins).

---

## 10. Diagrama inicial

```text
┌──────────────────────┐
│       USUÁRIO        │
│                      │
│ Visualiza metas      │
│ Realiza check-ins    │
│ Acompanha níveis     │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│    FRONT-END WEB     │
│                      │
│ Dashboard (Hoje)     │
│ Gestão de Hábitos    │
│ Gráficos de Perfil   │
└──────────┬───────────┘
           │
           │ HTTP / JSON
           ▼
┌──────────────────────┐
│       API REST       │
│                      │
│ Auth / Usuários      │
│ Hábitos CRUD         │
│ Histórico / Check-in │
│ Gamificação (XP)     │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  REGRAS DE NEGÓCIO   │
│                      │
│ Cálculo de Nível     │
│ Lógica de Ofensiva   │
│ Cron Job (Meia-noite)│
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│    BANCO DE DADOS    │
│                      │
│ Usuários / Perfis    │
│ Hábitos              │
│ Histórico Diário     │
└──────────────────────┘