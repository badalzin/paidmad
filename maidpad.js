// ==UserScript==
// @name         MaidPad Panel
// @namespace    maidpad-panel
// @version      2.0
// @match        https://www.maidpad.com/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  // Remove old panel if exists (force update)
  const oldToggle = document.getElementById('mp-toggle');
  const oldRoot = document.getElementById('mp-root');
  if (oldToggle) oldToggle.remove();
  if (oldRoot) oldRoot.remove();

  const style = document.createElement('style');
  style.textContent = `
#mp-toggle{position:fixed;bottom:24px;right:24px;z-index:99998;width:48px;height:48px;border-radius:50%;background:#5be49b;border:none;cursor:pointer;font-size:22px;box-shadow:0 4px 16px rgba(91,228,155,0.4);display:flex;align-items:center;justify-content:center;transition:transform .2s;}
#mp-toggle:hover{transform:scale(1.1);}
#mp-root{position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,0.6);backdrop-filter:blur(4px);display:none;align-items:flex-start;justify-content:center;padding:20px;overflow-y:auto;}
#mp-root.open{display:flex;}
#mp-panel{background:#0f1117;border:1px solid #252a38;border-radius:16px;width:100%;max-width:1200px;padding:28px;font-family:-apple-system,BlinkMacSystemFont,sans-serif;font-size:14px;color:#e8eaf0;position:relative;}
#mp-x{position:absolute;top:16px;right:16px;background:none;border:1px solid #252a38;color:#8b92a8;width:32px;height:32px;border-radius:8px;cursor:pointer;font-size:16px;}
#mp-x:hover{border-color:#5be49b;color:#5be49b;}
.mh{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid #252a38;}
.mb{display:flex;align-items:center;gap:10px;}
.mbi{width:32px;height:32px;background:rgba(91,228,155,0.12);border:1px solid #5be49b;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:16px;}
.mbn{font-size:15px;font-weight:600;}
.mbs{font-size:12px;color:#8b92a8;}
.mst{display:flex;align-items:center;gap:10px;}
.mpp{width:8px;height:8px;border-radius:50%;background:#5be49b;animation:mppa 2s infinite;}
.mpp.off{background:#5a6278;animation:none;}
@keyframes mppa{0%{box-shadow:0 0 0 0 rgba(91,228,155,0.4)}70%{box-shadow:0 0 0 6px rgba(91,228,155,0)}100%{box-shadow:0 0 0 0 rgba(91,228,155,0)}}
.mt{font-size:11px;color:#8b92a8;font-family:monospace;}
.mbtn{background:none;border:1px solid #252a38;color:#8b92a8;padding:5px 12px;border-radius:6px;cursor:pointer;font-size:12px;}
.mbtn:hover{border-color:#5be49b;color:#5be49b;}
.mg{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px;margin-bottom:14px;}
.mw{grid-template-columns:1fr;}
.mhalf{grid-template-columns:1fr 1fr;}
.mc{background:#181c27;border:1px solid #252a38;border-radius:12px;padding:18px;}
.ml{font-size:11px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:#8b92a8;margin-bottom:12px;display:flex;align-items:center;justify-content:space-between;}
.ml a{color:#8b92a8;text-decoration:none;font-size:11px;}
.ml a:hover{color:#5be49b;}
.mbig{font-family:monospace;font-size:40px;font-weight:500;line-height:1;margin-bottom:4px;}
.msub{font-size:12px;color:#8b92a8;}
.mrow{display:flex;gap:20px;flex-wrap:wrap;margin-top:12px;}
.mv{font-family:monospace;font-size:20px;font-weight:500;}
.mlb{font-size:11px;color:#8b92a8;}
.mbucs{display:flex;gap:12px;flex-wrap:wrap;margin-top:4px;}
.mbuc{flex:1;min-width:80px;padding:12px;border-radius:8px;border:1px solid #252a38;}
.mbuc.ov{border-color:rgba(255,95,95,.3);background:rgba(255,95,95,.07);}
.mbuc.sn{border-color:rgba(245,166,35,.3);background:rgba(245,166,35,.07);}
.mbuc.lt{border-color:rgba(91,228,155,.2);background:rgba(91,228,155,.05);}
.mbamt{font-family:monospace;font-size:22px;font-weight:500;}
.mbuc.ov .mbamt{color:#ff5f5f;}
.mbuc.sn .mbamt{color:#f5a623;}
.mbuc.lt .mbamt{color:#5be49b;}
.mblbl{font-size:11px;color:#8b92a8;margin-top:2px;}
.mfeed{display:flex;flex-direction:column;max-height:320px;overflow-y:auto;}
.mact{display:flex;gap:10px;padding:9px 0;border-bottom:1px solid #252a38;}
.mact:last-child{border-bottom:none;}
.maico{width:28px;height:28px;border-radius:6px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:13px;}
.maico.start{background:rgba(91,228,155,.12);}
.maico.route{background:rgba(91,180,228,.12);}
.maico.done{background:rgba(91,228,155,.2);}
.maico.other{background:#181c27;border:1px solid #252a38;}
.mamain{font-size:13px;}
.matime{font-size:11px;color:#8b92a8;font-family:monospace;}
.mscr{font-family:monospace;font-size:48px;font-weight:500;line-height:1;margin-bottom:4px;}
.mstars{color:#f5a623;font-size:18px;letter-spacing:2px;}
.mdjg{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:8px;margin-top:4px;}
.mjc{background:#0f1117;border:1px solid #252a38;border-radius:8px;padding:10px;}
.mjtime{font-family:monospace;font-size:11px;color:#8b92a8;}
.mjn{font-size:13px;font-weight:500;margin:2px 0;}
.mjtg{display:flex;gap:5px;flex-wrap:wrap;margin-top:5px;}
.mtag{font-size:10px;padding:2px 7px;border-radius:10px;font-weight:500;border:1px solid #252a38;color:#8b92a8;}
.mtag.rec{border-color:rgba(91,228,155,.3);color:#5be49b;}
.mtag.onc{border-color:rgba(245,166,35,.3);color:#f5a623;}
.mlinks{display:flex;flex-wrap:wrap;gap:8px;}
.mlink{display:flex;align-items:center;gap:6px;background:#0f1117;border:1px solid #252a38;color:#e8eaf0;text-decoration:none;padding:7px 13px;border-radius:8px;font-size:13px;}
.mlink:hover{border-color:#5be49b;color:#5be49b;}
.merr{color:#ff5f5f;font-size:12px;font-family:monospace;}
.msk{background:linear-gradient(90deg,#252a38 25%,#181c27 50%,#252a38 75%);background-size:200% 100%;animation:msh 1.5s infinite;border-radius:4px;height:36px;}
@keyframes msh{0%{background-position:200% 0}100%{background-position:-200% 0}}
@media(max-width:700px){.mhalf{grid-template-columns:1fr}}
  `;
  document.head.appendChild(style);

  const btn = document.createElement('button');
  btn.id = 'mp-toggle';
  btn.textContent = '🧹';
  document.body.appendChild(btn);

  const ov = document.createElement('div');
  ov.id = 'mp-root';
  ov.innerHTML = `<div id="mp-panel">
  <button id="mp-x">✕</button>
  <div class="mh">
    <div class="mb">
      <div class="mbi">🧹</div>
      <div><div class="mbn">Paula's Cleaning Squad</div><div class="mbs">MaidPad Dashboard</div></div>
    </div>
    <div class="mst">
      <div class="mpp off" id="mpp"></div>
      <span class="mt" id="mpt">—</span>
      <button class="mbtn" id="mpr">↻ Atualizar</button>
    </div>
  </div>
  <div class="mc" style="margin-bottom:14px">
    <div class="ml">Acesso rápido</div>
    <div class="mlinks">
      <a class="mlink" href="/Dashboard">📊 Dashboard</a>
      <a class="mlink" href="/Dashboard/Schedule" id="msl2">📅 Agenda</a>
      <a class="mlink" href="/Dashboard/Client">👥 Clientes</a>
      <a class="mlink" href="/Dashboard/Accounting">💰 Financeiro</a>
      <a class="mlink" href="/Dashboard/Analytics">📈 Analytics</a>
      <a class="mlink" href="/Dashboard/Job/Reviews">⭐ Avaliações</a>
      <a class="mlink" href="/Dashboard/Chat">💬 Chat</a>
    </div>
  </div>
  <div class="mg">
    <div class="mc" style="grid-column:span 2"><div class="ml">Limpezas hoje <span style="display:flex;gap:8px;align-items:center"><a href="/Dashboard/Schedule" id="msl">Agenda →</a><button id="mjo-refresh" class="mbtn" style="font-size:10px;padding:2px 8px">↻</button></span></div><div id="mjo"><div class="msk"></div></div></div>
    <div class="mc"><div class="ml">Mensagens de hoje <a href="/Dashboard/Chat">Chat →</a></div><div id="mrv"><div class="msk"></div></div></div>
    <div class="mc"><div class="ml">Atividades <a href="/Dashboard/Chat">Chat →</a></div><div class="mfeed" id="mfe"><div class="msk"></div></div></div>
  </div>
  <div class="mg mw" style="margin-bottom:14px">
    <div class="mc"><div class="ml">Não pagos — ontem <a href="/Dashboard/Accounting">Financeiro →</a></div><div id="mpa"><div class="msk"></div></div></div>
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px">
    <div style="display:flex;flex-direction:column;gap:14px">
      <div class="mc"><div class="ml">Hoje</div><div id="mdy"><div class="msk"></div></div></div>
      <div class="mc"><div class="ml">Clientes atrasados <a href="/Dashboard/Client">Ver todos →</a></div><div class="mfeed" id="mp-overdue"><div class="msk"></div></div></div>
    </div>
    <div style="display:flex;flex-direction:column;gap:14px">
      <div class="mc"><div class="ml">Chat do dia <a href="/Dashboard/Chat" style="color:#8b92a8;font-size:11px">Abrir →</a></div><div id="mp-chat-day"><div class="msk"></div></div></div>
    </div>
  </div>
  <div class="mc" style="margin-bottom:14px">
    <div class="ml">Google Sheets <a href="https://docs.google.com/spreadsheets/d/1sdUF1hL44S6i05LEkeGYd1uU9qqJm_etWgJVzjkwZV8/edit" target="_blank">Abrir planilha →</a></div>
    <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
      <button id="mp-export-btn" class="mbtn" style="padding:8px 16px;font-size:13px;border-color:#5be49b;color:#5be49b;" onclick="exportReviewsToSheets()">📤 Exportar Avaliações</button>
      <span id="mp-export-status" style="font-size:12px;color:#8b92a8;"></span>
    </div>
  </div>
</div>`;
  document.body.appendChild(ov);

  let open = false, fetched = false, timer, acts = [];
  const gi = id => document.getElementById(id);
  const fmt = v => (v == null || isNaN(v)) ? '—' : '$' + Number(v).toLocaleString('en-US', { minimumFractionDigits: 0 });
  const n = v => (v == null || v === '') ? '—' : v;

  function rC(d) {
    const s = d.Summary || {};
    return `<div class="mbig">${n(s.Total)}</div><div class="msub">clientes totais</div>
    <div class="mrow">
      <div><div class="mv">${n(s.Recurring)}</div><div class="mlb">recorrentes</div></div>
      <div><div class="mv">${n(s.OneTime)}</div><div class="mlb">avulsos</div></div>
      <div><div class="mv">${n(s.NoJob)}</div><div class="mlb">sem job</div></div>
    </div>`;
  }

  function rJ(d) {
    return `<div id="mjo-day"><div class="msk"></div></div>`;
  }

  async function fetchDayJobsAndSalary() {
    const el = gi('mjo-day');
    if (!el) return;
    try {
      const today = new Date();
      const date = `${today.getMonth()+1}-${today.getDate()}-${today.getFullYear()}`;
      const sched = await fetch(`/Dashboard/Schedule/GetDaySchedule?date=${date}`, {credentials:'include'}).then(r=>r.json());
      const teams = (sched.Day?.Teams || []).filter(t => t.Number >= 1 && t.Number <= 20 && t.Jobs?.length);

      let totalJobs = 0;
      let totalSalary = 0;
      let totalRevenue = 0;
      const seenCleaners = new Set();
      const allJobDetails = [];

      // PayBy: 5=Diária, 7=Mensal, 8=Porcentagem Fixa, null=Padrão Empresa
      await Promise.all(teams.map(async team => {
        const jobs = (team.Jobs || []).filter(j => !j.Cancelled);
        totalJobs += jobs.length;

        // Buscar JobCharge de cada job
        const jobCharges = await Promise.all(jobs.map(async job => {
          try {
            const det = await fetch(`/Dashboard/Job/GetJobDetailsJSON?id=${job.ID}&jobIndex=0`, {credentials:'include'}).then(r=>r.json());
            const charge = parseFloat(det?.JobCharge) || 0;
            totalRevenue += charge;
            allJobDetails.push({name: job.DisplayName || job.ClientName || '—', charge});
            return charge;
          } catch(e) { allJobDetails.push({name: job.DisplayName || job.ClientName || '—', charge:0}); return 0; }
        }));
        const teamRevenue = jobCharges.reduce((a,b) => a+b, 0);

        await Promise.all((team.Cleaners || []).map(async cleaner => {
          if (!cleaner.ID || seenCleaners.has(cleaner.ID)) return;
          seenCleaners.add(cleaner.ID);
          try {
            const pay = await fetch(`/Dashboard/Accounting/GetPayrollPaymentMode?ID=${cleaner.ID}`, {credentials:'include'}).then(r=>r.json());
            const amount = parseFloat(pay?.PaymentAmount) || 0;
            const payBy = pay?.PayBy;
            if (payBy === 8) {
              // Porcentagem fixa: amount é % aplicada à receita da equipe dividida pelo nº de cleaners
              const cleanerCount = (team.Cleaners || []).length || 1;
              totalSalary += (amount / 100) * (teamRevenue / cleanerCount);
            } else if (payBy === 5) {
              // Diária: valor fixo por dia
              totalSalary += amount;
            }
            // PayBy 7 = Mensal (não conta no diário), null = Padrão Empresa (sem info)
          } catch(e) {}
        }));
      }));

      const profit = totalRevenue - totalSalary;
      const profitColor = profit >= 0 ? '#5be49b' : '#ff5f5f';
      const fmtUSD = v => '$' + v.toLocaleString('en-US',{minimumFractionDigits:0,maximumFractionDigits:0});

      // Linha de totais
      // Preservar ajuste existente
      const savedAdj = parseFloat(localStorage.getItem('mjo_salary_adj') || '0') || 0;
      const adjSalary = totalSalary + savedAdj;
      const adjProfit = totalRevenue - adjSalary;
      const adjProfitColor = adjProfit >= 0 ? '#5be49b' : '#ff5f5f';

      // Lista de clientes
      const clientsHtml = allJobDetails.map(j =>
        `<div style="display:flex;justify-content:space-between;align-items:center;padding:5px 0;border-bottom:1px solid #1a1f2e;">
          <span style="font-size:12px;color:#e8eaf0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:65%">${j.name}</span>
          <span style="font-family:monospace;font-size:12px;color:#5be49b;flex-shrink:0">${j.charge > 0 ? fmtUSD(j.charge) : '—'}</span>
        </div>`
      ).join('');

      el.innerHTML = `
        <div style="display:flex;gap:16px;flex-wrap:wrap;padding:10px 0;border-bottom:1px solid #252a38;margin-bottom:8px;align-items:flex-end;">
          <div><div style="font-family:monospace;font-size:18px;font-weight:500;color:#e8eaf0">${totalJobs}</div><div style="font-size:10px;color:#8b92a8">limpezas</div></div>
          <div><div style="font-family:monospace;font-size:18px;font-weight:500;color:#5bb4e4">${fmtUSD(totalRevenue)}</div><div style="font-size:10px;color:#8b92a8">receita</div></div>
          <div>
            <div style="font-family:monospace;font-size:18px;font-weight:500;color:#f5a623" id="mjo-sal-display">${fmtUSD(adjSalary)}</div>
            <div style="font-size:10px;color:#8b92a8;display:flex;gap:4px;align-items:center;">
              sal. + <input id="mjo-adj" type="number" value="${savedAdj}" step="10"
                style="width:60px;background:#1a1f2e;border:1px solid #2e3447;border-radius:4px;color:#f5a623;font-size:11px;padding:1px 4px;font-family:monospace;">
            </div>
          </div>
          <div><div style="font-family:monospace;font-size:18px;font-weight:500;color:${adjProfitColor}" id="mjo-profit-display">${adjProfit>=0?'+':''}${fmtUSD(adjProfit)}</div><div style="font-size:10px;color:#8b92a8">lucro</div></div>
        </div>
        <div style="max-height:220px;overflow-y:auto;">${clientsHtml}</div>`;

      // Listener do ajuste (recalcula sem recarregar)
      const adjInput = gi('mjo-adj');
      if (adjInput) adjInput.addEventListener('input', () => {
        const adj = parseFloat(adjInput.value) || 0;
        localStorage.setItem('mjo_salary_adj', adj);
        const newSal = totalSalary + adj;
        const newProfit = totalRevenue - newSal;
        const sd = gi('mjo-sal-display'); if (sd) sd.textContent = fmtUSD(newSal);
        const pd = gi('mjo-profit-display');
        if (pd) { pd.textContent = (newProfit>=0?'+':'') + fmtUSD(newProfit); pd.style.color = newProfit>=0?'#5be49b':'#ff5f5f'; }
      });
    } catch(e) {
      const el2 = gi('mjo-day'); if (el2) el2.textContent = '';
    }
  }

  function rR(d) {
    return `<div id="mrv-badge" style="display:none"></div><div id="mrv-msgs" style="font-size:11px;color:#8b92a8;">carregando msgs...</div>`;
  }

  async function fetchTodayClientMsgs() {
    const el = gi('mrv-msgs');
    if (!el) return;
    try {
      const edt = new Date(new Date().toLocaleString('en-US', {timeZone:'America/New_York'}));
      const dateStr = `${edt.getMonth()+1}-${edt.getDate()}-${edt.getFullYear()}`;

      // Buscar clientes com limpeza hoje
      const sched = await fetch(`/Dashboard/Schedule/GetDaySchedule?date=${dateStr}`, {credentials:'include'}).then(r=>r.json());
      const todayClients = new Set(
        (sched.Day?.Teams || []).filter(t=>t.Number>=1&&t.Number<=20)
          .flatMap(t=>(t.Jobs||[]).filter(j=>!j.Cancelled).flatMap(j=>[
            j.ClientName?.trim().toLowerCase(),
            j.DisplayName?.trim().toLowerCase()
          ].filter(Boolean)))
      );
      if (!todayClients.size) { el.textContent = ''; return; }

      // Buscar chats recentes
      const chatRes = await fetch('/Dashboard/Chat/GetChatsFromDate?type=2&date=&search=&newerChats=false&pageSize=200', {credentials:'include'}).then(r=>r.json());
      const chats = (chatRes.Chats || []).filter(c => todayClients.has(c.Title?.trim().toLowerCase()));
      if (!chats.length) { el.textContent = ''; return; }

      // Traduzir via Google Translate gratuito
      async function translate(text) {
        try {
          const url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=pt&dt=t&q=' + encodeURIComponent(text.slice(0,300));
          const r = await fetch(url).then(r=>r.json());
          return r[0]?.map(s=>s[0]).join('') || text;
        } catch(e) { return text; }
      }

      // Filtrar só msgs reais do cliente (não MaidPad, não reações "Liked")
      const clientChats = chats.filter(c => {
        const sender = (c.LastMessageSender || '').toLowerCase();
        const msg = c.LastMessage || '';
        if (sender === 'maidpad') return false;
        if (msg.startsWith('Liked “') || msg.startsWith('Liked "')) return false;
        return true;
      });
      if (!clientChats.length) { el.textContent = ''; return; }

      // Montar lista (máx 5)
      const items = await Promise.all(clientChats.slice(0,5).map(async c => {
        const msgRaw = c.LastMessage || '';
        const translated = msgRaw ? await translate(msgRaw) : '';
        const dateEDT = new Date(new Date(c.LastMessageDate.replace(' ','T')+'Z').toLocaleString('en-US',{timeZone:'America/New_York'}));
        const timeStr = dateEDT.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',hour12:true});
        return {name: c.Title, translated, timeStr, unread: c.Unread};
      }));

      el.innerHTML = items.map(i => `
        <div style="padding:6px 0;border-bottom:1px solid #1a1f2e;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2px;">
            <span style="color:#e8eaf0;font-weight:600;font-size:11px">${i.name}</span>
            <span style="color:#5a6278;font-size:10px">${i.timeStr}${i.unread?` <span style="color:#ff5f5f">●</span>`:''}</span>
          </div>
          <div style="color:#b0b8cc;font-size:11px;line-height:1.4">${i.translated||'<em>sem mensagem</em>'}</div>
        </div>`).join('');
    } catch(e) {
      const el2 = gi('mrv-msgs'); if (el2) el2.textContent = '';
    }
  }

    async function checkUnexportedReviews() {
    try {
      const toDate = new Date();
      const fromDate = new Date(); fromDate.setMonth(fromDate.getMonth() - 1);
      const fmtD = d => (d.getMonth()+1) + '/' + d.getDate() + '/' + d.getFullYear();
      const reviewsRes = await fetch('/Dashboard/Job/GetReviews?fromDate=' + fmtD(fromDate) + '&toDate=' + fmtD(toDate) + '&reviewed=true', {credentials:'include'}).then(r=>r.json());
      const jobs = reviewsRes.Jobs || [];
      if (!jobs.length) { setBadge(0); return; }
      const apiRes = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          model: 'claude-sonnet-4-6', max_tokens: 500,
          system: 'Leia a aba "feedbacks" da planilha ID ' + SHEET_ID + '. Retorne APENAS JSON sem markdown: {"lastDate": "M/D/YYYY"} ou {"lastDate": null} se vazia. Coluna B tem datas, linha 1 é cabeçalho.',
          messages: [{role:'user', content:'Qual a última data na coluna B?'}],
          mcp_servers: [{type:'url', url:'https://sheets.googleapis.com/mcp/v1', name:'google-sheets-mcp'}]
        })
      }).then(r=>r.json());
      const txt = (apiRes.content?.find(c=>c.type==='text')?.text || '{}').replace(/```json|```/g,'').trim();
      let lastDate = null;
      try { lastDate = JSON.parse(txt).lastDate; } catch(e) {}
      if (!lastDate) { setBadge(jobs.length); return; }
      const last = new Date(lastDate);
      const newOnes = jobs.filter(j => {
        const parts = j.JobDate.split('/');
        let y = parts[2]; if (y.length===2) y='20'+y;
        return new Date(parseInt(y), parseInt(parts[0])-1, parseInt(parts[1])) > last;
      });
      setBadge(newOnes.length);
    } catch(e) {
      const b = gi('mrv-badge'); if (b) b.textContent = '';
    }
  }

  function setBadge(count) {
    const b = gi('mrv-badge');
    if (!b) return;
    if (count > 0) {
      b.innerHTML = `<span style="background:rgba(245,166,35,.15);border:1px solid rgba(245,166,35,.4);color:#f5a623;padding:3px 8px;border-radius:10px;font-weight:600;">⚠️ ${count} não exportada${count>1?'s':''}</span>`;
    } else {
      b.innerHTML = `<span style="color:#5be49b;">✓ planilha atualizada</span>`;
    }
  }

  function rP(d) {
    return '<div class="msk"></div>'; // preenchido por fetchUnpaidYesterday
  }

  async function fetchUnpaidYesterday() {
    const el = gi('mpa');
    if (!el) return;
    try {
      const edt = new Date(new Date().toLocaleString('en-US', {timeZone:'America/New_York'}));
      edt.setDate(edt.getDate() - 1);
      const dateStr = `${edt.getMonth()+1}-${edt.getDate()}-${edt.getFullYear()}`;
      const fromDate = `${edt.getMonth()+1}/${edt.getDate()}/${edt.getFullYear()-1}`;
      const toDate = `${edt.getMonth()+1}/${edt.getDate()}/${edt.getFullYear()}`;

      const sched = await fetch(`/Dashboard/Schedule/GetDaySchedule?date=${dateStr}`, {credentials:'include'}).then(r=>r.json());
      const jobs = (sched.Day?.Teams || []).filter(t=>t.Number>=1&&t.Number<=20).flatMap(t=>(t.Jobs||[]).filter(j=>!j.Cancelled));

      // Buscar detalhes de todos os jobs
      const details = await Promise.all(jobs.map(j =>
        fetch(`/Dashboard/Job/GetJobDetailsJSON?id=${j.ID}&jobIndex=0`, {credentials:'include'}).then(r=>r.json())
      ));

      const unpaid = details.filter(d => !d.JobPaymentDate);
      if (!unpaid.length) { el.innerHTML = '<div class="msub" style="color:#5be49b">✓ Todos pagos</div>'; return; }

      // Para cada não pago, buscar os 2 últimos métodos de pagamento
      const rows = await Promise.all(unpaid.map(async d => {
        let lastMethods = [];
        try {
          const hist = await fetch(`/Dashboard/Job/GetReviews?fromDate=${fromDate}&toDate=${toDate}&reviewed=false&clientID=${d.ClientID}`, {credentials:'include'}).then(r=>r.json());
          const prevJobs = (hist.Jobs || []).filter(j => j.JobID !== d.ID).slice(-3);
          const prevDetails = await Promise.all(prevJobs.map(j =>
            fetch(`/Dashboard/Job/GetJobDetailsJSON?id=${j.JobID}&jobIndex=0`, {credentials:'include'}).then(r=>r.json())
          ));
          lastMethods = prevDetails.filter(pd => pd.JobPaymentMethod).map(pd => pd.JobPaymentMethod).slice(-2);
        } catch(e) {}
        return { name: d.ClientName, charge: d.JobCharge, lastMethods };
      }));

      const methodColors = {'Zelle':'#5bb4e4','Cash':'#5be49b','Check':'#f5a623','Credit Card':'#9b8af5','Card':'#9b8af5'};
      el.innerHTML = `<div style="display:flex;flex-direction:column;gap:4px;max-height:200px;overflow-y:auto;">` +
        rows.map(r => {
          const tags = r.lastMethods.length
            ? r.lastMethods.map(m => `<span style="font-size:10px;padding:1px 7px;border-radius:8px;background:rgba(91,180,228,.12);border:1px solid rgba(91,180,228,.3);color:${methodColors[m]||'#8b92a8'}">${m}</span>`).join('')
            : '<span style="font-size:10px;color:#5a6278">sem histórico</span>';
          return `<div style="display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid #1a1f2e;">
            <span style="font-size:12px;color:#e8eaf0;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${r.name}</span>
            <div style="display:flex;gap:4px;align-items:center;flex-shrink:0">${tags}</div>
            <span style="font-family:monospace;font-size:12px;color:#ff5f5f;flex-shrink:0">$${r.charge}</span>
          </div>`;
        }).join('') +
        `</div>`;
    } catch(e) {
      const el2 = gi('mpa'); if (el2) el2.innerHTML = `<div class="merr">Erro: ${e.message}</div>`;
    }
  }

  function rCh(d) {
    const s = d.Summary || d || {};
    const u = s.Unread || s.UnreadCount || s.Count || 0;
    return u > 0
      ? `<div class="mbig" style="color:#ff5f5f">${u}</div><div class="msub">não lidas</div>`
      : `<div class="mbig">0</div><div class="msub">sem mensagens</div>`;
  }

  const ACT = {
    1: { icon: '📋', cls: 'other', lbl: 'Agendado' },
    2: { icon: '🚗', cls: 'route', lbl: 'A caminho' },
    3: { icon: '🧹', cls: 'start', lbl: 'Iniciado'  },
    4: { icon: '✅', cls: 'done',  lbl: 'Concluído' },
    5: { icon: '💬', cls: 'other', lbl: 'Chat'      },
    6: { icon: '✔️', cls: 'done',  lbl: 'Finalizado'},
  };

  function rA(item) {
    const t = ACT[item.Type || item.type] || { icon: '•', cls: 'other', lbl: 'Atividade' };
    const time = item.Timestamp || '';
    const raw = item.Description || '';
    const tmp = document.createElement('div');
    tmp.innerHTML = raw;
    const desc = tmp.textContent || tmp.innerText || raw.replace(/<[^>]+>/g,'') || '—';
    return `<div class="mact">
      <div class="maico ${t.cls}">${t.icon}</div>
      <div>
        <div class="mamain">${desc}</div>
        ${time ? `<div class="matime">${time}</div>` : ''}
      </div>
    </div>`;
  }

  function renderFeed() {
    const el = gi('mfe');
    if (!el) return;
    el.innerHTML = acts.length ? acts.slice(0, 30).map(rA).join('') : '<div class="msub">Sem atividades</div>';
  }

  async function fetchAll() {
    fetched = true;
    gi('mpp').className = 'mpp off';
    const today = new Date();
    const ymd = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;
    const sl = gi('msl'); if (sl) sl.href = `/Dashboard/Schedule/Day/${ymd}`;
    const sl2 = gi('msl2'); if (sl2) sl2.href = `/Dashboard/Schedule/Day/${ymd}`;

    const calls = [
      ['/Dashboard/Company/GetJobSummary',     'mjo', rJ],

    ];

    await Promise.all(calls.map(async ([path, id, render]) => {
      try {
        const r = await fetch(path, { credentials: 'include' });
        if (!r.ok) throw new Error(r.status);
        const d = await r.json();
        const el = gi(id); if (el) el.innerHTML = render(d);
      } catch (e) {
        const el = gi(id); if (el) el.innerHTML = `<div class="merr">Erro: ${e.message}</div>`;
      }
    }));

    // Day schedule via GetDaySchedule API
    fetchDaySchedule();

    // Check unexported reviews
    checkUnexportedReviews();

    // Today client msgs
    fetchTodayClientMsgs();

    // Unpaid jobs yesterday
    fetchUnpaidYesterday();

    // Day jobs + salary (só carrega uma vez)
    if (!window._mjoLoaded) { window._mjoLoaded = true; fetchDayJobsAndSalary(); }

    // Activities
    try {
      const r = await fetch('/Dashboard/Home/GetActivities?types=2&types=3&types=6&types=1&types=5&page=0', { credentials: 'include' });
      if (!r.ok) throw new Error(r.status);
      const d = await r.json();
      console.log('[MaidPad Panel] Activities:', JSON.stringify(d).slice(0, 500));
      acts = d?.Activities || d?.activities || (Array.isArray(d) ? d : []);
      if (!Array.isArray(acts)) acts = [];
      renderFeed();
    } catch (e) {
      const el = gi('mfe'); if (el) el.innerHTML = `<div class="merr">Erro: ${e.message}</div>`;
    }

    gi('mpp').className = 'mpp';
    gi('mpt').textContent = 'Atualizado ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    fetchOverdueClients();
    fetchChatDay();
    clearTimeout(timer);
    timer = setTimeout(fetchAll, 30000);
  }

  document.addEventListener('click', e => {
    if (e.target.id === 'mjo-refresh') { window._mjoLoaded = false; fetchDayJobsAndSalary(); }
  });

  btn.addEventListener('click', () => {
    open = !open;
    ov.classList.toggle('open', open);
    if (open && !fetched) fetchAll();
  });
  ov.addEventListener('click', e => { if (e.target === ov) { open = false; ov.classList.remove('open'); } });
  gi('mp-x').addEventListener('click', () => { open = false; ov.classList.remove('open'); });
  gi('mpr').addEventListener('click', fetchAll);

  function parseT(str) {
    if (!str) return null;
    const m = str.trim().match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!m) return null;
    let h = parseInt(m[1]), min = parseInt(m[2]);
    if (m[3].toUpperCase()==='PM' && h!==12) h+=12;
    if (m[3].toUpperCase()==='AM' && h===12) h=0;
    return h*60+min;
  }

  function fmtLate(min) {
    if (min === null || min <= 5) return '';
    const label = min < 60 ? `${min}min` : `${Math.floor(min/60)}h${min%60>0?min%60+'min':''}`;
    return label;
  }

  async function fetchActivities() {
    const allActs = [];
    let page = 0, hasMore = true;
    while (hasMore && page < 10) {
      const r = await fetch(`/Dashboard/Home/GetActivities?types=2&types=3&types=6&types=1&types=5&page=${page}`, {credentials:'include'});
      if (!r.ok) break;
      const d = await r.json();
      const parsed = (d.Activities||[]).map(a => {
        const tmp = document.createElement('div'); tmp.innerHTML = a.Description;
        const b = [...tmp.querySelectorAll('b')].map(x=>x.textContent.trim());
        return { time: a.Timestamp?.trim(), client: b[1]?.toLowerCase().trim(), action: b[2] };
      });
      allActs.push(...parsed);
      hasMore = d.MorePages;
      page++;
    }
    const realStart = {}, realEnd = {};
    allActs.forEach(a => {
      if (!a.client || !a.time) return;
      if (a.action === 'Iniciado' && !realStart[a.client]) realStart[a.client] = a.time;
      if (a.action === 'Concluído' && !realEnd[a.client]) realEnd[a.client] = a.time;
    });
    return { realStart, realEnd };
  }

  async function fetchDaySchedule() {
    const dEl = gi('mdy');
    if (!dEl) return;
    try {
      const today = new Date();
      const date = `${today.getMonth()+1}-${today.getDate()}-${today.getFullYear()}`;

      // Fetch all APIs in parallel
      const [schedRes, summaryRes, { realStart, realEnd }] = await Promise.all([
        fetch(`/Dashboard/Schedule/GetDaySchedule?date=${date}`, { credentials: 'include' }),
        fetch('/Dashboard/Home/GetDaySummaryPartialNew?dayShift=0', { credentials: 'include' }),
        fetchActivities()
      ]);

      const schedData = await schedRes.json();
      const summaryHtml = await summaryRes.text();

      // Parse summary HTML for scheduled time + status per client name
      const tmp = document.createElement('div');
      tmp.innerHTML = summaryHtml;
      const jobMap = {};
      tmp.querySelectorAll('.job').forEach(j => {
        const name = j.querySelector('.name')?.textContent?.trim();
        const time = j.querySelector('.time span')?.textContent?.trim();
        const steps = [...j.querySelectorAll('.step')].map(s => s.className);
        const onway  = steps.some(s => s.includes('onourway') && s.includes('done'));
        const started = steps.some(s => s.includes('started') && s.includes('done'));
        const finished = steps.some(s => s.includes('finished') && s.includes('done'));
        if (name) jobMap[name.toLowerCase()] = { time, onway, started, finished };
      });

      const teams = (schedData.Day && schedData.Day.Teams) || [];
      const activeTeams = teams.filter(t => t.Number > 0 && t.Jobs && t.Jobs.length > 0);

      if (!activeTeams.length) {
        dEl.innerHTML = '<div class="msub">Nenhuma equipe com limpezas hoje</div>';
        return;
      }

      dEl.innerHTML = activeTeams.map(team => {
        const name = team.Name || `Equipe ${team.Number}`;
        const cleaners = (team.Cleaners || []);
        const cleanerNames = cleaners.map(c => c.Name ? c.Name.split(' ')[0] : '').filter(Boolean).join(', ');
        const jobs = team.Jobs || [];

        // Merge status from summary HTML + real times from activities
        const enriched = jobs.map(j => {
          const key = (j.DisplayName || j.ClientName || '').toLowerCase().trim();
          const s = jobMap[key] || {};
          const sched = parseT(s.time);
          const actStart = realStart[key];
          const actEnd = realEnd[key];
          const startMin = parseT(actStart);
          const endMin = parseT(actEnd);
          const lateStart = (sched != null && startMin != null) ? startMin - sched : null;
          // For ongoing: compare scheduled start to now
          // Use EDT (Florida) time for comparison - system times are all EDT
          const nowEDT = new Date(new Date().toLocaleString('en-US', {timeZone:'America/New_York'}));
          const nowMin = nowEDT.getHours()*60 + nowEDT.getMinutes();
          const lateNow = (sched != null && !s.finished) ? nowMin - sched : null;
          return {
            ...j,
            onway: s.onway || j.OnOurWay,
            started: s.started || j.Started,
            finished: s.finished || j.Finished,
            schedTime: s.time,
            realStart: actStart,
            realEnd: actEnd,
            lateStart,
            lateNow
          };
        });

        const done    = enriched.filter(j => j.finished && !j.Cancelled).length;
        const started = enriched.filter(j => j.started && !j.finished && !j.Cancelled).length;
        const onway   = enriched.filter(j => j.onway && !j.started && !j.Cancelled).length;
        const pending = enriched.filter(j => !j.onway && !j.started && !j.finished && !j.Cancelled).length;
        const total   = enriched.filter(j => !j.Cancelled).length;

        return `<div style="background:#0f1117;border:1px solid #252a38;border-radius:10px;padding:12px;margin-bottom:10px;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
            <div style="font-size:13px;font-weight:500;color:#e8eaf0;">${name}</div>
            <div style="font-size:11px;color:#8b92a8;">${cleanerNames}</div>
          </div>
          <div style="display:flex;gap:6px;margin-bottom:8px;flex-wrap:wrap;">
            ${done>0?`<span style="font-size:11px;padding:2px 8px;border-radius:10px;background:rgba(91,228,155,.15);color:#5be49b;border:1px solid rgba(91,228,155,.3)">✓ ${done}/${total}</span>`:''}
            ${started>0?`<span style="font-size:11px;padding:2px 8px;border-radius:10px;background:rgba(245,166,35,.15);color:#f5a623;border:1px solid rgba(245,166,35,.3)">🧹 ${started} em andamento</span>`:''}
            ${onway>0?`<span style="font-size:11px;padding:2px 8px;border-radius:10px;background:rgba(91,180,228,.15);color:#5bb4e4;border:1px solid rgba(91,180,228,.3)">🚗 ${onway} a caminho</span>`:''}
            ${pending>0?`<span style="font-size:11px;padding:2px 8px;border-radius:10px;background:rgba(90,98,120,.2);color:#8b92a8;border:1px solid #252a38">⏳ ${pending} pendentes</span>`:''}
          </div>
          <div style="display:flex;flex-direction:column;gap:4px;">
            ${enriched.map(j => {
              if (j.Cancelled) return `<div style="display:flex;align-items:center;gap:8px;padding:5px 8px;border-radius:6px;background:#181c27;opacity:.5;">
                <span style="font-size:13px">✗</span>
                <span style="font-size:12px;color:#5a6278;text-decoration:line-through">${j.DisplayName||j.ClientName}</span>
              </div>`;
              const status = j.finished ? 'done' : j.started ? 'started' : j.onway ? 'onway' : 'pending';
              const ic = j.finished ? '✅' : j.started ? '🧹' : j.onway ? '🚗' : '⏳';
              const bc = j.finished ? 'rgba(91,228,155,.08)' : j.started ? 'rgba(245,166,35,.08)' : j.onway ? 'rgba(91,180,228,.08)' : '#181c27';
              const tc = j.finished ? '#5be49b' : j.started ? '#f5a623' : j.onway ? '#5bb4e4' : '#8b92a8';
              // Late calculation
              let lateHtml = '';
              if (j.finished && j.lateStart !== null) {
                const l = fmtLate(j.lateStart);
                if (l) lateHtml = `<span style="font-size:10px;padding:1px 6px;border-radius:8px;background:rgba(255,95,95,.15);color:#ff5f5f;border:1px solid rgba(255,95,95,.3);flex-shrink:0">+${l}</span>`;
              } else if (!j.finished && j.lateNow > 5) {
                const l = fmtLate(j.lateNow);
                if (l) lateHtml = `<span style="font-size:10px;padding:1px 6px;border-radius:8px;background:rgba(255,95,95,.15);color:#ff5f5f;border:1px solid rgba(255,95,95,.3);flex-shrink:0">${l} atraso</span>`;
              }
              const timeDisplay = j.realStart ? `${j.schedTime||''} → ${j.realStart}` : j.schedTime || '';
              return `<div style="display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:6px;background:${bc};border:1px solid #252a38;">
                <span style="font-size:13px">${ic}</span>
                <span style="font-size:12px;font-weight:500;flex:1;color:#e8eaf0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${j.DisplayName||j.ClientName}</span>
                ${timeDisplay?`<span style="font-size:11px;color:${tc};font-family:monospace;flex-shrink:0">${timeDisplay}</span>`:''}
                ${lateHtml}
              </div>`;
            }).join('')}
          </div>
        </div>`;
      }).join('');
    } catch(e) {
      const dEl = gi('mdy');
      if (dEl) dEl.innerHTML = `<div class="merr">Erro: ${e.message}</div>`;
    }
  }

  // Hook into existing SignalR
  setTimeout(() => {
    try {
      const $ = window.jQuery;
      if (!$ || !$.connection) return;
      const hub = $.connection.schedulehub;
      if (!hub) return;
      const orig = hub.client.jobUpdated;
      hub.client.jobUpdated = function (data) {
        if (orig) orig(data);
        if (data) { acts.unshift(data); if (acts.length > 50) acts.pop(); }
        if (open) renderFeed();
      };
    } catch (e) {}
  }, 3000);

