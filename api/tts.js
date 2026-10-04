export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const text = String((req.body && req.body.text) || '').slice(0, 1500);
  if (!text.trim()) return res.status(400).json({ error: 'empty text' });
  try {
    const r = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + process.env.OPENAI_API_KEY },
      body: JSON.stringify({
        model: 'gpt-4o-mini-tts', voice: 'alloy', input: text, response_format: 'mp3',
        instructions: 'Speak clearly, calmly and warmly like a hospital receptionist. Match the language of the text.'
      })
    });
    if (!r.ok) return res.status(502).json({ error: await r.text() });
    res.setHeader('Content-Type', 'audio/mpeg');
    res.send(Buffer.from(await r.arrayBuffer()));
  } catch (e) { res.status(500).json({ error: String(e) }); }
}
