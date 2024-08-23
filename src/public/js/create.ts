function create() {
	const addItemButton = document.querySelectorAll('.createButton');

	addItemButton.forEach(button => {
		button.addEventListener('click', () => {
			let parentEl = button.parentElement;

			let unitCreationDiv = document.querySelectorAll('.unitCreationDiv');
			unitCreationDiv.forEach(div => div.classList.toggle('hide'));
		})
	})
	
	let CreateUnitForm = document.getElementById('CreateUnitForm');
	let CompanyDropDown = document.getElementById('CompanyDropDown');
	CompanyDropDown.addEventListener('input', (e) => {
		// const SelectedText = CompanyDropDown['options'][CompanyDropDown['selectedIndex']]['text'];
		const SelectedText = CompanyDropDown['value'];

		if(SelectedText === 'Custom Unit') {
			let ChangeInput = document.createElement('input');
			ChangeInput['type'] = 'text';
			ChangeInput['placeholder'] = 'Company';
			ChangeInput['name'] = 'companyName';
			// CompanyDropDown = ChangeInput;
			CompanyDropDown.replaceWith(ChangeInput);
			// input(type="text", placeholder='Company', name='companyName')
		}

		// console.log('Changed', CompanyDropDown['value'], CompanyDropDown['options'][CompanyDropDown['selectedIndex']]['text'])
	});

	let CreateUnitFormSubmitButton = document.getElementById('CreateUnitFormSubmitButton');

	CreateUnitForm.addEventListener('submit', (e) => {
		if(CreateUnitForm.classList.contains('Submitting')) {
			e.preventDefault();
		}

		CreateUnitFormSubmitButton.setAttribute('disabled', '');
		CreateUnitForm.classList.add('Submitting');
	});
}

create();
