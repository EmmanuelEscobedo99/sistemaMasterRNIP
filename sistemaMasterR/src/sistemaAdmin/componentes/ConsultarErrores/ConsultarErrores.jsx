import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import useDatosGeneralesStore from '../../zustand/useDatosGeneralesStore';

const ConsultarErrores = () => {
  const { radioSeleccionados } = useDatosGeneralesStore();

  return (
    <div className="container mt-4">
      <h5 style={{ color: 'red' }}>Campos con errores seleccionados:</h5>
      {radioSeleccionados.length > 0 ? (
        <ul>
          {radioSeleccionados.map((item, index) => (
            <li key={index}>{item.nombre}  {item.valor}</li>
          ))}
        </ul>
      ) : (
        <p>No hay errores seleccionados.</p>
      )}
    </div>
  );
};

export default ConsultarErrores;
