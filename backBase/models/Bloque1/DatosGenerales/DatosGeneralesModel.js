const pool = require('../../../config/db.config');

const DatosGeneralesModel = {
  async obtenerDatosGenerales(idAlterna) {
    const [datosGenerales] = await pool.query(
      "SELECT * FROM datos_generales WHERE ID_ALTERNA = ?",
      [idAlterna]
    );

    if (datosGenerales.length === 0) {
      return [];
    }

    for (const dato of datosGenerales) {
      // Estado Civil
      const [estadoCivil] = await pool.query(
        `SELECT descripcion FROM cat_edocivil WHERE clave = ?`,
        [dato.EST_CIV]
      );
      dato.estado_civil_descripcion = estadoCivil.length > 0 ? estadoCivil[0].descripcion : 'Estado civil no encontrado';

      // Entidad Nacimiento
      const [entidad] = await pool.query(
        `SELECT descripcion FROM cat_entidades WHERE id = ?`,
        [dato.NENTID]
      );
      dato.nombre_entidad_nacimiento = entidad.length > 0 ? entidad[0].descripcion : 'Entidad no encontrada';

      // Municipio Nacimiento
      const [municipio] = await pool.query(
        `SELECT descripcion FROM cat_municipios WHERE clave_estado = ? AND clave_municipio = ?`,
        [dato.NENTID, dato.NMUNIC]
      );
      dato.nombre_municipio_nacimiento = municipio.length > 0 ? municipio[0].descripcion : 'Municipio no encontrado';

      // País y Nacionalidad
      const [paisNacionalidad] = await pool.query(
        `SELECT pais, nacionalidad FROM cat_paises_nacionalidad WHERE clave = ?`,
        [dato.NPAIS]
      );
      dato.nombre_pais = paisNacionalidad.length > 0 ? paisNacionalidad[0].pais : 'País no encontrado';
      dato.nombre_nacionalidad = paisNacionalidad.length > 0 ? paisNacionalidad[0].nacionalidad : 'Nacionalidad no encontrada';

      // Escolaridad
      const [escolaridad] = await pool.query(
        `SELECT descripcion FROM cat_escolaridad WHERE clave = ?`,
        [dato.ESCOLARIDAD]
      );
      dato.escolaridad_descripcion = escolaridad.length > 0 ? escolaridad[0].descripcion : 'Escolaridad no encontrada';

      // Etnia
      const [etnia] = await pool.query(
        `SELECT descripcion FROM cat_etnia WHERE clave = ?`,
        [dato.ETNIA]
      );
      dato.etnia_descripcion = etnia.length > 0 ? etnia[0].descripcion : 'Etnia no encontrada';

      // Religión
      const [religion] = await pool.query(
        `SELECT descripcion FROM cat_religion WHERE clave = ?`,
        [dato.RELIGION]
      );
      dato.religion_descripcion = religion.length > 0 ? religion[0].descripcion : 'Religión no encontrada';

      // Estado Expediente
      const [estadoExpediente] = await pool.query(
        `SELECT descripcion FROM cat_estado_expediente WHERE clave = ?`,
        [dato.ESTADO_EXPEDIENTE]
      );
      dato.estado_expediente_descripcion = estadoExpediente.length > 0 ? estadoExpediente[0].descripcion : 'Estado de expediente no encontrado';

      // UBICACIÓN_INTERNO
      const [ubicacionInterno] = await pool.query(
        `SELECT descripcion FROM cat_ubicacion_interno WHERE clave = ?`,
        [dato.UBICACION_INTERNO]
      );
      dato.ubicacion_interno_descripcion = ubicacionInterno.length > 0 ? ubicacionInterno[0].descripcion : 'Ubicación no encontrada';

      // ID_HABLA_INDIGENA
      const [hablaIndigena] = await pool.query(
        `SELECT descripcion FROM cat_habla_indigena WHERE id_habla_indigena = ?`,
        [dato.ID_HABLA_INDIGENA]
      );
      dato.habla_indigena_descripcion = hablaIndigena.length > 0 ? hablaIndigena[0].descripcion : 'No encontrado';

      // ID_INDIGENA
      const [indigena] = await pool.query(
        `SELECT descripcion FROM cat_indigena WHERE id_indigena = ?`,
        [dato.ID_INDIGENA]
      );
      dato.indigena_descripcion = indigena.length > 0 ? indigena[0].descripcion : 'No encontrado';

      // ID_SENTENCIA_ABSOLUTORIA
      const [sentencia] = await pool.query(
        `SELECT descripcion FROM cat_sentencia_absolutoria WHERE id_sentencia_absolutoria = ?`,
        [dato.ID_SENTENCIA_ABSOLUTORIA]
      );
      dato.sentencia_absolutoria_descripcion = sentencia.length > 0 ? sentencia[0].descripcion : 'No encontrado';

      // ID_ANALFABETA
      const [analfabeta] = await pool.query(
        `SELECT descripcion FROM cat_analfabeta WHERE clave = ?`,
        [dato.ID_ANALFABETA]
      );
      dato.analfabeta_descripcion = analfabeta.length > 0 ? analfabeta[0].descripcion : 'No encontrado';
    }

    return datosGenerales;
  },
};

module.exports = DatosGeneralesModel;
