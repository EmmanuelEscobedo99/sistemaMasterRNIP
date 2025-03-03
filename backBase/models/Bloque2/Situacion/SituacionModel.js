const pool = require('../../../config/db.config');

const SituacionModel = {
  async obtenerSituacion ( idAlterna ) {
    console.log(idAlterna)
    const result = await pool.query (
      "SELECT * FROM situacion WHERE ID_ALTERNA = ?",
      [ idAlterna ]
    );
    return result[0];
  },
};

module.exports = SituacionModel;