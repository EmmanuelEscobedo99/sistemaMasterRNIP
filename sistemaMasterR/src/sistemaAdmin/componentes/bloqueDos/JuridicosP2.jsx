import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import '../../../sistema/css/estilo.css';
import ValidacionBloqueUno from '../../../sistema/validaciones/validacionBloque1/ValidacionBloqueUno';
import useDatosGeneralesStore from '../../zustand/useDatosGeneralesStore';
import useStore from '../../zustand/useStore';
import { motion } from 'framer-motion';

const JuridicosP2 = ({ data, onFormChange, onValidationStatus }) => {
  const { register, formState: { errors }, setError, clearErrors } = useFormContext();
  const { seleccionarRadio, radioSeleccionados } = useDatosGeneralesStore();
  const { juridicos } = useStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

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

  const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  useEffect(() => {
    onValidationStatus(errors);
  }, [errors, onValidationStatus]);

  const renderTooltip = (message) => <Tooltip>{message}</Tooltip>;

  const juridicosObtenidos = juridicos?.[0] || {};

  const getFieldValue = (fieldId) => {
    switch (fieldId) {
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
        return formatFecha(juridicosObtenidos[fieldId]);
      default:
        return juridicosObtenidos[fieldId] || '';
    }
  };

  const formatFecha = (fechaISO) => {
    if (!fechaISO) return '';
    return fechaISO.split('T')[0];
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
    { id: "FCUMPLIMIENTOS", label: "Fecha cumplimiento de sentencia" },
  ];

  if (loading) {
    return (
      <motion.div
        className="d-flex justify-content-center align-items-center"
        style={{
          height: '50vh',
          backgroundColor: 'transparent',
          flexDirection: 'column',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src="../../../../public/ssp.jpeg"
          alt="Cargando..."
          width="200px"
        />
        <p style={{ color: 'black', marginTop: '20px', fontSize: '24px', fontWeight: 'bold' }}>
          Cargando Juridicos PT2...
        </p>
      </motion.div>
    );
  }

  return (
    <div className="row">
      {fields.map((field) => (
        <div key={field.id} className="col-md-4 form-floating mt-3 d-flex align-items-center">
          <OverlayTrigger
            placement="right"
            overlay={errors[field.id] ? renderTooltip(errors[field.id].message) : <></>}
          >
            <input
              type="text"
              className={`form-control ${errors[field.id] ? 'is-invalid shake' : ''}`}
              id={field.id}
              name={field.id}
              placeholder={errors[field.id] ? errors[field.id].message : field.label}
              value={getFieldValue(field.id)}
              {...register(field.id, { onChange: handleChange })}
              style={{ borderColor: errors[field.id] ? 'red' : '' }}
            />
          </OverlayTrigger>
          <label htmlFor={field.id} style={{ marginLeft: '10px' }}>{field.label}</label>

          {/* Checkbox toggleable */}
          <input
            type="checkbox"
            name={`checkbox-${field.id}`}
            value="Sí"
            checked={radioSeleccionados.some(item => item.nombre === field.label && item.valor === 'Sí')}
            className="ms-2"
            onChange={() => {
              if (radioSeleccionados.some(item => item.nombre === field.label && item.valor === 'Sí')) {
                seleccionarRadio(field.label, null, 'JuridicosP2'); // ✅ nombre exacto en bloque2Forms
              } else {
                seleccionarRadio(field.label, 'Sí', 'JuridicosP2');
              }
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default JuridicosP2;
