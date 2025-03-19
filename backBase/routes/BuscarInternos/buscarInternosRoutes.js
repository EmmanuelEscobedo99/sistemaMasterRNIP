const express = require('express');
const buscarInternosController = require('../../controllers/BuscarInternos/buscarInternosController');

const router = express.Router();

router.get('/procesado6', buscarInternosController.obtenerInternosProcesado6);
router.get('/procesado8', buscarInternosController.obtenerInternosProcesado8); // ✅ Cambio aquí
router.get('/procesado7', buscarInternosController.obtenerInternosProcesado7); // ✅ Asegurar la ruta correcta
router.get('/procesado11', buscarInternosController.obtenerInternosProcesado11); // ✅ Asegurar la ruta correcta

module.exports = router;
