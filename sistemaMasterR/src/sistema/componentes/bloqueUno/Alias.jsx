import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import ValidacionBloqueUno from '../../validaciones/validacionBloque1/ValidacionBloqueUno';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

const Alias = ({ data, onFormChange, onValidationStatus }) => {
  const { register, formState: { errors }, setError, clearErrors, reset, watch } = useFormContext();
  const [aliasList, setAliasList] = useState([]);
  const [currentId, setCurrentId] = useState(1);

  // Observar alias en tiempo real
  const alias = watch("alias", "");

  const [isEmpty, setIsEmpty] = useState(true);
  const [hasErrors, setHasErrors] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const validationResult = ValidacionBloqueUno[`validacion${capitalizeFirstLetter(name)}`](value);

    if (validationResult !== true) {
      setError(name, { type: 'manual', message: validationResult });
    } else {
      clearErrors(name);
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const addNewAlias = () => {
    if (aliasList.length >= 5) return; // No permitir más de 5 alias

    setAliasList(prevState => [
      ...prevState,
      { id: currentId, alias: alias.trim() }
    ]);

    reset({ alias: '' });
    setCurrentId(prevId => prevId + 1);
  };

  // Monitorear cambios en los inputs y errores
  useEffect(() => {
    const isFieldFilled = alias.trim() !== "";
    setIsEmpty(!isFieldFilled);

    setHasErrors(Object.keys(errors).length > 0);
  }, [alias, errors]);

  useEffect(() => {
    onValidationStatus(errors);
  }, [errors, onValidationStatus]);

  useEffect(() => {
    onFormChange(aliasList);
  }, [aliasList, onFormChange]);

  const renderTooltip = (message) => (
    <Tooltip>
      {message}
    </Tooltip>
  );


  return (
    <>
      <div className="row">
         
      <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={errors.alias ? renderTooltip(errors.alias.message) : <></>} >
            <input
              type="text"
              className={`form-control ${errors.alias ? 'is-invalid shake' : ''}`}
              id="alias"
              name="alias"
              placeholder={errors.alias ? errors.alias.message : "alias"}
              {...register('alias', { onChange: handleChange })}
              style={{ borderColor: errors.alias ? 'red' : '' }}
            />
          </OverlayTrigger>
          <label htmlFor="alias" style={{ marginLeft: '10px' }}>Alias</label>
        </div>

      
      </div>

      <button 
      className='btn-reg'
        type="button" 
        onClick={addNewAlias} 
        disabled={isEmpty || hasErrors || aliasList.length >= 5} // Bloquea si está vacío, hay errores o hay 5 alias
      >
        Guardar Alias
      </button>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Alias</th>
          </tr>
        </thead>
        <tbody>
          {aliasList.map(aliasObj => (
            <tr key={aliasObj.id}>
              <td>{aliasObj.id}</td>
              <td>{aliasObj.alias}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {aliasList.length >= 5 && (
        <p style={{ color: 'red' }}>⚠️ Solo se pueden agregar hasta 5 alias.</p>
      )}
    </>
  );
};

export default Alias;
