const express = require('express');
const IngresosController = require( '../../../controllers/Bloque2/Ingresos/IngresosController' );

const router = express.Router();

router.get('/obtenerIngresos/:idAlterna', IngresosController.obtenerIngresos);

module.exports = router;