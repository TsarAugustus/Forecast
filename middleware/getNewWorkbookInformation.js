let companies = require('./companies');
let ExcelDateToJSDate = require('./ExcelDateToJSDate');
let inspectionLimits = require('./inspectionLimits');

function getNewWorkbookInformation(sheet) {
	sheet.forEach(item => {
		let findCompany = companies.find(company => company.name === item.CUSTOMER);
	
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

		for(let obj in item) {
			let findUnitInCompany = findCompany.units.find(unit => unit.name.toString() === item.UNIT.toString());
			let inspectionLetter = undefined;
			
			if(obj === 'Visual') inspectionLetter = 'V'
			if(obj === 'Internal') inspectionLetter = 'I'
			if(obj === 'Leakage') inspectionLetter = 'K'
			if(obj === 'Pressure') inspectionLetter = 'P'
			if(obj === 'Thickness') inspectionLetter = 'T'
			if(obj === 'Lining') inspectionLetter = 'L'
			if(obj === 'UC') inspectionLetter = 'UC'
			if(obj === 'WF') inspectionLetter = 'WF'

			let unitMonth = ExcelDateToJSDate(item.DATE).getMonth();
			let unitYear = ExcelDateToJSDate(item.DATE).getFullYear();

			if(inspectionLetter && item[obj] !== 'N/A') {
				findUnitInCompany.inspections[inspectionLetter].month = unitMonth;

				let spec = item['TANK SPEC'].replace(/\D/g,'');
				
				if(spec === '306' || spec === '406') {
					findUnitInCompany.inspections[inspectionLetter].year = unitYear + inspectionLimits['406'][inspectionLetter];
				} else if (spec === '307' || spec === '407') {
					findUnitInCompany.inspections[inspectionLetter].year = unitYear + inspectionLimits['407'][inspectionLetter];
				} else if (spec === '330' || spec === '331') {
					findUnitInCompany.inspections[inspectionLetter].year = unitYear + inspectionLimits['331'][inspectionLetter];
				}

				if(isNaN(unitYear)) {
					console.log('HERE')
				}

				if(isNaN(findUnitInCompany.inspections[inspectionLetter].year)) {
					console.log('HMMMMM', item, ExcelDateToJSDate(item.DATE).getFullYear(), inspectionLetter)
				}

				// console.log(findUnitInCompany, `LETTER: ${inspectionLetter}`, unitYear)
			}

		}
	})
}

module.exports = getNewWorkbookInformation;