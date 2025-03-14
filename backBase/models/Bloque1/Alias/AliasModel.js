const pool = require('../../../config/db.config');

const AliasModel = {
  async obtenerAlias ( idAlterna ) {
    const result = await pool.query (
      "SELECT * FROM alias WHERE ID_ALTERNA = ?",
      [ idAlterna ]
    );
    return result;
  },
};

module.exports = AliasModel;