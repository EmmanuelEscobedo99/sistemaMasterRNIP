import React from "react";
import { Table, Button, Container, Card, Row, Col } from "react-bootstrap";
import { TablaDatos } from "../../../sistema/componentes/TablaDatos/TablaDatos";
import { motion } from "framer-motion";

export const VistaTablaDatos = () => {
  const { personas, seleccionarPersona } = TablaDatos();

  return (
    <Container fluid className="mt-5" style={{ backgroundColor: "#121212", minHeight: "100vh", paddingBottom: "30px" }}>
      {/* Header */}
      <Row className="mb-4">
        <Col className="text-center">
          <motion.h2
            className="fw-bold text-light"
            style={{ fontSize: "2rem", color: "#007bff" }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Lista de Reclusos
          </motion.h2>
        </Col>
      </Row>

      {/* Card con la tabla */}
      <Row className="justify-content-center">
        <Col xs={12} lg={10}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-lg rounded" style={{ backgroundColor: "#1a1a1a", border: "1px solid #007bff" }}>
              <Card.Header className="text-white text-center" style={{ backgroundColor: "#007bff" }}>
                <h5 className="mb-0">Lista de Reclusos</h5>
              </Card.Header>

              {/* Contenedor del Scroll */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{ overflowX: "auto", padding: "20px" }}
              >
                <Table striped bordered hover responsive className="table-dashboard" style={{ backgroundColor: "#222", color: "#fff" }}>
                  <thead style={{ backgroundColor: "#007bff", color: "#fff" }}>
                    <tr>
                      <th>Nombre</th>
                      <th>Apellido</th>
                      <th className="text-center">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {personas.length > 0 ? (
                      personas.map((persona) => (
                        <motion.tr
                          key={persona.LLAVE}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          whileHover={{ backgroundColor: "#333" }}
                        >
                          <td>{persona.nombre}</td>
                          <td>{persona.apellido}</td>
                          <td className="text-center">
                            <motion.button
                              className="btn btn-primary"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => seleccionarPersona(persona.LLAVE)}
                              style={{
                                borderRadius: "20px",
                                padding: "8px 15px",
                                fontWeight: "bold",
                                backgroundColor: "#007bff",
                                border: "none",
                                boxShadow: "0px 4px 6px rgba(0, 123, 255, 0.3)",
                                transition: "all 0.3s ease-in-out",
                              }}
                            >
                              Subir Imágenes
                            </motion.button>
                          </td>
                        </motion.tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="text-center text-danger">
                          No hay registros disponibles
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </motion.div>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};
