const pool = require('../../../config/db.config');

const NombresModel = {
  async obtenerNombres ( idAlterna ) {
    const result = await pool.query (
      "SELECT * FROM nombres WHERE ID_ALTERNA = ?",
      [ idAlterna ]
    );
    return result;
  },
};

module.exports = NombresModel;