const pool = require('../../../config/db.config');

const DatosGeneralesModel = {
  async obtenerIdAlterna ( LLAVE ) {
    const result = await pool.query (
      "SELECT ID_ALTERNA FROM movimientos WHERE LLAVE = ? AND ID_BLOQUE_FUNCIONAL = 1",
      [ LLAVE ]
    );
    return result[0];
  },
};

module.exports = DatosGeneralesModel;