const express = require('express');
const EjecucionController = require( '../../../controllers/Bloque2/Ejecucion/EjecucionController' );

const router = express.Router();

router.get('/obtenerEjecucion/:idAlterna', EjecucionController.obtenerEjecucion);

module.exports = router;