import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import '../../../sistema/css/estilo.css';
import ValidacionBloqueUno from '../../../sistema/validaciones/validacionBloque1/ValidacionBloqueUno';
import useDatosGeneralesStore from '../../zustand/useDatosGeneralesStore';

const DatosGenerales = ({ onValidationStatus }) => {
  const { register, formState: { errors }, setError, clearErrors } = useFormContext();
  const { datos, actualizarDato, seleccionarRadio, radioSeleccionados } = useDatosGeneralesStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const validationResult = ValidacionBloqueUno[`validacion${capitalizeFirstLetter(name)}`](value);

    if (validationResult !== true) {
      setError(name, { type: 'formulario 1', message: validationResult });
    } else {
      clearErrors(name);
    }

    actualizarDato(name, value);
  };

  const handleRadioChange = (nombre, valor, formulario) => {
    seleccionarRadio(nombre, valor, formulario);
  };

  const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  useEffect(() => {
    onValidationStatus(errors);
  }, [errors, onValidationStatus]);

  const renderTooltip = (message) => <Tooltip>{message}</Tooltip>;

  return (
    <div className="row">
      {[
        { id: "fechacap", label: "Fecha de captura" },
        { id: "sexo", label: "Sexo del individuo" },
        { id: "edad", label: "Edad del individuo" },
        { id: "estatura", label: "Estatura del individuo" },
        { id: "peso", label: "Peso del individuo" },
        { id: "estciv", label: "Estado civil del individuo" },
        { id: "fecnac", label: "Fecha de nacimiento" },
        { id: "nentid", label: "Entidad de nacimiento" },
        { id: "nmunic", label: "Municipio de nacimiento" },
        { id: "npais", label: "País de nacimiento" },
        { id: "nacionalidad", label: "Nacionalidad" },
        { id: "tipsan", label: "Tipo de sangre" },
        { id: "tipsan1", label: "Factor RH" },
        { id: "usoant", label: "Usa anteojos" },
        { id: "rfc", label: "RFC" },
        { id: "oficiodes", label: "Oficio del individuo" },
      ].map((field) => (
        <div key={field.id} className="col-md-3 form-floating mt-3 d-flex align-items-center">
          <OverlayTrigger
            placement="right"
            overlay={errors[field.id] ? renderTooltip(errors[field.id].message) : <></>}
          >
            <input
              type="text"
              className={`form-control ${errors[field.id] ? 'is-invalid shake' : ''}`}
              id={field.id}
              name={field.id}
              placeholder={errors[field.id] ? errors[field.id].message : field.label}
              {...register(field.id, { onChange: handleChange })}
              value={datos[field.id] || ''}
              style={{ borderColor: errors[field.id] ? 'red' : '' }}
            />
          </OverlayTrigger>
          <label htmlFor={field.id} style={{ marginLeft: '10px' }}>{field.label}</label>

          {/* Radio Button */}
          <input
            type="radio"
            name={`radio-${field.id}`}
            value="Sí"
            className="ms-2"
            onChange={() => handleRadioChange(field.label, "Sí", "Datos Generales PT1")}
          />
        </div>
      ))}

      {/* Lista de radio seleccionados */}
      <div className="mt-4">
        <h5 style={{ color: 'red'}}>Campos con errores:</h5>
        <ul>
          {radioSeleccionados.map((item, index) => (
            <li key={index}>{item.nombre}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DatosGenerales;
