# 003 – Construção do site e testes

## Arquivos criados

| Arquivo | O que tem |
|---|---|
| `index.html` | Estrutura: topo, herói, projetos, processo, ferramentas, contato, painel de detalhes (`<dialog>`) |
| `css/style.css` | Tokens de cor/tipo, layout, todas as animações das miniaturas, responsivo e reduced motion |
| `js/main.js` | Nome reativo ao mouse, canvas de pixels, agenda da barbearia, preço do Albion, relógio real, linha do processo, painel de detalhes |
| `.claude/launch.json` | Servidor local para testar (`python3 -m http.server 8765`) |

## Passo a passo do que foi feito

1. **Herói**: o nome é quebrado em letras (`<span class="ch">`). O JS mede a distância do mouse
   até cada letra e muda `font-variation-settings` (peso 300→800, largura 85→100) com suavização.
   No celular (sem mouse) o nome fica fixo e maior (`26vw`).
2. **Canvas de pixels**: grade de quadradinhos com onda suave; perto do mouse viram amarelos e se afastam
   (efeito lupa); de vez em quando um "pixel" acende sozinho, como um display ligando.
   Só desenha quando o topo está visível e a aba ativa.
3. **Miniaturas vivas** (uma por projeto): agenda que recebe agendamentos com aviso, relatório que se
   escreve e é assinado, checklist do PMOC com anel de progresso, card andando no kanban do CRM,
   barras do estoque com alerta de reposição, gráfico de preço desenhando, relógio com a hora real.
   Um `IntersectionObserver` liga/desliga cada uma quando entra/sai da tela.
4. **Painel de detalhes**: clicar num projeto abre um `<dialog>` com problema, funções, tecnologias e
   links da demo/código. Os textos foram tirados dos READMEs reais de cada repositório.
   Projetos privados (Navalha código, Albion, LorranWatch) mostram aviso em vez de link.
5. **Processo**: linha amarela que cresce com a rolagem e acende cada etapa.

## Bugs encontrados nos testes (e correções)

| Problema | Causa | Correção |
|---|---|---|
| Agendamentos novos ficavam meio transparentes | A regra que pausa animações fora da tela pegava também os chips | `.mini *:not(.chip)` |
| Selo "Ver detalhes" cobria o contador da agenda | Estava no canto superior | Movido para o canto inferior |
| Linha do gráfico do Albion invisível | `pathLength` + `vector-effect` não combinam no Chrome, e a opacidade só estava no último keyframe (sumia aos poucos) | Removido `vector-effect`; opacidade definida em todos os keyframes (também na assinatura e nas linhas do relatório) |
| Preço do Albion apagado | Seletor `span:first-child` pegava o número | Trocado para `> span:first-child` |
| Nome pequeno no celular | `15.5vw` deixava metade da largura vazia | `26vw` abaixo de 760px |
| Nomes repetidos na agenda | Sorteio sem controle | Sorteia só entre clientes ainda não usados |

Conferido também: sem erros no console, sem rolagem horizontal em 375px, painel abre e fecha,
foco volta ao projeto ao fechar.

## Observação

O contato aponta para o GitHub. Não coloquei e-mail nem WhatsApp para não publicar dados pessoais
sem confirmação: para adicionar, editar a seção `#contato` em `index.html`.
