import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import '../../../sistema/css/estilo.css';
import ValidacionBloqueUno from '../../../sistema/validaciones/validacionBloque1/ValidacionBloqueUno';
import useDatosGeneralesStore from '../../zustand/useDatosGeneralesStore';
import useStore from '../../zustand/useStore';
import { motion } from 'framer-motion';

const IngresosP2 = ({ data, onFormChange, onValidationStatus }) => {
  const { register, formState: { errors }, setError, clearErrors } = useFormContext();
  const { seleccionarRadio, radioSeleccionados } = useDatosGeneralesStore();
  const { ingresos } = useStore();

  // Estado de carga
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulamos la carga de datos
    setTimeout(() => {
      setLoading(false); // Cambiar el estado de carga después de 2 segundos
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

  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const formatFecha = (fecha) => {
    if (!fecha) return '';
    if (fecha.includes('T')) {
      return fecha.split('T')[0]; // YYYY-MM-DD
    }
    return fecha;
  };

  const renderTooltip = (message) => <Tooltip>{message}</Tooltip>;

  const fields = [
    { id: "PENAMES", label: "Pena en meses" },
    { id: "PENADIA", label: "Pena en días" },
    { id: "CERESOEJEC", label: "Cereso de compurgamiento" },
    { id: "FEXTERNA", label: "Fecha de externación", isDate: true },
    { id: "MOTIVOEXTER", label: "Motivo de externación" },
    { id: "TERMINORESOL", label: "Término de la resolución" },
    { id: "ID_TIPO_RESOLUCION_DESC", label: "Tipo de resolución" },
    { id: "ESTADO_LUG_PROCESO_DESC", label: "Entidad donde se llevó el proceso" },
    { id: "MUNICIPIO_LUG_PROCESO_DESC", label: "Municipio donde se llevó el proceso" },
    { id: "HORA_INGRESO", label: "Hora que ingresa el interno" },
    { id: "HORA_EXTERNA", label: "Hora de externación del interno" },
    { id: "FECHA_EXTERNA", label: "Fecha de externación", isDate: true },
    { id: "FECHA_REINGRESO", label: "Fecha externación y reingreso", isDate: true },
    { id: "HORA_REINGRESO", label: "Hora externación y reingreso" },
    { id: "FECHA_EXT_REIN", label: "Fecha externación y reingreso", isDate: true },
    { id: "HORA_EXT_REING", label: "Hora externación del interno" },
    { id: "ID_ESTATUS_SITUACION_DESC", label: "Estatus situación penal actual" },
    { id: "FECHA_INGRESO", label: "Fecha de ingreso del interno", isDate: true },
  ];

  const fieldLabels = fields.reduce((acc, field) => {
    acc[field.id] = field.label;
    return acc;
  }, {});

  const getFieldLabel = (fieldId) => fieldLabels[fieldId] || fieldId;

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
          Cargando Ingresos PT2...
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
              <div key={field.id} className="col-md-3 form-floating mt-3 d-flex align-items-center">
                <OverlayTrigger
                  placement="right"
                  overlay={
                    errors[`${field.id}_${index}`]
                      ? renderTooltip(errors[`${field.id}_${index}`]?.message)
                      : <></>
                  }
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
                      seleccionarRadio(nombreCompleto, null, 'Ingresos PT2');
                    } else {
                      seleccionarRadio(nombreCompleto, 'Sí', 'Ingresos PT2');
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

export default IngresosP2;
