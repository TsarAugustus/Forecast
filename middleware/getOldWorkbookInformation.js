let companies = require('./companies');
const ExcelDateToJSDate = require('./ExcelDateToJSDate');
const inspectionLimits = require('./inspectionLimits');
const getName = require('./getName');

function getOldWorkbookInformation(sheet) {

	//Get all customers
	sheet.forEach(item => {
		let findCompany = companies.find(company => company.name === item.CUSTOMER);

		if(item.CUSTOMER === 'Westcan') {
			return;
		}

		if(findCompany === undefined && item.CUSTOMER !== undefined) {
			let newCompany = {
				name: item.CUSTOMER,
				units: []
			};

			companies.push(newCompany);
		}
	});

	sheet.forEach(item => {
		let findCompany = companies.find(company => company.name === item.CUSTOMER);
		
		if(item.CUSTOMER === 'Westcan') {
			return;
		}

		// Create Function for New/Old workbook info to change names (replace etc)

		if(item.UNIT !== undefined) {
			let findUnitInCompany = findCompany.units.find(unit => getName(unit.name) === getName(item.UNIT));

			if(findUnitInCompany === undefined) {
				let newUnit = {
					name: getName(item.UNIT),
					inspections: {
						'V': {month: 0, year: 0, interval: 0},
						'I': {month: 0, year: 0, interval: 0},
						'K': {month: 0, year: 0, interval: 0},
						'P': {month: 0, year: 0, interval: 0},
						'T': {month: 0, year: 0, interval: 0},
						'L': {month: 0, year: 0, interval: 0},
						'UC': {month: 0, year: 0, interval: 0},
						'WF' : {month: 0, year: 0, interval: 0}
					}
				};

				findCompany.units.push(newUnit);
			}
		}

	});

	sheet.forEach(item => {
		let findCompany = companies.find(company => company.name === item.CUSTOMER);

		if(item.CUSTOMER === 'Westcan') {
			return;
		}

		if(item.UNIT !== undefined && item.UNIT !== 'UNIT') {
			let findUnitInCompany = findCompany.units.find(unit => getName(unit.name) === getName(item.UNIT));

			let unitMonth = ExcelDateToJSDate(item.DATE).getMonth();
			let unitYear = ExcelDateToJSDate(item.DATE).getFullYear();

			if(!unitMonth && unitMonth !== 0 && item.UNIT !== 'UNIT') {
				let newMonth = item.DATE.split('-')[0];
				let newYear = item.DATE.split('-')[2];

				unitMonth = Number(newMonth);
				unitYear = Number(newYear);
			}

			for(let letter in item.INSPECTION) {
				let inspectionLetter = item.INSPECTION[letter];
				if(inspectionLetter === '/') {
					continue;
				} else if(inspectionLetter === 'U' || inspectionLetter === 'C') {
					inspectionLetter = 'UC';
				} else if(inspectionLetter === 'W' || inspectionLetter === 'F') {
					inspectionLetter = 'WF';
				} else if(findUnitInCompany.inspections[inspectionLetter] === undefined) {
					continue;
				}

				findUnitInCompany.inspections[inspectionLetter].month = unitMonth;

				
				
				let spec = item['TANK SPEC'];
				if(spec === 306 || spec === 406) {
					findUnitInCompany.inspections[inspectionLetter].year = unitYear + inspectionLimits['406'][inspectionLetter];
					findUnitInCompany.inspections[inspectionLetter].interval = inspectionLimits['406'][inspectionLetter];
				} else if (spec === 307 || spec === 407) {
					findUnitInCompany.inspections[inspectionLetter].year = unitYear + inspectionLimits['407'][inspectionLetter];
					findUnitInCompany.inspections[inspectionLetter].interval = inspectionLimits['407'][inspectionLetter];
				} else if (spec === 330 || spec === 331) {
					findUnitInCompany.inspections[inspectionLetter].year = unitYear + inspectionLimits['331'][inspectionLetter];
					findUnitInCompany.inspections[inspectionLetter].interval = inspectionLimits['331'][inspectionLetter];
				}
			}
		}
	
	});

}

module.exports = getOldWorkbookInformation;