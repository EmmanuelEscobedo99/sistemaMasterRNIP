const pool = require( '../../config/db.config' );

const RechazarModel = {
  async rechazarRegistro( idAlterna ) {
    const result = await pool.query(
      "UPDATE movimientos SET PROCESADO = 8 WHERE ID_ALTERNA = ? AND ID_BLOQUE_FUNCIONAL IN (1,2)",
      [ idAlterna ]
    );
    return result;
  },
  async rechazarRegistro2( LLAVE, FORMULARIO, CAMPO, DESCRIPCION ) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction(); // Inicia la transacción

      // Realizar el UPDATE en la tabla movimientos
      const resultUpdate = await connection.query(
        "UPDATE movimientos SET PROCESADO = 11 WHERE LLAVE = ? AND ID_BLOQUE_FUNCIONAL IN (6)",
        [ LLAVE ]
      );

      // Verificar que el UPDATE se haya realizado correctamente
      if ( resultUpdate.affectedRows === 0 ) {
        throw new Error( 'No se encontró el registro para actualizar' );
      }

      // Insertar en la tabla errores_formulario
      const resultInsert = await connection.query(
        "INSERT INTO errores_formulario (LLAVE, FORMULARIO, CAMPO, DESCRIPCION) VALUES (?, ?, ?, ?)",
        [ LLAVE, FORMULARIO, CAMPO, DESCRIPCION ]
      );

      // Confirmar la transacción
      await connection.commit();
      return { resultUpdate, resultInsert };
    } catch ( error ) {
      // En caso de error, revertir la transacción
      await connection.rollback();
      throw error;
    } finally {
      // Liberar la conexión
      connection.release();
    }
  }

};

module.exports = RechazarModel; // ✅ Asegurar que se exporta correctamente
