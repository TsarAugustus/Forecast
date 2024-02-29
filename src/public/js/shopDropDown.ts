function shopDropDown() {
	let dropDownDiv = document.querySelectorAll('.shopList');

	//Option A

	// dropDownDiv.forEach(div => {
	// 	let dropDownSelect = document.createElement('select');

	// 	dropDownSelect.addEventListener('change', (e) => {
			
	// 		console.log('Change', dropDownSelect.options[dropDownSelect.selectedIndex].innerHTML)
	// 	})

	// 	let SurreyShop = document.createElement('option');
	// 	SurreyShop.innerHTML = 'Surrey'
	// 	SurreyShop.value = 'Surrey';
	// 	dropDownSelect.appendChild(SurreyShop);

	// 	let NanaimoShop = document.createElement('option');
	// 	NanaimoShop.innerHTML = 'Nanaimo'
	// 	NanaimoShop.value = 'Nanaimo'
	// 	dropDownSelect.appendChild(NanaimoShop);

	// 	div.appendChild(dropDownSelect);
	// })

	//Option B

	dropDownDiv.forEach(div => {
		let SurreyShop = document.createElement('div');
		SurreyShop.innerHTML = 'Surrey';
		SurreyShop.id = 'SurreyShop';
		SurreyShop.setAttribute('tabIndex', '1');
		SurreyShop.addEventListener('click', () => {
			// console.log('Surrey')
			window.location.href = './Surrey'
		})

		let NanaimoShop = document.createElement('div');
		NanaimoShop.innerHTML = 'Nanaimo';
		NanaimoShop.id = 'NanaimoShop'
		NanaimoShop.setAttribute('tabIndex', '2');
		NanaimoShop.addEventListener('click', () => {
			// console.log('Nanaimo')
			window.location.href = './Nanaimo'
		})

		div.appendChild(SurreyShop);
		div.appendChild(NanaimoShop)
	});

	const locationSplit = window.location.href.split('/');
	const shopLocation = locationSplit[locationSplit.length - 1];

	let shopTab = document.getElementById(`${shopLocation}Shop`);

	shopTab.style['background-color'] = '#E0E0E0'
}

shopDropDown();
