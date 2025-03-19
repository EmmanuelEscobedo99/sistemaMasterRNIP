const AprovarService = require('../../services/Aprovar/AprovarService');

const AprovarController = {
  async aprovarRegistro(req, res) {
    try {
      const { idAlterna } = req.params;
      const { procesado } = req.body; // 📌 Recibe el procesado desde el frontend

      const result = await AprovarService.aprovarRegistro(idAlterna, procesado);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error });
    }
  },
};

module.exports = AprovarController;
