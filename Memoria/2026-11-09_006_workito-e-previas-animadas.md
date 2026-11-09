# 006 – Workito em destaque e prévias animadas "por dentro"

## Pedido

1. Incluir o **Workito** (o grande projeto, que faltava; só aparecia o CRM Plus).
2. Mostrar como cada sistema é **por dentro**, como um GIF leve (nada de vídeo pesado).

## O que foi feito

### Workito
- Projeto local em `/media/lobao/SSD/Workito` (sem repositório no GitHub): CRM SaaS multiempresa,
  Next.js 16 + React 19 + TypeScript + PostgreSQL + Prisma + Better Auth + Docker. Fases 1 a 5 de 7 prontas.
- Virou o **primeiro quadro, largura total**, em verde-petróleo (`#0B3B40`, cor da identidade do Workito),
  com selo "Em desenvolvimento, 5 de 7 fases prontas", funções principais, tecnologias e a gravação ao lado.
- No painel de detalhes: aviso de projeto privado em vez de link.

### Prévias gravadas da tela real
Pasta `assets/previas/`: um `.webp` animado por sistema + um `-parado.webp` (primeiro quadro).

| Sistema | Origem da gravação | O que mostra | Tamanho |
|---|---|---|---|
| Workito | local (`npm run dev` na porta 3000, banco Docker, usuário demo) | dashboard, filtro 90 dias, arrastar cartão no funil, clientes, propostas, relatórios | 1,2 MB |
| Navalha | demo pública | agenda do dia, semana, novo agendamento, recepção, configurações | 264 KB |
| CRM Plus | demo pública | entrar na demonstração, painel, leads, simulador, financeiro, agenda | 540 KB |
| Estoque EPI | demo pública | estoque do mês, movimentações, cadastro, planilhas | 636 KB |
| RelatorioTec | demo pública | preenchendo cliente e equipamento, evidências, medições, assinatura | 172 KB |
| PMOC | demo pública | novo PMOC, 6 etapas incluindo o checklist | 208 KB |

Albion e LorranWatch ficaram sem gravação (privado / hardware): o painel esconde a moldura.

### Como as gravações foram feitas (para refazer depois)
1. Playwright + Chromium instalados numa pasta temporária (não ficam no projeto).
2. Script `gravar.mjs` com um roteiro por sistema: cursor falso desenhado na página, movimento suave
   do mouse, digitação letra a letra, rolagem animada, círculo amarelo a cada clique.
   Grava em vídeo `.webm` 1280x800.
3. Conversão com ffmpeg para WebP animado (12 quadros/s, 760 px; Workito 900 px, qualidade 62):
   `ffmpeg -ss <corte> -i x.webm -vf "fps=12,scale=760:-1:flags=lanczos" -c:v libwebp_anim -q:v 62 -loop 0 x.webp`
4. WebP animado em vez de GIF: mesma ideia (imagem que se mexe sozinha, sem player), mas 3 a 5x menor e com cores reais.

### Detalhes técnicos
- No quadro, a imagem tem `loading="lazy"`: só baixa quando chega perto da tela.
- No painel, a gravação só é carregada quando o painel abre e é descarregada ao fechar.
- `<picture>` com `prefers-reduced-motion`: quem desativa animações vê a imagem parada.
- O selo dos quadros com gravação diz "Ver por dentro" em vez de "Ver detalhes".

## Problemas no caminho
- Login do Workito recusado na porta 3311: o Better Auth só aceita a origem do `BETTER_AUTH_URL`
  (`localhost:3000`). Solução: rodar na 3000.
- Modo dev do Next mostrava esqueleto de carregamento: as páginas são abertas uma vez antes de gravar.
- Arrastar no funil não pegava ao segurar o título (é link): usar a alça `aria-label="Arrastar <nome>"`.
- Botões Dia/Semana da barbearia não eram achados pelo texto: clique por coordenada.
- A roda do mouse virtual não rolava o dashboard: rolagem feita por script no elemento rolável.

## Efeito colateral
No banco local de desenvolvimento do Workito, o "Negócio Demo 16" foi movido de "Novo contato" para
"Primeiro atendimento" pela gravação (dado de demonstração descartável). O banco e o servidor foram desligados no fim.
