# 010 – Topo mais animado e Workito em destaque com os módulos do MVP

## Pedido
Mais animações na parte de cima, ênfase no Workito (o CRM em construção) e mostrar o que vem no MVP:
análise de documentos, análise de feedback, propostas, atividades, funil de vendas, leads, comunicação,
planilhas e dashboard.

## Antes de começar: git local corrompido
`git status` falhava com "object file ... is empty" (11 objetos vazios, provável desligamento brusco do SSD).
O GitHub já tinha o último commit (4d62cdc, seção Sobre mim). Conserto:
1. Backup da pasta `.git` no scratchpad.
2. Apagar só os objetos vazios: `find .git/objects -type f -empty -delete`.
3. `git fetch origin` trouxe os objetos de volta; `git fsck` limpo, nenhum arquivo do site perdido.

## O que mudou no topo
- **Cartão "Em destaque" do Workito** ao lado do nome (abaixo dele em telas até 1180 px):
  borda em gradiente girando, mini funil com um cartão de R$ 12.400 indo de Lead até Ganho,
  os 9 módulos do MVP acendendo um a um e barra de progresso de 5 de 7 fases. Clicar leva ao quadro do Workito.
- **Palavra que troca** na linha de cima: CRM e funil de vendas, dashboards, agenda online, relatório com assinatura, firmware.
  Leitores de tela recebem a frase inteira (texto `sr-only`).
- **Entrada em sequência** da linha de cima, do texto e do cartão depois das letras do nome.
- **Faixa amarela rolando** no pé do topo com os módulos do MVP.
- Texto do topo agora termina em "um CRM completo para equipes de vendas".
- A dica vertical "Passe o mouse no nome" foi escondida (o cartão ocupa a lateral).

## Quadro do Workito
A lista de 4 itens virou "O que vem no MVP", 9 módulos, com status tirado do roadmap do próprio Workito
(`/media/lobao/SSD/Workito/memoria/ROADMAP.md` e `FUNCIONALIDADES.md`):

| Módulo | Situação |
|---|---|
| Funil de vendas, Leads, Comunicação, Propostas, Atividades, Dashboard, Planilhas (importa CSV, exporta CSV/Excel/PDF) | prontos (fases 1 a 5) |
| Análise de documentos, Análise de feedback | "em breve" (fase 6, IA opcional) |

O painel de detalhes do Workito ganhou a mesma lista. No celular a lista vira 2 colunas sem descrição.

## Movimento reduzido
Faixa, funil, borda e troca de palavra ficam parados; o cartão do funil aparece na coluna Proposta.

## Verificação
Playwright em 1920, 1366, 900 e 390 px: topo cabe em 100% da altura no desktop, sem rolagem lateral, sem erros no console.
Scripts de teste agora em `scratchpad/cap/` (o scratchpad antigo foi apagado no reinício).
