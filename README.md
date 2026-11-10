# Site portfólio – Lorran Rodrigues

Portfólio de sistemas web. Em vez de só listar projetos, cada um aparece como uma
**miniatura viva** do sistema funcionando: agenda de barbearia recebendo clientes, relatório técnico
sendo assinado, checklist de PMOC, kanban de CRM, estoque de EPI, gráfico de mercado e um smartwatch com a hora real.

O destaque é o **Workito**, um CRM SaaS multiempresa em Next.js e PostgreSQL, que aparece logo no topo com um mini funil animado e os módulos do MVP (funil, leads, comunicação, propostas, atividades, dashboard, planilhas e, em breve, análise de documentos e de feedback). Ao clicar em um projeto,
uma **gravação da tela real** mostra o sistema por dentro (WebP animado, leve como um GIF).

**Site:** https://lorranbrs.github.io/site-portfolio/

## Destaques técnicos

- HTML, CSS e JavaScript puros, sem framework e sem build.
- Nome no topo com fonte variável (Bricolage Grotesque) reagindo à posição do mouse.
- Canvas 2D de "pixels" com DPR limitado e pausa quando sai da tela.
- Animações só com `transform` e `opacity`, ligadas por `IntersectionObserver`.
- Prévias gravadas com Playwright e convertidas para WebP animado com ffmpeg, carregadas sob demanda.
- Painel de detalhes com `<dialog>` nativo, foco gerenciado e fechamento por Esc ou clique fora.
- Responsivo até 320px, foco de teclado visível e respeito a `prefers-reduced-motion`.

## Rodar localmente

```bash
python3 -m http.server 8765
```

Depois abra http://localhost:8765.

## Estrutura

- `index.html` – página
- `css/style.css` – estilos e animações
- `js/main.js` – interações
- `assets/previas/` – gravações animadas de cada sistema
- `Memoria/` – diário escrito do projeto, passo a passo (um arquivo por modificação)
