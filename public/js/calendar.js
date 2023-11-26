/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
let placeholderText = 'PLEASE CHOOSE A UNIT';

let selectedUnit = undefined;
let selectedDays = [];

let confirmedSchedule = [];

// sendDataToServer();
getSavedData();
clearButton();
confirmButton();
selectorScript();
unitScript();