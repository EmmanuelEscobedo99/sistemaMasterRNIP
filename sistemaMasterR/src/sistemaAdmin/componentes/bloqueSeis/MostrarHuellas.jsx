import React from 'react';
import { Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import useDatosGeneralesStore from '../../zustand/useDatosGeneralesStore';
import { useSelector } from 'react-redux';

const MostrarHuellas = () => {
  const { seleccionarRadio, radioSeleccionados } = useDatosGeneralesStore();
  const imagenes = useSelector((state) => state.imagenes.imagenes); // ✅ Usamos Redux
  const loading = useSelector((state) => state.imagenes.loading?.includes(true)); // Puedes ajustar si manejas esto diferente

  const datosHuellas = imagenes?.filter(img =>
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].includes(img?.grupo)
  ) || [];

  const handleCheckboxChange = (grupo, valor) => {
    if (radioSeleccionados.some(item => item.nombre === grupo && item.valor === valor)) {
      seleccionarRadio(grupo, null, 'Imagenes Principales');
    } else {
      seleccionarRadio(grupo, valor, 'Imagenes Principales');
    }
  };

  return (
    <div className="row">
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
          <div className="col-12 d-flex justify-content-around flex-wrap mt-3">
            {datosHuellas.length > 0 ? (
              datosHuellas.map((img, index) => (
                <Card key={index} style={{ width: '18rem', marginBottom: '20px' }}>
                  <Card.Img variant="top" src={img.imagen} alt={`Imagen ${index}`} />
                  <Card.Body>
                    <Card.Title>Grupo {img.grupo}</Card.Title>
                    <div className="d-flex justify-content-center">
                      <input
                        type="checkbox"
                        name={`checkbox-${index}`}
                        value="Sí"
                        checked={radioSeleccionados.some(item => item.nombre === img.grupo && item.valor === 'Sí')}
                        className="ms-2"
                        onChange={() => handleCheckboxChange(img.grupo, 'Sí')}
                      />
                    </div>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <p className="text-center">No hay imágenes disponibles.</p>
            )}
          </div>

          {radioSeleccionados.length > 0 && (
            <div className="mt-4">
              <h5 style={{ color: 'red' }}>Campos con errores:</h5>
              <ul>
                {radioSeleccionados.map((item, index) => (
                  <li key={index}>{item.nombre}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MostrarHuellas;
