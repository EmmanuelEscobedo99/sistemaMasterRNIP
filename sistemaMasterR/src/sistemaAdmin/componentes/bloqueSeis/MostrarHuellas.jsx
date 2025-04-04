import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip, Card } from 'react-bootstrap';
import '../../../sistema/css/estilo.css';
import ValidacionBloqueUno from '../../../sistema/validaciones/validacionBloque1/ValidacionBloqueUno';
import useDatosGeneralesStore from '../../zustand/useDatosGeneralesStore';
import useStore from '../../zustand/useStore';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const MostrarHuellas = ({ data, onFormChange, onValidationStatus }) => {
  const { register, formState: { errors }, setError, clearErrors } = useFormContext();
  const { seleccionarRadio, radioSeleccionados } = useDatosGeneralesStore();
  const idAlternas = useSelector((state) => state.idAlterna.value);
  const idAlterna = isNaN(parseInt(idAlternas, 10)) ? 0 : parseInt(idAlternas, 10) + 1;
  const { imagenesPorLlave, cargarImagenesPorLlave } = useStore();
  const LLAVE = useSelector((state) => state.Llave.value);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (LLAVE) {
      cargarImagenesPorLlave(LLAVE);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [LLAVE]);

  const datosHuellas = imagenesPorLlave.filter(img =>
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].includes(img.grupo)
  );

  useEffect(() => {
    onValidationStatus(errors);
  }, [errors, onValidationStatus]);

  const handleCheckboxChange = (grupo, valor) => {
    if (radioSeleccionados.some(item => item.nombre === grupo && item.valor === valor)) {
      seleccionarRadio(grupo, null, 'Huellas'); // ✅ Se corrige aquí
    } else {
      seleccionarRadio(grupo, valor, 'Huellas'); // ✅ Se corrige aquí
    }
  };

  return (
    <form className="row">
      {loading ? (
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
            Cargando huellas...
          </p>
        </motion.div>
      ) : (
        <>
          <div className="col-12 d-flex justify-content-around flex-wrap gap-3 mt-3">
            {datosHuellas.length > 0 ? (
              datosHuellas.map((img, index) => (
                <Card key={index} style={{ width: '140px' }}>
                  <Card.Img variant="top" src={img.imagen} alt={`Imagen ${index}`} />
                  <Card.Body className="text-center">
                    <Card.Title style={{ fontSize: '14px' }}>Grupo {img.grupo}</Card.Title>
                    <input
                      type="checkbox"
                      name={`checkbox-${index}`}
                      value="Sí"
                      checked={radioSeleccionados.some(item => item.nombre === img.grupo && item.valor === 'Sí')}
                      onChange={() => handleCheckboxChange(img.grupo, 'Sí')}
                    />
                  </Card.Body>
                </Card>
              ))
            ) : (
              <p>No hay imágenes disponibles.</p>
            )}
          </div>

          <div className="mt-4">
            <h5 style={{ color: 'red' }}>Campos con errores:</h5>
            <ul>
              {radioSeleccionados.map((item, index) => (
                <li key={index}>{item.nombre}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </form>
  );
};

export default MostrarHuellas;
