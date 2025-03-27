import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import FormularioLogin from "../componentes/FormularioLogin";
import { verificarIp } from "../reducers/thunks/verificarIp/verificarIp";
import { loginUsuario } from "../reducers/thunks/loginUsuario/thunksLogin";
import { verificarCorreo } from "../reducers/thunks/usuarioHistorico/usuarioHistorico";
import { setUser } from "../reducers/slice/loginUsuarioSlice/authSlice";
import { obtenerToken } from "../reducers/thunks/auth/authUsuario";
import { FaLaptopCode, FaLock } from "react-icons/fa";

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
        .then((data) => {
          setStoredClave(data.clave);
        })
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
          const tokenResponse = await dispatch(obtenerToken(datos)).unwrap();
          navigate(`/${storedRol}`);
        } catch (tokenError) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al iniciar sesión",
          });
          navigate("/");
        }
      } else {
        const resultAction = await dispatch(
          loginUsuario({ data, maquina, storedEmail })
        ).unwrap();
        const { rol } = resultAction;
        navigate(`/${rol}`);
      }
    } catch (error) {
      // ❌ Ya no mostramos Swal aquí porque el thunk loginUsuario lo muestra
      console.error("Error capturado en Login.jsx:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(to right, #0f0f0f, #1a1a1a)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Fondo decorativo con animación */}
      <motion.div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "rgba(16, 185, 129, 0.2)",
          top: "-100px",
          left: "-100px",
          filter: "blur(100px)",
        }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 8 }}
      />

      {/* IP arriba a la izquierda */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          color: "#ffffff",
          background: "#111827",
          padding: "12px 20px",
          borderRadius: "10px",
          fontWeight: "500",
          boxShadow: "0 0 10px rgba(0, 255, 100, 0.3)",
        }}
      >
        <FaLaptopCode className="me-2 text-success" />{" "}
        {maquina ? `IP: ${maquina}` : "Cargando IP..."}
        {error && (
          <div style={{ color: "#ef4444", fontWeight: "bold" }}>
            Error: {error}
          </div>
        )}
      </div>

      {/* Login Box */}
      <motion.div
        style={{
          background: "#111827",
          padding: "35px",
          borderRadius: "12px",
          boxShadow: "0px 0px 30px rgba(16, 185, 129, 0.3)",
          textAlign: "center",
          width: "420px",
          color: "#F9FAFB",
        }}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="mb-4 fw-bold">
          <FaLock className="text-success me-2" />
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
