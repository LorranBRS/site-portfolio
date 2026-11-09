# Site portfólio – Lorran Rodrigues

Portfólio de sistemas web. Em vez de só listar projetos, cada um aparece como uma
**miniatura viva** do sistema funcionando: agenda de barbearia recebendo clientes, relatório técnico
sendo assinado, checklist de PMOC, kanban de CRM, estoque de EPI, gráfico de mercado e um smartwatch com a hora real.

**Site:** https://lorranbrs.github.io/site-portfolio/

## Destaques técnicos

- HTML, CSS e JavaScript puros, sem framework e sem build.
- Nome no topo com fonte variável (Bricolage Grotesque) reagindo à posição do mouse.
- Canvas 2D de "pixels" com DPR limitado e pausa quando sai da tela.
- Animações só com `transform` e `opacity`, ligadas por `IntersectionObserver`.
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
- `Memoria/` – diário escrito do projeto, passo a passo (um arquivo por modificação)
