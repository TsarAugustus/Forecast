/* eslint-disable no-unused-vars */
const companies = require('./companies');

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

function assembleCalendar(info) {
	let yearLimit = 2033;
	let currentYear = new Date().getFullYear();

	let calendar = [];

	while(currentYear <= yearLimit) {
		let newYear = {
			year: currentYear,
			months: []
		};

		months.forEach((month, index) => {
			let newMonth = {
				month: month,
				index: index,
				customers: []
			};

			newYear.months.push(newMonth);
		});

		calendar.push(newYear);
		currentYear++;
	}

	
	info.forEach(company => {
		company.units.forEach(unit => {
			for(let inspection in unit.inspections) {
				let inspectionInterval = unit.inspections[inspection].interval;
				let inspectionYear = unit.inspections[inspection].year;
				let inspectionMonth = unit.inspections[inspection].month;

				if(inspectionInterval !== 0) {
					currentYear = inspectionYear;

					createUnitCalendar(currentYear, calendar, company, yearLimit, inspectionMonth, unit, inspection, inspectionInterval);

					
				}
			}
		});
	});

	calendar.sort(function (a, b) {
		return a.year - b.year;
	});

	calendar.forEach(year => {
		year.months.sort(function (a, b) {
			return a.index - b.index;
		});

	});

	return calendar;
}

function createUnitCalendar(currentYear, calendar, company, yearLimit, inspectionMonth, unit, inspection, inspectionInterval) {
	while(currentYear <= yearLimit) {
		let yearInCalendar = calendar.find(year => year.year === currentYear);

		if(yearInCalendar) {
			addUnitToYear(yearInCalendar, inspectionMonth, company, unit, inspection);
			
		}

		
		currentYear += inspectionInterval;
	}
}

function addUnitToYear(yearInCalendar, inspectionMonth, company, unit, inspection) {
	let monthInCalendar = yearInCalendar.months.find(month => month.index === inspectionMonth);
	let companyName = '';


	if(company.name.includes('Superior'))	companyName = 'Superior';
	if(company.name.includes('Enex'))		companyName = 'FuelEx';
	if(company.name.includes('Summit'))		companyName = 'Summit';
	if(company.name.includes('Kodiak'))		companyName = 'Kodiak';
	
	if(companyName === '') {
		companyName = company.name;
	}
	
	if(!monthInCalendar.customers.find(customer => customer.nickname === companyName)) {
		

		let newCustomer = {
			name: company.name,
			nickname: companyName,
			units: []
		};
		
		monthInCalendar.customers.push(newCustomer);
	}

	let customerInMonth = monthInCalendar.customers.find(customer => customer.nickname === companyName);

	
	if(!customerInMonth.units.find(thisUnit => thisUnit.name === unit.name)) {
		let newUnit = {
			name: unit.name,
			inspection: ''
		};

		customerInMonth.units.push(newUnit);
	}
	
	let unitInCustomerMonth = customerInMonth.units.find(thisUnit => thisUnit.name === unit.name);

	if(unitInCustomerMonth.inspection.includes(inspection) === false) unitInCustomerMonth.inspection += inspection;
}

// function OLDassembleCalendar(info) {
// 	let calendar = [];

// 	info.forEach(company => {
// 		company.units.forEach(unit => {
// 			for (let inspection in unit.inspections) {
// 				// let thisInspection = unit.inspections[inspection];

// 				if (!calendar.find(year => year.year === unit.inspections[inspection].year) && unit.inspections[inspection].year !== 0 && !isNaN(unit.inspections[inspection].year)) {
// 					let newYear = {
// 						year: unit.inspections[inspection].year,
// 						months: []
// 					};

// 					if (unit.inspections[inspection].year === isNaN(unit.inspections[inspection].year) || unit.inspections[inspection].year === 0) {
// 						console.log(company, unit);
// 					}

