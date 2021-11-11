function renderGame() {
	const gameArea = document.getElementById("gameArea");
	const caseArea = document.getElementById("caseArea");
	const moneyArea = document.getElementById("moneyArea");
	
	const rules = [6, 7, 7, 6]; //modify for different rule types later
	totalCases = rules.reduce((a,b)=>a+b);
	
	for (i of rules) {
		let caseRow = document.createElement("div");
		caseRow.className = "caseRow";
		for (let j = 1; j <= i; j++) {
			caseNumber = totalCases - i + j;
			
			//https://seanyeh.com/pages/creating_svgs_in_javascript/
			//for reference in case anyone else needs to figure out how to draw SVGs on DOM
			let caseEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
			caseEl.setAttribute("width", "160");
			caseEl.setAttribute("height", "100");
			caseEl.innerHTML = `<rect class=briefcase id=${caseNumber} width="100%" height="100%"/>
			                   <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill=rgb(0,0,0)>${caseNumber}</text>`;
			caseRow.appendChild(caseEl);
		}
		caseArea.appendChild(caseRow);
		
		totalCases -= i;
	}
	
	/*totalCases = rules.reduce((a,b)=>a+b);
	for (i = 1; i <= totalCases; i++) {
		let moneyRow = document.createElement("div");
		moneyRow.className = "moneyRow";
		...
	}*/
	
	//prototype absolutely not final this is just hardcoded HTML loaded dynamically with JS
	moneyArea.innerHTML = `<div class=moneyRow>
					<svg width="240" height="50">
						<rect class=caseValue width="240" height="50"/>
					</svg>
					<svg width="240" height="50">
						<rect class=caseValue width="240" height="50"/>
					</svg>
				</div>
				<div class=moneyRow>
					<svg width="240" height="50">
						<rect class=caseValue width="240" height="50"/>
					</svg>
					<svg width="240" height="50">
						<rect class=caseValue width="240" height="50"/>
					</svg>
				</div>
				<div class=moneyRow>
					<svg width="240" height="50">
						<rect class=caseValue width="240" height="50"/>
					</svg>
					<svg width="240" height="50">
						<rect class=caseValue width="240" height="50"/>
					</svg>
				</div>
				<div class=moneyRow>
					<svg width="240" height="50">
						<rect class=caseValue width="240" height="50"/>
					</svg>
					<svg width="240" height="50">
						<rect class=caseValue width="240" height="50"/>
					</svg>
				</div>
				<div class=moneyRow>
					<svg width="240" height="50">
						<rect class=caseValue width="240" height="50"/>
					</svg>
					<svg width="240" height="50">
						<rect class=caseValue width="240" height="50"/>
					</svg>
				</div>
				<div class=moneyRow>
					<svg width="240" height="50">
						<rect class=caseValue width="240" height="50"/>
					</svg>
					<svg width="240" height="50">
						<rect class=caseValue width="240" height="50"/>
					</svg>
				</div>
				<div class=moneyRow>
					<svg width="240" height="50">
						<rect class=caseValue width="240" height="50"/>
					</svg>
					<svg width="240" height="50">
						<rect class=caseValue width="240" height="50"/>
					</svg>
				</div>
				<div class=moneyRow>
					<svg width="240" height="50">
						<rect class=caseValue width="240" height="50"/>
					</svg>
					<svg width="240" height="50">
						<rect class=caseValue width="240" height="50"/>
					</svg>
				</div>
				<div class=moneyRow>
					<svg width="240" height="50">
						<rect class=caseValue width="240" height="50"/>
					</svg>
					<svg width="240" height="50">
						<rect class=caseValue width="240" height="50"/>
					</svg>
				</div>
				<div class=moneyRow>
					<svg width="240" height="50">
						<rect class=caseValue width="240" height="50"/>
					</svg>
					<svg width="240" height="50">
						<rect class=caseValue width="240" height="50"/>
					</svg>
				</div>
				<div class=moneyRow>
					<svg width="240" height="50">
						<rect class=caseValue width="240" height="50"/>
					</svg>
					<svg width="240" height="50">
						<rect class=caseValue width="240" height="50"/>
					</svg>
				</div>
				<div class=moneyRow>
					<svg width="240" height="50">
						<rect class=caseValue width="240" height="50"/>
					</svg>
					<svg width="240" height="50">
						<rect class=caseValue width="240" height="50"/>
					</svg>
				</div>
				<div class=moneyRow>
					<svg width="240" height="50">
						<rect class=caseValue width="240" height="50"/>
					</svg>
					<svg width="240" height="50">
						<rect class=caseValue width="240" height="50"/>
					</svg>
				</div>`;
}