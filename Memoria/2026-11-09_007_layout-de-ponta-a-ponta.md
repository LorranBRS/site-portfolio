# 007 – Layout de ponta a ponta e agenda compacta

## Pedido

Na versão web (tela de computador) o site estava "esquisito": tudo centralizado numa coluna estreita e
o quadro da agenda (Navalha) muito comprido. Fazer as telas chegarem até as bordas.

## Diagnóstico (capturas em 1440 e 1920 px)

- `.work` e `.tools` tinham `max-width: 1440px`, `.process` 1280 px, `.hero-inner` 1280 px, `.contact` 1100 px.
  Em 1920 px, a grade ficava com 1328 px e quase 300 px vazios de cada lado.
- A agenda tinha 3 barbeiros × 6 horários com poucos agendamentos: uma faixa larga de horários vazios.
- O gráfico do Albion começava invisível (só aparecia no meio da animação), então o quadro parecia vazio.
- O título da seção de processo tinha um recuo calculado para centralizar.

## O que mudou

| Item | Antes | Depois |
|---|---|---|
| Largura das seções | limitada (1100–1440 px) | tela inteira |
| Margem lateral (`--gutter`) | até 56 px | `clamp(16px, 2.4vw, 40px)` |
| Grade de projetos | 6 colunas | 12 colunas: Workito inteiro; Navalha 6 + RelatorioTec 3 + PMOC 3; CRM 4 + EPI 4 + LorranWatch 4; Albion inteiro |
| Agenda | 3 barbeiros, 6 horários, 7 marcados | 4 barbeiros, 5 horários, 9 marcados, linhas mais baixas e painel lateral com clientes do dia, faturamento previsto e próximo cliente (atualiza a cada agendamento) |
| Albion | quadro de meia largura, gráfico sumindo | faixa larga: texto à esquerda, gráfico esticado à direita, revelado da esquerda para a direita (`clip-path`) e sempre visível |
| Ordem no HTML | ... EPI, Albion, Watch | ... EPI, Watch, Albion |

Responsivo:
- até 1280 px: Navalha ocupa a linha toda; RelatorioTec e PMOC dividem a linha.
- até 1080 px: grade de 2 colunas (Albion volta a ser vertical).
- até 760 px: 1 coluna; o resumo da agenda vira 3 blocos lado a lado abaixo da grade.

## Verificação

Playwright em 1920, 1366, 900 e 390 px: sem rolagem lateral, títulos alinhados na mesma borda (40 px em 1920),
sem erros no console.
