const express = require('express');
const pool = require('../../config/db.config');

const router = express.Router();

router.get('/huellas/:idAlterna', async (req, res) => {
    const { idAlterna } = req.params;
    try {
        const query = "SELECT IMAGEN, GRUPO FROM imagenes WHERE ID_ALTERNA = ? AND GRUPO IN ('1', '2', '3', '4', '5', '6', '7', '8', '9', '0');";
        
        const [results] = await pool.query(query, [idAlterna]);

        if (results.length === 0) {
            return res.status(200).json({status:404, message: 'No se encontraron huellas con esa ID_ALTERNA.' });
        }
 
        // Convertir las imágenes a base64
        const imagesWithBase64 = results.map((row) => {
            const base64Image = Buffer.from(row.IMAGEN).toString('base64');
            return {
                grupo: row.GRUPO,
                imagen: `data:image/jpeg;base64,${base64Image}`
            };
        });

        // console.log(imagesWithBase64)

        // Enviar imágenes y sus grupos
        res.status(200).json(imagesWithBase64);
    } catch (error) {
        console.error('Error al obtener imágenes:', error);
        res.status(500).json({ message: 'Error al obtener imágenes de la base de datos', error });
    }
});

module.exports = router;
