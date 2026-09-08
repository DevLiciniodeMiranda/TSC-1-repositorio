Etapa 03: Estilização Avançada e Layout Responsivo (NextLevel)
1. Concepção Visual e Tema (Dark RPG)
O projeto adotou uma estética "Dark RPG" para maximizar a imersão do usuário. A paleta de cores foi estruturada através de variáveis CSS no :root, garantindo consistência em todas as páginas e facilitando futuras manutenções:

Fundo Geral (--bg-fundo): Azul muito escuro (#0f172a), simulando o ambiente noturno/sombrio comum em interfaces de jogos.

Painéis e Cards (--bg-painel): Tom levemente mais claro (#1e293b) para destacar seções interativas (inventário, atributos, formulários) sobre o fundo base.

Destaque e Ação (--cor-destaque): Roxo vibrante (#8b5cf6) utilizado em botões, bordas indicativas e elementos de interação principal.

2. Estruturação Flexbox (Navegação)
O Flexbox foi a tecnologia escolhida para o cabeçalho (<header>) e para o menu de navegação (<nav>).

Utilizou-se display: flex alinhado com justify-content: space-between para afastar a logo do menu principal.

Os botões do menu ganharam comportamento flexível com flex-wrap: wrap, permitindo que os itens pulem para a linha de baixo naturalmente quando o espaço lateral da tela acaba.

Usabilidade (UX): Foi implementada a classe lógica .ativo, que altera a cor de fundo do botão no menu (de roxo escuro para roxo claro) dependendo da página em que o usuário está, criando a sensação de um "HUD" (Heads-up Display) de jogos.

3. CSS Grid (Arquitetura de Conteúdo)
O conteúdo principal (<main>) de páginas compostas, como o Dashboard e a Taverna, foi estruturado com CSS Grid.

O layout padrão divide a tela em duas colunas principais (grid-template-columns: 1fr 2fr), reservando a área menor para resumos (perfil/status) e a maior para conteúdo denso (histórico, formulários ou listas).

Telas de foco único, como Formulários de Criação, receberam um tratamento específico com restrição de largura (max-width: 600px; margin: 0 auto;) para não esticarem os campos de input desproporcionalmente em monitores Ultrawide.

4. Comportamento Responsivo (Media Queries)
O layout adapta-se de forma fluida utilizando Media Queries em dois breakpoints estratégicos:

Tablet (768px): O CSS Grid anula a divisão de colunas e passa a empilhar os blocos verticalmente (grid-template-columns: 1fr). O menu flexível se ajusta ao centro para facilitar o toque.

Smartphone (390px): O espaçamento interno dos painéis (padding) é reduzido para aproveitar a área útil da tela. A direção do Flexbox no menu passa a ser em coluna, criando botões empilhados de fácil acesso para o polegar.