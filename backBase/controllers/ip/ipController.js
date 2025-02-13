const ipService = require('../../services/ip/ipService');

const ipController = {
  async verificarIp(req, res) {
    try {
      const ip = req.params.ip;
      const resIp = await ipService.buscarPorIp(ip);
      if (!resIp) {
        return res.status(404).json({ message: 'IP no encontrada', exists: false });
      }
    
      return res.status(200).json({ message: 'IP encontrada!', exists: true });
    } catch (error) {
      console.error('Error al buscar la IP:', error);
      if (!res.headersSent) {
        return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
      }
    }
  },

  async obtenerIpPrivada(req, res) {
    try {
      const ipPrivada = await ipService.obtenerIpPrivada();
      return res.status(200).json({ ip: ipPrivada });
    } catch (error) {
      console.error('Error al obtener la IP privada:', error);
      if (!res.headersSent) {
        return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
      }
    }
  }
};

module.exports = ipController;
