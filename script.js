/* GAMA Hospital Webchat controls.
   Botpress supplies the conversation. Browser speech APIs provide voice input/output.
*/
(() => {
  'use strict';

  const app = document.getElementById('app');
  const launcher = document.getElementById('launcher');
  const chatNavButton = document.getElementById('chatNavButton');
  const launcherMic = document.getElementById('launcherMic');
  const closeButton = document.getElementById('chatClose');
  const logoTrigger = document.getElementById('logoTrigger');
  const voiceInput = document.getElementById('voiceInput');
  const speechToggle = document.getElementById('speechToggle');
  const languageSelect = document.getElementById('voiceLanguage');
  const voiceStatus = document.getElementById('voiceStatus');

  let webchatReady = false;
  const pendingMessages = [];
  const pendingSpokenReplies = [];
  let drainingMessages = false;
  let awaitingBotReply = false;
  let lastSentUserText = '';
  let speechEnabled = true;
  let recognition = null;
  let listening = false;
  let lastSpokenMessageId = '';
  let lastQuestionLanguage = '';
  let welcomeSpoken = false;
  let skipDuplicateWelcome = false;
  const speechWaitingForVoices = [];
  let voiceLoadFallbackTimer = 0;
  let voiceListWaitExpired = false;

  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (languageSelect && Array.from(languageSelect.options).some((option) => option.value.toLowerCase() === (navigator.language || '').toLowerCase())) {
    languageSelect.value = navigator.language;
  }

  function setPanelOpen(open) {
    if (!app) return;
    app.classList.toggle('chat-closed', !open);
    launcher?.setAttribute('aria-expanded', String(open));
  }

  function setStatus(message, show = true) {
    if (!voiceStatus) return;
    voiceStatus.textContent = message;
    voiceStatus.classList.toggle('visible', show && Boolean(message));
  }

  function openBotpressChat(announce = true) {
    setPanelOpen(true);
    window.speechSynthesis?.resume?.();
    if (announce) announceWelcome();
    if (window.botpress && typeof window.botpress.open === 'function') {
      window.botpress.open();
    }
  }

  function closeBotpressChat() {
    setPanelOpen(false);
    if (window.botpress && typeof window.botpress.close === 'function') {
      window.botpress.close();
    }
  }

  async function flushPendingMessages() {
    if (drainingMessages || !webchatReady || !window.botpress || typeof window.botpress.sendMessage !== 'function') return;
    drainingMessages = true;
    try {
      while (pendingMessages.length && webchatReady) {
        const message = pendingMessages.shift();
        try {
          await window.botpress.sendMessage(message);
        } catch (error) {
          console.error('Could not send message to the assistant:', error);
        }
      }
    } finally {
      drainingMessages = false;
      if (pendingMessages.length && webchatReady) flushPendingMessages();
    }
  }

  function sendChatMessage(text) {
    const message = String(text || '').trim();
    if (!message) return;
    lastQuestionLanguage = languageFor(message);
    lastSentUserText = message;
    awaitingBotReply = true;
    pendingMessages.push(message);
    openBotpressChat();
    flushPendingMessages();
  }

  function sendSpokenText(text) {
    const message = String(text || '').trim();
    if (!message) return;
    sendChatMessage(message);
    setStatus('Recognized and sent: ' + message, true);
    window.setTimeout(() => setStatus('', false), 4500);
  }

  function beginListening() {
    if (window.location.protocol === 'file:' || !window.isSecureContext) {
      setStatus('Voice typing needs the published HTTPS demo page. Open the WordPress or GitHub Pages link, then allow microphone access.', true);
      return;
    }
    if (!Recognition) {
      setStatus('Voice input needs Chrome or Edge and an HTTPS WordPress page.', true);
      return;
    }

    window.speechSynthesis?.cancel?.();
    if (!recognition) {
      recognition = new Recognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event) => {
        let finalText = '';
        let interimText = '';
        for (let i = event.resultIndex; i < event.results.length; i += 1) {
          const phrase = event.results[i][0]?.transcript || '';
          if (event.results[i].isFinal) finalText += phrase;
          else interimText += phrase;
        }
        if (interimText) setStatus('Typing: ' + interimText, true);
        if (finalText.trim()) sendSpokenText(finalText);
      };

      recognition.onerror = (event) => {
        const messages = {
          'not-allowed': 'Allow microphone access in your browser to use voice input.',
          'service-not-allowed': 'Voice recognition is unavailable in this browser.',
          'no-speech': 'I did not hear speech. Tap the microphone and try again.',
          'audio-capture': 'No microphone was found. Connect or enable a microphone and try again.',
          network: 'Speech recognition needs an internet connection. Check your connection and try again.',
          aborted: 'Voice typing stopped. Tap the microphone to try again.'
        };
        setStatus(messages[event.error] || 'Voice input error: ' + event.error, true);
      };

      recognition.onstart = () => setStatus('Listening… your speech will appear as text and be sent.', true);
      recognition.onend = () => {
        listening = false;
        voiceInput?.classList.remove('listening');
        voiceInput?.setAttribute('aria-pressed', 'false');
        if (voiceStatus?.textContent.startsWith('Typing:')) setStatus('', false);
        while (pendingSpokenReplies.length) {
          const pending = pendingSpokenReplies.shift();
          speakText(pending.text, pending.language);
        }
      };
    }

    recognition.lang = languageSelect?.value || navigator.language || 'en-US';
    try {
      recognition.start();
      listening = true;
      voiceInput?.classList.add('listening');
      voiceInput?.setAttribute('aria-pressed', 'true');
      setStatus('Listening… speak now.', true);
    } catch (error) {
      if (error.name === 'InvalidStateError') {
        setStatus('Already listening. Speak now.', true);
        return;
      }
      setStatus('Could not start the microphone. Check browser permissions.', true);
    }
  }

  function languageFor(text) {
    const selected = (languageSelect?.value || '').toLowerCase();
    const useSelected = (prefixes, fallback) => prefixes.some((prefix) => selected.startsWith(prefix)) ? languageSelect.value : fallback;

    if (/[\u0600-\u06FF\u0750-\u077F]/u.test(text)) return useSelected(['ar', 'ur', 'fa', 'ps'], 'ar-SA');
    if (/[\u0B80-\u0BFF]/u.test(text)) return 'ta-IN';
    if (/[\u0900-\u097F]/u.test(text)) return useSelected(['hi', 'mr', 'ne'], 'hi-IN');
    if (/[\u0D00-\u0D7F]/u.test(text)) return 'ml-IN';
    if (/[\u0A00-\u0A7F]/u.test(text)) return 'pa-IN';
    if (/[\u0C00-\u0C7F]/u.test(text)) return 'te-IN';
    if (/[\u0980-\u09FF]/u.test(text)) return 'bn-IN';
    if (/[\u0A80-\u0AFF]/u.test(text)) return 'gu-IN';
    if (/[\u0C80-\u0CFF]/u.test(text)) return 'kn-IN';
    if (/[\u0B00-\u0B7F]/u.test(text)) return 'or-IN';
    if (/[\u0D80-\u0DFF]/u.test(text)) return 'si-LK';
    if (/[\u0E00-\u0E7F]/u.test(text)) return 'th-TH';
    if (/[\u1000-\u109F]/u.test(text)) return 'my-MM';
    if (/[\uAC00-\uD7AF\u1100-\u11FF]/u.test(text)) return 'ko-KR';
    if (/[\u3040-\u30FF]/u.test(text)) return 'ja-JP';
    if (/[\u4E00-\u9FFF]/u.test(text)) return useSelected(['zh'], 'zh-CN');
    if (/[\u0400-\u04FF]/u.test(text)) return useSelected(['ru', 'uk', 'bg'], 'ru-RU');
    if (/[¿¡ñ]/iu.test(text) || /\b(hola|gracias|quiero|necesito|por favor|dónde|cita|ayuda)\b/iu.test(text)) return 'es-ES';
    if (/[ãõ]/iu.test(text) || /\b(olá|obrigado|obrigada|preciso|por favor|consulta)\b/iu.test(text)) return 'pt-PT';
    if (/[äöüß]/iu.test(text) || /\b(hallo|danke|bitte|ich|möchte|krankenhaus)\b/iu.test(text)) return 'de-DE';
    if (/[œæ]/iu.test(text) || /\b(bonjour|merci|je|vous|rendez-vous|hôpital|besoin)\b/iu.test(text)) return 'fr-FR';
    if (/[A-Za-z\u00C0-\u024F]/u.test(text)) {
      const latinLanguages = ['en', 'es', 'fr', 'de', 'pt', 'it', 'nl', 'tr', 'id', 'vi', 'fil', 'sw'];
      if (latinLanguages.some((prefix) => selected.startsWith(prefix))) return languageSelect.value;
      const browserLanguage = navigator.language || '';
      return /^[a-z]{2,3}-/i.test(browserLanguage) ? browserLanguage : 'en-US';
    }
    return languageSelect?.value || navigator.language || 'en-US';
  }

  function welcomeForLanguage(language) {
    const prefix = String(language || '').toLowerCase().split('-')[0];
    const greetings = {
      en: 'Welcome to Gama Hospital. I am the Gama Hospital AI Assistant. How may I help you today?',
      ta: 'வணக்கம். காமா மருத்துவமனைக்கு உங்களை அன்புடன் வரவேற்கிறோம். நான் காமா மருத்துவமனையின் AI உதவியாளர். இன்று உங்களுக்கு எப்படி உதவலாம்?',
      ar: 'مرحباً بكم في مستشفى جاما. أنا المساعد الذكي لمستشفى جاما. كيف يمكنني مساعدتكم اليوم؟',
      hi: 'नमस्ते। गामा अस्पताल में आपका स्वागत है। मैं गामा अस्पताल का AI सहायक हूँ। आज मैं आपकी कैसे मदद कर सकता हूँ?',
      ur: 'گاما ہسپتال میں خوش آمدید۔ میں گاما ہسپتال کا AI اسسٹنٹ ہوں۔ آج میں آپ کی کیا مدد کر سکتا ہوں؟',
      ml: 'നമസ്കാരം. ഗാമ ആശുപത്രിയിലേക്ക് സ്വാഗതം. ഞാൻ ഗാമ ആശുപത്രിയുടെ AI അസിസ്റ്റന്റാണ്. ഇന്ന് എങ്ങനെ സഹായിക്കാം?',
      es: 'Bienvenido a Gama Hospital. Soy el asistente de inteligencia artificial de Gama Hospital. ¿Cómo puedo ayudarle hoy?',
      fr: 'Bienvenue à Gama Hospital. Je suis l’assistant IA de Gama Hospital. Comment puis-je vous aider aujourd’hui?',
      de: 'Willkommen im Gama Hospital. Ich bin der KI-Assistent des Gama Hospital. Wie kann ich Ihnen heute helfen?',
      pt: 'Bem-vindo ao Gama Hospital. Sou o assistente de inteligência artificial do Gama Hospital. Como posso ajudar hoje?'
    };
    return greetings[prefix] || '';
  }

  function speakText(text, language) {
    if (!speechEnabled || !('speechSynthesis' in window) || !text) return;
    if (listening) {
      pendingSpokenReplies.push({ text, language });
      return;
    }

    const synth = window.speechSynthesis;
    if (synth.getVoices().length === 0 && !voiceListWaitExpired && !voiceLoadFallbackTimer) {
      speechWaitingForVoices.push({ text, language });
      voiceLoadFallbackTimer = window.setTimeout(() => {
        voiceLoadFallbackTimer = 0;
        voiceListWaitExpired = true;
        const waiting = speechWaitingForVoices.splice(0);
        waiting.forEach((item) => speakText(item.text, item.language));
      }, 1200);
      return;
    }
    if (synth.getVoices().length === 0 && !voiceListWaitExpired) {
      speechWaitingForVoices.push({ text, language });
      return;
    }

    window.speechSynthesis.resume?.();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language || 'en-US';
    const voices = synth.getVoices();
    const languagePrefix = utterance.lang.toLowerCase().split('-')[0];
    const matchingVoice = voices.find((voice) => voice.lang.toLowerCase().startsWith(languagePrefix));
    if (matchingVoice) utterance.voice = matchingVoice;
    utterance.rate = 0.96;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.onstart = () => setStatus('Assistant is speaking…', true);
    utterance.onend = () => {
      if (voiceStatus?.textContent === 'Assistant is speaking…') setStatus('', false);
    };
    utterance.onerror = (event) => {
      console.warn('Assistant voice playback failed:', event.error);
      setStatus('Voice playback is unavailable. Check your browser speech voices.', true);
    };
    try {
      synth.speak(utterance);
    } catch (error) {
      console.error('Could not start assistant speech:', error);
      setStatus('Assistant voice could not start. Check browser audio and speech voice settings.', true);
    }
  }

  if ('speechSynthesis' in window) {
    window.speechSynthesis.addEventListener?.('voiceschanged', () => {
      if (!window.speechSynthesis.getVoices().length) return;
      if (voiceLoadFallbackTimer) {
        window.clearTimeout(voiceLoadFallbackTimer);
        voiceLoadFallbackTimer = 0;
      }
      voiceListWaitExpired = false;
      const waiting = speechWaitingForVoices.splice(0);
      waiting.forEach((item) => speakText(item.text, item.language));
    });
  }

  function announceWelcome() {
    if (welcomeSpoken || !speechEnabled || !('speechSynthesis' in window)) return;
    welcomeSpoken = true;
    const language = languageSelect?.value || navigator.language || 'en-US';
    const greeting = welcomeForLanguage(language);
    if (greeting) {
      skipDuplicateWelcome = true;
      speakText(greeting, language);
    }
  }

  function messageParts(message) {
    const candidates = [
      message,
      message?.message,
      message?.data,
      message?.event,
      message?.payload,
      message?.data?.message,
      message?.data?.payload,
      message?.event?.message,
      message?.event?.payload
    ].filter(Boolean);

    const getText = (value) => {
      if (typeof value === 'string') return value;
      if (Array.isArray(value)) return value.map(getText).filter(Boolean).join('\n');
      if (!value || typeof value !== 'object') return '';
      if (typeof value.text === 'string') return value.text;
      if (typeof value.preview === 'string') return value.preview;
      if (typeof value.content === 'string') return value.content;
      if (Array.isArray(value.blocks)) return getText(value.blocks);
      if (Array.isArray(value.payload)) return getText(value.payload);
      if (value.payload) return getText(value.payload);
      return '';
    };

    const text = candidates.map(getText).find((value) => value.trim()) || '';
    const direction = String(
      message?.direction || message?.message?.direction || message?.data?.direction || message?.event?.direction || ''
    ).toLowerCase();
    const id = message?.id || message?.messageId || message?.message?.id || message?.data?.id || '';
    return { text: text.trim(), direction, id: String(id) };
  }

  function speakBotReply(message, acceptEitherDirection = false) {
    if (!speechEnabled || !('speechSynthesis' in window) || !message) return;
    const { text, direction, id } = messageParts(message);
    if (!acceptEitherDirection && direction && direction !== 'outgoing') return;
    if (!text) return;
    if (id && id === lastSpokenMessageId) return;
    if (id) lastSpokenMessageId = id;

    const cleanText = text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/\bGama Hospital AI Concierge\b/gi, 'Gama Hospital AI Assistant');
    if (skipDuplicateWelcome && /(welcome|gama hospital ai|வணக்கம்|வரவேற்கிறோம்|مرحباً)/iu.test(cleanText)) {
      skipDuplicateWelcome = false;
      return;
    }
    skipDuplicateWelcome = false;
    setStatus('Reply received. Starting voice…', true);
    speakText(cleanText, lastQuestionLanguage || languageFor(cleanText));
  }

  function handleBotpressMessage(message) {
    if (!message) return;
    const { text, direction } = messageParts(message);
    const isUserMessage = ['incoming', 'user', 'from_user', 'from-user'].includes(direction);
    if (text && lastSentUserText && text.trim().toLowerCase() === lastSentUserText.trim().toLowerCase()) {
      lastQuestionLanguage = languageFor(text);
      lastSentUserText = '';
      awaitingBotReply = true;
      return;
    }
    if (isUserMessage) {
      if (text) lastQuestionLanguage = languageFor(text);
      awaitingBotReply = true;
      return;
    }
    if (awaitingBotReply && text) {
      awaitingBotReply = false;
      speakBotReply(message, true);
      return;
    }
    speakBotReply(message);
  }

  document.querySelectorAll('[data-chat-prompt]').forEach((button) => {
    button.addEventListener('click', () => {
      const text = String(button.dataset.chatPrompt || '').trim();
      if (!text) return;
      sendChatMessage(text);
    });
  });

  launcher?.addEventListener('click', openBotpressChat);
  chatNavButton?.addEventListener('click', openBotpressChat);
  closeButton?.addEventListener('click', closeBotpressChat);
  logoTrigger?.addEventListener('click', openBotpressChat);

  launcherMic?.addEventListener('click', () => {
    openBotpressChat(false);
    if (listening) recognition?.stop();
    else beginListening();
  });

  voiceInput?.addEventListener('click', () => {
    if (listening) {
      recognition?.stop();
      return;
    }
    openBotpressChat(false);
    beginListening();
  });

  speechToggle?.addEventListener('click', () => {
    speechEnabled = !speechEnabled;
    speechToggle.setAttribute('aria-pressed', String(speechEnabled));
    speechToggle.setAttribute('aria-label', speechEnabled ? 'Mute spoken replies' : 'Enable spoken replies');
    speechToggle.title = speechEnabled ? 'Mute spoken replies' : 'Enable spoken replies';
    speechToggle.textContent = speechEnabled ? '🔊' : '🔇';
    if (!speechEnabled) window.speechSynthesis?.cancel();
    else {
      window.speechSynthesis?.resume?.();
      announceWelcome();
    }
  });

  let botpressEventsBound = false;
  function bindBotpressEvents() {
    if (botpressEventsBound || !window.botpress || typeof window.botpress.on !== 'function') return botpressEventsBound;
    botpressEventsBound = true;
    window.botpress.on('webchat:initialized', closeBotpressChat);
    window.botpress.on('webchat:ready', () => {
      webchatReady = true;
      flushPendingMessages();
    });
    window.botpress.on('webchat:opened', () => setPanelOpen(true));
    window.botpress.on('webchat:closed', () => {
      webchatReady = false;
      setPanelOpen(false);
    });
    window.botpress.on('message', handleBotpressMessage);
    return true;
  }

  if (!bindBotpressEvents()) {
    let bindAttempts = 0;
    const bindTimer = window.setInterval(() => {
      bindAttempts += 1;
      if (bindBotpressEvents() || bindAttempts >= 100) window.clearInterval(bindTimer);
    }, 100);
  }

  function hideExternalBotpressLauncher() {
    document.querySelectorAll('iframe[title="Botpress"], .bpFabWrapper, .bpFab, .bpMessagePreviewContainer, [class*="bp"], [id*="bp"]').forEach((element) => {
      if (element.closest('#bp-embedded-webchat')) return;
      const style = window.getComputedStyle(element);
      const text = (element.innerText || element.textContent || '').replace(/\s+/g, ' ').trim();
      const isGreetingPopup = /hi!?\s*👋?\s*need help\?/i.test(text);
      if (element.matches('.bpFabWrapper, .bpFab, .bpMessagePreviewContainer') || (style.position === 'fixed' && isGreetingPopup)) {
        element.style.setProperty('display', 'none', 'important');
        element.style.setProperty('visibility', 'hidden', 'important');
        element.style.setProperty('pointer-events', 'none', 'important');
      }
    });
  }

  hideExternalBotpressLauncher();
  new MutationObserver(hideExternalBotpressLauncher).observe(document.documentElement, { childList: true, subtree: true });
  setPanelOpen(false);
})();
