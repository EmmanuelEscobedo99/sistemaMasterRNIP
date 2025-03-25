import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip, Card } from 'react-bootstrap';
import '../../../sistema/css/estilo.css';
import ValidacionBloqueUno from '../../../sistema/validaciones/validacionBloque1/ValidacionBloqueUno';
import useDatosGeneralesStore from '../../zustand/useDatosGeneralesStore';
import useStore from '../../zustand/useStore';
import { useSelector } from 'react-redux';

const MostrarHuellas = ({ data, onFormChange, onValidationStatus }) => {
  const { register, formState: { errors }, setError, clearErrors } = useFormContext();
  const { seleccionarRadio, radioSeleccionados } = useDatosGeneralesStore();
  const { datosHuellas, cargarDatosHuellas } = useStore();

  //const [idAlterna, setIdAlterna] = useState(1); // Simulación de ID alterna

  const idAlternas = useSelector( ( state ) => state.idAlterna.value );
  const idAlterna = isNaN(parseInt(idAlternas, 10)) ? 0 : parseInt(idAlternas, 10) + 1;
  console.log(idAlterna)

  useEffect(() => {
    if (idAlterna) {
      cargarDatosHuellas('huellas', idAlterna);
    }
  }, [idAlterna]);

  /*useEffect(() => {
    console.log("Datos Huellas:", datosHuellas);
  }, [datosHuellas]);*/

  useEffect(() => {
    onValidationStatus(errors);
  }, [errors, onValidationStatus]);

  const handleRadioChange = (nombre, valor) => {
    seleccionarRadio(nombre, valor, 'Huellas');
  };

  return (
    <form className="row">
      <div className="col-12 d-flex justify-content-around mt-3">
        {datosHuellas.length > 0 ? (
          datosHuellas.map((img, index) => (
            <Card key={index} style={{ width: '18rem' }}>
              <Card.Img variant="top" src={img.imagen} alt={`Imagen ${index}`} />
              <Card.Body>
                <Card.Title>Grupo {img.grupo}</Card.Title>
                <div className="d-flex justify-content-center">
                  <input
                    type="radio"
                    name={`radio-${index}`}
                    value="Sí"
                    className="ms-2"
                    onChange={() => handleRadioChange(img.grupo, 'Sí')}
                  />
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

export default MostrarHuellas;
