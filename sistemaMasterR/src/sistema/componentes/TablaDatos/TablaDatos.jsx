import { useNavigate } from 'react-router-dom';
import useStore from "../../../app/useStore";

const TablaDatos = () => {  // 🔹 Ahora es default export
  const navigate = useNavigate();
  const setLlave = useStore((state) => state.setLlave);

  const personas = [
    { LLAVE: '101001_1', nombre: 'Juan', apellido: 'Pérez' },
    { LLAVE: '101001_2', nombre: 'Ana Gómez', apellido: 'Pérez' },
    { LLAVE: '101001_3', nombre: 'Carlos Martínez', apellido: 'Pérez' },
    { LLAVE: '101001_4', nombre: 'Lucía Rodríguez', apellido: 'Pérez' },
  ];

  const seleccionarPersona = (LLAVE) => {
    setLlave(LLAVE);
    navigate(`capturista/formPaginas`);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Lista de Reclusos</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {personas.map((persona) => (
            <tr key={persona.LLAVE}>
              <td>{persona.nombre}</td>
              <td>{persona.apellido}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => seleccionarPersona(persona.LLAVE)}
                >
                  Subir Imágenes
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaDatos; // 🔹 Default export
