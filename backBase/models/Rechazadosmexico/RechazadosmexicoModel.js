const pool = require('../../config/db.config');

const RechazadosMexicoModel = {
  async obtenerRechazadosMexico() {
    try {
      const [rows] = await pool.query(`
        SELECT DISTINCT 
          m.ID_ALTERNA, m.LLAVE,
          n.DNOMBRE, n.DPATERNO, n.DMATERNO
        FROM movimientos m
        INNER JOIN nombres n ON m.ID_ALTERNA = n.ID_ALTERNA
        WHERE m.PROCESADO = 3
        ORDER BY m.LLAVE
      `);
      return rows;
    } catch (error) {
      console.error("Error en obtenerRechazadosMexico:", error);
      throw error;
    }
  }
};

module.exports = RechazadosMexicoModel;
