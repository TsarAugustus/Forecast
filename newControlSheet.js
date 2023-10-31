// // newControlSheetResult.forEach(result => {
// // 	// Date information
// // 	let inspectionDate = ExcelDateToJSDate(result.DATE);
// // 	let inspectionDay = inspectionDate.getDate() + 1;
// // 	let inspectionMonth = inspectionDate.getMonth() + 1;
// // 	let inspectionYear = inspectionDate.getFullYear();

// // 	if(companies.find(thisCompany => thisCompany.name === result.CUSTOMER) === undefined) {
// // 		let company = {
// // 			name: result.CUSTOMER,
// // 			units: []
// // 		}
// // 	}
	
// // 	let companyInArray = companies.find(thisCompany => thisCompany.name === result.CUSTOMER)
	
// // 	if(companyInArray.units.find(thisUnit => thisUnit.number === result.UNIT.toString().replace(/[^\w.]+/g, "")) === undefined) {
// // 		let unit = {
// // 			number: result.UNIT.toString().replace(/[^\w.]+/g, ""),
// // 			inpsection: undefined,
// // 			spec: result['TANK SPEC'],
// // 			interval: {
// // 				'V': undefined,
// // 				'I': undefined,
// // 				'K': undefined,
// // 				'P': undefined,
// // 				'T': undefined,
// // 				'L': undefined,
// // 				'UC': undefined,
// // 				'WF' : undefined
// // 			}
// // 		}
		
// // 		if(unit.spec.match(/(\d+)/)) unit.spec = unit.spec.match(/(\d+)/)[0]
		
// // 		companyInArray.units.push(unit)
		
// // 		if(unit.number === 'TEST') {
// // 			// console.log(unit)
// // 		}
		
// // 		// NEED HOSES
// // 		// WILL ERROR OUT ABOVE		
// // 	}
// // });

// function newControlSheet() {
// 	return 'new';
// }

// export { newControlSheet }