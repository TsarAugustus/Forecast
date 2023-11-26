/* eslint-disable no-unused-vars */
function getSavedData() {
	let confirmedSchedule;
	fetch('/savedData')
		.then(function(response) {
			return response.json();
		}).then(function(data) {
			writeSavedData(data.confirmedSchedule);
		});
}

function writeSavedData(arr) {
	arr.forEach(customer => {
		customer.units.forEach(unit => {
			unit.confirmedDates.forEach(date => {
				let elementFound = false;
				let elementIteration = 0;
				let newEl = document.createElement('div');
				while(elementFound === false) {
					let elToReplace = document.getElementById(`${date.day}-${date.month}-${date.year}-${elementIteration}`);
					if (elToReplace.innerHTML === ' '){
						elementFound = true;
						
						elToReplace.classList.add(`CUSTOMER-${customer.name.replace(/\s+/g, '-').toUpperCase()}`);
						let customerNameEl = document.createElement('p');
						customerNameEl.innerHTML = customer.name;
						elToReplace.appendChild(customerNameEl);

						let unitNameEl = document.createElement('p');
						unitNameEl.innerHTML = unit.name;
						elToReplace.appendChild(unitNameEl);

						let inspectionNameEl = document.createElement('p');
						inspectionNameEl.innerHTML = unit.inspection;
						elToReplace.appendChild(inspectionNameEl);

						elToReplace.setAttribute('data-customer', customer.name);
						elToReplace.setAttribute('data-unit', unit.name);
					}

					elementIteration++;
				}
			});
		});
	});
}