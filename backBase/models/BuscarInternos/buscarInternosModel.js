const pool = require('../../config/db.config');

const buscarInternosModel = {
  async obtenerInternos() {
    try {
      // Primera consulta: Obtener todos los ID_ALTERNA donde PROCESADO = 6
      const [movimientos] = await pool.query(
        "SELECT ID_ALTERNA FROM movimientos WHERE PROCESADO = 6"
      );

      // Verificar si hay resultados antes de hacer la segunda consulta
      if (movimientos.length === 0) {
        return []; // Retornar un array vacío si no hay resultados
      }

      // Obtener la lista de ID_ALTERNA
      const idsAlterna = movimientos.map(mov => mov.ID_ALTERNA);

      // Segunda consulta: Obtener datos de datos_generales para cada ID_ALTERNA
      const consultas = idsAlterna.map(id =>
        pool.query("SELECT * FROM nombres WHERE ID_ALTERNA = ?", [id])
      );

      // Ejecutar todas las consultas en paralelo
      const resultados = await Promise.all(consultas);

      // Formatear resultados ya que Promise.all devuelve un array de arrays
      const datosGenerales = resultados.map(res => res[0]);

      return datosGenerales;
    } catch (error) {
      console.error("Error en obtenerInternos:", error);
      throw error;
    }
  },
};

module.exports = buscarInternosModel;
