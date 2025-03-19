const express = require('express');
const RechazarController = require('../../controllers/Rechazar/RechazarController'); // ✅ Asegurar la ruta correcta

const router = express.Router();

router.put('/rechazarRegistro/:idAlterna', RechazarController.rechazarRegistro); // ✅ Asegurar que está correctamente definido

module.exports = router;
