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
          console.log("Clave encontrada:", data.clave);
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
        console.log("Las credenciales coinciden.");
        const storedRol = localStorage.getItem("rol");
        dispatch(setUser({ rol: storedRol, email: correo }));

        try {
          console.log("maquina:", maquina);
          const datos = { correo, maquina };
          const tokenResponse = await dispatch(obtenerToken(datos)).unwrap();
          console.log("Token obtenido:", tokenResponse.token);
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
        console.log("Las credenciales no coinciden, enviando al backend.");
        const resultAction = await dispatch(
          loginUsuario({ data, maquina, storedEmail })
        ).unwrap();
        const { rol } = resultAction;
        navigate(`/${rol}`);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Error al iniciar sesión",
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#0A0A0A", // Negro oscuro
        position: "relative",
      }}
    >
      {/* Información de la máquina (IP) en la parte superior izquierda */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          color: "white",
          fontSize: "16px",
          background: "#1F1F1F", // Fondo oscuro
          padding: "10px",
          borderRadius: "5px",
          boxShadow: "0px 2px 5px rgba(255, 255, 255, 0.2)",
        }}
      >
        {maquina ? <p>IP: {maquina}</p> : <p>Cargando IP...</p>}
        {error && <p style={{ color: "#D9534F", fontWeight: "bold" }}>Error: {error}</p>}
      </div>

      {/* Formulario de Login */}
      <motion.div
        style={{
          background: "#1F1F1F",
          padding: "25px",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
          textAlign: "center",
          width: "400px",
          color: "white",
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
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
