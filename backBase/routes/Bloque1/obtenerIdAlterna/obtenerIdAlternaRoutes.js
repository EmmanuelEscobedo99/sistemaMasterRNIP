const express = require('express');
const obtenerIdAlternaController = require( '../../../controllers/Bloque1/obtenerIdAlterna/obtenerIdAlternaController' );

const router = express.Router();

router.post('/idAlterna', obtenerIdAlternaController.obtenerIdAlterna);

module.exports = router;