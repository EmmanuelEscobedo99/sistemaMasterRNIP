import React from 'react';
import { Card, CardBody, CardTitle, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const SubirPrincipales = ({
  imagenes,
  loading,
  enviando,
  imagenesObtenidas,
  obtuveImagenes,
  handleCambioImagen,
  onSubmit,
  LLAVE,
  editarPrincipales,
  regresarFormularios,
  errores2,
  modo,
  editarPrincipalesForm,
  regresarFormulariosForm
}) => {
  const navigate = useNavigate();

  return (
    <div className="container py-4">
      <h1 className="text-center my-4" style={{ fontSize: '2.5rem', fontWeight: '700', color: '#004085' }}>
        {modo === 'editar' ? 'Editar Fotos Principales' : 'Subir Fotos Principales'}
      </h1>

      <div className="d-flex justify-content-center mb-4">
        {imagenesObtenidas && Array.isArray(imagenesObtenidas) && imagenesObtenidas.length > 0 && (
          <Button
            className={`btn ${modo === 'editar' ? 'btn-secondary' : 'btn-info'} px-4 py-2`}
            onClick={modo === 'editar' ? regresarFormulariosForm : editarPrincipalesForm}
            style={{ fontSize: '1.1rem', fontWeight: 'bold', borderRadius: '30px' }}
          >
            {modo === 'editar' ? 'Regresar a Modo Subir' : 'Editar Imágenes'}
          </Button>
        )}
      </div>

      {(modo === 'subir' && imagenesObtenidas.length === 0) || modo === 'editar' ? (
        <form onSubmit={onSubmit}>
          <div className="row justify-content-center">
            {[1, 2, 3].map((index) => (
              <div className="col-md-4 mb-4" key={index}>
                <Card className="shadow rounded-lg border-0">
                  <CardBody className="text-center p-4">
                    <CardTitle className="mb-3" style={{ fontSize: '1.3rem', fontWeight: '600', color: '#333' }}>
                      {index === 1 ? 'Frente' : index === 2 ? 'Derecho' : 'Izquierdo'}
                    </CardTitle>

                    <div className="position-relative">
                      <input
                        type="file"
                        className="form-control mb-3 mx-auto"
                        onChange={(e) => handleCambioImagen(e, index)}
                        style={{ borderRadius: '10px' }}
                      />
                      {loading[index] && (
                        <div className="position-absolute top-50 start-50 translate-middle">
                          <Spinner animation="border" variant="primary" />
                        </div>
                      )}
                      {errores2[index] && <p className="text-danger mt-2">{errores2[index]}</p>}
                    </div>

                    {imagenes[index] && (
                      <div className="text-center mt-3">
                        <img
                          src={imagenes[index].url}
                          alt={`Imagen ${index + 1}`}
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

          {modo === 'editar' && (
            <div className="text-center mt-4">
              <Button type="submit" className="btn btn-warning px-4 py-2" disabled={enviando} style={{ fontSize: '1.2rem', fontWeight: 'bold', borderRadius: '30px' }}>
                {enviando ? 'Guardando...' : 'Guardar Cambios'}
              </Button>
            </div>
          )}
        </form>
      ) : null}

      <div className="row mt-5 justify-content-center">
        {imagenesObtenidas && imagenesObtenidas.length > 0 ? (
          imagenesObtenidas.map((image, index) => (
            <div className="col-md-4 col-lg-3 d-flex justify-content-center" key={index}>
              <Card className="shadow-sm border-0" style={{ width: '18rem', borderRadius: '15px' }}>
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