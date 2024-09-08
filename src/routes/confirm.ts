const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule');

router.post('/', async (req, res) => {
	const thisRequest = req.body;
	const thisUnit = thisRequest.unit;
	const schedule = thisRequest.schedule;
	const unitID = thisUnit.unitID;
	const thisShop = thisRequest.shop;

	console.log('SHOP', thisShop)

	let newSchedule = {
		unit: thisUnit.name,
		company: thisUnit.company,
		schedule: schedule,
		inspection: thisUnit.inspection,
		unitID: unitID,
		shop: thisShop
	};
	console.log('HERE 1', thisUnit.name, thisUnit.company, unitID, thisShop)
	const existingUnitSchedule = await Schedule.findOne({unit: thisUnit.name, company: thisUnit.company, shop: thisShop, inspection: thisUnit.inspection});
	console.log('HERE 2', existingUnitSchedule)
	if(existingUnitSchedule) {

		let scheduleMerge = existingUnitSchedule.schedule.concat(newSchedule.schedule);

		await Schedule.findOneAndUpdate(
			{unitID: existingUnitSchedule.unitID},
			{ $set: { schedule: scheduleMerge}}
		);

		// await Schedule.findOneAndUpdate(
		// 	{unit: thisUnit.name, company: thisUnit.company, shop: thisShop},
		// 	{ $set: { schedule: scheduleMerge }}
		// )

	} else {
		Schedule.create(newSchedule)
	}


	res.redirect('back')
});

module.exports = router;
export {};
