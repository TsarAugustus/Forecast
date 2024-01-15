"use strict";
function delteUnit() {
    const deleteButtons = document.querySelectorAll('.deleteUnitButton');
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const thisYear = button['dataset'].year;
            const thisMonth = button['dataset'].month;
            const thisUnit = button['dataset'].unit;
            const thisCompany = button['dataset'].customer;
            console.log(thisUnit);
            fetch(`/year/custom/${thisYear}/${thisMonth}/${thisUnit}/${thisCompany}`, { method: 'DELETE' });
            location.reload();
        });
    });
}
delteUnit();
