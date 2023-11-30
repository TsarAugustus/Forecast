let companies = require('./companies');
let ExcelDateToJSDate = require('./ExcelDateToJSDate');
let inspectionLimits = require('./inspectionLimits');
let getName = require('./getName')

function getNewWorkbookInformation(sheet) {
	sheet.forEach(item => {
		let findCompany = companies.find(company => company.name === item.CUSTOMER);
	
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

		for(let obj in item) {
			let findUnitInCompany = findCompany.units.find(unit => getName(unit.name) === getName(item.UNIT));
			let inspectionLetter = undefined;
			
			if(obj === 'Visual') inspectionLetter = 'V';
			if(obj === 'Internal') inspectionLetter = 'I';
			if(obj === 'Leakage') inspectionLetter = 'K';
			if(obj === 'Pressure') inspectionLetter = 'P';
			if(obj === 'Thickness') inspectionLetter = 'T';
			if(obj === 'Lining') inspectionLetter = 'L';
			if(obj === 'UC') inspectionLetter = 'UC';
			if(obj === 'WF') inspectionLetter = 'WF';

			let unitMonth = ExcelDateToJSDate(item.DATE).getMonth();
			let unitYear = ExcelDateToJSDate(item.DATE).getFullYear();

			if(inspectionLetter && item[obj] !== 'N/A') {
				findUnitInCompany.inspections[inspectionLetter].month = unitMonth;

				let spec = item['TANK SPEC'].replace(/\D/g,'');
				
				if(spec === '306' || spec === '406') {
					findUnitInCompany.inspections[inspectionLetter].year = unitYear + inspectionLimits['406'][inspectionLetter];
					findUnitInCompany.inspections[inspectionLetter].interval = inspectionLimits['406'][inspectionLetter];
				} else if (spec === '307' || spec === '407') {
					findUnitInCompany.inspections[inspectionLetter].year = unitYear + inspectionLimits['407'][inspectionLetter];
					findUnitInCompany.inspections[inspectionLetter].interval = inspectionLimits['407'][inspectionLetter];
				} else if (spec === '330' || spec === '331') {
					findUnitInCompany.inspections[inspectionLetter].year = unitYear + inspectionLimits['331'][inspectionLetter];
					findUnitInCompany.inspections[inspectionLetter].interval = inspectionLimits['331'][inspectionLetter];
				}

				if(isNaN(unitYear)) {
					console.error('Unit Year NAN: ', unitYear);
				}

				if(isNaN(findUnitInCompany.inspections[inspectionLetter].year)) {
					console.error('Inspection Year NAN', item, ExcelDateToJSDate(item.DATE).getFullYear(), inspectionLetter);
				}
			}

		}
	});
}

module.exports = getNewWorkbookInformation;