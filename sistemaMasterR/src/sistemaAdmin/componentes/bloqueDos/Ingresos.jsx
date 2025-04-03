import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import '../../../sistema/css/estilo.css';
import ValidacionBloqueUno from '../../../sistema/validaciones/validacionBloque1/ValidacionBloqueUno';
import useDatosGeneralesStore from '../../zustand/useDatosGeneralesStore';
import useStore from '../../zustand/useStore';
import { motion } from 'framer-motion';

const Ingresos = ({ data, onFormChange, onValidationStatus }) => {
  const { register, formState: { errors }, setError, clearErrors } = useFormContext();
  const { seleccionarRadio, radioSeleccionados } = useDatosGeneralesStore();
  const { ingresos } = useStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    onValidationStatus(errors);
  }, [errors, onValidationStatus]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const lowercaseName = name.toLowerCase();
    const validationResult = ValidacionBloqueUno[`validacion${capitalizeFirstLetter(lowercaseName)}`]?.(value);

    if (validationResult !== true) {
      setError(`${name}_${index}`, { type: 'formulario 1', message: validationResult });
    } else {
      clearErrors(`${name}_${index}`);
    }
    onFormChange(`${name}_${index}`, value);
  };

  const handleRadioChange = (nombre, valor, formulario, index) => {
    const nombreCompleto = `${nombre} Ingreso ${index + 1}`;
    seleccionarRadio(nombreCompleto, valor, formulario);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const formatFecha = (fecha) => {
    if (!fecha) return '';
    if (fecha.includes('T')) {
      return fecha.split('T')[0];  // Formato: YYYY-MM-DD
    }
    return fecha;  // Si ya viene bien formateada
  };

  const renderTooltip = (message) => (
    <Tooltip>{message}</Tooltip>
  );

  const fields = [
    { id: "DAUTORI", label: "Autoridad que consigna" },
    { id: "DPARTIDA", label: "No de causa o partida penal" },
    { id: "DFECHA", label: "Fecha de la causa", isDate: true },
    { id: "DOBSERVA", label: "Observaciones situación penal" },
    { id: "PROCESO", label: "Número de proceso" },
    { id: "EDO_PROCESO_DESC", label: "Estado del proceso" },
    { id: "FUERO_DESC", label: "Fuero" },
    { id: "DAV_PREVIA", label: "Número de averiguación previa" },
    { id: "NJUZGADO", label: "Número de juzgado" },
    { id: "FECHAR", label: "Fecha de radicación", isDate: true },
    { id: "CLASSD", label: "Consignado por" },
    { id: "TRIBUNAL", label: "Tribunal" },
    { id: "FECHEJEC", label: "Fecha de ejecución", isDate: true },
    { id: "FECHARES", label: "Fecha de arresto", isDate: true },
    { id: "FECHAAPARTIR", label: "Fecha de compurgación", isDate: true },
    { id: "PENAANO", label: "Pena en años" },
  ];

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
          Cargando Ingresos...
        </p>
      </motion.div>
    );
  }

  return (
    <div className="container-fluid">
      {ingresos.map((ingreso, index) => (
        <div key={index} className="mb-4 p-3 border rounded">
          <h5>{`Ingreso #${index + 1}`}</h5>
          <div className="row">
            {fields.map((field) => (
              <div key={field.id} className="col-md-6 form-floating mt-3 d-flex align-items-center">
                <OverlayTrigger
                  placement="right"
                  overlay={errors[`${field.id}_${index}`] ? renderTooltip(errors[`${field.id}_${index}`]?.message) : <></>}
                >
                  <input
                    type="text"
                    className={`form-control ${errors[`${field.id}_${index}`] ? 'is-invalid shake' : ''}`}
                    id={`${field.id}_${index}`}
                    name={field.id}
                    placeholder={errors[`${field.id}_${index}`]?.message || field.label}
                    value={field.isDate ? formatFecha(ingreso[field.id]) : (ingreso[field.id] || '')}
                    {...register(`${field.id}_${index}`, { onChange: (e) => handleChange(index, e) })}
                    style={{ borderColor: errors[`${field.id}_${index}`] ? 'red' : '' }}
                    readOnly
                  />
                </OverlayTrigger>
                <label htmlFor={`${field.id}_${index}`} style={{ marginLeft: '10px' }}>{field.label}</label>

                {/* Checkbox toggleable */}
                <input
                  type="checkbox"
                  name={`checkbox-${field.id}-${index}`}
                  value="Sí"
                  className="ms-2"
                  checked={radioSeleccionados.some(item => item.nombre === `${field.label} Ingreso ${index + 1}` && item.valor === 'Sí')}
                  onChange={() => {
                    const nombreCompleto = `${field.label} Ingreso ${index + 1}`;
                    if (radioSeleccionados.some(item => item.nombre === nombreCompleto && item.valor === 'Sí')) {
                      seleccionarRadio(nombreCompleto, null, 'Ingresos');
                    } else {
                      seleccionarRadio(nombreCompleto, 'Sí', 'Ingresos');
                    }
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Ingresos;
