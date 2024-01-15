async function getSchedule() {
	const months = [
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

	const thisSplit = window.location.href.split('/');
	const thisYear = thisSplit[4];
	const thisMonth = thisSplit[5];

	let thisSchedule = await fetch(`/year/req/${thisYear}/${thisMonth}`).then(data => {
		return data.json();
	});

	thisSchedule.forEach(scheduleItem => {
		scheduleItem.schedule.forEach(thisItem => {
			// console.log(thisItem)
			let thisItemElement = document.getElementById(`${thisItem.day}-${months[thisItem.month]}-${thisItem.year}-${thisItem.cell}`);

			thisItemElement.classList.add(scheduleItem.company.replace(/\s+/g, '-'))

			// thisItemElement.innerHTML = `${scheduleItem.company}-${scheduleItem.unit}`;
			let selectorInformation = document.createElement('div');
			selectorInformation.classList.add('scheduledItem')

			let unitInformation = document.createElement('span');
			unitInformation.innerHTML = `${scheduleItem.unit}`;
			selectorInformation.appendChild(unitInformation);

			let customerInformation = document.createElement('span');
			customerInformation.innerHTML = `${scheduleItem.company}`;
			selectorInformation.appendChild(customerInformation);

			let inspectionInformation = document.createElement('span');
			inspectionInformation.innerHTML = `${scheduleItem.inspection}`;
			selectorInformation.appendChild(inspectionInformation);
			
			thisItemElement.appendChild(selectorInformation)

			let clearDay = document.createElement('button');
			clearDay.classList.add('clearButton');
			// clearDay.innerHTML = 'X';
			clearDay.addEventListener('click', () => {
				fetch(`/year/req/${thisItem.year}/${months[thisItem.month]}/${thisItem.day}/${thisItem.cell}/${scheduleItem.unit.replace(/\//g, '-')}/${scheduleItem.company}`, {method: 'PUT'})

				location.reload();
			})

			thisItemElement.appendChild(clearDay)
		})
	})

	// let thisMonth;
	// months.find((month, monthIndex) => {
	// 	if(month === thisSplit[5]) thisMonth = monthIndex;
	// })

	
}

getSchedule();
