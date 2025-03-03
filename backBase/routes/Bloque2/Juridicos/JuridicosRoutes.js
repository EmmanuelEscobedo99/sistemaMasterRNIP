const express = require('express');
const JuridicosController = require( '../../../controllers/Bloque2/Juridicos/JuridicosController' );

const router = express.Router();

router.get('/obtenerJuridicos/:idAlterna', JuridicosController.obtenerJuridicos);

module.exports = router;