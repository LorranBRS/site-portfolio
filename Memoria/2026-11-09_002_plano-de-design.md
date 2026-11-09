# 002 – Plano de design (antes de escrever codigo)

## Ideia central

O portfolio nao *fala* que eu faco sistemas: ele **mostra** sistemas funcionando.
Cada projeto aparece como uma mini-interface viva, feita em HTML/CSS/JS puro
(agenda sendo preenchida, checklist marcando, kanban andando, grafico desenhando, relogio girando).

## Cores (tokens em `css/style.css`)

| Nome | Hex | Uso |
|---|---|---|
| Cobalto | `#2B3BFF` | Fundo do topo (heroi) |
| Tinta | `#0B1240` | Texto e secao "como eu trabalho" |
| Papel | `#F4F6FF` | Fundo claro azulado |
| Girassol | `#FFD23F` | Destaque e secao de contato (homenagem ao "display amarelo" do ESP32) |
| Coral | `#FF5D73` | Alertas e detalhes |
| Menta | `#2EE6A8` | Sucesso / status ok |

## Tipografia

- **Bricolage Grotesque** (fonte variavel: peso e largura) – titulos. O nome no topo reage ao mouse
  mudando o peso de cada letra: a tipografia e o elemento ousado da pagina.
- **Figtree** – textos corridos.

## Layout

```
[ topo cobalto: canvas de pixels + NOME GIGANTE reativo + frase + botoes ]
[ papel: projetos em grade de tamanhos variados, cada um com mini-interface viva ]
[ tinta: como eu trabalho – 4 etapas reais, linha que se desenha com a rolagem ]
[ papel: ferramentas agrupadas (web, dados, hardware) ]
[ girassol: contato com frase grande ]
```

Tudo alinhado a esquerda. Numeracao so na secao de processo (que e mesmo uma sequencia).

## Revisao contra o briefing (o que mudei)

- Primeira ideia: fundo escuro com um destaque neon → e um dos visuais genericos citados pela skill.
  Troquei por blocos inteiros de cor (cobalto, tinta, girassol), que atendem o pedido de "coloracao".
- Primeira ideia: cards iguais com sombra cinza → troquei por grade com tamanhos diferentes e
  uma cor de fundo propria por projeto.
- Evitei numeros gigantes de estatistica ("+50 projetos"), que sao o padrao de portfolio gerado.

## Movimento

- Um unico momento orquestrado no carregamento: as letras do nome sobem em sequencia.
- Mini-interfaces so animam quando estao visiveis (IntersectionObserver) para poupar CPU.
- Clique num projeto abre um painel com detalhes (animacao responde a acao do usuario).
- `prefers-reduced-motion`: tudo aparece no estado final, sem loop.
