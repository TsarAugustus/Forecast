/* eslint-disable no-undef */
let clearUnitButtons = document.querySelectorAll('.clearUnit');

function clearButton() {
	for(let button of clearUnitButtons) {
		button.addEventListener('click', () => {
			let unitEl;
	
			for(let item of button.parentElement.children) {
				if(item.classList.contains('calendarUnit')) {
					unitEl = item;
				}
			}
	
			let thisCustomer = unitEl.dataset.customer;
			let thisUnit = unitEl.dataset.unit;
			// let thisInspection = unitEl.dataset.inspection;
	
			confirmedSchedule.forEach(customer => {
				customer.units.forEach(unit => {
					if(thisUnit === unit.name) {
						unit.confirmedDates.forEach(date => {						
							date.el.innerHTML = ' ';
							date.el.classList.remove('CUSTOMER-' + thisCustomer.toUpperCase());
						});


					}
				});

				customer.units = customer.units.filter(item => item.name !== thisUnit);
				
				let customerSchedule = confirmedSchedule.find(item => item.name === thisCustomer);
				
				if(customerSchedule && customerSchedule.units.length === 0) {
					confirmedSchedule = confirmedSchedule.filter(item => item.name !== thisCustomer);
				}

			});
			
			unitEl.classList.remove('unitToggle');
			unitEl.classList.remove('confirmed');
			
			sendDatatoServer(confirmedSchedule);
		});
	}

}

clearButton();