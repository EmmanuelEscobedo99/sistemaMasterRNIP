const pool = require('../../../config/db.config');

const IngresosModel = {
  async obtenerIngresos(idAlterna) {
    const result = await pool.query(
      "SELECT * FROM ingresos WHERE ID_ALTERNA = ?",
      [idAlterna]
    );

    for (let row of result[0]) {
      // Descripción EDO_PROCESO
      const [edoProcesoData] = await pool.query(
        "SELECT descripcion FROM cat_edoproce WHERE clave = ?",
        [row.EDO_PROCESO]
      );
      row.EDO_PROCESO_DESC = edoProcesoData.length > 0 ? edoProcesoData[0].descripcion : 'Sin descripción';

      // Descripción FUERO
      const [fueroData] = await pool.query(
        "SELECT descripcion FROM cat_fuero WHERE clave = ?",
        [row.FUERO]
      );
      row.FUERO_DESC = fueroData.length > 0 ? fueroData[0].descripcion : 'Sin descripción';

      // Descripción ID_TIPO_RESOLUCION
      const [tipoResolucionData] = await pool.query(
        "SELECT descripcion FROM cat_tipo_resolucion WHERE id_tipo_resolucion = ?",
        [row.ID_TIPO_RESOLUCION]
      );
      row.ID_TIPO_RESOLUCION_DESC = tipoResolucionData.length > 0 ? tipoResolucionData[0].descripcion : 'Sin descripción';

      // Descripción ESTADO_LUG_PROCESO
      const [estadoData] = await pool.query(
        "SELECT descripcion FROM cat_entidades WHERE id = ?",
        [row.ESTADO_LUG_PROCESO]
      );
      row.ESTADO_LUG_PROCESO_DESC = estadoData.length > 0 ? estadoData[0].descripcion : 'Sin descripción';

      // Descripción MUNICIPIO_LUG_PROCESO (requiere clave_estado y clave_municipio)
      const [municipioData] = await pool.query(
        "SELECT descripcion FROM cat_municipios WHERE clave_estado = ? AND clave_municipio = ?",
        [row.ESTADO_LUG_PROCESO, row.MUNICIPIO_LUG_PROCESO]
      );
      row.MUNICIPIO_LUG_PROCESO_DESC = municipioData.length > 0 ? municipioData[0].descripcion : 'Sin descripción';

      // Descripción ID_ESTATUS_SITUACION
      const [estatusSituacionData] = await pool.query(
        "SELECT descripcion FROM cat_estatus_situacion WHERE id_estatus_situacion = ?",
        [row.ID_ESTATUS_SITUACION]
      );
      row.ID_ESTATUS_SITUACION_DESC = estatusSituacionData.length > 0 ? estatusSituacionData[0].descripcion : 'Sin descripción';
    }

    return result[0];  // Retorna todos los ingresos con sus descripciones
  },
};

module.exports = IngresosModel;
