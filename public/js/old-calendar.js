// /* eslint-disable no-unused-vars */
// let localServer = '127.0.0.1:3000';

// function newRequest() {
// 	const xhr = new XMLHttpRequest();
// 	xhr.open('POST', '/test');
// 	xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
// 	const body = JSON.stringify({
// 		// userId: 1,
// 		// title: "Fix my bugs",
// 		// completed: false
// 	});

// 	// xhr.onload = () => {
// 	// 	if (xhr.readyState == 4 && xhr.status == 201) {
// 	// 		console.log(JSON.parse(xhr.responseText));
// 	// 	} else {
// 	// 		console.log(`Error: ${xhr.status}`);
// 	// 	}
// 	// };
// 	xhr.send(body);
// }

// function init() {
// 	let test1div = document.getElementById('test1');
// 	let test2div = document.getElementById('test2');

// 	test1div.addEventListener('click', () => { newRequest(); });
// 	test2div.addEventListener('click', () => { newRequest(); });

// 	let draggableItems = document.querySelectorAll('.drag p');
// 	let resizeableItems = document.querySelectorAll('.resizer');

// 	for(let item of draggableItems) {
// 		addDrag(item);
// 	}

// 	for(let item of resizeableItems) {
// 		addResizer(item);
// 	}
// }

// function addResizer(element) {
// 	element.addEventListener('mousedown', (event) => {
// 		resizerMouseDown(event, element);
// 	});
// 	window.addEventListener('mouseup', (event) => {
// 		let newEl = element.parentNode.cloneNode(true);
// 		element.parentNode.replaceWith(newEl);
// 		for(let item of newEl.children) {
// 			if(item.tagName === 'P') {
// 				addDrag(item);
// 			}
// 			if(item.tagName === 'DIV') {
// 				addResizer(item);
// 			}
// 		}
// 	});
// }

// function resizerMouseDown(event, element) {
// 	let posX = 0;
// 	let posY = 0;
	
// 	element = element.parentNode;
// 	posX = event.clientX - element.offsetLeft;
// 	posY = event.clientY - element.offsetTop;

// 	window.addEventListener('mousemove', (e) => {
// 		resizerMouseMove(e, element, posX, posY);
// 	});
// }

// function resizerMouseMove(event, element, initPosX, initPosY) {
// 	let mouseX = 0;
// 	let mouseY = 0;

// 	mouseX = event.clientX - initPosX;
// 	mouseY = event.clientY - initPosY;

// 	element.style.width = mouseX;
// }

// function addDrag(element) {
// 	if(element.parentNode.classList.contains('drag')) {
// 		element.addEventListener('mousedown', (event) => {
// 			mouseDown(event, element);
// 		});

// 		element.addEventListener('mouseup', (e) => {
// 			let newEl = element.parentNode.cloneNode(true);
// 			element.parentNode.replaceWith(newEl);
// 			for(let item of newEl.children) {
// 				if(item.tagName === 'P') {
// 					addDrag(item);
// 				}
// 				if(item.tagName === 'DIV') {
// 					addResizer(item);
// 				}
// 			}
// 		});
// 	}
// }

// function mouseDown(event, element) {
// 	let posX = 0;
// 	let posY = 0;
	
// 	element = element.parentNode;
// 	posX = event.clientX - element.offsetLeft;
// 	posY = event.clientY - element.offsetTop;

// 	window.addEventListener('mousemove', (e) => {
// 		mouseMove(e, element, posX, posY);
// 	});
// }

// function mouseMove(event, element, initPosX, initPosY) {
// 	let mouseX = 0;
// 	let mouseY = 0;

// 	mouseX = event.clientX - initPosX;
// 	mouseY = event.clientY - initPosY;
// 	// element.style.left = Math.ceil(mouseX / 20) * 20 + 'px';
// 	// element.style.top = Math.ceil(mouseY / 20) * 20 + 'px';
// 	element.style.left = mouseX + 'px';
// 	element.style.top = mouseY + 'px';
	
// }

// onload = (e) => { init(); };

// setInterval(function() {
// 	console.log('here');
// }, 1000);