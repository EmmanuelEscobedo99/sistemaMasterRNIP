const pool = require('../../config/db.config');

const buscarInternosModel = {
  async obtenerInternos(procesado) {
    try {
      const [movimientos] = await pool.query(`
        SELECT LLAVE, MAX(FECHA_ACTUALIZACION) AS ULTIMA_FECHA
        FROM movimientos 
        WHERE PROCESADO = ?
        GROUP BY LLAVE
      `, [procesado]);

      if (movimientos.length === 0) {
        return [];
      }

      const resultados = await Promise.all(movimientos.map(async ({ LLAVE, ULTIMA_FECHA }) => {
        const [fila] = await pool.query(`
          SELECT ID_ALTERNA, LLAVE 
          FROM movimientos 
          WHERE LLAVE = ? AND FECHA_ACTUALIZACION = ? AND PROCESADO = ?
          LIMIT 1
        `, [LLAVE, ULTIMA_FECHA, procesado]);

        return fila.length > 0 ? fila[0] : null;
      }));

      const idAlternas = resultados.filter(item => item !== null).map(item => item.ID_ALTERNA);

      if (idAlternas.length === 0) {
        return [];
      }

      const [nombres] = await pool.query(`
        SELECT ID_ALTERNA, DNOMBRE, DPATERNO, DMATERNO 
        FROM nombres 
        WHERE ID_ALTERNA IN (?)
      `, [idAlternas]);

      const nombresAgrupados = nombres.reduce((acc, { ID_ALTERNA, DNOMBRE, DPATERNO, DMATERNO }) => {
        if (!acc[ID_ALTERNA]) {
          acc[ID_ALTERNA] = { ID_ALTERNA, nombres: [] };
        }
        acc[ID_ALTERNA].nombres.push({ DNOMBRE, DPATERNO, DMATERNO });
        return acc;
      }, {});

      return Object.values(nombresAgrupados);
    } catch (error) {
      console.error("Error en obtenerInternos:", error);
      throw error;
    }
  },
};

module.exports = buscarInternosModel;
