/**
 * Main file
 * Contains basic setup functions
 * 
 * Author: Dom D'Attilio, Gage Burmaster, Logan Schmalz
 * Date: 11/18/2021
 */

/**
 * @name Unnamed_window_load_event
 * @desc Wait for all files to be loaded before running scripts
 * @listens load
 */
window.addEventListener("load", () => {
	USRulesButtonRegister();
    UKRulesButtonRegister();
	
	registerAcceptOffer();
	registerDeclineOffer();
})

/**
 * @desc This function adds an event listener for the US start button
 * @listens click
 */
function USRulesButtonRegister() {
    document.getElementById("USRules").addEventListener('click', e => {
		gameplay(1);
		document.getElementById("caseArea").style.border = "solid";
		document.getElementById("moneyArea").style.border = "dotted";
	});
}

/**
 * @desc This function adds an event listener for the UK start button
 * @listens click
 */
function UKRulesButtonRegister() {
    document.getElementById("UKRules").addEventListener('click', e => {
		gameplay(2);
		document.getElementById("caseArea").style.border = "solid";
		document.getElementById("moneyArea").style.border = "dotted";
    });
}

/**
 * @desc This function adds event listeners to each case
 * @listens click
 */
function registerCaseClicks(n) {
	for (let i = 1; i <= n; i++) {
		document.getElementById(`case${i}`).addEventListener('click', e => {
			if (choosingCase == true) {
				chooseCase(i);
				choosingCase = false;
				gameloop();
			}
		});
	}
}

/**
 * @desc This function adds an event listener for the accept button
 * @listens click
 */
function registerAcceptOffer() {
	document.getElementById("accept").addEventListener('click', e => {
		if (choosingOffer == true) {
			choosingOffer = false;
			document.getElementById("offer").style.display = "none";
			acceptOffer();
		}
	});
}

/**
 * @desc This function adds an event listener for the decline button
 * @listens click
 */
function registerDeclineOffer() {
	document.getElementById("decline").addEventListener('click', e => {
		if (choosingOffer == true) {
			round++;
			casesEliminated = 0;
			choosingOffer = false;
			document.getElementById("offer").style.display = "none";
			gameloop();
		}
	});
}