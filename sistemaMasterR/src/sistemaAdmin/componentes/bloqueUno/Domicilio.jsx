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
  const { datos, actualizarDato, seleccionarRadio, radioSeleccionados, establecerIdBloqueFuncional } = useDatosGeneralesStore();
  const { domicilio, cargarDomicilio } = useStore();

  // Estado de carga
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulamos una carga de datos
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

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    onValidationStatus(errors);
  }, [errors, onValidationStatus]);

  const renderTooltip = (message) => (
    <Tooltip>{message}</Tooltip>
  );

  const domicilioObtenidos = domicilio?.[0] || {};

  // Manejo de selección/deselección de checkboxes
  const handleCheckboxChange = (label, valor) => {
    if (radioSeleccionados.some(item => item.nombre === label && item.valor === valor)) {
      seleccionarRadio(label, null, 'Domicilio');
    } else {
      seleccionarRadio(label, valor, 'Domicilio');
      establecerIdBloqueFuncional(1); // 🟢 ID_BLOQUE_FUNCIONAL = 1 para DOMICILIO
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
          src="../../../../public/ssp.jpeg"
          alt="Cargando..."
          width="200px"
        />
        <p style={{ color: 'black', marginTop: '20px', fontSize: '24px', fontWeight: 'bold' }}>
          Cargando domicilio...
        </p>
      </motion.div>
    );
  }

  return (
    <div className="row">
      {[
        { id: "DMUNIC", label: "Municipio del individuo", sourceKey: "nombre_municipio" },
        { id: "DENTID", label: "Entidad federativa", sourceKey: "nombre_entidad" },
        { id: "DCOLONIA", label: "Colonia del individuo" },
        { id: "DCALLE", label: "Calle del individuo" },
        { id: "DCP", label: "Código postal" },
      ].map((field) => (
        <div key={field.id} className="col-md-4 form-floating mt-3 d-flex align-items-center">
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
              value={
                field.sourceKey ? (domicilioObtenidos[field.sourceKey] || '') : (domicilioObtenidos[field.id] || '')
              }
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

export default Domicilio;
