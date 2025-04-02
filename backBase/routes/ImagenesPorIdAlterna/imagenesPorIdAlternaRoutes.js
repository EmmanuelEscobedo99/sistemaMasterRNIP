const express = require('express');
const router = express.Router();
const pool = require('../../config/db.config');

router.get('/:id', async (req, res) => {
  const idAlterna = req.params.id;

  try {
    const [imagenes] = await pool.query(
      `SELECT grupo, imagen FROM imagenes WHERE id_alterna = ? AND grupo IN ('A', 'B', 'C')`,
      [idAlterna]
    );

    const resultado = imagenes.map((img) => ({
      grupo: img.grupo,
      imagen: `data:image/jpeg;base64,${img.imagen.toString('base64')}`
    }));

    res.json(resultado);
  } catch (error) {
    console.error('Error al obtener imágenes:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

module.exports = router;

