const pool = require('../../../config/db.config');

const IngdelitoModel = {
  async obtenerIngdelito(idAlterna) {
    const query = `
      SELECT i.*, 
             c.descripcion AS DELITO_DESC,
             m.id_desmod,
             r.descripcion AS RESPONSABILIDAD_DESC
      FROM ingdelito i
      LEFT JOIN cat_delitos c 
        ON i.DELITO = c.clave
      LEFT JOIN cat_modalidad m
        ON i.DELITO = m.id_delito
        AND i.MODALIDAD = m.id_modalidad
      LEFT JOIN responsabilidad r
        ON i.RESPONSABILIDAD = r.clave
      WHERE i.ID_ALTERNA = ?;
    `;

    const result = await pool.query(query, [idAlterna]);
    return result;
  },
};

module.exports = IngdelitoModel;
