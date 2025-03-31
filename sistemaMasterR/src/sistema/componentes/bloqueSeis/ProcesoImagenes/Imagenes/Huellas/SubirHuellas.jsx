import React from 'react';
import { Card, CardBody, CardTitle, Button } from 'react-bootstrap';

export const SubirHuellas = ({
  LLAVE,
  isImagesFetched,
  fetchedImages,
  imagenes,
  handleImageChange,
  handleSubmit,
  setModo,
  errores2,
  modo
}) => {
  const dedoDerecho = ['Pulgar', 'Índice', 'Medio', 'Anular', 'Meñique'];
  const dedoIzquierdo = ['Pulgar', 'Índice', 'Medio', 'Anular', 'Meñique'];

  return (
    <div className="container py-4">
      <h1 className="text-center my-4" style={{ fontSize: '2.5rem', fontWeight: '700', color: '#004085' }}>
        {modo === 'subir' ? 'Subir Fotos de Huellas' : 'Editar Fotos de Huellas'}
      </h1>

      <div className="d-flex justify-content-center mb-4">
        {fetchedImages && fetchedImages.length > 0 && (
          <Button
            className={`btn ${modo === 'subir' ? 'btn-primary' : 'btn-secondary'} px-4 py-2`}
            onClick={() => setModo(modo === 'subir' ? 'editar' : 'subir')}
            style={{ fontSize: '1.1rem', fontWeight: 'bold', borderRadius: '30px' }}
          >
            {modo === 'subir' ? 'Editar Huellas' : 'Regresar a Subir'}
          </Button>
        )}
      </div>

      {(modo === 'subir' && !isImagesFetched) || modo === 'editar' ? (
        <form onSubmit={handleSubmit}>
          <div className="row justify-content-center">
            {Array.from({ length: 10 }, (_, index) => (
              <div className="col-md-6 col-lg-4 mb-4" key={index}>
                <Card className="shadow-sm rounded-lg border-0">
                  <CardBody className="text-center p-4">
                    <CardTitle className="mb-3" style={{ fontSize: '1.2rem', fontWeight: '600', color: '#333' }}>
                      {index < 5 ? `Dedo ${dedoDerecho[index]} (Derecha)` : `Dedo ${dedoIzquierdo[index - 5]} (Izquierda)`}
                    </CardTitle>
                    <input
                      type="file"
                      className="form-control mb-3"
                      onChange={(e) => handleImageChange(e, index)}
                      style={{ borderRadius: '10px' }}
                    />
                    {errores2[index] && <p className="text-danger mt-2">{errores2[index]}</p>}
                    {imagenes[index] && (
                      <div className="text-center mt-3">
                        <img
                          src={imagenes[index].url}
                          alt={`Imagen Huella ${index + 1}`}
                          className="img-fluid rounded border shadow-sm"
                          style={{ maxHeight: '220px', objectFit: 'cover', borderRadius: '10px' }}
                        />
                      </div>
                    )}
                  </CardBody>
                </Card>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            
          </div>
        </form>
      ) : null}

      <div className="row mt-5 justify-content-center">
        {fetchedImages && fetchedImages.length > 0 ? (
          fetchedImages.map((image, index) => (
            <div className="col-md-4 col-lg-3 d-flex justify-content-center" key={index}>
              <Card className="shadow-sm border-0" style={{ width: '15rem', borderRadius: '15px' }}>
                <CardBody className="p-3">
                  <h5 className="text-center mb-3" style={{ fontWeight: '600', fontSize: '1.2rem', color: '#333' }}>
                    {image.grupo}
                  </h5>
                  <div className="text-center">
                    <img
                      src={image.imagen}
                      alt={`Imagen ${index + 1}`}
                      className="img-fluid rounded border shadow-sm"
                      style={{ maxHeight: '220px', objectFit: 'cover', borderRadius: '10px' }}
                    />
                  </div>
                </CardBody>
              </Card>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <h5 className="text-muted">No hay imágenes disponibles aún.</h5>
          </div>
        )}
      </div>
    </div>
  );
};
