//Array for case values
let caseValues = [0.01,1,5,10,25,50,75,100,200,300,400,500,750,1000,5000,10000,25000,50000,75000,100000,200000,300000,400000,500000,750000,1000000];

//Payout if all cases are there
let basePayout = 11246.7697;

//Global variable for bank offer
let bankOfferNum = 0;


//cases stored in array of Cases, which consists of CaseName and CaseNumber tuples
//Global array that will be modified throughout the game
let cases = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26];
//do we need a player global variable? what to keep track of there?

let heldCase = -1;
let heldValue = 0;

//this way we can reset the cases for new game and or make sure cases are all there or something 
/*
function setupCases(cases, caseValues)
{
  for(let i = 0; i < 25; i++)
  {
    cases.push((i+1,caseValues[i]));
  }
}
*/

/*setting up the US / UK arrays
let usArray = [6,5,4,3,2,1,1,1,1,1,1]
let ukArray = [5,3,3,3,3,1,1,1]

function ukCase23()
{
	let selection = getRandomInt(0,4)
	if selection == 0
	{

	}
	else if selection == 1
	{

	}
	else if selection == 2
	{

	}
	else if selection == 3
	{

	}
	else if selection == 4
	{

	}
}

*/
//from https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 * @desc This function runs the main gameplay loop, we allow it to access and modify global game data
 */
function gameplayLoop() {
	caseValues = shuffle(caseValues);
	
	result = "";
	while (!Number.isInteger(result) || !cases.includes(result)) {
		result = parseInt(window.prompt("Pick a case to hold (between 1 and 26)", ""));
		console.log(result);
	}
	idx = cases.indexOf(result);
	heldCase = result;
	heldValue = caseValues[idx];
	caseValues.splice(idx, 1);
	cases.splice(idx, 1);
	console.log(cases);
	
	i = 6;
	while (cases.length > 2) {
		console.log("You have " + i + " cases to eliminate this round.\n");
		for (j = i; j > 0; j--) {
			result = "";
			while (!Number.isInteger(result) || !cases.includes(result)) {
				result = parseInt(window.prompt("Pick a case to eliminate", ""));
			}
			idx = cases.indexOf(result);
			console.log("You eliminated case " + result + " which contained " + formatMoney(caseValues[idx]) + ".\n");
			caseValues.splice(idx, 1);
			cases.splice(idx, 1);
			console.log("The remaining cases are " + cases + ".\n");
			temp = [heldValue].concat(caseValues).sort((a, b) => a - b);
			console.log("The remaining values are " + temp + ".\n");
		}
		offer = bankOffer();
		console.log("You have received an offer from the banker: " + formatMoney(offer) + " for your case.\n");
		
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
		i = (i > 1) ? i-1 : 1;
	}
	console.log("You have chosen your case and have won $" + heldValue + "!\n");
	/*console.log("There are two cases left, the one you have and one more case. They contain $" + heldValue + " or $" + caseValues[0] + ".\n");
	result = "";
	while (result != "Y" && result != "N") {
		result = window.prompt("Would you like to swap cases (y/n)?", "");
		result = result.toUpperCase();
	}
	switch (result) {
		case "Y": console.log("You won $" + caseValues[0] + "!\n"); break;
		case "N": console.log("You won $" + heldValue + "!\n"); break;
	}*/
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
function separateCase(choice, cases)
{
        let tmp=cases[choice-1];
        let index = choice-1;

        for (let i = index; i < cases.length-1;i++)
        {
            cases[i] = cases[i+1];
        }
        cases[cases.length-1] =tmp;
        return (cases.pop()); 

        
}



/**
 * @desc function that calculates the expected value of the remaining cases
 * @returns expected value of remaining cases
 */
function expectedPayout(){
  //number of cases left
  let n = caseValues.length;

  //probability of selecting each case
  let Px = (1/n);
  
  //expected payout
  let payout = 0;

  //summation of P(x)*x
  for(let i=0; i < n; i++)
  {
    payout = payout + (caseValues[i]*Px)
  }
  return payout;
}



/**
 * @desc function that takes expected value of remaining cases and multiplies by random double in a specific range to generate offer from bank
 * @returns the offer from the bank
 */
function bankOffer(){
  //calls expectedPayout method to get value of the current expected payout
  let expPayout = expectedPayout();

  //if expected value of remaining cases is less than initial expected value
  if(expPayout <= basePayout)
  {
    let rand = Math.random() * (1 - .75) + .75;
    //multiplies by random number from .75-.99
    bankOfferNum = expPayout * rand;
  }
  //if expected value of remaining cases is greater than initial expected value
  else if(expPayout > basePayout)
  {
    let rand = Math.random() * (1.81 - 1.1) + 1.1;
    //multiplies by random number from 1.1-1.8
    bankOfferNum = expPayout * rand;
  }

return bankOfferNum;

}


//from https://stackoverflow.com/questions/4022171/how-do-i-print-currency-format-in-javascript
function formatMoney(number) {
   return '$'+ number.toLocaleString('en-US');
}