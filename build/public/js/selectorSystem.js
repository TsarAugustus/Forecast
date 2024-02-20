"use strict";
function selectorSystem() {
    let selectedUnit;
    let selectedDays = [];
    let hideSidebarbutton = document.querySelectorAll('.hideSidebar');
    hideSidebarbutton.forEach(button => {
        let sidebar = document.querySelectorAll('.sidebar');
        sidebar.forEach(item => item['style']['display'] = 'none');
        button.addEventListener('click', () => {
            sidebar.forEach(item => {
                if (item['style']['display'] === 'none') {
                    item['style']['display'] = 'block';
                    button.innerHTML = 'Hide Sidebar';
                }
                else {
                    item['style']['display'] = 'none';
                    button.innerHTML = 'Show Sidebar';
                }
            });
        });
    });
    //Unit selection
    let unitHeaders = document.querySelectorAll('.sidebar-UnitHeader');
    unitHeaders.forEach(unit => {
        unit.addEventListener('click', () => {
            unit.classList.toggle('highlight');
            let unitName = unit['dataset'].unit;
            let customerName = unit['dataset'].customer;
            if (selectedUnit) {
                selectedUnit.classList.remove('highlight');
            }
            selectedUnit = unit;
            if (unit.classList.contains('highlight') === false)
                selectedUnit = undefined;
        });
    });
    //Cell Selection
    let selectors = document.querySelectorAll('.selector');
    selectors.forEach(selector => {
        selector.addEventListener('click', () => {
            selector.classList.toggle('highlight');
            let thisSelectorSplit = selector.id.split('-');
            let thisSelectorDay = thisSelectorSplit[0];
            let thisSelectorMonth = thisSelectorSplit[1];
            let thisSelectorYear = thisSelectorSplit[2];
            let thisSelectorCell = thisSelectorSplit[3];
            if (selector.classList.contains('highlight') === false) {
                selectedDays.forEach((item, itemIndex) => {
                    if (item.id === selector.id) {
                        selectedDays.splice(itemIndex, 1);
                    }
                });
            }
            else {
                selectedDays.forEach((item, itemIndex) => {
                    let itemSelectorSplit = item.id.split('-');
                    let itemSelectorDay = itemSelectorSplit[0];
                    let itemSelectorMonth = itemSelectorSplit[1];
                    let itemSelectorYear = itemSelectorSplit[2];
                    let itemSelectorCell = itemSelectorSplit[3];
                    if (itemSelectorDay === thisSelectorDay && itemSelectorMonth === thisSelectorMonth && itemSelectorYear === thisSelectorYear) {
                        item.classList.remove('highlight');
                        selectedDays.splice(itemIndex, 1);
                    }
                });
                selectedDays.push(selector);
            }
        });
    });
    //Confirm Selection
    let confirmButton = document.querySelectorAll('.calendarSubmit');
    confirmButton.forEach(button => {
        button.addEventListener('click', () => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/confirm');
            xhr.setRequestHeader('Content-Type', 'application/json');
            let dayArray = [];
            let unitID = selectedUnit.dataset.id;
            selectedDays.forEach(day => {
                let thisDaySplit = day.id.split('-');
                let thisDay = thisDaySplit[0];
                // let thisMonth = thisDaySplit[1];
                let thisYear = thisDaySplit[2];
                let thisCell = thisDaySplit[3];
                const months = [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December'
                ];
                let thisMonth;
                months.find((month, monthIndex) => {
                    if (month === thisDaySplit[1]) {
                        thisMonth = monthIndex;
                    }
                });
                dayArray.push({
                    day: thisDay,
                    month: thisMonth,
                    year: thisYear,
                    cell: thisCell,
                    unitID: unitID
                });
            });
            const thisUnit = {
                name: selectedUnit.dataset.unit,
                company: selectedUnit.dataset.customer,
                inspection: selectedUnit.dataset.inspection,
                unitID: unitID
            };
            const body = JSON.stringify({
                unit: thisUnit,
                schedule: dayArray
            });
            xhr.send(body);
            location.reload();
        });
    });
}
selectorSystem();
