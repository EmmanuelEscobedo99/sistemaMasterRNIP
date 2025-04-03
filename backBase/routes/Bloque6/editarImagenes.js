const express = require('express');
const multer = require('multer');
const pool = require('../../config/db.config');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ Endpoint actualizado
router.put('/editar/:idAlterna', upload.any(), async (req, res) => {
  const { idAlterna } = req.params;
  const files = req.files;
  let grupos = req.body.grupo;

  // Asegurar que grupos sea un array
  if (!Array.isArray(grupos)) {
    grupos = [grupos];
  }

  if (!files || files.length === 0) {
    return res.status(400).json({ message: 'No se recibieron imágenes para actualizar.' });
  }

  try {
    const queryImagen = 'UPDATE imagenes SET IMAGEN = ? WHERE ID_ALTERNA = ? AND GRUPO = ?;';
    const queryMovimiento = 'UPDATE movimientos SET PROCESADO = 9 WHERE ID_ALTERNA = ? AND ID_BLOQUE_FUNCIONAL = 6;';

    // Asociar imágenes con su grupo por nombre
    for (let i = 0; i < files.length; i++) {
      const buffer = files[i].buffer;
      const grupo = grupos[i]; // Este grupo es correcto porque en FormData se envía en el mismo orden

      const [result] = await pool.query(queryImagen, [buffer, idAlterna, grupo]);
      if (result.affectedRows === 0) {
        console.warn(`⚠ No se encontró imagen para grupo ${grupo} e ID_ALTERNA ${idAlterna}`);
      }
    }

    await pool.query(queryMovimiento, [idAlterna]);

    res.status(200).json({ message: '✅ Imágenes y movimiento actualizados correctamente.' });
  } catch (error) {
    console.error('❌ Error al actualizar imágenes:', error);
    res.status(500).json({ message: 'Error al actualizar imágenes.', error });
  }
});

module.exports = router;
