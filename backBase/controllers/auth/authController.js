const AuthService = require('../../services/auth/authService');

const AuthController = {
  async login(req, res) {
    try {
      const { correo, clave, maquina, storedEmail } = req.body;
      console.log("datos de login controller:", correo, clave, maquina, storedEmail);
      const { rol, email } = await AuthService.login(correo, clave, maquina,storedEmail , res);

      // Responder solo con el rol y el correo del usuario
      res.json({ rol, email });
    } catch (error) {
      const statusCode = error.status || 500;
      const errorMessage = error.message || 'Error en el servidor';
      const rol = error.rol || 'No definido';
      const errorDetails = error.details || null;

      // Agregar console.log para depuración
      console.error('Error en el login:', error);

      if (!res.headersSent) {
        res.status(statusCode).json({
          statusCode,
          errorMessage,
          rol,
          errorDetails,
        });
      }
    }
  },

  async salir(req, res) {
    try {
      const { email } = req.body;
      console.log("logout controller:", email);
      const result = await AuthService.salir(email);

      if (result.affectedRows > 0) {
        // Responder con éxito
        res.json({ message: 'Sesión cerrada exitosamente jj' });
      } else {
        // Responder con error
        res.status(500).json({ message: 'Error al cerrar sesión' });
      }
    } catch (error) {
      const statusCode = error.status || 500;
      const errorMessage = error.message || 'Error en el servidor';

      // Agregar console.log para depuración
      console.error('Error al cerrar sesión:', error);

      if (!res.headersSent) {
        res.status(statusCode).json({
          statusCode,
          errorMessage,
        });
      }
    }
  },

  async auth(req, res) {
    try {
      const { datos } = req.body; 
      const { correo, maquina } = datos;
      console.log("auth controller inicio:", correo, maquina);

      const result = await AuthService.auth(correo, maquina);
      if (result) {
        // Establecer la cookie con el token
        res.cookie('token', result.token, {
          httpOnly: true, // Asegura que la cookie no sea accesible desde JavaScript en el navegador
          secure: process.env.NODE_ENV === 'production', // Asegura que la cookie solo se envíe a través de HTTPS en producción
          maxAge: 3600000 // 1 hora
        });
        res.json({ message: 'Autenticación creada con éxito', user: result.user });
      } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
  },




  async usuHistorico(req, res) {
    try {
      const { email } = req.body;
      const user = await AuthService.usuHistorico(email);
      if (user) {
        res.json({ clave: user.clave });
      } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error en el servidor' });
    }
  },



};

module.exports = AuthController;