const express = require('express');
const buscarInternosController = require('../../controllers/BuscarInternos/buscarInternosController');

const router = express.Router();

router.get('/procesado6', buscarInternosController.obtenerInternosProcesado6);
router.get('/procesado8', buscarInternosController.obtenerInternosProcesado8); // ✅ Cambio aquí

module.exports = router;
