import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import '../../../sistema/css/estilo.css';
import ValidacionBloqueUno from '../../../sistema/validaciones/validacionBloque1/ValidacionBloqueUno';
import useDatosGeneralesStore from '../../zustand/useDatosGeneralesStore';
import useStore from '../../zustand/useStore';

const Ingdelito = ({ data, onFormChange, onValidationStatus }) => {
  const { register, formState: { errors }, setError, clearErrors } = useFormContext();
  const { seleccionarRadio, radioSeleccionados } = useDatosGeneralesStore();
  const { ingdelito } = useStore();

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
    const nombreCompleto = `${nombre} - Ingdelito ${index + 1}`;
    seleccionarRadio(nombreCompleto, valor, formulario);
  };

  const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  useEffect(() => {
    onValidationStatus(errors);
  }, [errors, onValidationStatus]);

  const renderTooltip = (message) => <Tooltip>{message}</Tooltip>;

  const fields = [
    { id: "DELITO_DESC", label: "Descripción del Delito" },
    { id: "id_desmod", label: "Modalidad del Delito (ID Desmod)" },
    { id: "RESPONSABILIDAD_DESC", label: "Responsabilidad Jurídica" },
    { id: "ING_KEY", label: "Llave de ingreso perteneciente al delito" },
    { id: "DELITO_SENTENCIA", label: "Descripción del delito acorde a la sentencia" },
  ];

  return (
    <div className="container-fluid">
      {ingdelito[0]?.map((delito, index) => (
        <div key={index} className="mb-4 p-3 border rounded">
          <h5>Delito #{index + 1}</h5>
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
                    name={`${field.id}_${index}`}
                    placeholder={errors[`${field.id}_${index}`]?.message || field.label}
                    value={delito[field.id] || ''}
                    {...register(`${field.id}_${index}`, { onChange: (e) => handleChange(index, e) })}
                    style={{ borderColor: errors[`${field.id}_${index}`] ? 'red' : '' }}
                    readOnly
                  />
                </OverlayTrigger>
                <label
                  htmlFor={`${field.id}_${index}`}
                  title={field.label} // Muestra el label completo al pasar el mouse
                  style={{
                    marginLeft: '10px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '100%'
                  }}
                >
                  {field.label}
                </label>

                {/* Radio Button para marcar campo */}
                <input
                  type="radio"
                  name={`radio-${field.id}-${index}`}
                  value="Sí"
                  className="ms-2"
                  onChange={() => handleRadioChange(field.label, 'Sí', 'Ingdelito', index)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Lista de radio seleccionados */}
      <div className="mt-4">
        <h5 style={{ color: 'red' }}>Campos con errores:</h5>
        <ul>
          {radioSeleccionados.length > 0 ? (
            radioSeleccionados.map((item, index) => (
              <li key={index}>{item.nombre}</li>
            ))
          ) : (
            <li>Sin campos marcados por el momento.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Ingdelito;
