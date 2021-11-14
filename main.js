/**
 * @name Unnamed_window_load_event
 * @desc Wait for all files to be loaded before running scripts
 * @listens load
 */
window.addEventListener("load", () => {
    /*g_canvas = document.querySelector("#canvas");
    g_context = canvas.getContext('2d');


    //from https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images
    g_context.mozImageSmoothingEnabled = false;
    g_context.webkitImageSmoothingEnabled = false;
    g_context.msImageSmoothingEnabled = false;
    g_context.imageSmoothingEnabled = false;*/

    //startButtonRegister();
	USRulesButtonRegister();
    UKRulesButtonRegister();
	
    //window.requestAnimationFrame(gameplayLoop);
	registerAcceptOffer();
	registerDeclineOffer();
})

/**
 * @desc This function adds an event listener for the start button
 * @listens click
 */
function startButtonRegister() {
    document.getElementById("startButton").addEventListener('click', e => {
        /*if (g_mode == "unstarted") {
            g_maxShips = document.getElementById("number_of_ships").value;
            g_mode = "start";
        }*/

        //unguarded (fix later)
        let ruleset = prompt("What ruleset would you like to play with?\n1: US Ruleset\n2: UK Ruleset\n3: Multiple cases");
		gameplay(ruleset);
    });
}

function USRulesButtonRegister() {
    document.getElementById("USRules").addEventListener('click', e => {
		gameplay(1);
    });
}

function UKRulesButtonRegister() {
    document.getElementById("UKRules").addEventListener('click', e => {
		gameplay(2);
    });
}

function registerCaseClicks(n) {
	for (let i = 1; i <= n; i++) {
		document.getElementById(`case${i}`).addEventListener('click', e => {
			if (choosingCase == true) {
				chooseCase(i);
				choosingCase = false;
				gameloopUS();
			}
		});
	}
}

function registerAcceptOffer() {
	document.getElementById("accept").addEventListener('click', e => {
		if (choosingOffer == true) {
			acceptOfferUS();
			choosingOffer = false;
		}
	});
}

function registerDeclineOffer() {
	document.getElementById("decline").addEventListener('click', e => {
		if (choosingOffer == true) {
			round++;
			casesEliminated = 0;
			choosingOffer = false;
			document.getElementById("offer").style.display = "none";
			gameloopUS();
		}
	});
}