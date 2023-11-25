const express = require('express');
const router = express.Router();

const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, '/uploads/'))
	},
	filename: (req, file, cb) => {
		cb(null, 'log.xlsx')
	}
});

const upload = multer({ storage }).single('file');

router.post('/', upload, (req, res) => {
	console.log('post')
	console.log(req.body, req.file);
	res.redirect('/forecast');
});

module.exports = router