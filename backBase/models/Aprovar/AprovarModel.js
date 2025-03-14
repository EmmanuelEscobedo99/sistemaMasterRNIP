const pool = require( '../../config/db.config' );

const AprovarModel = {
  async aprovarRegistro( idAlterna ) {
    const result = await pool.query(
      "UPDATE movimientos SET PROCESADO = 0 WHERE ID_ALTERNA = ? AND ID_BLOQUE_FUNCIONAL IN (1,2)",
      [ idAlterna ]
    );
    return result;
  },
};

module.exports = AprovarModel;