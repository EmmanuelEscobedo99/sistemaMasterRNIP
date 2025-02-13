const pool = require('../../config/db.config');
const bcrypt = require('bcrypt');

const AuthModel = {
        async findAll() {
        
        const [rows] = await pool.query('SELECT * FROM usuarios');
        return rows;
      },
 
      //maquina
      async findByMaquina(maquina) {        
        const [rows] = await pool.query('SELECT * FROM ipmaquina WHERE ipMaquina = ?', [maquina]);
        return rows[0];
      },

      async findByEmailUsuario(correo) {        
        const [rows] = await pool.query('SELECT clave  FROM usuarios WHERE CORREO = ?', [correo]);
        return rows[0];
      },


      async findByEmail(correo) {        
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE CORREO = ?', [correo]);
        return rows[0];
      },
    
      async create(user) {
        const { nombre, materno, paterno, correo, clave } = user;
        const hashedPassword = await bcrypt.hash(clave, 10);  // Hasheamos la contraseña
        const result = await pool.query('INSERT INTO usuarios ( NOMBRE, MATERNO, PATERNO, CORREO, CLAVE) VALUES ( ?, ?, ? , ?, ?)', [ nombre, materno, paterno, correo, hashedPassword]);
        return result.insertId;
      },
    
      async insertarToken(token,correo) {
        console.log('*authModel insertar token* insertando un nuevo token')
        const result = await pool.query('UPDATE usuarios SET token = ? WHERE Correo = ?' , [token,correo]);
        return result 
      },
      
      async eliminarToken(correo) {
        const result = await pool.query('UPDATE usuarios SET TOKEN = 0 WHERE correo = ?', [correo])
        return result
      },
    
      async buscarToken(token) {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE TOKEN = ?', [token]);
        return rows[0];
      },
    
      async comparePassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
      },

      async actualizarToken(correo) {
        // Lógica para actualizar el token a 0 en la base de datos
        const query = 'UPDATE usuarios SET token = 0 WHERE correo = ?';
        const [result] = await pool.query(query, [correo]);
        return result;
      },











}
module.exports = AuthModel;