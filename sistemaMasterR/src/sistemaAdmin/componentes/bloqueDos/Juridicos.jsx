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
  const { juridicos } = useStore();

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

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    onValidationStatus(errors);
  }, [errors, onValidationStatus]);

  const renderTooltip = (message) => (
    <Tooltip>{message}</Tooltip>
  );

  // Formatear fecha a YYYY-MM-DD
  const formatFecha = (fechaISO) => {
    if (!fechaISO) return '';
    if (fechaISO.includes('T')) {
      return fechaISO.split('T')[0];  // Si es ISO, recorta
    }
    return fechaISO;  // Si ya viene bien, la regresa igual
  };

  const getFieldValue = (fieldId) => {
    const value = juridicos[0]?.[fieldId] || '';
    const camposFecha = [
      "FECHACON",
      "FECHAR",
      "FECHRESOLA",
      "FECHRESOLA2",
      "FECHRESOLP",
      "FECHATER"
    ];

    if (camposFecha.includes(fieldId)) {
      return formatFecha(value);
    }

    return value;
  };

  const fields = [
    { id: "FECHACON", label: "Fecha de consignación" },
    { id: "NJUZGADO", label: "Número de juzgado" },
    { id: "FECHAR", label: "Fecha de radicación" },
    { id: "TRIBUNAL", label: "Tribunal proceso" },
    { id: "AMPARO", label: "Amparo" },
    { id: "SENRESOL", label: "Resolución amparo 1era instancia" },
    { id: "FECHRESOLA", label: "Fecha de resolución 1era instancia" },
    { id: "TOCA", label: "Número de toca" },
    { id: "DICTAMEN", label: "Sentido resolución 2da instancia" },
    { id: "AMPARO2", label: "Amparo 2da instancia" },
    { id: "SENRESOL2", label: "Sentido resolución amparo 2da instancia" },
    { id: "FECHRESOLA2", label: "Fecha resolución amparo 2da instancia" },
    { id: "FECHRESOLP", label: "Fecha de resolución 1era instancia" },
    { id: "SENRESOLP", label: "Sentido resolución 1era instancia" },
    { id: "FECHATER", label: "Fecha de auto de término" },
    { id: "SENTER", label: "Sentido del término" },
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
          Cargando Juridicos...
        </p>
      </motion.div>
    );
  }

  return (
    <div className="row">
      {fields.map((field) => (
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

          {/* Checkbox toggleable con lógica corregida */}
          <input
            type="checkbox"
            name={`checkbox-${field.id}`}
            value="Sí"
            checked={radioSeleccionados.some(item => item.nombre === field.label && item.valor === 'Sí')}
            className="ms-2"
            onChange={() => {
              if (radioSeleccionados.some(item => item.nombre === field.label && item.valor === 'Sí')) {
                seleccionarRadio(field.label, null, 'Juridicos');
              } else {
                seleccionarRadio(field.label, 'Sí', 'Juridicos');
              }
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default Domicilio;
