import React, {useEffect} from 'react';
import { useFormContext } from 'react-hook-form';
import ValidacionBloqueUno from '../../validaciones/validacionBloque1/ValidacionBloqueUno';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import '../../css/estilo.css'


const DatosGenerales = ({data, onFormChange, onValidationStatus}) => {
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
      overlay={errors.fechacap ? renderTooltip(errors.fechacap.message) : <></>}
      container={document.body}  // Evita que afecte el layout
      flip={false}               // Evita que intente cambiar de posición
      rootClose={false}   
    >
      <input
        type="text"
        className={`form-control ${errors.fechacap ? 'is-invalid shake' : ''}`}
        id="fechacap"
        name="fechacap"
        placeholder={errors.fechacap ? errors.fechacap.message : "Nombre"}
        {...register('fechacap', { onChange: handleChange })}
        style={{ borderColor: errors.fechacap ? 'red' : '' }}
      />
    </OverlayTrigger>
    <label htmlFor="fechacap" style={{ marginLeft: '10px' }}>Fecha de captura</label>
  </div>

  <div className="col-md-3 form-floating mt-3">
    <OverlayTrigger
      placement="right"
      overlay={errors.sexo ? renderTooltip(errors.sexo.message) : <></>}
    >
      <input
        type="text"
        className={`form-control ${errors.sexo ? 'is-invalid shake' : ''}`}
        id="sexo"
        name="sexo"
        placeholder={errors.sexo ? errors.sexo.message : "sexo"}
        {...register('sexo', { onChange: handleChange })}
        style={{ borderColor: errors.sexo ? 'red' : '' }}
      />
    </OverlayTrigger>
    <label htmlFor="sexo" style={{ marginLeft: '10px' }}>sexo del individuo</label>
  </div>


  <div className="col-md-3 form-floating mt-3">
    <OverlayTrigger
      placement="right"
      overlay={errors.edad ? renderTooltip(errors.edad.message) : <></>}
    >
      <input
        type="text"
        className={`form-control ${errors.edad ? 'is-invalid shake' : ''}`}
        id="edad"
        name="edad"
        placeholder={errors.edad ? errors.edad.message : "edad"}
        {...register('edad', { onChange: handleChange })}
        style={{ borderColor: errors.edad ? 'red' : '' }}
      />
    </OverlayTrigger>
    <label htmlFor="edad" style={{ marginLeft: '10px' }}>Edad del individuo</label>
  </div>
  
  <div className="col-md-3 form-floating mt-3">
    <OverlayTrigger
      placement="right"
      overlay={errors.estatura ? renderTooltip(errors.estatura.message) : <></>}
    >
      <input
        type="text"
        className={`form-control ${errors.estatura ? 'is-invalid shake' : ''}`}
        id="estatura"
        name="estatura"
        placeholder={errors.estatura ? errors.estatura.message : "edad"}
        {...register('estatura', { onChange: handleChange })}
        style={{ borderColor: errors.estatura ? 'red' : '' }}
      />
    </OverlayTrigger>
    <label htmlFor="estatura" style={{ marginLeft: '10px' }}>Estatura del individuo</label>
  </div>  
</div>

  
    <div className="row">

    <div className="col-md-3 form-floating mt-3">
    <OverlayTrigger
      placement="right"
      overlay={errors.peso ? renderTooltip(errors.peso.message) : <></>}
    >
      <input
        type="text"
        className={`form-control ${errors.peso ? 'is-invalid shake' : ''}`}
        id="peso"
        name="peso"
        placeholder={errors.peso ? errors.peso.message : "peso"}
        {...register('peso', { onChange: handleChange })}
        style={{ borderColor: errors.peso ? 'red' : '' }}
      />
    </OverlayTrigger>
    <label htmlFor="peso" style={{ marginLeft: '10px' }}>peso del individuo</label>
  </div>  

  <div className="col-md-3 form-floating mt-3">
    <OverlayTrigger
      placement="right"
      overlay={errors.estciv ? renderTooltip(errors.estciv.message) : <></>}
    >
      <input
        type="text"
        className={`form-control ${errors.estciv ? 'is-invalid shake' : ''}`}
        id="estciv"
        name="estciv"
        placeholder={errors.estciv ? errors.estciv.message : "estciv"}
        {...register('estciv', { onChange: handleChange })}
        style={{ borderColor: errors.estciv ? 'red' : '' }}
      />
    </OverlayTrigger>
    <label htmlFor="estciv" style={{ marginLeft: '10px' }}>estado civil del individuo</label>
  </div>  
      
  <div className="col-md-3 form-floating mt-3">
    <OverlayTrigger
      placement="right"
      overlay={errors.fecnac ? renderTooltip(errors.fecnac.message) : <></>}
    >
      <input
        type="text"
        className={`form-control ${errors.fecnac ? 'is-invalid shake' : ''}`}
        id="fecnac"
        name="fecnac"
        placeholder={errors.fecnac ? errors.fecnac.message : "fecnac"}
        {...register('fecnac', { onChange: handleChange })}
        style={{ borderColor: errors.fecnac ? 'red' : '' }}
      />
    </OverlayTrigger>
    <label htmlFor="fecnac" style={{ marginLeft: '10px' }}>fecha de nacimiento</label>
  </div>  
      
  <div className="col-md-3 form-floating mt-3">
    <OverlayTrigger
      placement="right"
      overlay={errors.nentid ? renderTooltip(errors.nentid.message) : <></>}
    >
      <input
        type="text"
        className={`form-control ${errors.nentid ? 'is-invalid shake' : ''}`}
        id="nentid"
        name="nentid"
        placeholder={errors.nentid ? errors.nentid.message : "nentid"}
        {...register('nentid', { onChange: handleChange })}
        style={{ borderColor: errors.nentid ? 'red' : '' }}
      />
    </OverlayTrigger>
    <label htmlFor="nentid" style={{ marginLeft: '10px' }}>Entidad de nacimiento</label>
  </div>  
      
  
     
    </div>
  
    <div className="row">
     
    <div className="col-md-3 form-floating mt-3">
    <OverlayTrigger
      placement="right"
      overlay={errors.nmunic ? renderTooltip(errors.nmunic.message) : <></>}
    >
      <input
        type="text"
        className={`form-control ${errors.nmunic ? 'is-invalid shake' : ''}`}
        id="nmunic"
        name="nmunic"
        placeholder={errors.nmunic ? errors.nmunic.message : "nmunic"}
        {...register('nmunic', { onChange: handleChange })}
        style={{ borderColor: errors.nmunic ? 'red' : '' }}
      />
    </OverlayTrigger>
    <label htmlFor="nmunic" style={{ marginLeft: '10px' }}>Municipio de nacimiento</label>
  </div>  

  <div className="col-md-3 form-floating mt-3">
    <OverlayTrigger
      placement="right"
      overlay={errors.npais ? renderTooltip(errors.npais.message) : <></>}
    >
      <input
        type="text"
        className={`form-control ${errors.npais ? 'is-invalid shake' : ''}`}
        id="npais"
        name="npais"
        placeholder={errors.npais ? errors.npais.message : "npais"}
        {...register('npais', { onChange: handleChange })}
        style={{ borderColor: errors.npais ? 'red' : '' }}
      />
    </OverlayTrigger>
    <label htmlFor="npais" style={{ marginLeft: '10px' }}>Pais de nacimiento</label>
  </div>  

  <div className="col-md-3 form-floating mt-3">
    <OverlayTrigger
      placement="right"
      overlay={errors.nnaciona ? renderTooltip(errors.nnaciona.message) : <></>}
    >
      <input
        type="text"
        className={`form-control ${errors.nnaciona ? 'is-invalid shake' : ''}`}
        id="nnaciona"
        name="nnaciona"
        placeholder={errors.nnaciona ? errors.nnaciona.message : "nnaciona"}
        {...register('nnaciona', { onChange: handleChange })}
        style={{ borderColor: errors.nnaciona ? 'red' : '' }}
      />
    </OverlayTrigger>
    <label htmlFor="nnaciona" style={{ marginLeft: '10px' }}>Nacionalidad</label>
  </div>  
      
  
  <div className="col-md-3 form-floating mt-3">
    <OverlayTrigger
      placement="right"
      overlay={errors.tipsan ? renderTooltip(errors.tipsan.message) : <></>}
    >
      <input
        type="text"
        className={`form-control ${errors.tipsan ? 'is-invalid shake' : ''}`}
        id="tipsan"
        name="tipsan"
        placeholder={errors.tipsan ? errors.tipsan.message : "tipsan"}
        {...register('tipsan', { onChange: handleChange })}
        style={{ borderColor: errors.tipsan ? 'red' : '' }}
      />
    </OverlayTrigger>
    <label htmlFor="tipsan" style={{ marginLeft: '10px' }}>Tipo de sangre</label>
  </div>  
       
  </div>
  
  
    <div className="row">
  
    <div className="col-md-3 form-floating mt-3">
    <OverlayTrigger
      placement="right"
      overlay={errors.tipsan1 ? renderTooltip(errors.tipsan1.message) : <></>}
    >
      <input
        type="text"
        className={`form-control ${errors.tipsan1 ? 'is-invalid shake' : ''}`}
        id="tipsan1"
        name="tipsan1"
        placeholder={errors.tipsan1 ? errors.tipsan1.message : "tipsan1"}
        {...register('tipsan1', { onChange: handleChange })}
        style={{ borderColor: errors.tipsan1 ? 'red' : '' }}
      />
    </OverlayTrigger>
    <label htmlFor="tipsan1" style={{ marginLeft: '10px' }}>Factor RH</label>
  </div>  
  
  
  <div className="col-md-3 form-floating mt-3">
    <OverlayTrigger
      placement="right"
      overlay={errors.usoant ? renderTooltip(errors.usoant.message) : <></>}
    >
      <input
        type="text"
        className={`form-control ${errors.usoant ? 'is-invalid shake' : ''}`}
        id="usoant"
        name="usoant"
        placeholder={errors.usoant ? errors.usoant.message : "usoant"}
        {...register('usoant', { onChange: handleChange })}
        style={{ borderColor: errors.usoant ? 'red' : '' }}
      />
    </OverlayTrigger>
    <label htmlFor="usoant" style={{ marginLeft: '10px' }}>Usa anteojos</label>
  </div>  
  
  
  
  <div className="col-md-3 form-floating mt-3">
    <OverlayTrigger
      placement="right"
      overlay={errors.rfc ? renderTooltip(errors.rfc.message) : <></>}
    >
      <input
        type="text"
        className={`form-control ${errors.rfc ? 'is-invalid shake' : ''}`}
        id="rfc"
        name="rfc"
        placeholder={errors.rfc ? errors.rfc.message : "rfc"}
        {...register('rfc', { onChange: handleChange })}
        style={{ borderColor: errors.rfc ? 'red' : '' }}
      />
    </OverlayTrigger>
    <label htmlFor="rfc" style={{ marginLeft: '10px' }}>RFC</label>
  </div>  
  
  <div className="col-md-3 form-floating mt-3">
    <OverlayTrigger
      placement="right"
      overlay={errors.oficiodes ? renderTooltip(errors.oficiodes.message) : <></>}
    >
      <input
        type="text"
        className={`form-control ${errors.oficiodes ? 'is-invalid shake' : ''}`}
        id="oficiodes"
        name="oficiodes"
        placeholder={errors.oficiodes ? errors.oficiodes.message : "oficiodes"}
        {...register('oficiodes', { onChange: handleChange })}
        style={{ borderColor: errors.oficiodes ? 'red' : '' }}
      />
    </OverlayTrigger>
    <label htmlFor="oficiodes" style={{ marginLeft: '10px' }}>Oficio del individuo</label>
  </div>    
  
      
    </div>
  
  
  
  
  </>
  );
};

export default DatosGenerales;