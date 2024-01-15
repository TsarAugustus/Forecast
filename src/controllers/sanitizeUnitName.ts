function sanitizeUnitName(unitName) {
	if(unitName === undefined) return;

	unitName = unitName.toString();

	unitName = unitName.toString()
	.replace(/AB/g, '')
	.replace(/-/g, '/')
	.replace(/\/B/g, '')
	.replace(/A\/B/g, '')
	// .replace(/A/g, '')		//may not work
	// .replace(/[0-9]A/g, '')	//doesn't work
	.replace(/LR/g, '')
	.replace(/#/g, '')
	.replace(/L\/R/g, '')
	.replace(/L\/P/g, '')
	.replace(/LP/g, '')
	.replace(/\/P/g, '');

	// if(unitName.slice(-2) === 'AB') unitName = unitName.slice(0, -2);
	// if(unitName.slice(-2) === 'LR') unitName = unitName.slice(0, -2);
	// if(unitName.slice(-2) === '/B') unitName = unitName.slice(0, -2);
	// if(unitName.slice(-1) === 'A') unitName = unitName.slice(0, -1);
	// if(unitName.slice(-1) === 'B') unitName = unitName.slice(0, -1);

	return unitName;
}

module.exports = sanitizeUnitName;


// export {};

// function getName(item) {
// 	let newString;

// 	newString = item.toString().replace(/AB/g, '').replace(/-/g, '/').replace(/\/B/g, '').replace(/A\/B/g, '').replace(/LR/g, '').replace(/#/g, '').replace(/L\/R/g, '').replace(/L\/P/g, '').replace(/LP/g, '').replace(/\/P/g, '');

// 	if(newString.charAt(newString.length - 1) === 'P') {
// 		newString = newString.slice(0, -1);
// 	} else if (newString.charAt(newString.length - 1) === 'B' && !newString.toUpperCase().includes('UNIT')) {
// 		newString = newString.slice(0, -1);
// 	}

// 	if(newString === '320/320') {
// 		newString = '320';
// 	}
	
// 	return newString;
// }

// module.exports = getName;

// export {}
