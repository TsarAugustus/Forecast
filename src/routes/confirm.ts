const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule');

router.post('/', async (req, res) => {
	const thisRequest = req.body;
	const thisUnit = thisRequest.unit;
	const schedule = thisRequest.schedule;
	const unitID = thisUnit.unitID;
	// const inspection = thisRequest.

	// unit: String,
	// company: String,
	// schedule: [{
	// 	day: Number,
	// 	month: Number,
	// 	year: Number,
	// 	cell: Number
	// }]
	// console.log(thisRequest)
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
		// console.log(existingUnitSchedule[0])

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
