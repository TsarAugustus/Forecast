/* eslint-disable no-unused-vars */
function getSavedData(arg) {
	let confirmedSchedule;
	console.log('getSavedData');

	if(arg) {
		console.log('arg', arg);
		fetch('/savedData')
			.then(function(response) {
				return response.json();
			}).then(function(data) {
				// console.log('getSavedData(): Saved Data: ', data);
				return data.confirmedSchedule;
			});
	} else {
		fetch('/savedData')
			.then(function(response) {
				return response.json();
			}).then(function(data) {
				console.log('getSavedData(): Saved Data: ', data);
				writeSavedData(data.confirmedSchedule);
			});
	}

}

function writeSavedData(arr) {
	console.log('writeSavedData');
	arr.forEach(customer => {
		customer.units.forEach(unit => {
			unit.confirmedDates.forEach(date => {
				let elementFound = false;
				let elToReplace = document.getElementById(`${date.day}-${date.month}-${date.year}-${date.cell}`);

				if(elToReplace.innerHTML === ' ') {
					let sidebarCustomer = document.querySelectorAll(`[data-customer="${customer.name}"]`);
					updateSidebarCustomer(sidebarCustomer, unit);
					
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
				
				// This piece of loop would find any available cell and place the item there
				// It has been changed so there is a feeling of 'continuity'
				
				// let elementIteration = 0;
				// let newEl = document.createElement('div');
				// while(elementFound === false) {
				// 	let elToReplace = document.getElementById(`${date.day}-${date.month}-${date.year}-${elementIteration}`);

				// 	if(elToReplace === null) {
				// 		break;
				// 	}

				// 	if (elToReplace.innerHTML === ' '){
				// 		let sidebarCustomer = document.querySelectorAll(`[data-customer=${customer.name}]`);
				// 		updateSidebarCustomer(sidebarCustomer, unit);
						
				// 		elementFound = true;
						
				// 		elToReplace.classList.add(`CUSTOMER-${customer.name.replace(/\s+/g, '-').toUpperCase()}`);
				// 		let customerNameEl = document.createElement('p');
				// 		customerNameEl.innerHTML = customer.name;
				// 		elToReplace.appendChild(customerNameEl);

				// 		let unitNameEl = document.createElement('p');
				// 		unitNameEl.innerHTML = unit.name;
				// 		elToReplace.appendChild(unitNameEl);

				// 		let inspectionNameEl = document.createElement('p');
				// 		inspectionNameEl.innerHTML = unit.inspection;
				// 		elToReplace.appendChild(inspectionNameEl);

				// 		elToReplace.setAttribute('data-customer', customer.name);
				// 		elToReplace.setAttribute('data-unit', unit.name);
				// 	}

				// 	elementIteration++;
				// }
			});
		});
	});
}

function updateSidebarCustomer(sidebarCustomer, unit) {
	if(sidebarCustomer.length > 0) {
		for(let sidebarUnit of sidebarCustomer) {
			updateSidebarUnit(sidebarUnit, unit);
			
		}
	}
}

function updateSidebarUnit(sidebarUnit, unit) {
	if(sidebarUnit.dataset.unit === unit.name) {
		sidebarUnit.classList.add('confirmed');
	}
	for(let child of sidebarUnit.children) {
		if(child.classList.contains('status')) {
			child.innerHTML = '✔';
		}
	}
}