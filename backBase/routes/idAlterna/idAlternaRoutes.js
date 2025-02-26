const express = require('express');
const idAlternaController = require( '../../controllers/idAlterna/idAlternaController' );

const router = express.Router();

router.post('/obtenerIdAlterna', idAlternaController.obtenerIdAlterna);

module.exports = router;