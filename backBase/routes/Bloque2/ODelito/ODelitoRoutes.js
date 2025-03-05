const express = require('express');
const ODelitoController = require( '../../../controllers/Bloque2/ODelito/ODelitoController' );

const router = express.Router();

router.get('/obtenerODelito/:idAlterna', ODelitoController.obtenerODelito);

module.exports = router;