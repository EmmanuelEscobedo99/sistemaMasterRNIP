import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import '../../../sistema/css/estilo.css';
import ValidacionBloqueUno from '../../../sistema/validaciones/validacionBloque1/ValidacionBloqueUno';
import useDatosGeneralesStore from '../../zustand/useDatosGeneralesStore';
import useStore from '../../zustand/useStore';
import { motion } from 'framer-motion';

const EjecucionP2 = ({ data, onFormChange, onValidationStatus }) => {
  const { register, formState: { errors }, setError, clearErrors } = useFormContext();
  const { seleccionarRadio, radioSeleccionados } = useDatosGeneralesStore();
  const { ejecucion } = useStore();

  // Estado de carga
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulamos la carga de datos
    setTimeout(() => {
      setLoading(false); // Cambiar el estado de carga después de 2 segundos
    }, 2000);
  }, []);

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

  // Mapeo de claves a descripciones y fechas formateadas
  const getFieldValue = (fieldId) => {
    const item = ejecucion?.[0] || {};

    switch (fieldId) {
      case "ID_TIPO_RESOLUCION":
        return item.tipo_resolucion_descripcion || item.ID_TIPO_RESOLUCION || '';
      case "ESTADO_LUG_PROCESO":
        return item.estado_lugar_proceso_descripcion || item.ESTADO_LUG_PROCESO || '';
      case "MUNICIPIO_LUG_PROCESO":
        return item.municipio_lugar_proceso_descripcion || item.MUNICIPIO_LUG_PROCESO || '';
      case "ID_ESTATUS_SITUACION":
        return item.estatus_situacion_descripcion || item.ID_ESTATUS_SITUACION || '';
      case "FECHA_EXTERNA":
      case "FECHA_REINGRESO":
      case "FECHA_EXT_REIN":
        return item[fieldId] || '';
      default:
        return item[fieldId] || '';
    }
  };

  // Si el estado de carga es verdadero, mostramos la pantalla de carga
  if (loading) {
    return (
      <motion.div
        className="d-flex justify-content-center align-items-center"
        style={{
          height: '50vh',
          backgroundColor: 'transparent',
          flexDirection: 'column',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src="../../../../public/ssp.jpeg" // Ruta de tu imagen de carga
          alt="Cargando..."
          width="200px"
        />
        <p style={{ color: 'black', marginTop: '20px', fontSize: '24px', fontWeight: 'bold' }}>
          Cargando Ejecución PT2...
        </p>
      </motion.div>
    );
  }

  return (
    <div className="row">
      {[
        { id: "ARTICULOS", label: "Artículos del código penal" },
        { id: "OBJETO_DELITO", label: "Objeto y cantidad del delito" },
        { id: "ID_TIPO_RESOLUCION", label: "Tipo de resolución" },
        { id: "ESTADO_LUG_PROCESO", label: "Entidad donde se llevó el proceso" },
        { id: "MUNICIPIO_LUG_PROCESO", label: "Municipio donde se llevó el proceso" },
        { id: "HORA_INGRESO", label: "Hora que ingresa el interno" },
        { id: "HORA_EXTERNA", label: "Hora de externación del interno" },
        { id: "FECHA_EXTERNA", label: "Fecha de externación" },
        { id: "FECHA_REINGRESO", label: "Fecha de reingreso" },
        { id: "HORA_REINGRESO", label: "Hora de reingreso del interno" },
        { id: "FECHA_EXT_REIN", label: "Fecha de externación del reingreso" },
        { id: "HORA_EXT_REIN", label: "Hora de externación del reingreso" },
        { id: "ID_ESTATUS_SITUACION", label: "Estatus de la situación penal actual" },
      ].map((field) => (
        <div key={field.id} className="col-md-6 form-floating mt-3 d-flex align-items-center">
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

          {/* Checkbox toggleable */}
          <input
            type="checkbox"
            name={`checkbox-${field.id}`}
            value="Sí"
            checked={radioSeleccionados.some(item => item.nombre === field.label && item.valor === 'Sí')}
            className="ms-2"
            onChange={() => {
              if (radioSeleccionados.some(item => item.nombre === field.label && item.valor === 'Sí')) {
                seleccionarRadio(field.label, null, 'Ejecución PT2');
              } else {
                seleccionarRadio(field.label, 'Sí', 'Ejecución PT2');
              }
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default EjecucionP2;
