import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip, OverlayTrigger, Card, Row, Col } from 'react-bootstrap';
import '../../../sistema/css/estilo.css';
import ValidacionBloqueUno from '../../../sistema/validaciones/validacionBloque1/ValidacionBloqueUno';
import useDatosGeneralesStore from '../../zustand/useDatosGeneralesStore';

const SubirHuellas = ({ data, onFormChange, onValidationStatus }) => {
  const { register, formState: { errors }, setError, clearErrors } = useFormContext();
  const { datos, actualizarDato, seleccionarRadio, radioSeleccionados } = useDatosGeneralesStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const lowercaseName = name.toLowerCase();
    const validationResult = ValidacionBloqueUno[`validacion${capitalizeFirstLetter(lowercaseName)}`](value);

    if (validationResult !== true) {
      setError(name, { type: 'formulario 1', message: validationResult });
    } else {
      clearErrors(name);
    }
    onFormChange(name, value);
  };

  const handleRadioChange = (nombre, valor, formulario) => {
    seleccionarRadio(nombre, valor, formulario);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    onValidationStatus(errors);
  }, [errors, onValidationStatus]);

  const renderTooltip = (message) => (
    <Tooltip>{message}</Tooltip>
  );

  return (
    <form className="container mt-4">
      <Row className="g-3 justify-content-center">
        {[
          { id: "imagen1", label: "Huella 1", src: "/path/to/image1.jpg" },
          { id: "imagen2", label: "Huella 2", src: "/path/to/image2.jpg" },
          { id: "imagen3", label: "Huella 3", src: "/path/to/image3.jpg" },
          { id: "imagen4", label: "Huella 4", src: "/path/to/image4.jpg" },
          { id: "imagen5", label: "Huella 5", src: "/path/to/image5.jpg" },
          { id: "imagen6", label: "Huella 6", src: "/path/to/image6.jpg" },
          { id: "imagen7", label: "Huella 7", src: "/path/to/image7.jpg" },
          { id: "imagen8", label: "Huella 8", src: "/path/to/image8.jpg" },
          { id: "imagen9", label: "Huella 9", src: "/path/to/image9.jpg" },
          { id: "imagen0", label: "Huella 0", src: "/path/to/image0.jpg" },
        ].map((img) => (
          <Col key={img.id} xs={6} sm={4} md={3} lg={2} className="d-flex justify-content-center">
            <Card className="shadow-sm border-0" style={{ width: '10rem', borderRadius: '12px' }}>
              <Card.Img 
                variant="top" 
                src={img.src} 
                alt={img.label} 
                style={{ borderRadius: '10px', height: '120px', objectFit: 'cover' }}
              />
              <Card.Body className="text-center p-2">
                <Card.Title className="fw-bold text-primary" style={{ fontSize: '14px' }}>{img.label}</Card.Title>
                <div className="d-flex justify-content-center mt-1">
                  <input
                    type="radio"
                    name={`radio-${img.id}`}
                    value="Sí"
                    className="form-check-input"
                    onChange={() => handleRadioChange(img.label, 'Sí', 'Huellas')}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Lista de radio seleccionados */}
      <div className="mt-4">
        <h5 className="text-danger">Campos con errores:</h5>
        <ul>
          {radioSeleccionados.map((item, index) => (
            <li key={index}>{item.nombre}</li>
          ))}
        </ul>
      </div>
    </form>
  );
};

export default SubirHuellas;
