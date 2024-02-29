const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Company = require('../models/Company');
const Unit = require('../models/Unit');
const CustomUnit = require('../models/CustomUnit');
const Schedule = require('../models/Schedule');
const CustomInspection = require('../models/CustomInspection');
const MissedUnits = require('../models/MissedUnits');
const CustomStyle = require('../models/CustomStyle');
const HiddenUnit = require('../models/HiddenUnits')
const getRequestedYearUnits = require('../controllers/getRequestedYearUnits');
const sortMonthUnitsByCustomer = require('../controllers/sortMonthUnitsByCustomer');

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
//Dumb
export{}

router.put('/color/:company/:backgroundColor/:borderColor/:textColor', async (req, res) => {
	const backgroundColor = req.params.backgroundColor;
	const borderColor = req.params.borderColor;
	const textColor = req.params.textColor;
	const company = req.params.company;

	const savedStyle = await CustomStyle.find({company: company});

	if(savedStyle.length === 0) {
		try {
			CustomStyle.create({
				company,
				backgroundColor,
				borderColor,
				textColor
			})
		}
		catch (error) {
			console.error(error);
		}
		
	} else {
		await CustomStyle.findOneAndUpdate(
			{ company: company },
			{$set: { backgroundColor: backgroundColor, borderColor: borderColor, textColor: textColor }}
		)
	}

	console.log('Submitted')
});

router.get('/color/:company', async (req, res) => {
	const savedStyle = await CustomStyle.findOne({company: req.params.company});
	return res.json(savedStyle);
})

router.delete('/:year/:month/:unit/:company/:shop', async (req, res) => {
	// res.sendStatus(200)
	const thisUnit = req.params.unit.replace(/-/g, '/');
	const thisCompany = req.params.company;
	const thisShop = req.params.shop;

	await Schedule.findOneAndUpdate(
		{unit: thisUnit, company: thisCompany, shop: thisShop},
		{$set: {schedule: []}}
	)

})

router.delete('/custom/:year/:month/:unit/:company', async (req, res) => {
	const thisUnit = req.params.unit.replace(/-/g, '/');
	const thisCompany = req.params.company;
	const thisYear = req.params.year;
	const thisMonth = req.params.month;

	await CustomUnit.findOneAndDelete({unit: thisUnit, company: thisCompany})
	await Schedule.findOneAndDelete({unit: thisUnit, company: thisCompany});

});

router.put('/edit/:year/:month/:unit/:company/:inspection/:id/:shop', async (req, res) => {
	const thisInspection = req.params.inspection;
	const thisUnit = req.params.unit.replace(/-/g, '/');
	const thisCompany = req.params.company;
	const thisYear = req.params.year;
	const thisID = req.params.id;
	const thisShop = req.params.shop;

	let thisMonth = undefined;

	months.forEach((month, monthIndex) => {
		if(month === req.params.month) thisMonth = monthIndex;
	});

	const findCustomUnit = await CustomUnit.findOne({unit: thisUnit, company: thisCompany});

	if(findCustomUnit) {
		await CustomUnit.findOneAndUpdate(
			{ unit: thisUnit, company: thisCompany },
			{ $set: { shop: thisShop }}
		);
	
	} else {
		await Unit.findOneAndUpdate(
			{ name: thisUnit, company: thisCompany },
			{ $set: { shop: thisShop }}
		);
	}
	
	const previousCustomInspection = await CustomInspection.findOne({unit: thisUnit, company: thisCompany, year: thisYear, month: thisMonth, shop: thisShop});
	if(!previousCustomInspection) {
		await CustomInspection.create({
			unit: thisUnit,
			company: thisCompany,
			year: thisYear,
			month: thisMonth,
			inspection: thisInspection,
			unitID: thisID,
			shop: thisShop
		})
	} else {
		await CustomInspection.findOneAndUpdate(
			{ unit: thisUnit, company: req.params.company },
			{ $set: { inspection: thisInspection, shop: thisShop }}
		)
	}
})

