"use strict";


/* =================================================
   GAMA HOSPITAL
   VOICEFLOW AI CONTROLLER
================================================= */


/* =================================================
   OPEN VOICEFLOW CHAT
================================================= */

window.openGamaAI =
  function(message) {


    function openNow() {


      /* Voiceflow not ready */

      if (
        !window.voiceflow ||
        !window.voiceflow.chat
      ) {

        return false;

      }


      try {


        /* =========================================
           OPEN REAL VOICEFLOW CHAT BOX
        ========================================= */

        if (
          typeof
          window.voiceflow.chat.open ===
          "function"
        ) {

          window.voiceflow.chat.open();

        }


        /* =========================================
           SEND THE SELECTED CARD REQUEST
        ========================================= */

        if (
          message &&
          typeof
          window.voiceflow.chat.interact ===
          "function"
        ) {


          setTimeout(
            function() {


              try {


                /*
                 * Voiceflow text event
                 */

                window.voiceflow.chat.interact({

                  type: "text",

                  payload: message

                });


              }

              catch(error) {

                console.error(
                  "GAMA AI message error:",
                  error
                );

              }


            },
            500
          );

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



    /* =========================================
       WAIT FOR VOICEFLOW
    ========================================= */

    if (
      openNow()
    ) {

      return;

    }


    let attempts = 0;


    const retry =
      setInterval(
        function() {


          attempts++;


          if (
            openNow() ||
            attempts >= 15
          ) {

            clearInterval(retry);

          }


        },
        400
      );


  };



/* =================================================
   PAGE READY
================================================= */

document.addEventListener(
  "DOMContentLoaded",
  function() {


    /* =========================================
       MAIN GAMA AI BUTTON
    ========================================= */

    const openGamaAIButton =
      document.getElementById(
        "openGamaAI"
      );


    if (
      openGamaAIButton
    ) {


      openGamaAIButton.addEventListener(
        "click",
        function() {

          window.openGamaAI();

        }
      );

    }



    /* =========================================
       FLOATING GAMA AI BUTTON
    ========================================= */

    const floatingAI =
      document.getElementById(
        "gamaFloatingAI"
      );


    if (
      floatingAI
    ) {


      floatingAI.addEventListener(
        "click",
        function() {

          window.openGamaAI();

        }
      );

    }



    /* =========================================
       ALL WHITE ACTION CARDS
    ========================================= */

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



    /* =========================================
       DEPARTMENT MODAL
    ========================================= */

    const modal =
      document.getElementById(
        "departmentModal"
      );


    const departmentButton =
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


    const departmentList =
      document.getElementById(
        "departmentList"
      );



    /* =========================================
       DEPARTMENTS
    ========================================= */

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



    /* =========================================
       RENDER DEPARTMENTS
    ========================================= */

    function renderDepartments(
      query
    ) {


      if (
        !departmentList
      ) {

        return;

      }


      const keyword =
        (
          query || ""
        )
        .trim()
        .toLowerCase();


      departmentList.innerHTML =
        "";


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


            whatsapp.href =
              "https://wa.me/966920033175?text=" +
              encodeURIComponent(
                "Hello GAMA Hospital, I need information about " +
                department
              );


            whatsapp.target =
              "_blank";


            whatsapp.rel =
              "noopener noreferrer";


            whatsapp.textContent =
              "WhatsApp";


            li.appendChild(
              name
            );


            li.appendChild(
              whatsapp
            );


            departmentList.appendChild(
              li
            );


          }
        );

    }



    /* =========================================
       OPEN DEPARTMENT MODAL
    ========================================= */

    if (
      departmentButton &&
      modal
    ) {


      departmentButton.addEventListener(
        "click",
        function() {


          modal.hidden =
            false;


          renderDepartments(
            ""
          );


          setTimeout(
            function() {


              if (
                search
              ) {

                search.focus();

              }


            },
            100
          );


        }
      );


    }



    /* =========================================
       CLOSE MODAL
    ========================================= */

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



    /* =========================================
       OUTSIDE CLICK
    ========================================= */

    if (
      modal
    ) {


      modal.addEventListener(
        "click",
        function(event) {


          if (
            event.target ===
            modal
          ) {


            modal.hidden =
              true;


          }


        }
      );


    }



    /* =========================================
       SEARCH
    ========================================= */

    if (
      search
    ) {


      search.addEventListener(
        "input",
        function() {


          renderDepartments(
            search.value
          );


        }
      );


    }



    /* =========================================
       ESCAPE
    ========================================= */

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
