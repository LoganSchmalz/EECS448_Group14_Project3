/**
 * Deal or No Deal gameplay file
 * Contains functions to execute game mechanics
 * 
 * Author: Dom D'Attilio, Gage Burmaster, Brett Parrish, Logan Schmalz
 * Date: 11/18/2021
 */

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
let ukArrayElim = [5,3,3,3,3,3,3];

let ruleset = 0;
let round = 0;
let casesEliminated = 0;
let currentOffer = 0;
//determines what the player should be able to click on
let choosingCase = false;
let choosingOffer = false;

/**
 * @desc This function selects a random output for UK box 23 and outputs the relevant message
 * @param {number} heldValue the value in the player's held box
 * @returns {string} message explaining the contents of box 23
 */
function ukCase23(heldValue)
{
	let selection = getRandomInt(0,4);
	if (selection == 0)
	{
		//10 thousand pounds
		return ("Box 23 contained +£10,000, bringing your total amount won to " +  formatMoney(heldValue + 10000) + "!");
	}
	else if (selection == 1)
	{
		//Half
		return ("Box 23 contained 'Half', bringing your total amount won to " +  formatMoney(heldValue/2) + ".");
	}
	else if (selection == 2)
	{
		//Money Back
		return ("Box 23 contained 'Money Back', which means you still win " +  formatMoney(heldValue) + ".");
	}
	else if (selection == 3)
	{
		//Double
		return ("Box 23 contained 'Double', which means you now win " +  formatMoney(heldValue*2) + "!");
	}
	else if (selection == 4)
	{
		//Nothing
		return ("Box 23 contained 'Nothing', which means you go home with absolutely nothing.");
	}
}


//from https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
/**
 * @desc This function generates a random integer
 * @param {number} min the minimum random value to generate
 * @param {number} max the maximum random value to generate
 * @returns {number} a random integer
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 * @desc This function is a wrapper for US and UK gameplay start
 * @param {number} the rules the player is using (1 = US, 2 = UK)
 */
function gameplay(r)
{
	ruleset = r;
	
	resetRender();
	resetGame();
	if (ruleset == 1)
	{
		resetUS();
		gameloopUS();
	}
	if (ruleset == 2)
	{
		resetUK();
		gameloopUK();
	}
	if (ruleset == 3)
	{

	}
}

/**
 * @desc This function resets some values to their defaults
 */
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

/**
 * @desc This function initializes values for the US rules
 */
function resetUS() 
{
	cases = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26];
	caseValuesConst = caseValuesUS;
	caseValues = shuffle([...caseValuesUS]); //... needed to create copy, JS arrays are set by reference not by content
	renderGame([6,7,7,6], formatMoney);
	registerCaseClicks(cases.length);
}

/**
 * @desc This function initializes values for the UK rules
 */
function resetUK() 
{
	cases = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22];
	caseValuesConst = caseValuesUK;
	caseValues = shuffle([...caseValuesUK]); //... needed to create copy, JS arrays are set by reference not by content
	renderGame([5,6,6,5], formatMoney);
	registerCaseClicks(cases.length);
}

/**
 * @desc This function is a wrapper for US and UK gameplay loops
 */
function gameloop() {
	if (ruleset == 1)
		gameloopUS();
	else if (ruleset == 2)
		gameloopUK();
}

/**
 * @desc This function runs the main gameplay loop, we allow it to access and modify global game data. UK RULES
 */
function gameloopUK() {
	switch(round) {
		case 0: //game start
			message("Please pick a box to hold.");
			choosingCase = true;
			break;
		case ukArrayElim.length: //end of game switch offer
			message("Would you like to switch boxes?");
			choosingOffer = true;
			document.getElementById("offer").style.display = "block";
			return;
		case ukArrayElim.length+1: //end of game offer to buy box 23
			message("Your chosen box contained " + formatMoney(heldValue) + "! Would you like to purchase box 23?");
			choosingOffer = true;
			document.getElementById("offer").style.display = "block";
			return;
		default: //general rounds
			if (casesEliminated != ukArrayElim[round-1]) {
				elim = ukArrayElim[round-1]-casesEliminated;
				message("You have " + elim + " more boxes to eliminate this round. Please pick a box to eliminate.");
				choosingCase = true;
			} else {
				currentOffer = bankOffer(2);
				message("You have received an offer from the banker: " + formatMoney(currentOffer) + " for your box.");
				choosingOffer = true;
				document.getElementById("offer").style.display = "block";
			}
			break;
	}
}







