/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
let clearUnitButtons = document.querySelectorAll('.clearUnit');

function clearButton() {	
	for(let button of clearUnitButtons) {
		button.addEventListener('click', () => {
			if(confirmedSchedule && confirmedSchedule.length === 0) {
				fetch('/savedData')
					.then(function(response) {
						return response.json();
					}).then(function(data) {
						let unitEl;

						for(let item of button.parentElement.children) {
							if(item.classList.contains('calendarUnit')) {
								unitEl = item;
							}
						}
			
						let thisCustomer = unitEl.dataset.customer;
						let thisUnit = unitEl.dataset.unit;
						// let thisInspection = unitEl.dataset.inspection;

						data.confirmedSchedule.forEach(customer => {
							customer.units.forEach(unit => {
								if(thisUnit === unit.name) {
									unit.confirmedDates.forEach(date => {		
										let elementFound = false;
										let elementIteration = 0;
										while(elementFound === false) {
											let elToReplace = document.getElementById(`${date.day}-${date.month}-${date.year}-${elementIteration}`);
											if(elToReplace !== null) {
												let splitEl = elToReplace.id.split('-');
												let day = splitEl[0];
												let month = splitEl[1];
												let year = splitEl[2];
												let dateEval = (date.day === day && date.month === month && date.year === year);
												let customerEval = (customer.name === elToReplace.dataset.customer);
												let unitEval = (unit.name === elToReplace.dataset.unit);
												if(dateEval && customerEval && unitEval) {
													elementFound = true;
													elToReplace.innerHTML = ' ';
													elToReplace.classList.remove('CUSTOMER-' + thisCustomer.replace(/\s+/g, '-').toUpperCase());

													customer.units = customer.units.filter(item => item.name !== thisUnit);
							
													let customerSchedule = data.confirmedSchedule.find(item => item.name === thisCustomer);

													if(customerSchedule && customerSchedule.units.length === 0) {
														data.confirmedSchedule = data.confirmedSchedule.filter(item => item.name !== thisCustomer);
													}
												}

												elementIteration++;
											} else {
												break;
											}
										
										}		
									});


								}
							});

						});
					
						unitEl.classList.remove('unitToggle');
						unitEl.classList.remove('confirmed');
					
						sendDatatoServer(data.confirmedSchedule);
					});
			} else {
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
								date.el.classList.remove('CUSTOMER-' + thisCustomer.replace(/\s+/g, '-').toUpperCase());
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
			}
		});
	}

}