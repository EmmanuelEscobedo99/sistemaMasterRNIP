import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import '../../../sistema/css/estilo.css';
import ValidacionBloqueUno from '../../../sistema/validaciones/validacionBloque1/ValidacionBloqueUno';
import useDatosGeneralesStore from '../../zustand/useDatosGeneralesStore';

const Domicilio = ( { data, onFormChange, onValidationStatus } ) => {
  const { register, formState: { errors }, setError, clearErrors } = useFormContext();
  const { datos, actualizarDato, seleccionarRadio, radioSeleccionados } = useDatosGeneralesStore();

  const handleChange = ( e ) => {
    const { name, value } = e.target;
    const lowercaseName = name.toLowerCase();
    const validationResult = ValidacionBloqueUno[ `validacion${ capitalizeFirstLetter( lowercaseName ) }` ]( value );

    if ( validationResult !== true ) {
      setError( name, { type: 'formulario 1', message: validationResult } );
    } else {
      clearErrors( name );
    }
    onFormChange( name, value );
  };

  const handleRadioChange = ( nombre, valor, formulario ) => {
    seleccionarRadio( nombre, valor, formulario );
  };

  const capitalizeFirstLetter = ( string ) => {
    return string.charAt( 0 ).toUpperCase() + string.slice( 1 );
  };

  useEffect( () => {
    onValidationStatus( errors );
  }, [ errors, onValidationStatus ] );

  const renderTooltip = ( message ) => (
    <Tooltip>{ message }</Tooltip>
  );

  return (
    <div className="row">
      { [
        { id: "avprevia", label: "Número de averiguación previa" },
        { id: "sitkey", label: "Consecutivo de situación" },
        { id: "clasifica", label: "Clasificación juridica del individuo" },
        { id: "peligro", label: "Grado de peligrosidad del individuo" },
        { id: "fuero", label: "Fuero" },
        { id: "proceso", label: "Número de proceso" },
        { id: "ingreso", label: "Ingreso" },
        { id: "fecact", label: "Fecha de actualización" },
        { id: "delito", label: "Delito principal" },
        { id: "consig", label: "Número de consignación" },
        { id: "consides", label: "Descripción de consignación" },
        { id: "mp", label: "Ministerio público que consigna" },
        { id: "fechaaveri", label: "Fecha de averiguación previa" },
        { id: "sendeter", label: "Sentido determinación por el juez" },
      ].map( ( field ) => (
        <div key={ field.id } className="col-md-3 form-floating mt-3 d-flex align-items-center">
          <OverlayTrigger
            placement="right"
            overlay={ errors[ field.id ] ? renderTooltip( errors[ field.id ].message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors[ field.id ] ? 'is-invalid shake' : '' }` }
              id={ field.id }
              name={ field.id }
              placeholder={ errors[ field.id ] ? errors[ field.id ].message : field.label }
              { ...register( field.id, { onChange: handleChange } ) }
              style={ { borderColor: errors[ field.id ] ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor={ field.id } style={ { marginLeft: '10px' } }>{ field.label }</label>

          {/* Radio Button */ }
          <input
            type="radio"
            name={ `radio-${ field.id }` }
            value="Sí"
            className="ms-2"
            onChange={ () => handleRadioChange( field.label, 'Sí', 'Situación' ) }
          />
        </div>
      ) ) }
       {/* Lista de radio seleccionados */}
       <div className="mt-4">
        <h5 style={{ color: 'red'}}>Campos con errores:</h5>
        <ul>
          {radioSeleccionados.map((item, index) => (
            <li key={index}>{item.nombre}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Domicilio;
