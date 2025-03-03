const pool = require('../../../config/db.config');

const JuridicosModel = {
  async obtenerJuridicos ( idAlterna ) {
    const result = await pool.query (
      "SELECT * FROM juridicos WHERE ID_ALTERNA = ?",
      [ idAlterna ]
    );
    return result[0];
  },
};

module.exports = JuridicosModel;