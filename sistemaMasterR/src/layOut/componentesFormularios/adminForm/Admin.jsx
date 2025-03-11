import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FinalizarSesion } from "../../../accesoLogin/reducers/thunks/finalizarSesion/FinalizarSesion";
import { useEffect } from "react";
import useStore from "../../../sistemaAdmin/zustand/useStore";
import { motion } from "framer-motion";

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cargarInternos } = useStore();

  useEffect(() => {
    cargarInternos("obtenerInternos");
  }, []);

  const handleLogout = () => {
    dispatch(FinalizarSesion())
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error al cerrar sesión:", error);
      });
  };

  return (
    <div className="d-flex flex-column vh-100">
      {/* Navbar Estilizada */}
      <motion.nav 
        className="navbar navbar-expand-lg navbar-dark"
        style={{ backgroundColor: "#0A0A0A" }} // Color negro oscuro
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container">
          <NavLink to="/admin" className="navbar-brand fw-bold text-white">
            <i className="bi bi-shield-lock-fill me-2"></i> ADMIN PANEL
          </NavLink>

          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarAdmin" 
            aria-controls="navbarAdmin" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarAdmin">
            <ul className="navbar-nav ms-auto">
              <motion.li className="nav-item" whileHover={{ scale: 1.1 }}>
                <NavLink to="/admin/bloque1y2" className="nav-link text-white">
                  BLOQUE 1 Y 2
                </NavLink>
              </motion.li>
              <motion.li className="nav-item" whileHover={{ scale: 1.1 }}>
                <NavLink to="/admin/bloque6" className="nav-link text-white">
                  BLOQUE 6
                </NavLink>
              </motion.li>
              <motion.li className="nav-item">
                <button 
                  onClick={handleLogout} 
                  className="btn btn-outline-light ms-3"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <i className="bi bi-box-arrow-right me-2"></i> Cerrar sesión
                </button>
              </motion.li>
            </ul>
          </div>
        </div>
      </motion.nav>

      {/* Contenido principal */}
      <motion.div 
        className="container-fluid p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Outlet />
      </motion.div>
    </div>
  );
};

export default Admin;
