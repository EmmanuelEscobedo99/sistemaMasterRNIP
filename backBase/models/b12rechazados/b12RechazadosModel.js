const pool = require('../../config/db.config');

const obtenerInternosB12Rechazados = async () => {
  const [rows] = await pool.query(`
    SELECT 
      m.ID_ALTERNA, m.LLAVE,
      n.DNOMBRE, n.DPATERNO, n.DMATERNO
    FROM movimientos m
    INNER JOIN nombres n ON m.ID_ALTERNA = n.ID_ALTERNA
    WHERE m.PROCESADO = 8 AND m.ID_BLOQUE_FUNCIONAL IN (1, 2)
  `);

  return rows;
};

module.exports = {
  obtenerInternosB12Rechazados,
};
