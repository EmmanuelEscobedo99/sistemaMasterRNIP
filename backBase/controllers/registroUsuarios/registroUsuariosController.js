const registroService = require("../../services/registroUsuario/registroService");

const registroUsuariosController = {
  async registro(req, res) {
    console.log("Cuerpo completo de la solicitud:", req.body);
   
    const { formulario1, formulario2, formulario3, formulario4 } = req.body;
    
     console.log("Formulario 1:", formulario1); 
     console.log("Formulario 2:", formulario2);
     console.log("Formulario 3:", formulario3);
     console.log("Formulario 4:", formulario4);

     const datosRegistro = {
      ...formulario1,
      ...formulario2,
      ...formulario3,
      ...formulario4
    };


      const usuario = req.user;
      console.log("Usuario decodificado:", usuario);

    try {
      const resultado = await registroService.registro(datosRegistro, usuario);

      if (resultado.success) {     
           console.log("resultado:", resultado.success);  
          res.status(200).json({ message: "Usuario registrado correctamente", status: 200 });
         }else {
          console.log("resultado:", resultado.success); 
          res.status(400).json({ message: "Error al registrar usuario", status: 400 });
         }
      // console.log("resultado:", resultado);
     // res.status(200).json({ message: "Usuario registrado correctamente" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al registrar usuario" });
    }
  }
};

module.exports = registroUsuariosController;