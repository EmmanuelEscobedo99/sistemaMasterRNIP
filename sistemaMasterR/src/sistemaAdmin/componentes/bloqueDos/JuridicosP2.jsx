import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import '../../../sistema/css/estilo.css';
import ValidacionBloqueUno from '../../../sistema/validaciones/validacionBloque1/ValidacionBloqueUno';
import useDatosGeneralesStore from '../../zustand/useDatosGeneralesStore';
import useStore from '../../zustand/useStore';

const JuridicosP2 = ( { data, onFormChange, onValidationStatus } ) => {
  const { register, formState: { errors }, setError, clearErrors } = useFormContext();
  const { seleccionarRadio, radioSeleccionados } = useDatosGeneralesStore();
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

  const capitalizeFirstLetter = ( string ) => string.charAt( 0 ).toUpperCase() + string.slice( 1 );

  useEffect( () => {
    onValidationStatus( errors );
  }, [ errors, onValidationStatus ] );

  const renderTooltip = ( message ) => (
    <Tooltip>{ message }</Tooltip>
  );

  const juridicosObtenidos = juridicos?.[ 0 ] || {};

  // Función para mapear valores especiales (con descripción de catálogo)
  const getFieldValue = ( fieldId ) => {
    switch ( fieldId ) {
      case "CALIDAD":
        return juridicosObtenidos.calidad_descripcion || juridicosObtenidos.CALIDAD || '';
      case "AUTOR":
        return juridicosObtenidos.autor_descripcion || juridicosObtenidos.AUTOR || '';
      case "AUTORIA":
        return juridicosObtenidos.autoria_descripcion || juridicosObtenidos.AUTORIA || '';
      case "PELIGROC":
        return juridicosObtenidos.peligrosidad_descripcion || juridicosObtenidos.PELIGROC || '';
      case "FECHRESOLT":
      case "FECHAAPELA":
      case "FECHAAMPARO":
      case "FECHAAMPARO2":
      case "FCUMPLIMIENTOS":
        return formatFecha( juridicosObtenidos[ fieldId ] );  // Formato de fecha
      default:
        return juridicosObtenidos[ fieldId ] || '';
    }
  };

  const formatFecha = ( fechaISO ) => {
    if ( !fechaISO ) return '';
    return fechaISO.split( 'T' )[ 0 ];  // Convierte '2025-03-02T06:00:00.000Z' a '2025-03-02'
  };

  const fields = [
    { id: "CALIDAD", label: "Calidad delincuencial del individuo" },
    { id: "FECHRESOLT", label: "Fecha de resolución 2da instancia" },
    { id: "TRIBUNALS", label: "Tribunal 2da instancia" },
    { id: "TRIBUNALPA", label: "Tribunal amparo 1era instancia" },
    { id: "TRIBUNALSA", label: "Tribunal amparo 2da instancia" },
    { id: "AUTOR", label: "Autor" },
    { id: "AUTORIA", label: "Autoria" },
    { id: "PELIGROC", label: "Peligrosidad criminal" },
    { id: "FECHAAPELA", label: "Fecha de apelación" },
    { id: "FECHAAMPARO", label: "Fecha de amparo 1era instancia" },
    { id: "FECHAAMPARO2", label: "Fecha de amparo 2da instancia" },
    { id: "PENAANOA", label: "Abono de pena años" },
    { id: "PENAMESA", label: "Abono de pena meses" },
    { id: "PENADIAA", label: "Abono de pena días" },
    { id: "FCUMPLIMIENTOS", label: "Fecha de cumplimiento de sentencia" },
  ];

  return (
    <div className="row">
      { fields.map( ( field ) => (
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
              value={ getFieldValue( field.id ) }
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
            onChange={ () => handleRadioChange( field.label, 'Sí', 'Juridicos PT2' ) }
          />
        </div>
      ) ) }
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

export default JuridicosP2;
