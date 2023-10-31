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
		'UC': 1,
		'WF' : undefined
	},
	331: {
		'V': 1,
		'I': 5,
		'K': 1,
		'P': 5,
		'T': undefined,
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

app.get('/forecast', (req, res) => {	
	const workbook = XLSX.readFile('./uploads/log.xlsx');
	const sheetNameList = workbook.SheetNames;
	console.log('FORECAST')
	
	// let newControlSheet = sheetNameList[0];
	// let propaneSeason = sheetNameList[1];
	// let oldControlSheet = sheetNameList[2];
	
	let newControlSheetResult = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]);
	let oldControlSheetResult = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[2]]);

	let data = [];

	// let currentMonth = new Date().getMonth() + 1;

	months.forEach(month => {
		let monthInspections = {
			month: month,
			companies: []
			
		};

		data.push(monthInspections);
	});

	let oldInfo = getOldControlSheetInformation(oldControlSheetResult);

	let newInfo = getNewControlSheetInformation(newControlSheetResult, oldInfo);

	let calendar = assembleCalendar(newInfo);

	let x = newInfo.find(company => company.CUSTOMER === 'Scamp')

	// console.log(x)


	// console.log(calendar)
	res.render('forecast', { title: 'Forecast', calendar: calendar} );
});

function assembleCalendar(info) {
	let calendar = [];
	info.forEach(customer => {
		customer.units.forEach(unit => {

			if(unit.UNIT === '312AB') {
				// console.log(unit)
			}
			
			for(let inspection in unit.INSPECTIONS) {
				let thisInspection = unit.INSPECTIONS[inspection];
				
				if(thisInspection !== undefined) {
					let findYear = calendar.find(item => item.year === thisInspection.year)

					if(!findYear) {
						let newYear = {
							year: thisInspection.year,
							months: []
						}

						if(newYear.year) calendar.push(newYear);
					}

					if(findYear) {
						let findMonthInYear = findYear.months.find(item => item.month === thisInspection.month)
						if(!findMonthInYear) {
							let newMonth = {
								name: months[thisInspection.month],
								month: thisInspection.month,
								customers: []
							}

							findYear.months.push(newMonth);
						}

						
						if(findMonthInYear) {
							let findCustomerInMonth = findMonthInYear.customers.find(item => item.CUSTOMER === customer.CUSTOMER);

							if(!findCustomerInMonth) {
								let newMonthCustomer = {
									CUSTOMER: customer.CUSTOMER,
									units: []
								}

								findMonthInYear.customers.push(newMonthCustomer)
							}
							
							if(findCustomerInMonth) {
								let findUnitInCustomerMonth = findCustomerInMonth.units.find(item => item.UNIT === customer.UNIT);

								if(!findUnitInCustomerMonth) {
									let newUnit = {
										UNIT: unit.UNIT.toString().replace(/[^\w.]+/g, ""),
										inspection: ''
									}

									for(let inspection in unit.INSPECTIONS) {
										// let inspectionYear = undefined;

										if(unit.INSPECTIONS[inspection] !== undefined) {
											if(unit.INSPECTIONS[inspection].year === findYear.year) {
												newUnit.inspection = newUnit.inspection + inspection
											}
										}

									}

									findCustomerInMonth.units.push(newUnit);
								}
							}
						}
					}
				}
			}
		})
	});

	calendar.sort(function(a, b) {
		return a.year - b.year;
	});
	
	calendar.forEach(year => {
		year.months.sort(function(a, b) {
			return a.month - b.month
		})

	});

	calendar.forEach((year, index) => {
		if(year.year < new Date().getFullYear()) {
			calendar.splice(index, 1)
		}
	})

	return calendar;
}

function ExcelDateToJSDate(serial) {
	return new Date((serial - (25567 + 1))*86400*1000);
}

