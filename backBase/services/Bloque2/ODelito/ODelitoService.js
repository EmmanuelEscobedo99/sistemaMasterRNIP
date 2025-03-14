const ODelitoModel = require( '../../../models/Bloque2/ODelito/ODelitoModel' );

const ODelitoService = {
  async obtenerODelito ( idAlterna ) {
    try {
      const result = await ODelitoModel.obtenerODelito( idAlterna );
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

module.exports = ODelitoService;