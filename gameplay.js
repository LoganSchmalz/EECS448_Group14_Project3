//Array for case values
//first two are const for resetting the game and remembering possible values
const caseValuesUS = [0.01,1,5,10,25,50,75,100,200,300,400,500,750,1000,5000,10000,25000,50000,75000,100000,200000,300000,400000,500000,750000,1000000];
const caseValuesUK = [.01,.1,.5,1,5,10,50,100,250,500,750,1000,3000,5000,10000,15000,20000,35000,50000,75000,100000,250000];
//these two are dynamic and used in gameplay/rendering, it is set to the chosen set of cases for the rules
let caseValuesConst = [];
let caseValues = [];

//Payout if all cases are there
let basePayout_US = 131477.54;
let basePayout_UK = 14814.20043;

//Global variable for bank offer
let bankOfferNum = 0;




//cases stored in array of Cases, which consists of CaseName and CaseNumber tuples
//Global array that will be modified throughout the game
let cases = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26];
let UKcases = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22];
//do we need a player global variable? what to keep track of there?

let heldCase = -1;
let heldValue = 0;

//setting up the US / UK arrays
let usArrayElim = [6,5,4,3,2,1,1,1,1,1];
let ukArrayElim = [5,3,3,3,3,3];

let ruleset = 0;
let round = 0;
let casesEliminated = 0;
let currentOffer = 0;
//determines what the player should be able to click on
let choosingCase = false;
let choosingOffer = false;

function ukCase23(heldValue)
{
	let selection = getRandomInt(0,4);
	if (selection == 0)
	{
		//10 thousand pounds
		console.log("Box 23 contained +£10,000, bringing your total amount won to " +  formatMoney(heldValue + 10000) + "!");
	}
	else if (selection == 1)
	{
		//Half
		console.log("Box 23 contained 'Half', bringing your total amount won to " +  formatMoney(heldValue/2) + ".");
	}
	else if (selection == 2)
	{
		//Money Back
		console.log("Box 23 contained 'Money Back', which means you still win " +  formatMoney(heldValue/2) + ".");
	}
	else if (selection == 3)
	{
		//Double
		console.log("Box 23 contained 'Double', which means you now win " +  formatMoney(heldValue*2) + "!");
	}
	else if (selection == 4)
	{
		//Nothing
		console.log("Box 23 contained 'Nothing', which means you go home with absolutely nothing.");
	}
}


//from https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



function gameplay(r)
{
	ruleset = r;
	if (ruleset == 1)
	{
		resetRender();
		resetGame();
		resetUS();
		gameloopUS();
	}
	if (ruleset == 2)
	{
		gameplayUK();
	}
	if (ruleset == 3)
	{

	}
}

function resetGame() {
	caseValuesConst = [];
	caseValues = [];
	bankOfferNum = 0;
	heldCase = -1;
	heldValue = 0;
	choosingCase = false;
	choosingOffer = false;
	round = 0;
	casesEliminated = 0;
	currentOffer = 0;
}

function resetUS() 
{
	cases = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26];
	caseValuesConst = caseValuesUS;
	console.log(caseValuesConst);
	caseValues = shuffle([...caseValuesUS]); //... needed to create copy, JS arrays are set by reference not by content
	console.log(caseValues);
	renderGame([6,7,7,6], formatMoney);
	registerCaseClicks(26);
}


/**
 * @desc This function runs the main gameplay loop, we allow it to access and modify global game data. UK RULES
 */
