import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip, OverlayTrigger, Card } from 'react-bootstrap';
import '../../../sistema/css/estilo.css';
import ValidacionBloqueUno from '../../../sistema/validaciones/validacionBloque1/ValidacionBloqueUno';
import useDatosGeneralesStore from '../../zustand/useDatosGeneralesStore';

const SubirPrincipales = ({ data, onFormChange, onValidationStatus }) => {
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
    <form className="row">
      <div className="col-12 d-flex justify-content-around mt-3">
        {[ 
          { id: "imagen1", label: "Frente", src: "/path/to/image1.jpg" },
          { id: "imagen2", label: "Lado derecho", src: "/path/to/image2.jpg" },
          { id: "imagen3", label: "Lado izquierdo", src: "/path/to/image3.jpg" }
        ].map((img) => (
          <Card key={img.id} style={{ width: '18rem' }}>
            <Card.Img variant="top" src={img.src} alt={img.label} />
            <Card.Body>
              <Card.Title>{img.label}</Card.Title>
              <div className="d-flex justify-content-center">
                <input
                  type="radio"
                  name={`radio-${img.id}`}
                  value="Sí"
                  className="ms-2"
                  onChange={() => handleRadioChange(img.label, 'Sí', 'Imagenes Principales')}
                /> 
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* Lista de radio seleccionados */}
      <div className="mt-4">
        <h5 style={{ color: 'red' }}>Campos con errores:</h5>
        <ul>
          {radioSeleccionados.map((item, index) => (
            <li key={index}>{item.nombre}</li>
          ))}
        </ul>
      </div>
    </form>
  );
};

export default SubirPrincipales;
