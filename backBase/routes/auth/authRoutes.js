const express = require('express');
const AuthController = require('../../controllers/auth/authController');
const authMiddleware = require('../../middlewares/auth/authMiddleware');



const router = express.Router();
router.post('/login', AuthController.login);
router.post('/salir/', AuthController.salir);
router.post('/auth', AuthController.auth);
router.post('/usuHistorico/', AuthController.usuHistorico);






module.exports = router;