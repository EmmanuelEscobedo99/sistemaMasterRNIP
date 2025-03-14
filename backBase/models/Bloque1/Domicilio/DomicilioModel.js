const pool = require('../../../config/db.config');

const DomicilioModel = {
  async obtenerDomicilio(idAlterna) {
    // 1. Obtener el domicilio base
    const [domicilio] = await pool.query(
      "SELECT * FROM domicilio WHERE ID_ALTERNA = ?",
      [idAlterna]
    );

    if (domicilio.length === 0) {
      return [];
    }

    // 2. Para cada domicilio, traer el nombre de la entidad y municipio
    for (const dom of domicilio) {
      const [municipios] = await pool.query(
        `SELECT descripcion FROM cat_municipios 
         WHERE clave_estado = ? AND clave_municipio = ?`,
        [dom.DENTID, dom.DMUNIC]
      );

      // Si encuentra el municipio, lo agregamos al objeto
      dom.nombre_municipio = municipios.length > 0 ? municipios[0].descripcion : 'Municipio no encontrado';

      const [entidades] = await pool.query(
        `SELECT descripcion FROM cat_entidades 
         WHERE id = ?`,
        [dom.DENTID]
      );

      // Si encuentra la entidad, la agregamos al objeto
      dom.nombre_entidad = entidades.length > 0 ? entidades[0].descripcion : 'Entidad no encontrada';
    }

    return domicilio;
  },
};

module.exports = DomicilioModel;
