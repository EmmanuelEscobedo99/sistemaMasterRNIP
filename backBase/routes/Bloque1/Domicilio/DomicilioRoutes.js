const express = require('express');
const DomicilioController = require( '../../../controllers/Bloque1/Domicilio/DomicilioController' );

const router = express.Router();

router.get('/obtenerDomicilio/:idAlterna', DomicilioController.obtenerDomicilio);

module.exports = router;