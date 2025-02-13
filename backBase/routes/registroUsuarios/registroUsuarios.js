const express = require('express');
const registroController = require('../../controllers/registroUsuarios/registroUsuariosController');
const validarDatosUsuario = require('../../middlewares/datosMiddle/datosMiddlewares');
const authMiddleware = require('../../middlewares/token/authMiddleware');

//validarDatosUsuario,


const router = express.Router();
router.post('/registrar', authMiddleware,  registroController.registro);

module.exports = router;