function gameplayUK() {
	caseValuesConst = caseValuesUK;
	caseValues = shuffle([...caseValuesUK]); //... needed to create copy, JS arrays are set by reference not by content
	//renderGame([5,6,6,5], formatMoneyUK);

	result = "";
	while (!Number.isInteger(result) || !UKcases.includes(result)) {
		result = parseInt(window.prompt("Pick a case to hold (between 1 and 22)", ""));
		console.log(result);
	}
	idx = UKcases.indexOf(result);
	heldCase = result;
	heldValue = caseValues[idx];
	caseValues.splice(idx, 1);
	UKcases.splice(idx, 1);
	console.log(UKcases);
	
	i = ukArrayElim[0];
	let k = 0;
	let iIndex = 0;
	let j = i;
	while (UKcases.length > 2) {
		console.log("You have " + i + " cases to eliminate this round.\n");
		while (k < i)
		{
			result = "";
			while (!Number.isInteger(result) || !UKcases.includes(result)) {
				result = parseInt(window.prompt("Pick a case to eliminate", ""));
			}
			idx = UKcases.indexOf(result);
			console.log("You eliminated case " + result + " which contained " + formatMoney(caseValues[idx]) + ".\n");
			caseValues.splice(idx, 1);
			UKcases.splice(idx, 1);
			console.log("The remaining cases are " + UKcases + ".\n");
			temp = [heldValue].concat(caseValues).sort((a, b) => a - b);
			console.log("The remaining values are " + temp + ".\n");
			k = k + 1; 
		}
		k = 0;
		offer = bankOffer(0);
		console.log("You have received an offer from the banker: " + formatMoney(offer) + " for your case.\n");
		
		if (iIndex < ukArrayElim.length-1)
		{
		i = ukArrayElim[iIndex + 1];
		iIndex = iIndex + 1;
		j=i;
		}

		result = "";
		while (result != "Y" && result != "N") {
			result = window.prompt("Deal or no deal (y/n)?", "");
			result = result.toUpperCase();
		}
		if (result == "Y") {
			console.log("You won " + formatMoney(offer) + "!\n");
			console.log("Your case had a value of " + formatMoney(heldValue) + ".");
			if (heldValue <= offer) 
				console.log("You made a good deal!");
			else
				console.log("You made a bad deal!");
			return;
		}
	}
	console.log("You have chosen your case and have won £" + heldValue + "!\n");
	let b23 = "";
	while (b23 != "Y" && b23 != "N") {
		b23= window.prompt("Would you like to purchase case 23 (y/n)?", "");
		b23 = b23.toUpperCase();
	}
	if (b23 == "Y") {
		ukCase23(heldValue);
	}
	else {
		console.log("Thanks for playing!");
	}
	/*console.log("There are two cases left, the one you have and one more case. They contain $" + heldValue + " or $" + caseValuesUS[0] + ".\n");
	result = "";
	while (result != "Y" && result != "N") {
		result = window.prompt("Would you like to swap cases (y/n)?", "");
		result = result.toUpperCase();
	}
	switch (result) {
		case "Y": console.log("You won $" + caseValuesUS[0] + "!\n"); break;
		case "N": console.log("You won $" + heldValue + "!\n"); break;
	}*/
}








//BIG GAP SO YOU DONT CONFUSE 'EM

/**
 * @desc This function runs the main gameplay loop, we allow it to access and modify global game data. US RULES
 */
function gameloopUS() {
	switch(round) {
		case 0:
			message("Please pick a case to hold.");
			choosingCase = true;
			break;
		case usArrayElim.length:
			message("You have chosen your case and have won $" + heldValue + "!\n")
			return;
		default:
			if (casesEliminated != usArrayElim[round-1]) {
				elim = usArrayElim[round-1]-casesEliminated;
				message("You have " + elim + " more cases to eliminate this round. Please pick a case to eliminate.");
				choosingCase = true;
			} else {
				currentOffer = bankOffer(1);
				message("You have received an offer from the banker: " + formatMoney(currentOffer) + " for your case.\n");
				choosingOffer = true;
				document.getElementById("offer").style.display = "block";
			}
			break;
	}
}

function acceptOfferUS() {
	message("You won " + formatMoney(currentOffer) + "! Your case had a value of " + formatMoney(heldValue) + ". " + ((heldValue <= currentOffer) ? "You made a good deal!" : "You made a bad deal!"));
}

/**
 * @desc pseudorandomly shuffles array (from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array)
 * @returns shuffled array
 */
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}


/**
 * @desc pseudorandomly shuffles cases
 * @returns 
 */
function randomizeCases(Cases)
{
  //  Cases.length  
  shuffle(Cases)

}


/**
 * @desc removes selected case while keeping the order of the cases the same (1,2,3,4 -> remove 3 -> 1,2,4)
 * @returns cases that was separated
 */
