const express = require('express');
const RechazarController = require('../../controllers/Rechazar/RechazarController'); // ✅ Asegurar la ruta correcta

const router = express.Router();


// routes/rechazar.js
router.put('/rechazarRegistro2/:LLAVE/:FORMULARIO/:CAMPO/:DESCRIPCION', RechazarController.rechazarRegistro2);


router.put('/rechazarRegistro/:ID_ALTERNA/:LLAVE/:FORMULARIO/:CAMPO/:DESCRIPCION', RechazarController.rechazarRegistro); // ✅ Asegurar que está correctamente definido


module.exports = router;
