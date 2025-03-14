const express = require('express');
const NombresController = require( '../../../controllers/Bloque1/Nombres/NombresController' );

const router = express.Router();

router.get('/obtenerNombres/:idAlterna', NombresController.obtenerNombres);

module.exports = router;