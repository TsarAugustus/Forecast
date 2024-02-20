"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
/* B620 UPLOAD */
const B620Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, 'B620.xlsx');
    }
});
const uploadB620 = multer({ storage: B620Storage }).single('B620File');
router.post('/B620', uploadB620, (req, res) => {
    console.log('Uploaded B620 Log');
    res.redirect('/');
});
/* MVI UPLOAD */
const MVIStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, './../../uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, 'MVI.xlsx');
    }
});
const uploadMVI = multer({ storage: MVIStorage }).single('MVIFile');
router.post('/MVI', uploadMVI, (req, res) => {
    // uploadMVI(req, res, function(err) {
    // 	if(err) console.error(err)
    // 	console.log('Uploaded MVI Document')
    // })
    // res.redirect('/');
});
module.exports = router;
