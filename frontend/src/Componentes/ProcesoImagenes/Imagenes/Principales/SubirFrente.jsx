import React from 'react';
import { Card, CardBody, CardTitle, Button, Spinner } from 'react-bootstrap';

export const SubirFrente = ({
  imagenes,
  loading,
  enviando,
  imagenesObtenidas,
  obtuveImagenes,
  handleCambioImagen,
  onSubmit,
  LLAVE,
  regresarFormularios,
}) => {
  // Filtrar solo la imagen del grupo "A"
  const imagenFrente = imagenesObtenidas.find((img) => img.grupo === "A");

  return (
    <div className="container">
      <h1 className="text-center my-4">Subir Foto De Frente</h1>

      {/* Mostrar el formulario solo si no hay imagen de frente en la base de datos */}
      {!imagenFrente && (
        <form onSubmit={onSubmit}>
          <div className="row justify-content-center">
            <div className="col-md-6 mb-4">
              <Card className="shadow">
                <CardBody>
                  <CardTitle className="text-center">Imagen de Frente (A)</CardTitle>

                  {/* Campo para subir la imagen */}
                  <input
                    type="file"
                    className="form-control mb-3"
                    onChange={(e) => handleCambioImagen(e, 0)} // Asignar la imagen de frente al índice 0
                    disabled={enviando || obtuveImagenes}
                  />

                  {/* Verificación de carga */}
                  {loading[0] ? (
                    <div className="text-center">
                      <Spinner animation="border" />
                    </div>
                  ) : (
                    imagenes[0] && (
                      <img
                        src={imagenes[0].url}
                        alt="Imagen de Frente"
                        className="img-fluid"
                        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                      />
                    )
                  )}
                </CardBody>
              </Card>
            </div>
          </div>

          <div className="text-center mt-4">
            <Button
              className="btn btn-success"
              type="submit"
              disabled={enviando || imagenes[0] === null}
            >
              {enviando ? 'Enviando...' : 'Subir Imagen'}
            </Button>
          </div>
        </form>
      )}

      {/* Sección de imagen obtenida de Frente (A) */}
      {imagenFrente && (
        <div className="row mt-4 justify-content-center">
          <div className="col-md-4 d-flex justify-content-center">
            <Card className="shadow" style={{ width: '18rem' }}>
              <CardBody>
                <h5 className="text-center">Imagen de Frente (A)</h5>
                <img
                  src={imagenFrente.imagen}
                  alt="Imagen de Frente"
                  className="img-fluid"
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
              </CardBody>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};
