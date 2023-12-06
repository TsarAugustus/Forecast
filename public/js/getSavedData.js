/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
function getSavedData(arg) {
	if(arg) {
		fetch('/savedData')
			.then(function(response) {
				return response.json();
			}).then(function(data) {
				return data.confirmedSchedule;
			});
	} else {
		fetch('/savedData')
			.then(function(response) {
				return response.json();
			}).then(function(data) {
				writeSavedData(data.confirmedSchedule);
			});
	}

}

function writeSavedData(arr) {
	arr.forEach(customer => {
		customer.units.forEach(unit => {
			if(!unit.customValue) unit.customValue = customer.customValue;

			if(unit.customValue) {
				let sidebarDiv = document.getElementById(`Sidebar-${unit.customValue.month}-${unit.customValue.year}`);
				let found = false;
				if(sidebarDiv) {
					sidebarDiv.childNodes.forEach((child, childIndex) => {

						if(child.classList.contains(customer.name)) {
							let newSidebarItemWrapper = document.createElement('div');
							newSidebarItemWrapper.classList.add('calendarUnitWrapper');
	
							let newSidebarItemWrapperDiv = document.createElement('div');
							newSidebarItemWrapperDiv.classList.add(`CUSTOMER-${customer.name.toUpperCase()}`);
							newSidebarItemWrapperDiv.classList.add('calendarUnit');
							newSidebarItemWrapperDiv.setAttribute('data-customer', customer.name);
							newSidebarItemWrapperDiv.setAttribute('data-unit', unit.name);
							newSidebarItemWrapperDiv.setAttribute('data-inspection', unit.inspection);
	
							newSidebarItemWrapper.appendChild(newSidebarItemWrapperDiv);
	
							let statusEl = document.createElement('p');
							statusEl.innerHTML = '🗙';
							statusEl.classList.add('status');
							newSidebarItemWrapperDiv.appendChild(statusEl);
	
							let unitEl = document.createElement('p');
							unitEl.innerHTML = unit.name;
							newSidebarItemWrapperDiv.appendChild(unitEl);
	
							let inspectionEl = document.createElement('p');
							inspectionEl.innerHTML = unit.inspection;
	
							newSidebarItemWrapperDiv.appendChild(inspectionEl);
	
							let thisClearButton = document.createElement('button');
							thisClearButton.innerHTML = 'Clear';
							thisClearButton.classList.add('clearUnit');
	
							clearButton(thisClearButton);
							unitScript(newSidebarItemWrapperDiv);
	
							let thisDeleteButton = document.createElement('button');
							thisDeleteButton.innerHTML = 'Delete Custom Item';
							thisDeleteButton.addEventListener('click', () => {
								let unitEl;
	
								for(let item of thisDeleteButton.parentElement.children) {
									if(item.classList.contains('calendarUnit')) {
										unitEl = item;
									}
								}
	
								let thisCustomer = unitEl.dataset.customer;
								let thisUnit = unitEl.dataset.unit;
	
								let item = {
									customer: thisCustomer,
									unit: thisUnit
								};
	
								const xhr = new XMLHttpRequest();
								xhr.open('POST', '/clear');
								xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
								const body = JSON.stringify(item);
	
								xhr.send(body);
	
								location.reload();
							});
	
							newSidebarItemWrapper.appendChild(thisClearButton);
							newSidebarItemWrapper.appendChild(thisDeleteButton);
	
							child.childNodes.forEach(thisChild => {
								if(thisChild.classList.contains('units')) {
									thisChild.appendChild(newSidebarItemWrapper);
								}
							});
	
							found = true;
					
						} else if(childIndex === sidebarDiv.childNodes.length - 1 && found === false){
							sidebarDiv.childNodes.forEach(thisChild => {
								if(thisChild.classList.contains('createdItems')) {
									//FIX THIS MESS
	
									let newSidebarItemWrapper = document.createElement('div');
									newSidebarItemWrapper.classList.add('calendarUnitWrapper');
	
									let newSidebarItemWrapperDiv = document.createElement('div');
									newSidebarItemWrapperDiv.classList.add(`CUSTOMER-${customer.name.toUpperCase()}`);
									newSidebarItemWrapperDiv.classList.add('calendarUnit');
									newSidebarItemWrapperDiv.setAttribute('data-customer', customer.name);
									newSidebarItemWrapperDiv.setAttribute('data-unit', unit.name);
									newSidebarItemWrapperDiv.setAttribute('data-inspection', unit.inspection);
	
									newSidebarItemWrapper.appendChild(newSidebarItemWrapperDiv);
	
									let statusEl = document.createElement('p');
									statusEl.innerHTML = '🗙';
									statusEl.classList.add('status');
									newSidebarItemWrapperDiv.appendChild(statusEl);
	
									let unitEl = document.createElement('p');
									unitEl.innerHTML = unit.name;
									newSidebarItemWrapperDiv.appendChild(unitEl);
	
									let inspectionEl = document.createElement('p');
									inspectionEl.innerHTML = unit.inspection;
	
									newSidebarItemWrapperDiv.appendChild(inspectionEl);
	
									let thisClearButton = document.createElement('button');
									thisClearButton.innerHTML = 'Clear';
									thisClearButton.classList.add('clearUnit');
	
									clearButton(thisClearButton);
									unitScript(newSidebarItemWrapperDiv);
	
									let thisDeleteButton = document.createElement('button');
									thisDeleteButton.innerHTML = 'Delete Custom Item';
									thisDeleteButton.addEventListener('click', () => {
										let unitEl;
	
										for(let item of thisDeleteButton.parentElement.children) {
											if(item.classList.contains('calendarUnit')) {
												unitEl = item;
											}
										}
	
										let thisCustomer = unitEl.dataset.customer;
										let thisUnit = unitEl.dataset.unit;
	
										let item = {
											customer: thisCustomer,
											unit: thisUnit
										};
	
										const xhr = new XMLHttpRequest();
										xhr.open('POST', '/clear');
										xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
										const body = JSON.stringify(item);
	
										xhr.send(body);
	
										location.reload();
									});
	
									newSidebarItemWrapper.appendChild(thisClearButton);
									newSidebarItemWrapper.appendChild(thisDeleteButton);
	
									
	
									let customDiv;
									for(let node of thisChild.childNodes) {
										// eslint-disable-next-line max-depth
										if(node.classList.contains(customer.name)) {
											customDiv = node;
										}
									}
									
									if(!customDiv) {
										customDiv = document.createElement('div');
										customDiv.classList.add(customer.name);
										customDiv.classList.add('customerSidebar');
	
										let customDivHeader = document.createElement('p');
										customDivHeader.innerHTML = customer.name;
										customDivHeader.classList.add('customerName');
										customDiv.appendChild(customDivHeader);
									}
									
									customDiv.appendChild(newSidebarItemWrapper);
	
									thisChild.appendChild(customDiv);
	
									console.log(thisChild);
								}
							});
						}
					});
				}
				
			}

			unit.confirmedDates.forEach(date => {
				let elementFound = false;
				let elToReplace = document.getElementById(`${date.day}-${date.month}-${date.year}-${date.cell}`);
				
				if(elToReplace && elToReplace.innerHTML === ' ') {
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
	if(sidebarUnit.dataset.unit === unit.name && sidebarUnit.classList.contains('selector') === false) {
		sidebarUnit.classList.add('confirmed');
	}
	for(let child of sidebarUnit.children) {
		if(child.classList.contains('status') && sidebarUnit.dataset.unit === unit.name) {
			child.innerHTML = '✔';
		}
	}
}