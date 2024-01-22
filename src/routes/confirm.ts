const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule');

router.post('/', async (req, res) => {
	const thisRequest = req.body;
	const thisUnit = thisRequest.unit;
	const schedule = thisRequest.schedule;
	const unitID = thisUnit.unitID;

	let newSchedule = {
		unit: thisUnit.name,
		company: thisUnit.company,
		schedule: schedule,
		inspection: thisUnit.inspection,
		unitID: unitID
	};

	const existingUnitSchedule = await Schedule.findOne({unit: thisUnit.name, company: thisUnit.company, unitID: unitID})

	if(existingUnitSchedule) {

		let scheduleMerge = existingUnitSchedule.schedule.concat(newSchedule.schedule);

		await Schedule.findOneAndUpdate(
			{unit: thisUnit.name, company: thisUnit.company, unitID: unitID},
			{ $set: { schedule: scheduleMerge }}
		)

	} else {
		Schedule.create(newSchedule)
	}


	res.redirect('back')
});

module.exports = router;
export {};
