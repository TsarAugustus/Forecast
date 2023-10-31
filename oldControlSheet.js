// oldControlSheetResult.forEach(result => {
// 	let companyInArray = companies.find(company => company.name === result.CUSTOMER);

// 	if(!companyInArray) {
// 		let company = {
// 			name: result.CUSTOMER,
// 			units: []
// 		}
		
// 		if(company.name !== undefined) companies.push(company);
// 		else console.log('ERROR - UNDEFINED: ', result)
// 	}

// 	//Date information
// 	let inspectionDate = ExcelDateToJSDate(result.DATE);
// 	let inspectionDay = inspectionDate.getDate() + 1;
// 	let inspectionMonth = inspectionDate.getMonth() + 1;
// 	// console.log(inspectionMonth, result)
// 	let inspectionYear = inspectionDate.getFullYear();
	
// 	if(companyInArray !== undefined) {
// 		//Comnpany exists in array
// 		let unitInArray = companyInArray.units.find(unit => unit.number === result.UNIT.toString().replace(/[^\w.]+/g, ""));

// 		if(unitInArray === undefined) {
// 			let unit = {
// 				number: undefined,
// 				inpsection: result.INSPECTION,
// 				spec: result['TANK SPEC'],
// 				interval: {
// 					'V': undefined,
// 					'I': undefined,
// 					'K': undefined,
// 					'P': undefined,
// 					'T': undefined,
// 					'L': undefined,
// 					'UC': undefined,
// 					'WF' : undefined
// 				}
// 			}

// 			unit.number = result.UNIT.toString().replace(/[^\w.]+/g, "");
			
// 			companyInArray.units.push(unit);
// 		}			

// 		for(let i=0; i<result.INSPECTION.length; i++) {
// 			let unit = companyInArray.units.find(companyUnit => companyUnit.number === result.UNIT.toString().replace(/[^\w.]+/g, ""));
			
// 			//uc will be 2 different letters
// 			let letter = result.INSPECTION[i];
// 			if(letter === 'U' || letter === 'C') {
// 				letter = 'UC'
// 			}

// 			let spec = result['TANK SPEC'];
// 			if(spec === 306 || spec === 406) {
// 				// let limit = inspectionLimits[406];
// 				unit.interval[letter] = inspectionLimits[406][letter];
// 				unit.interval[letter] = {
// 					month: inspectionMonth,
// 					year: inspectionYear + inspectionLimits[406][letter]
// 				}					
// 			}

// 			if(spec === 307 || spec === 407) {
// 				unit.interval[letter] = inspectionLimits[407][letter];
// 				unit.interval[letter] = {
// 					month: inspectionMonth,
// 					year: inspectionYear + inspectionLimits[407][letter]
// 				}
// 			}

// 			if(spec === 330 || spec === 331) {
// 				unit.interval[letter] = inspectionLimits[331][letter];
// 				unit.interval[letter] = {
// 					month: inspectionMonth,
// 					year: inspectionYear + inspectionLimits[331][letter]
// 				}
// 			}			
// 		}
// 	}

// });

module.exports = function oldControlSheet() {
	return 'old';
}

// export { oldControlSheet }






	// months.forEach((thisMonth, monthIndex) => {
	// 	// console.log(thisMonth)
	// 	let monthInspections = {
	// 		month: thisMonth,
	// 		inspections: []
	// 	};

	// 	companies.forEach(thisCompany => {
	// 		// console.log(thisCompany.name)
	// 		if(!monthInspections.inspections.find(monthCompany => monthCompany.name === thisCompany.name)) {
	// 			monthInspections.inspections.push({
	// 				name: thisCompany.name,
	// 				units: []
	// 			})
	// 		}

	// 		let x = monthInspections.inspections.find(monthCompany => monthCompany.name === thisCompany.name);
			
	// 		thisCompany.units.forEach(thisUnit => {
	// 			for(let unitInspections in thisUnit.interval) {
	// 				// console.log(unitInspections, thisUnit.interval[unitInspections])
	// 				// console.log(thisUnit.interval[unitInspections], monthIndex)
	// 				// console.log(thisUnit.interval[unitInspections], monthIndex, thisUnit)
	// 				if(thisUnit.number === 'TEST') {
	// 					console.log(thisUnit)
	// 				}
	// 				if(undefined !== thisUnit.interval[unitInspections] && thisUnit.interval[unitInspections].month === monthIndex && !x.units.find(monthUnit => monthUnit.number === thisUnit.number)) {
	// 					x.units.push(thisUnit);
	// 					// console.log('ya', x, thisUnit, thisMonth, monthIndex)
	// 				}
	// 			}
	// 			// console.log(thisUnit, monthInspections)
	// 		});
	// 		// console.log(monthInspections)
	// 		// console.log(forecastList2023, monthInspections.month)
	// 		if(!forecastList2023.find(month => month.month === monthInspections.month)) forecastList2023.push(monthInspections)

	// 	});
	// })