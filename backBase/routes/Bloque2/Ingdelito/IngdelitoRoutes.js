const express = require('express');
const IngdelitoController = require( '../../../controllers/Bloque2/Ingdelito/IngdelitoController' );

const router = express.Router();

router.get('/obtenerIngdelito/:idAlterna', IngdelitoController.obtenerIngdelito);

module.exports = router;