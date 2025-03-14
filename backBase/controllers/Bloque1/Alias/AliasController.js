const AliasService = require( '../../../services/Bloque1/Alias/AliasService' );

const AliasController = {
  async obtenerAlias( req, res ) {
    try {
      const { idAlterna } = req.params;
      const result = await AliasService.obtenerAlias( idAlterna );
      res.status( 200 ).json( result );
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { error: error } );
    }
  }
};

module.exports = AliasController;