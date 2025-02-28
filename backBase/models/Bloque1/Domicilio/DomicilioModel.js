const pool = require('../../../config/db.config');

const DomicilioModel = {
  async obtenerDomicilio ( idAlterna ) {
    const result = await pool.query (
      "SELECT * FROM domicilio WHERE ID_ALTERNA = ?",
      [ idAlterna ]
    );
    return result[0];
  },
};

module.exports = DomicilioModel;