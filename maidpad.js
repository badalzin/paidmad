// ==UserScript==
// @name         MaidPad Panel
// @namespace    maidpad-panel
// @version      2.0
// @match        https://www.maidpad.com/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  if (document.getElementById('mp-toggle')) return;

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
  <div class="mg">
    <div class="mc"><div class="ml">Clientes <a href="/Dashboard/Client">Ver →</a></div><div id="mcl"><div class="msk"></div></div></div>
    <div class="mc"><div class="ml">Limpezas esta semana <a href="/Dashboard/Schedule" id="msl">Agenda →</a></div><div id="mjo"><div class="msk"></div></div></div>
    <div class="mc"><div class="ml">Avaliações (30 dias) <a href="/Dashboard/Job/Reviews">Ver →</a></div><div id="mrv"><div class="msk"></div></div></div>
    <div class="mc"><div class="ml">Chat <a href="/Dashboard/Chat">Abrir →</a></div><div id="mch"><div class="msk"></div></div></div>
  </div>
  <div class="mg mw" style="margin-bottom:14px">
    <div class="mc"><div class="ml">Pagamentos <a href="/Dashboard/Accounting">Financeiro →</a></div><div id="mpa"><div class="msk"></div></div></div>
  </div>
  <div class="mg mhalf" style="margin-bottom:14px">
    <div class="mc"><div class="ml">Hoje</div><div id="mdy"><div class="msk"></div></div></div>
    <div class="mc"><div class="ml">Atividades em tempo real</div><div class="mfeed" id="mfe"><div class="msk"></div></div></div>
  </div>
  <div class="mg mw" style="margin-bottom:14px">
    <div class="mc">
      <div class="ml">Clientes atrasados <a href="/Dashboard/Client">Ver todos →</a></div>
      <div class="mfeed" id="mp-overdue"><div class="msk"></div></div>
    </div>
  </div>
  <div class="mc">
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
    const s = d.Summary || {};
    return `<div class="mbig">${n(s.Total)}</div><div class="msub">esta semana</div>
    <div class="mrow">
      <div><div class="mv">${n(s.Recurring)}</div><div class="mlb">recorrentes</div></div>
      <div><div class="mv">${n(s.OneTime)}</div><div class="mlb">avulsas</div></div>
    </div>`;
  }

  function rR(d) {
    const s = d.Summary || {};
    const sc = s.Average != null ? Math.round(s.Average * 100) / 100 : '—';
    const cnt = s.Count || 0;
    const stars = sc !== '—' ? '★'.repeat(Math.round(sc)) + '☆'.repeat(5 - Math.round(sc)) : '';
    return `<div class="mscr">${sc}</div><div class="mstars">${stars}</div>
    <div class="msub" style="margin-top:6px">${cnt} avaliações</div>`;
  }

  function rP(d) {
    const s = d.Summary || {};
    const total = s.Total || 0;
    const lt7 = s.LessThan7Days || 0;
    const mt7 = s.MoreThan7Days || 0;
    const overdue = Math.max(0, total - lt7 - mt7);
    return `<div class="mbucs">
      <div class="mbuc ov"><div class="mbamt">${fmt(overdue)}</div><div class="mblbl">Vencidos</div></div>
      <div class="mbuc sn"><div class="mbamt">${fmt(lt7)}</div><div class="mblbl">Vencem 0–7 dias</div></div>
      <div class="mbuc lt"><div class="mbamt">${fmt(mt7)}</div><div class="mblbl">Vencem +7 dias</div></div>
    </div>`;
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
      ['/Dashboard/Company/GetClientSummary',  'mcl', rC],
      ['/Dashboard/Company/GetJobSummary',     'mjo', rJ],
      ['/Dashboard/Company/GetReviewSummary',  'mrv', rR],
      ['/Dashboard/Company/GetPaymentSummary', 'mpa', rP],
      ['/Dashboard/Company/GetChatSummary',    'mch', rCh],
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
    clearTimeout(timer);
    timer = setTimeout(fetchAll, 30000);
  }

  btn.addEventListener('click', () => {
    open = !open;
    ov.classList.toggle('open', open);
    if (open && !fetched) fetchAll();
  });
  ov.addEventListener('click', e => { if (e.target === ov) { open = false; ov.classList.remove('open'); } });
  gi('mp-x').addEventListener('click', () => { open = false; ov.classList.remove('open'); });
  gi('mpr').addEventListener('click', fetchAll);

  async function fetchDaySchedule() {
    const dEl = gi('mdy');
    if (!dEl) return;
    try {
      const today = new Date();
      const date = `${today.getMonth()+1}-${today.getDate()}-${today.getFullYear()}`;
      const r = await fetch(`/Dashboard/Schedule/GetDaySchedule?date=${date}`, { credentials: 'include' });
      if (!r.ok) throw new Error(r.status);
      const d = await r.json();
      const teams = (d.Day && d.Day.Teams) || [];
      const activeTeams = teams.filter(t => t.Number > 0 && t.Jobs && t.Jobs.length > 0);
      if (!activeTeams.length) {
        dEl.innerHTML = '<div class="msub">Nenhuma equipe com limpezas hoje</div>';
        return;
      }
      dEl.innerHTML = activeTeams.map(team => {
        const color = team.Color || 'grey';
        const name = team.Name ? team.Name : `Equipe ${team.Number}`;
        const cleaners = (team.Cleaners || []).filter(c => c.CurrentTeam == team.Number || c.TeamID == team.ID);
        const cleanerNames = cleaners.map(c => c.Name ? c.Name.split(' ')[0] : '').filter(Boolean).join(', ');
        const jobs = team.Jobs || [];
        const done = jobs.filter(j => j.Finished).length;
        const started = jobs.filter(j => j.Started && !j.Finished).length;
        const onway = jobs.filter(j => j.OnOurWay && !j.Started).length;
        const pending = jobs.filter(j => !j.OnOurWay && !j.Started && !j.Finished && !j.Cancelled).length;
        const cancelled = jobs.filter(j => j.Cancelled).length;
        const statusColor = done === jobs.length - cancelled ? '#5be49b' : started > 0 ? '#f5a623' : '#8b92a8';
        return `<div style="background:#0f1117;border:1px solid #252a38;border-radius:10px;padding:12px;margin-bottom:10px;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
            <div style="font-size:13px;font-weight:500;color:#e8eaf0;">${name}</div>
            <div style="font-size:11px;color:#8b92a8;">${cleanerNames}</div>
          </div>
          <div style="display:flex;gap:8px;margin-bottom:10px;flex-wrap:wrap;">
            ${done>0?`<span style="font-size:11px;padding:2px 8px;border-radius:10px;background:rgba(91,228,155,.15);color:#5be49b;border:1px solid rgba(91,228,155,.3)">✓ ${done} concluídos</span>`:''}
            ${started>0?`<span style="font-size:11px;padding:2px 8px;border-radius:10px;background:rgba(245,166,35,.15);color:#f5a623;border:1px solid rgba(245,166,35,.3)">🧹 ${started} em andamento</span>`:''}
            ${onway>0?`<span style="font-size:11px;padding:2px 8px;border-radius:10px;background:rgba(91,180,228,.15);color:#5bb4e4;border:1px solid rgba(91,180,228,.3)">🚗 ${onway} a caminho</span>`:''}
            ${pending>0?`<span style="font-size:11px;padding:2px 8px;border-radius:10px;background:rgba(90,98,120,.2);color:#8b92a8;border:1px solid #252a38">⏳ ${pending} pendentes</span>`:''}
          </div>
          <div style="display:flex;flex-direction:column;gap:4px;">
            ${jobs.map(j => {
              if (j.Cancelled) return `<div style="display:flex;align-items:center;gap:8px;padding:5px 8px;border-radius:6px;background:#181c27;opacity:.5;">
                <span style="font-size:11px;color:#ff5f5f">✗</span>
                <span style="font-size:12px;color:#5a6278;text-decoration:line-through">${j.DisplayName||j.ClientName}</span>
              </div>`;
              const ic = j.Finished ? '✅' : j.Started ? '🧹' : j.OnOurWay ? '🚗' : '⏳';
              const bc = j.Finished ? 'rgba(91,228,155,.08)' : j.Started ? 'rgba(245,166,35,.08)' : j.OnOurWay ? 'rgba(91,180,228,.08)' : '#181c27';
              const tc = j.Finished ? '#5be49b' : j.Started ? '#f5a623' : j.OnOurWay ? '#5bb4e4' : '#8b92a8';
              const time = j.JobTimeString || j.JobTime || '';
              return `<div style="display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:6px;background:${bc};border:1px solid #252a38;">
                <span style="font-size:13px">${ic}</span>
                <span style="font-size:12px;font-weight:500;flex:1;color:#e8eaf0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${j.DisplayName||j.ClientName}</span>
                ${time?`<span style="font-size:11px;color:${tc};font-family:monospace;flex-shrink:0">${time}</span>`:''}
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
})();

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
