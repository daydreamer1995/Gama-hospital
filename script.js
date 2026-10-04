(() => {
  const $ = id => document.getElementById(id);
  const app = $('app'), logo = $('logoTrigger'), navBtn = $('chatNavButton'), closeBtn = $('chatClose');
  const langSel = $('voiceLanguage'), micBtn = $('voiceInput'), spkBtn = $('speechToggle'), status = $('voiceStatus');
  const tts = window.speechSynthesis;
  let speakOn = true;
  const say = t => { status.textContent = t; };

  /* ---------- Open / close the chat panel (logo, "Chat with us" button, or ×) ---------- */
  const isOpen = () => !app.classList.contains('chat-closed');
  function setOpen(open) {
    app.classList.toggle('chat-closed', !open);
    logo.setAttribute('aria-expanded', open);
    if (!open) { tts && tts.cancel(); stopListening(); closeDrawer(); }
  }
  const toggle = () => setOpen(!isOpen());
  window.toggleChat = toggle;
  logo.addEventListener('click', toggle);
  logo.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
  navBtn.addEventListener('click', toggle);
  closeBtn.addEventListener('click', () => setOpen(false));
  new ResizeObserver(() => document.documentElement.style.setProperty('--hh', $('topbar').offsetHeight + 'px')).observe($('topbar'));

  /* ---------- Send a question to the Voiceflow assistant ---------- */
  function ask(text) {
    text = (text || '').trim(); if (!text) return;
    const vf = window.voiceflow && window.voiceflow.chat;
    if (!vf || typeof vf.interact !== 'function') { say('Gama AI is connecting. Please try again in a moment.'); return; }
    try { vf.interact({ type: 'text', payload: text }); } catch (e) { console.error(e); say('Could not send. Please type in the chat box.'); }
  }
  document.querySelectorAll('[data-chat-prompt]').forEach(b => b.addEventListener('click', () => {
    if (!isOpen()) { // the chat opens only from the logo or the "Chat with us" button
      [logo, navBtn].forEach(el => { el.classList.add('nudge'); setTimeout(() => el.classList.remove('nudge'), 600); });
      return;
    }
    ask(b.dataset.chatPrompt);
  }));

  /* ---------- Text-to-Speech: each line is read in its own language ---------- */
  const SCRIPTS = [[/[\u0B80-\u0BFF]/, 'ta-IN'], [/[\u0D00-\u0D7F]/, 'ml-IN'], [/[\u0C00-\u0C7F]/, 'te-IN'], [/[\u0C80-\u0CFF]/, 'kn-IN'],
    [/[\u0980-\u09FF]/, 'bn-IN'], [/[\u0A80-\u0AFF]/, 'gu-IN'], [/[\u0A00-\u0A7F]/, 'pa-IN'], [/[\u0900-\u097F]/, 'hi-IN'],
    [/[\u0E00-\u0E7F]/, 'th-TH'], [/[\u3040-\u30FF]/, 'ja-JP'], [/[\uAC00-\uD7AF]/, 'ko-KR'], [/[\u4E00-\u9FFF]/, 'zh-CN'],
    [/[\u0400-\u04FF]/, 'ru-RU'], [/[\u0600-\u06FF]/, 'ar-SA']];
  const langOf = s => /[\u0679\u0688\u0691\u06BA\u06D2\u06C1]/.test(s) ? 'ur-PK' : ((SCRIPTS.find(([re]) => re.test(s)) || [])[1] || langSel.value);
  const voiceFor = l => tts.getVoices().find(v => v.lang.replace('_', '-') === l) || tts.getVoices().find(v => v.lang.startsWith(l.split('-')[0]));
  function speak(raw, queue) {
    if (!tts || !speakOn) return;
    if (!queue) tts.cancel();
    const clean = raw.replace(/<[^>]+>/g, ' ').replace(/https?:\S+/g, '').replace(/[*_`#>\[\]]/g, '').replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, '');
    clean.split(/\n+/).flatMap(l => l.match(/[^.!?؟।]+[.!?؟।]?/g) || []).map(s => s.trim()).filter(s => /[\p{L}\p{N}]/u.test(s)).forEach(c => {
      const l = langOf(c), u = new SpeechSynthesisUtterance(c), v = voiceFor(l);
      u.lang = l; u.rate = .95; if (v) u.voice = v; tts.speak(u);
    });
  }
  tts && tts.getVoices();
  spkBtn.addEventListener('click', () => {
    speakOn = !speakOn; tts && !speakOn && tts.cancel();
    spkBtn.textContent = speakOn ? '🔊' : '🔇';
    spkBtn.setAttribute('aria-pressed', speakOn);
    const label = speakOn ? 'Mute spoken replies' : 'Turn on spoken replies';
    spkBtn.setAttribute('aria-label', label); spkBtn.title = label;
  });
  // Read the assistant's replies aloud when the widget reports them (Voiceflow posts "voiceflow:interact" events)
  window.addEventListener('message', e => {
    if (typeof e.data !== 'string' || !e.data.startsWith('{"type":"voiceflow:interact"')) return;
    let d; try { d = JSON.parse(e.data); } catch (_) { return; }
    (function walk(n) {
      if (!n || typeof n !== 'object') return;
      if (Array.isArray(n)) return n.forEach(walk);
      if ((n.type === 'text' || n.type === 'speak') && n.payload && typeof n.payload.message === 'string') speak(n.payload.message, true);
      else Object.values(n).forEach(walk);
    })(d);
  });

  /* ---------- Speech-to-Text: speak, then the words are sent to the assistant ---------- */
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  let rec = null, listening = false;
  function stopListening() { if (rec && listening) rec.stop(); }
  if (!SR) { micBtn.disabled = true; micBtn.title = 'Voice input is not supported in this browser. Please type.'; }
  else {
    rec = new SR(); rec.interimResults = true; let text = '';
    rec.onstart = () => { listening = true; text = ''; tts && tts.cancel(); micBtn.classList.add('on'); say('Listening…'); };
    rec.onresult = e => { text = [...e.results].map(r => r[0].transcript).join(''); say('“' + text + '”'); };
    rec.onend = () => { listening = false; micBtn.classList.remove('on'); if (text.trim()) { say('Sent: “' + text + '”'); ask(text); } else say(''); };
    rec.onerror = e => say(e.error === 'not-allowed' ? 'Microphone blocked. Allow access in your browser settings.' : 'Voice input failed. Please type instead.');
    micBtn.addEventListener('click', () => { if (listening) return rec.stop(); rec.lang = langSel.value; try { rec.start(); } catch (_) {} });
  }

  /* ---------- Department directory: routing, diagnosis-to-clinic finder, WhatsApp reroute (see config.js) ---------- */
  const CFG = window.GAMA_CONFIG || { hospital: {}, whatsapp: {}, links: {}, departments: [], emergencyKeywords: [] };
  const digits = v => String(v || '').replace(/\D/g, '');
  const waLink = (num, msg) => 'https://wa.me/' + digits(num || CFG.whatsapp.main) + '?text=' + encodeURIComponent(msg);
  const hasWA = num => !!digits(num || CFG.whatsapp.main);
  if (hasWA()) $('waChip').href = waLink('', CFG.whatsapp.message || 'Hello');
  if (CFG.links && CFG.links.book) $('bookChip').href = CFG.links.book;
  const drawer = $('deptDrawer'), listEl = $('deptList'), search = $('deptSearch'), warn = $('deptWarn'), openBtn = $('deptOpen');
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
  function openDrawer() { drawer.hidden = false; openBtn.setAttribute('aria-expanded', 'true'); search.value = ''; renderDepts(''); search.focus(); }
  function closeDrawer() { if (!drawer || drawer.hidden) return; drawer.hidden = true; openBtn.setAttribute('aria-expanded', 'false'); }
  openBtn.addEventListener('click', openDrawer);
  $('deptClose').addEventListener('click', closeDrawer);
  search.addEventListener('input', () => renderDepts(search.value));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });
  listEl.addEventListener('click', e => {
    const b = e.target.closest('[data-ask]'); if (!b) return;
    closeDrawer(); ask('Tell me about the ' + b.dataset.ask + ' department and how I can book an appointment.');
  });
})();
