const pool = require('../../config/db.config');

const TraerImagenesModel = {
  async obtenerImagenesPorLlave(llave) {
    const connection = await pool.getConnection();
    try {
      console.log('🔍 Buscando ID_ALTERNA con LLAVE:', llave);

      // Buscar el ID_ALTERNA con ID_BLOQUE_FUNCIONAL = 6
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
      console.log(`✅ ID_ALTERNA encontrado para LLAVE ${llave}: ${idAlternaBloque6}`);

      // Traer imágenes de ese ID_ALTERNA
      const [imagenes] = await connection.query(`
        SELECT *
        FROM imagenes
        WHERE ID_ALTERNA = ?
      `, [idAlternaBloque6]);

      console.log(`🖼️ Total de imágenes encontradas: ${imagenes.length}`);
      return imagenes;

    } catch (error) {
      console.error('❌ Error en TraerImagenesModel:', error);
      throw error;
    } finally {
      connection.release();
    }
  }
};

module.exports = TraerImagenesModel;
