const ipModel = require('../../models/ip/ipModel');
const os = require('os');

const ipService = {

  async buscarPorIp(ip) {
    return await ipModel.buscarPorIp(ip);
  },
  
  obtenerIpPrivada() {
    const interfaces = os.networkInterfaces();
    let ipAddress = null;

    // Iterar sobre todas las interfaces de red
    for (let interfaceName in interfaces) {
      const interfaceInfo = interfaces[interfaceName];
      for (let i = 0; i < interfaceInfo.length; i++) {
        const iface = interfaceInfo[i];
        if (iface.family === 'IPv4' && !iface.internal) {
          ipAddress = iface.address;
          break;
        }
      }
      if (ipAddress) break; // Detener si encontramos una IP
    }

    if (!ipAddress) {
      throw new Error('No se pudo obtener la IP privada');
    }
    
    return ipAddress;
  }
  
};

module.exports = ipService;
