const pool = require('../../../config/db.config');

const IngdelitoModel = {
  async obtenerIngdelito ( idAlterna ) {
    const result = await pool.query (
      "SELECT * FROM ingdelito WHERE ID_ALTERNA = ?",
      [ idAlterna ]
    );
    return result;
  },
};

module.exports = IngdelitoModel;