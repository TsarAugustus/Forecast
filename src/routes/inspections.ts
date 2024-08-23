const express = require('express');
const router = express.Router();

const sortMonthUnitsByCustomer = require('../controllers/sortMonthUnitsByCustomer')

const Units = require('../models/Unit');

router.get('/', async (req, res) => {
	const allUnits = await Units.find({});
	const sortedUnits = sortMonthUnitsByCustomer(allUnits);
	console.log(sortedUnits[0].units[0].inspections)
	res.render('inspections', {sortedUnits: sortedUnits})
});

module.exports = router;
export {};
