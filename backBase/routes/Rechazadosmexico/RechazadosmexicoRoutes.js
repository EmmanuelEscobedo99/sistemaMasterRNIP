const express = require('express');
const router = express.Router();
const RechazadosMexicoController = require('../../controllers/Rechazadosmexico/RechazadosmexicoController');

// CAMBIO AQUÍ:
router.get('/nombresRechazadosMexico', RechazadosMexicoController.obtenerRechazadosMexico);

module.exports = router;
