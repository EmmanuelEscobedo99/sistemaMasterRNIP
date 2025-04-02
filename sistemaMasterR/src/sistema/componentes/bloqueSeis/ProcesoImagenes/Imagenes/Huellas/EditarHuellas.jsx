import React from 'react';
import { Card, CardBody, CardTitle, Button, Row, Col, Container } from 'react-bootstrap';
import { FaUpload } from 'react-icons/fa';

export const EditarHuellas = ( {
  LLAVE,
  isImagesFetched,
  fetchedImages,
  imagenes,
  handleImageChange,
  handleSubmit,
  setModo,
  errores2,
  modo
} ) => {
  const dedoDerecho = [ 'Pulgar', 'Índice', 'Medio', 'Anular', 'Meñique' ];
  const dedoIzquierdo = [ 'Pulgar', 'Índice', 'Medio', 'Anular', 'Meñique' ];

  return (
    <Container fluid className="py-3" style={ { backgroundColor: '#0A0A0A' } }>
      <h1 className="text-center mb-4" style={ { fontSize: '2rem', fontWeight: '700', color: 'white' } }>
        ✨ Editar Fotos de Huellas
      </h1>

      <Row className="justify-content-center">
        {/* Columna de imágenes obtenidas */ }
        <Col lg={ 4 } md={ 5 } sm={ 12 } className="mb-4">
          <div className="text-center mb-4">
            <h3 className="text-yellow-400" style={ { fontSize: '1.2rem', fontWeight: '600' } }>
              Imágenes Obtenidas
            </h3>
          </div>

          <Row className="g-2">
            { fetchedImages && fetchedImages.length > 0 ? (
              fetchedImages.map( ( image, index ) => (
                <Col key={ index } xs={ 4 } sm={ 3 } md={ 2 }>
                  <Card
                    className="border-0 shadow-sm rounded"
                    style={ {
                      height: '200px',
                      backgroundColor: '#101A2C',
                      border: '1px solid #22D3EE',
                      borderRadius: '14px',
                      overflow: 'hidden',
                      boxShadow: '0 0 12px rgba(34, 211, 238, 0.25)',
                    } }
                  >
                    <CardBody className="p-2 d-flex flex-column justify-content-center align-items-center">
                      <div className="img-container" style={ { height: '120px', width: '100%' } }>
                        <img
                          src={ image.imagen }
                          alt={ `Imagen ${ index + 1 }` }
                          className="img-fluid rounded"
                          style={ {
                            objectFit: 'contain',
                            width: '100%',
                            height: '100%',
                            borderRadius: '10px',
                            backgroundColor: '#0F172A',
                          } }
                        />
                      </div>
                      <h5 className="mt-2 text-center" style={ { fontWeight: '600', fontSize: '0.9rem', color: '#22D3EE' } }>
                        { image.grupo }
                      </h5>
                    </CardBody>
                  </Card>
                </Col>
              ) )
            ) : (
              <Col className="text-center">
                <p className="text-muted">No hay imágenes disponibles aún.</p>
              </Col>
            ) }
          </Row>
        </Col>

        {/* Columna de formulario */ }
        <Col lg={ 8 } md={ 5 } sm={ 12 } className="mb-4">
          <div className="text-center mb-4">
            <h3 className="text-yellow-400" style={ { fontSize: '1.2rem', fontWeight: '600' } }>
              Cargar Nuevas Imágenes
            </h3>
          </div>

          {/* Solo mostramos el formulario si estamos en modo "editar" */ }
          { modo === 'editar' && (
            <form onSubmit={ handleSubmit }>
              <Row className="g-2">
                { Array.from( { length: 10 }, ( _, index ) => (
                  <Col key={ index } xs={ 4 } sm={ 3 } md={ 2 }>
                    <Card
                      className="border-0 shadow-sm rounded"
                      style={ {
                        height: '200px',
                        backgroundColor: '#101A2C',
                        border: '1px solid #22D3EE',
                        borderRadius: '14px',
                        overflow: 'hidden',
                        boxShadow: '0 0 12px rgba(34, 211, 238, 0.25)',
                      } }
                    >
                      <CardBody className="text-center p-3 d-flex flex-column justify-content-center align-items-center">
                        <CardTitle
                          className="mb-2"
                          style={ {
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            color: '#22D3EE',
                          } }
                        >
                          { index < 5 ? `🧤Dedo ${ dedoDerecho[ index ] } (Derecha)` : `🧤Dedo ${ dedoIzquierdo[ index - 5 ] } (Izquierda)` }
                        </CardTitle>

                        {/* Estilo de input con estilo de botón */ }
                        <label
                          htmlFor={ `file-input-${ index }` }
                          className="btn btn-primary mb-2"
                          style={ {
                            width: '100%',
                            fontSize: '0.9rem',
                            textAlign: 'center',
                            cursor: 'pointer',
                          } }
                        >
                          <FaUpload className="me-2" />
                          Seleccionar archivo
                        </label>
                        <input
                          id={ `file-input-${ index }` }
                          type="file"
                          className="form-control mb-2"
                          onChange={ ( e ) => handleImageChange( e, index ) }
                          style={ {
                            display: 'none', // Ocultamos el input real
                          } }
                        />

                        { errores2[ index ] && <p className="text-danger mt-1" style={ { fontSize: '0.8rem' } }>{ errores2[ index ] }</p> }

                        { imagenes[ index ] && (
                          <div className="text-center mt-2">
                            <img
                              src={ imagenes[ index ].url }
                              alt={ `Imagen Huella ${ index + 1 }` }
                              className="img-fluid rounded border shadow-sm"
                              style={ {
                                maxHeight: '90px',
                                objectFit: 'contain',
                                borderRadius: '10px',
                                backgroundColor: '#0F172A',
                              } }
                            />
                          </div>
                        ) }
                      </CardBody>
                    </Card>
                  </Col>
                ) ) }
              </Row>

              {/* Botón de Guardar Cambios */ }
              <div className="mt-3" style={ { textAlign: 'left' } }>
                <Button
                  variant="warning"
                  type="submit"
                  style={ {
                    padding: '8px 18px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    borderRadius: '30px',
                    backgroundColor: '#F59E0B',
                    borderColor: '#F59E0B',
                    boxShadow: '0 4px 8px rgba(255, 159, 11, 0.1)',
                    transition: 'all 0.3s ease',
                  } }
                >
                  Guardar cambios
                </Button>
              </div>

            </form>
          ) }
        </Col>
      </Row>
    </Container>
  );
};