// ─── Clientes sem limpeza recente ────────────────────────────────────────────
async function fetchOverdueClients() {
  try {
    const r = await fetch('/Dashboard/Client/SearchClients?search=&stages=51&pageSize=200', { credentials: 'include' });
    if (!r.ok) throw new Error(r.status);
    const d = await r.json();
    const clients = d.Clients || [];

    const today = new Date();
    const withDays = clients
      .filter(c => c.LastJobDate && c.Frequency)
      .map(c => {
        const parts = c.LastJobDate.split('/'); const last = new Date(parts[2], parts[0]-1, parts[1]);
        const daysSince = Math.floor((today - last) / 86400000);
        const freqDays = freqToDays(c.Frequency);
        const overdue = daysSince - freqDays;
        return { ...c, daysSince, freqDays, overdue };
      })
      .filter(c => c.overdue > 0)
      .sort((a, b) => b.overdue - a.overdue)
      .slice(0, 10);

    const el = document.getElementById('mp-overdue');
    if (!el) return;

    if (!withDays.length) {
      el.innerHTML = '<div class="msub">Nenhum cliente atrasado</div>';
      return;
    }

    el.innerHTML = withDays.map(c => {
      const dp = c.LastJobDate.split('/'); const last = new Date(dp[2],dp[0]-1,dp[1]).toLocaleDateString('pt-BR');
      const color = c.overdue > 14 ? '#ff5f5f' : c.overdue > 7 ? '#f5a623' : '#8b92a8';
      return `<div class="mact">
        <div style="width:42px;text-align:center;flex-shrink:0">
          <div style="font-family:monospace;font-size:16px;font-weight:500;color:${color}">${c.overdue}d</div>
          <div style="font-size:10px;color:#5a6278">atraso</div>
        </div>
        <div style="flex:1;min-width:0">
          <div style="font-size:13px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${c.Name} ${c.LastName || ''}</div>
          <div style="font-size:11px;color:#8b92a8">Última: ${last} · Freq: ${freqLabel(c.Frequency)}</div>
        </div>
      </div>`;
    }).join('');
  } catch (e) {
    const el = document.getElementById('mp-overdue');
    if (el) el.innerHTML = `<div class="merr">Erro: ${e.message}</div>`;
  }
}

