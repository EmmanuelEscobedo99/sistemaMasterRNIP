import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import useDatosGeneralesStore from '../../zustand/useDatosGeneralesStore';
import useStore from '../../zustand/useStore';

const MostrarPrincipales = ({ data, onValidationStatus }) => {
  const { formState: { errors } } = useFormContext();
  const { seleccionarRadio, radioSeleccionados } = useDatosGeneralesStore();
  const { imagenesPorLlave, cargarImagenesPorLlave } = useStore();
  const [loading, setLoading] = useState(true);
  const LLAVE = useSelector((state) => state.Llave.value);

  useEffect(() => {
    if (LLAVE) {
      cargarImagenesPorLlave(LLAVE);
      setTimeout(() => setLoading(false), 2000);
    }
  }, [LLAVE]);

  const imagenesPrincipales = imagenesPorLlave.filter(img =>
    ['A', 'B', 'C'].includes(img.grupo)
  );

  const handleCheckboxChange = (grupo, valor) => {
    if (radioSeleccionados.some(item => item.nombre === grupo && item.valor === valor)) {
      seleccionarRadio(grupo, null, 'Imagenes Principales'); // ✅ formulario = "Imagenes Principales"
    } else {
      seleccionarRadio(grupo, valor, 'Imagenes Principales');
    }
  };

  return (
    <form>
      {loading ? (
        <motion.div
          className="d-flex justify-content-center align-items-center"
          style={{ height: '50vh', flexDirection: 'column' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img src="../../../../public/ssp.jpeg" alt="Cargando..." width="200px" />
          <p style={{ color: '#E5E7EB', marginTop: '20px', fontSize: '24px', fontWeight: 'bold' }}>
            Cargando imágenes...
          </p>
        </motion.div>
      ) : (
        <>
          <div className="d-flex justify-content-center flex-wrap gap-4">
            {imagenesPrincipales.length > 0 ? (
              imagenesPrincipales.map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    style={{
                      width: '220px',
                      backgroundColor: '#101A2C',
                      border: '1px solid #22D3EE',
                      borderRadius: '14px',
                      overflow: 'hidden',
                      boxShadow: '0 0 12px rgba(34, 211, 238, 0.25)',
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src={img.imagen}
                      alt={`Grupo ${img.grupo}`}
                      style={{
                        height: '210px',
                        objectFit: 'contain',
                        objectPosition: 'center',
                        backgroundColor: '#0F172A',
                      }}
                    />
                    <Card.Body
                      className="text-center"
                      style={{ padding: '14px 16px', backgroundColor: '#0F172A' }}
                    >
                      <Card.Title
                        style={{
                          color: '#22D3EE',
                          fontWeight: 'bold',
                          fontSize: '16px',
                          marginBottom: '10px',
                        }}
                      >
                        Grupo {img.grupo}
                      </Card.Title>
                      <input
                        type="checkbox"
                        name={`checkbox-${index}`}
                        value="Sí"
                        checked={radioSeleccionados.some(item => item.nombre === img.grupo && item.valor === 'Sí')}
                        onChange={() => handleCheckboxChange(img.grupo, 'Sí')}
                        style={{
                          width: '20px',
                          height: '20px',
                          accentColor: '#22D3EE',
                          cursor: 'pointer',
                        }}
                      />
                    </Card.Body>
                  </Card>
                </motion.div>
              ))
            ) : (
              <p className="text-white text-center mt-4">No hay imágenes disponibles.</p>
            )}
          </div>

          {radioSeleccionados.length > 0 && (
            <div className="mt-4">
              <h5 style={{ color: '#F87171' }}>Campos con errores:</h5>
              <ul className="text-danger">
                {radioSeleccionados.map((item, index) => (
                  <li key={index}>{item.nombre}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </form>
  );
};

export default MostrarPrincipales;
