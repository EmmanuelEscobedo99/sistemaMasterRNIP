const pool = require('../../../config/db.config');

const ODelitoModel = {
  async obtenerODelito ( idAlterna ) {
    const result = await pool.query (
      "SELECT * FROM odelito WHERE ID_ALTERNA = ?",
      [ idAlterna ]
    );
    return result;
  },
};

module.exports = ODelitoModel;