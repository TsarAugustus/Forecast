export {};

function ExcelDateToJSDate(serial) {
	return new Date((serial - (25567 + 1))*86400*1000);
}

module.exports = ExcelDateToJSDate;
