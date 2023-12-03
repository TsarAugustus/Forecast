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

app.get('/savedData', (req, res) => {
	let writePath = path.join(__dirname + '/uploads/schedule.json');
	let savedDates;

	fs.readFile(writePath, (err, data) => {
		if(err) console.error(err);
		savedDates = JSON.parse(data);
		console.log('APP SAVED DATA', savedDates);
		res.send(savedDates);
	});
});

app.listen(port, () => {
	// console.log(app._router.stack);
	console.log(`Example app listening on port ${port}`);
});