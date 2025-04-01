const pool = require('../../../config/db.config');

const obtenerIdAlternaModel = {
  async obtenerIdAlterna ( LLAVE ) {
    const result = await pool.query (
      "SELECT ID_ALTERNA FROM movimientos WHERE LLAVE = ? AND ID_BLOQUE_FUNCIONAL = 6",
      [ LLAVE ]
    );
    return result[0];
  },
};

module.exports = obtenerIdAlternaModel;