function init() {
	let thisDate = new Date();
	let thisDateDay = thisDate.getDate();
	let thisDateMonth = thisDate.getMonth();
	let thisDateYear = thisDate.getFullYear();

	let thisDateDiv = document.getElementById(`${thisDateDay}-${months[thisDateMonth]}-${thisDateYear}`)
	thisDateDiv.style['border'] = '3px solid green'
}

init();
