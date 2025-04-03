import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import '../../../sistema/css/estilo.css';
import ValidacionBloqueUno from '../../../sistema/validaciones/validacionBloque1/ValidacionBloqueUno';
import useDatosGeneralesStore from '../../zustand/useDatosGeneralesStore';
import useStore from '../../zustand/useStore';
import { motion } from 'framer-motion';

const Alias = ({ data, onFormChange, onValidationStatus }) => {
  const { register, formState: { errors }, setError, clearErrors } = useFormContext();
  const { seleccionarRadio, radioSeleccionados } = useDatosGeneralesStore();
  const { alias } = useStore();

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
    const validationResult = ValidacionBloqueUno[`validacion${capitalizeFirstLetter(lowercaseName)}`]?.(value);

    if (validationResult !== true) {
      setError(name, { type: 'manual', message: validationResult });
    } else {
      clearErrors(name);
    }

    onFormChange(name, value);
  };

  const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  const renderTooltip = (message) => (
    <Tooltip>{message}</Tooltip>
  );

  const aliasObtenidos = alias?.[0] || [];

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
          Cargando alias...
        </p>
      </motion.div>
    );
  }

  return (
    <div className="row">
      {aliasObtenidos.map((item, index) => {
        const nombreCampo = `Alias ${index + 1}`;
        return (
          <div key={index} className="col-md-3 form-floating mt-3 d-flex align-items-center">
            <OverlayTrigger
              placement="right"
              overlay={errors[`ALIAS_${index}`] ? renderTooltip(errors[`ALIAS_${index}`].message) : <></>}
            >
              <input
                type="text"
                className={`form-control ${errors[`ALIAS_${index}`] ? 'is-invalid shake' : ''}`}
                id={`ALIAS_${index}`}
                name={`ALIAS_${index}`}
                placeholder={`Alias ${index + 1}`}
                value={item.ALIAS || ''}
                {...register(`ALIAS_${index}`, { onChange: handleChange })}
                style={{ borderColor: errors[`ALIAS_${index}`] ? 'red' : '' }}
              />
            </OverlayTrigger>
            <label htmlFor={`ALIAS_${index}`} style={{ marginLeft: '10px' }}>
              {`Alias ${index + 1}`}
            </label>

            {/* Checkbox toggleable */}
            <input
              type="checkbox"
              name={`checkbox-ALIAS_${index}`}
              value="Sí"
              className="ms-2"
              checked={radioSeleccionados.some(item => item.nombre === nombreCampo && item.valor === 'Sí')}
              onChange={() => {
                if (radioSeleccionados.some(item => item.nombre === nombreCampo && item.valor === 'Sí')) {
                  seleccionarRadio(nombreCampo, null, 'Alias');
                } else {
                  seleccionarRadio(nombreCampo, 'Sí', 'Alias');
                }
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Alias;
