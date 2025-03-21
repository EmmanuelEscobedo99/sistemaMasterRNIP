const express = require('express');
const MovimientosController = require('../../controllers/Bloque6/movimientosController');

const router = express.Router();

router.post('/generar-id-alterna', MovimientosController.generarIdAlterna);

module.exports = router;
