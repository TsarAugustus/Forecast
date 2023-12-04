let createButton = document.querySelectorAll('.create');

// eslint-disable-next-line no-unused-vars
function create() {
	for(let button of createButton) {
		button.addEventListener('click', () => {
			let parentEl = button.parentElement;
			
			let customDiv = document.getElementById('custom');

			let buttonYear = button.dataset.year;
			let buttonMonth = button.dataset.month;

			if(!customDiv) {
				let newEl = document.createElement('div');
				newEl.id = 'custom';

				let titleEl = document.createElement('input');
				titleEl.placeholder = 'Company/Title';
				newEl.appendChild(titleEl);

				let infoEl = document.createElement('input');
				infoEl.placeholder = 'Unit/Info';
				newEl.appendChild(infoEl);

				let otherEl = document.createElement('input');
				otherEl.placeholder = 'Inspection/Other';
				newEl.appendChild(otherEl);

				let submitEl = document.createElement('button');
				submitEl.innerHTML = 'Submit';
				newEl.appendChild(submitEl);

				submitEl.addEventListener('click', () => {
					let titleValue = titleEl.value;
					let infoValue = infoEl.value;
					let otherValue = otherEl.value;

					let customItem = {
						title: titleValue,
						info: infoValue,
						other: otherValue,
						customValue: {
							year: buttonYear,
							month: buttonMonth
						},
						custom: true,
						confirmedDates: []
					};

					const xhr = new XMLHttpRequest();
					xhr.open('POST', '/create');
					xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
					const body = JSON.stringify(customItem);
					
					xhr.send(body);
					location.reload();
				});

				newEl.appendChild(titleEl);

				parentEl.appendChild(newEl);
			}
		});
	}
}