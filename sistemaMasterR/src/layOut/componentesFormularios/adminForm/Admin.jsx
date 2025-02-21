import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { FinalizarSesion } from "../../../accesoLogin/reducers/thunks/finalizarSesion/FinalizarSesion";
import { useState } from 'react';

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);
  const [mostrarBuscador, setMostrarBuscador] = useState(true); // Nuevo estado

  const personas = [
    { id: 1, nombre: "Juan Pérez" },
    { id: 2, nombre: "María González" },
    { id: 3, nombre: "Carlos Ramírez" },
    { id: 4, nombre: "Ana Fernández" },
    { id: 5, nombre: "Pedro Gómez" },
  ];

  const handleLogout = () => {
    dispatch(FinalizarSesion())
      .unwrap()
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);
      });
  };

  const handleBuscar = (e) => {
    const valor = e.target.value;
    setBusqueda(valor);

    if (valor.length > 0) {
      const filtrados = personas.filter((persona) =>
        persona.nombre.toLowerCase().includes(valor.toLowerCase())
      );
      setResultados(filtrados);
    } else {
      setResultados([]);
    }
  };

  const handleSeleccionar = (LLAVE) => {
    setMostrarBuscador(false); // Oculta el buscador y los resultados
    navigate(`/admin/verificar/${LLAVE}`);
  };

  return (
    <div className="d-flex flex-column vh-100">
      <div className="bg-primary text-light d-flex justify-content-between align-items-center p-3 shadow-sm">
        <div className="d-flex align-items-center">
          <i className="bi bi-person-circle fs-1 me-3"></i>
          <div className="sidebar-heading fw-bold fs-6">Panel Administrativo</div>
        </div>
        <div className="d-flex">
          <h3>RNIP</h3>
         {/*} <NavLink to="/admin/verificar" className="nav-link text-light">
            <i className="bi bi-search me-2"></i> Opción 1
          </NavLink>
          <NavLink to="/capturista/nuevoRegistro" className="nav-link text-light">
            <i className="bi bi-file-earmark-plus me-2"></i> Opción 2
          </NavLink>
          <NavLink to="/capturista/incompletos" className="nav-link text-light">
            <i className="bi bi-exclamation-triangle me-2"></i> Opción 3
          </NavLink>*/}
        </div>
        <button onClick={handleLogout} className="btn btn-outline-light">
          <i className="bi bi-box-arrow-right me-2"></i> Cerrar sesión
        </button>
      </div>

      {/* Buscador y tabla de resultados solo se muestra si mostrarBuscador es true */}
      {mostrarBuscador && (
        <div className="container mt-4">
          <h4 className="mb-3">Buscar Interno</h4>
          <input
            type="text"
            className="form-control"
            placeholder="Escribe un nombre..."
            value={busqueda}
            onChange={handleBuscar}
          />

          {resultados.length > 0 && (
            <div className="mt-3">
              <table className="table table-striped table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {resultados.map((persona) => (
                    <tr key={persona.id}>
                      <td>{persona.id}</td>
                      <td>{persona.nombre}</td>
                      <td>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleSeleccionar(persona.id)}
                        >
                          Seleccionar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      <div className="container-fluid p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
