/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();

const path = require('path');
const fs = require('fs');

router.post('/', (req, res) => {
	let upload = JSON.stringify(req.body);
	let writePath = path.join(__dirname + '/../uploads/schedule.json');

	fs.writeFile(writePath, upload, (err) => {
		if(err) console.error(err);

		console.log('Schedule Changed');
	});
});

module.exports = router;