import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import '../../../sistema/css/estilo.css';
import ValidacionBloqueUno from '../../../sistema/validaciones/validacionBloque1/ValidacionBloqueUno';
import useDatosGeneralesStore from '../../zustand/useDatosGeneralesStore';
import useStore from '../../zustand/useStore';
import api from '../../../api/api';
import { useSelector } from 'react-redux';

const DatosGenerales = ({ onValidationStatus }) => {
  const { register, formState: { errors }, setError, clearErrors } = useFormContext();
  const { actualizarDato, seleccionarRadio, radioSeleccionados } = useDatosGeneralesStore();

  const { datosGenerales, cargarDatosGenerales, cargarNombres, cargarDomicilio, cargarAlias, cargarSituacion, cargarJuridicos, cargarEjecucion, cargarODelito, cargarIngresos, cargarIngDelito } = useStore();

  const idAlterna = useSelector((state) => state.idAlterna.value);

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

  useEffect(() => {
    if (idAlterna) {
      cargarDatosGenerales('obtenerDatosGenerales', idAlterna);
      cargarNombres('obtenerNombres', idAlterna);
      cargarDomicilio('obtenerDomicilio', idAlterna);
      cargarAlias('obtenerAlias', idAlterna);
      cargarSituacion('obtenerSituacion', idAlterna);
      cargarJuridicos('obtenerJuridicos', idAlterna);
      cargarEjecucion('obtenerEjecucion', idAlterna);
      cargarODelito('obtenerODelito', idAlterna);
      cargarIngresos('obtenerIngresos', idAlterna);
      cargarIngDelito('obtenerIngDelito', idAlterna);
    }
  }, [idAlterna]);

  useEffect(() => {
    onValidationStatus(errors);
  }, [errors]);

  const datosGeneralesObtenidos = datosGenerales?.[0] || {};

  const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  const renderTooltip = (message) => <Tooltip>{message}</Tooltip>;

  const formatFecha = (fechaISO) => {
    if (!fechaISO) return '';
    const fecha = new Date(fechaISO);
    return fecha.toISOString().split('T')[0];
  };

  const getFieldValue = (fieldId) => {
    switch (fieldId) {
      case "EST_CIV":
        return datosGeneralesObtenidos.estado_civil_descripcion || datosGeneralesObtenidos.EST_CIV || '';
      case "SEXO":
        return datosGeneralesObtenidos.sexo_descripcion || datosGeneralesObtenidos.SEXO || '';
      case "NENTID":
        return datosGeneralesObtenidos.nombre_entidad_nacimiento || datosGeneralesObtenidos.NENTID || '';
      case "NMUNIC":
        return datosGeneralesObtenidos.nombre_municipio_nacimiento || datosGeneralesObtenidos.NMUNIC || '';
      case "NPAIS":
        return datosGeneralesObtenidos.nombre_pais || datosGeneralesObtenidos.NPAIS || '';
      case "NNACIONA":
        return datosGeneralesObtenidos.nombre_nacionalidad || datosGeneralesObtenidos.NNACIONA || '';
      case "FECHA_CAP":
      case "FEC_NAC":
        return formatFecha(datosGeneralesObtenidos[fieldId]);
      default:
        return datosGeneralesObtenidos[fieldId] || '';
    }
  };

  // Mapeo de campos con sus nombres descriptivos y etiquetas
  const fieldNames = {
    "FECHA_CAP": { label: "Fecha de captura", field: "FECHA_CAP" },
    "SEXO": { label: "Sexo del individuo", field: "SEXO" },
    "EDAD": { label: "Edad del individuo", field: "EDAD" },
    "ESTATURA": { label: "Estatura del individuo", field: "ESTATURA" },
    "PESO": { label: "Peso del individuo", field: "PESO" },
    "EST_CIV": { label: "Estado civil del individuo", field: "EST_CIV" },
    "FEC_NAC": { label: "Fecha de nacimiento", field: "FEC_NAC" },
    "NENTID": { label: "Entidad de nacimiento", field: "NENTID" },
    "NMUNIC": { label: "Municipio de nacimiento", field: "NMUNIC" },
    "NPAIS": { label: "País de nacimiento", field: "NPAIS" },
    "NNACIONA": { label: "Nacionalidad", field: "NNACIONA" },
    "TIP_SAN": { label: "Tipo de sangre", field: "TIP_SAN" },
    "TIP_SAN1": { label: "Factor RH", field: "TIP_SAN1" },
    "USO_ANT": { label: "Usa anteojos", field: "USO_ANT" },
    "RFC": { label: "RFC", field: "RFC" },
    "OFICIO_DES": { label: "Oficio del individuo", field: "OFICIO_DES" }
  };

  // Manejo de selección/deselección de checkboxes
  const handleCheckboxChange = (label, valor) => {
    if (radioSeleccionados.some(item => item.nombre === label && item.valor === valor)) {
      seleccionarRadio(label, null, 'Datos Generales P1');
    } else {
      seleccionarRadio(label, valor, 'Datos Generales P1');
    }
  };

  return (
    <div className="row">
      {Object.keys(fieldNames).map((fieldId, index) => (
        <div key={fieldId} className="col-md-3 form-floating mt-3 d-flex align-items-center">
          <OverlayTrigger
            placement="right"
            overlay={errors[fieldId] ? renderTooltip(errors[fieldId].message) : <></>}
          >
            <input
              type="text"
              className={`form-control ${errors[fieldId] ? 'is-invalid shake' : ''}`}
              id={fieldId}
              name={fieldNames[fieldId].field}
              placeholder={errors[fieldId] ? errors[fieldId].message : fieldNames[fieldId].label}
              {...register(fieldNames[fieldId].field, { onChange: handleChange })}
              value={getFieldValue(fieldNames[fieldId].field)}
              style={{ borderColor: errors[fieldId] ? 'red' : '' }}
            />
          </OverlayTrigger>
          <label htmlFor={fieldId} style={{ marginLeft: '10px' }}>
            {fieldNames[fieldId].label}
          </label>

          {/* Checkbox para Selección */}
          <div className="d-flex justify-content-center">
            <input
              type="checkbox"
              name={`checkbox-${index}`}
              value="Sí"
              checked={radioSeleccionados.some(item => item.nombre === fieldNames[fieldId].label && item.valor === 'Sí')}
              className="ms-2"
              onChange={() => handleCheckboxChange(fieldNames[fieldId].label, 'Sí')}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DatosGenerales;
