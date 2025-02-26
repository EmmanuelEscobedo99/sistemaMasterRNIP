const express = require('express');
const datosGeneralesController = require( '../../../controllers/Bloque1/DatosGenerales/DatosGeneralesController' );

const router = express.Router();

router.get('/obtenerDatosGenerales', datosGeneralesController.obtenerDatosGenerales);

module.exports = router;