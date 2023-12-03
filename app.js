/* eslint-disable no-unused-vars */
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

const pug = require('pug');
app.set('view engine', 'pug');

const year = require('./routes/year');
app.use('/year', year);

const forecast = require('./routes/forecast');
app.use('/forecast', forecast);

const file = require('./routes/file');
app.use('/file', file);

const calendar = require('./routes/calendar');
app.use('/calendar', calendar);

const confirm = require('./routes/confirm');
app.use('/confirm', confirm);

const audit = require('./routes/audit');
app.use('/audit', audit);

app.get('/', (req, res) => {
	res.render('index');
});

let fs = require('fs');
let writePath = path.join(__dirname + '/uploads/schedule.json');

app.get('/savedData', (req, res) => {
	let savedDates;

	fs.readFile(writePath, (err, data) => {
		if(err) console.error(err);

		savedDates = JSON.parse(data);
		res.send(savedDates);
	});
});

app.post('/clear', (req, res) => {
	fs.readFile(writePath, (err, data) => {
		if(err) console.error(err);

		let customer = req.body.customer;
		let unit = req.body.unit;

		let savedSchedule = JSON.parse(data);

		savedSchedule.confirmedSchedule.forEach((thisCustomer, customerIndex) => {
			if(thisCustomer.name === customer) {
				thisCustomer.units.forEach((thisUnit, unitIndex) => {
					if(thisUnit.name === unit) {
						thisCustomer.units.splice(unitIndex, 1);
					}
				});
			}
			
			if(thisCustomer.units.length === 0) {
				savedSchedule.confirmedSchedule.splice(customerIndex, 1);
			}
		});

		fs.writeFile(writePath, JSON.stringify(savedSchedule), (err) => {
			if(err) console.error(err);

			console.log('Schedule Changed');
		});

	});

});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});