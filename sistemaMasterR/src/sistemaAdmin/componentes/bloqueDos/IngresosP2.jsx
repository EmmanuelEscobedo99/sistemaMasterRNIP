import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import '../../../sistema/css/estilo.css';
import ValidacionBloqueUno from '../../../sistema/validaciones/validacionBloque1/ValidacionBloqueUno';
import useDatosGeneralesStore from '../../zustand/useDatosGeneralesStore';
import useStore from '../../zustand/useStore';

const IngresosP2 = ({ data, onFormChange, onValidationStatus }) => {
  const { register, formState: { errors }, setError, clearErrors } = useFormContext();
  const { seleccionarRadio, radioSeleccionados } = useDatosGeneralesStore();
  const { ingresos } = useStore();

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
                      ? renderTooltip(errors[`${field.id}_${index}`].message)
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

                {/* Radio Button - Marca el campo como error */}
                <input
                  type="radio"
                  name={`radio-${field.id}-${index}`}
                  value="Sí"
                  className="ms-2"
                  onChange={() =>
                    handleRadioChange(field.label, 'Sí', 'Ingresos PT2', index)
                  }
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Lista de campos marcados como error */}
      <div className="mt-4">
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
      </div>
    </div>
  );
};

export default IngresosP2;
