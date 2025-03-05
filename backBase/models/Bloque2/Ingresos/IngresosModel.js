const pool = require('../../../config/db.config');

const IngresosModel = {
  async obtenerIngresos ( idAlterna ) {
    const result = await pool.query (
      "SELECT * FROM ingresos WHERE ID_ALTERNA = ?",
      [ idAlterna ]
    );
    return result[0];
  },
};

module.exports = IngresosModel;