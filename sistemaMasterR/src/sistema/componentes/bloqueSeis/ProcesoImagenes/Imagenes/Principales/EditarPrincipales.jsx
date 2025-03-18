import React from 'react';
import { Button, Card, CardBody, CardTitle } from 'react-bootstrap';
//import { VistaEditarPrincipales } from '../../../../pages/ProcesoImagenes/VistasFormulario/VistaEditarPrincipales';

export const EditarPrincipales = () => {
  const {
    LLAVE,
    imagenes,
    imagenesObtenidas,
    obtuveImagenes,
    GRUPOS,
    regresar,
    handleCambioImagen,
    handleGuardar,
  } = VistaEditarPrincipales();

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Editar Imágenes Principales</h2>
      <Button className="btn btn-secondary m-3" onClick={() => regresar(LLAVE)}>
        Regresar
      </Button>
      <div className="row">
        {imagenes.map((_, index) => (
          <div className="col-md-4" key={index}>
            <Card className="mb-4">
              <CardBody>
                <CardTitle>{GRUPOS[index]}</CardTitle>
                <input
                  type="file"
                  accept="image/jpeg"
                  onChange={(e) => handleCambioImagen(e, index)}
                  className="form-control mb-3"
                />
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
      <div className="text-center">
        <Button variant="success" className="mt-3" onClick={handleGuardar}>
          Guardar
        </Button>
      </div>
      <div className="row mt-4">
        {imagenesObtenidas.length > 0 ? (
          imagenesObtenidas.map((image, index) => (
            <div className="col-md-4" key={index}>
              <Card className="shadow">
                <CardBody>
                  <h5 className="text-center">{GRUPOS[index]}</h5>
                  <img
                    src={image.imagen}
                    alt={`Imagen ${index + 1}`}
                    className="img-fluid"
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  />
                </CardBody>
              </Card>
            </div>
          ))
        ) : (
          <div className="col-md-12 text-center">
            <h5>Aún no se han subido imágenes.</h5>
          </div>
        )}
      </div>
    </div>
  );
};
