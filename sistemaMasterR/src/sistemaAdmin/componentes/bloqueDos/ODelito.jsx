import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import '../../../sistema/css/estilo.css';
import ValidacionBloqueUno from '../../../sistema/validaciones/validacionBloque1/ValidacionBloqueUno';
import useDatosGeneralesStore from '../../zustand/useDatosGeneralesStore';
import useStore from '../../zustand/useStore';
import { motion } from 'framer-motion';

const ODelito = ({ data, onFormChange, onValidationStatus }) => {
  const { register, formState: { errors }, setError, clearErrors } = useFormContext();
  const { seleccionarRadio, radioSeleccionados } = useDatosGeneralesStore();
  const { odelito } = useStore();

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
    const nombreCompleto = `${nombre} Delito ${index + 1}`;
    seleccionarRadio(nombreCompleto, valor, formulario);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const renderTooltip = (message) => (
    <Tooltip>{message}</Tooltip>
  );

  // Mapeo de claves a descripciones y fechas formateadas
  const fields = [
    { id: "SIT_KEY", label: "Situación del delito" },
    { id: "DELITO_DESC", label: "Descripción del delito" },
    { id: "ID_DESMOD", label: "Clave de modalidad (ID_DESMOD)" },
    { id: "RESPONJUR_DESC", label: "Responsabilidad jurídica" },
    { id: "DELITO_SENTENCIA", label: "Descripción del delito sentencia" },
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
          Cargando ODelito...
        </p>
      </motion.div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-2">
        {odelito[0]?.map((delito, index) => (
          <div key={index} className="col">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">{`Delito #${index + 1}`}</h5>
                <div className="row">
                  {fields.map((field) => (
                    <div key={field.id} className="col-md-12 form-floating mt-1">
                      <OverlayTrigger
                        placement="right"
                        overlay={errors[`${field.id}_${index}`] ? renderTooltip(errors[`${field.id}_${index}`]?.message) : <></>}
                      >
                        <input
                          type="text"
                          className={`form-control ${errors[`${field.id}_${index}`] ? 'is-invalid shake' : ''}`}
                          id={`${field.id}_${index}`}
                          name={field.id}
                          placeholder={field.label}
                          value={delito[field.id] || ''}
                          {...register(`${field.id}_${index}`, {
                            onChange: (e) => handleChange(index, e),
                          })}
                          style={{ borderColor: errors[`${field.id}_${index}`] ? 'red' : '' }}
                          readOnly
                        />
                      </OverlayTrigger>
                      <label htmlFor={`${field.id}_${index}`} className="ms-1">{field.label}</label>
                      {/* Checkbox toggleable */}
                      <div className="mt-2">
                        <input
                          type="checkbox"
                          name={`checkbox-${field.id}-${index}`}
                          value="Sí"
                          className="ms-2"
                          checked={radioSeleccionados.some(item => item.nombre === `${field.label} Delito ${index + 1}` && item.valor === 'Sí')}
                          onChange={() => {
                            const nombreCompleto = `${field.label} Delito ${index + 1}`;
                            if (radioSeleccionados.some(item => item.nombre === nombreCompleto && item.valor === 'Sí')) {
                              seleccionarRadio(nombreCompleto, null, 'ODelito');
                            } else {
                              seleccionarRadio(nombreCompleto, 'Sí', 'ODelito');
                            }
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lista de campos marcados como error */}
      {/*<div className="mt-4">
        <h5 style={{ color: 'red' }}>Campos con errores:</h5>
        {radioSeleccionados.length > 0 ? (
          <ul>
            {radioSeleccionados.map((item, index) => (
              <li key={index}>{item.nombre}</li>
            ))}
          </ul>
        ) : (
          <p>Sin campos marcados por el momento.</p>
        )}
      </div>*/}
    </div>
  );
};

export default ODelito;
