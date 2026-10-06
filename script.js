"use strict";


/* =========================================
   GAMA HOSPITAL
   VOICEFLOW AI CONTROL
========================================= */


/* =========================================
   OPEN GAMA AI CHAT
========================================= */

window.openGamaAI = function(message) {


  function openChat() {


    /* Voiceflow இன்னும் load ஆகவில்லை */

    if (
      !window.voiceflow ||
      !window.voiceflow.chat
    ) {

      console.log(
        "GAMA AI is loading..."
      );

      return false;

    }


    try {


      /* ==============================
         OPEN VOICEFLOW CHAT BOX
      ============================== */

      if (
        typeof window.voiceflow.chat.open ===
        "function"
      ) {

        window.voiceflow.chat.open();

      }


      /* ==============================
         SEND CARD MESSAGE
      ============================== */

      if (
        message &&
        typeof window.voiceflow.chat.interact ===
        "function"
      ) {

        setTimeout(function() {

          try {

            window.voiceflow.chat.interact({

              type: "text",

              payload: {

                message: message

              }

            });

          }

          catch(error) {

            console.warn(
              "GAMA AI message error:",
              error
            );

          }

        }, 700);

      }


      return true;

    }

    catch(error) {

      console.error(
        "GAMA AI open error:",
        error
      );

      return false;

    }

  }


  /* ==============================
     FIRST TRY
  ============================== */

  if (openChat()) {

    return;

  }


  /* ==============================
     RETRY IF VOICEFLOW LOADING
  ============================== */

  let attempts = 0;


  const retry =
    setInterval(function() {


      attempts++;


      if (
        openChat() ||
        attempts >= 12
      ) {

        clearInterval(retry);

      }


    }, 500);

};



/* =========================================
   PAGE READY
========================================= */

document.addEventListener(
  "DOMContentLoaded",
  function() {


    /* =====================================
       OPEN GAMA AI BUTTON
    ===================================== */

    const mainAI =
      document.getElementById(
        "openGamaAI"
      );


    if (mainAI) {

      mainAI.addEventListener(
        "click",
        function() {

          window.openGamaAI();

        }
      );

    }



    /* =====================================
       FLOATING GAMA AI BUTTON
    ===================================== */

    const floatingAI =
      document.getElementById(
        "gamaFloatingAI"
      );


    if (floatingAI) {

      floatingAI.addEventListener(
        "click",
        function() {

          window.openGamaAI();

        }
      );

    }



    /* =====================================
       ALL GAMA AI CARDS
    ===================================== */

    const cards =
      document.querySelectorAll(
        ".action-card[data-chat-prompt]"
      );


    cards.forEach(
      function(card) {


        card.addEventListener(
          "click",
          function() {


            const message =
              card.getAttribute(
                "data-chat-prompt"
              );


            window.openGamaAI(
              message
            );


          }
        );


      }
    );



    /* =====================================
       DEPARTMENT MODAL
    ===================================== */

    const modal =
      document.getElementById(
        "departmentModal"
      );


    const openDepartment =
      document.getElementById(
        "departmentButton"
      );


    const closeDepartment =
      document.getElementById(
        "closeDepartment"
      );


    const search =
      document.getElementById(
        "departmentSearch"
      );


    const list =
      document.getElementById(
        "departmentList"
      );



    /* =====================================
       DEPARTMENT DATA
    ===================================== */

    const departments = [

      "Cardiology",

      "Internal Medicine",

      "General Surgery",

      "Orthopedics",

      "Pediatrics",

      "Obstetrics & Gynecology",

      "ENT",

      "Ophthalmology",

      "Dermatology",

      "Urology",

      "Nephrology",

      "Emergency Department"

    ];



    /* =====================================
       RENDER DEPARTMENTS
    ===================================== */

    function renderDepartments(
      query
    ) {


      if (!list) {

        return;

      }


      const keyword =
        (query || "")
        .trim()
        .toLowerCase();


      list.innerHTML = "";



      departments
        .filter(
          function(department) {

            return (
              keyword === "" ||
              department
                .toLowerCase()
                .includes(keyword)
            );

          }
        )


        .forEach(
          function(department) {


            const li =
              document.createElement(
                "li"
              );


            const name =
              document.createElement(
                "span"
              );


            name.textContent =
              department;


            const whatsapp =
              document.createElement(
                "a"
              );


            whatsapp.target =
              "_blank";


            whatsapp.rel =
              "noopener noreferrer";


            whatsapp.href =
              "https://wa.me/966920033175?text=" +
              encodeURIComponent(
                "Hello GAMA Hospital, I need information about " +
                department
              );


            whatsapp.textContent =
              "WhatsApp";


            li.appendChild(name);

            li.appendChild(
              whatsapp
            );


            list.appendChild(li);


          }
        );

    }



    /* =====================================
       OPEN DEPARTMENT MODAL
    ===================================== */

    if (
      openDepartment &&
      modal
    ) {


      openDepartment.addEventListener(
        "click",
        function() {


          modal.hidden =
            false;


          renderDepartments("");


          setTimeout(
            function() {

              if (search) {

                search.focus();

              }

            },
            100
          );


        }
      );


    }



    /* =====================================
       CLOSE DEPARTMENT
    ===================================== */

    if (
      closeDepartment &&
      modal
    ) {


      closeDepartment.addEventListener(
        "click",
        function() {

          modal.hidden =
            true;

        }
      );


    }



    /* =====================================
       CLICK OUTSIDE MODAL
    ===================================== */

    if (modal) {


      modal.addEventListener(
        "click",
        function(event) {


          if (
            event.target === modal
          ) {

            modal.hidden =
              true;

          }


        }
      );


    }



    /* =====================================
       SEARCH DEPARTMENT
    ===================================== */

    if (search) {


      search.addEventListener(
        "input",
        function() {


          renderDepartments(
            search.value
          );


        }
      );


    }



    /* =====================================
       ESC KEY
    ===================================== */

    document.addEventListener(
      "keydown",
      function(event) {


        if (
          event.key === "Escape" &&
          modal &&
          !modal.hidden
        ) {


          modal.hidden =
            true;


        }


      }
    );


  }
);
