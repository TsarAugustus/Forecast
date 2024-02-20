"use strict";
const express = require('express');
const router = express.Router();
const Company = require('../models/Company');
const Unit = require('../models/Unit');
const CustomUnit = require('../models/CustomUnit');
const Schedule = require('../models/Schedule');
const CustomInspection = require('../models/CustomInspection');
const MissedUnits = require('../models/MissedUnits');
const getRequestedYearUnits = require('../controllers/getRequestedYearUnits');
const sortMonthUnitsByCompany = require('../controllers/sortMonthUnitsByCustomer');
const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];
router.delete('/:year/:month/:unit/:company', async (req, res) => {
    // res.sendStatus(200)
    const thisUnit = req.params.unit.replace(/-/g, '/');
    const thisCompany = req.params.company;
    await Schedule.findOneAndUpdate({ unit: thisUnit, company: thisCompany }, { $set: { schedule: [] } });
});
router.delete('/custom/:year/:month/:unit/:company', async (req, res) => {
    const thisUnit = req.params.unit.replace(/-/g, '/');
    const thisCompany = req.params.company;
    const thisYear = req.params.year;
    const thisMonth = req.params.month;
    await CustomUnit.findOneAndDelete({ unit: thisUnit, company: thisCompany });
    await Schedule.findOneAndDelete({ unit: thisUnit, company: thisCompany });
});
router.put('/edit/:year/:month/:unit/:company/:inspection/:id', async (req, res) => {
    const thisInspection = req.params.inspection;
    const thisUnit = req.params.unit.replace(/-/g, '/');
    const thisCompany = req.params.company;
    const thisYear = req.params.year;
    const thisID = req.params.id;
    let thisMonth = undefined;
    months.forEach((month, monthIndex) => {
        if (month === req.params.month)
            thisMonth = monthIndex;
    });
    const previousCustomInspection = await CustomInspection.findOne({ unit: thisUnit, company: thisCompany, year: thisYear, month: thisMonth, unitID: thisID });
    if (!previousCustomInspection) {
        await CustomInspection.create({
            unit: thisUnit,
            company: thisCompany,
            year: thisYear,
            month: thisMonth,
            inspection: thisInspection,
            unitID: thisID
        });
    }
    else {
        await CustomInspection.findOneAndUpdate({ unit: thisUnit, company: req.params.company, unitID: thisID }, { $set: { inspection: thisInspection } });
    }
});
router.get('/req/:year/:month', async (req, res) => {
    const thisYear = Number(req.params.year);
    const thisMonth = req.params.month;
    let thisMonthNumber = undefined;
    months.forEach((month, monthIndex) => {
        if (month === thisMonth)
            thisMonthNumber = monthIndex;
    });
    let existingSchedule = await Schedule.find({}).lean();
    let scheduleToSend = [];
    existingSchedule.forEach(scheduleItem => {
        scheduleItem.schedule.forEach(thisItem => {
            if (months[thisItem.month] === thisMonth && thisItem.year === thisYear && !scheduleToSend.find(unit => unit.unit === scheduleItem.unit && unit.company === scheduleItem.company && unit.id === scheduleItem.id)) {
                scheduleToSend.push(scheduleItem);
            }
        });
    });
    const customInspections = await CustomInspection.find({ month: thisMonthNumber, year: thisYear });
    customInspections.forEach(thisInspection => {
        let thisUnitInSchedule = existingSchedule.find(unit => unit.unit === thisInspection.unit && unit.company === thisInspection.company && unit.unitID === thisInspection.unitID);
        if (thisUnitInSchedule) {
            thisUnitInSchedule.inspection = thisInspection.inspection;
        }
    });
    const missedUnits = await MissedUnits.find({});
    missedUnits.forEach(missedUnit => {
        let thisUnitInSchedule = scheduleToSend.find(unit => unit.unit === missedUnit.unit && unit.company === missedUnit.company && unit.unitID === missedUnit.unitID);
        if (thisUnitInSchedule) {
            thisUnitInSchedule.schedule.forEach(schedule => {
                if (schedule.day === missedUnit.day && schedule.month === missedUnit.month && schedule.year === missedUnit.year && schedule.unitID === missedUnit.unitID) {
                    schedule['missed'] = true;
                }
            });
        }
    });
    return res.json(scheduleToSend);
});
router.put('/req/:year/:month/:day/:cell/:unit/:company', async (req, res) => {
    let thisUnit = req.params.unit.replace(/-/g, '/');
    let thisSchedule = await Schedule.find({ unit: thisUnit, company: req.params.company });
    //WILL GET MULTIPLE RESULTS
    //GOTTA GO THROUGH EACH MONTH
    let newSchedule = [];
    thisSchedule.forEach(monthSchedule => {
        monthSchedule.schedule.forEach((scheduleItem, scheduleIndex) => {
            const thisYear = Number(req.params.year);
            const thisMonth = req.params.month;
            const thisDay = Number(req.params.day);
            const thisCell = Number(req.params.cell);
            // console.log('Year: ', thisYear, scheduleItem.year);
            // console.log('Month: ', thisMonth, months[scheduleItem.month]);
            // console.log('Day: ', thisDay, scheduleItem.day);
            // console.log('Cell: ', thisCell, scheduleItem.cell)
            if (scheduleItem.year === thisYear && months[scheduleItem.month] === thisMonth && scheduleItem.day === thisDay && scheduleItem.cell === thisCell) {
                // thisSchedule.schedule.splice(scheduleIndex, 1);
                // console.log('deleting')
                // console.log('go', scheduleItem)
            }
            else {
                newSchedule.push(scheduleItem);
                // console.log('no go', scheduleItem)
            }
        });
    });
    await Schedule.findOneAndUpdate({ unit: thisUnit, company: req.params.company }, { $set: { schedule: newSchedule } });
});
router.put('/missed/:year/:month/:day/:cell/:unit/:company/:unitID', async (req, res) => {
    const unitYear = Number(req.params.year);
    let unitMonth;
    months.find((month, monthIndex) => {
        if (month === req.params.month)
            unitMonth = monthIndex;
    });
    const unitDay = Number(req.params.day);
    const unitCell = Number(req.params.cell);
    const thisUnit = req.params.unit;
    const unitCompany = req.params.company;
    const unitID = req.params.unitID;
    let thisMissedUnit = await MissedUnits.findOne({
        year: unitYear,
        month: unitMonth,
        day: unitDay,
        cell: unitCell,
        unit: thisUnit,
        company: unitCompany,
        unitID: unitID
    });
    if (!thisMissedUnit) {
        MissedUnits.create({
            year: unitYear,
            month: unitMonth,
            day: unitDay,
            cell: unitCell,
            unit: thisUnit,
            company: unitCompany,
            unitID: unitID
        });
    }
    else {
        await MissedUnits.findOneAndDelete({
            year: unitYear,
            month: unitMonth,
            day: unitDay,
            cell: unitCell,
            unit: thisUnit,
            company: unitCompany,
            unitID: unitID
        });
    }
});
router.get('/:year/:month', async (req, res) => {
    const requestedYear = Number(req.params.year);
    const requestedMonth = req.params.month;
    let requestedMonthNumber;
    months.forEach((month, index) => {
        if (month === requestedMonth)
            requestedMonthNumber = index;
    });
    const yearUnits = await getRequestedYearUnits(requestedYear);
    const monthUnits = [];
    yearUnits.filter(unit => {
        if (unit.month === requestedMonthNumber)
            monthUnits.push(unit);
    });
    const customUnits = await CustomUnit.find({});
    customUnits.forEach(unit => {
        if (unit.month === requestedMonthNumber && unit.year === requestedYear) {
            monthUnits.push(unit);
        }
    });
    //In getRequestedYearUnits, attempted to add /MVI to the inspection. It would not save. This is the best work around.
    monthUnits.forEach(item => {
        if (item.MVI)
            item.inspection += '/MVI';
    });
    const monthUnitsByCompany = sortMonthUnitsByCompany(monthUnits);
    const monthDays = buildMonth(requestedMonthNumber, requestedYear);
    const customInspections = await CustomInspection.find({});
    customInspections.forEach(newInspection => {
        let companyInArray = monthUnitsByCompany.find(item => item.name === newInspection.company);
        if (companyInArray) {
            let unitInCompanyArray = companyInArray.units.find(item => item.unit === newInspection.unit && item.id === newInspection.unitID);
            if (unitInCompanyArray) {
                unitInCompanyArray.inspection = newInspection.inspection;
            }
        }
    });
    const HTMLMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    res.render('month', { monthUnits: monthUnits, monthUnitsByCompany: monthUnitsByCompany, requestedYear: requestedYear, requestedMonth: requestedMonth, monthDays: monthDays, HTMLMonths: HTMLMonths });
});
router.post('/:year/:month', (req, res) => {
    const year = Number(req.params.year);
    const month = req.params.month;
    let requestedMonthNumber;
    months.forEach((thisMonth, index) => {
        if (thisMonth === month)
            requestedMonthNumber = index;
    });
    const unitName = req.body.unitName.replace(/-/g, '/');
    const companyName = req.body.companyName;
    const inspection = req.body.inspection;
    const specification = req.body.specification;
    const existingCustomUnit = CustomUnit.find({ name: unitName, company: companyName, inspection: inspection, year: year, month: requestedMonthNumber, specification: specification });
    if (existingCustomUnit) {
        CustomUnit.create({
            unit: unitName,
            company: companyName,
            inspection: inspection,
            year: year,
            month: requestedMonthNumber,
            spec: specification
        });
    }
    else {
        console.error('Existing Custom Unit not found');
    }
    res.redirect(`/year/${year}/${month}`);
});
function buildMonth(month, year) {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let monthToReturn = [];
    let monthDays = new Date(year, month + 1, 0).getDate();
    for (let i = 0; i < monthDays; i++) {
        let newDay = {
            date: i + 1,
            day: days[new Date(year, month, i + 1, 12).getDay()],
            offset: undefined
        };
        if (newDay.day === 'Sunday') {
            newDay.offset = 7;
        }
        else {
            newDay.offset = new Date(year, month, i + 1, 12).getDay();
        }
        monthToReturn.push(newDay);
    }
    return monthToReturn;
}
function sortCompanies(a, b) {
    if (a.company < b.company) {
        return -1;
    }
    if (a.company > b.company) {
        return 1;
    }
    return 0;
}
function removeDuplicateUnits(arr) {
    let newArray = [];
    let uniqueObject = {};
    for (let i in arr) {
        let objName = arr[i]['name'];
        uniqueObject[objName] = arr[i];
    }
    for (let i in uniqueObject) {
        newArray.push(uniqueObject[i]);
    }
    return newArray;
}
module.exports = router;
