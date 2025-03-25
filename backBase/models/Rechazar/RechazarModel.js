const pool = require('../../config/db.config');

const RechazarModel = {
  async rechazarRegistro(ID_ALTERNA, FORMULARIO, CAMPO, DESCRIPCION) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      // Obtener LLAVE automáticamente
      const [rows] = await connection.query(
        'SELECT LLAVE FROM movimientos WHERE ID_ALTERNA = ? LIMIT 1',
        [ID_ALTERNA]
      );
      if (rows.length === 0 || !rows[0].LLAVE) {
        throw new Error('No se encontró LLAVE para el ID_ALTERNA proporcionado');
      }
      const LLAVE = rows[0].LLAVE;

      const resultUpdate = await connection.query(
        "UPDATE movimientos SET PROCESADO = 8 WHERE ID_ALTERNA = ? AND ID_BLOQUE_FUNCIONAL IN (1,2)",
        [ID_ALTERNA]
      );

      const resultInsert = await connection.query(
        "INSERT INTO errores_formulario (LLAVE, FORMULARIO, CAMPO, DESCRIPCION) VALUES (?, ?, ?, ?)",
        [LLAVE, FORMULARIO, CAMPO, DESCRIPCION]
      );

      await connection.commit();
      return { resultUpdate, resultInsert };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },

  async rechazarRegistro2(LLAVE, FORMULARIO, CAMPO, DESCRIPCION) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      const resultUpdate = await connection.query(
        "UPDATE movimientos SET PROCESADO = 11 WHERE LLAVE = ? AND ID_BLOQUE_FUNCIONAL IN (6)",
        [LLAVE]
      );

      const resultInsert = await connection.query(
        "INSERT INTO errores_formulario (LLAVE, FORMULARIO, CAMPO, DESCRIPCION) VALUES (?, ?, ?, ?)",
        [LLAVE, FORMULARIO, CAMPO, DESCRIPCION]
      );

      await connection.commit();
      return { resultUpdate, resultInsert };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },

  async obtenerLlaveDesdeIdAlterna(idAlterna) {
    try {
      const [rows] = await pool.query(
        'SELECT LLAVE FROM movimientos WHERE ID_ALTERNA = ? LIMIT 1',
        [idAlterna]
      );
      return rows.length > 0 ? rows[0].LLAVE : null;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = RechazarModel;
