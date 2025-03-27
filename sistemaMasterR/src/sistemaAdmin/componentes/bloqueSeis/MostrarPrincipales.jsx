import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import useDatosGeneralesStore from '../../zustand/useDatosGeneralesStore';
import useStore from '../../zustand/useStore';
import { useSelector } from 'react-redux';

const MostrarPrincipales = ({ data, onValidationStatus }) => {
  const { formState: { errors } } = useFormContext();
  const { seleccionarRadio, radioSeleccionados } = useDatosGeneralesStore();
  const { imagenesPorLlave, cargarImagenesPorLlave } = useStore();

  const LLAVE = useSelector((state) => state.Llave.value);

  useEffect(() => {
    if (LLAVE) {
      cargarImagenesPorLlave(LLAVE);
    }
  }, [LLAVE]);

  const imagenesPrincipales = imagenesPorLlave.filter(img =>
    ['A', 'B', 'C'].includes(img.grupo)
  );

  const handleCheckboxChange = (grupo, valor) => {
    if (radioSeleccionados.some(item => item.nombre === grupo && item.valor === valor)) {
      seleccionarRadio(grupo, null, 'Imagenes Principales');
    } else {
      seleccionarRadio(grupo, valor, 'Imagenes Principales');
    }
  };

  return (
    <form className="row">
      <div className="col-12 d-flex justify-content-around mt-3 flex-wrap gap-3">
        {imagenesPrincipales.length > 0 ? (
          imagenesPrincipales.map((img, index) => (
            <Card key={index} style={{ width: '18rem' }}>
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
    </form>
  );
};

export default MostrarPrincipales;
