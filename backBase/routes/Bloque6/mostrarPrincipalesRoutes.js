const express = require( 'express' );
const pool = require( '../../config/db.config' );

const router = express.Router();

// Endpoint para visualizar las imagenes que se subieron
router.post( '/principales', async ( req, res ) => {
  const { idAlterna } = req.body;
  console.log( "idAlterna", idAlterna );
  console.log("ENTRÉ AQUI")

  try {
    const query = "SELECT IMAGEN, GRUPO FROM imagenes WHERE ID_ALTERNA = ? AND GRUPO IN ('A', 'B', 'C');";
    const [ results ] = await pool.query( query, [ idAlterna ] );

    if ( results.length === 0 ) {
      return res.status( 202 ).json( { status: 404, message: 'No se encontraron las imagenes con esa ID_ALTERNA.' } );
    }

    // Convertir imagenes a base64
    const imagenesBase64 = results.map( ( row ) => {
      const base64Imagen = Buffer.from( row.IMAGEN ).toString( 'base64' );
      return {
        grupo: row.GRUPO,
        imagen: `data:image/jpeg;base64,${ base64Imagen }`,
      };
    } );

    // Enviar las imágenes como respuesta
    res.status( 200 ).json( { imagenes: imagenesBase64 } );
  } catch ( error ) {
    console.error( 'Error al obtener las imágenes:', error );
    res.status( 500 ).json( { message: 'Error al obtener las imágenes de la base de datos', error } );
  }
} );

module.exports = router;