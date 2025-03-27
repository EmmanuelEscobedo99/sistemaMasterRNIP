import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FinalizarSesion } from "../../../accesoLogin/reducers/thunks/finalizarSesion/FinalizarSesion";
import { useEffect } from "react";
import useStore from "../../../sistemaAdmin/zustand/useStore";
import { motion } from "framer-motion";
import { FaSignOutAlt, FaLayerGroup, FaShieldAlt } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";

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
    <div className="d-flex flex-column min-vh-100">
      <motion.nav
        className="navbar navbar-expand-lg"
        style={{
          background: "linear-gradient(to right, #0A0A0A, #111111)",
          boxShadow: "0 4px 12px rgba(0, 255, 100, 0.25)",
          paddingTop: "12px",
          paddingBottom: "12px",
        }}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container-fluid px-5">
          <NavLink to="/admin" className="navbar-brand d-flex align-items-center text-white fw-bold fs-5">
            <MdAdminPanelSettings className="me-2 text-success" size={24} />
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
            <ul className="navbar-nav align-items-center gap-4 pe-3">
              <motion.li whileHover={{ scale: 1.1 }}>
                <NavLink
                  to="/admin/bloque1y2"
                  className="nav-link text-white d-flex align-items-center gap-2 fs-6"
                >
                  <FaLayerGroup className="text-success" /> BLOQUE 1 Y 2
                </NavLink>
              </motion.li>
              <motion.li whileHover={{ scale: 1.1 }}>
                <NavLink
                  to="/admin/bloque6"
                  className="nav-link text-white d-flex align-items-center gap-2 fs-6"
                >
                  <FaShieldAlt className="text-success" /> BLOQUE 6
                </NavLink>
              </motion.li>
              <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-success d-flex align-items-center gap-2 px-3 py-2"
                  style={{
                    color: "#ffffff",
                    border: "1px solid #10B981",
                    backgroundColor: "transparent",
                    marginLeft: "25px",
                  }}
                >
                  <FaSignOutAlt /> Cerrar sesión
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
