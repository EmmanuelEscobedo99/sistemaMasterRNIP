const pool = require('../../config/db.config');

const MovimientosService = {
  async generarIdAlternaPorLlave(llave) {
    try {
      const fecha_actualizacion = new Date();
      const hora_actual = fecha_actualizacion.toTimeString().split(' ')[0]; // Formato HH:MM:SS

      // 📌 Buscar el registro del interno con PROCESADO = 2 basado en su LLAVE
      const [rows] = await pool.query(
        `SELECT * FROM movimientos WHERE PROCESADO = 2 AND LLAVE = ? ORDER BY ID_ALTERNA DESC LIMIT 1`,
        [llave]
      );

      if (rows.length === 0) {
        throw new Error("No se encontró un interno con PROCESADO = 2 para la llave proporcionada.");
      }

      const interno = rows[0];

      // 📌 Obtener el último ID_ALTERNA en la base de datos y sumarle 1
      const [ultimoIdRows] = await pool.query(
        `SELECT COALESCE(MAX(CAST(ID_ALTERNA AS UNSIGNED)), 0) AS ultimo_id FROM movimientos`
      );
      const nuevoIdAlterna = parseInt(ultimoIdRows[0].ultimo_id, 10) + 1;

      console.log(`Nuevo ID_ALTERNA generado: ${nuevoIdAlterna}`);

      // 📌 Insertar un nuevo registro en `movimientos` con los datos del interno seleccionado
      await pool.query(
        `INSERT INTO movimientos (ID_ALTERNA, ESTADO_EMISOR, EMISOR, LLAVE, OPERACION, ESTATUS, FECHA_ACTUALIZACION, HORA, ID_BLOQUE_FUNCIONAL, PROCESADO)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, 6, 9)`,
        [
          nuevoIdAlterna,
          interno.ESTADO_EMISOR,
          interno.EMISOR,
          interno.LLAVE,
          interno.OPERACION,
          interno.ESTATUS,
          fecha_actualizacion,
          hora_actual
        ]
      );

      return nuevoIdAlterna;
    } catch (error) {
      console.error('Error al generar nuevo ID_ALTERNA:', error);
      throw error;
    }
  }
};

module.exports = MovimientosService;
