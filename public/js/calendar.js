let test1div = document.getElementById('test1');
let test2div = document.getElementById('test2');

let localServer = '127.0.0.1:3000';

test1div.addEventListener('click', () => {
	newRequest()
})

test2div.addEventListener('click', () => {
	newRequest()
})

function newRequest() {
	const xhr = new XMLHttpRequest();
	xhr.open("POST", `/test`);
	xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
	const body = JSON.stringify({
		// userId: 1,
		// title: "Fix my bugs",
		// completed: false
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

(function(window, document, undefined) {

	// code that should be taken care of right away
  
	window.onload = init;
  
	function init() {
		let draggable = document.getElementById('drag');
		
		let days = document.getElementsByClassName('day');
		
		for(let i=0; i<days.length; i++) {
			days[i].addEventListener('dragover', () => {
				console.log('here')
			})
		}
	
		let posX = 0;
		let posY = 0;
		let mouseX = 0;
		let mouseY = 0;
	
		draggable.addEventListener('mousedown', mouseDown, false);
		window.addEventListener('mouseup', mouseUp, false);

		function mouseDown(e) {
			e.preventDefault();
			posX = e.clientX - draggable.offsetLeft;
			posY = e.clientY - draggable.offsetTop;
			window.addEventListener('mousemove', moveElement, false);
			console.log('down')
		}

		function mouseUp() {
			window.removeEventListener('mousemove', moveElement, false);
			console.log('up');
		}

		function moveElement(e) {
			mouseX = e.clientX - posX;
			mouseY = e.clientY - posY;
			draggable.style.left = Math.ceil(mouseX / 20) * 20 + 'px';
			draggable.style.top = Math.ceil(mouseY / 20) * 20 + 'px';
			console.log('move');

			// console.log(mouseY, Math.ceil(mouseY / 10) * 10)
		}
	}
  
})(window, document, undefined);