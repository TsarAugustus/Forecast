const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

const pug = require('pug');
app.set('view engine', 'pug')

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
	console.log('home')
	res.render('index');
  	// res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});