/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
let confirmButtons = document.getElementById('confirm');

function confirmButton() {
	confirmButtons.addEventListener('click', () => {
		if(selectedUnit !== undefined) {
			selectedDays.forEach(selection => {
				let idSplit = selection.id.split('-');
				let selectedDay = idSplit[0];
				let selectedMonth = idSplit[1];
				let selectedYear = idSplit[2];
				let selectedCell = idSplit[3];
				console.log('SELECTED UNIT: ', selectedUnit);
				let selectedCustomer = selectedUnit.dataset.customer;
				let selectedCustomerUnit = selectedUnit.dataset.unit;
				let selectedInspection = selectedUnit.dataset.inspection;

				if(!confirmedSchedule.find(thisCustomer => thisCustomer.name === selectedCustomer)) {
					confirmedSchedule.push({
						name: selectedCustomer,
						units: []
					});
				} else {
					console.log('CUSTOMER EXISTS IN CONFIRMED SCHEDULE');
				}

				let confirmedCustomer = confirmedSchedule.find(thisCustomer => thisCustomer.name === selectedCustomer);

				if(!confirmedCustomer.units.find(thisUnit => thisUnit.name === selectedCustomerUnit)) {
					confirmedCustomer.units.push({
						name: selectedCustomerUnit,
						inspection: selectedInspection,
						confirmedDates: []
					});
				} else {
					console.log('UNIT EXISTS IN CUSTOMER CONFIRMED SCHEDULE');
				}

				let confirmedUnit = confirmedCustomer.units.find(thisUnit => thisUnit.name === selectedCustomerUnit);

				confirmedUnit.confirmedDates.push({
					year: selectedYear,
					month: selectedMonth,
					day: selectedDay,
					cell: selectedCell,
					el: selection
				});

				
			});
			
			addUnitsToCells();

			console.log('POSTING');
			const xhr = new XMLHttpRequest();
			xhr.open('POST', '/confirm');
			xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
			const body = JSON.stringify({
				confirmedSchedule
			});

			xhr.send(body);
		}
		
	});

}

function addUnitsToCells() {
	selectedDays.forEach(item => {
		for(let itemClass of item.classList) {
			let splitItemClass = itemClass.split('-');
			if(splitItemClass[0] === 'CUSTOMER') {
				item.classList.remove(itemClass);
			}
		}

		let filledText = document.createElement('div');
		item.classList.add('CUSTOMER-' + selectedUnit.dataset.customer.replace(/\s+/g, '-').toUpperCase());

		let customerText = document.createElement('p');
		customerText.innerHTML = selectedUnit.dataset.customer;
		filledText.appendChild(customerText);

		for(let child of selectedUnit.children) {
			if(!child.classList.contains('status')) {
				let thisEl = document.createElement('p');
				thisEl.innerHTML = child.innerHTML;
				filledText.appendChild(thisEl);
			}

			item.innerHTML = filledText.innerHTML;

		}
	});

	// HTML Styling

	let toggled = document.querySelectorAll('.toggle');

	for(let item of toggled) {
		item.classList.remove('toggle');
	}

	selectedUnit.classList.remove('unitToggle');
	selectedUnit.classList.add('confirmed');

	for(let child of selectedUnit.children) {
		if(child.classList.contains('status')) {
			child.innerHTML = '✔';
		}
	}
	selectedUnit = undefined;
	selectedDays = [];
}

// function OLDconfirmButton() {
// 	confirmButtons.addEventListener('click', (e) => {
// 		let toggled = document.querySelectorAll('.toggle');
		
// 		if(selectedUnit) {
// 			selectedDays.forEach(selection => {
// 				let idSplit = selection.id.split('-');
// 				let selectedDay = idSplit[0];
// 				let selectedMonth = idSplit[1];
// 				let selectedYear = idSplit[2];
// 				let selectedCell = idSplit[3];

// 				if((selection.innerHTML !== ' ')) {
// 					console.error('Selection innerHTML not empty');
// 				}

// 				let selectedCustomer = selectedUnit.dataset.customer;
// 				let selectedCustomerUnit = selectedUnit.dataset.unit;
// 				let selectedInspection = selectedUnit.dataset.inspection;

				
// 				if(!confirmedSchedule.find(thisCustomer => thisCustomer.name === selectedCustomer)) {
// 					confirmedSchedule.push({
// 						name: selectedCustomer,
// 						units: []
// 					});
// 				}
				
// 				let confirmedCustomer = confirmedSchedule.find(thisCustomer => thisCustomer.name === selectedCustomer);

// 				if(!confirmedCustomer.units.find(thisUnit => thisUnit.name === selectedCustomerUnit)) {
// 					confirmedCustomer.units.push({
// 						name: selectedCustomerUnit,
// 						inspection: selectedInspection,
// 						confirmedDates: []
// 					});
// 				}

// 				let confirmedUnit = confirmedCustomer.units.find(thisUnit => thisUnit.name === selectedCustomerUnit);

// 				confirmedUnit.confirmedDates.push({
// 					year: selectedYear,
// 					month: selectedMonth,
// 					day: selectedDay,
// 					cell: selectedCell,
// 					el: selection
// 				});
// 			});

// 			selectedDays.forEach(item => {
// 				for(let itemClass of item.classList) {
// 					let splitItemClass = itemClass.split('-');
// 					if(splitItemClass[0] === 'CUSTOMER') {
// 						item.classList.remove(itemClass);
// 					}
// 				}

// 				let filledText = document.createElement('div');
// 				item.classList.add('CUSTOMER-' + selectedUnit.dataset.customer.replace(/\s+/g, '-').toUpperCase());

// 				let customerText = document.createElement('p');
// 				customerText.innerHTML = selectedUnit.dataset.customer;
// 				filledText.appendChild(customerText);

// 				for(let child of selectedUnit.children) {
// 					if(!child.classList.contains('status')) {
// 						let thisEl = document.createElement('p');
// 						thisEl.innerHTML = child.innerHTML;
// 						filledText.appendChild(thisEl);
// 					}

// 					item.innerHTML = filledText.innerHTML;

// 				}
// 			});

// 			for(let item of toggled) {
// 				item.classList.remove('toggle');
// 			}

// 			selectedUnit.classList.remove('unitToggle');
// 			selectedUnit.classList.add('confirmed');

// 			for(let child of selectedUnit.children) {
// 				if(child.classList.contains('status')) {
// 					child.innerHTML = '✔';
// 				}
// 			}
// 			selectedUnit = undefined;
// 			selectedDays = [];

// 			sendDatatoServer(confirmedSchedule);
			
// 		} else {
// 			selectedDays.forEach(item => {
// 				item.innerHTML = placeholderText;
// 			});
// 		}
		
// 	});
// }


// function sendDatatoServer(confirmedSchedule) {
// 	let localServer = '127.0.0.1:3000';

// 	const xhr = new XMLHttpRequest();
// 	xhr.open('POST', '/confirm');
// 	xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
// 	const body = JSON.stringify({
// 		confirmedSchedule
// 	});

// 	xhr.send(body);
// }