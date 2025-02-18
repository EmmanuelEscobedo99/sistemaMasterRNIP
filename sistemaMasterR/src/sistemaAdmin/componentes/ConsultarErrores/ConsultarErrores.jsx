import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import useDatosGeneralesStore from '../../zustand/useDatosGeneralesStore';

const ConsultarErrores = () => {
  const { radioSeleccionados, limpiarErrores } = useDatosGeneralesStore();
  const [mensaje, setMensaje] = useState(''); // State to store the feedback message

  const handleMessageChange = (e) => {
    setMensaje(e.target.value); // Update the message as the user types
  };

  const handleSendFeedback = () => {
    if (mensaje.trim()) {
      // Here, you could send the feedback message to the backend or do further actions
      console.log("Feedback sent:", mensaje); 
      // Optionally reset the message after sending
      setMensaje('');
    } else {
      alert("Por favor, ingresa un mensaje.");
    }
  };

  // You can group errors by their form if needed
  const groupedErrors = radioSeleccionados.reduce((acc, item) => {
    const formName = item.formulario || 'Desconocido'; // Default to 'Desconocido' if no form name
    if (!acc[formName]) {
      acc[formName] = [];
    }
    acc[formName].push(item);
    return acc;
  }, {});

  return (
    <div className="container mt-4">
      <h5 style={{ color: 'red' }}>Campos con errores seleccionados:</h5>

      {/* Iterate over each grouped form */}
      {Object.keys(groupedErrors).length > 0 ? (
        Object.keys(groupedErrors).map((formName, index) => (
          <div key={index} className="mb-4">
            <h6>Formulario: {formName}</h6>
            <ul>
              {groupedErrors[formName].map((item, index) => (
                <li key={index}>{item.nombre}</li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No hay errores seleccionados.</p>
      )}
      
      {/* Button to clear the selected errors */}
      <button 
        className="btn btn-danger mt-3"
        onClick={limpiarErrores}
      >
        Limpiar Errores
      </button>

      {/* Textarea for sending feedback */}
      <div className="mt-4">
        <h6>Envíales un mensaje sobre los errores:</h6>
        <textarea
          className="form-control"
          rows="4"
          value={mensaje}
          onChange={handleMessageChange}
          placeholder="Escribe un mensaje aquí..."
        />
      </div>

      {/* Button to submit the feedback */}
      <button 
        className="btn btn-primary mt-3"
        onClick={handleSendFeedback}
      >
        Enviar Mensaje
      </button>
    </div>
  );
};

export default ConsultarErrores;
