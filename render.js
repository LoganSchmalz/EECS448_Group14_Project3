function renderGame(casePattern, format) {
	const gameArea = document.getElementById("gameArea");
	const caseArea = document.getElementById("caseArea");
	const moneyArea = document.getElementById("moneyArea");
	
	totalCases = casePattern.reduce((a,b)=>a+b);
	
	for (i of casePattern) {
		let caseRow = document.createElement("div");
		caseRow.className = "caseRow";
		for (let j = 1; j <= i; j++) {
			caseNumber = totalCases - i + j;
			
			//https://seanyeh.com/pages/creating_svgs_in_javascript/
			//for reference in case anyone else needs to figure out how to draw SVGs on DOM
			let caseEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
			caseEl.id = `case${caseNumber}`;
			caseEl.setAttribute("width", "160");
			caseEl.setAttribute("height", "100");
			caseEl.innerHTML = `<rect class=briefcase width="100%" height="100%"/>
			                   <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill=rgb(0,0,0)>${caseNumber}</text>`;
			caseRow.appendChild(caseEl);
		}
		caseArea.appendChild(caseRow);
		
		totalCases -= i;
	}
	
	totalCases = casePattern.reduce((a,b)=>a+b);
	let col = document.createElement("div");
	col.className = "column";
	for (i = 1; i <= totalCases/2; i++) {
		let moneyEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		moneyEl.setAttribute("width", "240");
		moneyEl.setAttribute("height", "50");
		value = caseValuesConst[i-1];
		valueString = format(value);
		moneyEl.innerHTML = `<rect class=caseValue id=val${value} width="100%" height="100%"/>
		                     <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill=rgb(0,0,0)>${valueString}</text>`
		col.appendChild(moneyEl);
		col.appendChild(document.createElement("br"));
	}
	moneyArea.appendChild(col);
	col = document.createElement("div");
	col.className = "column";
	for (i = 1; i <= totalCases/2; i++) {
		let moneyEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		moneyEl.setAttribute("width", "240");
		moneyEl.setAttribute("height", "50");
		value = caseValuesConst[i-1+totalCases/2];
		valueString = format(value);
		moneyEl.innerHTML = `<rect class=caseValue id=val${value} width="100%" height="100%"/>
		                     <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill=rgb(0,0,0)>${valueString}</text>`
		col.appendChild(moneyEl);
		col.appendChild(document.createElement("br"));
	}
	moneyArea.appendChild(col);
}

function resetRender() {
	const gameArea = document.getElementById("gameArea");
	const caseArea = document.getElementById("caseArea");
	const moneyArea = document.getElementById("moneyArea");
	caseArea.innerHTML = "";
	moneyArea.innerHTML = "";
}