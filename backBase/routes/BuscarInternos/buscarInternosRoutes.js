const express = require('express');
const buscarInternosController = require('../../controllers/BuscarInternos/buscarInternosController');

const router = express.Router();

router.get('/procesado6', buscarInternosController.obtenerInternosProcesado6);
router.get('/procesado9', buscarInternosController.obtenerInternosProcesado9); // ✅ Cambio aquí
router.get('/procesado7', buscarInternosController.obtenerInternosProcesado7); // ✅ Asegurar la ruta correcta
router.get('/procesado10', buscarInternosController.obtenerInternosProcesado10); // ✅ Asegurar la ruta correcta
router.get('/procesado2', buscarInternosController.obtenerInternosProcesado2);
router.get('/nombresBloque6', buscarInternosController.obtenerNombresPorBloques6);
router.get('/nombresBloque6D', buscarInternosController.obtenerNombresPorBloques6D);
router.get('/nombresBloque11', buscarInternosController.obtenerNombresPorBloques11);


module.exports = router;
