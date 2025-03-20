const express = require('express');
const AprovarController = require( '../../controllers/Aprovar/AprovarController' );

const router = express.Router();

router.put('/aprovarRegistro/:idAlterna', AprovarController.aprovarRegistro);
router.put('/aprovarRegistro2/:LLAVE', AprovarController.aprovarRegistro2);

module.exports = router;