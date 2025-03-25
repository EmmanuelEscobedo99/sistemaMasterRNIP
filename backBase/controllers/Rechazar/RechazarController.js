const RechazarService = require( '../../services/Rechazar/RechazarService' );

const RechazarController = {
  async rechazarRegistro( req, res ) {
    try {
      const { ID_ALTERNA, LLAVE, FORMULARIO, CAMPO, DESCRIPCION } = req.params;
      await RechazarService.rechazarRegistro( ID_ALTERNA, LLAVE, FORMULARIO, CAMPO, DESCRIPCION );
      res.status( 200 ).json( { message: "Registro rechazado con éxito", procesado: 8 } );
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { error: "No se pudo rechazar el registro." } );
    }
  },
  async rechazarRegistro2( req, res ) {
    try {
      const { LLAVE, FORMULARIO, CAMPO, DESCRIPCION } = req.params;
      console.log('Datos recibidos:', LLAVE, FORMULARIO, CAMPO, DESCRIPCION);
      const result = await RechazarService.rechazarRegistro2( LLAVE, FORMULARIO, CAMPO, DESCRIPCION );
      res.status( 200 ).json( result );
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { error: error } );
    }
  }
};

module.exports = RechazarController; // ✅ Asegurar que el módulo se exporta correctamente
