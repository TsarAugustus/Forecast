/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
let placeholderText = 'PLEASE CHOOSE A UNIT';

let selectedUnit = undefined;
let selectedDays = [];

let confirmedSchedule = [];


let hidden;
let hideSidebarButton = document.getElementsByClassName('hideSidebarButton');
let hideSidebarText = document.getElementById('hideSidebarText');
hideSidebarText.innerHTML = 'Hide Sidebar';


for(let item of hideSidebarButton) {
	if(hidden === undefined) hidden = false

	item.addEventListener('click', () => {
		hidden = !hidden;
		let sidebars = document.querySelectorAll('.sidebar');
		
		console.log(hideSidebarText)

		if(hidden === true) {
			for(let sidebar of sidebars) {
				sidebar.style.display = 'none';
				hideSidebarText.innerHTML = 'Show Sidebar';
				item.classList.add('hiddenSidebarButton');
			}
		} else {
			for(let sidebar of sidebars) {
				sidebar.style.display = 'flex';
				hideSidebarText.innerHTML = 'Hide Sidebar';
				item.classList.remove('hiddenSidebarButton');
			}
		}
	});
}

create();
getSavedData();
clearButton();
confirmButton();
selectorScript();
unitScript();