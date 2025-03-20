const express = require('express');
const AprovarController = require( '../../controllers/Aprovar/AprovarController' );

const router = express.Router();

router.put('/aprovarRegistro/:idAlterna', AprovarController.aprovarRegistro);
router.put('/aprovarRegistro2/:newIdAlterna', AprovarController.aprovarRegistro2);

module.exports = router;