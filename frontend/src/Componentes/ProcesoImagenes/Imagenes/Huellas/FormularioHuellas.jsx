import React from 'react';
import { Card, CardBody, CardTitle, Button, Spinner } from 'react-bootstrap';

export const FormularioHuellas = ({
  LLAVE,
  titulo,
  isImagesFetched = false,
  fetchedImages = [],
  imagenes = [],
  loading = [],
  handleImageChange,
  handleSubmit,
  isSubmitting = false,
  onRegresar,
  onEditar,
  modo = 'subir', // "subir" o "editar"
}) => {
  const dedosDerechos = ['Pulgar', 'Índice', 'Medio', 'Anular', 'Meñique'];
  const dedosIzquierdos = ['Pulgar', 'Índice', 'Medio', 'Anular', 'Meñique'];

  return (
    <div className="container">
      <h1 className="text-center my-4">{titulo}</h1>

      <div className="d-flex justify-content-between mb-3">
        {modo === 'editar' && (
          <Button className="btn btn-primary" onClick={() => onEditar(LLAVE)}>
            Editar Huellas
          </Button>
        )}
        <Button className="btn btn-secondary" onClick={() => onRegresar(LLAVE)}>
          Regresar
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          {Array.from({ length: 10 }, (_, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <Card className="shadow">
                <CardBody>
                  <CardTitle className="text-center">
                    {index < 5
                      ? `Dedo ${dedosDerechos[index]} (Derecha)`
                      : `Dedo ${dedosIzquierdos[index - 5]} (Izquierda)`}
                  </CardTitle>
                  <input
                    type="file"
                    className="form-control mb-3"
                    onChange={(e) => handleImageChange(e, index)}
                    disabled={modo === 'editar' && isImagesFetched}
                  />
                  {loading[index] ? (
                    <div className="text-center">
                      <Spinner animation="border" />
                    </div>
                  ) : (
                    imagenes[index] && (
                      <img
                        src={imagenes[index].url}
                        alt={`Imagen ${index + 1}`}
                        className="img-fluid"
                        style={{
                          width: '100%',
                          height: '200px',
                          objectFit: 'cover',
                        }}
                      />
                    )
                  )}
                </CardBody>
              </Card>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Button color="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'Enviar'}
          </Button>
        </div>
      </form>

      <div className="row mt-4">
        {fetchedImages.length > 0 ? (
          fetchedImages.map((image, index) => (
            <div className="col-md-4" key={index}>
              <Card className="shadow mb-2">
                <CardBody>
                  <h5 className="text-center">{image.grupo}</h5>
                  <img
                    src={image.imagen}
                    alt={`Imagen ${index + 1}`}
                    className="img-fluid"
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                    }}
                  />
                </CardBody>
              </Card>
            </div>
          ))
        ) : (
          <p className="text-center">No hay imágenes disponibles.</p>
        )}
      </div>
    </div>
  );
};
