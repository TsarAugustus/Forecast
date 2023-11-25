/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
function unitScript() {
	let units = document.querySelectorAll('.calendarUnit');

	for(let unit of units) {
		unit.addEventListener('click', (e) => {
			unit.classList.toggle('unitToggle');
			if(selectedUnit) {
				selectedUnit.classList.remove('unitToggle');
			}
			if(unit.classList.contains('unitToggle')) {
				selectedUnit = unit;
			} else {
				selectedUnit = undefined;
			}

		});
	}
}