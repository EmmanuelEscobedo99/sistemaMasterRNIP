const express = require('express');
const multer = require('multer');
const pool = require('../../config/db.config');

const router = express.Router(); // ✅ Se debe definir antes de usar `router`

// Configurar multer para manejar las imágenes
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ Endpoint para actualizar imágenes sin verificaciones
router.put('/editar/:idAlterna', upload.array('nuevaImagen', 3), async (req, res) => {
  const { idAlterna } = req.params;
  let grupos = req.body.grupo; 

  console.log("📥 ID Alterna:", idAlterna);
  console.log("📥 Datos recibidos en el backend:", req.body);
  console.log("📥 Archivos recibidos en el backend:", req.files);

  // Asegurar que `grupos` sea un array
  if (!Array.isArray(grupos)) {
    grupos = [grupos];
  }

  if (!grupos || req.files.length === 0) {
    return res.status(400).json({ message: 'Se deben proporcionar imágenes y grupos para actualizar.' });
  }

  try {
    const query = 'UPDATE imagenes SET IMAGEN = ? WHERE ID_ALTERNA = ? AND GRUPO = ?;';

    req.files.forEach((imagen, index) => {
      // 🔹 Corregimos la asignación del grupo con -1
      const grupoIndex = index;
      const grupo = grupos[grupoIndex] || grupos[index]; 

      console.log(`📥 Imagen recibida en backend - Nombre: ${imagen.originalname}, Índice: ${index}, Grupo: ${grupo}`);

      if (!grupo) {
        console.warn(`⚠️ No se recibió el grupo para la imagen ${index}`);
        return;
      }

      console.log(`📌 Actualizando imagen en grupo ${grupo}`);

      pool.query(query, [imagen.buffer, idAlterna, grupo], (err, result) => {
        if (err) {
          console.error(`❌ Error al actualizar imagen en grupo ${grupo}:`, err);
        } else if (result.affectedRows === 0) {
          console.warn(`⚠️ No se encontró la imagen para actualizar con ID_ALTERNA ${idAlterna} y grupo ${grupo}.`);
        }
      });
    });

    res.status(200).json({ message: 'Imágenes actualizadas correctamente.' });
  } catch (error) {
    console.error('❌ Error al actualizar las imágenes:', error);
    res.status(500).json({ message: 'Error al actualizar las imágenes en la base de datos', error });
  }
});

module.exports = router; // ✅ Se debe exportar el router