function getNewControlSheetInformation(sheet, oldSheet) {
	let newControlSheet = oldSheet;

	sheet.forEach(newItem => {
		
		if(!newControlSheet.find(item => item.CUSTOMER === newItem.CUSTOMER)) {
			let newCompany = {
				CUSTOMER: newItem.CUSTOMER,
				units: []
			}

			newControlSheet.push(newCompany);
		}

		let companyInSheet = newControlSheet.find(item => item.CUSTOMER === newItem.CUSTOMER);
		
		if(companyInSheet !== undefined) {
			
			if(!companyInSheet.units.find(unit => unit.UNIT === newItem.UNIT) && newItem.UNIT !== 'UNIT') {
				let newUnit = {
					UNIT: newItem.UNIT,
					INSPECTIONS: {
						'V': undefined,
						'I': undefined,
						'K': undefined,
						'P': undefined,
						'T': undefined,
						'L': undefined,
						'UC': undefined,
						'WF' : undefined
					}
				}

				companyInSheet.units.push(newUnit);
			}

			let unitInCompanySheet = companyInSheet.units.find(unit => unit.UNIT === newItem.UNIT && newItem.UNIT !== 'UNIT');

			if(unitInCompanySheet !== undefined) {
				
			}
			
			for(let letter in newItem) {
				let thisInspection = undefined;

				// ==========================
				if(letter === 'Visual' && newItem[letter] !== 'N/A') {
					thisInspection = 'V';
				}

				if(letter === 'Internal' && newItem[letter] !== 'N/A') {
					thisInspection = 'I';
				}

				if(letter === 'Upper Coupler' && newItem[letter] !== 'N/A') {
					thisInspection = 'UC';
				}

				if(letter === 'Lining' && newItem[letter] !== 'N/A') {
					thisInspection = 'L';
				}

				if(letter === 'Wet Fluorescent' && newItem[letter] !== 'N/A') {
					thisInspection = 'WF';
				}

				if(letter === 'Leakage' && newItem[letter] !== 'N/A') {
					thisInspection = 'K';
				}

				if(letter === 'Pressure' && newItem[letter] !== 'N/A') {
					thisInspection = 'P';
				}

				if(letter === 'Thickness' && newItem[letter] !== 'N/A') {
					thisInspection = 'T';
				}
				// ==========================

				if(thisInspection !== undefined) {
					
					let unitMonth = ExcelDateToJSDate(newItem.DATE).getMonth();
					let unitYear = ExcelDateToJSDate(newItem.DATE).getFullYear();
					let spec = undefined;
					if(newItem['TANK SPEC'] !== 'HOSES') {
						spec = newItem['TANK SPEC'].match(/(\d+)/)[0]
					}

					// let unitInCompanySheet = companyInSheet.units.find(unit => unit.UNIT === newItem.UNIT);

					// console.log(inspectionLimits['406'][thisInspection])

					if(spec === '306' || spec === '406') {
						// console.log('406')
						unitInCompanySheet.INSPECTIONS[thisInspection] = {
							month: unitMonth,
							year: unitYear + inspectionLimits['406'][thisInspection]
						}
					}

					if(spec === '307' || spec === '407') {
						// console.log('407')
						unitInCompanySheet.INSPECTIONS[thisInspection] = {
							month: unitMonth,
							year: unitYear + inspectionLimits['407'][thisInspection]
						}
					}

					if(spec === '330' || spec === '331') {
						// console.log('331')
						unitInCompanySheet.INSPECTIONS[thisInspection] = {
							month: unitMonth,
							year: unitYear + inspectionLimits['331'][thisInspection]
						}
					}
					
				}
			}

		}
	});

	return newControlSheet;
}

function getOldControlSheetInformation(sheet) {
	let oldControlSheet = [];

	sheet.forEach(oldItem => {
		let companyInSheet = oldControlSheet.find(item => item.CUSTOMER === oldItem.CUSTOMER);

		if(!companyInSheet) {
			let newCompany = {
				CUSTOMER: oldItem.CUSTOMER,
				units: []
			}

			if(newCompany.CUSTOMER !== undefined) oldControlSheet.push(newCompany)
		}

		if(companyInSheet !== undefined) {
			
			if(!companyInSheet.units.find(unit => unit.UNIT === oldItem.UNIT) && oldItem.UNIT !== 'UNIT') {
				let newUnit = {
					UNIT: oldItem.UNIT,
					INSPECTIONS: {
						'V': undefined,
						'I': undefined,
						'K': undefined,
						'P': undefined,
						'T': undefined,
						'L': undefined,
						'UC': undefined,
						'WF' : undefined
					}
				}

				companyInSheet.units.push(newUnit)
			}

			for(let letter of oldItem.INSPECTION) {
				let unitInCompanySheet = companyInSheet.units.find(unit => unit.UNIT === oldItem.UNIT);

				if(letter === 'U' || letter === 'C') {
					letter = 'UC'
				}

				let unitMonth = ExcelDateToJSDate(oldItem.DATE).getMonth();
				let unitYear = ExcelDateToJSDate(oldItem.DATE).getFullYear();

				if(!unitMonth && unitMonth !== 0 && oldItem.UNIT !== 'UNIT') {
					let newMonth = oldItem.DATE.split('-')[0];
					let newYear = oldItem.DATE.split('-')[2];

					unitMonth = Number(newMonth);
					unitYear = Number(newYear);
				}

				if(oldItem['TANK SPEC'] === 306 || oldItem['TANK SPEC'] === 406) {
					unitInCompanySheet.INSPECTIONS[letter] = {
						month: unitMonth,
						year: unitYear + inspectionLimits['406'][letter]
					}
				}

				if(oldItem['TANK SPEC'] === 307 || oldItem['TANK SPEC'] === 407) {
					unitInCompanySheet.INSPECTIONS[letter] = {
						month: unitMonth,
						year: unitYear + inspectionLimits['407'][letter]
					}
				}

				if(oldItem['TANK SPEC'] === 330 || oldItem['TANK SPEC'] === 331) {
					unitInCompanySheet.INSPECTIONS[letter] = {
						month: unitMonth,
						year: unitYear + inspectionLimits['331'][letter]
					}
				}
			}

		}
	});

	return oldControlSheet;
}