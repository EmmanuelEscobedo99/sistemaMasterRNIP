const express = require('express');
const multer = require('multer');
const pool = require('../../config/db.config');

const router = express.Router();

// Configurar multer para manejar las imágenes
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Endpoint para editar imágenes
router.put('/editar/:idAlterna', upload.array('nuevaImagen', 10), async (req, res) => {
  const { idAlterna } = req.params;
  let grupos = req.body.grupo;

  // Asegurar que `grupos` sea un array
  if (!Array.isArray(grupos)) {
    grupos = [grupos];
  }

  const nuevasImagenes = req.files || [];

  if (!grupos || nuevasImagenes.length === 0) {
    return res.status(400).json({ message: 'Grupos e imágenes son obligatorios para actualizar.' });
  }

  try {
    const queryImagenes = 'UPDATE imagenes SET IMAGEN = ? WHERE ID_ALTERNA = ? AND GRUPO = ?;';
    const queryMovimientos = 'UPDATE movimientos SET procesado = 9 WHERE ID_ALTERNA = ? AND ID_BLOQUE_FUNCIONAL = 6;';

    // Actualizar las imágenes
    for (let i = 0; i < nuevasImagenes.length; i++) {
      const bufferImagen = nuevasImagenes[i].buffer;
      const grupo = grupos[i];

      const [resultImagen] = await pool.query(queryImagenes, [bufferImagen, idAlterna, grupo]);
      if (resultImagen.affectedRows === 0) {
        return res.status(404).json({
          message: `No se encontró la imagen para actualizar con el ID_ALTERNA y grupo ${grupo}.`,
        });
      }
    }

    // Actualizar el campo 'procesado' en la tabla 'movimientos'
    const [resultMovimientos] = await pool.query(queryMovimientos, [idAlterna]);
    if (resultMovimientos.affectedRows === 0) {
      return res.status(404).json({
        message: `No se encontró un movimiento para actualizar con el ID_ALTERNA ${idAlterna}.`,
      });
    }

    res.status(200).json({ message: 'Imágenes y movimiento actualizados exitosamente.' });
  } catch (error) {
    console.error('Error al actualizar las imágenes y movimiento:', error);
    res.status(500).json({ message: 'Error al actualizar las imágenes y el movimiento en la base de datos', error });
  }
});

module.exports = router;
