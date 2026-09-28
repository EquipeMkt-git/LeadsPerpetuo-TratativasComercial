/*
 * MODO DEMONSTRAÇÃO — simula o backend no navegador com dados fictícios.
 * Só é usado quando APP_CONFIG.API_URL está vazio. Nada é salvo.
 */
(function () {
  'use strict';
  const pad = (n) => String(n).padStart(2, '0');
  const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  const agora = () => iso(new Date());
  const atras = (h) => iso(new Date(Date.now() - h * 3600000));
  let seq = 1000;
  const id = (p) => p + (++seq);
  let rnd = 7;
  const r = () => { rnd = (rnd * 16807) % 2147483647; return rnd / 2147483647; };
  const pick = (a) => a[Math.floor(r() * a.length)];
  const PERP = /perpetuo|perp/i.test(location.search);

  const U = [
    { id: 'U1', nome: 'Coordenação 4blue', email: 'coord@demo.com', perfil: 'coordenador', foto: '', ativo: 'SIM', recebe_leads: 'NAO' },
    { id: 'U2', nome: 'Ana Ribeiro', email: 'ana@demo.com', perfil: 'usuario', foto: '', ativo: 'SIM', recebe_leads: 'SIM' },
    { id: 'U3', nome: 'Bruno Mendes', email: 'bruno@demo.com', perfil: 'usuario', foto: '', ativo: 'SIM', recebe_leads: 'SIM' },
    { id: 'U4', nome: 'Carla Duarte', email: 'carla@demo.com', perfil: 'usuario', foto: '', ativo: 'SIM', recebe_leads: 'SIM' }
  ];
  const P = [
    { id: 'P1', nome: 'Produto A (exemplo)', valor_total: '12000', valor_entrada: '2000', parcelas: 'entrada + 10x', descricao: '', ativo: 'SIM', origem: 'coordenador', criado_por: 'Coordenação' },
    { id: 'P2', nome: 'Produto B (exemplo)', valor_total: '4750', valor_entrada: '', parcelas: '12x', descricao: '', ativo: 'SIM', origem: 'coordenador', criado_por: 'Coordenação' },
    { id: 'P3', nome: 'Produto C (exemplo)', valor_total: '1997', valor_entrada: '1997', parcelas: 'à vista', descricao: '', ativo: 'SIM', origem: 'coordenador', criado_por: 'Coordenação' }
  ];
  const F = (PERP ? [
    ['Boas-vindas', '#0369B1', 'Abrir a conversa no WhatsApp\nApresentar-se como concierge\nConfirmar que recebeu o acesso do produto'],
    ['Ativação', '#F8B90C', 'Confirmar que já começou o curso\nTirar as primeiras dúvidas\nCombinar um retorno'],
    ['Entender o momento', '#0B7A9E', 'Perguntar sobre a empresa e a principal dor\nRegistrar o que descobriu nas anotações'],
    ['Oferta', '#C2410C', 'Apresentar o produto certo para o momento\nEnviar proposta ou link'],
    ['Negociação', '#12A150', 'Responder às objeções\nFechar ou registrar o motivo da perda']
  ] : [
    ['Primeiro contato', '#0369B1', 'Abrir a conversa no WhatsApp\nApresentar-se como concierge do lead\nConfirmar que recebeu o acesso do ingresso'],
    ['Confirmação de presença', '#F8B90C', 'Confirmar presença no Workshop\nExplicar horário, formato e o que levar\nMarcar o marco "Confirmou presença"'],
    ['Upgrade VIP', '#7A4CC2', 'Apresentar os benefícios do VIP\nEnviar o link de upgrade\nConferir se o pagamento foi feito'],
    ['Diagnóstico', '#0B7A9E', 'Enviar o link do diagnóstico\nLembrar quem não respondeu\nLer as respostas antes da reunião'],
    ['Reunião', '#C2410C', 'Agendar a reunião\nConfirmar 1 dia antes\nRegistrar o combinado nas anotações'],
    ['Oferta e venda', '#12A150', 'Apresentar a oferta certa para o momento do lead\nRegistrar negócio ganho ou perdido']
  ]).map((f, i) => ({ id: 'F' + (i + 1), nome: f[0], cor: f[1], instrucoes: f[2], ordem: String(i + 1), ativo: 'SIM' }));

  const M = [
    { id: 'M1', titulo: 'Boas-vindas', fase_id: 'F1', ordem: '1', ativo: 'SIM', tipo_ingresso: 'todos', texto: 'Oi {primeiro_nome}, tudo bem? Aqui é {usuario}, da 4blue! Vi que você garantiu seu ingresso para o Workshop do dia 07/10 e queria te dar as boas-vindas. Posso te fazer uma pergunta rápida?' },
    { id: 'M2', titulo: 'Boas-vindas VIP', fase_id: 'F1', ordem: '2', ativo: 'SIM', tipo_ingresso: 'vip', texto: 'Oi {primeiro_nome}! Aqui é {usuario}, da 4blue. Obrigado por garantir o ingresso VIP do Workshop 07/10! Vou cuidar pessoalmente da sua experiência. Posso te chamar aqui?' },
    { id: 'M3', titulo: 'Convite para conversa', fase_id: 'F4', ordem: '3', ativo: 'SIM', tipo_ingresso: 'todos', texto: '{primeiro_nome}, antes do workshop quero entender o momento da sua empresa para você aproveitar ao máximo. Tem 5 minutinhos hoje?' },
    { id: 'M4', titulo: 'Oferta do upgrade VIP', fase_id: 'F3', ordem: '4', ativo: 'SIM', tipo_ingresso: 'padrao', texto: '{primeiro_nome}, consegui liberar o upgrade para a área VIP do Workshop do dia {data_evento} por {valor_upgrade}. No VIP você fica nas primeiras fileiras e participa do almoço com o time. Quer que eu garanta a sua? Link: {link_upgrade}' },
    { id: 'M5', titulo: 'Confirmar presença', fase_id: 'F2', ordem: '5', ativo: 'SIM', tipo_ingresso: 'todos', texto: '{primeiro_nome}, tudo certo para o dia {data_evento}? Me confirma aqui que você vai estar com a gente, por favor.' }
  ];
  const nomes = ['Mariana Costa', 'Rafael Lima', 'Juliana Alves', 'Pedro Henrique Rocha', 'Fernanda Martins', 'Lucas Oliveira', 'Camila Barros', 'Thiago Ferreira',
    'Patrícia Gomes', 'Gustavo Nunes', 'Aline Teixeira', 'Rodrigo Santana', 'Beatriz Moura', 'Felipe Cardoso', 'Larissa Pires', 'André Batista', 'Renata Vieira',
    'Diego Monteiro', 'Vanessa Freitas', 'Marcelo Azevedo', 'Tatiane Lopes', 'Eduardo Campos', 'Priscila Ramos', 'Leandro Correia', 'Simone Araújo', 'Fábio Rezende',
    'Natália Castro', 'Vinícius Prado', 'Carolina Dias', 'Ricardo Farias', 'Débora Sales', 'Henrique Pacheco', 'Luana Brito', 'Otávio Leal', 'Gabriela Neves', 'Sérgio Matos'];
  const cidades = ['São Paulo / SP', 'Curitiba / PR', 'Goiânia / GO', 'Rio de Janeiro / RJ', 'Fortaleza / CE', 'Campinas / SP', 'Manaus / AM', 'Joinville / SC'];
  const fats = ['Até 30mil/mês', '30 a 60mil/mês', '60 a 100mil/mês', '100 a 300mil/mês', '300mil a 1mi/mês'];
  const evs = ['SP', 'CWB', 'GO', 'RJ', 'FOR', 'CAP', 'SP (AGO)', 'RIB'];

  const L = nomes.map((n, i) => {
    const vip = r() < 0.3;
    const email = n.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '.') + '@exemplo.com';
    const l = {
      id: 'L' + (100 + i), criado_em: atras(2 + i * 9 + r() * 5), origem: i % 9 === 0 ? 'manual' : 'hotmart', tipo_ingresso: vip ? 'vip' : 'padrao',
      nome: n, email, telefone: '55' + pick(['11', '41', '62', '21', '85', '19']) + '9' + String(10000000 + Math.floor(r() * 89999999)),
      cidade: pick(cidades), empresa: '', obs: '', status: 'novo', responsavel_id: '', responsavel_nome: '', inicio_tratativa: '', ultima_acao: '',
      fechado_em: '', motivo: '', mensagem_usada: '', transacao: 'HP' + (1700000000 + i * 7919), produto_hotmart: vip ? '8502486' : '8502151',
      origem_evento: PERP ? 'Curso Pró-labore e Distribuição de Lucros (PLR)' : (i % 4 === 3 ? 'Workshop Online de Gestão de Pessoas' : (vip ? 'Workshop presencial 07/10 — VIP' : 'Workshop presencial 07/10 — Padrão')),
      valor_ingresso: vip ? '997' : '197', status_hotmart: 'APPROVED', cliente_mdl: '', cliente_ilu: '', eventos: '', cargo: pick(['Dono / Sócio', 'Dono / Sócio', 'Diretor', 'Gerente']),
      faturamento: pick(fats), criado_por: i % 9 === 0 ? 'Ana Ribeiro' : 'Hotmart', atualizado_em: '',
      fase_id: '', fase_em: '', confirmado: '', confirmado_em: '', upgrade: '', upgrade_em: '', diagnostico: '', diagnostico_em: '',
      diagnostico_respostas: '', reuniao: '', reuniao_em: '', reuniao_obs: '', checkin: '', checkin_em: '', dados_extra: ''
    };
    if (r() < 0.22) l.cliente_mdl = pick(['Mamber Ativo · Máquina de Lucros Essencial', 'Ex Mamber · Máquina de Lucros PRO', 'Mentoria Cancelada · Máquina de Lucros Essencial']);
    if (r() < 0.2) l.cliente_ilu = 'Ex iluminista';
    if (r() < 0.45) {
      const k = 1 + Math.floor(r() * 3);
      const a = [];
      for (let j = 0; j < k; j++) a.push({ e: pick(evs), t: pick(['Normal', 'Normal', 'VIP']), f: pick(['Sim', 'Não', '']), c: r() < 0.15 ? 'Produto B (exemplo)' : '' });
      l.eventos = JSON.stringify(a);
    }
    return l;
  });
  const V = [];
  const H = [];
  const hist = (lead, u, acao, det, quando) => H.push({ data: quando || agora(), lead_id: lead, usuario_id: u ? u.id : '', usuario_nome: u ? u.nome : 'Sistema', acao, detalhe: det || '' });

  // distribui alguns leads
  L.forEach((l, i) => {
    if (i < 12) return;
    const u = U[1 + (i % 3)];
    l.responsavel_id = u.id; l.responsavel_nome = u.nome;
    const ini = Math.max(1, (Date.now() - new Date(l.criado_em)) / 3600000 - 3);
    l.inicio_tratativa = atras(ini); l.ultima_acao = atras(ini * r());
    l.status = 'tratativa';
    hist(l.id, u, 'tratativa_iniciada', 'Mensagem: Boas-vindas', l.inicio_tratativa);
    const fi = Math.min(F.length - 1, Math.floor(r() * F.length));
    l.fase_id = F[fi].id; l.fase_em = l.ultima_acao;
    if (fi >= 1) { l.confirmado = r() < 0.75 ? 'sim' : 'nao'; l.confirmado_em = l.inicio_tratativa; }
    if (fi >= 2 && l.tipo_ingresso !== 'vip') { const x2 = r(); l.upgrade = x2 < 0.3 ? 'feito' : (x2 < 0.7 ? 'enviado' : 'nao_quer'); l.upgrade_em = l.ultima_acao; if (l.upgrade === 'feito') l.tipo_ingresso = 'vip'; }
    if (fi >= 3) {
      l.diagnostico = r() < 0.6 ? 'feito' : 'enviado'; l.diagnostico_em = l.ultima_acao;
      if (l.diagnostico === 'feito') l.diagnostico_respostas = JSON.stringify({
        'Qual seu faturamento mensal?': l.faturamento, 'Quantos funcionários?': String(3 + Math.floor(r() * 40)),
        'Maior desafio hoje': pick(['Fluxo de caixa apertado', 'Não sei o preço certo', 'Equipe sem processo', 'Margem baixa']),
        'Já usa algum sistema financeiro?': pick(['Planilha', 'ERP', 'Nada organizado'])
      });
    }
    if (fi >= 4) { l.reuniao = r() < 0.7 ? 'feita' : 'agendada'; l.reuniao_em = l.ultima_acao; if (l.reuniao === 'feita') l.reuniao_obs = 'Entende que precisa organizar o financeiro. Ficou de conversar com o sócio.'; }
    if (r() < 0.3) { l.checkin = 'sim'; l.checkin_em = l.ultima_acao; }
    l.boas_vindas = pick(['enviada', 'respondeu', 'respondeu', 'sem_resposta']); l.boas_vindas_em = l.inicio_tratativa;
    if (fi >= 1) { l.acesso = r() < 0.7 ? 'sim' : 'nao'; l.acesso_em = l.ultima_acao; }
    const x = i % 7 === 3 ? 0.1 : (i % 7 === 5 ? 0.45 : (i % 11 === 7 ? 0.58 : 0.9));
    if (x < 0.35) {
      const p = pick(P);
      l.status = 'ganho'; l.fechado_em = l.ultima_acao;
      V.push({ id: id('V'), data: l.fechado_em, lead_id: l.id, lead_nome: l.nome, usuario_id: u.id, usuario_nome: u.nome, produto_id: p.id, produto_nome: p.nome,
        valor_entrada: p.valor_entrada, valor_total: p.valor_total, parcelas: p.parcelas, forma_pagamento: pick(['Pix', 'Cartão de crédito']), obs: '', status: 'ativa', produto_fora_lista: '' });
      hist(l.id, u, 'ganho', p.nome, l.fechado_em);
    } else if (x < 0.55) {
      l.status = 'perdido'; l.fechado_em = l.ultima_acao; l.motivo = pick(['Sem interesse', 'Achou caro', 'Não respondeu']);
      hist(l.id, u, 'perdido', l.motivo, l.fechado_em);
    } else if (x < 0.62) {
      l.status = 'reembolso'; l.fechado_em = l.ultima_acao; l.motivo = 'Pediu reembolso do ingresso';
      hist(l.id, u, 'reembolso', l.motivo, l.fechado_em);
    }
  });
  H.sort((a, b) => a.data.localeCompare(b.data));

  const sessoes = {};
  const copia = (o) => JSON.parse(JSON.stringify(o));
  const leadDe = (lid) => L.find((l) => l.id === lid);
  function permitido(u, lid, leitura) {
    const l = leadDe(lid);
    if (!l) throw new Error('Lead não encontrado.');
    if (u.perfil === 'coordenador' || l.responsavel_id === u.id) return l;
    if (leitura && l.status === 'novo') return l;
    if (l.status === 'novo') throw new Error('Inicie a conversa pelo WhatsApp para assumir este lead.');
    throw new Error('Este lead está com ' + l.responsavel_nome + '.');
  }
  const bootstrap = (u) => {
    const c = u.perfil === 'coordenador';
    return {
      usuario: copia(u),
      leads: copia(L.filter((l) => c || l.status === 'novo' || l.responsavel_id === u.id)),
      vendas: copia(V.filter((v) => c || v.usuario_id === u.id)),
      produtos: copia(P.filter((p) => c || p.ativo === 'SIM')),
      mensagens: copia(M.filter((m) => c || m.ativo === 'SIM')),
      fases: copia(F.filter((f) => c || f.ativo === 'SIM')),
      sistema: config.nome_sistema,
      modo: PERP ? 'perpetuo' : 'evento',
      marcos: config.marcos_ativos,
      pode_gerenciar: c || config.quem_gerencia === 'todos',
      links: { upgrade: config.upgrade_url, upgrade_valor: config.upgrade_valor, diagnostico: config.diagnostico_url, evento: config.evento_data }
    };
  };
  const config = {
    nome_sistema: PERP ? 'Leads - Perpétuo' : 'Leads - Workshop pago [2026.10.07]',
    modo: PERP ? 'perpetuo' : 'evento',
    marcos_ativos: PERP ? ['boas_vindas', 'acesso', 'reuniao'] : ['confirmado', 'upgrade', 'diagnostico', 'reuniao', 'checkin'],
    quem_gerencia: PERP ? 'todos' : 'coordenador',
    produtos: PERP ? [{ id: '6790181', nome: 'Curso Pró-labore e Distribuição de Lucros (PLR)', tipo: 'padrao' }] : [
      { id: '8502151', nome: 'Workshop presencial 07/10 — Padrão', tipo: 'padrao' },
      { id: '8502486', nome: 'Workshop presencial 07/10 — VIP', tipo: 'vip' },
      { id: '4195296', nome: 'Workshop Online de Gestão de Pessoas', tipo: 'padrao' }
    ],
    upgrade_url: 'https://pay.hotmart.com/exemplo-upgrade-vip', upgrade_valor: '50', diagnostico_url: 'https://forms.exemplo.com/diagnostico', evento_data: '2026-10-07', distribuicao_auto: false,
    webhook_dados: 'https://script.google.com/macros/s/SEU_ID/exec?src=dados&key=CHAVE&tipo=diagnostico',
    webhook: 'https://script.google.com/macros/s/SEU_ID/exec?src=hotmart&key=CHAVE', id_padrao: '8502151', id_vip: '8502486', base_id: '1ihgdFxaR5cM6xyAECvJ-IORN1dmghRin9gmRFCsHe5I', ultima_sincronizacao: atras(0.4), modo_teste: false, hotmart_api: { configurada: false, client_id: '' },
    webhooks: [{ recebido_em: atras(0.2), evento: 'PURCHASE_APPROVED', produto: '8502486', transacao: 'HP1700102947', email: 'felipe.cardoso@exemplo.com', status: 'ok', resultado: 'Lead criado: L113' },
      { recebido_em: atras(1), evento: 'PURCHASE_CHARGEBACK', produto: '0', transacao: 'HP16015479281022', email: 'teste@example.com', status: 'ignorado', resultado: 'produto de teste da Hotmart (id 0) — ative o modo teste para aceitar' }] };

  const rotas = {
    'login': (b) => {
      const u = U.find((x) => x.email === String(b.email || '').trim().toLowerCase());
      if (!u || String(b.senha) !== '123456' || u.ativo !== 'SIM') throw new Error('E-mail ou senha inválidos.');
      const t = 'demo-' + Math.random().toString(36).slice(2);
      sessoes[t] = u.id;
      return { token: t, usuario: copia(u) };
    },
    'logout': () => true,
    'bootstrap': (b, u) => bootstrap(u),
    'admin.painel': (b, u) => Object.assign(bootstrap(u), { usuarios: copia(U), historico: copia(H.slice(-400).reverse()), config }),
    'perfil.salvar': (b, u) => { if (b.nome !== undefined) u.nome = String(b.nome).trim() || u.nome; if (b.foto !== undefined) u.foto = b.foto; L.forEach((l) => { if (l.responsavel_id === u.id) l.responsavel_nome = u.nome; }); return copia(u); },
    'lead.criar': (b, u) => {
      const d = b.lead || {};
      const l = Object.assign({ id: id('L'), criado_em: agora(), origem: 'manual', status: 'novo', criado_por: u.nome, responsavel_id: '', responsavel_nome: '' }, d);
      delete l.assumir;
      if (d.assumir) Object.assign(l, { status: 'tratativa', responsavel_id: u.id, responsavel_nome: u.nome, inicio_tratativa: agora(), ultima_acao: agora() });
      L.unshift(l); hist(l.id, u, 'criado', 'Lead cadastrado manualmente');
      return copia(l);
    },
    'lead.editar': (b, u) => { const l = permitido(u, b.id, true); Object.assign(l, b.lead, { atualizado_em: agora() }); hist(l.id, u, 'editado', ''); return copia(l); },
    'lead.iniciar': (b, u) => {
      const l = leadDe(b.id);
      if (l.status === 'novo') { Object.assign(l, { status: 'tratativa', responsavel_id: u.id, responsavel_nome: u.nome, inicio_tratativa: agora(), ultima_acao: agora(), mensagem_usada: b.mensagem }); hist(l.id, u, 'tratativa_iniciada', b.mensagem ? 'Mensagem: ' + b.mensagem : 'WhatsApp aberto'); }
      else if (l.responsavel_id === u.id || u.perfil === 'coordenador') { l.ultima_acao = agora(); hist(l.id, u, 'whatsapp', 'WhatsApp aberto novamente'); }
      else throw new Error('Este lead já está com ' + l.responsavel_nome + '.');
      return copia(l);
    },
    'lead.ganho': (b, u) => {
      const l = permitido(u, b.id);
      const v = b.venda;
      let p = P.find((x) => x.id === v.produto_id);
      if (!p) {
        p = P.find((x) => x.nome.toLowerCase() === String(v.produto_nome).toLowerCase());
        if (!p) { p = { id: id('P'), nome: v.produto_nome, valor_total: String(v.valor_total), valor_entrada: String(v.valor_entrada || ''), parcelas: v.parcelas, ativo: 'SIM', origem: 'usuario', criado_por: u.nome }; P.push(p); }
      }
      const venda = { id: id('V'), data: agora(), lead_id: l.id, lead_nome: l.nome, usuario_id: l.responsavel_id || u.id, usuario_nome: l.responsavel_nome || u.nome, produto_id: p.id, produto_nome: p.nome,
        valor_entrada: String(v.valor_entrada || ''), valor_total: String(v.valor_total), parcelas: v.parcelas, forma_pagamento: v.forma_pagamento, obs: v.obs, status: 'ativa', produto_fora_lista: v.produto_id ? '' : 'SIM' };
      V.push(venda);
      Object.assign(l, { status: 'ganho', fechado_em: agora(), ultima_acao: agora(), motivo: '' });
      hist(l.id, u, 'ganho', p.nome + ' · total R$ ' + v.valor_total);
      return { lead: copia(l), venda: copia(venda), produto: copia(p) };
    },
    'lead.perdido': (b, u) => { const l = permitido(u, b.id); Object.assign(l, { status: 'perdido', motivo: b.motivo, fechado_em: agora(), ultima_acao: agora() }); hist(l.id, u, 'perdido', b.motivo); return copia(l); },
    'lead.reembolso': (b, u) => {
      const l = permitido(u, b.id);
      Object.assign(l, { status: 'reembolso', motivo: b.motivo, fechado_em: agora(), ultima_acao: agora() });
      if (b.reembolsar_vendas) V.forEach((v) => { if (v.lead_id === l.id) v.status = 'reembolsada'; });
      hist(l.id, u, 'reembolso', b.motivo); return copia(l);
    },
    'lead.reabrir': (b, u) => { const l = permitido(u, b.id); const a = l.status; l.status = 'tratativa'; l.ultima_acao = agora(); hist(l.id, u, 'reaberto', 'De "' + a + '" para tratativa'); return copia(l); },
    'lead.nota': (b, u) => { permitido(u, b.id, true); hist(b.id, u, 'nota', b.texto); return true; },
    'lead.historico': (b, u) => { permitido(u, b.id, true); return copia(H.filter((h) => h.lead_id === b.id).reverse()); },
    'venda.excluir': (b, u) => {
      const i = V.findIndex((v) => v.id === b.id); const v = V[i]; V.splice(i, 1);
      const l = leadDe(v.lead_id);
      if (l && l.status === 'ganho' && !V.some((x) => x.lead_id === l.id && x.status === 'ativa')) l.status = 'tratativa';
      hist(v.lead_id, u, 'venda_excluida', v.produto_nome); return true;
    },
    'admin.usuario.salvar': (b) => {
      const d = b.usuario;
      if (!d.nome || !d.email) throw new Error('Preencha nome e e-mail.');
      if (d.id) { const x = U.find((y) => y.id === d.id); Object.assign(x, { nome: d.nome, email: d.email.toLowerCase(), perfil: d.perfil, ativo: d.ativo, recebe_leads: d.recebe_leads }); return copia(x); }
      if (!d.senha || d.senha.length < 6) throw new Error('Defina uma senha com ao menos 6 caracteres.');
      const x = { id: id('U'), nome: d.nome, email: d.email.toLowerCase(), perfil: d.perfil, ativo: d.ativo, recebe_leads: d.recebe_leads || 'SIM', foto: '' };
      U.push(x); return copia(x);
    },
    'lead.fase': (b, u) => { const l = permitido(u, b.id); const de = (F.find((f) => f.id === l.fase_id) || {}).nome || 'sem fase'; l.fase_id = b.fase_id; l.fase_em = agora(); l.ultima_acao = agora(); if (l.status === 'novo') l.status = 'tratativa'; hist(l.id, u, 'fase', de + ' → ' + (F.find((f) => f.id === b.fase_id) || {}).nome); return copia(l); },
    'lead.marco': (b, u) => {
      const l = permitido(u, b.id);
      l[b.campo] = b.valor; l[b.campo + '_em'] = b.valor ? agora() : ''; l.ultima_acao = agora();
      if (b.campo === 'reuniao' && b.obs !== undefined) l.reuniao_obs = b.obs;
      if (b.campo === 'upgrade' && b.valor === 'feito') l.tipo_ingresso = 'vip';
      hist(l.id, u, 'marco', b.campo + ': ' + (b.valor || 'limpo'));
      return copia(l);
    },
    'fase.salvar': (b) => rotas['admin.fase.salvar'](b),
    'fase.excluir': (b) => rotas['admin.fase.excluir'](b),
    'produto.salvar': (b, u) => rotas['admin.produto.salvar'](b, u),
    'mensagem.salvar': (b) => rotas['admin.mensagem.salvar'](b),
    'mensagem.excluir': (b) => rotas['admin.mensagem.excluir'](b),
    'admin.fase.salvar': (b) => {
      const d = b.fase;
      if (d.id) { const x = F.find((y) => y.id === d.id); Object.assign(x, d); return copia(x); }
      const x = Object.assign({}, d, { id: id('F') }); F.push(x); return copia(x);
    },
    'admin.fase.excluir': (b) => {
      if (L.some((l) => l.fase_id === b.id)) throw new Error('Há leads nesta fase. Mova-os antes ou desative a fase.');
      F.splice(F.findIndex((f) => f.id === b.id), 1); return true;
    },
    'admin.distribuir': (b, u) => {
      const cs = U.filter((x) => x.ativo === 'SIM' && (x.perfil !== 'coordenador' || x.recebe_leads === 'SIM'));
      if (!cs.length) throw new Error('Cadastre os concierges em Equipe antes de distribuir.');
      const sem = L.filter((l) => l.status === 'novo' && !l.responsavel_id);
      const porUsuario = {};
      const abertos = {};
      cs.forEach((x) => { abertos[x.id] = L.filter((l) => l.responsavel_id === x.id && (l.status === 'novo' || l.status === 'tratativa')).length; });
      sem.forEach((l) => {
        let melhor = cs[0];
        cs.forEach((x) => { if (abertos[x.id] < abertos[melhor.id]) melhor = x; });
        abertos[melhor.id]++;
        porUsuario[melhor.nome] = (porUsuario[melhor.nome] || 0) + 1;
        if (!b.simular) { l.responsavel_id = melhor.id; l.responsavel_nome = melhor.nome; l.fase_id = l.fase_id || F[0].id; }
      });
      if (!b.simular && sem.length) hist('', u, 'distribuicao', sem.length + ' leads distribuídos');
      return { simulacao: !!b.simular, distribuidos: sem.length, por_usuario: porUsuario, concierges: cs.length };
    },
    'admin.importar.marcos': (b, u) => {
      let ach = 0, nao = 0, atu = 0;
      const faltam = [];
      b.linhas.forEach((r) => {
        const l = L.find((x) => (r.email && x.email === String(r.email).toLowerCase()) || (r.telefone && x.telefone && x.telefone.slice(-8) === String(r.telefone).replace(/\D/g, '').slice(-8)));
        if (!l) { nao++; if (faltam.length < 20) faltam.push(r.nome || r.email || r.telefone); return; }
        ach++;
        if (b.simular) return;
        atu++;
        if (b.tipo === 'checkin') { l.checkin = 'sim'; l.checkin_em = agora(); }
        else if (b.tipo === 'confirmacao') { l.confirmado = 'sim'; l.confirmado_em = agora(); }
        else if (b.tipo === 'diagnostico') { l.diagnostico = 'feito'; l.diagnostico_em = agora(); l.diagnostico_respostas = JSON.stringify(r.respostas || {}); }
        else { l.dados_extra = JSON.stringify(Object.assign({}, JSON.parse(l.dados_extra || '{}'), r.respostas || {})); }
      });
      return { simulacao: !!b.simular, tipo: b.tipo, linhas: b.linhas.length, encontrados: ach, atualizados: atu, nao_encontrados: nao, exemplos_nao_encontrados: faltam };
    },
    'admin.produto.salvar': (b, u) => {
      const d = b.produto;
      if (d.id) { const x = P.find((y) => y.id === d.id); Object.assign(x, d); return copia(x); }
      const x = Object.assign({}, d, { id: id('P'), origem: 'coordenador', criado_por: u.nome }); P.push(x); return copia(x);
    },
    'admin.mensagem.salvar': (b) => {
      const d = b.mensagem;
      if (d.id) { const x = M.find((y) => y.id === d.id); Object.assign(x, d); return copia(x); }
      const x = Object.assign({}, d, { id: id('M') }); M.push(x); return copia(x);
    },
    'admin.mensagem.excluir': (b) => { M.splice(M.findIndex((m) => m.id === b.id), 1); return true; },
    'admin.lead.atribuir': (b, u) => {
      const l = leadDe(b.id); const x = U.find((y) => y.id === b.usuario_id);
      Object.assign(l, { responsavel_id: x.id, responsavel_nome: x.nome });
      if (l.status === 'novo') Object.assign(l, { status: 'tratativa', inicio_tratativa: agora(), ultima_acao: agora() });
      hist(l.id, u, 'atribuido', 'Para ' + x.nome); return copia(l);
    },
    'admin.lead.liberar': (b, u) => { const l = leadDe(b.id); Object.assign(l, { status: 'novo', responsavel_id: '', responsavel_nome: '', inicio_tratativa: '', motivo: '', fechado_em: '' }); hist(l.id, u, 'liberado', ''); return copia(l); },
    'admin.lead.excluir': (b) => { L.splice(L.findIndex((l) => l.id === b.id), 1); return true; },
    'admin.importar': (b, u) => {
      let n = 0, d = 0, vip = 0;
      const vistos = new Set(L.map((l) => l.email));
      b.linhas.forEach((x) => {
        const em = String(x.email || '').toLowerCase();
        if (em && vistos.has(em)) { d++; return; }
        vistos.add(em); n++; if (x.tipo_ingresso === 'vip') vip++;
        if (!b.simular) L.unshift({ id: id('L'), criado_em: x.criado_em || agora(), origem: 'importacao', status: 'novo', nome: x.nome, email: em, telefone: x.telefone, cidade: x.cidade, tipo_ingresso: x.tipo_ingresso, transacao: x.transacao, criado_por: u.nome });
      });
      return { simulacao: !!b.simular, importados: n, duplicados: d, invalidos: 0, sem_telefone: 0, viraram_vip: 0, vip, exemplos: [] };
    },
    'admin.hotmart.cred': (b) => { config.hotmart_api = { configurada: true, client_id: String(b.client_id).slice(0, 6) + '…' }; return config.hotmart_api; },
    'admin.hotmart.importar': (b, u) => {
      if (!config.hotmart_api.configurada) throw new Error('Cadastre o client_id e o client_secret da Hotmart em Ajustes.');
      const novos = ['Paulo Viana', 'Lívia Duarte', 'Caio Pereira'];
      if (!b.simular) novos.forEach((n, i) => L.unshift({ id: id('L'), criado_em: atras(300 + i), origem: 'hotmart', status: 'novo', nome: n, email: 'api' + i + '@exemplo.com', telefone: '55119' + (80000000 + i * 1111111), cidade: 'São Paulo / SP', tipo_ingresso: i === 1 ? 'vip' : 'padrao', transacao: 'HPAPI' + i, criado_por: 'Hotmart (importação)' }));
      return { simulacao: !!b.simular, encontradas: 27, por_produto: { padrao: 20, vip: 7 }, importados: b.simular ? 3 : 3, duplicados: 24, invalidos: 0, sem_telefone: 1, viraram_vip: 1, vip: 1,
        canceladas: 2, reembolsos_marcados: 1, desde: b.desde, exemplos: novos.map((n, i) => n + ' · (11) 9' + (8000 + i) + '-0000 · ' + (i === 1 ? 'vip' : 'padrao')) };
    },
    'admin.sincronizar': () => { config.ultima_sincronizacao = agora(); return { clientes: 18432, leads_atualizados: 3, em: agora() }; },
    'admin.processarFila': () => ({ processados: 0 }),
    'admin.config': (b) => {
      const c = b.config || {};
      if (c.HOTMART_PRODUTOS !== undefined) config.produtos = String(c.HOTMART_PRODUTOS).split('\n').filter(Boolean).map((l) => { const p2 = l.split(';'); return { id: (p2[0] || '').trim(), nome: (p2[1] || '').trim(), tipo: /vip/i.test(p2[2] || '') ? 'vip' : 'padrao' }; });
      if (c.HOTMART_ID_PADRAO) config.id_padrao = c.HOTMART_ID_PADRAO;
      if (c.HOTMART_ID_VIP) config.id_vip = c.HOTMART_ID_VIP;
      if (c.BASE_CLIENTES_ID) config.base_id = c.BASE_CLIENTES_ID;
      if (c.HOTMART_MODO_TESTE) config.modo_teste = c.HOTMART_MODO_TESTE === 'SIM';
      if (c.UPGRADE_VIP_URL !== undefined) config.upgrade_url = c.UPGRADE_VIP_URL;
      if (c.UPGRADE_VIP_VALOR) config.upgrade_valor = c.UPGRADE_VIP_VALOR;
      if (c.DIAGNOSTICO_URL !== undefined) config.diagnostico_url = c.DIAGNOSTICO_URL;
      if (c.EVENTO_DATA) config.evento_data = c.EVENTO_DATA;
      if (c.DISTRIBUICAO_AUTO) config.distribuicao_auto = c.DISTRIBUICAO_AUTO === 'SIM';
      if (c.NOME_SISTEMA) config.nome_sistema = c.NOME_SISTEMA;
      if (c.QUEM_GERENCIA) config.quem_gerencia = c.QUEM_GERENCIA;
      if (c.MARCOS_ATIVOS !== undefined) config.marcos_ativos = String(c.MARCOS_ATIVOS).split(',').filter(Boolean);
      return copia(config);
    }
  };

  window.DemoAPI = {
    restaurar(token, uid) { sessoes[token] = uid; },
    call(body) {
      return new Promise((resolve) => {
        setTimeout(() => {
          try {
            const fn = rotas[body.action];
            if (!fn) throw new Error('Ação desconhecida: ' + body.action);
            if (body.action === 'login') return resolve({ ok: true, data: fn(body) });
            const u = U.find((x) => x.id === sessoes[body.token]);
            if (!u) return resolve({ ok: false, error: 'SESSAO_EXPIRADA', auth: true });
            if (body.action.indexOf('admin.') === 0 && u.perfil !== 'coordenador') throw new Error('Acesso restrito ao coordenador.');
            resolve({ ok: true, data: fn(body, u) });
          } catch (e) { resolve({ ok: false, error: e.message }); }
        }, 250 + Math.random() * 250);
      });
    }
  };
})();
