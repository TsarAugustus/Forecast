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


	if(company.name.includes('Superior'))		companyName = 'Superior';
	if(company.name.includes('Enex'))			companyName = 'FuelEx';
	if(company.name.includes('Summit'))			companyName = 'Summit';
	if(company.name.includes('Kodiak'))			companyName = 'Kodiak';
	if(company.name.includes('Otter'))			companyName = 'Otter';
	if(company.name.includes('Paz'))			companyName = 'Paz';
	if(company.name.includes('KJTL'))			companyName = 'Ken Johnson';
	if(company.name.includes('Petro Value')) 	companyName = 'KMP';
	
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

module.exports = assembleCalendar;