const JuridicosModel = require( '../../../models/Bloque2/Juridicos/JuridicosModel' );

const JuridicosService = {
  async obtenerJuridicos ( idAlterna ) {
    try {
      const result = await JuridicosModel.obtenerJuridicos( idAlterna );
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

module.exports = JuridicosService;