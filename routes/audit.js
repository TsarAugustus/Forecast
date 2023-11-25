const express = require('express');
const router = express.Router();

const retrieveInformation = require('../middleware/retrieveInformation');
const specificationAudit = require('../middleware/specificationAudit');

router.get('/', (req, res) => {
	let auditInformation = retrieveInformation('Audit');
	console.log(auditInformation);
	let specs = specificationAudit(auditInformation);

	res.render('audit', {title: 'Audit', specs: specs });
});

module.exports = router;