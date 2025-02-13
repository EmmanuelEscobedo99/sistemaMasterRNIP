const jwt = require('jsonwebtoken');
const AuthModel = require('../../models/auth/AuthModel');

const AuthService = {
  async login(correo, clave, maquina, storedEmail, res) {
    console.log("datos de login service:", correo, clave, maquina, storedEmail);

    const resMaquina = await AuthModel.findByMaquina(maquina);
    if (!resMaquina) {
      throw {
        status: 404,
        message: 'maquina no encontrada',
      };
    }

  // validar si llego storedEmail

  // Validar si llegó storedEmail 
  if (storedEmail) {
      console.log("storedEmail llegando al backend:", storedEmail); // Llamar al modelo para eliminar el token 
      try 
      { 
         await AuthModel.eliminarToken(storedEmail); 
          console.log(`Token eliminado para el email: ${storedEmail}`); 
        } catch (error) {
           console.error('Error al eliminar el token:', error); 
            throw { status: 500, message: 'Error al eliminar el token', };
 
        }
      }




    const user = await AuthModel.findByEmail(correo);
    console.log("usuario encontrado:", user);

    if (!user) {
      throw {
        status: 404,
        message: 'usuario no encontrado',
      };
    }

    if (Number(user.token) === 1) {
      throw {
        status: 403,
        message: 'Este usuario ya tiene una sesión activa',
      };
    } 

    const isPasswordValid = clave === user.clave;
    if (!isPasswordValid) {
      throw {
        status: 401,
        message: 'contraseña incorrecta',
      };
    }

    // Generar el nuevo token JWT
    const token = jwt.sign({
      id: user.id,
      nombre: user.nombre,
      apellido: user.apellido,
      roles: user.rol,
      estado: user.estado,
      ipmaquina: maquina
    }, 'jj', { expiresIn: '1h' });

    if (!token) {
      throw new Error('Error al generar el token');
    }

    console.log("token creado:", token);

    // Guardar el valor 1 en la base de datos
    await AuthModel.insertarToken(1, correo);

    // Guardar el token en una cookie HttpOnly
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000, // 1 hora
    });

    // Devolver el rol y el correo del usuario
    return { rol: user.rol, email: user.correo };
  },

  async salir(email) {    
    const result = await AuthModel.actualizarToken(email);
    return result;
  },


  async auth(correo, maquina) {    
    console.log("auth service inicio:", correo, maquina);
    const user = await AuthModel.findByEmail(correo);
   
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    
    const token = jwt.sign({
      id: user.id,
      nombre: user.nombre,
      apellido: user.apellido,
      roles: user.rol,
      estado: user.estado,
      ipmaquina: maquina,
      correo: user.correo
    }, 'jj', { expiresIn: '1h' });

    console.log("el token ha sido creado:", token);
   
    return {
      token,
      user
    };
  },


  async usuHistorico(email) {
    try {
      const user = await AuthModel.findByEmailUsuario(email);
      if (user) {
        return {clave: user.clave };
      } else {
        throw new Error('Usuario no encontrado');
      }
    } catch (error) {
      console.error('Error en AuthService.verificarCorreo:', error);
      throw error;
    }
  },





}

module.exports = AuthService;
