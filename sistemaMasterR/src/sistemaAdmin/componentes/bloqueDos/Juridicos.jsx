import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import '../../../sistema/css/estilo.css';
import ValidacionBloqueUno from '../../../sistema/validaciones/validacionBloque1/ValidacionBloqueUno';
import useDatosGeneralesStore from '../../zustand/useDatosGeneralesStore';
import useStore from '../../zustand/useStore';

const Domicilio = ( { data, onFormChange, onValidationStatus } ) => {
  const { register, formState: { errors }, setError, clearErrors } = useFormContext();
  const { datos, actualizarDato, seleccionarRadio, radioSeleccionados } = useDatosGeneralesStore();
  const { juridicos } = useStore();

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

  const juridicosObtenidos = juridicos?.[0] || {};
  const juriObt = juridicosObtenidos?.[0] || {};
  console.log(juriObt);

  return (
    <div className="row">
      { [
        { id: "FECHACON", label: "Fecha de consignación" },
        { id: "NJUZGADO", label: "Número de juzgado" },
        { id: "FECHAR", label: "Fecha de radicación" },
        { id: "TRIBUNAL", label: "Tribunal proceso" },
        { id: "AMPARO", label: "Amparo" },
        { id: "SENRESOL", label: "Resolución amparo 1era instancia" },
        { id: "FECHRESOLA", label: "Fecha de resolución 1era instancia" },
        { id: "TOCA", label: "Número de toca" },
        { id: "DICTAMEN", label: "Sentido resolución 2da instancia" },
        { id: "AMPARO2", label: "Amparo 2da instancia" },
        { id: "SENRESOL2", label: "Sentido resolución amparo 2da instancia" },
        { id: "FECHRESOLA2", label: "Fecha resolución amparo 2da instancia" },
        { id: "FECHRESOLP", label: "Sentido resolución 1era instancia" },
        { id: "SENRESOLP", label: "Sentido resolución 1era instancia" },
        { id: "FECHATER", label: "Fecha de auto de término" },
        { id: "SENTER", label: "Sentido del término" },
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
              value={juriObt[field.id] || ''}
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
            onChange={ () => handleRadioChange( field.label, 'Sí', 'Juridicos PT1' ) }
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
