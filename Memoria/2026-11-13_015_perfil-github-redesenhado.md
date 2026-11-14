# 015 · Perfil do GitHub redesenhado

Data: 2026-11-13

## Pedido

"Dá uma melhorada no design" (do perfil do GitHub, publicado na 014).

## O que mudou

- **Banner**: no lugar das etiquetas soltas, uma janela de sistema inclinada (menu, 3 indicadores, gráfico de barras que cresce, lista que vai marcando) com adesivos ESP32, Next.js e PostgreSQL. Abaixo do nome, a frase "Faço ..." troca a cada 2,4 s, igual ao topo do site.
- **Botões**: os selos do shields.io saíram. Agora são dois SVGs próprios (`btn-portfolio.svg`, `btn-demos.svg`).
- **Números**: três cartões de cor cheia (cobalto, tinta, coral). Antes eram claros e sumiam no tema escuro.
- **Workito**: progresso em 7 segmentos (5 acesos), funil com cartões em cada coluna e contagem, módulos separados em "No MVP" e "Em breve". A tabela Pronto/Em breve do README saiu, porque o cartão já mostra.
- **Tecnologias**: `stack.svg` com três grupos (Web, Dados e infra, Hardware) no lugar da fileira de selos.
- **Chamada final**: `cta.svg` amarelo com botão "Falar comigo", apontando para `#contato` do site.
- Texto de apresentação centralizado; títulos dos projetos mais curtos, com o tipo de sistema em negrito na descrição.

## Como alterar

Os SVGs agora são gerados por `tools/gerar.py` no repositório `LorranBRS/LorranBRS` (pasta `/media/lobao/SSD/LorranBRS-perfil/`). Mudar textos, números ou cores ali e rodar `python3 tools/gerar.py`. Não editar os SVGs à mão.

## Conferido

Render local em fundo claro e escuro e página publicada em github.com/LorranBRS: as 12 imagens carregaram. Commit `75dc679` no repositório do perfil.

## Continua pendente

Bio e link do perfil, fixar repositórios, decisão sobre "Oliveira Montagem" na descrição do repositório de EPI, link do LinkedIn.
