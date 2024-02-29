const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule');

router.post('/', async (req, res) => {
	const thisRequest = req.body;
	const thisUnit = thisRequest.unit;
	const schedule = thisRequest.schedule;
	const unitID = thisUnit.unitID;
	const thisShop = thisRequest.shop;

	console.log(thisShop)

	let newSchedule = {
		unit: thisUnit.name,
		company: thisUnit.company,
		schedule: schedule,
		inspection: thisUnit.inspection,
		unitID: unitID,
		shop: thisShop
	};

	const existingUnitSchedule = await Schedule.findOne({unit: thisUnit.name, company: thisUnit.company, unitID: unitID, shop: thisShop})
	if(existingUnitSchedule) {

		let scheduleMerge = existingUnitSchedule.schedule.concat(newSchedule.schedule);

		await Schedule.findOneAndUpdate(
			{unit: thisUnit.name, company: thisUnit.company, unitID: unitID, shop: thisShop},
			{ $set: { schedule: scheduleMerge }}
		)

	} else {
		Schedule.create(newSchedule)
	}


	res.redirect('back')
});

module.exports = router;
export {};
