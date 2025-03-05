import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import '../../../sistema/css/estilo.css';
import ValidacionBloqueUno from '../../../sistema/validaciones/validacionBloque1/ValidacionBloqueUno';
import useDatosGeneralesStore from '../../zustand/useDatosGeneralesStore';
import useStore from '../../zustand/useStore';
import api from '../../../api/api';

const DatosGenerales = ({ onValidationStatus }) => {
  const { register, formState: { errors }, setError, clearErrors } = useFormContext();
  const { actualizarDato, seleccionarRadio, radioSeleccionados } = useDatosGeneralesStore();

  const { datosGenerales, cargarDatosGenerales } = useStore();
  const { cargarNombres } = useStore();
  const { cargarDomicilio } = useStore();
  const { cargarAlias } = useStore();
  const { cargarSituacion } = useStore();
  const { cargarJuridicos } = useStore();
  const { cargarEjecucion } = useStore();
  const { cargarODelito } = useStore();
  const { cargarIngresos } = useStore();
  const { cargarIngDelito } = useStore();

  const [idAlterna, setIdAlterna] = useState(1);

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

  const obtenerIdAlterna = async (LLAVE) => {
    try {
      const response = await api.post('obtenerIdAlterna/idAlterna', { LLAVE });
      if (response && response.data.status !== 404) {
        setIdAlterna(response.data[0].ID_ALTERNA);
      }
    } catch (error) {
      console.error('Error al obtener el ID alterna:', error);
    }
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

  const handleRadioChange = (nombre, valor, formulario) => {
    seleccionarRadio(nombre, valor, formulario);
  };

  const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  const renderTooltip = (message) => <Tooltip>{message}</Tooltip>;

  // Función para mapear los valores correctos
  const getFieldValue = (fieldId) => {
    switch (fieldId) {
      case "EST_CIV":
        return datosGeneralesObtenidos.estado_civil_descripcion || datosGeneralesObtenidos.EST_CIV || '';
      case "NENTID":
        return datosGeneralesObtenidos.nombre_entidad_nacimiento || datosGeneralesObtenidos.NENTID || '';
      case "NMUNIC":
        return datosGeneralesObtenidos.nombre_municipio_nacimiento || datosGeneralesObtenidos.NMUNIC || '';
      case "NPAIS":
        return datosGeneralesObtenidos.nombre_pais || datosGeneralesObtenidos.NPAIS || '';
      case "NNACIONA":
        return datosGeneralesObtenidos.nombre_nacionalidad || datosGeneralesObtenidos.NNACIONA || '';
      default:
        return datosGeneralesObtenidos[fieldId] || '';
    }
  };

  const fields = [
    { id: "FECHA_CAP", label: "Fecha de captura" },
    { id: "SEXO", label: "Sexo del individuo" },
    { id: "EDAD", label: "Edad del individuo" },
    { id: "ESTATURA", label: "Estatura del individuo" },
    { id: "PESO", label: "Peso del individuo" },
    { id: "EST_CIV", label: "Estado civil del individuo" },
    { id: "FEC_NAC", label: "Fecha de nacimiento" },
    { id: "NENTID", label: "Entidad de nacimiento" },
    { id: "NMUNIC", label: "Municipio de nacimiento" },
    { id: "NPAIS", label: "País de nacimiento" },
    { id: "NNACIONA", label: "Nacionalidad" },
    { id: "TIP_SAN", label: "Tipo de sangre" },
    { id: "TIP_SAN1", label: "Factor RH" },
    { id: "USO_ANT", label: "Usa anteojos" },
    { id: "RFC", label: "RFC" },
    { id: "OFICIO_DES", label: "Oficio del individuo" }
  ];

  return (
    <div className="row">
      {fields.map((field, index) => (
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
              value={getFieldValue(field.id)}
              style={{ borderColor: errors[field.id] ? 'red' : '' }}
            />
          </OverlayTrigger>
          <label htmlFor={field.id} style={{ marginLeft: '10px' }}>{field.label}</label>

          {/* Radio Button */}
          <div className="ms-2">
            <input
              type="radio"
              name={`radio-${field.id}`}
              value="Sí"
              onChange={() => handleRadioChange(field.label, "Sí", "Datos Generales PT1")}
            />
          </div>
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

export default DatosGenerales;
