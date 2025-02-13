import React from 'react';

export default function FormularioLogin({ handleSubmit, register, errors = {}, isSubmitting }) {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 text-center shadow-lg" style={{ width: "30rem" }}>
        <h3 className="text-center mb-4">Acceso de Usuarios Autorizados (redux)</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Correo</label>
            <input
              type="email"
              {...register("correo", { 
                required: "El correo es obligatorio" 
              })}
              placeholder="Introduce tu correo electrónico"
              className="form-control placeholder-center"
            />
            {errors.correo && <div className="text-danger">{errors.correo.message}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              {...register("clave", {
                required: "La contraseña es obligatoria"
              })}
              placeholder="Introduce tu contraseña"
              className="form-control placeholder-center"
            />
            {errors.clave && <div className="text-danger">{errors.clave.message}</div>}
          </div>
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}