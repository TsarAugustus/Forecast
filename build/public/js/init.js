"use strict";
function init() {
    let thisDate = new Date();
    let thisDateDay = thisDate.getDate();
    let thisDateMonth = thisDate.getMonth();
    let thisDateYear = thisDate.getFullYear();
    let thisDateDiv = document.getElementById(`${thisDateDay}-${months[thisDateMonth]}-${thisDateYear}`);
    if (thisDateDiv) {
        thisDateDiv.style['border'] = '5px solid green';
        thisDateDiv.style['border-radius'] = '1em';
    }
}
init();
