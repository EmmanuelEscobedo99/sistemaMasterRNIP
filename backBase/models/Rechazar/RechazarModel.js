const pool = require( '../../config/db.config' );

const RechazarModel = {
  async rechazarRegistro( idAlterna ) {
    const result = await pool.query(
      "UPDATE movimientos SET PROCESADO = 7 WHERE ID_ALTERNA = ? AND ID_BLOQUE_FUNCIONAL IN (1,2)",
      [ idAlterna ]
    );
    return result;
  },
  async rechazarRegistro2( newIdAlterna ) {
    const result = await pool.query(
      "UPDATE movimientos SET PROCESADO = 11 WHERE ID_ALTERNA = ? AND ID_BLOQUE_FUNCIONAL IN (6)",
      [ newIdAlterna ]
    );
    return result;
  },
};

module.exports = RechazarModel;