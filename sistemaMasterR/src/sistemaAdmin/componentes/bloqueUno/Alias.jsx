import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import '../../../sistema/css/estilo.css';
import ValidacionBloqueUno from '../../../sistema/validaciones/validacionBloque1/ValidacionBloqueUno';
import useDatosGeneralesStore from '../../zustand/useDatosGeneralesStore';
import useStore from '../../zustand/useStore';

const Alias = ({ data, onFormChange, onValidationStatus }) => {
  const { register, formState: { errors }, setError, clearErrors } = useFormContext();
  const { seleccionarRadio, radioSeleccionados } = useDatosGeneralesStore();
  const { alias } = useStore();

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

  const handleRadioChange = (nombre, valor, formulario) => {
    seleccionarRadio(nombre, valor, formulario);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const renderTooltip = (message) => (
    <Tooltip>{message}</Tooltip>
  );

  const aliasObtenidos = alias?.[0] || [];  // Aquí nos aseguramos de que sea un array de alias

  console.log('Alias obtenidos:', aliasObtenidos);

  return (
    <div className="row">
      {aliasObtenidos.map((item, index) => (
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
          <label htmlFor={`ALIAS_${index}`} style={{ marginLeft: '10px' }}>{`Alias ${index + 1}`}</label>

          {/* Radio Button */}
          <input
            type="radio"
            name={`radio-ALIAS_${index}`}
            value="Sí"
            className="ms-2"
            onChange={() => handleRadioChange(`Alias ${index + 1}`, 'Sí', 'Alias')}
          />
        </div>
      ))}

      {/* Lista de radio seleccionados */}
      {/*<div className="mt-4">
        <h5 style={{ color: 'red' }}>Campos con errores:</h5>
        <ul>
          {radioSeleccionados.map((item, index) => (
            <li key={index}>{item.nombre}</li>
          ))}
        </ul>
      </div>*/}
    </div>
  );
};

export default Alias;
