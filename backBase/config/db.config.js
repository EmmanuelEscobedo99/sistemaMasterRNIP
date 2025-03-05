const mysql = require('mysql2/promise');

// Crear una instancia de pool con la configuración de la base de datos
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    port: 3306,
    database: "rnip"
});

// Verificar la conexión al pool
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conexión a la base de datos exitosa');
        connection.release(); // Liberar la conexión de vuelta al pool
    }
});

module.exports = pool;