function freqToDays(freq) {
  const map = {
    'Weekly':7,'1':7, 'BiWeekly':14,'2':14, 'EveryThreeWeeks':21,'3':21,
    'Monthly':30,'4':30, 'EveryTwoMonths':60,'5':60, 'EveryThreeMonths':90,'6':90,
  };
  return map[String(freq)] || 30;
}

function freqLabel(freq) {
  const map = {
    'Weekly':'Semanal','1':'Semanal', 'BiWeekly':'Quinzenal','2':'Quinzenal',
    'EveryThreeWeeks':'3 semanas','3':'3 semanas', 'Monthly':'Mensal','4':'Mensal',
    'EveryTwoMonths':'2 meses','5':'2 meses', 'EveryThreeMonths':'3 meses','6':'3 meses',
  };
  return map[String(freq)] || 'Freq '+freq;
}


// ─── Exportar avaliações para Google Sheets ──────────────────────────────────
const SHEET_ID = '1sdUF1hL44S6i05LEkeGYd1uU9qqJm_etWgJVzjkwZV8';
const SHEET_TAB = 'feedbacks';
const _scheduleCache = {};
const _employeeLoginMap = {"Muricley Andrade":"muricley","Adriana Emílio Fortunato":"Fortunato","Adriana Esposito":"AEsposito","Adriana Kussler da Rosa":"AdrianaK","Adriana Souza Esposito":"SouzaAdriana","Alan Machado":"Alan","Aline":"aline3","Ana Carla ORLANDO Martins":"Amartins","Ana Conrado Assis":"AAssis","Ana Paula Rodrigues":"ARodrigues","Britany Orozco":"Britany","Cássia Thomaz":"CThomaz","Catia Carvalho":"CCarvalho","Claudia":"Claudinha2024","Cleide Dias":"CDias","Daniella Nóbrega":"DNobrega","Daniely Cristina":"DCristina","Débora Lima":"DeboraLima","Debora Santana":"DSantana","Dhenifer Felix da Silva":"Dhenifer","Edislaine Dutra":"EDutra","Edriane Bispo":"EBispo","Eduardo Verlingue":"jeduardo","Elaine Sa":"ESa","Emilly Carine":"Ecarine","Emily Carine da Silva Oliveira":"EOliveir","Érica Veloso":"EVeloso","Evelyn Silva":"ESilva","Fabiana Marson":"fmarson","Financeiro":"Financeiro","Franciele Oliveira":"Fransilva","Gabriela":"Gabi2024","Gislene Vaz":"GVaz","Greicy Kelly":"GLopes","Helen":"helen2","Helen Sunamita Pereira da Silva":"Lenyanaa","Jennifer Mattos":"JMattos","Jennifer Nunes":"jnfrnunes","Juan":"Juan","Lenyana P. Miertschink":"Lenyanaa","Marcela Larrieu":"Mlarrieu","Melany Ruiz":"saritamerida","Mizzeli":"Mizzeli","Natália Silva":"natalias","Natasha Antonelli Goerck Verlingue":"Natasha","Patricia Fonseca":"PatiFonseca","Paula Gregório":"paulascleaningsquad@gmail.com","Priscila Fonseca":"PriFonseca","Raiana":"Raiana","Raiana D'Ávila Carvalho Marques":"Raiana","Rayssa Miller":"RMiller","Ruth Heinger":"RHeinger","Sara":"saritamerida","Teste teste":"badalschim","Walkiria Jota":"WJota"};

