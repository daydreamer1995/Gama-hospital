/* =====================================================
   GAMA HOSPITAL AI
   VOICEFLOW CONNECTION
===================================================== */


/* =====================================================
   WAIT FOR VOICEFLOW
===================================================== */

function waitForVoiceflow(callback){

    let attempts = 0;


    const timer = setInterval(function(){

        attempts++;


        if(
            window.voiceflow &&
            window.voiceflow.chat
        ){

            clearInterval(timer);

            callback();

        }


        /*
           Stop checking after 20 seconds.
        */

        if(attempts >= 100){

            clearInterval(timer);

            console.warn(
                "Voiceflow is not ready."
            );

        }

    },200);

}


/* =====================================================
   OPEN VOICEFLOW
===================================================== */

function openAI(){

    waitForVoiceflow(function(){

        try{

            if(
                typeof
                window.voiceflow.chat.open
                === "function"
            ){

                window.voiceflow.chat.open();

            }

        }catch(error){

            console.error(
                "Voiceflow open error:",
                error
            );

        }

    });

}


/* =====================================================
   CUSTOM GAMA BUTTON
===================================================== */

const gamaButton =
    document.getElementById(
        "gamaAIButton"
    );


if(gamaButton){

    gamaButton.addEventListener(
        "click",
        function(){

            openAI();

        }
    );

}


/* =====================================================
   SEND QUICK QUESTION TO VOICEFLOW
===================================================== */

function askAI(message){

    openAI();


    /*
       Wait until Voiceflow is ready
       and then send the user's request.
    */

    waitForVoiceflow(function(){

        setTimeout(function(){

            try{

                if(
                    typeof
                    window.voiceflow.chat.interact
                    === "function"
                ){

                    window.voiceflow.chat.interact({

                        type:"text",

                        payload:message

                    });

                }

            }catch(error){

                console.error(
                    "Voiceflow message error:",
                    error
                );

            }

        },500);

    });

}


/* =====================================================
   EMERGENCY
===================================================== */

function openEmergency(){

    askAI(
        "I need emergency assistance."
    );

}


/* =====================================================
   PAGE LOAD
===================================================== */

window.addEventListener(
    "load",
    function(){

        console.log(
            "Gama Hospital AI loaded."
        );

    }
);
