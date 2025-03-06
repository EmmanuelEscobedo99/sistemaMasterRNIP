import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import '../../../sistema/css/estilo.css';
import ValidacionBloqueUno from '../../../sistema/validaciones/validacionBloque1/ValidacionBloqueUno';
import useDatosGeneralesStore from '../../zustand/useDatosGeneralesStore';
import useStore from '../../zustand/useStore';

const Domicilio = ({ data, onFormChange, onValidationStatus }) => {
  const { register, formState: { errors }, setError, clearErrors } = useFormContext();
  const { seleccionarRadio, radioSeleccionados } = useDatosGeneralesStore();
  const { situacion } = useStore();

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

  const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  useEffect(() => {
    onValidationStatus(errors);
  }, [errors, onValidationStatus]);

  const renderTooltip = (message) => <Tooltip>{message}</Tooltip>;

  const situacionObtenida = situacion?.[0] || {};

  // Función para formatear fechas (de ISO a YYYY-MM-DD)
  const formatFecha = (fecha) => {
    if (!fecha) return '';
    return fecha.split('T')[0];  // Separa por la 'T' y toma solo la parte de la fecha
  };

  // Mapeo para mostrar descripción en vez de clave
  const getFieldValue = (fieldId) => {
    switch (fieldId) {
      case "CLASIFICA":
        return situacionObtenida.clasificacion_descripcion || situacionObtenida.CLASIFICA || '';
      case "PELIGRO":
        return situacionObtenida.peligrosidad_descripcion || situacionObtenida.PELIGRO || '';
      case "FUERO":
        return situacionObtenida.fuero_descripcion || situacionObtenida.FUERO || '';
      case "DELITO":
        return situacionObtenida.delito_descripcion || situacionObtenida.DELITO || '';
      case "FEC_ACT":
      case "FECHAAVERI":
        return formatFecha(situacionObtenida[fieldId]) || '';  // Aquí aplicamos la función para formatear fechas
      default:
        return situacionObtenida[fieldId] || '';
    }
  };

  const fields = [
    { id: "AV_PREVIA", label: "Número de averiguación previa" },
    { id: "SIT_KEY", label: "Consecutivo de situación" },
    { id: "CLASIFICA", label: "Clasificación jurídica del individuo" },
    { id: "PELIGRO", label: "Grado de peligrosidad del individuo" },
    { id: "FUERO", label: "Fuero" },
    { id: "PROCESO", label: "Número de proceso" },
    { id: "INGRESO", label: "Ingreso" },
    { id: "FEC_ACT", label: "Fecha de actualización" },
    { id: "DELITO", label: "Delito principal" },
    { id: "CONSIG", label: "Número de consignación" },
    { id: "CONSI_DES", label: "Descripción de consignación" },
    { id: "MP", label: "Ministerio público que consigna" },
    { id: "FECHAAVERI", label: "Fecha de averiguación previa" },
    { id: "SENDETER", label: "Sentido determinación por el juez" },
  ];

  return (
    <div className="row">
      {fields.map((field) => (
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
              value={getFieldValue(field.id)}
              {...register(field.id, { onChange: handleChange })}
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
            onChange={() => handleRadioChange(field.label, 'Sí', 'Situación')}
          />
        </div>
      ))}

      {/* Lista de radio seleccionados */}
      <div className="mt-4">
        <h5 style={{ color: 'red' }}>Campos con errores:</h5>
        <ul>
          {radioSeleccionados.map((item, index) => (
            <li key={index}>{item.nombre}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Domicilio;
