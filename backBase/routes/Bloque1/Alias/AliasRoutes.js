const express = require('express');
const AliasController = require( '../../../controllers/Bloque1/Alias/AliasController' );

const router = express.Router();

router.get('/obtenerAlias/:idAlterna', AliasController.obtenerAlias);
module.exports = router;