// 					months.forEach((month, index) => {
// 						let newMonth = {
// 							month: month,
// 							index: index,
// 							customers: []
// 						};

// 						newYear.months.push(newMonth);
// 					});

// 					// console.log('CALENDAR: ', unit);

// 					calendar.push(newYear);
// 				}
// 			}
// 		});
// 	});

// 	info.forEach(company => {
// 		company.units.forEach(unit => {
// 			for (let inspection in unit.inspections) {
// 				let inspectionYear = unit.inspections[inspection].year;
// 				let inspectionMonth = unit.inspections[inspection].month;

// 				let yearInCalendar = calendar.find(year => year.year === inspectionYear);

// 				if (yearInCalendar !== undefined) {
// 					let monthInCalendar = yearInCalendar.months.find(month => month.index === inspectionMonth);

// 					if (monthInCalendar !== undefined) {
// 						let customerInMonth = monthInCalendar.customers.find(customer => customer.name === company.name);

// 						if (!customerInMonth) {
// 							let newCustomer = {
// 								name: company.name,
// 								units: []
// 							};

// 							monthInCalendar.customers.push(newCustomer);
// 						}
// 					}
// 				}
// 			}
// 		});
// 	});

// 	info.forEach(company => {
// 		company.units.forEach(unit => {
// 			for (let inspection in unit.inspections) {
// 				let inspectionYear = unit.inspections[inspection].year;
// 				let inspectionMonth = unit.inspections[inspection].month;

// 				let yearInCalendar = calendar.find(year => year.year === inspectionYear);

// 				if (yearInCalendar !== undefined) {
// 					let monthInCalendar = yearInCalendar.months.find(month => month.index === inspectionMonth);

// 					let customerInMonth = monthInCalendar.customers.find(customer => customer.name === company.name);

// 					let unitInCustomerMonth = customerInMonth.units.find(thisUnit => thisUnit.name === unit.name);

// 					if (!unitInCustomerMonth) {
// 						let newUnit = {
// 							name: unit.name,
// 							inspection: ''
// 						};

// 						for (let inspection in unit.inspections) {
// 							if (unit.inspections[inspection].year === yearInCalendar.year && monthInCalendar.index === unit.inspections[inspection].month) {
// 								newUnit.inspection += inspection;
// 							}
// 						}

// 						customerInMonth.units.push(newUnit);
// 					}
// 				}
// 			}
// 		});
// 	});

// 	calendar.sort(function (a, b) {
// 		return a.year - b.year;
// 	});

// 	calendar.forEach(year => {
// 		year.months.sort(function (a, b) {
// 			return a.index - b.index;
// 		});

// 	});

// 	return calendar;
// }

// /*
// 	The idea for the 'Future' Calendar is to take each inspection interval,
// 	and presume we have done it that year, even in the future.
// 	That way, when you look at year 2030 (or yearly intervals), you can see presumably what units
// 	and inspections are going to be happening. This will either require 
// 	a new calendar (don't like), or best bet would be to find the company, then unit in that 'future' year,
// 	and append any new inspections. 

// 	Main limitiations during brainstorm: Order of inspections (could be IPVK, instead of VIKP)
// */

// function createFutureCalendar(company, unit, inspection, calendar) {
// 	let nextInspectionDate = unit.inspections[inspection].year + unit.inspections[inspection].interval;
// 	let yearLimit = 2033;
// 	let currentYear = 0;
// 	if(calendar.find(year => year.year === nextInspectionDate) && nextInspectionDate <= yearLimit) {
// 		// console.log('here', nextInspectionDate, unit.inspections[inspection]);

// 		currentYear = unit.inspections[inspection].year;

// 		console.log(company, nextInspectionDate);

// 		while(currentYear <= yearLimit) {
// 			// console.log(currentYear);
// 			currentYear++;
// 		}

// 	} else {
// 		// console.log('No Year: ', nextInspectionDate);
// 	}
// }

module.exports = assembleCalendar;