const pool = require('../../../config/db.config');

const EjecucionModel = {
  async obtenerEjecucion ( idAlterna ) {
    const result = await pool.query (
      "SELECT * FROM ejecucion WHERE ID_ALTERNA = ?",
      [ idAlterna ]
    );
    return result[0];
  },
};

module.exports = EjecucionModel;