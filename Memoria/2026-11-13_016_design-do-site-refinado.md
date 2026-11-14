# 016 · Design do site refinado

Data: 2026-11-13

## Pedido

Depois do perfil do GitHub (015), o usuário pediu a mesma melhoria de design no site.

## O que mudou

- **Títulos**: estavam muito condensados, com letras encostando. Largura da fonte subiu de 78–85 para 88–92 e o espaçamento negativo diminuiu. O nome no topo não mudou.
- **Menu**: logo e links ficam em pílulas escuras translúcidas enquanto estão sobre o topo azul, para não brigar com os pixels do fundo. Ao rolar, volta a barra clara de antes.
- **Topo**: coluna do cartão do Workito mais larga (`clamp(400px, 36vw, 640px)`).
- **Quadro do Workito**: texto e gravação em cima; os 9 módulos do MVP saíram da coluna de texto e ocupam a largura toda embaixo (`.workito-mods`). Entrou a barra de 7 segmentos com 5 acesos (`.workito-fases`).
- **Processo**: cada passo virou cartão; o passo ativo ganha borda amarela.
- **Com o que eu trabalho**: quatro cartões brancos com etiquetas coloridas no lugar das listas com linha.
- **Contato**: duas colunas. À direita, cartão escuro "O que acontece depois" com 3 passos, e pontilhado no fundo.
- **Selo do Sobre mim**: ainda dizia "feito à mão", contra a regra da 011. Agora é "sistemas web · hardware · firmware ·".
- Menos espaço vazio entre Projetos e Sobre, e em Ferramentas.

Todo o CSS novo está num bloco só, "Ajustes de design (Memoria 016)", antes do bloco de movimento reduzido em `css/style.css`.

## Conferido

Playwright em 1920, 1366, 900 e 390 px: sem rolagem horizontal e sem erro no console.