//BIG GAP SO YOU DONT CONFUSE 'EM

/**
 * @desc This function runs the main gameplay loop, we allow it to access and modify global game data. US RULES
 */
function gameloopUS() {
	switch(round) {
		case 0: //game start
			message("Please pick a case to hold.");
			choosingCase = true;
			break;
		case usArrayElim.length: //end of game message
			message("You have chosen your case and have won " + formatMoney(heldValue) + "!");
			return;
		default: //general rounds
			if (casesEliminated != usArrayElim[round-1]) {
				elim = usArrayElim[round-1]-casesEliminated;
				message("You have " + elim + " more cases to eliminate this round. Please pick a case to eliminate.");
				choosingCase = true;
			} else {
				currentOffer = bankOffer(1);
				message("You have received an offer from the banker: " + formatMoney(currentOffer) + " for your case.");
				choosingOffer = true;
				document.getElementById("offer").style.display = "block";
			}
			break;
	}
}

/**
 * @desc This function is a wrapper for US and UK offer acceptance
 */
function acceptOffer() {
	if (ruleset == 1)
		acceptOfferUS();
	else if (ruleset == 2)
		acceptOfferUK();
}

/**
 * @desc This function executes appropriate tasks for when the player accepts a choice provided to them in the UK rules
 */
function acceptOfferUK() {
	if (round == ukArrayElim.length + 1) { //player wants to buy box23
		message(ukCase23(heldValue));
	} else if (round == ukArrayElim.length) { //player wants to swap boxes
		temp = heldCase;
		tempVal = heldValue;
		heldValue = caseValues[0];
		heldCase = cases[0];
		caseValues[0] = tempVal;
		cases[0] = temp;
		round++;
		gameloopUK();
	} else {
		message("You won " + formatMoney(currentOffer) + "! Your case had a value of " + formatMoney(heldValue) + ". " + ((heldValue <= currentOffer) ? "You made a good deal!" : "You made a bad deal!"));
	}
}

/**
 * @desc This function executes appropriate tasks for when the player accepts a choice provided to them in the US rules (i.e. only accepting a dealer's offer)
 */
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
 */
function randomizeCases(Cases)
{ 
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
	if (heldCase != -1) { //non-starting rounds
		//console.log("You eliminated case " + i + " which contained " + formatMoney(val) + ".\n");
		caseValues.splice(idx, 1);
		cases.splice(idx, 1);
		//console.log("The remaining cases are " + cases + ".\n");
		temp = [heldValue].concat(caseValues).sort((a, b) => a - b);
		//console.log("The remaining values are " + temp + ".\n");
		casesEliminated++;
		document.getElementById(`val${val}`).style.visibility = "hidden";	
	} else { //starting round
		heldCase = i;
		heldValue = val;
		caseValues.splice(idx, 1);
		cases.splice(idx, 1);
		//console.log(cases);
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

	else if(ruleset == 2)
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
	else if(ruleset == 2)
	{
 		//calls expectedPayout method to get value of the current expected payout
		 let expPayout = expectedPayout(2);

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
		   let rand = Math.random() * (1.51 - 1.1) + 1.1;
		   //multiplies by random number from 1.1-1.8
		   bankOfferNum = expPayout * rand;
	   }

	   return bankOfferNum;
	}
}

/**
 * @desc This function is a wrapper for US and UK money string generation
 */
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
/**
 * @desc This function generates a string for US currency
 * @param {number} the input value
 * @returns {string} the input value formatted as currency
 */
function formatMoneyUS(number) {
   return '$'+ number.toLocaleString('en-US');
}

/**
 * @desc This function generates a string for UK currency
 * @param {number} the input value
 * @returns {string} the input value formatted as currency
 */
function formatMoneyUK(number) {
	return '&#163;'+ number.toLocaleString('en-US');
 }
 
 /**
 * @desc This function outputs a message in the message box DOM elemenet
 * @param {string} the message to output to the player
 */
 function message(msg) {
	document.getElementById("message").innerHTML = msg;
 }