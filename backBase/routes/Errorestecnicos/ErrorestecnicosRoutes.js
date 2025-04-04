const express = require('express');
const router = express.Router();
const ErroresTecnicosController = require('../../controllers/Errorestecnicos/ErrorestecnicosController');

router.get('/nombresErroresTecnicos', ErroresTecnicosController.obtenerErroresTecnicos);

module.exports = router;
