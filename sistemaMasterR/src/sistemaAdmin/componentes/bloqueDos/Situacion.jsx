import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import '../../../sistema/css/estilo.css';
import ValidacionBloqueUno from '../../../sistema/validaciones/validacionBloque1/ValidacionBloqueUno';
import useDatosGeneralesStore from '../../zustand/useDatosGeneralesStore';
import useStore from '../../zustand/useStore';
import { motion } from 'framer-motion';

const Domicilio = ({ data, onFormChange, onValidationStatus }) => {
  const { register, formState: { errors }, setError, clearErrors } = useFormContext();
  const { seleccionarRadio, radioSeleccionados } = useDatosGeneralesStore();
  const { situacion } = useStore();

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

  // Lógica nueva para manejar checkbox toggleables
  const handleCheckboxChange = (label, valor) => {
    if (radioSeleccionados.some(item => item.nombre === label && item.valor === valor)) {
      seleccionarRadio(label, null, 'Situación');
    } else {
      seleccionarRadio(label, valor, 'Situación');
    }
  };

  const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  useEffect(() => {
    onValidationStatus(errors);
  }, [errors, onValidationStatus]);

  const renderTooltip = (message) => <Tooltip>{message}</Tooltip>;

  const situacionObtenida = situacion?.[0] || {};

  const formatFecha = (fecha) => {
    if (!fecha) return '';
    return fecha.split('T')[0];
  };

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
        return formatFecha(situacionObtenida[fieldId]) || '';
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
          Cargando situación...
        </p>
      </motion.div>
    );
  }

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
              value={getFieldValue(field.id)}
              {...register(field.id, { onChange: handleChange })}
              style={{ borderColor: errors[field.id] ? 'red' : '' }}
            />
          </OverlayTrigger>
          <label htmlFor={field.id} style={{ marginLeft: '10px' }}>{field.label}</label>

          {/* Checkbox Toggle (con apariencia de botón redondo) */}
          <div className="d-flex justify-content-center">
            <input
              type="checkbox"
              name={`checkbox-${index}`}
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

export default Domicilio;
