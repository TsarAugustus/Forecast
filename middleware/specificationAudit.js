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

module.exports = specificationAudit;