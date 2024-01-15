function sortMonthUnitsByCompany(monthUnits) {
	let companies = [];
	monthUnits.forEach(unit => {
		
		if(!companies.find(company => company.name === unit.company)) {
			const companyToPush = {
				name: unit.company,
				units: []
			}
			
			companies.push(companyToPush);
		} 
		const findCustomerInArray = companies.find(company => company.name === unit.company);
		
		const findUnitInCustomerArray = findCustomerInArray.units.find(thisUnit => thisUnit.name === unit.unit);

		if(!findUnitInCustomerArray) {
			findCustomerInArray.units.push(unit);
		}
	});

	return companies;
}

module.exports = sortMonthUnitsByCompany;
export {};
