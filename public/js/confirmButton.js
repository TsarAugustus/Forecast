let confirmButtons = document.getElementById('confirm');

function confirmButton() {
	confirmButtons.addEventListener('click', (e) => {
		let toggled = document.querySelectorAll('.toggle');
		
		if(selectedUnit) {
			selectedDays.forEach(selection => {
				let idSplit = selection.id.split('-');
				let selectedDay = idSplit[0];
				let selectedMonth = idSplit[1];
				let selectedYear = idSplit[2];
				let selectedCell = idSplit[3];

				if((selection.innerHTML !== ' ')) {
					console.log('SUM TING WONG')
				}

				let selectedCustomer = selectedUnit.dataset.customer;
				let selectedCustomerUnit = selectedUnit.dataset.unit;
				let selectedInspection = selectedUnit.dataset.inspection;

				
				if(!confirmedSchedule.find(thisCustomer => thisCustomer.name === selectedCustomer)) {
					confirmedSchedule.push({
						name: selectedCustomer,
						units: []
					})
				}
				
				let confirmedCustomer = confirmedSchedule.find(thisCustomer => thisCustomer.name === selectedCustomer);

				if(!confirmedCustomer.units.find(thisUnit => thisUnit.name === selectedCustomerUnit)) {
					confirmedCustomer.units.push({
						name: selectedCustomerUnit,
						inspection: selectedInspection,
						confirmedDates: []
					})
				}

				let confirmedUnit = confirmedCustomer.units.find(thisUnit => thisUnit.name === selectedCustomerUnit);

				confirmedUnit.confirmedDates.push({
					year: selectedYear,
					month: selectedMonth,
					day: selectedDay,
					el: selection
				});
			})

			selectedDays.forEach(item => {
				
				for(let itemClass of item.classList) {
					let splitItemClass = itemClass.split('-');
					if(splitItemClass[0] === 'CUSTOMER') {
						item.classList.remove(itemClass)
					}
				}

				let filledText = document.createElement('div');
				item.classList.add('CUSTOMER-' + selectedUnit.dataset.customer.toUpperCase());

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
			})

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

			sendDatatoServer(confirmedSchedule);
			
		} else {
			selectedDays.forEach(item => {
				item.innerHTML = placeholderText;
			})
		}

	});
}