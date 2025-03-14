const express = require('express');
const SituacionController = require( '../../../controllers/Bloque2/Situacion/SituacionController' );

const router = express.Router();

router.get('/obtenerSituacion/:idAlterna', SituacionController.obtenerSituacion);

module.exports = router;