const XLSX = require('xlsx');
const getOldWorkbookInformation = require('./getOldWorkbookInformation');
const getNewWorkbookInformation = require('./getNewWorkbookInformation');
const assembleCalendar = require('./assembleCalendar');
let companies = require('./companies');

function retrieveInformation(arg) {
	const workbook = XLSX.readFile('./uploads/log.xlsx');
	const sheetNameList = workbook.SheetNames;
	// console.log('FORECAST');
	
	let newControlSheetResult = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]);
	let oldControlSheetResult = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[2]]);

	getOldWorkbookInformation(oldControlSheetResult);
	
	getNewWorkbookInformation(newControlSheetResult);

	let calendar = assembleCalendar(companies);

	if(arg === 'Audit') {
		return oldControlSheetResult.concat(newControlSheetResult);
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
			calendar.splice(index, 1);
		}
	});

	return calendar;
}

module.exports = retrieveInformation;