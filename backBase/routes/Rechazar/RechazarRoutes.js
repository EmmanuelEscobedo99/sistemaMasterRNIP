const express = require('express');
const RechazarController = require('../../controllers/Rechazar/RechazarController');

const router = express.Router();

// Rechazo de registros con ID_ALTERNA, sin enviar LLAVE
router.put('/rechazarRegistro/:ID_ALTERNA/:FORMULARIO/:CAMPO/:DESCRIPCION', RechazarController.rechazarRegistro);

// Rechazo por LLAVE directo
router.put('/rechazarRegistro2/:LLAVE/:FORMULARIO/:CAMPO/:DESCRIPCION', RechazarController.rechazarRegistro2);

// Obtener LLAVE automáticamente desde ID_ALTERNA
router.get('/llavePorIdAlterna/:idAlterna', RechazarController.obtenerLlaveDesdeIdAlterna);

module.exports = router;
