const express = require('express');
const RechazarController = require( '../../controllers/Rechazar/RechazarController' );

const router = express.Router();

router.put('/rechazarRegistro/:idAlterna', RechazarController.rechazarRegistro);
router.put('/rechazarRegistro2/:newIdAlterna', RechazarController.rechazarRegistro2);

module.exports = router;