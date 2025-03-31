import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FaLaptopCode, FaLock } from "react-icons/fa";

import FormularioLogin from "../componentes/FormularioLogin";
import { verificarIp } from "../reducers/thunks/verificarIp/verificarIp";
import { loginUsuario } from "../reducers/thunks/loginUsuario/thunksLogin";
import { verificarCorreo } from "../reducers/thunks/usuarioHistorico/usuarioHistorico";
import { setUser } from "../reducers/slice/loginUsuarioSlice/authSlice";
import { obtenerToken } from "../reducers/thunks/auth/authUsuario";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
  } = useForm();

  const maquina = useSelector((state) => state.verificacionIp.maquina);
  const error = useSelector((state) => state.verificacionIp.error);

  const [storedClave, setStoredClave] = useState(null);
  const [storedEmail, setStoredEmail] = useState(null);

  useEffect(() => {
    dispatch(verificarIp());
  }, [dispatch]);

  useEffect(() => {
    const email = localStorage.getItem("email");
    setStoredEmail(email);

    if (email) {
      dispatch(verificarCorreo(email))
        .unwrap()
        .then((data) => setStoredClave(data.clave))
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.message,
          });
        });
    }
  }, [dispatch]);

  const onSubmit = async (data) => {
    try {
      const { correo, clave } = data;

      if (storedClave === clave && storedEmail === correo) {
        const storedRol = localStorage.getItem("rol");
        dispatch(setUser({ rol: storedRol, email: correo }));

        try {
          const datos = { correo, maquina };
          await dispatch(obtenerToken(datos)).unwrap();
          navigate(`/${storedRol}`);
        } catch {
          Swal.fire({ icon: "error", title: "Error", text: "Error al iniciar sesión" });
          navigate("/");
        }
      } else {
        const result = await dispatch(loginUsuario({ data, maquina, storedEmail })).unwrap();
        navigate(`/${result.rol}`);
      }
    } catch (err) {
      console.error("Error en Login:", err);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        background: "linear-gradient(120deg, #050505, #121212)",
        position: "relative",
        overflow: "hidden",
        padding: "20px"
      }}
    >
      {/* Fondo animado decorativo */}
      <motion.div
        className="position-absolute"
        style={{
          width: "700px",
          height: "700px",
          top: "-200px",
          left: "-200px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,197,94,0.2), transparent)",
          filter: "blur(180px)",
          zIndex: 0
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* IP Box */}
      <div
        className="position-absolute"
        style={{
          top: "20px",
          left: "20px",
          color: "#ffffff",
          background: "#0F172A",
          padding: "10px 18px",
          borderRadius: "10px",
          fontWeight: "500",
          fontSize: "14px",
          boxShadow: "0 0 12px rgba(16, 185, 129, 0.3)",
          zIndex: 1
        }}
      >
        <FaLaptopCode className="me-2 text-success" />
        {maquina ? `IP: ${maquina}` : "Cargando IP..."}
        {error && (
          <div style={{ color: "#ef4444", fontWeight: "bold" }}>
            Error: {error}
          </div>
        )}
      </div>

      {/* Caja de Login */}
      <motion.div
        className="shadow-lg text-center"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        style={{
          background: "#0F172A",
          border: "1px solid rgba(16, 185, 129, 0.25)",
          borderRadius: "18px",
          padding: "40px 35px",
          width: "100%",
          maxWidth: "440px",
          color: "#E5E7EB",
          zIndex: 2
        }}
      >
        <h3 className="fw-bold mb-4" style={{ fontSize: "24px" }}>
          <FaLock className="me-2 text-success" />
          Iniciar Sesión
        </h3>

        <FormularioLogin
          handleSubmit={handleSubmit(onSubmit)}
          register={register}
          errors={errors}
          isSubmitting={isSubmitting}
        />
      </motion.div>
    </div>
  );
};
