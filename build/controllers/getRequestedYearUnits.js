"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Unit = require('../models/Unit');
const sanitizeUnitInspections = require('./sanitizeUnitInspections');
async function getRequestedYearUnits(requestedYear) {
    const unitList = await Unit.find({});
    let unitYearArray = [];
    unitList.forEach(unit => {
        let thisUnit = {
            company: '',
            unit: '',
            inspection: '',
            month: 0,
            spec: '',
            id: '',
            MVI: false
        };
        thisUnit.company = unit.company;
        thisUnit.unit = unit.name;
        for (let inspection in unit.inspections) {
            const unitYear = Number(unit.inspections[inspection].year);
            if (unitYear === 0) {
                continue;
            }
            if (inspection !== 'MVI') {
                const unitMonth = Number(unit.inspections[inspection].month);
                const interval = Number(unit.inspections[inspection].interval);
                for (let i = unitYear; i <= requestedYear; i += interval) {
                    if (i === requestedYear) {
                        thisUnit.month = unitMonth;
                        thisUnit.inspection += inspection;
                        thisUnit.spec = unit.spec;
                        thisUnit.id = unit.id;
                    }
                }
            }
            else if (inspection === 'MVI') {
                // thisUnit.inspection += '/MVI';
                thisUnit.MVI = true;
                //Only 407 units were getting /MVI added to their inspections. This is a terrible work around
            }
        }
        if (thisUnit.company !== '' && thisUnit.unit !== '' && thisUnit.inspection !== '') {
            unitYearArray.push(thisUnit);
        }
    });
    unitYearArray.sort((a, b) => a.company.localeCompare(b.company));
    // unitYearArray = removeDuplicateUnits(unitYearArray);
    unitYearArray = sanitizeUnitInspections(unitYearArray);
    return unitYearArray;
}
function removeDuplicateUnits(arr) {
    let newArray = [];
    let uniqueObject = {};
    for (let i in arr) {
        let objName = arr[i]['unit'];
        uniqueObject[objName] = arr[i];
    }
    for (let i in uniqueObject) {
        newArray.push(uniqueObject[i]);
    }
    return newArray;
}
module.exports = getRequestedYearUnits;
