"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const XLSX = require('xlsx');
function retrieveMVIInformation() {
    const workbook = XLSX.readFile('./uploads/MVI.xlsx');
    const sheetNameList = workbook.SheetNames;
    const MVILog = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]);
    return MVILog;
}
module.exports = retrieveMVIInformation;
