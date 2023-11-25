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

module.exports = assembleCalendar;