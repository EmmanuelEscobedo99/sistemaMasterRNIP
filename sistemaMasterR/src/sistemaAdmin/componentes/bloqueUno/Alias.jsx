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
  const { seleccionarCheckbox, checkboxSeleccionados = [] } = useDatosGeneralesStore();  // Aseguramos que checkboxSeleccionados sea un array
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

  const handleCheckboxChange = (label, index) => {
    const nombreCompleto = `${label} Alias ${index + 1}`;
    const isChecked = checkboxSeleccionados.some(item => item.nombre === nombreCompleto && item.valor === 'Sí');

    if (isChecked) {
      // Desmarcar checkbox
      seleccionarCheckbox(nombreCompleto, null);  // El valor nulo indica que desmarcamos
    } else {
      // Marcar checkbox
      seleccionarCheckbox(nombreCompleto, 'Sí');  // Marcamos el checkbox con el valor 'Sí'
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const renderTooltip = (message) => (
    <Tooltip>{message}</Tooltip>
  );

  const aliasObtenidos = alias?.[0] || [];  // Nos aseguramos de que sea un array de alias

  return (
    <div className="row">
      {aliasObtenidos.map((item, index) => (
        <div key={index} className="col-md-3 form-floating mt-3 d-flex align-items-center">
          <OverlayTrigger
            placement="right"
            overlay={errors[`ALIAS_${index}`] ? renderTooltip(errors[`ALIAS_${index}`]?.message) : <></>}
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
          <label htmlFor={`ALIAS_${index}`} className="ms-1">{`Alias ${index + 1}`}</label>

          {/* Checkbox toggleable */}
          <div className="mt-2">
            <input
              type="checkbox"
              name={`checkbox-ALIAS-${index}`}
              value="Sí"
              className="ms-2"
              checked={checkboxSeleccionados.some(item => item.nombre === `Alias ${index + 1}` && item.valor === 'Sí')}
              onChange={() => handleCheckboxChange(`Alias ${index + 1}`, index)}  // Control de cambio
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Alias;