function chooseCase(i)
{
	idx = cases.indexOf(i);
	val = caseValues[idx];
	if (heldCase != -1) {
		console.log("You eliminated case " + i + " which contained " + formatMoney(val) + ".\n");
		caseValues.splice(idx, 1);
		cases.splice(idx, 1);
		console.log("The remaining cases are " + cases + ".\n");
		temp = [heldValue].concat(caseValues).sort((a, b) => a - b);
		console.log("The remaining values are " + temp + ".\n");
		casesEliminated++;
		document.getElementById(`val${val}`).style.visibility = "hidden";	
	} else {
		heldCase = i;
		heldValue = val;
		caseValues.splice(idx, 1);
		cases.splice(idx, 1);
		console.log(cases);
		round++;
	}
	document.getElementById(`case${i}`).style.visibility = "hidden";
}



/**
 * @desc function that calculates the expected value of the remaining cases
 * @returns expected value of remaining cases
 */
function expectedPayout(ruleset){
	temp = [heldValue].concat(caseValues);
	//if US rules are selected	
	if(ruleset == 1)
    {
  		//number of cases left
  		let n = temp.length;

  		//probability of selecting each case
  		let Px = (1/n);
  
  		//expected payout
  		let payout = 0;

  		//summation of P(x)*x
  		for(let i=0; i < n; i++)
  		{
   		 	payout = payout + (temp[i]*Px)
  		}
  		return payout;
    }

	else if(ruleset == 0)
	{
		//number of cases left
		let n = temp.length;

		  //probability of selecting each case
		  let Px = (1/n);
		  
		  //expected payout
		  let payout = 0;
		
		  //summation of P(x)*x
		  for(let i=0; i < n; i++)
		  {
			payout = payout + (temp[i]*Px)
		  }
		return payout;
	}
}



/**
 * @desc function that takes expected value of remaining cases and multiplies by random double in a specific range to generate offer from bank
 * @returns the offer from the bank
 */
function bankOffer(ruleset){

	//if US rules are selected
	if(ruleset == 1)
	{
 		//calls expectedPayout method to get value of the current expected payout
  		let expPayout = expectedPayout(1);
		 

  		//if expected value of remaining cases is less than initial expected value
  		if(expPayout <= basePayout_US)
  		{
    		let rand = Math.random() * (1 - .75) + .75;
    		//multiplies by random number from .75-.99
    		bankOfferNum = expPayout * rand;
  		}
 		//if expected value of remaining cases is greater than initial expected value
  		else if(expPayout > basePayout_US)
  		{
    		let rand = Math.random() * (1.51 - 1.1) + 1.1;
    		//multiplies by random number from 1.1-1.8
    		bankOfferNum = expPayout * rand;
    	}

		return bankOfferNum;
	}

	//if UK rules are selected
	else if(ruleset == 0)
	{
 		//calls expectedPayout method to get value of the current expected payout
		 let expPayout = expectedPayout(0);

		 //if expected value of remaining cases is less than initial expected value
		 if(expPayout <= basePayout_UK)
		 {
		   let rand = Math.random() * (1 - .75) + .75;
		   //multiplies by random number from .75-.99
		   bankOfferNum = expPayout * rand;
		 }
		//if expected value of remaining cases is greater than initial expected value
		 else if(expPayout > basePayout_UK)
		 {
		   let rand = Math.random() * (1.81 - 1.1) + 1.1;
		   //multiplies by random number from 1.1-1.8
		   bankOfferNum = expPayout * rand;
	   }

	   return bankOfferNum;
	}
}


function formatMoney(number)
{
	if (ruleset == 1)
	{
		return formatMoneyUS(number);
	}
	else if (ruleset == 2)
	{
		return formatMoneyUK(number);
	}
	else 
	{
		console.log("Error in formatMoney: Reached an unreachable state.\n");
	}
}


//from https://stackoverflow.com/questions/4022171/how-do-i-print-currency-format-in-javascript
function formatMoneyUS(number) {
   return '$'+ number.toLocaleString('en-US');
}

function formatMoneyUK(number) {
	return '&#163;'+ number.toLocaleString('en-US');
 }
 
 function message(msg) {
	document.getElementById("message").innerText = msg;
 }