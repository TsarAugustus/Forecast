"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExcelDateToJSDate = require('./ExcelDateToJSDate');
const inspectionLimits = require('./inspectionLimits');
const inspectionList = require('./inspectionList');
function getNewWorkbookItemInspections(item) {
    const unitMonth = Number(ExcelDateToJSDate(item.DATE).getMonth());
    const unitYear = Number(ExcelDateToJSDate(item.DATE).getFullYear());
    if (typeof unitMonth !== 'number' || typeof unitYear !== 'number') {
        throw new Error('MONTH OR YEAR IS NOT A NUMBER');
    }
    let thisInspection = inspectionList;
    for (let inspection in item) {
        let inspectionLetter;
        if (inspection === 'Visual' && item[inspection] !== 'N/A')
            inspectionLetter = 'V';
        else if (inspection === 'Internal' && item[inspection] !== 'N/A')
            inspectionLetter = 'I';
        else if (inspection === 'Leakage' && item[inspection] !== 'N/A')
            inspectionLetter = 'K';
        else if (inspection === 'Pressure' && item[inspection] !== 'N/A')
            inspectionLetter = 'P';
        else if (inspection === 'Thickness' && item[inspection] !== 'N/A')
            inspectionLetter = 'T';
        else if (inspection === 'Upper Coupler' && item[inspection] !== 'N/A')
            inspectionLetter = 'UC';
        else if (inspection === 'Wet Fluorescent' && item[inspection] !== 'N/A')
            inspectionLetter = 'WF';
        else if (inspection === 'Lining' && item[inspection] !== 'N/A')
            inspectionLetter = 'L';
        else
            continue;
        const spec = item['TANK SPEC'].toString();
        if (spec === 'HOSES' || spec === 'Hose' || spec === 'TANK SPEC')
            continue;
        if (spec.includes('306') || spec.includes('406')) {
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
            // console.error('UNKNOWN SPEC', spec)
        }
    }
    return thisInspection;
}
module.exports = getNewWorkbookItemInspections;
