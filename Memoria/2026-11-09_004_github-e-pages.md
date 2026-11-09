# 004 – Repositório no GitHub e publicação

## O que foi feito

1. `.gitignore` criado para deixar de fora `skills-main/`, `Open Designer/` (zip de 213 MB) e `.claude/`.
2. `git init -b main` e primeiro commit local.
3. A criação de repositório público foi bloqueada pela proteção automática até o Lorran confirmar
   ("Sim, público + Pages").
4. Repositório público criado: https://github.com/LorranBRS/site-portfolio
5. GitHub Pages ativado na branch `main`, pasta raiz.
   Site: https://lorranbrs.github.io/site-portfolio/

## Como atualizar o site daqui pra frente

```bash
git add -A
git commit -m "descrição da mudança"
git push
```

O GitHub Pages republica sozinho em 1 a 2 minutos depois de cada push.
Lembrar: toda modificação ganha um arquivo novo nesta pasta `Memoria/`.
