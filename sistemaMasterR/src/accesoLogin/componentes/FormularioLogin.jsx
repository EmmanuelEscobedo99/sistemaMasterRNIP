import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaEye, FaEyeSlash } from "react-icons/fa";

export default function FormularioLogin({ handleSubmit, register, errors = {}, isSubmitting }) {
  const [mostrarClave, setMostrarClave] = useState(false);

  const toggleClave = () => setMostrarClave(prev => !prev);

  return (
    <div>
      {/* Título */}
      <motion.h2
        className="fw-bold mb-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{
          color: "#10B981",
          fontSize: "20px",
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        ACCESO DE USUARIOS AUTORIZADOS
      </motion.h2>

      <form onSubmit={handleSubmit}>
        {/* Email */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label htmlFor="correo" className="form-label text-white mb-1 fw-semibold">
            Correo electrónico
          </label>
          <div style={{ position: "relative" }}>
            <input
              id="correo"
              type="email"
              {...register("correo", { required: "El correo es obligatorio" })}
              placeholder="ejemplo@correo.com"
              style={{
                backgroundColor: "#1F2937",
                border: "1px solid #10B981",
                padding: "14px 16px",
                borderRadius: "10px",
                color: "#E5E7EB",
                width: "100%",
                fontSize: "15px",
                outline: "none",
              }}
            />
          </div>
          {errors.correo && (
            <div style={{ color: "#F87171", marginTop: "6px" }}>
              {errors.correo.message}
            </div>
          )}
        </motion.div>

        {/* Contraseña */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <label htmlFor="clave" className="form-label text-white mb-1 fw-semibold">
            Contraseña
          </label>
          <div style={{ position: "relative" }}>
            <input
              id="clave"
              type={mostrarClave ? "text" : "password"}
              {...register("clave", { required: "La contraseña es obligatoria" })}
              placeholder="••••••••"
              style={{
                backgroundColor: "#1F2937",
                border: "1px solid #10B981",
                padding: "14px 16px",
                borderRadius: "10px",
                color: "#E5E7EB",
                width: "100%",
                fontSize: "15px",
                outline: "none",
              }}
            />
            {/* Icono mostrar/ocultar */}
            <span
              onClick={toggleClave}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && toggleClave()}
              style={{
                position: "absolute",
                top: "50%",
                right: "16px",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#9CA3AF",
                fontSize: "16px",
              }}
            >
              {mostrarClave ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.clave && (
            <div style={{ color: "#F87171", marginTop: "6px" }}>
              {errors.clave.message}
            </div>
          )}
        </motion.div>

        {/* Botón de enviar */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{
            scale: 1.05,
            backgroundColor: "#059669",
            boxShadow: "0px 0px 15px rgba(16, 185, 129, 0.6)",
          }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: "#10B981",
            border: "none",
            padding: "14px",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: "bold",
            color: "white",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            transition: "all 0.3s ease",
          }}
        >
          {isSubmitting ? "Enviando..." : (
            <>
              <FaPaperPlane style={{ transform: "rotate(-20deg)" }} />
              Ingresar
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
}
