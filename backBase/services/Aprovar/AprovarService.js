const AprovarModel = require('../../models/Aprovar/AprovarModel');

const AprovarService = {
  async aprovarRegistro(idAlterna, procesado) {
    try {
      const result = await AprovarModel.aprovarRegistro(idAlterna, procesado);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

module.exports = AprovarService;
