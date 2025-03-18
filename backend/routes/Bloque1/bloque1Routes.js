const express = require('express');
const datosGeneralesController = require( '../../controllers/Bloque1/DatosGenerales/datosGeneralesController' );

const router = express.Router();

router.post('/idAlterna', datosGeneralesController.obtenerIdAlterna);

module.exports = router;