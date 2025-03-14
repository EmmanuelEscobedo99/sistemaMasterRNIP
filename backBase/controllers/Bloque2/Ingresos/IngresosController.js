const IngresosService = require( '../../../services/Bloque2/Ingresos/IngresosService' );

const IngresosController = {
  async obtenerIngresos( req, res ) {
    try {
      const { idAlterna } = req.params;
      const result = await IngresosService.obtenerIngresos( idAlterna );
      res.status( 200 ).json( result );
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { error: error } );
    }
  }
};

module.exports = IngresosController;