router.get('/req/:year/:month/:shop', async (req, res) => {
	const thisYear = Number(req.params.year);
	const thisMonth = req.params.month;
	const thisShop = req.params.shop;
	let thisMonthNumber = undefined;

	months.forEach((month, monthIndex) => {
		if(month === thisMonth) thisMonthNumber = monthIndex;
	})

	let existingSchedule = await Schedule.find({shop: thisShop}).lean();
	let scheduleToSend = [];

	existingSchedule.forEach(scheduleItem => {
		scheduleItem.schedule.forEach(thisItem => {
			if(months[thisItem.month] === thisMonth && thisItem.year === thisYear && !scheduleToSend.find(unit => unit.unit === scheduleItem.unit && unit.company === scheduleItem.company && unit.id === scheduleItem.id)) {
				scheduleToSend.push(scheduleItem);
			}
		});
	});

	const customInspections = await CustomInspection.find({month: thisMonthNumber, year: thisYear});

	customInspections.forEach(thisInspection => {
		let thisUnitInSchedule = existingSchedule.find(unit => unit.unit === thisInspection.unit && unit.company === thisInspection.company && unit.unitID === thisInspection.unitID);

		if(thisUnitInSchedule) {
			thisUnitInSchedule.inspection = thisInspection.inspection;
		}
	});

	const missedUnits = await MissedUnits.find({});

	missedUnits.forEach(missedUnit => {
		let thisUnitInSchedule = scheduleToSend.find(unit => unit.unit === missedUnit.unit && unit.company === missedUnit.company && unit.unitID === missedUnit.unitID);

		if(thisUnitInSchedule) {
			thisUnitInSchedule.schedule.forEach(schedule => {
				if(schedule.day === missedUnit.day && schedule.month === missedUnit.month && schedule.year === missedUnit.year && schedule.unitID === missedUnit.unitID) {
					schedule['missed'] = true
				}
			})
		}
	});

	// const hiddenUnits = await HiddenUnit.find({});

	// scheduleToSend.forEach((item, itemIndex) => {
	// 	hiddenUnits.forEach(hiddenItem => {
	// 		if(hiddenItem.id === item.unitID) scheduleToSend.splice(itemIndex, 1)
	// 	})
	// });

	return res.json(scheduleToSend)
});

router.put('/req/:year/:month/:day/:cell/:unit/:company/:shop', async (req, res) => {
	let thisUnit = req.params.unit.replace(/-/g, '/');
	let thisSchedule = await Schedule.find({unit: thisUnit, company: req.params.company, shop: req.params.shop});

	//WILL GET MULTIPLE RESULTS
	//GOTTA GO THROUGH EACH MONTH

	let newSchedule = [];

	thisSchedule.forEach(monthSchedule => {
		monthSchedule.schedule.forEach((scheduleItem, scheduleIndex) => {
			const thisYear = Number(req.params.year);
			const thisMonth = req.params.month;
			const thisDay = Number(req.params.day);
			const thisCell = Number(req.params.cell);
			const thisShop = req.params.shop;

			// console.log('Year: ', scheduleItem.year, thisYear, scheduleItem.year === thisYear);
			// console.log('Month: ', months[scheduleItem.month], thisMonth, months[scheduleItem.month] === thisMonth);
			// console.log('Day: ', scheduleItem.day, thisDay, scheduleItem.day === thisDay);
			// console.log('Cell: ', scheduleItem.cell, thisCell, scheduleItem.cell === thisCell);

			if(scheduleItem.year === thisYear && months[scheduleItem.month] === thisMonth && scheduleItem.day === thisDay && scheduleItem.cell === thisCell) {
				// thisSchedule.schedule.splice(scheduleIndex, 1);
				// console.log('deleting')
				// console.log('go', scheduleItem)
			} else {
				newSchedule.push(scheduleItem);
				// console.log('no go', scheduleItem)
			}
		})
	})
	

	await Schedule.findOneAndUpdate(
		{unit: thisUnit, company: req.params.company, shop: req.params.shop},
		{ $set: { schedule: newSchedule }}
	)
}) 

router.put('/missed/:year/:month/:day/:cell/:unit/:company/:unitID', async (req, res) => {
	const unitYear = Number(req.params.year);
	let unitMonth;
	
	months.find((month, monthIndex) => {
		if(month === req.params.month) unitMonth = monthIndex
	})
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

	if(!thisMissedUnit) {
		await MissedUnits.create({
			year: unitYear,
			month: unitMonth,
			day: unitDay,
			cell: unitCell,
			unit: thisUnit,
			company: unitCompany,
			unitID: unitID
		})
	} else {
		await MissedUnits.findOneAndDelete({
			year: unitYear,
			month: unitMonth,
			day: unitDay,
			cell: unitCell,
			unit: thisUnit,
			company: unitCompany,
			unitID: unitID
		})
	}
})

