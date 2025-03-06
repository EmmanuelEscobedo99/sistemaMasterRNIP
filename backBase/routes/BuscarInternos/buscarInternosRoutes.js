const express = require('express');
const buscarInternosController = require( '../../controllers/BuscarInternos/buscarInternosController' );

const router = express.Router();

router.get('/obtenerInternos', buscarInternosController.obtenerEjecucion);

module.exports = router;