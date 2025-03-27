import React, { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FinalizarSesion } from "../../../accesoLogin/reducers/thunks/finalizarSesion/FinalizarSesion";
import { motion } from "framer-motion";
import { FaSignOutAlt, FaDatabase, FaUserPlus } from "react-icons/fa";

const Capturista = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      {/* Navbar moderna y estilizada */}
      <motion.nav
        className="navbar navbar-expand-lg"
        style={{
          background: "linear-gradient(90deg, #0A0A0A, #1F1F1F)",
          boxShadow: "0 4px 12px rgba(0, 255, 100, 0.3)",
        }}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container py-2">
          <NavLink
            to="/capturista"
            className="navbar-brand d-flex align-items-center text-white fw-bold fs-5"
          >
            <FaDatabase className="me-2 text-success" size={22} />
            PANEL CAPTURISTA
          </NavLink>

          <button
            className="navbar-toggler bg-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCapturista"
            aria-controls="navbarCapturista"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="navbarCapturista">
            <ul className="navbar-nav align-items-center gap-3">
              <motion.li whileHover={{ scale: 1.1 }}>
                <NavLink to="/capturista/registro" className="nav-link text-white d-flex align-items-center gap-2">
                  <FaUserPlus className="text-success" /> Incorporar Datos
                </NavLink>
              </motion.li>
              <motion.li whileHover={{ scale: 1.1 }}>
                <NavLink to="/capturista/tabladatos" className="nav-link text-white d-flex align-items-center gap-2">
                  <FaDatabase className="text-success" /> Incorporar Bloque 6
                </NavLink>
              </motion.li>
              <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-success d-flex align-items-center gap-2"
                  style={{
                    color: "white",
                    border: "1px solid #10B981",
                    backgroundColor: "transparent",
                  }}
                >
                  <FaSignOutAlt /> Cerrar sesión
                </button>
              </motion.li>
            </ul>
          </div>
        </div>
      </motion.nav>

      {/* Contenido */}
      <motion.div
        className="container-fluid p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ paddingTop: "0px", margin: "0", padding: "0" }}
      >
        <Outlet />
      </motion.div>
    </div>
  );
};

export default Capturista;
