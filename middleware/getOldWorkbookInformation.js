let companies = require('./companies');
const ExcelDateToJSDate = require('./ExcelDateToJSDate');
const inspectionLimits = require('./inspectionLimits');

function getOldWorkbookInformation(sheet) {

	//Get all customers
	sheet.forEach(item => {
		let findCompany = companies.find(company => company.name === item.CUSTOMER)

		if(item.CUSTOMER === 'Westcan') {
			return
		}

		if(findCompany === undefined && item.CUSTOMER !== undefined) {
			let newCompany = {
				name: item.CUSTOMER,
				units: []
			}

			companies.push(newCompany)
		}
	});

	sheet.forEach(item => {
		let findCompany = companies.find(company => company.name === item.CUSTOMER)
		
		if(item.CUSTOMER === 'Westcan') {
			return
		}

		if(item.UNIT !== undefined) {
			let findUnitInCompany = findCompany.units.find(unit => unit.name.toString() === item.UNIT.toString())

			if(findUnitInCompany === undefined) {
				let newUnit = {
					name: item.UNIT.toString(),
					inspections: {
						'V': {month: 0, year: 0},
						'I': {month: 0, year: 0},
						'K': {month: 0, year: 0},
						'P': {month: 0, year: 0},
						'T': {month: 0, year: 0},
						'L': {month: 0, year: 0},
						'UC': {month: 0, year: 0},
						'WF' : {month: 0, year: 0}
					}
				}

				findCompany.units.push(newUnit)
			}
		}

	});

	sheet.forEach(item => {
		let findCompany = companies.find(company => company.name === item.CUSTOMER);

		if(item.CUSTOMER === 'Westcan') {
			return
		}

		if(item.UNIT !== undefined && item.UNIT !== 'UNIT') {
			let findUnitInCompany = findCompany.units.find(unit => unit.name.toString() === item.UNIT.toString());

			let unitMonth = ExcelDateToJSDate(item.DATE).getMonth();
			let unitYear = ExcelDateToJSDate(item.DATE).getFullYear();

			if(!unitMonth && unitMonth !== 0 && item.UNIT !== 'UNIT') {
				let newMonth = item.DATE.split('-')[0];
				let newYear = item.DATE.split('-')[2];

				unitMonth = Number(newMonth);
				unitYear = Number(newYear);
			}

			for(let letter in item.INSPECTION) {
				inspectionLetter = item.INSPECTION[letter];
				if(inspectionLetter === '/') {
					continue;
				} else if(inspectionLetter === 'U' || inspectionLetter === 'C') {
					inspectionLetter = 'UC';
				} else if(inspectionLetter === 'W' || inspectionLetter === 'F') {
					inspectionLetter = 'WF';
				} else if(findUnitInCompany.inspections[inspectionLetter] === undefined) {
					continue
				}

				// console.log(findUnitInCompany.inspections[inspectionLetter], inspectionLetter, 'mid', findUnitInCompany)
				findUnitInCompany.inspections[inspectionLetter].month = unitMonth;
				

				let spec = item['TANK SPEC'];
				// console.log(spec)
				if(spec === 306 || spec === 406) {
					findUnitInCompany.inspections[inspectionLetter].year = unitYear + inspectionLimits['406'][inspectionLetter];
				} else if (spec === 307 || spec === 407) {
					findUnitInCompany.inspections[inspectionLetter].year = unitYear + inspectionLimits['407'][inspectionLetter];
				} else if (spec === 330 || spec === 331) {
					findUnitInCompany.inspections[inspectionLetter].year = unitYear + inspectionLimits['331'][inspectionLetter];
				}

			}
		}
	
	})

	// companies.forEach(company => {
	// 	if(company.name === 'Ken Johnson') {
	// 		company.units.forEach(unit => {
	// 			if(unit.name === 'T12') {
	// 				console.log(unit)
	// 			}
	// 		})
	// 	}
	// })

}

module.exports = getOldWorkbookInformation;