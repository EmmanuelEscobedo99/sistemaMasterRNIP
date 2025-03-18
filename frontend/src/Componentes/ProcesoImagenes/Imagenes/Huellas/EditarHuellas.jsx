import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Card, CardBody, CardTitle, Button, Spinner } from 'react-bootstrap';
import { VistaEditarHuellas } from '../../../../pages/ProcesoImagenes/VistasFormulario/VistaEditarHuellas';

export const EditarHuellas = () => {
  const navigate = useNavigate();
  const LLAVE = useParams().LLAVE;
  const {
    register,
    handleSubmit,
    handleImageChange,
    onSubmit,
    isSubmitting,
    isImagesFetched,
    fetchedImages,
    imagenes,
    loading,
    dedoDerecho,
    dedoIzquierdo
  } = VistaEditarHuellas( LLAVE );

  const regresar = () => {
    navigate( `/vistaHuella/${ LLAVE }` );
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Editar Fotos de Huellas</h1>
      <Button className="btn btn-secondary m-3" onClick={ () => regresar( LLAVE ) }>
        Regresar
      </Button>
      <form onSubmit={ handleSubmit( onSubmit ) }>
        <div className="row">
          { Array.from( { length: 10 }, ( _, index ) => (
            <div className="col-md-4 mb-4" key={ index }>
              <Card className="shadow">
                <CardBody>
                  <CardTitle className="text-center">
                    { index < 5 ? `Dedo ${ dedoDerecho[ index ] } (Derecha)` : `Dedo ${ dedoIzquierdo[ index - 5 ] } (Izquierda)` }
                  </CardTitle>
                  <input
                    type="file"
                    className="form-control mb-3"
                    { ...register( `imagen${ index + 1 }` ) }
                    onChange={ ( e ) => handleImageChange( e, index ) }
                  />
                  { loading[ index ] ? (
                    <div className="text-center">
                      <Spinner animation="border" variant="primary" />
                    </div>
                  ) : (
                    imagenes[ index ] && (
                      <img
                        src={ imagenes[ index ].url }
                        alt={ `Imagen ${ index + 1 }` }
                        className="img-fluid"
                        style={ { width: '100%', height: '200px', objectFit: 'cover' } }
                      />
                    )
                  ) }
                </CardBody>
              </Card>
            </div>
          ) ) }
        </div>
        <div className="text-center">
          <Button variant="success" className="mt-3" type="submit" disabled={ isSubmitting }>
            { isSubmitting ? 'Enviando...' : 'Enviar' }
          </Button>
        </div>
      </form>

      <div className="row mt-4">
        { fetchedImages.length > 0 ? fetchedImages.map( ( image, index ) => (
          <div className="col-md-4" key={ index }>
            <Card className="shadow mb-2">
              <CardBody>
                <h5 className="text-center">{ image.grupo }</h5>
                <img
                  src={ image.imagen }
                  alt={ `Imagen ${ index + 1 }` }
                  className="img-fluid"
                  style={ { width: '100%', height: '200px', objectFit: 'cover' } }
                />
              </CardBody>
            </Card>
          </div>
        ) ) : (
          <p className="text-center">No hay imágenes disponibles.</p>
        ) }
      </div>
    </div>
  );
};
