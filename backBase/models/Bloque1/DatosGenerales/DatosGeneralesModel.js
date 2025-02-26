const pool = require('../../../config/db.config');

const DatosGeneralesModel = {
  async obtenerDatosGenerales ( idAlterna ) {
    const result = await pool.query (
      "SELECT * FROM datos_generales WHERE ID_ALTERNA = ?",
      [ idAlterna ]
    );
    return result[0];
  },
};

module.exports = DatosGeneralesModel;