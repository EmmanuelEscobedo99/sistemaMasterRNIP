import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import useDatosGeneralesStore from '../../zustand/useDatosGeneralesStore';
import useStore from '../../zustand/useStore';
import { useSelector } from 'react-redux';

const MostrarPrincipales = ({ data, onValidationStatus }) => {
  const { register, formState: { errors } } = useFormContext();
  const { seleccionarRadio, radioSeleccionados } = useDatosGeneralesStore();
  const { datosFormulario, cargarDatosFormulario } = useStore();
  
  const idAlternas = useSelector((state) => state.idAlterna.value);
  const idAlterna = isNaN(parseInt(idAlternas, 10)) ? 0 : parseInt(idAlternas, 10) + 1;

  useEffect(() => {
    if (idAlterna) {
      cargarDatosFormulario('principales', idAlterna);
    }
  }, [idAlterna, cargarDatosFormulario]);

  const imagenesPrincipales = datosFormulario.imagenes || [];

  // Manejo de selección/deselección de radio buttons
  const handleCheckboxChange = (grupo, valor) => {
    // Si el valor ya está seleccionado, desmarcarlo (eliminando de la lista)
    if (radioSeleccionados.some(item => item.nombre === grupo && item.valor === valor)) {
      seleccionarRadio(grupo, null, 'Imagenes Principales'); // Pasamos null para indicar que se deselecciona
    } else {
      // Si no está seleccionado, marcarlo
      seleccionarRadio(grupo, valor, 'Imagenes Principales');
    }
  };

  return (
    <form className="row">
      <div className="col-12 d-flex justify-content-around mt-3">
        {imagenesPrincipales.length > 0 ? (
          imagenesPrincipales.map((img, index) => (
            <Card key={index} style={{ width: '18rem' }}>
              <Card.Img variant="top" src={img.imagen} alt={`Imagen ${index}`} />
              <Card.Body>
                <Card.Title>Grupo {img.grupo}</Card.Title>
                <div className="d-flex justify-content-center">
                  {/* Usamos checkboxes en vez de radio buttons */}
                  <input
                    type="checkbox"
                    name={`checkbox-${index}`}
                    value="Sí"
                    checked={radioSeleccionados.some(item => item.nombre === img.grupo && item.valor === 'Sí')}
                    className="ms-2"
                    onChange={() => handleCheckboxChange(img.grupo, 'Sí')}
                  />
                  {/*<input
                    type="checkbox"
                    name={`checkbox-${index}`}
                    value="No"
                    checked={radioSeleccionados.some(item => item.nombre === img.grupo && item.valor === 'No')}
                    className="ms-2"
                    onChange={() => handleCheckboxChange(img.grupo, 'No')}
                  />*/}
                </div>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>No hay imágenes disponibles.</p>
        )}
      </div>

      {/* Lista de radio seleccionados */}
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
