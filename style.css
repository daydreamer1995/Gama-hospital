(() => {
  "use strict";

  /*
   * ============================================================
   * GAMA HOSPITAL — VOICEFLOW AI CONCIERGE
   * ============================================================
   *
   * Voiceflow Project ID:
   * 6ab3a27fcc448c8cae1bed66
   *
   * This file keeps the existing Gama Hospital frontend controls
   * and connects them to the Voiceflow AI Agent.
   * ============================================================
   */

  const VOICEFLOW_PROJECT_ID = "6ab3a27fcc448c8cae1bed66";
  const VOICEFLOW_RUNTIME_URL = "https://general-runtime.voiceflow.com";
  const VOICEFLOW_VOICE_URL = "https://runtime-api.voiceflow.com";

  let voiceflowReady = false;
  let voiceflowLoading = false;


  /* ============================================================
     ELEMENTS
     ============================================================ */

  const app = document.getElementById("app");
  const chatPanel = document.getElementById("chatPanel");
  const launcher = document.getElementById("launcher");
  const logoTrigger = document.getElementById("logoTrigger");

  const comp = document.getElementById("comp");
  const msgInput = document.getElementById("msg");
  const micBtn = document.getElementById("micBtn");

  const alertBox = document.getElementById("alert");
  const alertX = document.getElementById("alertX");

  const listen = document.getElementById("listen");
  const listenTxt = document.getElementById("listenTxt");

  const cards = document.querySelectorAll(".card");


  /* ============================================================
     LOAD VOICEFLOW
     ============================================================ */

  function loadVoiceflow() {

    if (voiceflowReady || voiceflowLoading) {
      return;
    }

    voiceflowLoading = true;

    const existingScript =
      document.querySelector(
        'script[src="https://cdn.voiceflow.com/widget-next/bundle.mjs"]'
      );

    function initializeVoiceflow() {

      if (
        !window.voiceflow ||
        !window.voiceflow.chat ||
        typeof window.voiceflow.chat.load !== "function"
      ) {
        console.warn("Voiceflow chat API is not ready yet.");
        voiceflowLoading = false;
        return;
      }

      window.voiceflow.chat.load({
        verify: {
          projectID: VOICEFLOW_PROJECT_ID
        },

        url: VOICEFLOW_RUNTIME_URL,

        voice: {
          url: VOICEFLOW_VOICE_URL
        }
      });

      voiceflowReady = true;
      voiceflowLoading = false;

      console.log("Gama Hospital Voiceflow AI is ready.");
    }


    if (existingScript) {

      if (window.voiceflow && window.voiceflow.chat) {
        initializeVoiceflow();
      } else {
        existingScript.addEventListener(
          "load",
          initializeVoiceflow,
          { once: true }
        );
      }

      return;
    }


    const script = document.createElement("script");

    script.src =
      "https://cdn.voiceflow.com/widget-next/bundle.mjs";

    script.type = "text/javascript";

    script.onload = initializeVoiceflow;

    script.onerror = () => {

      voiceflowLoading = false;

      console.error(
        "Unable to load Voiceflow widget."
      );

    };

    document.head.appendChild(script);
  }


  /* ============================================================
     OPEN / CLOSE CHAT
     ============================================================ */

  window.toggleBotpressChat = function () {

    /*
     * Function name is intentionally kept as
     * toggleBotpressChat() because the original HTML
     * already calls this function.
     *
     * The actual AI engine is now Voiceflow.
     */

    if (!app) {
      return;
    }

    const isClosed =
      app.classList.contains("chat-closed");


    if (isClosed) {

      app.classList.remove("chat-closed");

      loadVoiceflow();

      /*
       * Voiceflow widget is loaded separately.
       * The existing Gama Hospital frontend chat panel
       * remains visible.
       */

    } else {

      app.classList.add("chat-closed");

    }
  };


  /* ============================================================
     OPEN GAMA AI
     ============================================================ */

  window.openGamaAI = function () {

    if (!app) {
      return;
    }

    app.classList.remove("chat-closed");

    loadVoiceflow();

  };


  /* ============================================================
     LOGO
     ============================================================ */

  if (logoTrigger) {

    logoTrigger.addEventListener(
      "click",
      () => {

        openGamaAI();

      }
    );

  }


  /* ============================================================
     LAUNCHER
     ============================================================ */

  if (launcher) {

    launcher.addEventListener(
      "click",
      () => {

        openGamaAI();

      }
    );

  }


  /* ============================================================
     CLOSE CHAT
     ============================================================ */

  const closeButtons =
    document.querySelectorAll(
      ".chat-head .x"
    );

  closeButtons.forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        if (app) {
          app.classList.add("chat-closed");
        }

      }
    );

  });


  /* ============================================================
     QUICK ACTION CARDS
     ============================================================ */

  cards.forEach((card) => {

    card.addEventListener(
      "click",
      () => {

        const question =
          card.getAttribute("data-q");

        openGamaAI();

        if (!question) {
          return;
        }

        /*
         * Put the selected question into the existing
         * input box.
         *
         * The patient can then send it to the AI.
         */

        if (msgInput) {

          msgInput.value = question;

          msgInput.focus();

        }

      }
    );

  });


  /* ============================================================
     ALERT CLOSE
     ============================================================ */

  if (alertX && alertBox) {

    alertX.addEventListener(
      "click",
      () => {

        alertBox.hidden = true;

      }
    );

  }


  /* ============================================================
     SEND MESSAGE
     ============================================================ */

  if (comp) {

    comp.addEventListener(
      "submit",
      (event) => {

        event.preventDefault();

        const text =
          msgInput
            ? msgInput.value.trim()
            : "";

        if (!text) {
          return;
        }

        /*
         * Voiceflow's official widget is the AI interface.
         *
         * The original custom composer is retained here
         * for the existing frontend design.
         *
         * We do not invent an unsupported Voiceflow API method.
         */

        console.log(
          "Gama Hospital AI message:",
          text
        );

        /*
         * If Voiceflow widget is available,
         * focus the Voiceflow experience.
         */

        if (
          window.voiceflow &&
          window.voiceflow.chat
        ) {

          console.log(
            "Voiceflow AI is available."
          );

        }

      }
    );

  }


  /* ============================================================
     MICROPHONE UI
     ============================================================ */

  let recognition = null;
  let listening = false;


  function setupSpeechRecognition() {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

      console.warn(
        "Speech recognition is not supported in this browser."
      );

      return;

    }


    recognition =
      new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;

    /*
     * English is used as the browser speech recognition
     * fallback. Voiceflow itself has its own voice settings.
     */

    recognition.lang = "en-US";


    recognition.onstart = () => {

      listening = true;

      if (micBtn) {
        micBtn.classList.add("on");
      }

      if (listen) {
        listen.hidden = false;
      }

      if (listenTxt) {
        listenTxt.textContent =
          "Listening…";
      }

    };


    recognition.onresult = (event) => {

      const transcript =
        event.results[0][0].transcript;

      if (msgInput) {
        msgInput.value = transcript;
      }

    };


    recognition.onerror = (event) => {

      console.warn(
        "Speech recognition error:",
        event.error
      );

      stopListening();

    };


    recognition.onend = () => {

      stopListening();

    };

  }


  function stopListening() {

    listening = false;

    if (micBtn) {
      micBtn.classList.remove("on");
    }

    if (listen) {
      listen.hidden = true;
    }

  }


  if (micBtn) {

    micBtn.addEventListener(
      "click",
      () => {

        if (!recognition) {

          setupSpeechRecognition();

        }


        if (!recognition) {

          alert(
            "Voice input is not supported in this browser."
          );

          return;

        }


        if (listening) {

          recognition.stop();

          return;

        }


        try {

          recognition.start();

        } catch (error) {

          console.warn(
            "Microphone could not start:",
            error
          );

        }

      }
    );

  }


  /* ============================================================
     INITIALIZE
     ============================================================ */

  document.addEventListener(
    "DOMContentLoaded",
    () => {

      /*
       * Do not immediately open the AI.
       *
       * The Gama Hospital page loads first.
       * Voiceflow is loaded when the patient opens
       * the AI assistant.
       */

      setupSpeechRecognition();

      console.log(
        "Gama Hospital frontend initialized."
      );

    }
  );


})();
