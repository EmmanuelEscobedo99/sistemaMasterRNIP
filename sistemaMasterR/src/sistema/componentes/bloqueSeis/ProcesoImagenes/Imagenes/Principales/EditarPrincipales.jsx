import React from 'react';
import { Card, CardBody, Button, Spinner } from 'react-bootstrap';
import { FaCamera, FaUpload, FaImage } from 'react-icons/fa';

export const EditarPrincipales = ({
  imagenes,
  loading,
  enviando,
  imagenesObtenidas,
  obtuveImagenes,
  handleCambioImagen,
  onSubmit,
  errores2,
  modo
}) => {
  const obtenerGrupo = (index) => {
    return index === 0 ? 'A' : index === 1 ? 'B' : 'C';
  };

  const obtenerNombreGrupo = (grupo) => {
    if (grupo === 'A') return 'Frente';
    if (grupo === 'B') return 'Derecho';
    return 'Izquierdo';
  };

  return (
    <div className="container py-4" style={{ backgroundColor: '#0A0A0A', borderRadius: '1rem' }}>
      <h1 className="text-center mb-5" style={{ fontSize: '2.5rem', fontWeight: '700', color: '#FFFFFF' }}>
        ✨ Editar Fotos Principales
      </h1>

      <form onSubmit={onSubmit}>
        <div className="row justify-content-center mb-5">
          {[0, 1, 2].map((index) => {
            const grupo = obtenerGrupo(index);
            const nombreGrupo = obtenerNombreGrupo(grupo);
            const imagenNueva = imagenes[index];

            return (
              <div className="col-md-4 mb-4" key={index}>
                <Card className="shadow border-0" style={{ borderRadius: '20px', backgroundColor: '#1F2937' }}>
                  <CardBody className="text-center text-white">
                    <h5 className="mb-3" style={{ fontWeight: '600', color: '#22D3EE' }}>
                      <FaCamera className="me-2" />
                      {nombreGrupo}
                    </h5>

                    <div className="mb-3">
                      <label className="btn btn-primary w-100 rounded-pill">
                        <FaUpload className="me-2" />
                        Seleccionar archivo
                        <input
                          type="file"
                          hidden
                          accept="image/jpeg"
                          onChange={(e) => handleCambioImagen(e, index)}
                        />
                      </label>
                    </div>

                    {loading[index] && (
                      <Spinner animation="border" variant="light" className="mb-3" />
                    )}

                    {errores2[index] && (
                      <p className="text-danger">{errores2[index]}</p>
                    )}

                    {imagenNueva?.url && (
                      <div className="text-center">
                        <p className="text-light mb-1">📷 Nueva seleccionada</p>
                        <img
                          src={imagenNueva.url}
                          alt={`Nueva Imagen ${index}`}
                          className="img-fluid rounded border shadow-sm"
                          style={{ maxHeight: '180px', objectFit: 'cover', borderRadius: '10px' }}
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
          <div className="text-center mb-5">
            <Button
              type="submit"
              className="btn btn-warning px-5 py-2 rounded-pill"
              disabled={enviando}
              style={{ fontSize: '1.1rem', fontWeight: 'bold' }}
            >
              {enviando ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
          </div>
        )}
      </form>

      <hr style={{ borderTop: '2px solid #444' }} />

      <h4 className="text-center mt-5 mb-4" style={{ color: '#FFFFFF' }}>
        🗂️ Imágenes actuales
      </h4>

      <div className="row justify-content-center">
        {imagenesObtenidas.length > 0 ? (
          imagenesObtenidas.map((image, index) => (
            <div className="col-md-4 col-lg-3 d-flex justify-content-center mb-4" key={index}>
              <Card className="shadow-sm border-0" style={{ borderRadius: '20px', width: '16rem', backgroundColor: '#1F2937' }}>
                <CardBody className="p-3 text-center text-white">
                  <h6 className="mb-2 text-info" style={{ fontWeight: '600' }}>
                    <FaImage className="me-2" />
                    {image.grupo}
                  </h6>
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
