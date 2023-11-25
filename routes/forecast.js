const express = require('express');
const router = express.Router();

const retrieveInformation = require('../middleware/retrieveInformation');

router.get('/', (req, res) => {
	let calendar = retrieveInformation();
	
	res.render('forecast', { title: 'Forecast', calendar: calendar} );
});

module.exports = router;