router.get('/:year/:month/:shop', async (req, res) => {
	const requestedYear = Number(req.params.year);
	const requestedMonth = req.params.month;
	let requestedMonthNumber: number;

	const shop = req.params.shop;

	months.forEach((month, index) => {
		if(month === requestedMonth) requestedMonthNumber = index;
	})

	const yearUnits = await getRequestedYearUnits(requestedYear, shop);

	const monthUnits = [];
	
	yearUnits.filter(unit => {
		if(unit.month === requestedMonthNumber) monthUnits.push(unit)
	});

	const customUnits = await CustomUnit.find({shop: shop});

	customUnits.forEach(unit => {
		if(unit.month === requestedMonthNumber && unit.year === requestedYear) {
			monthUnits.push(unit)
		}
	});

	//In getRequestedYearUnits, attempted to add /MVI to the inspection. It would not save. This is the best work around.
	monthUnits.forEach(item => {
		if(item.MVI) item.inspection += '/MVI'
	});

	let monthUnitsByCompany = sortMonthUnitsByCustomer(monthUnits);
	const customerStyles = await CustomStyle.find({});

	customerStyles.forEach(style => {
		let thisCustomer = monthUnitsByCompany.find(item => item.name === style.company);

		if(style && thisCustomer) thisCustomer.style = style;
	});

	const monthDays = buildMonth(requestedMonthNumber, requestedYear);

	const customInspections = await CustomInspection.find({shop: shop});

	customInspections.forEach(newInspection => {
		let companyInArray = monthUnitsByCompany.find(item => item.name === newInspection.company);
		if(companyInArray) {
			let unitInCompanyArray = companyInArray.units.find(item => item.unit === newInspection.unit && item.id === newInspection.unitID);

			if(unitInCompanyArray) {
				unitInCompanyArray.inspection = newInspection.inspection; 
			}
		}
		
	});

	const hiddenUnits = await HiddenUnit.find({});

	hiddenUnits.forEach(hiddenUnit => {
		monthUnitsByCompany.forEach((company, companyIndex) => {
			if(hiddenUnit.company === company.name) {
				company.units.forEach((unit, unitIndex) => {
					if(hiddenUnit.unit === unit.unit) company.units.splice(unitIndex, 1);
				})
			}

			if(company.units.length === 0) monthUnitsByCompany.splice(companyIndex, 1)
		})
	})

	const HTMLMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	res.render('month', { monthUnits: monthUnits, monthUnitsByCompany: monthUnitsByCompany, requestedYear: requestedYear, requestedMonth: requestedMonth, monthDays: monthDays, HTMLMonths: HTMLMonths, shop: shop})
});

router.post('/:year/:month', async (req, res) => {
	const year = Number(req.params.year);
	const month = req.params.month;
	let requestedMonthNumber: number;
	
	months.forEach((thisMonth, index) => {
		if(thisMonth === month) requestedMonthNumber = index;
	})

	const unitName = req.body.unitName.replace(/-/g, '/');
	const companyName = req.body.companyName;
	const inspection = req.body.inspection;
	const specification = req.body.specification
	const shop = req.body.shop

	const existingCustomUnit = await CustomUnit.findOne({name: unitName, company: companyName, inspection: inspection, year: year, month: requestedMonthNumber, specification: specification});
	
	if(!existingCustomUnit) {

		CustomUnit.create({
			unit: unitName,
			company: companyName,
			inspection: inspection,
			year: year,
			month: requestedMonthNumber,
			spec: specification,
			shop: shop
		})

	} else {
		console.error('Existing Custom Unit not found')
	}

	res.redirect(`/year/${year}/${month}/${shop}`)
});

router.put('/:year/:month/:shop/:company/:unit/:id', async (req, res) => {
	const year = Number(req.params.year);
	const month = req.params.month;
	const shop = req.params.shop;
	const company = req.params.company;
	const unit = req.params.unit;
	const id = req.params.id;
	
	console.log('Hiding Unit');
	console.log(year, month, shop, id);

	await HiddenUnit.create({
		year: year,
		month: month,
		shop: shop,
		company: company,
		unit: unit,
		id: id
	});
});

function buildMonth(month, year) {
	let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	let monthToReturn = [];

	let monthDays = new Date(year, month+1, 0).getDate();

	for(let i=0; i<monthDays; i++) {
		let newDay = {
			date: i + 1,
			day: days[new Date(year, month, i+1, 12).getDay()],
			offset: undefined
		};

		if(newDay.day === 'Sunday') {
			newDay.offset = 7;
		} else {
			newDay.offset = new Date(year, month, i+1, 12).getDay();
		}

		monthToReturn.push(newDay);
	}

	return monthToReturn;
}

function sortCompanies( a, b ) {
	if (a.company< b.company){
		return -1;
	}
	if (a.company> b.company){
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
