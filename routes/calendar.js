const express = require('express');
const router = express.Router();

const retrieveInformation = require('../middleware/retrieveInformation');

router.get('/', (req, res) => {
	let calendar = retrieveInformation();
	
	res.render('calendar', { title: 'Calendar', calendar: calendar,	 testData: calendar[0].months[0].customers});
});

module.exports = router;