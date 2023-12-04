const companies = require("./companies");

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
				let inspectionYear = unit.inspections[inspection].year;
				let inspectionMonth = unit.inspections[inspection].month;
				let inspectionInterval = unit.inspections[inspection].interval; 

				let currentYear = new Date().getFullYear();

				if(inspectionInterval !== 0) {
					while(currentYear <= yearLimit) {
						let yearInCalendar = calendar.find(year => year.year === currentYear);

						if(yearInCalendar !== undefined) {
							let monthInCalendar = yearInCalendar.months.find(month => month.index === inspectionMonth) ;

							if(monthInCalendar !== undefined) {
								let customerInMonth = monthInCalendar.customers.find(customer => customer.name === company.name);

								if(!customerInMonth) {
									let newCustomer = {
										name: company.name,
										units: []
									};

									monthInCalendar.customers.push(newCustomer);

								} else {
									console.error('CUSTOMER EXISTS: ', customerInMonth);
								}

								//Redundant?
								monthInCalendar.customers.find(customer => customer.name === company.name);

								if(customerInMonth !== undefined) {
									let unitInCustomerMonth = customerInMonth.units.find(thisUnit => thisUnit.name === unit.name);

									if(unitInCustomerMonth === undefined) {
										let newUnit = {
											name: unit.name,
											inspection: ''
										};

										customerInMonth.units.push(newUnit);
									}

									unitInCustomerMonth = customerInMonth.units.find(thisUnit => thisUnit.name === unit.name);
									unitInCustomerMonth.inspection += inspection;
								}
							}
						}

						currentYear += inspectionInterval;
					}
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

function OLDassembleCalendar(info) {
	let calendar = [];

	info.forEach(company => {
		company.units.forEach(unit => {
			for (let inspection in unit.inspections) {
				if (!calendar.find(year => year.year === unit.inspections[inspection].year) && unit.inspections[inspection].year !== 0 && !isNaN(unit.inspections[inspection].year)) {
					let newYear = {
						year: unit.inspections[inspection].year,
						months: []
					};

					if (unit.inspections[inspection].year === isNaN(unit.inspections[inspection].year) || unit.inspections[inspection].year === 0) {
						console.error('NAN', company, unit);
					}

					months.forEach((month, index) => {
						let newMonth = {
							month: month,
							index: index,
							customers: []
						};

						newYear.months.push(newMonth);
					});

					calendar.push(newYear);
				}
			}
		});
	});

	info.forEach(company => {
		company.units.forEach(unit => {
			for (let inspection in unit.inspections) {
				let inspectionYear = unit.inspections[inspection].year;
				let inspectionMonth = unit.inspections[inspection].month;

				let yearInCalendar = calendar.find(year => year.year === inspectionYear);

				if (yearInCalendar !== undefined) {
					let monthInCalendar = yearInCalendar.months.find(month => month.index === inspectionMonth);

					if (monthInCalendar !== undefined) {
						let customerInMonth = monthInCalendar.customers.find(customer => customer.name === company.name);

						if (!customerInMonth) {
							let newCustomer = {
								name: company.name,
								units: []
							};

							monthInCalendar.customers.push(newCustomer);
						}
					}
				}
			}
		});
	});

	info.forEach(company => {
		company.units.forEach(unit => {
			for (let inspection in unit.inspections) {
				let inspectionYear = unit.inspections[inspection].year;
				let inspectionMonth = unit.inspections[inspection].month;

				let yearInCalendar = calendar.find(year => year.year === inspectionYear);

				if (yearInCalendar !== undefined) {
					let monthInCalendar = yearInCalendar.months.find(month => month.index === inspectionMonth);

					let customerInMonth = monthInCalendar.customers.find(customer => customer.name === company.name);

					let unitInCustomerMonth = customerInMonth.units.find(thisUnit => thisUnit.name === unit.name);

					if (!unitInCustomerMonth) {
						let newUnit = {
							name: unit.name,
							inspection: ''
						};

						for (let inspection in unit.inspections) {
							if (unit.inspections[inspection].year === yearInCalendar.year && monthInCalendar.index === unit.inspections[inspection].month) {
								newUnit.inspection += inspection;
							}
						}

						customerInMonth.units.push(newUnit);
					}
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

/*
	The idea for the 'Future' Calendar is to take each inspection interval,
	and presume we have done it that year, even in the future.
	That way, when you look at year 2030 (or yearly intervals), you can see presumably what units
	and inspections are going to be happening. This will either require 
	a new calendar (don't like), or best bet would be to find the company, then unit in that 'future' year,
	and append any new inspections. 

	Main limitiations during brainstorm: Order of inspections (could be IPVK, instead of VIKP)
*/

function createFutureCalendar(company, unit, inspection, calendar) {
	let nextInspectionDate = unit.inspections[inspection].year + unit.inspections[inspection].interval;
	let yearLimit = 2033;
	let currentYear = 0;
	if(calendar.find(year => year.year === nextInspectionDate) && nextInspectionDate <= yearLimit) {
		currentYear = unit.inspections[inspection].year;

		console.log(company, nextInspectionDate);

		while(currentYear <= yearLimit) {
			currentYear++;
		}

	} else {
		console.error('No Year: ', nextInspectionDate);
	}
}

module.exports = assembleCalendar;