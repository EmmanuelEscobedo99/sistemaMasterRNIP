import React, { useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FinalizarSesion } from '../../../accesoLogin/reducers/thunks/finalizarSesion/FinalizarSesion';
import { motion } from 'framer-motion';

const Capturista = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    return (
        <div className="d-flex flex-column vh-100">
            {/* Navbar con animaciones */}
            <motion.nav
                className="navbar navbar-expand-lg navbar-dark"
                style={{ backgroundColor: "#0A0A0A" }} // Color negro oscuro
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="container" style={{ margin: '7px' }}>
                    <NavLink to="/capturista" className="navbar-brand fw-bold text-white">
                        ADMIN PANEL
                    </NavLink>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarCapturista"
                        aria-controls="navbarCapturista"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarCapturista">
                        <ul className="navbar-nav ms-auto">
                            <motion.li className="nav-item" whileHover={{ scale: 1.1 }}>
                                <NavLink to="/capturista/registro" className="nav-link text-white">
                                    Incorporar Datos
                                </NavLink>
                            </motion.li>
                            <motion.li className="nav-item" whileHover={{ scale: 1.1 }}>
                                <NavLink to="/capturista/tabladatos" className="nav-link text-white">
                                    Incorporar Bloque 6
                                </NavLink>
                            </motion.li>
                            <motion.li className="nav-item">
                                <motion.button
                                    onClick={handleLogout}
                                    className="btn btn-outline-light ms-3"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    Cerrar sesión
                                </motion.button>
                            </motion.li>
                        </ul>
                    </div>
                </div>
            </motion.nav>

            {/* Contenido con animaciones */}
            <motion.div
                className="container-fluid p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                    paddingTop: "0px",
                    margin: "0",
                    padding: "0",
                }}
            >
                <Outlet />
            </motion.div>
        </div>
    );
};

export default Capturista;
