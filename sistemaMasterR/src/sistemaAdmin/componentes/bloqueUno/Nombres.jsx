import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import '../../../sistema/css/estilo.css';
import ValidacionBloqueUno from '../../../sistema/validaciones/validacionBloque1/ValidacionBloqueUno';
import useDatosGeneralesStore from '../../zustand/useDatosGeneralesStore';
import useStore from '../../zustand/useStore';
import { motion } from 'framer-motion';

const DatosGeneralesP2 = ({ data, onFormChange, onValidationStatus }) => {
  const { register, formState: { errors }, setError, clearErrors } = useFormContext();
  const { seleccionarRadio, radioSeleccionados, establecerIdBloqueFuncional } = useDatosGeneralesStore();
  const { nombres } = useStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    onValidationStatus(errors);
  }, [errors, onValidationStatus]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const lowercaseName = name.toLowerCase();
    const validationFunction = ValidacionBloqueUno[`validacion${capitalizeFirstLetter(lowercaseName)}`];

    if (validationFunction) {
      const validationResult = validationFunction(value);
      if (validationResult !== true) {
        setError(name, { type: 'manual', message: validationResult });
      } else {
        clearErrors(name);
      }
    }

    onFormChange(name, value);
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

  const nombresObtenidos = nombres?.[0] || [];

  console.log('Nombres obtenidos:', nombresObtenidos);

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
          Cargando datos personales...
        </p>
      </motion.div>
    );
  }

  return (
    <div className="container-fluid">
      {nombresObtenidos.map((nombre, index) => (
        <div key={index} className="mb-4">
          <h5>{`Persona ${index + 1}`}</h5>
          <div className="row">
            {[
              { id: "DNOMBRE", label: "Nombre", value: nombre.DNOMBRE },
              { id: "DPATERNO", label: "Apellido Paterno", value: nombre.DPATERNO },
              { id: "DMATERNO", label: "Apellido Materno", value: nombre.DMATERNO }
            ].map((field) => (
              <div key={field.id} className="col-md-4 form-floating d-flex align-items-center">
                <OverlayTrigger
                  placement="right"
                  overlay={errors[`${field.id}_${index}`] ? renderTooltip(errors[`${field.id}_${index}`].message) : <></>}
                >
                  <input
                    type="text"
                    className={`form-control ${errors[`${field.id}_${index}`] ? 'is-invalid shake' : ''}`}
                    id={`${field.id}_${index}`}
                    name={`${field.id}_${index}`}
                    placeholder={field.label}
                    value={field.value || ''}
                    {...register(`${field.id}_${index}`, { onChange: handleChange })}
                    style={{ borderColor: errors[`${field.id}_${index}`] ? 'red' : '' }}
                  />
                </OverlayTrigger>
                <label htmlFor={`${field.id}_${index}`} className="ms-1">{field.label}</label>
                <div className="mt-2">
                  <input
                    type="checkbox"
                    name={`checkbox-${field.id}-${index}`}
                    value="Sí"
                    className="ms-2"
                    checked={radioSeleccionados.some(item => item.nombre === `${field.label} Nombre ${index + 1}` && item.valor === 'Sí')}
                    onChange={() => {
                      const nombreCompleto = `${field.label} Nombre ${index + 1}`;
                      if (radioSeleccionados.some(item => item.nombre === nombreCompleto && item.valor === 'Sí')) {
                        seleccionarRadio(nombreCompleto, null, 'Nombres');
                      } else {
                        seleccionarRadio(nombreCompleto, 'Sí', 'Nombres');
                        establecerIdBloqueFuncional(1); // ✅ Agregado para asignar ID_BLOQUE_FUNCIONAL = 1
                      }
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DatosGeneralesP2;
