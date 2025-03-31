import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FinalizarSesion } from "../../../accesoLogin/reducers/thunks/finalizarSesion/FinalizarSesion";
import { motion } from "framer-motion";
import { FaSignOutAlt, FaLayerGroup, FaShieldAlt } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import useDatosGeneralesStore from '../../../sistemaAdmin/zustand/useDatosGeneralesStore';

const Admin = () => {
  const { radioSeleccionados, limpiarErrores } = useDatosGeneralesStore();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(FinalizarSesion())
      .unwrap()
      .then(() => navigate("/"))
      .catch((error) => {
        console.error("Error al cerrar sesión:", error);
      });
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Fondo fijo aplicado directamente desde el principio */}
      <motion.nav
        className="navbar navbar-expand-lg"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          background: "linear-gradient(90deg, #0f0f0f, #1a1a1a)",
          borderBottom: "1px solid #10B981",
          boxShadow: "0 0 12px rgba(16, 185, 129, 0.4)",
          zIndex: 1000,
          position: "relative",
        }}
      >
        <div className="container-fluid px-4 py-2">
          <NavLink
            to="/admin"
            className="navbar-brand d-flex align-items-center text-white fw-bold fs-4"
            style={{ letterSpacing: "1px" }}
          >
            <MdAdminPanelSettings className="me-2 text-success" size={28} />
            ADMIN PANEL
          </NavLink>

          <button
            className="navbar-toggler bg-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarAdmin"
            aria-controls="navbarAdmin"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="navbarAdmin">
            <ul className="navbar-nav align-items-center gap-4 pe-2">
              <motion.li whileHover={{ scale: 1.1 }}>
                <NavLink
                  to="/admin/bloque1y2"
                  className={({ isActive }) =>
                    `nav-link d-flex align-items-center gap-2 fs-6 ${
                      isActive ? "text-success fw-semibold" : "text-white"
                    }`
                  }
                  onClick={() => limpiarErrores()} // Llamamos a limpiarErrores aquí
                >
                  <FaLayerGroup size={18} /> BLOQUE 1 Y 2
                </NavLink>
              </motion.li>

              <motion.li whileHover={{ scale: 1.1 }}>
                <NavLink
                  to="/admin/bloque6"
                  className={({ isActive }) =>
                    `nav-link d-flex align-items-center gap-2 fs-6 ${
                      isActive ? "text-success fw-semibold" : "text-white"
                    }`
                  }
                  onClick={() => limpiarErrores()} // Llamamos a limpiarErrores aquí
                >
                  <FaShieldAlt size={18} /> BLOQUE 6
                </NavLink>
              </motion.li>

              <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button
                  onClick={handleLogout}
                  className="btn d-flex align-items-center gap-2 px-3 py-2"
                  style={{
                    color: "#ffffff",
                    border: "1px solid #10B981",
                    background:
                      "linear-gradient(135deg, transparent, rgba(16, 185, 129, 0.1))",
                    transition: "all 0.3s ease",
                  }}
                >
                  <FaSignOutAlt className="text-success" /> Cerrar sesión
                </button>
              </motion.li>
            </ul>
          </div>
        </div>
      </motion.nav>

      {/* Contenido principal */}
      <motion.div
        className="container-fluid p-4"
        style={{ backgroundColor: "#121212", color: "black", flex: 1 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Outlet />
      </motion.div>
    </div>
  );
};

export default Admin;
