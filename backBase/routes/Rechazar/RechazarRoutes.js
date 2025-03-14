const express = require('express');
const RechazarController = require( '../../controllers/Rechazar/RechazarController' );

const router = express.Router();

router.put('/rechazarRegistro/:idAlterna', RechazarController.rechazarRegistro);

module.exports = router;