import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import '../../../sistema/css/estilo.css';
import ValidacionBloqueUno from '../../../sistema/validaciones/validacionBloque1/ValidacionBloqueUno';
import useDatosGeneralesStore from '../../zustand/useDatosGeneralesStore';
import useStore from '../../zustand/useStore';

const DatosGeneralesP2 = ({ data, onFormChange, onValidationStatus }) => {
  const { register, formState: { errors }, setError, clearErrors } = useFormContext();
  const { datos, actualizarDato, seleccionarRadio, radioSeleccionados } = useDatosGeneralesStore();
  const { datosGenerales } = useStore();

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

  const renderTooltip = (message) => (
    <Tooltip>{message}</Tooltip>
  );

  const datosGeneralesObtenidos = datosGenerales?.[0] || {};

  const getFieldValue = (fieldId) => {
    switch (fieldId) {
      case "ESCOLARIDAD":
        return datosGeneralesObtenidos.escolaridad_descripcion || datosGeneralesObtenidos.ESCOLARIDAD || '';
      case "ETNIA":
        return datosGeneralesObtenidos.etnia_descripcion || datosGeneralesObtenidos.ETNIA || '';
      case "RELIGION":
        return datosGeneralesObtenidos.religion_descripcion || datosGeneralesObtenidos.RELIGION || '';
      case "ESTADO_EXPEDIENTE":
        return datosGeneralesObtenidos.estado_expediente_descripcion || datosGeneralesObtenidos.ESTADO_EXPEDIENTE || '';
      case "UBICACION_INTERNO":
        return datosGeneralesObtenidos.ubicacion_interno_descripcion || datosGeneralesObtenidos.UBICACION_INTERNO || '';
      case "ID_HABLA_INDIGENA":
        return datosGeneralesObtenidos.habla_indigena_descripcion || datosGeneralesObtenidos.ID_HABLA_INDIGENA || '';
      case "ID_INDIGENA":
        return datosGeneralesObtenidos.indigena_descripcion || datosGeneralesObtenidos.ID_INDIGENA || '';
      case "ID_SENTENCIA_ABSOLUTORIA":
        return datosGeneralesObtenidos.sentencia_absolutoria_descripcion || datosGeneralesObtenidos.ID_SENTENCIA_ABSOLUTORIA || '';
      case "ID_ANALFABETA":
        return datosGeneralesObtenidos.analfabeta_descripcion || datosGeneralesObtenidos.ID_ANALFABETA || '';
      default:
        return datosGeneralesObtenidos[fieldId] || '';
    }
  };

  // Mapeo de campos con sus nombres descriptivos y etiquetas
  const fields = [
    { id: "TELEFONO", label: "Teléfono del individuo" },
    { id: "FORMULA", label: "Fórmula" },
    { id: "SUBFORMULA", label: "Subfórmula" },
    { id: "FOLIO", label: "Folio" },
    { id: "CODBAR", label: "CIB (antes NCP)" },
    { id: "TIPOEXP", label: "Tipo de expediente" },
    { id: "ESCOLARIDAD", label: "Escolaridad" },
    { id: "ETNIA", label: "Etnia" },
    { id: "RELIGION", label: "Religión" },
    { id: "REMESA", label: "Remesa de traslado al interno" },
    { id: "ESTADO_EXPEDIENTE", label: "Estado actual del expediente" },
    { id: "UBICACION_INTERNO", label: "Ubicación del individuo" },
    { id: "ID_HABLA_INDIGENA", label: "Habla lengua indígena" },
    { id: "ID_INDIGENA", label: "Identificación de la condición" },
    { id: "ID_SENTENCIA_ABSOLUTORIA", label: "Leyenda de sentencia" },
    { id: "ID_ANALFABETA", label: "Es analfabeta el individuo" },
  ];

  // Manejo de selección/deselección de checkboxes
  const handleCheckboxChange = (label, valor) => {
    if (radioSeleccionados.some(item => item.nombre === label && item.valor === valor)) {
      seleccionarRadio(label, null, 'Datos Generales P2');
    } else {
      seleccionarRadio(label, valor, 'Datos Generales P2');
    }
  };

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
          
          {/* Checkbox para Selección */}
          <div className="d-flex justify-content-center">
            <input
              type="checkbox"
              name={`checkbox-${field.id}`}
              value="Sí"
              checked={radioSeleccionados.some(item => item.nombre === field.label && item.valor === 'Sí')}
              className="ms-2"
              onChange={() => handleCheckboxChange(field.label, 'Sí')}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DatosGeneralesP2;
