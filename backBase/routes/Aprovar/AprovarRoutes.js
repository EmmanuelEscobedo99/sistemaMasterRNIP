const express = require('express');
const AprovarController = require( '../../controllers/Aprovar/AprovarController' );

const router = express.Router();

router.put('/aprovarRegistro/:idAlterna', AprovarController.aprovarRegistro);

module.exports = router;