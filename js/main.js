/* =========================================================
   Portfolio Lorran Rodrigues – interações
   ========================================================= */
(() => {
  "use strict";

  const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const temMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------- 1. Nome do herói: letras que reagem ao mouse ---------- */
  const nome = document.getElementById("hero-name");
  const letras = [];
  let i = 0;
  nome.querySelectorAll("[data-split]").forEach((linha) => {
    const texto = linha.textContent;
    linha.textContent = "";
    linha.setAttribute("aria-hidden", "true");
    for (const c of texto) {
      const s = document.createElement("span");
      s.className = "ch" + (reduz ? "" : " intro");
      s.textContent = c;
      s.style.setProperty("--i", i++);
      linha.appendChild(s);
      letras.push({ el: s, peso: 300, largura: 85, cx: 0, cy: 0 });
    }
  });

  function medirLetras() {
    for (const l of letras) {
      const r = l.el.getBoundingClientRect();
      l.cx = r.left + r.width / 2;
      l.cy = r.top + r.height / 2 + window.scrollY;
    }
  }

  const ponteiro = { x: -9999, y: -9999, ativo: false };
  let animandoNome = false;

  function passoNome() {
    let mexeu = false;
    const raio = Math.max(180, window.innerWidth * 0.16);
    for (const l of letras) {
      const dx = ponteiro.x - l.cx;
      const dy = ponteiro.y + window.scrollY - l.cy;
      const d = Math.hypot(dx, dy);
      const t = ponteiro.ativo ? Math.max(0, 1 - d / raio) : 0;
      const alvoPeso = 300 + t * t * 500;      // 300 → 800
      const alvoLargura = 85 + t * 15;         // 85 → 100
      l.peso += (alvoPeso - l.peso) * 0.18;
      l.largura += (alvoLargura - l.largura) * 0.18;
      if (Math.abs(alvoPeso - l.peso) > 0.5) mexeu = true;
      l.el.style.setProperty("--wg", l.peso.toFixed(1));
      l.el.style.setProperty("--wd", l.largura.toFixed(1));
    }
    if (mexeu) requestAnimationFrame(passoNome);
    else animandoNome = false;
  }
  function acordarNome() {
    if (!animandoNome) { animandoNome = true; requestAnimationFrame(passoNome); }
  }

  if (temMouse && !reduz) {
    window.addEventListener("pointermove", (e) => {
      ponteiro.x = e.clientX; ponteiro.y = e.clientY; ponteiro.ativo = true;
      acordarNome();
    }, { passive: true });
    document.documentElement.addEventListener("pointerleave", () => { ponteiro.ativo = false; acordarNome(); });
  }
  // mede depois que as fontes e a animação de entrada terminam
  const medir = () => medirLetras();
  document.fonts?.ready.then(() => setTimeout(medir, 50));
  setTimeout(medir, 1400);
  window.addEventListener("resize", medir);

  /* ---------- 2. Canvas de pixels no herói ---------- */
  const canvas = document.getElementById("pixels");
  const ctx = canvas.getContext("2d");
  const heroi = document.querySelector(".hero");
  let L = 0, A = 0, dpr = 1, passo = 26, cols = 0, linhas = 0;
  let brilhos = [];
  let heroiVisivel = true;

  function ajustarCanvas() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    L = heroi.clientWidth; A = heroi.clientHeight;
    canvas.width = Math.round(L * dpr); canvas.height = Math.round(A * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    passo = L < 600 ? 22 : 26;
    cols = Math.ceil(L / passo) + 1; linhas = Math.ceil(A / passo) + 1;
    if (reduz) desenhar(0);
  }

  function desenhar(t) {
    ctx.clearRect(0, 0, L, A);
    const rect = canvas.getBoundingClientRect();
    const px = ponteiro.ativo ? ponteiro.x - rect.left : -9999;
    const py = ponteiro.ativo ? ponteiro.y - rect.top : -9999;
    const raio = 170;

    // novos "pixels acesos" aleatórios, como um display ligando
    if (!reduz && Math.random() < 0.18) {
      brilhos.push({ c: (Math.random() * cols) | 0, r: (Math.random() * linhas) | 0, v: 1 });
    }
    const acesos = new Map();
    brilhos = brilhos.filter((b) => (b.v -= 0.012) > 0);
    for (const b of brilhos) acesos.set(b.r * cols + b.c, b.v);

    for (let r = 0; r < linhas; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * passo, y = r * passo;
        const onda = reduz ? 0.5 : 0.5 + 0.5 * Math.sin(c * 0.22 + r * 0.17 + t * 0.0009);
        const d = Math.hypot(x - px, y - py);
        const perto = Math.max(0, 1 - d / raio);
        const aceso = acesos.get(r * cols + c) || 0;
        let tam = 2 + onda * 1.6 + perto * 9;
        if (perto > 0.02 || aceso > 0) {
          const forca = Math.max(perto, aceso);
          ctx.fillStyle = `rgba(255, 210, 63, ${0.25 + forca * 0.75})`;
          tam = Math.max(tam, 2 + aceso * 8);
        } else {
          ctx.fillStyle = `rgba(190, 200, 255, ${0.10 + onda * 0.16})`;
        }
        // desvia um pouco do ponteiro (efeito lupa)
        let ox = 0, oy = 0;
        if (perto > 0) { ox = (x - px) / (d || 1) * perto * 14; oy = (y - py) / (d || 1) * perto * 14; }
        ctx.fillRect(x + ox - tam / 2, y + oy - tam / 2, tam, tam);
      }
    }
  }

  function loopCanvas(t) {
    if (heroiVisivel && !document.hidden) desenhar(t);
    requestAnimationFrame(loopCanvas);
  }
  ajustarCanvas();
  window.addEventListener("resize", ajustarCanvas);
  if (!reduz) requestAnimationFrame(loopCanvas);
  new IntersectionObserver(([e]) => { heroiVisivel = e.isIntersecting; }).observe(heroi);

  /* ---------- 1b. Topo: palavra que troca e módulos do Workito acendendo ---------- */
  const palavras = [...document.querySelectorAll("#rotator > span")];
  const modulos = [...document.querySelectorAll("#spot-mods li")];
  document.querySelectorAll(".workito-mvp li").forEach((li, k) => li.style.setProperty("--k", k));
  if (!reduz) {
    let p = 0, m = -1;
    setInterval(() => {
      if (document.hidden || window.scrollY > window.innerHeight) return;
      const atual = palavras[p];
      atual.classList.remove("is-on"); atual.classList.add("is-out");
      setTimeout(() => atual.classList.remove("is-out"), 460);
      p = (p + 1) % palavras.length;
      palavras[p].classList.add("is-on");
    }, 2400);
    setInterval(() => {
      if (document.hidden || window.scrollY > window.innerHeight) return;
      if (m >= 0) modulos[m].classList.remove("is-on");
      m = (m + 1) % modulos.length;
      modulos[m].classList.add("is-on");
    }, 900);
  }

  /* ---------- 3. Barra do topo fica sólida depois do herói ---------- */
  const topo = document.getElementById("topbar");
  const atualizarTopo = () => topo.classList.toggle("is-solid", window.scrollY > heroi.offsetHeight - 70);
  window.addEventListener("scroll", atualizarTopo, { passive: true });
  atualizarTopo();

  /* ---------- 4. Miniaturas só animam quando visíveis ---------- */
  const callbacksVivos = new Map();
  const obsTiles = new IntersectionObserver((entradas) => {
    for (const e of entradas) {
      e.target.classList.toggle("is-live", e.isIntersecting);
      const cb = callbacksVivos.get(e.target);
      if (cb) cb(e.isIntersecting);
    }
  }, { threshold: 0.2 });
  document.querySelectorAll(".tile").forEach((t) => obsTiles.observe(t));

  /* ---------- 5. Agenda da barbearia ---------- */
  const agenda = document.getElementById("agenda");
  const contador = document.getElementById("agenda-count");
  const aviso = document.getElementById("agenda-toast");
  const barbeiros = ["Rafa", "Léo", "Davi", "Caio"];
  const horas = ["09:00", "10:00", "11:00", "14:00", "15:00"];
  const clientes = ["Bruno", "André", "Diego", "Enzo", "Felipe", "Gui", "Hugo", "Igor", "João", "Kauã", "Lucas", "Mateus", "Nico", "Otávio", "Pedro", "Rui", "Samuel", "Theo"];
  const servicos = [
    { nome: "Corte", cor: "var(--girassol)", preco: 40 },
    { nome: "Barba", cor: "var(--menta)", preco: 30 },
    { nome: "Corte + barba", cor: "var(--coral)", preco: 65 },
  ];
  const slots = [];
  agenda.appendChild(document.createElement("span"));
  barbeiros.forEach((b) => {
    const s = document.createElement("span"); s.className = "who"; s.textContent = b; agenda.appendChild(s);
  });
  horas.forEach((h) => {
    const s = document.createElement("span"); s.className = "h"; s.textContent = h; agenda.appendChild(s);
    barbeiros.forEach((b) => {
      const d = document.createElement("div"); d.className = "slot"; agenda.appendChild(d);
      slots.push({ el: d, hora: h, barbeiro: b, ocupado: false });
    });
  });
  const sorteia = (arr) => arr[(Math.random() * arr.length) | 0];

  function marcar(slot, anunciar) {
    const sv = sorteia(servicos);
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.style.setProperty("--chip", sv.cor);
    const usados = new Set(slots.filter((s) => s.ocupado).map((s) => s.cliente));
    const cliente = sorteia(clientes.filter((c) => !usados.has(c)));
    slot.cliente = cliente;
    slot.preco = sv.preco;
    chip.textContent = cliente;
    slot.el.appendChild(chip);
    slot.ocupado = true;
    if (anunciar) {
      slots.forEach((s) => s.el.classList.remove("novo"));
      slot.el.classList.add("novo");
      aviso.innerHTML = `<b>Novo agendamento</b>${cliente}, ${sv.nome.toLowerCase()} às ${slot.hora} com ${slot.barbeiro}`;
      aviso.classList.add("show");
      clearTimeout(marcar.t);
      marcar.t = setTimeout(() => aviso.classList.remove("show"), 1700);
    }
    atualizarResumo();
  }
  const resumoClientes = document.getElementById("agenda-clientes");
  const resumoFat = document.getElementById("agenda-fat");
  const resumoProx = document.getElementById("agenda-prox");
  const fmtReal = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
  function atualizarResumo() {
    const ocupados = slots.filter((s) => s.ocupado);
    contador.textContent = ocupados.length;
    resumoClientes.textContent = ocupados.length;
    resumoFat.textContent = fmtReal.format(ocupados.reduce((t, s) => t + (s.preco || 0), 0));
    const prox = ocupados[0];
    resumoProx.textContent = prox ? `${prox.hora} ${prox.barbeiro}` : "Livre";
  }
  function limparAgenda() {
    slots.forEach((s) => {
      s.el.classList.remove("novo");
      const c = s.el.querySelector(".chip");
      if (c) { c.classList.add("saindo"); setTimeout(() => c.remove(), 300); }
      s.ocupado = false;
    });
    atualizarResumo();
  }
  function semear() {
    const iniciais = [...slots].sort(() => Math.random() - 0.5).slice(0, 9);
    iniciais.forEach((s) => marcar(s, false));
  }
  semear();

  let timerAgenda = null;
  function cicloAgenda() {
    const livres = slots.filter((s) => !s.ocupado);
    if (livres.length <= 3) {
      limparAgenda();
      setTimeout(semear, 450);
    } else {
      marcar(sorteia(livres), true);
    }
  }
  if (!reduz) {
    callbacksVivos.set(document.querySelector(".tile-barber"), (vivo) => {
      clearInterval(timerAgenda);
      if (vivo) timerAgenda = setInterval(cicloAgenda, 2200);
    });
  }

  /* ---------- 6. Preço do Albion ---------- */
  const preco = document.getElementById("price");
  const tendencia = document.getElementById("trend");
  let valor = 4812, base = 4280, timerPreco = null;
  const fmt = new Intl.NumberFormat("pt-BR");
  function tickPreco() {
    valor = Math.max(3900, Math.round(valor + (Math.random() - 0.42) * 70));
    preco.textContent = fmt.format(valor);
    const pct = ((valor - base) / base) * 100;
    tendencia.textContent = (pct >= 0 ? "+" : "") + pct.toFixed(1).replace(".", ",") + "%";
  }
  if (!reduz) {
    callbacksVivos.set(document.querySelector(".tile-albion"), (vivo) => {
      clearInterval(timerPreco);
      if (vivo) timerPreco = setInterval(tickPreco, 900);
    });
  }

  /* ---------- 7. Relógio (hora real) ---------- */
  const hora = document.getElementById("watch-time");
  const data = document.getElementById("watch-date");
  const anel = document.getElementById("watch-ring");
  const fmtData = new Intl.DateTimeFormat("pt-BR", { weekday: "short", day: "numeric", month: "short" });
  let rafRelogio = null;
  function relogio() {
    const agora = new Date();
    hora.textContent = agora.toTimeString().slice(0, 5);
    data.textContent = fmtData.format(agora).replace(/\./g, "");
    const s = (agora.getSeconds() + agora.getMilliseconds() / 1000) / 60;
    anel.style.setProperty("--s", reduz ? agora.getSeconds() / 60 : s);
  }
  relogio();
  callbacksVivos.set(document.querySelector(".tile-watch"), (vivo) => {
    cancelAnimationFrame(rafRelogio);
    if (!vivo) return;
    if (reduz) { relogio(); return; }
    const loop = () => { relogio(); rafRelogio = requestAnimationFrame(loop); };
    loop();
  });

  /* ---------- 8. Linha do processo acompanha a rolagem ---------- */
  const lista = document.getElementById("steps");
  const preenchimento = document.getElementById("steps-fill");
  const passos = [...lista.querySelectorAll(".step")];
  function progressoProcesso() {
    const r = lista.getBoundingClientRect();
    const vh = window.innerHeight;
    const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
    preenchimento.style.setProperty("--p", reduz ? 1 : p.toFixed(3));
    passos.forEach((s, k) => s.classList.toggle("is-on", reduz || p >= k / passos.length + 0.04));
  }
  window.addEventListener("scroll", progressoProcesso, { passive: true });
  window.addEventListener("resize", progressoProcesso);
  progressoProcesso();

  /* ---------- 8b. Sobre mim: grifo do título e números contando ---------- */
  const sobre = document.getElementById("sobre");
  const numeros = document.getElementById("about-numeros");
  function contar(el) {
    const alvo = Number(el.dataset.conta);
    if (reduz || alvo === 0) { el.textContent = alvo; return; }
    const ini = performance.now(), dur = 1400 + Math.min(alvo, 100) * 8;
    (function passo(t) {
      const k = Math.min(1, (t - ini) / dur);
      el.textContent = Math.round(alvo * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(passo);
    })(ini);
  }
  new IntersectionObserver(([e], obs) => {
    if (!e.isIntersecting) return;
    sobre.classList.add("is-live");
    obs.disconnect();
  }, { threshold: 0.2 }).observe(sobre);
  new IntersectionObserver(([e], obs) => {
    if (!e.isIntersecting) return;
    numeros.classList.add("is-live");
    numeros.querySelectorAll("[data-conta]").forEach(contar);
    obs.disconnect();
  }, { threshold: 0.35 }).observe(numeros);

  /* ---------- 9. Painel de detalhes dos projetos ---------- */
  const PROJETOS = {
    workito: {
      tipo: "CRM SaaS multiempresa, em desenvolvimento", cor: "var(--menta)", titulo: "Workito",
      problema: "Equipes comerciais perdem venda espalhando cliente, lead e proposta em planilha, WhatsApp e caderno, sem saber o que cada vendedor tem em aberto.",
      recursos: ["Funil de vendas Kanban com arrastar e soltar, histórico de etapas e motivo de perda", "Leads com detecção de duplicados, rodízio e conversão", "Comunicação: histórico de contato com o cliente por canal", "Propostas com desconto controlado, PDF e aprovação", "Atividades em lista e calendário, com alerta de atraso", "Dashboard com 10 indicadores, 7 gráficos e metas", "Planilhas: importa CSV e exporta CSV, Excel e PDF em 14 relatórios", "Em breve: análise de documentos e análise de feedback dos clientes", "Dados de cada empresa isolados e cinco perfis de acesso"],
      stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind", "shadcn/ui", "PostgreSQL", "Prisma", "Better Auth", "Vitest", "Docker"],
      previa: "workito", url: "workito / dashboard",
      demo: null, aviso: "Projeto privado, ainda em desenvolvimento. Posso mostrar ao vivo numa conversa.",
    },
    barbearia: {
      tipo: "SaaS de agendamento", cor: "var(--girassol)", titulo: "Navalha, sistema de barbearia",
      problema: "Barbearias perdem horário e cliente marcando tudo por mensagem. O barbeiro corta cabelo e responde WhatsApp ao mesmo tempo.",
      recursos: ["Agenda do dia com uma coluna por barbeiro", "Visão semanal com clientes e faturamento por dia", "Encaixe de quem chega sem horário e fila da recepção", "Serviços e preço próprio por barbeiro", "Bloqueio de conflito de horário"],
      stack: ["React", "TypeScript", "Vite", "Tailwind", "shadcn/ui"],
      previa: "navalha", url: "navalha / agenda",
      demo: "https://lorranbrs.github.io/sistema-de-barbearia-demo/",
    },
    relatoriotec: {
      tipo: "Ferramenta de campo", cor: "var(--menta)", titulo: "RelatorioTec",
      problema: "Técnico tira foto no celular, anota medição no papel e monta o relatório à noite no computador.",
      recursos: ["Fotos antes e depois, com legenda", "Medições com modelos por tipo de serviço", "Assinatura do cliente na tela", "PDF enviado por WhatsApp ou e-mail", "Funciona sem internet e instala como app"],
      stack: ["HTML", "CSS", "JavaScript", "IndexedDB", "Service worker", "PWA"],
      previa: "relatorio", url: "relatoriotec / novo relatório",
      demo: "https://lorranbrs.github.io/RelatorioTec/",
    },
    pmoc: {
      tipo: "Manutenção de ar-condicionado", cor: "var(--girassol)", titulo: "PMOC",
      problema: "O Plano de Manutenção, Operação e Controle é obrigatório por lei, mas costuma virar uma planilha esquecida.",
      recursos: ["Checklist da Portaria MS 3.523/1998 pela periodicidade da visita", "Inventário de ambientes e equipamentos", "Medições de tensão, corrente, temperatura e pressão", "PDF com assinatura, compartilhado direto do celular"],
      stack: ["HTML", "CSS", "JavaScript", "jsPDF", "GitHub Pages"],
      previa: "pmoc", url: "pmoc / nova visita",
      demo: "https://lorranbrs.github.io/PMOC/",
    },
    crm: {
      tipo: "CRM para educação", cor: "var(--cobalto)", titulo: "CRM Plus",
      problema: "Escolas perdem interessados entre o primeiro contato e a matrícula porque ninguém sabe em que etapa cada um está.",
      recursos: ["Funil de leads em kanban com arrastar e soltar", "Simulador de proposta com parcelamento e Tabela Price", "Alunos, cursos, turmas, professores e financeiro", "Perfis de diretor e funcionário com registro de tudo"],
      stack: ["HTML", "CSS", "JavaScript", "ViaCEP"],
      previa: "crm", url: "crm-plus / painel",
      demo: "https://lorranbrs.github.io/CRM-Plus/",
    },
    epi: {
      tipo: "Controle de estoque industrial", cor: "var(--coral)", titulo: "Estoque de EPI",
      problema: "Na montagem industrial, faltar luva ou óculos para a equipe para a obra. O controle era feito à mão numa planilha.",
      recursos: ["Entrada e saída com C.A, quem retirou e destino", "Saldo do mês e alerta de reposição", "Nota fiscal anexada às compras", "Planilha Excel e backup no Google Drive automáticos"],
      stack: ["HTML", "CSS", "JavaScript", "Excel", "Google Drive API"],
      previa: "epi", url: "estoque-epi / estoque do mês",
      demo: "https://lorranbrs.github.io/controle-estoque-epi/",
    },
    albion: {
      tipo: "Análise de dados", cor: "var(--menta)", titulo: "Albion em Alta",
      problema: "No mercado do Albion Online, o preço muda por cidade e por hora. Sem dados, comprar e vender vira chute.",
      recursos: ["Coletor ligado 24h recebendo ordens em tempo real", "Rankings: em alta, mais vendidos, preço subindo e caindo", "Previsão de preço com regressão e Holt-Winters", "Limpeza de picos fora do padrão"],
      stack: ["Python", "SQLite", "NATS", "API JSON", "JavaScript"],
      demo: null,
    },
    watch: {
      tipo: "Firmware embarcado", cor: "var(--coral)", titulo: "LorranWatch",
      problema: "Ir além do navegador: um relógio inteligente feito do zero numa placa ESP32-S3 com tela AMOLED.",
      recursos: ["Mostradores clássico, analógico, digital e minimalista", "Notificações e chamadas do celular por Bluetooth", "Passos, sono, despertador, timer e cronômetro", "Controle do ar-condicionado via ESP-NOW"],
      stack: ["C++", "Arduino", "ESP32-S3", "LVGL 9", "Bluetooth", "ESP-NOW"],
      demo: null,
    },
  };

  const dialogo = document.getElementById("detail");
  const $ = (id) => document.getElementById(id);
  let origem = null;

  function abrir(chave, botao) {
    const p = PROJETOS[chave];
    if (!p) return;
    origem = botao;
    dialogo.style.setProperty("--d-cor", p.cor);
    $("detail-kind").textContent = p.tipo;
    $("detail-title").textContent = p.titulo;
    $("detail-problem").textContent = p.problema;
    const fig = $("detail-preview");
    fig.hidden = !p.previa;
    if (p.previa) {
      $("detail-url").textContent = p.url;
      $("detail-img-parado").srcset = `assets/previas/${p.previa}-parado.webp`;
      $("detail-img").src = `assets/previas/${p.previa}.webp`;
      $("detail-img").alt = `Gravação da tela real do ${p.titulo} em uso.`;
    } else {
      $("detail-img").removeAttribute("src");
    }
    $("detail-features").replaceChildren(...p.recursos.map((r) => Object.assign(document.createElement("li"), { textContent: r })));
    $("detail-stack").replaceChildren(...p.stack.map((s) => Object.assign(document.createElement("li"), { textContent: s })));
    const links = $("detail-links");
    links.replaceChildren();
    const link = (href, texto, classe) => {
      const a = document.createElement("a");
      a.href = href; a.textContent = texto; a.className = "btn " + classe;
      a.target = "_blank"; a.rel = "noopener";
      links.appendChild(a);
    };
    if (p.demo) link(p.demo, "Abrir a demo", "btn-ink");
    if (!p.demo) {
      const s = document.createElement("span");
      s.className = "privado";
      s.textContent = p.aviso || "Projeto em repositório privado. Posso mostrar numa conversa.";
      links.appendChild(s);
    }
    dialogo.showModal();
  }

  document.querySelectorAll(".tile").forEach((t) => {
    const botao = t.querySelector(".tile-open");
    botao.addEventListener("click", () => abrir(t.dataset.project, botao));
  });
  $("detail-close").addEventListener("click", () => dialogo.close());
  dialogo.addEventListener("click", (e) => { if (e.target === dialogo) dialogo.close(); });
  dialogo.addEventListener("close", () => { $("detail-img").removeAttribute("src"); origem?.focus(); });
})();
