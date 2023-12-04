const express = require('express');
const router = express.Router();

const retrieveInformation = require('../middleware/retrieveInformation');

let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

let months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

let daysPerMonth = {
	January: 31,
	February: 28,
	March: 31,
	April: 30,
	May: 31,
	June: 30,
	July: 31,
	August: 31,
	September: 30,
	October: 31,
	November: 30,
	December: 31
};

router.get('/:year', (req, res) => {
	let yearToBuild = buildYear(req.params.year);
	let year = retrieveInformation(req.params.year);

	let info = {
		thisYear: req.params.year
	};
	
	res.render('year', { yearHeader: Number(req.params.year), yearToBuild: yearToBuild, year: year, info: info});
});

router.get('/:year/month/:month', (req, res) => {
	let reqMonth = req.params.month;
	let yearToBuild = buildYear(req.params.year);
	let year = retrieveInformation(req.params.year);
	let monthHTMLInfo = yearToBuild.months.find(thisMonth => thisMonth.month === reqMonth);
	let monthCustomerInfo = year.months.find(thisMonth => thisMonth.month === reqMonth);

	let info = {
		thisYear: req.params.year,
		thisMonth: req.params.month
	};
	
	res.render('month', { yearToBuild: yearToBuild, year: year, monthHTMLInfo: monthHTMLInfo, monthCustomerInfo: monthCustomerInfo, month: reqMonth, info: info});
});

router.get('/:year/month/:month/day/:day', (req, res) => {
	let reqYear = req.params.year;
	let reqMonth = req.params.month;
	let reqDay = req.params.day;

	let yearToBuild = buildYear(req.params.year);
	let monthHTMLInfo = yearToBuild.months.find(thisMonth => thisMonth.month === reqMonth);
	let dayHTMLInfo = monthHTMLInfo.days.find(thisDay => thisDay.date === Number(reqDay));

	
	let year = retrieveInformation(req.params.year);
	let monthCustomerInfo = year.months.find(thisMonth => thisMonth.month === reqMonth);

	let info = {
		thisYear: req.params.year,
		thisMonth: req.params.month,
		thisDay: req.params.day
	};
	
	res.render('day', {thisYear: reqYear, thisMonth: reqMonth, thisDay: reqDay, thisDate: dayHTMLInfo, monthCustomerInfo: monthCustomerInfo, info: info });

});


function buildYear(year) {
	let yearToReturn = {
		year: year,
		months: []
	};

	for(let month in months) {
		yearToReturn.months.push({
			month: months[month],
			days: buildMonth(month, year)
		});
	}

	return yearToReturn;
}

function buildMonth(month, year) {
	let monthToReturn = [];

	let monthDays = daysPerMonth[months[month]];
	for(let i=0; i<monthDays; i++) {
		let newDay = {
			date: i + 1,
			day: days[new Date(year, month, i+1, 12).getDay()],
			offset: undefined
		};

		if(newDay.day === 'Sunday') {
			newDay.offset = 7;
		} else {
			newDay.offset = new Date(year, month, i+1, 12).getDay();
		}

		monthToReturn.push(newDay);
	}

	return monthToReturn;
}

module.exports = router;