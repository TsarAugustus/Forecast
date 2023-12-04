/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
function unitScript(arg) {
	let units = document.querySelectorAll('.calendarUnit');

	if(arg) {
		arg.addEventListener('click', (e) => {
			arg.classList.toggle('unitToggle');
			if(selectedUnit) {
				selectedUnit.classList.remove('unitToggle');
			}
			if(arg.classList.contains('unitToggle')) {
				selectedUnit = arg;
			} else {
				selectedUnit = undefined;
			}

		});
	} else {
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

}