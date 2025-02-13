const registroUsuariosModel = require('../../models/registroUsuario/registroUsuariosModel')

const registroService = {
  





  async  registro( datosRegistro, usuario) {
    
  console.log("datos del usuario",usuario)
    try {

      const resultado = await registroUsuariosModel.registrar(datosRegistro,usuario);
      return resultado;

    //  return { message: 'Usuario registrado exitosamente', data: datosUsuario }; 
    } catch (error) {
      console.error(error)
      throw error;
    }
    

   
  }
};

module.exports = registroService;