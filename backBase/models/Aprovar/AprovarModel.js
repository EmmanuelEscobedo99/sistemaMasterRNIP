const pool = require('../../config/db.config');

const AprovarModel = {
  async aprovarRegistro(idAlterna, nuevoProcesado) {
    const result = await pool.query(
      "UPDATE movimientos SET PROCESADO = ? WHERE ID_ALTERNA = ? AND ID_BLOQUE_FUNCIONAL IN (1,2)",
      [nuevoProcesado, idAlterna]
    );
    return result;
  },
  async aprovarRegistro2(newIdAlterna, nuevoProcesado) {
    const result = await pool.query(
      "UPDATE movimientos SET PROCESADO = ? WHERE ID_ALTERNA = ? AND ID_BLOQUE_FUNCIONAL IN (6)",
      [nuevoProcesado, newIdAlterna]
    );
    return result;
  },
};

module.exports = AprovarModel;
