import React from 'react';
import { Card, CardBody, CardTitle, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaUpload, FaImage } from 'react-icons/fa';

export const EditarPrincipales = ({
  imagenes, // nuevas seleccionadas
  loading,
  enviando,
  imagenesObtenidas, // originales del backend
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

  const obtenerGrupo = (index) => {
    return index === 0 ? 'A' : index === 1 ? 'B' : 'C';
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5" style={{ fontSize: '2.8rem', fontWeight: '700', color: '#003366' }}>
        ✨ Editar Fotos Principales
      </h1>

      {imagenesObtenidas.length > 0 && (
        <form onSubmit={onSubmit}>
          <div className="row justify-content-center">
            {[0, 1, 2].map((index) => {
              const grupo = obtenerGrupo(index);
              const imagenNueva = imagenes[index];

              return (
                <div className="col-md-4 mb-4" key={index}>
                  <Card className="border-0 shadow-lg rounded-4 p-3 bg-light">
                    <CardBody>
                      <CardTitle className="text-center mb-3" style={{ fontSize: '1.4rem', fontWeight: '600', color: '#0d3b66' }}>
                        {grupo === 'A' ? '📸 Frente' : grupo === 'B' ? '📸 Derecho' : '📸 Izquierdo'}
                      </CardTitle>

                      <div className="input-group mb-3">
                        <span className="input-group-text bg-primary text-white">
                          <FaUpload />
                        </span>
                        <input
                          type="file"
                          className="form-control"
                          onChange={(e) => handleCambioImagen(e, index)}
                          style={{ borderRadius: '0 10px 10px 0' }}
                        />
                      </div>

                      {loading[index] && (
                        <div className="text-center mb-2">
                          <Spinner animation="border" variant="primary" />
                        </div>
                      )}

                      {errores2[index] && (
                        <p className="text-danger text-center">{errores2[index]}</p>
                      )}

                      {imagenNueva?.url && (
                        <div className="text-center mt-3">
                          <p className="text-muted mb-1" style={{ fontSize: '0.9rem' }}>🆕 Nueva imagen seleccionada</p>
                          <img
                            src={imagenNueva.url}
                            alt={`Nueva Imagen ${index}`}
                            className="img-fluid rounded border shadow-sm"
                            style={{ maxHeight: '180px', objectFit: 'cover', borderRadius: '15px' }}
                          />
                        </div>
                      )}
                    </CardBody>
                  </Card>
                </div>
              );
            })}
          </div>

          {modo === 'editar' && (
            <div className="text-center mt-4">
              <Button
                type="submit"
                className="px-5 py-2"
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  borderRadius: '30px',
                  background: 'linear-gradient(90deg, #fca311, #ffba08)',
                  color: '#fff',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                }}
                disabled={enviando}
              >
                {enviando ? 'Guardando...' : 'Guardar Cambios'}
              </Button>
            </div>
          )}
        </form>
      )}

      <hr className="my-5" />

      <h3 className="text-center mb-4" style={{ color: '#003366', fontWeight: '600' }}>🗂 Imágenes actuales</h3>

      <div className="row justify-content-center">
        {imagenesObtenidas.length > 0 ? (
          imagenesObtenidas.map((image, index) => (
            <div className="col-md-4 col-lg-3 d-flex justify-content-center mb-4" key={index}>
              <Card
                className="shadow-sm border-0 bg-white rounded-4 text-center"
                style={{ width: '18rem', transition: 'all 0.3s ease-in-out' }}
              >
                <CardBody className="p-3">
                  <h5 className="mb-3" style={{ fontWeight: '600', fontSize: '1.1rem', color: '#0d3b66' }}>
                    <FaImage className="me-2" />
                    {image.grupo}
                  </h5>
                  <img
                    src={image.imagen}
                    alt={`Imagen ${index + 1}`}
                    className="img-fluid rounded border shadow-sm"
                    style={{ maxHeight: '220px', objectFit: 'cover', borderRadius: '12px' }}
                  />
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
