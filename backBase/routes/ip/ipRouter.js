const express = require('express');
const ipController = require('../../controllers/ip/ipController');

const router = express.Router();

router.post('/obtenerIp', ipController.verificarIp);
router.get('/ipPrivada', ipController.obtenerIpPrivada);



module.exports = router;