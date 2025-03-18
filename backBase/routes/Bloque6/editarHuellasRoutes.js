const express = require( 'express' );
const multer = require( 'multer' );
const pool = require( '../../config/db.config');

const router = express.Router();

// Configurar multer para manejar las imágenes
const storage = multer.memoryStorage();
const upload = multer( { storage } );

// Endpoint para editar imágenes
router.put( '/editar/:idAlterna', upload.array( 'nuevaImagen', 10 ), async ( req, res ) => {
  const { idAlterna } = req.params;
  let grupos = req.body.grupo; // Puede ser un array o un string

  // Asegurar que `grupos` sea un array
  if ( !Array.isArray( grupos ) ) {
    grupos = [ grupos ];
  }

  const nuevasImagenes = req.files || [];

  if ( !grupos || nuevasImagenes.length === 0 ) {
    return res.status( 400 ).json( { message: 'Grupos e imágenes son obligatorios para actualizar.' } );
  }

  try {
    const query = 'UPDATE imagenes SET IMAGEN = ? WHERE ID_ALTERNA = ? AND GRUPO = ?;';

    for ( let i = 0; i < nuevasImagenes.length; i++ ) {
      const bufferImagen = nuevasImagenes[ i ].buffer;
      const grupo = grupos[ i ];

      const [ result ] = await pool.query( query, [ bufferImagen, idAlterna, grupo ] );
      if ( result.affectedRows === 0 ) {
        return res.status( 404 ).json( {
          message: `No se encontró la imagen para actualizar con el ID_ALTERNA y grupo ${ grupo }.`,
        } );
      }
    }

    res.status( 200 ).json( { message: 'Imágenes actualizadas exitosamente.' } );
  } catch ( error ) {
    console.error( 'Error al actualizar las imágenes:', error );
    res.status( 500 ).json( { message: 'Error al actualizar las imágenes en la base de datos', error } );
  }
} );

module.exports = router;
