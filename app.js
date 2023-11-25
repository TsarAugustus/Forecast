const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, '/uploads/'))
	},
	filename: (req, file, cb) => {
		cb(null, 'log.xlsx')
	}
});

const upload = multer({ storage }).single('file');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

const pug = require('pug');
app.set('view engine', 'pug')

const XLSX = require('xlsx');

app.get('/', (req, res) => {
	console.log('home')
	res.render('index');
  	// res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

app.post('/test', (req, res) => {
	console.log('TEST WORKED')
})

app.post('/file', upload, (req, res) => {
	console.log('post')
	console.log(req.body, req.file);
	res.redirect('/forecast');
});

let inspectionLimits = {
	406: {
		'V': 1,
		'I': 5,
		'K': 1,
		'P': 5,
		'T': undefined,
		'L': 5,
		'UC': 5,
		'WF' : undefined
	},
	407: {
		'V': 1,
		'I': 1,
		'K': 1,
		'P': 5,
		'T': 5,
		'L': 5,
		'UC': 5,
		'WF' : undefined
	},
	331: {
		'V': 1,
		'I': 5,
		'K': 1,
		'P': 5,
		'T': 2,
		'L': undefined,
		'UC': 5,
		'WF' : 5
	},
	412: {
		//NEED INFO
	},
	//NEED DOT-51/TC-51
	//NEED SPECIAL PERMITS (EG E-11903))
}

let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

let months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

let daysPerMonth = {
	January: 31,
	February: 28,
	March: 31,
	April: 30,
	May: 31,
	June: 30,
	July: 31,
	August: 31,
	September: 30,
	October: 31,
	November: 30,
	December: 31
}

let companies = [];

function retrieveInformation(arg) {
	const workbook = XLSX.readFile('./uploads/log.xlsx');
	const sheetNameList = workbook.SheetNames;
	// console.log('FORECAST');
	
	let newControlSheetResult = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]);
	let oldControlSheetResult = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[2]]);

	let oldInfo = getOldWorkbookInformation(oldControlSheetResult);
	
	let newInfo = getNewWorkbookInformation(newControlSheetResult);

	let calendar = assembleCalendar(companies);

	if(arg === 'Audit') {
		return oldControlSheetResult.concat(newControlSheetResult)
	}


	if(!isNaN(Number(arg))) {
		let yearToRetrieve = calendar.find(item => item.year === Number(arg));
		// console.log(calendar)
		// console.log('here', yearToRetrieve);
		return yearToRetrieve;
	}

	//SANITIZE, HOT DAMM
	calendar.forEach((year, index) => {
		if(year.year < new Date().getFullYear()) {
			calendar.splice(index, 1)
		}
	});

	return calendar;
}

app.get('/forecast', (req, res) => {
	let calendar = retrieveInformation();
	
	res.render('forecast', { title: 'Forecast', calendar: calendar} );
});

app.get('/calendar', (req, res) => {
	let calendar = retrieveInformation();

	res.render('calendar', { title: 'Calendar', calendar: calendar, year: testYear, testData: calendar[0].months[0].customers});
});

app.get('/year/:year', (req, res) => {
	// console.log(req.params);
	let yearToBuild = buildYear(req.params.year);
	let year = retrieveInformation(req.params.year); 

	res.render('year', { yearHeader: Number(req.params.year), yearToBuild: yearToBuild, year: year})
})

app.get('/audit', (req, res) => {
	let auditInformation = retrieveInformation('Audit');
	console.log(auditInformation)
	let specs = specificationAudit(auditInformation);

	res.render('audit', {title: 'Audit', specs: specs })
});

app.post('/confirm', (req, res) => {
	console.log(req.body)
})

// {
	// 	year: 2023
	// 	months: [
	// 		...
	// 		December: [
	// 			days: [
	// 				0: 'Friday',
	// 				1: 'Saturday',
	// 				2: 'Sunday'
	// 				... 
	// 			]
	// 		]
	// 	]
	// }

function buildYear(year) {
	let yearToReturn = {
		year: year,
		months: []
	}

	for(let month in months) {
		yearToReturn.months.push({
			month: months[month],
			days: buildMonth(month, year)
		})
	}

	return yearToReturn;
}

