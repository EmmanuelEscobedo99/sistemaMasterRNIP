const pool = require('../../../config/db.config');

const EjecucionModel = {
  async obtenerEjecucion(idAlterna) {
    const result = await pool.query(
      "SELECT * FROM ejecucion WHERE ID_ALTERNA = ?",
      [idAlterna]
    );

    if (result[0].length === 0) {
      return [];
    }

    const ejecucion = result[0];

    for (const item of ejecucion) {
      // Buscar la descripción de tipo de resolución
      const [tipoResolucion] = await pool.query(
        "SELECT descripcion FROM cat_tipo_resolucion WHERE id_tipo_resolucion = ?",
        [item.ID_TIPO_RESOLUCION]
      );
      item.tipo_resolucion_descripcion = tipoResolucion.length > 0 ? tipoResolucion[0].descripcion : 'No encontrado';

      // Buscar la descripción de la entidad (estado)
      const [entidad] = await pool.query(
        "SELECT descripcion FROM cat_entidades WHERE id = ?",
        [item.ESTADO_LUG_PROCESO]
      );
      item.estado_lugar_proceso_descripcion = entidad.length > 0 ? entidad[0].descripcion : 'No encontrado';

      // Buscar la descripción del municipio usando clave estado y clave municipio
      const [municipio] = await pool.query(
        "SELECT descripcion FROM cat_municipios WHERE clave_estado = ? AND clave_municipio = ?",
        [item.ESTADO_LUG_PROCESO, item.MUNICIPIO_LUG_PROCESO]
      );
      item.municipio_lugar_proceso_descripcion = municipio.length > 0 ? municipio[0].descripcion : 'No encontrado';

      // Buscar la descripción del estatus de la situación penal actual
      const [estatusSituacion] = await pool.query(
        "SELECT descripcion FROM cat_estatus_situacion WHERE id_estatus_situacion = ?",
        [item.ID_ESTATUS_SITUACION]
      );
      item.estatus_situacion_descripcion = estatusSituacion.length > 0 ? estatusSituacion[0].descripcion : 'No encontrado';

      // Arreglar formato de fechas (convertir a YYYY-MM-DD)
      const formatFecha = (fecha) => (fecha ? new Date(fecha).toISOString().split('T')[0] : '');
      
      item.FECHA_EXTERNA = formatFecha(item.FECHA_EXTERNA);
      item.FECHA_REINGRESO = formatFecha(item.FECHA_REINGRESO);
      item.FECHA_EXT_REIN = formatFecha(item.FECHA_EXT_REIN);
    }

    return ejecucion;
  },
};

module.exports = EjecucionModel;
