let selectors = document.querySelectorAll('.selector');

function selectorScript() {
	for(let selector of selectors) {
		selector.addEventListener('click',  (e) => {
			selector.classList.toggle('toggle');
			if(selector.classList.contains('toggle')) {
				selectedDays.push(selector);
			} else {
				selectedDays = selectedDays.filter(item => item.id !== selector.id)
			}
			
		})
	}
}