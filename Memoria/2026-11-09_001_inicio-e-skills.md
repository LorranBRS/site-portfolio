# 001 – Inicio do projeto e verificacao das skills

**Data:** 2026-11-09

## Pedido

Criar um site portfolio (repositorio `site-portfolio` no GitHub de LorranBRS) que mostre a capacidade
de criar sistemas web. Nada basico: com animacoes, bastante cor e usando as skills que estao na pasta.

## O que havia na pasta

| Pasta | Conteudo |
|---|---|
| `skills-main/` | Repositorio oficial de skills da Anthropic (frontend-design, webapp-testing, theme-factory, algorithmic-art...) |
| `Open Designer/open-design-main.zip` | Projeto OpenDesign (213 MB) com centenas de skills de design e motion |

Essas duas pastas **nao** vao para o GitHub (estao no `.gitignore`), so servem de referencia.

## Skills usadas e o que tirei de cada uma

1. **frontend-design** (`skills-main/skills/frontend-design/SKILL.md`)
   - Fugir dos visuais "genericos de IA": fundo creme + terracota, preto + verde acido,
     cards SaaS todos iguais, rotulos em CAIXA ALTA, seta "→" em todo botao.
   - Fazer primeiro um plano de tokens (cor, tipo, layout, principios) e revisar contra o briefing.
   - Gastar a ousadia em um lugar so; o resto fica disciplinado.
   - Piso de qualidade: responsivo, foco de teclado visivel, `prefers-reduced-motion`.
2. **animate / emilkowalski-motion** (OpenDesign `skills/animate`, `skills/emilkowalski-motion`)
   - Animar so `transform` e `opacity`; nunca `scale(0)` (comecar de 0.96).
   - Curvas: `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` para entradas,
     `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)` para movimento na tela. Nunca `ease-in`.
   - Duracoes de 140-220 ms em controles; reduced motion entra junto com a animacao.
3. **webgl-experience** (OpenDesign `design-templates/webgl-experience`)
   - Ideia de canvas em tela cheia como "heroi" com tipografia por cima, DPR limitado a 2,
     resize correto e fallback se nao houver suporte. Usei a ideia com Canvas 2D (mais leve).
4. **webapp-testing** (`skills-main/skills/webapp-testing`)
   - Testar o site num navegador de verdade antes de entregar (feito no navegador do app).

## Conteudo real usado

Os projetos vieram do GitHub do Lorran (`gh repo list LorranBRS`), com os links das demos no GitHub Pages:
Sistema de Barbearia, RelatorioTec, PMOC, CRM Plus, Controle de Estoque de EPI, Albion em Alta,
LorranWatch (ESP32) e Pulse Admin.
