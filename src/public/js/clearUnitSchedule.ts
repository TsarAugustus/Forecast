function clearUnitSchedule() {
	let clearAllButtons = document.querySelectorAll('.clearAllButton')

	clearAllButtons.forEach(button => {
		button.addEventListener('click', () => {
			let thisUnit = button['dataset'].unit;
			let thisCustomer = button['dataset'].customer;
			let thisYear = button['dataset'].year;
			let thisMonth = button['dataset'].month;
			
			fetch(`/year/${thisYear}/${thisMonth}/${thisUnit}/${thisCustomer}`, {method: 'DELETE'})
			location.reload();
		})
	})
}

clearUnitSchedule();
