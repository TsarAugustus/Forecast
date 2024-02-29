"use strict";
function editUnit() {
    const editButtons = document.querySelectorAll('.editUnitButton');
    editButtons.forEach(button => {
        button.addEventListener('click', () => {
            let buttonParent = button.parentElement;
            buttonParent.classList.add('editing');
            const thisUnit = button['dataset'].unit.replace(/\//g, '-');
            ;
            const thisCompany = button['dataset'].customer;
            const thisYear = button['dataset'].year;
            const thisMonth = button['dataset'].month;
            const thisID = button['dataset'].id;
            const thisShop = button['dataset'].shop;
            const thisInspection = button['dataset'].inspection;
            buttonParent.innerHTML = '';
            let editDiv = document.createElement('div');
            editDiv.id = 'editDiv';
            let editInspectionInput = document.createElement('input');
            editInspectionInput.placeholder = 'Edit Inspection.';
            editDiv.appendChild(editInspectionInput);
            //this way works
            // let editShop = document.createElement('input');
            // editShop.placeholder = 'Edit Shop Location';
            // editDiv.appendChild(editShop);
            let editShop = document.createElement('select');
            let SurreyShop = document.createElement('option');
            SurreyShop.innerHTML = 'Surrey';
            SurreyShop.value = 'Surrey';
            editShop.appendChild(SurreyShop);
            let NanaimoShop = document.createElement('option');
            NanaimoShop.innerHTML = 'Nanaimo';
            NanaimoShop.value = 'Nanaimo';
            editShop.appendChild(NanaimoShop);
            editDiv.appendChild(editShop);
            let editSubmitButton = document.createElement('button');
            editSubmitButton.innerHTML = 'Submit';
            editSubmitButton.onclick = function () {
                const newInspection = (editInspectionInput.value === '') ? thisInspection : editInspectionInput.value;
                // const newShop = (editShop.value === '') ? thisShop : editShop.value;
                const newShop = editShop.options[editShop.selectedIndex].innerHTML;
                fetch(`/year/edit/${thisYear}/${thisMonth}/${thisUnit}/${thisCompany}/${newInspection}/${thisID}/${newShop}`, { method: 'PUT' });
                location.reload();
            };
            editDiv.appendChild(editSubmitButton);
            let editCompanyColorButton = document.createElement('button');
            editCompanyColorButton.innerHTML = 'Edit Colors';
            editCompanyColorButton.onclick = function () {
                editDiv.innerHTML = '';
                buttonParent['style'].height = '10em';
                //Background Coloring
                let editBackgroundColorDiv = document.createElement('div');
                let editBackgroundColorLabel = document.createElement('span');
                editBackgroundColorLabel.innerHTML = 'Edit Background Color';
                editBackgroundColorDiv.appendChild(editBackgroundColorLabel);
                let editBackgroundColorInput = document.createElement('input');
                editBackgroundColorInput.classList.add('colorWheelDiv');
                editBackgroundColorInput['type'] = 'color';
                editBackgroundColorDiv.appendChild(editBackgroundColorInput);
                editDiv.appendChild(editBackgroundColorDiv);
                //Border Coloring
                let editBorderColorDiv = document.createElement('div');
                let editBorderColorLabel = document.createElement('span');
                editBorderColorLabel.innerHTML = 'Edit Border Color';
                editBorderColorDiv.appendChild(editBorderColorLabel);
                let editBorderColorInput = document.createElement('input');
                editBorderColorInput['type'] = 'color';
                editBorderColorDiv.appendChild(editBorderColorInput);
                editDiv.appendChild(editBorderColorDiv);
                //Text Coloring
                let editTextColorDiv = document.createElement('div');
                let editTextColorLabel = document.createElement('span');
                editTextColorLabel.innerHTML = 'Edit Text Color';
                editTextColorDiv.appendChild(editTextColorLabel);
                let editTextColorInput = document.createElement('input');
                editTextColorInput['type'] = 'color';
                editTextColorDiv.appendChild(editTextColorInput);
                editDiv.appendChild(editTextColorDiv);
                //Coloring Submit
                let colorSubmit = document.createElement('button');
                colorSubmit.innerHTML = 'Submit';
                colorSubmit.onclick = function () {
                    const backgroundColor = editBackgroundColorInput.value.replace('#', '');
                    const borderColor = editBorderColorInput.value.replace('#', '');
                    const textColor = editTextColorInput.value.replace('#', '');
                    fetch(`/year/color/${thisCompany}/${backgroundColor}/${borderColor}/${textColor}`, { method: 'PUT' });
                    location.reload();
                };
                editDiv.appendChild(colorSubmit);
            };
            editDiv.appendChild(editCompanyColorButton);
            //Hide unit in sidebar
            let hideButton = document.createElement('button');
            hideButton.innerHTML = 'Hide Unit';
            hideButton.classList.add('hideUnitButton');
            hideButton.onclick = function () {
                const divParent = editDiv.parentElement;
                const thisShop = divParent['dataset'].shop;
                const thisUnit = divParent['dataset'].unit;
                const thisCustomer = divParent['dataset'].customer;
                const thisInspection = divParent['dataset'].inspection;
                const thisID = divParent['dataset'].id;
                const thisSplit = window.location.href.split('/');
                const thisYear = thisSplit[4];
                const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                const monthSplit = thisSplit[5];
                const thisMonth = months.findIndex(month => month === monthSplit);
                fetch(`/year/${thisYear}/${thisMonth}/${thisShop}/${thisCustomer}/${thisUnit}/${thisID}`, { method: 'PUT' });
                location.reload();
            };
            editDiv.appendChild(hideButton);
            buttonParent.appendChild(editDiv);
            // buttonParent.appendChild(editInspectionInput);
            // buttonParent.appendChild(editShop)
            // buttonParent.appendChild(editSubmitButton)
        });
    });
}
editUnit();
