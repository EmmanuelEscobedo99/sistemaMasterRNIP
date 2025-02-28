import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import '../../../sistema/css/estilo.css';
import ValidacionBloqueUno from '../../../sistema/validaciones/validacionBloque1/ValidacionBloqueUno';
import useDatosGeneralesStore from '../../zustand/useDatosGeneralesStore';
import useStore from '../../zustand/useStore';

const DatosGeneralesP2 = ( { data, onFormChange, onValidationStatus } ) => {
  const { register, formState: { errors }, setError, clearErrors } = useFormContext();
  const { datos, actualizarDato, seleccionarRadio, radioSeleccionados } = useDatosGeneralesStore();
  const { datosGenerales, cargarDatosGenerales } = useStore();

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

  const datosGeneralesObtenidos = datosGenerales?.[0] || {};

  return (
    <div className="row">
      { [
        { id: "TELEFONO", label: "Telefono del individuo" },
        { id: "FORMULA", label: "Formula" },
        { id: "SUBFORMULA", label: "Subformula" },
        { id: "FOLIO", label: "Folio" },
        { id: "CODBAR", label: "CIB (antes NCP)" },
        { id: "TIPOEXP", label: "Tipo de expediente" },
        { id: "ESCOLARIDAD", label: "Escolaridad" },
        { id: "ETNIA", label: "Etnia" },
        { id: "RELIGION", label: "Religión" },
        { id: "REMESA", label: "Remesa de traslado al interno" },
        { id: "ESTADO_EXPEDIENTE", label: "Estado actual del expediente" },
        { id: "UBICACION_INTERNO", label: "Ubicación del individuo" },
        { id: "ID_HABLA_INDIGENA", label: "Habla lengua indígena" },
        { id: "ID_INDIGENA", label: "Identificacion de la condicion" },
        { id: "ID_SENTENCIA_ABSOLUTORIA", label: "Leyenda de sentencia" },
        { id: "ID_ANALFABETA", label: "Es analfabeta el individuo" },
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
              value={datosGeneralesObtenidos[field.id] || ''}
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
            onChange={ () => handleRadioChange( field.label, 'Sí', 'Datos Generales PT2' ) }
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

export default DatosGeneralesP2;
