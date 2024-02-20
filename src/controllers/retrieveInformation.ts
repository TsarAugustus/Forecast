export {};

const XLSX = require('xlsx');
// const getOldWorkbookInformation = require('./getOldWorkbookInformation');
// const getNewWorkbookInformation = require('./getNewWorkbookInformation');

function retrieveInformation(arg) {
	// const workbook = XLSX.readFile('/var/www/html/Forecast/uploads/log.xlsx');
	// const workbook = XLSX.readFile('./uploads/log.xlsx');
	const workbook = XLSX.readFile('./uploads/B620.xlsx');
	const sheetNameList = workbook.SheetNames;
	
	let newControlSheetResult = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]);
	let oldControlSheetResult = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[2]]);

	return [oldControlSheetResult, newControlSheetResult]
}

module.exports = retrieveInformation;
