/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
function sendDatatoServer(arr) {
	let localServer = '127.0.0.1:3000';


	const xhr = new XMLHttpRequest();
	xhr.open('POST', '/confirm');
	xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
	const body = JSON.stringify({
		confirmedSchedule
	});

	// xhr.onload = () => {
	// 	if (xhr.readyState == 4 && xhr.status == 201) {
	// 		console.log(JSON.parse(xhr.responseText));
	// 	} else {
	// 		console.log(`Error: ${xhr.status}`);
	// 	}
	// };
	xhr.send(body);
}