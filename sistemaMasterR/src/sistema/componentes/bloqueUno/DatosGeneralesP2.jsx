import React, {useEffect} from 'react';
import { useFormContext } from 'react-hook-form';
import ValidacionBloqueUno from '../../validaciones/validacionBloque1/ValidacionBloqueUno';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import '../../css/estilo.css'


const DatosGeneralesP2 = ({data, onFormChange, onValidationStatus}) => {
const { register, formState: { errors }, setError, clearErrors } = useFormContext();

 
const handleChange = (e) => {
  const { name, value } = e.target;
  const lowercaseName = name.toLowerCase();
  const validationResult = ValidacionBloqueUno[`validacion${capitalizeFirstLetter(lowercaseName)}`](value);  
 
  if (validationResult !== true) {
    setError(name, { type: 'formulario 1', message: validationResult });
  } else {
    clearErrors(name);
  }
  onFormChange(name, value);
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};







useEffect(() => {
  onValidationStatus(errors);
  }, [errors, onValidationStatus]);

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
      overlay={errors.telefono ? renderTooltip(errors.telefono.message) : <></>}
    >
      <input
        type="text"
        className={`form-control ${errors.telefono ? 'is-invalid shake' : ''}`}
        id="telefono"
        name="telefono"
        placeholder={errors.telefono ? errors.telefono.message : "telefono"}
        {...register('telefono', { onChange: handleChange })}
        style={{ borderColor: errors.telefono ? 'red' : '' }}
      />
    </OverlayTrigger>
    <label htmlFor="telefono" style={{ marginLeft: '10px' }}>Telefono del individuo</label>
  </div>


  <div className="col-md-3 form-floating mt-3">
    <OverlayTrigger
      placement="right"
      overlay={errors.formula  ? renderTooltip(errors.formula .message) : <></>}
    >
      <input
        type="text"
        className={`form-control ${errors.formula  ? 'is-invalid shake' : ''}`}
        id="formula "
        name="formula "
        placeholder={errors.formula  ? errors.formula.message : "formula "}
        {...register('formula', { onChange: handleChange })}
        style={{ borderColor: errors.formula ? 'red' : '' }}
      />
    </OverlayTrigger>
    <label htmlFor="formula" style={{ marginLeft: '10px' }}>Formula</label>
  </div>


  <div className="col-md-3 form-floating mt-3">
    <OverlayTrigger
      placement="right"
      overlay={errors.subformula ? renderTooltip(errors.subformula.message) : <></>}
    >
      <input
        type="text"
        className={`form-control ${errors.subformula ? 'is-invalid shake' : ''}`}
        id="subformula"
        name="subformula"
        placeholder={errors.subformula ? errors.subformula.message : "subformula"}
        {...register('subformula', { onChange: handleChange })}
        style={{ borderColor: errors.subformula ? 'red' : '' }}
      />
    </OverlayTrigger>
    <label htmlFor="subformula" style={{ marginLeft: '10px' }}>subformula</label>
  </div>
  
  
  <div className="col-md-3 form-floating mt-3">
    <OverlayTrigger
      placement="right"
      overlay={errors.folio ? renderTooltip(errors.folio.message) : <></>}
    >
      <input
        type="text"
        className={`form-control ${errors.folio ? 'is-invalid shake' : ''}`}
        id="folio"
        name="folio"
        placeholder={errors.folio ? errors.folio.message : "folio"}
        {...register('folio', { onChange: handleChange })}
        style={{ borderColor: errors.folio ? 'red' : '' }}
      />
    </OverlayTrigger>
    <label htmlFor="folio" style={{ marginLeft: '10px' }}>Folio</label>
  </div>


</div>

  
    <div className="row">

    <div className="col-md-3 form-floating mt-3">
    <OverlayTrigger
      placement="right"
      overlay={errors.codbar ? renderTooltip(errors.codbar.message) : <></>}
    >
      <input
        type="text"
        className={`form-control ${errors.codbar ? 'is-invalid shake' : ''}`}
        id="codbar"
        name="codbar"
        placeholder={errors.codbar ? errors.codbar.message : "codbar"}
        {...register('codbar', { onChange: handleChange })}
        style={{ borderColor: errors.codbar ? 'red' : '' }}
      />
    </OverlayTrigger>
    <label htmlFor="codbar" style={{ marginLeft: '10px' }}>CIB (antes NCP)</label>
  </div>

  <div className="col-md-3 form-floating mt-3">
    <OverlayTrigger
      placement="right"
      overlay={errors.tipoexp ? renderTooltip(errors.tipoexp.message) : <></>}
    >
      <input
        type="text"
        className={`form-control ${errors.tipoexp ? 'is-invalid shake' : ''}`}
        id="tipoexp"  
        name="tipoexp"
        placeholder={errors.tipoexp ? errors.tipoexp.message : "tipoexp"}
        {...register('tipoexp', { onChange: handleChange })}
        style={{ borderColor: errors.tipoexp ? 'red' : '' }}
      />
    </OverlayTrigger>
    <label htmlFor="tipoexp" style={{ marginLeft: '10px' }}>Tipo de expediente</label>
  </div>
      
  <div className="col-md-3 form-floating mt-3">
    <OverlayTrigger
      placement="right"
      overlay={errors.escolaridad ? renderTooltip(errors.escolaridad.message) : <></>}
    >
      <input
        type="text"
        className={`form-control ${errors.escolaridad ? 'is-invalid shake' : ''}`}
        id="escolaridad"
        name="escolaridad"
        placeholder={errors.escolaridad ? errors.escolaridad.message : "escolaridad"}
        {...register('escolaridad', { onChange: handleChange })}
        style={{ borderColor: errors.escolaridad ? 'red' : '' }}
      />
    </OverlayTrigger>
    <label htmlFor="escolaridad" style={{ marginLeft: '10px' }}>Escolaridad</label>
  </div>
      
  <div className="col-md-3 form-floating mt-3">
    <OverlayTrigger
      placement="right"
      overlay={errors.etnia ? renderTooltip(errors.etnia.message) : <></>}
    >
      <input
        type="text"
        className={`form-control ${errors.etnia ? 'is-invalid shake' : ''}`}
        id="etnia"
        name="etnia"
        placeholder={errors.etnia ? errors.etnia.message : "etnia"}
        {...register('etnia', { onChange: handleChange })}
        style={{ borderColor: errors.etnia ? 'red' : '' }}
      />
    </OverlayTrigger>
    <label htmlFor="etnia" style={{ marginLeft: '10px' }}>Etnia</label>
  </div>
      
  
     
    </div>
  
    <div className="row">
     
    <div className="col-md-3 form-floating mt-3">
    <OverlayTrigger
      placement="right"
      overlay={errors.religion ? renderTooltip(errors.religion.message) : <></>}
    >
      <input
        type="text"
        className={`form-control ${errors.religion ? 'is-invalid shake' : ''}`}
        id="religion"           
        name="religion"
        placeholder={errors.religion ? errors.religion.message : "religion"}
        {...register('religion', { onChange: handleChange })}
        style={{ borderColor: errors.religion ? 'red' : '' }}
      />
    </OverlayTrigger>
    <label htmlFor="religion" style={{ marginLeft: '10px' }}>Religión</label>
  </div>

  <div className="col-md-3 form-floating mt-3">
    <OverlayTrigger
      placement="right"
      overlay={errors.remesa ? renderTooltip(errors.remesa.message) : <></>}
    >
      <input
        type="text"
        className={`form-control ${errors.remesa ? 'is-invalid shake' : ''}`}
        id="remesa"
        name="remesa"
        placeholder={errors.remesa ? errors.remesa.message : "remesa"}
        {...register('remesa', { onChange: handleChange })}
        style={{ borderColor: errors.remesa ? 'red' : '' }}
      />
    </OverlayTrigger>
    <label htmlFor="remesa" style={{ marginLeft: '10px' }}> Remesa de traslado al interno</label>
  </div>

 
  <div className="col-md-3 form-floating mt-3">
    <OverlayTrigger
      placement="right"
      overlay={errors.estadoexpediente ? renderTooltip(errors.estadoexpediente.message) : <></>}
    >
      <input
        type="text"
        className={`form-control ${errors.estadoexpediente ? 'is-invalid shake' : ''}`}
        id="estadoexpediente"
        name="estadoexpediente"
        placeholder={errors.estadoexpediente ? errors.estadoexpediente.message : "estadoexpediente"}
        {...register('estadoexpediente', { onChange: handleChange })}
        style={{ borderColor: errors.estadoexpediente ? 'red' : '' }}
      />
    </OverlayTrigger>
    <label htmlFor="estadoexpediente" style={{ marginLeft: '10px' }}>Estado actual del expediente</label>
  </div>


      
  
  <div className="col-md-3 form-floating mt-3">
    <OverlayTrigger
      placement="right"
      overlay={errors.ubicacioninterno ? renderTooltip(errors.ubicacioninterno.message) : <></>}
    >
      <input
        type="text"
        className={`form-control ${errors.ubicacioninterno ? 'is-invalid shake' : ''}`}
        id="ubicacioninterno"
        name="ubicacioninterno"
        placeholder={errors.ubicacioninterno ? errors.ubicacioninterno.message : "ubicacioninterno"}
        {...register('ubicacioninterno', { onChange: handleChange })}
        style={{ borderColor: errors.ubicacioninterno ? 'red' : '' }}
      />
    </OverlayTrigger>
    <label htmlFor="ubicacioninterno" style={{ marginLeft: '10px' }}>Ubicación del individuo</label>
  </div>
       
  </div>
  
  
    <div className="row">
  
    <div className="col-md-3 form-floating mt-3">
    <OverlayTrigger
      placement="right"
      overlay={errors.idhablaindigena ? renderTooltip(errors.idhablaindigena.message) : <></>}
    >
      <input
        type="text"
        className={`form-control ${errors.idhablaindigena ? 'is-invalid shake' : ''}`}
        id="idhablaindigena"
        name="idhablaindigena"
        placeholder={errors.idhablaindigena ? errors.idhablaindigena.message : "idhablaindigena"}
        {...register('idhablaindigena', { onChange: handleChange })}
        style={{ borderColor: errors.idhablaindigena ? 'red' : '' }}
      />
    </OverlayTrigger>
    <label htmlFor="idhablaindigena" style={{ marginLeft: '10px' }}>Habla lengua indígena</label>
  </div>
  
  
  <div className="col-md-3 form-floating mt-3">
    <OverlayTrigger
      placement="right"
      overlay={errors.idindigena ? renderTooltip(errors.idindigena.message) : <></>}
    >
      <input
        type="text"
        className={`form-control ${errors.idindigena ? 'is-invalid shake' : ''}`}
        id="idindigena"
        name="idindigena"
        placeholder={errors.idindigena ? errors.idindigena.message : "idindigena"}
        {...register('idindigena', { onChange: handleChange })}
        style={{ borderColor: errors.idindigena ? 'red' : '' }}
      />
    </OverlayTrigger>
    <label htmlFor="idindigena" style={{ marginLeft: '10px' }}>Identificacion de la condicion</label>
  </div>
  
  
  
  <div className="col-md-3 form-floating mt-3">
    <OverlayTrigger
      placement="right"
      overlay={errors.idsentenciaabsolutoria ? renderTooltip(errors.idsentenciaabsolutoria.message) : <></>}
    >
      <input
        type="text"
        className={`form-control ${errors.idsentenciaabsolutoria ? 'is-invalid shake' : ''}`}
        id="idsentenciaabsolutoria"
        name="idsentenciaabsolutoria"
        placeholder={errors.idsentenciaabsolutoria ? errors.idsentenciaabsolutoria.message : "idsentenciaabsolutoria"}
        {...register('idsentenciaabsolutoria', { onChange: handleChange })}
        style={{ borderColor: errors.idsentenciaabsolutoria ? 'red' : '' }}
      />
    </OverlayTrigger>
    <label htmlFor="idsentenciaabsolutoria" style={{ marginLeft: '10px' }}> Leyenda de sentencia</label>
  </div>
  
  <div className="col-md-3 form-floating mt-3">
    <OverlayTrigger
      placement="right"
      overlay={errors.idanalfabeta ? renderTooltip(errors.idanalfabeta.message) : <></>}
    >
      <input
        type="text"
        className={`form-control ${errors.idanalfabeta ? 'is-invalid shake' : ''}`}
        id="idanalfabeta"
        name="idanalfabeta"
        placeholder={errors.idanalfabeta ? errors.idanalfabeta.message : "idanalfabeta"}
        {...register('idanalfabeta', { onChange: handleChange })}
        style={{ borderColor: errors.idanalfabeta ? 'red' : '' }}
      />
    </OverlayTrigger>
    <label htmlFor="idanalfabeta" style={{ marginLeft: '10px' }}> es analfabeta el individuo </label>
  </div>
  
      
    </div>
  
  
  
  
  </>
  );
};

export default DatosGeneralesP2;