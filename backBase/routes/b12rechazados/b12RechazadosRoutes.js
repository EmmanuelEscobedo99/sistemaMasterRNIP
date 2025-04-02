const express = require("express");
const router = express.Router();
const { obtenerB12Rechazados } = require("../../controllers/b12rechazados/b12RechazadosController");

router.get("/nombresBloque12", obtenerB12Rechazados);

module.exports = router;
