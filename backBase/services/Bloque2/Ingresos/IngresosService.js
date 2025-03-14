const IngresosModel = require( '../../../models/Bloque2/Ingresos/IngresosModel' );

const IngresosService = {
  async obtenerIngresos ( idAlterna ) {
    try {
      const result = await IngresosModel.obtenerIngresos( idAlterna );
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

module.exports = IngresosService;