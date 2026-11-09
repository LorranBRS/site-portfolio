# 009 – Sobre mim, prévia de compartilhamento e contato

## Pedido

Lista de melhorias sugeridas; o usuário escolheu as três primeiras:
1. Prévia do link ao compartilhar (Open Graph).
2. Seção "Sobre mim".
3. Contato além do GitHub. Escolha: **LinkedIn** (o link será enviado depois).

O texto do "Sobre mim" foi escrito por mim, só com o que já está no site (sem inventar cidade, formação ou emprego).

## O que mudou

### Prévia de compartilhamento
- `assets/og.png` (1200x630, 219 KB): fundo cobalto com grade de pixels, nome grande, frase do herói,
  selo "8 projetos funcionando por dentro" e o quadro parado do Workito inclinado.
- Gerada com Playwright a partir de um HTML na pasta temporária (`og.html` + `og.mjs`, ao lado do `gravar.mjs`).
- Tags no `<head>`: `canonical`, `og:*` (tipo, idioma pt_BR, título, descrição, url, imagem com tamanho e texto alternativo)
  e `twitter:*` com `summary_large_image`. A imagem usa endereço absoluto do GitHub Pages.
- Observação: WhatsApp e LinkedIn guardam a prévia em cache. Se o link já foi compartilhado antes,
  a imagem nova pode demorar a aparecer (no LinkedIn dá para forçar no Post Inspector).

### Seção "Sobre mim" (`#sobre`, entre Projetos e Processo)
- Fundo coral, título "Escrevo código para quem trabalha longe do escritório." com grifo amarelo que se desenha ao aparecer.
- Selo circular girando ("sistemas web · hardware · feito à mão") com a marca no centro.
- Três parágrafos + bloco "Agora" (Workito, 5 de 7 fases).
- Quatro números que contam ao aparecer: 8 sistemas, 5 demos no ar, 2 mundos (web e ESP32), 0 frameworks neste site.
- Link "Sobre" no menu. No celular o menu mostra Projetos, Sobre e Contato (Processo some).
- Movimento reduzido: selo parado, números já visíveis.

### Contato
- Texto passou a "Me chama e conta o problema".
- Botões em `.contact-actions`. O botão **"Conectar no LinkedIn"** já existe no HTML (`#contato-linkedin`),
  mas está com `hidden` e `href="#"`. Para ligar: trocar o `href` pelo link do perfil e apagar `hidden`.
- Regra global `[hidden] { display: none !important; }` (o `.btn` usa `display: inline-flex` e anulava o `hidden`).

## Verificação

Playwright em 1920, 1366, 900 e 390 px: sem rolagem lateral, sem erros no console, números chegando a 8, 5, 2 e 0,
botão do LinkedIn escondido.

## Pendente

- Link do LinkedIn (o usuário vai mandar).
