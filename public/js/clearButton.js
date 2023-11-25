let clearUnitButtons = document.querySelectorAll('.clearUnit');

function clearButton() {
	for(let button of clearUnitButtons) {
		button.addEventListener('click', (e) => {
			let unitEl;
	
			for(let item of button.parentElement.children) {
				if(item.classList.contains('calendarUnit')) {
					unitEl = item;
				}
			}
	
			let thisCustomer = unitEl.dataset.customer;
			let thisUnit = unitEl.dataset.unit;
			let thisInspection = unitEl.dataset.inspection;
	
			confirmedSchedule.forEach(customer => {
				customer.units.forEach(unit => {
					unit.confirmedDates.forEach(date => {
						// console.log(thisUnit, unit.name)
						if(thisUnit === unit.name) {
							date.el.innerHTML = '';
						}
					})
				})
	
				customer.units = customer.units.filter(item => item.name !== thisUnit);
			})
			
			unitEl.classList.remove('unitToggle');
			unitEl.classList.remove('confirmed');
		})
	}
}