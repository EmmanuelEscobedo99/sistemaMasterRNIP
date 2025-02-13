const conexion = require('../../config/db.config');

const mostrarDatosModel = {
  async mostrarDatos() {
    try {
      const [rows] = await conexion.query('SELECT * FROM personas ORDER BY id DESC LIMIT 5');
      return rows;
    } catch (error) {
      console.error("Error al traer datos:", error);
      throw error;
    }
  },

  async buscarDatos(query) {
    try {
      const [rows] = await conexion.query(
        'SELECT * FROM personas WHERE nombre LIKE ? OR aPaterno LIKE ? OR aMaterno LIKE ?',
        [`%${query}%`, `%${query}%`, `%${query}%`]
      );
      return rows;
    } catch (error) {
      console.error("Error al buscar datos:", error);
      throw error;
    }
  },

  async traerDatoPorId(id) {
    try {
      const [rows] = await conexion.query('SELECT * FROM personas WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      console.error("Error al traer el dato:", error);
      throw error;
    }
  }
};

module.exports = mostrarDatosModel;