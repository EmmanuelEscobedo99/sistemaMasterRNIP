import React from "react";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";

export default function FormularioLogin({ handleSubmit, register, errors = {}, isSubmitting }) {
  return (
    <div>
      <motion.h2
        className="fw-bold mb-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{
          color: "#10B981",
          fontSize: "24px",
          textTransform: "uppercase",
          letterSpacing: "1px"
        }}
      >
        Acceso de Usuarios Autorizados
      </motion.h2>

      <form onSubmit={handleSubmit}>
        {/* Campo de correo */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <input
            type="email"
            {...register("correo", { required: "El correo es obligatorio" })}
            placeholder="Correo electrónico"
            style={{
              backgroundColor: "#1F2937",
              border: "1px solid #10B981",
              padding: "14px",
              borderRadius: "8px",
              color: "white",
              width: "100%",
              fontSize: "15px"
            }}
          />
          {errors.correo && (
            <div style={{ color: "#F87171", marginTop: "6px" }}>
              {errors.correo.message}
            </div>
          )}
        </motion.div>

        {/* Campo de contraseña */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <input
            type="password"
            {...register("clave", { required: "La contraseña es obligatoria" })}
            placeholder="Contraseña"
            style={{
              backgroundColor: "#1F2937",
              border: "1px solid #10B981",
              padding: "14px",
              borderRadius: "8px",
              color: "white",
              width: "100%",
              fontSize: "15px"
            }}
          />
          {errors.clave && (
            <div style={{ color: "#F87171", marginTop: "6px" }}>
              {errors.clave.message}
            </div>
          )}
        </motion.div>

        {/* Botón de inicio de sesión */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{
            scale: 1.05,
            backgroundColor: "#059669",
            boxShadow: "0px 0px 15px rgba(16, 185, 129, 0.6)"
          }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: "#10B981",
            border: "none",
            padding: "14px",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "bold",
            color: "white",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            transition: "all 0.3s ease"
          }}
        >
          {isSubmitting ? "Enviando..." : <>
            <FaPaperPlane style={{ transform: "rotate(-20deg)" }} />
            Ingresar
          </>}
        </motion.button>
      </form>
    </div>
  );
}