function nameToLogin(fullName) {
  if (!fullName) return null;
  // Direct match
  if (_employeeLoginMap[fullName]) return _employeeLoginMap[fullName];
  // Try first name only
  const firstName = fullName.split(' ')[0];
  for (const [name, login] of Object.entries(_employeeLoginMap)) {
    if (name.split(' ')[0] === firstName) return login;
  }
  // Fallback: name without spaces
  return fullName.replace(/\s+/g, '');
}

async function getTeamUsers(jobDate, teamNumber) {
  const key = jobDate + '_' + teamNumber;
  if (_scheduleCache[key]) return _scheduleCache[key];
  try {
    const parts = jobDate.split('/');
    let year = parts[2]; if (year.length === 2) year = '20' + year;
    const dateStr = parts[0] + '-' + parts[1] + '-' + year;
    const sched = await fetch('/Dashboard/Schedule/GetDaySchedule?date=' + dateStr, {credentials:'include'}).then(r=>r.json());
    const team = (sched.Day?.Teams || []).find(t => t.Number === teamNumber);
    if (!team) { _scheduleCache[key] = 'Equipe ' + teamNumber; return _scheduleCache[key]; }
    const logins = (team.Cleaners || []).map(c => nameToLogin(c.Name)).filter(Boolean);
    _scheduleCache[key] = logins.length ? logins.join(', ') : ('Equipe ' + teamNumber);
  } catch(e) { _scheduleCache[key] = 'Equipe ' + teamNumber; }
  return _scheduleCache[key];
}

