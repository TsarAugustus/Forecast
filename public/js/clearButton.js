/* eslint-disable max-depth */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
let clearUnitButtons = document.querySelectorAll('.clearUnit');

function clearButton(arg) {
	if(arg) {
		arg.addEventListener('click', () => {
			let unitEl;

			for(let item of arg.parentElement.children) {
				if(item.classList.contains('calendarUnit')) {
					unitEl = item;
				}
			}

			let thisCustomer = unitEl.dataset.customer;
			let thisUnit = unitEl.dataset.unit;

			let item = {
				customer: thisCustomer,
				unit: thisUnit,
				custom: true
			};

			const xhr = new XMLHttpRequest();
			xhr.open('POST', '/clear');
			xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
			const body = JSON.stringify(item);

			xhr.send(body);

			location.reload();
		});
	}

	clearUnitButtons.forEach(button => {
		button.addEventListener('click', () => {
			let unitEl;

			for(let item of button.parentElement.children) {
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
	});
}