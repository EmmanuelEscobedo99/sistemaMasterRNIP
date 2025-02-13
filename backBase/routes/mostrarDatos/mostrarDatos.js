const express = require('express');
const datos = require('../../controllers/datos/datos');

const router = express.Router();

router.get('/mostrar', datos.traerDatos);
router.get('/buscar', datos.buscarDatos);
router.get('/Id/:id', datos.traerDatoPorId);

module.exports = router;