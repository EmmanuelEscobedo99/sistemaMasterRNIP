const TraerImagenesService = require('../../services/TraerImagenes/TraerImagenesService');

const TraerImagenesController = {
  async obtenerPorLlave(req, res) {
    const { llave } = req.params;
    try {
      const imagenes = await TraerImagenesService.obtenerImagenesPorLlave(llave);
      res.status(200).json(imagenes);
    } catch (error) {
      console.error('Error en TraerImagenesController:', error);
      res.status(500).json({ error: 'No se pudieron obtener las imágenes.' });
    }
  }
};

module.exports = TraerImagenesController;
