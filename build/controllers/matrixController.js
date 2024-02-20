"use strict";
const XLSX = require('xlsx');
const ExcelDateToJSDate = require('./ExcelDateToJSDate');
function matrixController() {
    // const workbook = XLSX.readFile('./uploads/log.xlsx');
    const workbook = XLSX.readFile('./uploads/B620.xlsx');
    const sheetNameList = workbook.SheetNames;
    let newControlSheetResult = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]);
    let oldControlSheetResult = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[2]]);
    let totalWorkbooks = newControlSheetResult.concat(oldControlSheetResult);
    let employeeCertList = [];
    totalWorkbooks.forEach(workbookItem => {
        let unitMonth;
        let unitYear;
        if (workbookItem.DATE !== 'DATE' && /[\-]/.test(workbookItem.DATE) === true) {
            unitMonth = Number(workbookItem.DATE.split('-')[0]);
            unitYear = Number(workbookItem.DATE.split('-')[2]);
        }
        else if (workbookItem.DATE !== 'DATE' && /[\-]/.test(workbookItem.DATE) === false) {
            unitMonth = Number(ExcelDateToJSDate(workbookItem.DATE).getMonth());
            unitYear = Number(ExcelDateToJSDate(workbookItem.DATE).getFullYear());
        }
        if (workbookItem['EMPLOYEE LOG'] && workbookItem['EMPLOYEE LOG'] !== 'EMPLOYEE LOG') {
            const employeeList = workbookItem['EMPLOYEE LOG'].split('/');
            employeeList.forEach(employee => {
                let employeeName = getEmployeeName(employee);
                if (employeeName === undefined) {
                    console.error('NO EMPLOYEE', employeeName, employee);
                }
                if (!employeeCertList.find(thisEmployee => thisEmployee.name === employeeName)) {
                    if (employeeName !== undefined) {
                        employeeCertList.push({
                            name: employeeName,
                            406: {
                                number: 0,
                                list: [],
                                'V': 0,
                                'I': 0,
                                'K': 0,
                                'P': 0,
                                'T': 0,
                                'L': 0,
                                'UC': 0,
                                'WF': 0
                            },
                            407: {
                                number: 0,
                                list: [],
                                'V': 0,
                                'I': 0,
                                'K': 0,
                                'P': 0,
                                'T': 0,
                                'L': 0,
                                'UC': 0,
                                'WF': 0
                            },
                            331: {
                                number: 0,
                                list: [],
                                'V': 0,
                                'I': 0,
                                'K': 0,
                                'P': 0,
                                'T': 0,
                                'L': 0,
                                'UC': 0,
                                'WF': 0
                            }
                        });
                    }
                }
                const thisEmployeeInCertList = employeeCertList.find(thisEmployee => thisEmployee.name === employeeName);
                let thisSpec = getTankSpec(workbookItem['TANK SPEC']);
                let thisInspection = workbookItem.INSPECTION.replace(/\//g, '');
                if (thisSpec !== undefined && employeeName !== undefined) {
                    let thisEmployee = employeeCertList.find(employee => employee.name === employeeName);
                    thisEmployee[thisSpec].number++;
                    for (let letter = 0; letter < thisInspection.length; letter++) {
                        let thisLetter = thisInspection[letter];
                        if (thisInspection[letter] === 'U' || thisInspection[letter] === 'C')
                            thisLetter = 'UC';
                        if (thisInspection[letter] === 'W' || thisInspection[letter] === 'F')
                            thisLetter = 'WF';
                        thisEmployee[thisSpec][thisLetter]++;
                    }
                    thisEmployee[thisSpec].list.push({
                        inspection: workbookItem.INSPECTION.replace(/\//g, ''),
                        month: unitMonth,
                        year: unitYear
                    });
                }
            });
        }
        if (workbookItem['Additional Personnel'] && workbookItem['Additional Personnel'] !== 'N/A') {
            const employeeList = workbookItem['Additional Personnel'].split(',');
            employeeList.forEach(employee => {
                let employeeName = getEmployeeName(employee);
                if (!employeeCertList.find(thisEmployee => thisEmployee.name === employeeName)) {
                    if (employeeName !== undefined) {
                        employeeCertList.push({
                            name: employeeName,
                            406: {
                                number: 0,
                                list: [],
                                'V': 0,
                                'I': 0,
                                'K': 0,
                                'P': 0,
                                'T': 0,
                                'L': 0,
                                'UC': 0,
                                'WF': 0
                            },
                            407: {
                                number: 0,
                                list: [],
                                'V': 0,
                                'I': 0,
                                'K': 0,
                                'P': 0,
                                'T': 0,
                                'L': 0,
                                'UC': 0,
                                'WF': 0
                            },
                            331: {
                                number: 0,
                                list: [],
                                'V': 0,
                                'I': 0,
                                'K': 0,
                                'P': 0,
                                'T': 0,
                                'L': 0,
                                'UC': 0,
                                'WF': 0
                            }
                        });
                    }
                }
                if (employeeName === undefined) {
                    console.error('NO EMPLOYEE', employeeName, employee);
                }
                let thisSpec = getTankSpec(workbookItem['TANK SPEC']);
                let thisInspection = '';
                if (workbookItem.Visual !== 'N/A')
                    thisInspection += 'V';
                if (workbookItem.Internal !== 'N/A')
                    thisInspection += 'I';
                if (workbookItem.Leakage !== 'N/A')
                    thisInspection += 'K';
                if (workbookItem.Pressure !== 'N/A')
                    thisInspection += 'P';
                if (workbookItem.Thickness !== 'N/A')
                    thisInspection += 'T';
                if (workbookItem.Lining !== 'N/A')
                    thisInspection += 'L';
                if (workbookItem['Upper Coupler'] !== 'N/A')
                    thisInspection += 'UC';
                if (workbookItem['Wet Fluorescent'] !== 'N/A')
                    thisInspection += 'WF';
                if (thisSpec !== undefined && employeeName !== undefined) {
                    let thisEmployee = employeeCertList.find(employee => employee.name === employeeName);
                    thisEmployee[thisSpec].number++;
                    for (let letter = 0; letter < thisInspection.length; letter++) {
                        let thisLetter = thisInspection[letter];
                        if (thisLetter === 'U' || thisLetter === 'C')
                            thisLetter = 'UC';
                        if (thisLetter === 'W' || thisLetter === 'F')
                            thisLetter = 'WF';
                        thisEmployee[thisSpec][thisLetter]++;
                    }
                    thisEmployee[thisSpec].list.push({
                        inspection: thisInspection,
                        month: unitMonth,
                        year: unitYear
                    });
                }
            });
        }
    });
    return employeeCertList;
}
function getEmployeeName(string) {
    let nameToReturn;
    if (string.includes('Dax'))
        nameToReturn = 'Dax Poitras';
    if (string.includes('Patrick'))
        nameToReturn = 'Patrick Trinh';
    if (string.includes('Carson'))
        nameToReturn = 'Carson Gray';
    if (string.includes('Paul'))
        nameToReturn = 'Paul Radacz';
    if (string.includes('Ryan'))
        nameToReturn = 'Ryan Spelling';
    if (string.includes('Cole'))
        nameToReturn = 'Cole Kaufman';
    if (string.includes('Jun'))
        nameToReturn = 'Jun Chae';
    if (string.includes('Tyler'))
        nameToReturn = 'Tyler Vanderwall';
    if (string.includes('Gurj'))
        nameToReturn = 'Gurjinder Biln';
    if (string.includes('Al'))
        nameToReturn = 'Al Smith';
    return nameToReturn;
}
function getTankSpec(potentialSpec) {
    let specToReturn;
    potentialSpec = potentialSpec.toString();
    if (potentialSpec && potentialSpec === 306 || potentialSpec === 406)
        specToReturn = 406;
    if (potentialSpec && potentialSpec === 307 || potentialSpec === 407)
        specToReturn = 407;
    if (potentialSpec && potentialSpec === 330 || potentialSpec === 331)
        specToReturn = 331;
    if (potentialSpec === 412)
        specToReturn = 407;
    if (!specToReturn && potentialSpec !== 'Hose') {
        if (potentialSpec && potentialSpec.includes('306') || potentialSpec.includes('406'))
            specToReturn = 406;
        if (potentialSpec && potentialSpec.includes('307') || potentialSpec.includes('407'))
            specToReturn = 407;
        if (potentialSpec && potentialSpec.includes('330') || potentialSpec.includes('331'))
            specToReturn = 331;
    }
    //412, 338, tc51 etc
    return specToReturn;
}
module.exports = matrixController;
