# 013 – Personalização do perfil do GitHub

## Pedido
Personalizar o perfil do GitHub (LorranBRS) para combinar com o portfólio: "faz tudo".

## Situação encontrada
Perfil sem bio, sem link do site, sem README de perfil; repositórios públicos sem descrição ou sem link da demo.

## Feito
### Repositórios (gh repo edit)
| Repositório | Mudança |
|---|---|
| albion-market-analyzer | descrição nova + tópicos python, postgresql, albion-online, scraper |
| library-management-system | descrição reescrita + tópicos python, estudo |
| Bios-Facil-teste | descrição "Repositório de testes do Bios Fácil" |
| Site-Casamento | descrição, link do Pages e tópicos |
| RelatorioTec, controle-estoque-epi, sistema-de-barbearia-demo | link da demo no campo "website" + tópicos |
| PMOC, CRM-Plus, site-portfolio, pulse-admin-prototipo | tópicos |

A descrição do `controle-estoque-epi` ainda cita o cliente ("Oliveira Montagem"): aguardando o usuário dizer se pode ficar.

### README de perfil (pronto, ainda NÃO publicado)
Pasta local `/media/lobao/SSD/LorranBRS-perfil/`:
- `assets/banner.svg`: banner animado (pixels piscando, nome em cobalto e amarelo, pílulas de tecnologia flutuando).
- `assets/numeros.svg`: 20 sistemas, 5 demos, 89 projetos ESP32.
- `assets/workito.svg`: Workito em destaque, mini funil animado e os 9 módulos do MVP acendendo.
- `README.md`: apresentação, Workito, tabela com as 5 demos usando as gravações WebP do site como prévia, tecnologias em selos.
SVG com animação CSS funciona no GitHub porque é exibido como imagem; fontes externas não carregam, então usa fonte do sistema.

## Pendências (dependem do usuário)
1. **Criar o repositório público `LorranBRS/LorranBRS`** e enviar a pasta: a proteção do Claude Code bloqueou a criação de algo público sem autorização explícita.
2. **Bio e link do site no perfil**: o token do `gh` não tem o escopo `user`. Rodar `gh auth refresh -h github.com -s user` (abre o navegador) ou editar em github.com/settings/profile.
3. **Fixar repositórios** (o GitHub não permite por API): sugestão site-portfolio, sistema-de-barbearia-demo, CRM-Plus, RelatorioTec, PMOC, controle-estoque-epi.
