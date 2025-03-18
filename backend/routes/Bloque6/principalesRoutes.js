const express = require('express');
const pool = require('../../config/db.config');
const upload = require('../../multer/multerConfig');

const router = express.Router();

router.post("/upload", upload.any(), async (req, res) => {
  try {
    if (!req.files || req.files.length !== 3) {
      return res.status(400).json({ message: "Debes enviar exactamente 3 imágenes en el orden correcto." });
    }

    const { id_alterna, estado_emisor, emisor, llave } = req.body;

    if (!id_alterna || !emisor || !estado_emisor || !llave) {
      return res.status(400).json({ message: "Faltan campos requeridos en la solicitud." });
    }

    let imagenA, imagenB, imagenC;

    req.files.forEach(file => {
      const grupo = req.body[`${file.fieldname}_grupo`];
      if (grupo === 'A') imagenA = file.buffer;
      if (grupo === 'B') imagenB = file.buffer;
      if (grupo === 'C') imagenC = file.buffer;
    });

    if (!imagenA || !imagenB || !imagenC) {
      return res.status(400).json({ message: "Error: Las imágenes deben enviarse en el orden correcto (A → B → C)." });
    }

    try {
      const query = "INSERT INTO imagenes (ID_ALTERNA, ESTADO_EMISOR, EMISOR, DESIMA, TIPO, FOLIO, GRUPO, IMAGEN) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

      await pool.query(query, [id_alterna, estado_emisor, emisor, "fotos", "f", llave, 'A', imagenA]);
      await pool.query(query, [id_alterna, estado_emisor, emisor, "fotos", "f", llave, 'B', imagenB]);
      await pool.query(query, [id_alterna, estado_emisor, emisor, "fotos", "f", llave, 'C', imagenC]);

      res.status(200).json({ message: "Las imágenes fueron subidas correctamente en el orden A, B, C." });
    } catch (error) {
      console.error("Error al insertar imágenes:", error);
      res.status(500).json({ message: "Error al guardar las imágenes en la base de datos", error });
    }
  } catch (error) {
    console.error("Error general en el backend:", error);
    res.status(500).json({ message: "Error al procesar la solicitud", error });
  }
});

module.exports = router;
