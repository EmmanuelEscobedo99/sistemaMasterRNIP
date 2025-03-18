import React from "react";
import { Card, CardBody, CardTitle, Button, Spinner } from "react-bootstrap";

export const FormularioPrincipales = ({
  titulo,
  imagenes,
  loading,
  enviando,
  imagenesObtenidas,
  obtuveImagenes,
  handleCambioImagen,
  handleSubmit,
  LLAVE,
  handleAccionExtra, // Acción específica: editar, guardar o regresar
  botonAccionExtraTexto,
  regresar,
  esEdicion = false,
  grupos,
}) => {
  return (
    <div className="container">
      <h2 className="text-center my-4">{titulo}</h2>
      {handleAccionExtra && (
        <Button
          className="btn btn-primary m-3"
          onClick={() => handleAccionExtra(LLAVE)}
        >
          {botonAccionExtraTexto}
        </Button>
      )}
      <Button className="btn btn-secondary" onClick={() => regresar(LLAVE)}>
        Regresar
      </Button>
      <form onSubmit={handleSubmit}>
        <div className="row">
          {imagenes.map((_, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <Card className="shadow">
                <CardBody>
                  <CardTitle className="text-center">
                    {esEdicion ? grupos[index] : `Imagen ${index + 1}`}
                  </CardTitle>
                  <input
                    type="file"
                    className="form-control mb-3"
                    onChange={(e) => handleCambioImagen(e, index)}
                    disabled={enviando || obtuveImagenes}
                  />
                  {loading[index] ? (
                    <div className="text-center">
                      <Spinner color="primary" />
                    </div>
                  ) : (
                    imagenes[index] && (
                      <img
                        src={imagenes[index].url}
                        alt={`Imagen ${index + 1}`}
                        className="img-fluid"
                        style={{ width: "100%", height: "200px", objectFit: "cover" }}
                      />
                    )
                  )}
                </CardBody>
              </Card>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Button color="primary" type="submit" disabled={enviando || obtuveImagenes}>
            {enviando ? "Enviando..." : esEdicion ? "Guardar Cambios" : "Subir Imágenes"}
          </Button>
        </div>
      </form>

      <div className="row mt-4">
        {imagenesObtenidas.length > 0 ? (
          imagenesObtenidas.map((image, index) => (
            <div className="col-md-4" key={index}>
              <Card className="shadow">
                <CardBody>
                  <h5 className="text-center">
                    {esEdicion ? grupos[index] : `Grupo ${index + 1}`}
                  </h5>
                  <img
                    src={image.imagen}
                    alt={`Imagen ${index + 1}`}
                    className="img-fluid"
                    style={{ width: "100%", height: "200px", objectFit: "cover" }}
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
