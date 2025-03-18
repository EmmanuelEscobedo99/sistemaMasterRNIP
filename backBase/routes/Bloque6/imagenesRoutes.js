const express = require('express');
const pool = require('../../config/db.config');
const upload = require('../../multer/multerConfig');

const router = express.Router();

router.post("/upload", upload.any(), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No se han subido archivos." });
    }

    const { id_alterna, estado_emisor, emisor, llave } = req.body;

    if (!id_alterna || !emisor || !estado_emisor || !llave) {
      return res.status(400).json({ message: "Faltan campos requeridos en la solicitud." });
    }

    const requiredGroups = ["A", "B", "C"];
    for (let i = 0; i < 3; i++) {
      const imageKey = `imagen${i + 1}`;
      const grupoRecibido = req.body[`${imageKey}_grupo`];

      if (!grupoRecibido || grupoRecibido !== requiredGroups[i]) {
        return res.status(400).json({
          message: `Error en la imagen ${imageKey}: Debe pertenecer al grupo '${requiredGroups[i]}'`,
        });
      }
    }

    for (const file of req.files) {
      const imageData = file.buffer;
      const grupo = req.body[`${file.fieldname}_grupo`] || "A";

      try {
        const query = "INSERT INTO imagenes (ID_ALTERNA, ESTADO_EMISOR, EMISOR, DESIMA, TIPO, FOLIO, GRUPO, IMAGEN) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        await pool.query(query, [id_alterna, estado_emisor, emisor, "fotos", "f", llave, grupo, imageData]);
      } catch (error) {
        console.error("Error al insertar imagen en la BD:", error);
        return res.status(500).json({ message: "Error al insertar una imagen", error });
      }
    }

    res.status(200).json({ message: "Todas las imágenes fueron subidas correctamente" });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    res.status(500).json({ message: "Error al guardar las imágenes en la base de datos", error });
  }
});

module.exports = router;