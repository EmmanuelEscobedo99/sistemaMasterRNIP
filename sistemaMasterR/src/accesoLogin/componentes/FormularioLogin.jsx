import React from "react";
import { motion } from "framer-motion";

export default function FormularioLogin({ handleSubmit, register, errors = {}, isSubmitting }) {
  return (
    <div>
      <motion.h2
        className="fw-bold mb-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{ color: "white" }} // Texto blanco
      >
        Acceso de Usuarios Autorizados
      </motion.h2>

      <form onSubmit={handleSubmit}>
        {/* Campo de correo */}
        <motion.div
          className="mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <input
            type="email"
            {...register("correo", { required: "El correo es obligatorio" })}
            placeholder="Correo electrónico"
            style={{
              backgroundColor: "#374151", // Gris oscuro
              border: "1px solid #4B5563",
              padding: "12px",
              borderRadius: "5px",
              color: "white",
              width: "100%",
            }}
          />
          {errors.correo && <div style={{ color: "red" }}>{errors.correo.message}</div>}
        </motion.div>

        {/* Campo de contraseña */}
        <motion.div
          className="mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <input
            type="password"
            {...register("clave", { required: "La contraseña es obligatoria" })}
            placeholder="Contraseña"
            style={{
              backgroundColor: "#374151",
              border: "1px solid #4B5563",
              padding: "12px",
              borderRadius: "5px",
              color: "white",
              width: "100%",
            }}
          />
          {errors.clave && <div style={{ color: "red" }}>{errors.clave.message}</div>}
        </motion.div>

        {/* Botón de inicio de sesión */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.05, backgroundColor: "#1E40AF" }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: "#1E40AF",
            border: "none",
            padding: "12px",
            borderRadius: "5px",
            fontSize: "16px",
            fontWeight: "bold",
            color: "white",
            width: "100%",
          }}
        >
          {isSubmitting ? "Enviando..." : "Ingresar"}
        </motion.button>
      </form>
    </div>
  );
}
