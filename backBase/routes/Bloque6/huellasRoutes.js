const express = require('express');
const pool = require('../../config/db.config');
const multer = require('multer');

const router = express.Router();

// Configurar multer para recibir imágenes en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage });

const GRUPOS_HUELLAS = {
  imagen1: 1, imagen2: 2, imagen3: 3, imagen4: 4, imagen5: 5, // Mano derecha
  imagen6: 6, imagen7: 7, imagen8: 8, imagen9: 9, imagen10: 10 // Mano izquierda
};

router.post('/upload', upload.fields([
  { name: 'imagen1' }, { name: 'imagen2' }, { name: 'imagen3' }, { name: 'imagen4' },
  { name: 'imagen5' }, { name: 'imagen6' }, { name: 'imagen7' }, { name: 'imagen8' },
  { name: 'imagen9' }, { name: 'imagen10' }
]), async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No se han subido archivos.');
    }

    const { id_alterna, estado_emisor, emisor, llave } = req.body;

    if (!id_alterna || !emisor || !estado_emisor || !llave) {
      return res.status(400).json({ message: 'Faltan campos requeridos en la solicitud.' });
    }

    for (const key in req.files) {
      const file = req.files[key][0];
      const imageData = file.buffer;
      const grupo = GRUPOS_HUELLAS[key];

      if (!grupo) continue;

      console.log(`📌 Insertando imagen en grupo: ${grupo}`);

      const query = `
        INSERT INTO imagenes 
        (ID_ALTERNA, ESTADO_EMISOR, EMISOR, DESIMA, TIPO, FOLIO, GRUPO, IMAGEN) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
      await pool.query(query, [id_alterna, estado_emisor, emisor, 'huellas', 'f', llave, grupo, imageData]);
    }

    res.status(200).json({ message: 'Archivos subidos correctamente' });

  } catch (error) {
    console.error('❌ Error al procesar la solicitud:', error);
    res.status(500).json({ message: 'Error al guardar las imágenes en la base de datos', error });
  }
});

module.exports = router;
