"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
const path = require('path');
const port = 8080;
const mongoose_1 = __importDefault(require("mongoose"));
//May not be required?
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
require('dotenv').config();
const init = require('./controllers/init');
const URI = process.env.DEVELOPMENT_URI;
(async function () {
    await mongoose_1.default.connect(URI).then(() => console.log('MongoDB Connection')).catch((error) => console.error(error));
    init();
})();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
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
app.get('/current/:shop', (req, res) => {
    const thisShop = req.params.shop;
    const newDate = new Date();
    const thisYear = newDate.getFullYear();
    const thisMonth = newDate.getMonth();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    res.redirect(`/year/${thisYear}/${months[thisMonth]}/${thisShop}`);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
