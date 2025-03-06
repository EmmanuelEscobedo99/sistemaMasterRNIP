const pool = require('../../../config/db.config');

const ODelitoModel = {
  async obtenerODelito(idAlterna) {
    const result = await pool.query(
      "SELECT * FROM odelito WHERE ID_ALTERNA = ?",
      [idAlterna]
    );

    // Procesamos cada fila para enriquecer con descripciones y el id_desmod
    for (let row of result[0]) {
      // Obtener descripción del delito
      const [delitoData] = await pool.query(
        "SELECT descripcion FROM cat_delitos WHERE clave = ?",
        [row.DELITO]
      );
      row.DELITO_DESC = delitoData.length > 0 ? delitoData[0].descripcion : 'Sin descripción';

      // Obtener id_desmod desde cat_modalidad usando modalidad y delito
      const [modalidadData] = await pool.query(
        "SELECT id_desmod FROM cat_modalidad WHERE id_modalidad = ? AND id_delito = ?",
        [row.MODALIDAD, row.DELITO]
      );
      row.ID_DESMOD = modalidadData.length > 0 ? modalidadData[0].id_desmod : null;

      // Obtener descripción de la responsabilidad jurídica (RESPONJUR)
      const [responsabilidadData] = await pool.query(
        "SELECT descripcion FROM responsabilidad WHERE clave = ?",
        [row.RESPONJUR]
      );
      row.RESPONJUR_DESC = responsabilidadData.length > 0 ? responsabilidadData[0].descripcion : 'Sin descripción';
    }

    return result;
  },
};

module.exports = ODelitoModel;
