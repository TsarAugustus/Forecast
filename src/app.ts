const express = require('express');
const app = express();
const path = require('path');
const port = 8080;

import mongoose from 'mongoose';

//May not be required?
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json())

const Company = require('./models/Company') //depreciated?

require('dotenv').config();

const init = require('./controllers/init');

const URI = process.env.DEVELOPMENT_URI;

(async function () {
	await mongoose.connect(URI).then(() => console.log('MongoDB Connection')).catch((error) => console.error(error));
	init();	
})();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'))
const pug = require('pug');
app.set('view engine', 'pug');

const year = require('./routes/year');
app.use('/year', year);

const api = require('./routes/api');
app.use('/api', api);

const confirm = require('./routes/confirm');
app.use('/confirm', confirm);

const matrix = require('./routes/matrix');
app.use('/matrix', matrix);

const index = require('./routes/index');
app.use('/', index);

const file = require('./routes/file');
app.use('/file', file);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
