const pool = require('../../config/db.config');

const ipModel = {
  async buscarPorIp(ip) {
    console.log("la ip a verificar:", ip);
    const [rows] = await pool.query('SELECT ipMaquina FROM ipmaquina WHERE ipMaquina = ?', [ip]);
    return rows.length > 0; // Devuelve true si se encontró la IP, false si no
  },
};

module.exports = ipModel;