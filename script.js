(() => {
  const $ = id => document.getElementById(id);
  const CFG = window.GAMA_CONFIG || { hospital: {}, whatsapp: {}, departments: [], emergencyKeywords: [] };

  /* ---------- Small helper message ---------- */
  function toast(msg) {
    const t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); t.textContent = msg;
    document.body.appendChild(t); setTimeout(() => t.remove(), 3500);
  }

  /* ---------- Cards: open the Voiceflow chat and send the question ---------- */
  function ask(text) {
    const vf = window.voiceflow && window.voiceflow.chat;
    if (!vf || typeof vf.open !== 'function') { toast('The assistant is still loading. Please try again, or call ' + (CFG.hospital.phone || '920033175') + '.'); return; }
    try {
      vf.open();
      setTimeout(() => { try { vf.interact({ type: 'text', payload: text }); } catch (e) { console.error(e); } }, 500);
    } catch (e) { console.error(e); }
  }
  document.querySelectorAll('[data-chat-prompt]').forEach(b => b.addEventListener('click', () => ask(b.dataset.chatPrompt)));

  /* ---------- Departments: routing, diagnosis-to-clinic finder, WhatsApp reroute (see config.js) ---------- */
  const digits = v => String(v || '').replace(/\D/g, '');
  const waLink = (num, msg) => 'https://wa.me/' + digits(num || CFG.whatsapp.main) + '?text=' + encodeURIComponent(msg);
  const hasWA = num => !!digits(num || CFG.whatsapp.main);
  if (hasWA()) $('waChip').href = waLink('', CFG.whatsapp.message || 'Hello');
  const modal = $('deptDrawer'), listEl = $('deptList'), search = $('deptSearch'), warn = $('deptWarn'), openBtn = $('deptOpen');
  function renderDepts(q) {
    q = (q || '').trim().toLowerCase();
    warn.hidden = !(q && (CFG.emergencyKeywords || []).some(k => q.includes(k)));
    const rows = CFG.departments.map(d => {
      const kws = d.keywords || [];
      const hay = [d.en, d.ar].concat(kws).join(' ').toLowerCase();
      return { d, hit: !q || hay.includes(q), suggested: !!q && kws.some(k => k.includes(q) || q.includes(k)) };
    }).filter(r => r.hit).sort((a, b) => b.suggested - a.suggested);
    if (!rows.length) { listEl.innerHTML = `<li class="empty">No match. Ask the AI assistant or call <a href="tel:+966${CFG.hospital.phone}">${CFG.hospital.phone}</a>.</li>`; return; }
    listEl.innerHTML = rows.map(({ d, suggested }) => {
      const act = hasWA(d.whatsapp)
        ? `<a class="wa" target="_blank" rel="noopener noreferrer" href="${waLink(d.whatsapp, 'Hello GAMA Hospital, I need help with the ' + d.en + ' department.')}">WhatsApp</a>`
        : `<a href="tel:+966${CFG.hospital.phone}">Call</a>`;
      return `<li class="dept"><div class="dn"><b>${d.en}</b><span class="ar" lang="ar">${d.ar}</span>${suggested ? '<em>Suggested clinic</em>' : ''}</div><div class="da">${act}<button type="button" data-ask="${d.en}">Ask AI</button></div></li>`;
    }).join('');
  }
  function openModal() { modal.hidden = false; search.value = ''; renderDepts(''); search.focus(); }
  function closeModal() { modal.hidden = true; openBtn.focus(); }
  openBtn.addEventListener('click', openModal);
  $('deptClose').addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  search.addEventListener('input', () => renderDepts(search.value));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) closeModal(); });
  listEl.addEventListener('click', e => {
    const b = e.target.closest('[data-ask]'); if (!b) return;
    modal.hidden = true; ask('Tell me about the ' + b.dataset.ask + ' department and how I can book an appointment.');
  });
})();
