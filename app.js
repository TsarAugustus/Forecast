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
app.use(express.static(path.join(__dirname, '/css')));

const pug = require('pug');
app.set('view engine', 'pug')

const XLSX = require('xlsx');

app.get('/', (req, res) => {
	console.log('home')
  	res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

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
		'P': 2,
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

let companies = [];

app.get('/forecast', (req, res) => {	
	const workbook = XLSX.readFile('./uploads/log.xlsx');
	const sheetNameList = workbook.SheetNames;
	console.log('FORECAST');
	
	let newControlSheetResult = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]);
	let oldControlSheetResult = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[2]]);
	
	let oldInfo = getOldWorkbookInformation(oldControlSheetResult);
	
	let newInfo = getNewWorkbookInformation(newControlSheetResult);
	
	// console.log(companies[0].units.find(unit => unit.name === 'T13'))

	let calendar = assembleCalendar(companies)

	//SANITIZE, HOT DAMM
	calendar.forEach((year, index) => {
		if(year.year < new Date().getFullYear()) {
			calendar.splice(index, 1)
		}
	})
	
	res.render('forecast', { title: 'Forecast', calendar: calendar} );
});

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