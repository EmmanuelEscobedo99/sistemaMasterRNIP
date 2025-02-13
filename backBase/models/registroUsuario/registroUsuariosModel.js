const conexion = require('../../config/db.config');

const registroUsuariosModel = {
  async registrar(datosRegistro, usuario) {
    const { nombre, aPaterno, aMaterno, edad, tatuajes, colorCabello, direccion, auto, casa, estadoCivil, hijos, estudios } = datosRegistro;
   
    console.log("nombre ",nombre)
    console.log("aPaterno ",aPaterno)
    console.log("aMaterno ",aMaterno)
    console.log("edad ",edad)
    console.log("tatuajes ",tatuajes)
    console.log("colorCabello ",colorCabello)
    console.log("direccion ",direccion)
    console.log("auto ",auto)
    console.log("casa ",casa)
    
    // Obtén la fecha y hora actuales
    const fechaHoraActual = new Date();
    const fecha = fechaHoraActual.toISOString().split('T')[0]; // Obtiene la fecha en formato YYYY-MM-DD
    const hora = fechaHoraActual.toTimeString().split(' ')[0]; // Obtiene la hora en formato HH:MM:SS

    console.log("Fecha actual: ", fecha);
    console.log("Hora actual: ", hora);

   

    const { id, nombre: nombreDecodificado, apellido, roles, estado, ipmaquina } = usuario;
    const tabla_involucrada = 'personas';

    console.log("query", nombre, aPaterno, aMaterno);

    const connection = await conexion.getConnection();
    try {
      await connection.beginTransaction();

      // Primer INSERT en la tabla personas
      const [resultadoPersonas] = await connection.query(
        'INSERT INTO personas (nombre, aPaterno, aMaterno, edad, tatuajes, colorCabello, direccion, auto, casa, estadoCivil, hijos, estudios) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [nombre, aPaterno, aMaterno, edad, tatuajes, colorCabello, direccion, auto, casa, estadoCivil, hijos, estudios]
      );

      if (resultadoPersonas.affectedRows === 1) {
        const idPersona = resultadoPersonas.insertId; // Obtener el id del registro insertado

        // Segundo INSERT en la tabla movimientos
        const [resultadoMovimientos] = await connection.query(
          'INSERT INTO movimientos (usuario_id, nombre, apellido, tabla_involucrada, tipo_movimiento, ip_maquina, id_involucrado, fecha, hora) VALUES (?,?,?, ?, ?, ?, ?, ?, ?)',
          [id, nombreDecodificado, apellido, tabla_involucrada, 'registro', ipmaquina, idPersona, fecha, hora]
        );

        if (resultadoMovimientos.affectedRows === 1) {
          await connection.commit();
          return {
            success: true,
            insertId: idPersona
          };
        } else {
          await connection.rollback();
          return { success: false };
        }
      } else {
        await connection.rollback();
        return { success: false };
      }
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
};

module.exports = registroUsuariosModel;