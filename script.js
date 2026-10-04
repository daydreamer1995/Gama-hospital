/* ===== CONFIG: Botpress embed snippet la irundhu ivlo maathu ===== */
const BOT = { botId: 'YOUR_BOT_ID', clientId: 'YOUR_CLIENT_ID' };
const TTS_URL = '/api/tts';

const app = document.getElementById('app');
const $ = (id) => document.getElementById(id);
const say = (t) => ($('voiceMsg').textContent = t || '');

/* ---------- Botpress ---------- */
let bpReady = false;
window.botpress.on('webchat:ready', () => { bpReady = true; window.botpress.open(); });
window.botpress.init({
  botId: BOT.botId, clientId: BOT.clientId,
  selector: '#bp-embedded-webchat',
  configuration: { botName: 'Gama Hospital AI', hideWidget: true, color: '#0a6e6e' }
});

function toggleBotpressChat(force) {
  const closed = typeof force === 'boolean' ? !force : !app.classList.contains('chat-closed');
  app.classList.toggle('chat-closed', closed);
  $('launcher').setAttribute('aria-expanded', String(!closed));
}
window.toggleBotpressChat = toggleBotpressChat;

function sendToBot(text) {
  toggleBotpressChat(true);
  const go = () => window.botpress.sendMessage(text);
  bpReady ? go() : window.botpress.on('webchat:ready', go);
}

document.querySelectorAll('.card[data-q]').forEach((c) =>
  c.addEventListener('click', () => sendToBot(c.dataset.q)));
$('logoTrigger').addEventListener('click', () => toggleBotpressChat());
setTimeout(() => $('logoTip')?.classList.add('hide'), 6000);

/* ---------- Voice out: bot reply -> OpenAI TTS ---------- */
let audio = null, speakToken = 0;
const clean = (t) => t
  .replace(/[*_#`>~\[\]]/g, '').replace(/\(https?:[^)]+\)/g, '')
  .replace(/\p{Extended_Pictographic}/gu, '').replace(/\s+/g, ' ').trim();

function stopVoice() {
  speakToken++;
  if (audio) { audio.pause(); audio = null; }
  $('stopBtn').hidden = true;
}
async function speak(text) {
  const t = clean(text);
  if (!t) return;
  stopVoice();
  const my = speakToken;
  try {
    say('Preparing voice…');
    const r = await fetch(TTS_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text: t }) });
    if (!r.ok) throw new Error('TTS ' + r.status);
    const url = URL.createObjectURL(await r.blob());
    if (my !== speakToken) return;
    audio = new Audio(url);
    audio.onended = () => { $('stopBtn').hidden = true; say(''); };
    $('stopBtn').hidden = false; say('');
    await audio.play();
  } catch (e) { console.error(e); say('Voice not available. Reply is shown in chat.'); }
}
$('stopBtn').addEventListener('click', stopVoice);

window.botpress.on('message', (m) => {
  const p = m && m.payload;
  const incoming = m && (m.direction === 'incoming' || m.direction === undefined);
  if (incoming && p && p.type === 'text' && p.text) speak(p.text);
});

/* ---------- Voice in: Chrome Web Speech ---------- */
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!SR) { $('micBtn').hidden = true; $('langSel').hidden = true; say('Voice input needs Chrome or Edge.'); }
else {
  const rec = new SR();
  rec.continuous = false; rec.interimResults = false;
  $('micBtn').addEventListener('click', () => {
    stopVoice();
    rec.lang = $('langSel').value;
    try { rec.start(); } catch (_) {}
  });
  rec.onstart = () => { $('micBtn').classList.add('listening'); $('micTxt').textContent = 'Listening…'; };
  rec.onend = () => { $('micBtn').classList.remove('listening'); $('micTxt').textContent = 'Tap to speak'; };
  rec.onerror = (e) => say(e.error === 'not-allowed' ? 'Allow the microphone in Chrome (lock icon in address bar).' : 'Could not hear you. Try again.');
  rec.onresult = (e) => { say(''); sendToBot(e.results[0][0].transcript); };
}
