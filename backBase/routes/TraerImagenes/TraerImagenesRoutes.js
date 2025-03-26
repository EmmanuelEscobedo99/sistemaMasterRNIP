const express = require('express');
const router = express.Router();
const TraerImagenesController = require('../../controllers/TraerImagenes/TraerImagenesController');

// Ruta para obtener imágenes por LLAVE
router.get('/:llave', TraerImagenesController.obtenerPorLlave);

module.exports = router;
