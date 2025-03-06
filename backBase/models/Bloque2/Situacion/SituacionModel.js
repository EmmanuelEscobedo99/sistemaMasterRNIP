const pool = require('../../../config/db.config');

const SituacionModel = {
  async obtenerSituacion(idAlterna) {
    console.log(idAlterna);
    const [situacion] = await pool.query(
      "SELECT * FROM situacion WHERE ID_ALTERNA = ?",
      [idAlterna]
    );

    if (situacion.length === 0) {
      return [];
    }

    for (const dato of situacion) {
      // Clasificación Jurídica
      const [clasificacion] = await pool.query(
        `SELECT descripcion FROM cat_clasificacion WHERE clave = ?`,
        [dato.CLASIFICA]
      );
      dato.clasificacion_descripcion = clasificacion.length > 0 ? clasificacion[0].descripcion : 'Clasificación no encontrada';

      // Peligrosidad
      const [peligrosidad] = await pool.query(
        `SELECT descripcion FROM cat_peligrosidad WHERE clave = ?`,
        [dato.PELIGRO]
      );
      dato.peligrosidad_descripcion = peligrosidad.length > 0 ? peligrosidad[0].descripcion : 'Peligrosidad no encontrada';

      // Fuero
      const [fuero] = await pool.query(
        `SELECT descripcion FROM cat_fuero WHERE clave = ?`,
        [dato.FUERO]
      );
      dato.fuero_descripcion = fuero.length > 0 ? fuero[0].descripcion : 'Fuero no encontrado';

      // Delito
      const [delito] = await pool.query(
        `SELECT descripcion FROM cat_delitos WHERE clave = ?`,
        [dato.DELITO]
      );
      dato.delito_descripcion = delito.length > 0 ? delito[0].descripcion : 'Delito no encontrado';
    }

    return situacion;
  },
};

module.exports = SituacionModel;
