"use strict";
function create() {
    const addItemButton = document.querySelectorAll('.createButton');
    addItemButton.forEach(button => {
        button.addEventListener('click', () => {
            let parentEl = button.parentElement;
            let unitCreationDiv = document.querySelectorAll('.unitCreationDiv');
            unitCreationDiv.forEach(div => div.classList.toggle('hide'));
        });
    });
}
create();
