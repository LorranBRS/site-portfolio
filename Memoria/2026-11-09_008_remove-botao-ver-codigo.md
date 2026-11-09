# 008 – Remoção do botão "Ver o código"

## Pedido
Tirar o botão "Ver o código" dos painéis de detalhes. A demonstração continua.

## O que mudou
- `js/main.js`: removido o campo `codigo` de todos os projetos e a criação do botão.
  A mensagem de "projeto privado" agora aparece só quando o projeto não tem demo (Workito, Albion, LorranWatch).
- `css/style.css`: removido o estilo `.btn-ghost-ink`, que só esse botão usava.

## Resultado conferido
- Navalha, RelatorioTec, PMOC, CRM Plus e Estoque de EPI: só "Abrir a demo".
- Workito, Albion e LorranWatch: só o aviso de projeto privado.
- Nenhum link para o GitHub dos projetos ficou no painel. O link do perfil (topo e contato) continua.
