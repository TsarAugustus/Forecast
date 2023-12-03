function getName(item) {
	let newString;

	newString = item.toString().replace(/AB/g, '').replace(/-/g, '/').replace(/\/B/g, '').replace(/A\/B/g, '').replace(/LR/g, '').replace(/#/g, '').replace(/L\/R/g, '').replace(/L\/P/g, '').replace(/LP/g, '').replace(/\/P/g, '');

	if(newString.charAt(newString.length - 1) === 'P') {
		newString = newString.slice(0, -1);
	} else if (newString.charAt(newString.length - 1) === 'B' && !newString.toUpperCase().includes('UNIT')) {
		newString = newString.slice(0, -1);
	}

	if(newString === '320/320') {
		newString = '320';
	}
	
	return newString;
}

module.exports = getName;