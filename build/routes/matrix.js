"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const matrixController = require('../controllers/matrixController');
router.get('/', (req, res) => {
    let cert = matrixController();
    res.render('matrix', { cert: cert });
});
module.exports = router;
