const pool = require('../../../config/db.config');

const JuridicosModel = {
  async obtenerJuridicos(idAlterna) {
    const [juridicos] = await pool.query(
      "SELECT * FROM juridicos WHERE ID_ALTERNA = ?",
      [idAlterna]
    );

    if (juridicos.length === 0) {
      return [];
    }

    for (const juridico of juridicos) {
      // Calidad Delincuencial
      const [calidad] = await pool.query(
        `SELECT descripcion FROM cat_calidad_delincuencial WHERE clave = ?`,
        [juridico.CALIDAD]
      );
      juridico.calidad_descripcion = calidad.length > 0 ? calidad[0].descripcion : 'No encontrada';

      // Autor
      const [autor] = await pool.query(
        `SELECT descripcion FROM cat_autor WHERE clave = ?`,
        [juridico.AUTOR]
      );
      juridico.autor_descripcion = autor.length > 0 ? autor[0].descripcion : 'No encontrada';

      // Autoria
      const [autoria] = await pool.query(
        `SELECT descripcion FROM cat_autoria WHERE clave = ?`,
        [juridico.AUTORIA]
      );
      juridico.autoria_descripcion = autoria.length > 0 ? autoria[0].descripcion : 'No encontrada';

      // Peligrosidad Criminal
      const [peligro] = await pool.query(
        `SELECT descripcion FROM cat_pelcriminal WHERE clave = ?`,
        [juridico.PELIGROC]
      );
      juridico.peligrosidad_descripcion = peligro.length > 0 ? peligro[0].descripcion : 'No encontrada';
    }

    return juridicos;
  },
};

module.exports = JuridicosModel;
