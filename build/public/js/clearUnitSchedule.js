"use strict";
function clearUnitSchedule() {
    let clearAllButtons = document.querySelectorAll('.clearAllButton');
    clearAllButtons.forEach(button => {
        button.addEventListener('click', () => {
            let thisUnit = button['dataset'].unit;
            let thisCustomer = button['dataset'].customer;
            let thisYear = button['dataset'].year;
            let thisMonth = button['dataset'].month;
            const thisSplit = window.location.href.split('/');
            const thisShop = thisSplit[6];
            fetch(`/year/${thisYear}/${thisMonth}/${thisUnit}/${thisCustomer}/${thisShop}`, { method: 'DELETE' });
            location.reload();
        });
    });
}
clearUnitSchedule();
