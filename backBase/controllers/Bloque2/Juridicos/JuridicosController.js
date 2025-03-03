const JuridicosService = require( '../../../services/Bloque2/Juridicos/JuridicosService' );

const JuridicosController = {
  async obtenerJuridicos( req, res ) {
    try {
      const { idAlterna } = req.params;
      const result = await JuridicosService.obtenerJuridicos( idAlterna );
      res.status( 200 ).json( result );
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { error: error } );
    }
  }
};

module.exports = JuridicosController;