const express = require('express');
const buscarInternosController = require('../../controllers/BuscarInternos/buscarInternosController');

const router = express.Router();

// Nueva estructura de rutas
router.get('/procesado6', buscarInternosController.obtenerInternosProcesado6);
router.get('/procesado7', buscarInternosController.obtenerInternosProcesado7);

module.exports = router;