function buildMonth(month, year) {
	let monthToReturn = [];

	let monthDays = daysPerMonth[months[month]];
	for(let i=0; i<monthDays; i++) {
		monthToReturn.push({
			date: i + 1,
			day: days[new Date(year, month, i+1, 12).getDay()]
		})
	}

	return monthToReturn;
}

function specificationAudit(sheet) {
	let specs = [];

	sheet.forEach(item => {
		if(item['TANK SPEC'] !== undefined) {
			let tankSpec = item['TANK SPEC'].toString();
			let thisSpec = specs.filter(specItem => specItem === tankSpec);
			if(thisSpec.length === 0 && tankSpec !== 'Hose' && tankSpec !== 'TANK SPEC') {
				specs.push(tankSpec);
			}
		}
		
	});
	
	return specs;
}

function ExcelDateToJSDate(serial) {
	return new Date((serial - (25567 + 1))*86400*1000);
}

function assembleCalendar(info) {
	let calendar = [];

	info.forEach(company => {
		company.units.forEach(unit => {
			for(let inspection in unit.inspections) {
				let thisInspection = unit.inspections[inspection];

				if(!calendar.find(year => year.year === unit.inspections[inspection].year) && unit.inspections[inspection].year !== 0 && !isNaN(unit.inspections[inspection].year)) {
					let newYear = {
						year: unit.inspections[inspection].year,
						months: []
					}

					if(unit.inspections[inspection].year === isNaN(unit.inspections[inspection].year) || unit.inspections[inspection].year === 0) {
						console.log(company, unit)
					}

					months.forEach((month, index) => {
						let newMonth = {
							month: month,
							index: index,
							customers: []
						}

						newYear.months.push(newMonth)
					})

					calendar.push(newYear)
				}
			}
		})
	})

	info.forEach(company => {
		company.units.forEach(unit => {
			for(let inspection in unit.inspections) {
				let inspectionYear = unit.inspections[inspection].year;
				let inspectionMonth = unit.inspections[inspection].month;
				
				let yearInCalendar = calendar.find(year => year.year === inspectionYear);
				
				if(yearInCalendar !== undefined) {
					let monthInCalendar = yearInCalendar.months.find(month => month.index === inspectionMonth);

					if(monthInCalendar !== undefined) {
						let customerInMonth = monthInCalendar.customers.find(customer => customer.name === company.name)

						if(!customerInMonth) {
							let newCustomer = {
								name: company.name,
								units: []
							}

							monthInCalendar.customers.push(newCustomer)
						} 					
					}
				}
			}
		})
	})

	info.forEach(company => {
		company.units.forEach(unit => {
			for(let inspection in unit.inspections) {
				let inspectionYear = unit.inspections[inspection].year;
				let inspectionMonth = unit.inspections[inspection].month;
				
				let yearInCalendar = calendar.find(year => year.year === inspectionYear);

				// if(yearInCalendar === undefined) console.log('here', unit)
				if(yearInCalendar !== undefined) {
					let monthInCalendar = yearInCalendar.months.find(month => month.index === inspectionMonth);

					let customerInMonth = monthInCalendar.customers.find(customer => customer.name === company.name)

					let unitInCustomerMonth = customerInMonth.units.find(thisUnit => thisUnit.name === unit.name)

					if(!unitInCustomerMonth) {
						let newUnit = {
							name: unit.name,
							inspection: ''
						}

						for(let inspection in unit.inspections) {
							if(unit.inspections[inspection].year === yearInCalendar.year && monthInCalendar.index === unit.inspections[inspection].month) {
								newUnit.inspection += inspection
							}
						}

						customerInMonth.units.push(newUnit)
					}
				}
			}
		})
	})

	calendar.sort(function(a, b) {
		return a.year - b.year;
	});

	calendar.forEach(year => {
		year.months.sort(function(a, b) {
			return a.index - b.index
		})

	});
	
	// console.log(calendar[2].months[9].customers[2])

	return calendar;
}

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