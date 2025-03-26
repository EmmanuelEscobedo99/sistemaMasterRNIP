const pool = require('../../config/db.config');

const TraerImagenesModel = {
  async obtenerImagenesPorLlave(llave) {
    const connection = await pool.getConnection();
    try {
      console.log('🔍 Buscando ID_ALTERNA con LLAVE:', llave);

      // 1. Buscar el ID_ALTERNA más reciente con ID_BLOQUE_FUNCIONAL = 6
      const [idResult] = await connection.query(`
        SELECT ID_ALTERNA
        FROM movimientos
        WHERE LLAVE = ?
          AND ID_BLOQUE_FUNCIONAL = 6
        ORDER BY ID_ALTERNA DESC
        LIMIT 1
      `, [llave]);

      if (idResult.length === 0) {
        console.log(`⚠️ No se encontró ningún ID_ALTERNA con LLAVE ${llave} en ID_BLOQUE_FUNCIONAL = 6`);
        return [];
      }

      const idAlternaBloque6 = idResult[0].ID_ALTERNA;
      console.log(`✅ ID_ALTERNA encontrado: ${idAlternaBloque6}`);

      // 2. Obtener las imágenes
      const [imagenes] = await connection.query(`
        SELECT IMAGEN, GRUPO
        FROM imagenes
        WHERE ID_ALTERNA = ?
      `, [idAlternaBloque6]);

      console.log(`🖼️ Total de imágenes encontradas: ${imagenes.length}`);

      // 3. Convertir las imágenes a base64
      const imagenesConvertidas = imagenes.map((row) => {
        const base64 = Buffer.from(row.IMAGEN).toString('base64');
        return {
          grupo: row.GRUPO,
          imagen: `data:image/jpeg;base64,${base64}`
        };
      });

      return imagenesConvertidas;

    } catch (error) {
      console.error('❌ Error en TraerImagenesModel:', error);
      throw error;
    } finally {
      connection.release();
    }
  }
};

module.exports = TraerImagenesModel;
