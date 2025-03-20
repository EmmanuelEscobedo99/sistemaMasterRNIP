const pool = require('../../config/db.config');

const RechazarModel = {
  async rechazarRegistro(idAlterna) {
    const result = await pool.query(
      "UPDATE movimientos SET PROCESADO = 8 WHERE ID_ALTERNA = ? AND ID_BLOQUE_FUNCIONAL IN (1,2)",
      [idAlterna]
    );
    return result;
  },
  async rechazarRegistro2( LLAVE ) {
    const result = await pool.query(
      "UPDATE movimientos SET PROCESADO = 11 WHERE LLAVE = ? AND ID_BLOQUE_FUNCIONAL IN (6)",
      [ LLAVE ]
    );
    return result;
  },
};

module.exports = RechazarModel; // ✅ Asegurar que se exporta correctamente
