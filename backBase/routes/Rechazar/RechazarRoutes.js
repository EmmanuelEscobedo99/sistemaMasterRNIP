const express = require('express');
const RechazarController = require('../../controllers/Rechazar/RechazarController'); // ✅ Asegurar la ruta correcta

const router = express.Router();

// ✅ Rechazar un registro por ID_ALTERNA (bloques 1 y 2)
router.put('/rechazarRegistro/:idAlterna', RechazarController.rechazarRegistro);

// ✅ Insertar error de formulario (llave, formulario, campo, descripcion)
router.post('/erroresFormulario', RechazarController.rechazarRegistro2);

module.exports = router;
