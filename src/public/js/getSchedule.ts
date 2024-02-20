async function getSchedule() {

	const thisSplit = window.location.href.split('/');
	const thisYear = thisSplit[4];
	const thisMonth = thisSplit[5];

	let thisSchedule = await fetch(`/year/req/${thisYear}/${thisMonth}`).then(data => {
		return data.json();
	});

	thisSchedule.forEach(scheduleItem => {
		scheduleItem.schedule.forEach(thisItem => {
			let thisItemElement = document.getElementById(`${thisItem.day}-${months[thisItem.month]}-${thisItem.year}-${thisItem.cell}`);

			if(thisItemElement) {
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
					if(confirm('Are you sure you want to remove this unit from the schedule?')) {
						fetch(`/year/req/${thisItem.year}/${months[thisItem.month]}/${thisItem.day}/${thisItem.cell}/${scheduleItem.unit.replace(/\//g, '-')}/${scheduleItem.company}`, {method: 'PUT'})
					} else {
						console.log('no confirm')
					}

					location.reload();
				})

				// let missedUnit = document.createElement('button');
				// missedUnit.classList.add('missedButton');
				// missedUnit.addEventListener('click', () => {
				// 	const unitID = thisItem.unitID;
				// 	fetch(`/year/missed/${thisItem.year}/${months[thisItem.month]}/${thisItem.day}/${thisItem.cell}/${scheduleItem.unit.replace(/\//g, '-')}/${scheduleItem.company}/${unitID}`, {method: 'PUT'})

				// 	location.reload();
				// });

				// if(thisItem.missed) {
				// 	thisItemElement.classList.add('missedUnit')
				// }

				thisItemElement.appendChild(clearDay);
				// thisItemElement.appendChild(missedUnit)
			}
			
		})
	})

	// let thisMonth;
	// months.find((month, monthIndex) => {
	// 	if(month === thisSplit[5]) thisMonth = monthIndex;
	// })

	
}

getSchedule();
