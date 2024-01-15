"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inspectionLimits = require('./inspectionLimits');
const ExcelDateToJSDate = require('./ExcelDateToJSDate');
const inspectionList = require('./inspectionList');
function getOldWorkbookItemInspections(item) {
    let unitMonth;
    let unitYear;
    let thisInspection = inspectionList;
    if (item.DATE !== 'DATE' && /[\-]/.test(item.DATE) === true) {
        unitMonth = Number(item.DATE.split('-')[0]);
        unitYear = Number(item.DATE.split('-')[2]);
    }
    else if (item.DATE !== 'DATE' && /[\-]/.test(item.DATE) === false) {
        unitMonth = Number(ExcelDateToJSDate(item.DATE).getMonth());
        unitYear = Number(ExcelDateToJSDate(item.DATE).getFullYear());
    }
    if (item.UNIT !== 'UNIT' && (typeof unitMonth !== 'number' || typeof unitYear !== 'number')) {
        console.log(unitMonth, unitYear, item);
        throw new Error('MONTH OR YEAR IS NOT A NUMBER');
    }
    if (item.UNIT && item.UNIT !== 'UNIT') {
        for (let inspection in item.INSPECTION) {
            let inspectionLetter;
            if (item.INSPECTION[inspection] === 'V')
                inspectionLetter = 'V';
            else if (item.INSPECTION[inspection] === 'I')
                inspectionLetter = 'I';
            else if (item.INSPECTION[inspection] === 'K')
                inspectionLetter = 'K';
            else if (item.INSPECTION[inspection] === 'P')
                inspectionLetter = 'P';
            else if (item.INSPECTION[inspection] === 'T')
                inspectionLetter = 'T';
            else if (item.INSPECTION[inspection] === 'U')
                inspectionLetter = 'UC';
            else if (item.INSPECTION[inspection] === 'C')
                inspectionLetter = 'UC';
            else if (item.INSPECTION[inspection] === 'W')
                inspectionLetter = 'WF';
            else if (item.INSPECTION[inspection] === 'F')
                inspectionLetter = 'WF';
            else if (item.INSPECTION[inspection] === 'L')
                inspectionLetter = 'L';
            else
                continue;
            let spec = item['TANK SPEC'].toString();
            if (spec === 'HOSES' || spec === 'Hose' || spec === 'TANK SPEC')
                continue;
            if (spec.includes('306') || spec.includes('406')) {
                // console.log(previousData)
                thisInspection[inspectionLetter].year = unitYear + inspectionLimits['406'][inspectionLetter];
                thisInspection[inspectionLetter].interval = inspectionLimits['406'][inspectionLetter];
                thisInspection[inspectionLetter].month = unitMonth;
            }
            else if (spec.includes('307') || spec.includes('407') || spec.includes('412')) {
                thisInspection[inspectionLetter].year = unitYear + inspectionLimits['407'][inspectionLetter];
                thisInspection[inspectionLetter].interval = inspectionLimits['407'][inspectionLetter];
                thisInspection[inspectionLetter].month = unitMonth;
            }
            else if (spec.includes('330') || spec.includes('331') || spec.includes('51')) {
                thisInspection[inspectionLetter].year = unitYear + inspectionLimits['331'][inspectionLetter];
                thisInspection[inspectionLetter].interval = inspectionLimits['331'][inspectionLetter];
                thisInspection[inspectionLetter].month = unitMonth;
            }
            else {
                // console.log('UNKNOWN SPEC', spec)
            }
        }
        return thisInspection;
    }
}
module.exports = getOldWorkbookItemInspections;
