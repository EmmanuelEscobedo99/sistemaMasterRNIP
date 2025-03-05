import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import '../../../sistema/css/estilo.css';
import ValidacionBloqueUno from '../../../sistema/validaciones/validacionBloque1/ValidacionBloqueUno';
import useDatosGeneralesStore from '../../zustand/useDatosGeneralesStore';
import useStore from '../../zustand/useStore';

const IngresosP2 = ( { data, onFormChange, onValidationStatus } ) => {
  const { register, formState: { errors }, setError, clearErrors } = useFormContext();
  const { datos, actualizarDato, seleccionarRadio, radioSeleccionados } = useDatosGeneralesStore();
  const { ingresos } = useStore();

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

  //console.log(ingresos);

  return (
    <div className="row">
      { [
        { id: "PENAMES", label: "Pena en meses" },
        { id: "PENADIA", label: "Pena en dias" },
        { id: "CERESOEJEC", label: "Cereso de compurgamiento" },
        { id: "FEXTERNA", label: "Fecha de externación" },
        { id: "MOTIVOEXTER", label: "Motivo de externación" },
        { id: "TERMINORESOL", label: "Término de la resolución" },
        { id: "ID_TIPO_RESOLUCION", label: "Tipo de resolución" },
        { id: "ESTADO_LUG_PROCESO", label: "Entidad donde se llevó el proceso" },
        { id: "MUNICIPIO_LUG_PROCESO", label: "Municipio donde se llevó el proceso" },
        { id: "HORA_INGRESO", label: "Hora que ingresa el interno" },
        { id: "HORA_EXTERNA", label: "Hora de externación del interno" },
        { id: "FECHA_EXTERNA", label: "Fecha de externación" },
        { id: "FECHA_REINGRESO", label: "Fecha externación y reingreso" },
        { id: "HORA_REINGRESO", label: "Hora externación y reingreso" },
        { id: "FECHA_EXT_REIN", label: "Fecha externación y reingreso" },
        { id: "HORA_EXT_REING", label: "Hora externación del interno" },
        { id: "ID_ESTATUS_SITUACION", label: "Estatus situación penal actual" },
        { id: "FECHA_INGRESO", label: "Fecha de ingreso del interno" },
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
              value={ingresos[0][field.id] || ''}
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
            onChange={ () => handleRadioChange( field.label, 'Sí', 'Ingresos PT2' ) }
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

export default IngresosP2;
