import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import ValidacionNombres from '../../validaciones/validacionBloque1/ValidacionNombres';
import '../../css/estilo.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

const Nombres = ({ nombres, onFormChange, onValidationStatus }) => {
  const { register, formState: { errors }, setError, clearErrors, reset, getValues, watch } = useFormContext();
  const [nombresList, setNombresList] = useState([]);
  const [currentId, setCurrentId] = useState(1);
  
  // Observar los valores en tiempo real
  const dnombre = watch("dnombre", "");
  const dpaterno = watch("dpaterno", "");
  const dmaterno = watch("dmaterno", "");

  const [isEmpty, setIsEmpty] = useState(true);
  const [hasErrors, setHasErrors] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const validationResult = ValidacionNombres[`validacion${capitalizeFirstLetter(name)}`](value);

    if (validationResult !== true) {
      setError(name, { type: 'manual', message: validationResult });
    } else {
      clearErrors(name);
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const addNewName = () => {
    if (nombresList.length >= 5) return; // No permitir más de 5 IDs

    const formData = {
      nombre: dnombre.trim(),
      apaterno: dpaterno.trim(),
      amaterno: dmaterno.trim()
    };

    setNombresList(prevState => [
      ...prevState,
      { id: currentId, ...formData }
    ]);

    reset({ dnombre: '', dpaterno: '', dmaterno: '' });
    setCurrentId(prevId => prevId + 1);
  };

  // Monitorear cambios en los inputs y errores
  useEffect(() => {
    const allFieldsFilled = dnombre.trim() !== "" && dpaterno.trim() !== "" && dmaterno.trim() !== "";
    setIsEmpty(!allFieldsFilled);

    setHasErrors(Object.keys(errors).length > 0);
  }, [dnombre, dpaterno, dmaterno, errors]);

  useEffect(() => {
    onValidationStatus(errors);
  }, [errors, onValidationStatus]);

  useEffect(() => {
    onFormChange(nombresList);
  }, [nombresList, onFormChange]);

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
            overlay={errors.dnombre ? renderTooltip(errors.dnombre.message) : <></>}
          >
            <input
              type="text"
              className={`form-control ${errors.dnombre ? 'is-invalid shake' : ''}`}
              id="dnombre"
              name="dnombre"
              placeholder={errors.dnombre ? errors.dnombre.message : "dnombre"}
              {...register('dnombre', { onChange: handleChange })}
              style={{ borderColor: errors.dnombre ? 'red' : '' }}
            />
          </OverlayTrigger>
          <label htmlFor="dnombre" style={{ marginLeft: '10px' }}>nombre</label>
        </div>
      
        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={errors.dpaterno ? renderTooltip(errors.dpaterno.message) : <></>}
          >
            <input
              type="text"
              className={`form-control ${errors.dpaterno ? 'is-invalid shake' : ''}`}
              id="dpaterno"
              name="dpaterno"
              placeholder={errors.dpaterno ? errors.dpaterno.message : "dpaterno"}
              {...register('dpaterno', { onChange: handleChange })}
              style={{ borderColor: errors.dpaterno ? 'red' : '' }}
            />
          </OverlayTrigger>
          <label htmlFor="dpaterno" style={{ marginLeft: '10px' }}>apellido paterno</label>
        </div>
      
        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={errors.dmaterno ? renderTooltip(errors.dmaterno.message) : <></>}
          >
            <input
              type="text"
              className={`form-control ${errors.dmaterno ? 'is-invalid shake' : ''}`}
              id="dmaterno"
              name="dmaterno"
              placeholder={errors.dmaterno ? errors.dmaterno.message : "dmaterno"}
              {...register('dmaterno', { onChange: handleChange })}
              style={{ borderColor: errors.dmaterno ? 'red' : '' }}
            />
          </OverlayTrigger>
          <label htmlFor="dmaterno" style={{ marginLeft: '10px' }}>apellido materno</label>
        </div>  
       
        
       
      </div>

      <button 
        className='btn-reg'
        type="button" 
        onClick={addNewName} 
        disabled={isEmpty || hasErrors || nombresList.length >= 5} // Bloquea si hay vacíos, errores o 5 nombres
      >
        Guardar nombre
      </button>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
          </tr>
        </thead>
        <tbody>
          {nombresList.map(nombreObj => (
            <tr key={nombreObj.id}>
              <td>{nombreObj.id}</td>
              <td>{nombreObj.nombre}</td>
              <td>{nombreObj.apaterno}</td>
              <td>{nombreObj.amaterno}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {nombresList.length >= 5 && (
        <p style={{ color: 'red' }}>⚠️ Solo se pueden agregar hasta 5 nombres.</p>
      )}
    </>
  );
};

export default Nombres;

