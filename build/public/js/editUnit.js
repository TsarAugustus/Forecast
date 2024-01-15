"use strict";
function editUnit() {
    const editButtons = document.querySelectorAll('.editUnitButton');
    editButtons.forEach(button => {
        button.addEventListener('click', () => {
            let buttonParent = button.parentElement;
            const thisUnit = button['dataset'].unit.replace(/\//g, '-');
            ;
            const thisCompany = button['dataset'].customer;
            const thisYear = button['dataset'].year;
            const thisMonth = button['dataset'].month;
            const thisID = button['dataset'].id;
            buttonParent.innerHTML = '';
            let editInput = document.createElement('input');
            editInput.placeholder = 'Edit Inspection';
            let editSubmitButton = document.createElement('button');
            editSubmitButton.innerHTML = 'Submit';
            editSubmitButton.onclick = function () {
                const thisInspection = editInput.value;
                fetch(`/year/edit/${thisYear}/${thisMonth}/${thisUnit}/${thisCompany}/${thisInspection}/${thisID}`, { method: 'PUT' });
                location.reload();
            };
            buttonParent.appendChild(editInput);
            buttonParent.appendChild(editSubmitButton);
        });
    });
}
editUnit();
