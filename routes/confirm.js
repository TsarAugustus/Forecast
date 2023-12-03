/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();

const path = require('path');
const fs = require('fs');

router.post('/', (req, res) => {
	let writePath = path.join(__dirname + '/../uploads/schedule.json');
	fs.readFile(writePath, (err, data) => {
		if(err) console.error(err);

		let newItem = req.body.confirmedSchedule[0];
		

		let previousSchedule = JSON.parse(data);
		let previousCustomer = previousSchedule.confirmedSchedule.find(customer => customer.name === newItem.name);

		if(!previousCustomer) {
			previousSchedule.confirmedSchedule.push(newItem);
		} else {
			let thisUnit = newItem.units[0];
			let previousUnit = previousCustomer.units.find(unit => unit.name === thisUnit.name);

			if(!previousUnit) {
				previousCustomer.units.push(thisUnit);
			} else {
				console.log(thisUnit.confirmedDates.length, thisUnit.confirmedDates);
				thisUnit.confirmedDates.forEach(date => {
					previousUnit.confirmedDates.push(date);
				});
			}
			// console.log('unit', previousUnit, thisUnit)
			// console.log('here', previousCustomer)
			// console.log('CUSTOMER EXISTS');
		}

		fs.writeFile(writePath, JSON.stringify(previousSchedule), (err) => {
			if(err) console.error(err);

			console.log('Schedule Changed');
		});
	});

	// fs.writeFile(writePath, upload, (err) => {
	// 	if(err) console.error(err);

	// 	console.log('Schedule Changed');
	// });
});

module.exports = router;