async function exportReviewsToSheets() {
  const btn = gi('mp-export-btn');
  const status = gi('mp-export-status');
  if (btn) { btn.textContent = '⏳ Buscando...'; btn.disabled = true; }
  if (status) status.textContent = '';
  try {
    const toDate = new Date();
    const fromDate = new Date(); fromDate.setFullYear(fromDate.getFullYear() - 1);
    const fmtD = function(d) { return (d.getMonth()+1) + '/' + d.getDate() + '/' + d.getFullYear(); };
    const reviewsRes = await fetch('/Dashboard/Job/GetReviews?fromDate=' + fmtD(fromDate) + '&toDate=' + fmtD(toDate) + '&reviewed=true', {credentials:'include'}).then(r=>r.json());
    const jobs = reviewsRes.Jobs || [];
    if (!jobs.length) throw new Error('Nenhuma avaliação encontrada');
    if (status) status.textContent = jobs.length + ' avaliações. Buscando detalhes...';

    const detailed = [];
    for (const job of jobs) {
      const det = await fetch('/Dashboard/Job/GetReviewDetails?reviewID=' + job.ReviewID, {credentials:'include'}).then(r=>r.json());
      const rates = {};
      (det.Review?.Rates || []).forEach(function(r) { rates[r.Topic.toLowerCase()] = r.Rate; });
      detailed.push({
        jobDate: job.JobDate, clientName: job.ClientName, teamNumber: job.TeamNumber,
        overallRate: job.ReviewRate,
        punctuality: rates['punctuality'] || rates['nota'] || job.ReviewRate,
        agility: rates['agility'] || job.ReviewRate,
        quality: rates['quality'] || job.ReviewRate,
        comments: det.Review?.Comments || ''
      });
    }

    if (status) status.textContent = 'Buscando equipes por dia...';
    const uniqueKeys = [...new Set(detailed.map(function(d) { return d.jobDate + '_' + d.teamNumber; }))];
    for (let i = 0; i < Math.min(uniqueKeys.length, 60); i++) {
      const parts = uniqueKeys[i].split('_');
      await getTeamUsers(parts[0], parseInt(parts[1]));
      if (status && (i+1) % 5 === 0) status.textContent = 'Equipes ' + (i+1) + '/' + Math.min(uniqueKeys.length,60) + '...';
    }

    const rows = detailed.map(function(d) {
      return {
        usuario: _scheduleCache[d.jobDate + '_' + d.teamNumber] || ('Equipe ' + d.teamNumber),
        data: d.jobDate, cliente: d.clientName, nota: d.overallRate,
        punctuality: d.punctuality, agility: d.agility, quality: d.quality, comentario: d.comments
      };
    });

    if (status) status.textContent = 'Enviando para Google Sheets...';

    const apiResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6', max_tokens: 4000,
        system: 'Você exporta avaliações do MaidPad para o Google Sheets.\nPlanilha ID: ' + SHEET_ID + '\nAba: ' + SHEET_TAB + '\nColunas: A=usuario, B=data, C=cliente, D=nota, E=punctuality, F=agility, G=quality, H=comentario\n\nPASSOS:\n1. Leia a aba "' + SHEET_TAB + '" e descubra a última data na coluna B (linha 1 é cabeçalho)\n2. Filtre as avaliações com data POSTERIOR à última data na planilha (compare no formato M/D/YY ou MM/DD/YYYY)\n3. Insira as novas linhas no final da planilha, em ordem cronológica\n4. Cada linha: [usuario, data, cliente, nota, punctuality, agility, quality, comentario]\n5. Responda APENAS com JSON: {"inserted": N, "skipped": N, "lastDate": "data anterior"}',
        messages: [{ role: 'user', content: 'Avaliações para exportar (' + rows.length + ' total):\n' + JSON.stringify(rows) }],
        mcp_servers: [{ type: 'url', url: 'https://sheets.googleapis.com/mcp/v1', name: 'google-sheets-mcp' }]
      })
    });

    const apiData = await apiResponse.json();
    const textBlock = apiData.content?.find(function(c) { return c.type === 'text'; });
    let result = {};
    try { result = JSON.parse((textBlock?.text || '{}').replace(/```json|```/g,'').trim()); } catch(e) { result = { raw: textBlock?.text ? textBlock.text.slice(0,300) : 'sem resposta' }; }

    const msg = result.inserted > 0 ? (result.inserted + ' avaliações exportadas') : (result.raw ? ('Resp: ' + result.raw) : 'Planilha já atualizada');
    if (status) status.textContent = msg;
    if (btn) {
      btn.textContent = result.inserted > 0 ? ('✅ ' + result.inserted + ' exportadas') : '✅ OK';
      setTimeout(function() { btn.textContent = '📤 Exportar Avaliações'; btn.disabled = false; }, 4000);
    }
  } catch(e) {
    if (status) status.textContent = 'Erro: ' + e.message;
    if (btn) { btn.textContent = '❌ Erro'; setTimeout(function() { btn.textContent = '📤 Exportar Avaliações'; btn.disabled = false; }, 3000); }
    console.error('[MaidPad Export]', e);
  }
}

  async function fetchChatDay() {
    const el = gi('mp-chat-day');
    if (!el) return;
    try {
      // Get today's schedule for client names
      const today = new Date();
      const fmtD = function(d) { return (d.getMonth()+1)+'-'+d.getDate()+'-'+d.getFullYear(); };
      const [chatRes, schedRes] = await Promise.all([
        fetch('/Dashboard/Chat/GetChatsFromDate?type=2&date=&search=&newerChats=false&pageSize=200', {credentials:'include'}).then(r=>r.json()),
        fetch('/Dashboard/Schedule/GetDaySchedule?date='+fmtD(today), {credentials:'include'}).then(r=>r.json())
      ]);

      const chats = chatRes.Chats || [];
      // Dates in DB are EDT (Florida). Get today in EDT
      const nowEDT = new Date(new Date().toLocaleString('en-US', {timeZone:'America/New_York'}));
      const todayEDT = nowEDT.getFullYear()+'-'+String(nowEDT.getMonth()+1).padStart(2,'0')+'-'+String(nowEDT.getDate()).padStart(2,'0');
      const yesterdayEDT = (function(){var d=new Date(nowEDT);d.setDate(d.getDate()-1);return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');})();

      // DB stores UTC but activity happened on EDT date - check both today and yesterday UTC dates
      const todayChats = chats.filter(function(c) {
        if (!c.LastMessageDate) return false;
        // Parse DB timestamp as EDT equivalent
        const dbDate = c.LastMessageDate.slice(0,10);
        // Message is "today" if its EDT date matches today or if it's from yesterday UTC (still today EDT)
        const msgDateUTC = new Date(c.LastMessageDate.replace(' ','T')+'Z');
        const msgDateEDT = new Date(msgDateUTC.toLocaleString('en-US',{timeZone:'America/New_York'}));
        const msgEDTStr = msgDateEDT.getFullYear()+'-'+String(msgDateEDT.getMonth()+1).padStart(2,'0')+'-'+String(msgDateEDT.getDate()).padStart(2,'0');
        return msgEDTStr === todayEDT;
      });

      if (!todayChats.length) {
        el.innerHTML = '<div class="msub">Sem mensagens hoje</div>';
        return;
      }

      // Build set of clients with jobs today
      const jobClients = new Set();
      (schedRes.Day?.Teams || []).forEach(function(t) {
        (t.Jobs || []).forEach(function(j) {
          if (!j.Cancelled) {
            jobClients.add((j.DisplayName || j.ClientName || '').toLowerCase().trim());
          }
        });
      });

      // Separate chats
      const unread = [], readNoReply = [], withJob = [], withJobUnread = [];
      todayChats.forEach(function(c) {
        const clientKey = (c.Title || '').toLowerCase().trim();
        const hasJob = jobClients.has(clientKey);
        const isUnread = c.Unread > 0;
        const lastIsClient = c.LastMessageSender !== 'Você';

        if (hasJob) {
          if (isUnread || lastIsClient) withJobUnread.push(c);
          else withJob.push(c);
        } else {
          if (isUnread) unread.push(c);
          else if (lastIsClient) readNoReply.push(c);
        }
      });

      function chatRow(c, urgency) {
        const colors = {
          unread: {bg:'rgba(255,95,95,.08)', border:'rgba(255,95,95,.3)', dot:'#ff5f5f'},
          pending: {bg:'rgba(245,166,35,.08)', border:'rgba(245,166,35,.3)', dot:'#f5a623'},
          job: {bg:'rgba(91,228,155,.05)', border:'rgba(91,228,155,.2)', dot:'#5be49b'},
          normal: {bg:'#181c27', border:'#252a38', dot:'#5a6278'}
        };
        const col = colors[urgency] || colors.normal;
        const timeEDT = c.LastMessageDate ? (function() {
          const d = new Date(c.LastMessageDate.replace(' ','T')+'Z');
          return d.toLocaleTimeString('en-US',{timeZone:'America/New_York',hour:'2-digit',minute:'2-digit',hour12:true});
        })() : '';
        return '<div style="display:flex;align-items:center;gap:8px;padding:7px 8px;border-radius:6px;background:'+col.bg+';border:1px solid '+col.border+';margin-bottom:4px;">' +
          '<div style="width:7px;height:7px;border-radius:50%;background:'+col.dot+';flex-shrink:0"></div>' +
          '<span style="font-size:13px;font-weight:500;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#e8eaf0">'+c.Title+'</span>' +
          (c.Unread > 0 ? '<span style="font-size:11px;background:#ff5f5f;color:#fff;border-radius:10px;padding:1px 6px;flex-shrink:0">'+c.Unread+'</span>' : '') +
          '<span style="font-size:11px;color:#8b92a8;font-family:monospace;flex-shrink:0">'+timeEDT+'</span>' +
          '</div>';
      }

      let html = '';

      if (unread.length) {
        html += '<div style="font-size:11px;font-weight:500;letter-spacing:.06em;text-transform:uppercase;color:#ff5f5f;margin:8px 0 4px">🔴 Sem limpeza hoje — não lidos ('+unread.length+')</div>';
        html += unread.map(function(c){return chatRow(c,'unread');}).join('');
      }
      if (readNoReply.length) {
        html += '<div style="font-size:11px;font-weight:500;letter-spacing:.06em;text-transform:uppercase;color:#f5a623;margin:8px 0 4px">🟡 Sem limpeza hoje — aguardando resposta ('+readNoReply.length+')</div>';
        html += readNoReply.map(function(c){return chatRow(c,'pending');}).join('');
      }
      if (withJobUnread.length) {
        html += '<div style="font-size:11px;font-weight:500;letter-spacing:.06em;text-transform:uppercase;color:#5be49b;margin:8px 0 4px">🟢 Com limpeza hoje — mensagem ('+withJobUnread.length+')</div>';
        html += withJobUnread.map(function(c){return chatRow(c,'job');}).join('');
      }
      if (withJob.length) {
        html += '<div style="font-size:11px;font-weight:500;letter-spacing:.06em;text-transform:uppercase;color:#5a6278;margin:8px 0 4px">Com limpeza hoje — respondidos ('+withJob.length+')</div>';
        html += withJob.map(function(c){return chatRow(c,'normal');}).join('');
      }

      if (!html) html = '<div class="msub">Sem mensagens pendentes hoje</div>';
      el.innerHTML = html;
    } catch(e) {
      const el2 = gi('mp-chat-day');
      if (el2) el2.innerHTML = '<div class="merr">Erro: '+e.message+'</div>';
    }
  }

  // Expose to global scope for onclick handlers
  window.exportReviewsToSheets = exportReviewsToSheets;

})();
