function getName(item) {
	return item.toString().replace(/AB/g, '').replace(/-/g, '/').replace(/\/B/g, '').replace(/A\/B/g, '').replace(/LR/g, '')
}

module.exports = getName;