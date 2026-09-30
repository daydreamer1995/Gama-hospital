(() => {
  const $ = id => document.getElementById(id);
  const app = $('app'), trigger = $('logoTrigger'), msgs = $('msgs'), input = $('chatInput');
  const mic = $('micBtn'), langSel = $('lang'), status = $('status'), auto = $('autoRead');
  const LANG = { en: ['en-US', 'English'], ar: ['ar-SA', 'العربية'], ta: ['ta-IN', 'தமிழ்'] };
  let typing = null, lastSent = '';

  /* Only the Gama logo opens/closes the chat panel */
  function setOpen(o) {
    app.classList.toggle('chat-closed', !o);
    trigger.setAttribute('aria-expanded', o);
    if (o) input.focus({ preventScroll: true });
  }
  window.toggleBotpressChat = () => setOpen(app.classList.contains('chat-closed'));
  setOpen(matchMedia('(min-width:900px)').matches);

  /* Messages */
  function addMsg(text, who = 'bot', alert = false) {
    if (typing) { typing.remove(); typing = null; }
    const row = document.createElement('div'); row.className = 'row ' + who;
    if (who === 'bot') row.insertAdjacentHTML('beforeend', '<span class="ava">🤖</span>');
    const m = document.createElement('div'); m.className = 'msg' + (alert ? ' alert' : ''); m.textContent = text;
    if (who === 'bot') {
      const s = document.createElement('button'); s.className = 'spk'; s.textContent = '🔊 Listen';
      s.onclick = () => speak(text); m.appendChild(s);
      if (auto.checked) speak(text);
    }
    row.appendChild(m); msgs.appendChild(row); msgs.scrollTop = msgs.scrollHeight;
    return row;
  }
  function showTyping() { typing = addMsg('…'); typing.querySelector('.spk')?.remove(); }

  /* Text-to-Speech */
  function speak(t) {
    if (!('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(t); u.lang = LANG[langSel.value][0]; u.rate = .95;
    speechSynthesis.speak(u);
  }

  /* Speech-to-Text */
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { mic.disabled = true; status.textContent = 'Voice input not supported. Use text chat.'; }
  else {
    const rec = new SR(); let on = false;
    rec.interimResults = true;
    rec.onstart = () => { on = true; mic.classList.add('on'); status.textContent = `Listening… (${LANG[langSel.value][1]})`; };
    rec.onend = () => { on = false; mic.classList.remove('on'); status.textContent = 'Voice ready'; };
    rec.onerror = e => { status.textContent = e.error === 'not-allowed' ? 'Microphone blocked. Allow access in browser settings.' : 'Voice failed. Please type instead.'; };
    rec.onresult = e => { input.value = [...e.results].map(r => r[0].transcript).join(''); };
    mic.onclick = () => { if (on) return rec.stop(); rec.lang = LANG[langSel.value][0]; rec.start(); };
  }
  langSel.onchange = () => { document.documentElement.dir = langSel.value === 'ar' ? 'rtl' : 'ltr'; };

  /* Botpress bridge */
  let bpHooked = false;
  function hookBotpress() {
    const bp = window.botpress;
    if (bpHooked || !bp || typeof bp.on !== 'function') return;
    bpHooked = true;
    bp.on('message', m => {
      const t = m?.block?.text ?? m?.payload?.text ?? m?.text;
      const incoming = m?.direction ? m.direction === 'incoming' : t !== lastSent;
      if (t && incoming) addMsg(t);
    });
  }
  const poll = setInterval(() => { hookBotpress(); if (bpHooked) clearInterval(poll); }, 400);
  setTimeout(() => clearInterval(poll), 30000);

  async function send(text) {
    text = text.trim(); if (!text) return;
    addMsg(text, 'user'); lastSent = text;
    if (/emergenc|ambulance|urgent|طوارئ|அவசர/i.test(text))
      addMsg('If this is an emergency, call 920033175 now or come to the Gama Hospital Emergency Department (open 24/7).', 'bot', true);
    const bp = window.botpress;
    if (!bp || typeof bp.sendMessage !== 'function') { addMsg('Gama AI is loading. Please wait a moment and try again.'); return; }
    try { showTyping(); await bp.sendMessage(text); }
    catch (e) { console.error(e); addMsg('Gama AI could not respond right now. Please call 920033175.'); }
  }
  $('composer').onsubmit = e => { e.preventDefault(); send(input.value); input.value = ''; };
  document.querySelectorAll('[data-q]').forEach(b => b.addEventListener('click', () => {
    if (app.classList.contains('chat-closed')) { trigger.focus(); return; } // open via the Gama logo
    send(b.dataset.q);
  }));

  addMsg('مرحباً بك في مستشفى جاما!\nWelcome to Gama Hospital!\nவணக்கம்! காமா மருத்துவமனைக்கு வரவேற்கிறோம்!\nI\'m your AI Healthcare Concierge. How may I assist you today?');
})();
