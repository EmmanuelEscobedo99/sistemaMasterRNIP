import React from 'react';
import { Table, Button, Container, Card, Row, Col } from 'react-bootstrap';
import { TablaDatos } from '../../../Componentes/TablaDatos/TablaDatos';
import { motion } from 'framer-motion';
import { FaUserCircle } from 'react-icons/fa';

export const VistaTablaDatos = () => {
  const { personas, seleccionarPersona } = TablaDatos();

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    color: '#333',
    paddingBottom: '30px',
  };

  const cardStyle = {
    backgroundColor: '#fff',
    color: '#333',
    borderRadius: '10px',
    overflow: 'hidden',
  };

  const tableStyle = {
    backgroundColor: '#fff',
    color: '#333',
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
  };

  const tableHeaderStyle = {
    backgroundColor: '#f8f9fa',
    fontWeight: 'bold',
  };

  const buttonStyle = {
    background: 'linear-gradient(135deg, #007bff, #0056b3)',
    border: 'none',
    padding: '8px 20px',
    borderRadius: '30px',
    fontWeight: 'bold',
    transition: 'all 0.3s ease-in-out',
    boxShadow: '0 4px 6px rgba(0, 123, 255, 0.3)',
    color: '#fff',
  };

  return (
    <Container fluid className="mt-5" style={containerStyle}>
      {/* Header sin ícono */}
      <Row className="mb-4">
        <Col className="text-center">
          <h2 style={{ fontWeight: '600', fontSize: '2rem', color: '#0056b3' }}>
            Lista de Reclusos
          </h2>
        </Col>
      </Row>

      {/* Card con la tabla */}
      <Row>
        <Col xs={12}>
          <Card className="shadow-lg rounded" style={cardStyle}>
            <Card.Header className="d-flex align-items-center">
              <FaUserCircle size={22} style={{ marginRight: '8px' }} />
              <h5 className="mb-0">Lista de Reclusos</h5>
            </Card.Header>

            {/* Contenedor del Scroll */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={{
                overflowX: 'auto',
                padding: '20px',
                minHeight: '100px',
              }}
            >
              <Table
                striped
                bordered
                hover
                responsive
                style={tableStyle}
                className="table-dashboard"
              >
                <thead style={tableHeaderStyle}>
                  <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {personas.map((persona) => (
                    <motion.tr
                      key={persona.LLAVE}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      whileHover={{ backgroundColor: '#f0f0f0' }}
                    >
                      <td>{persona.nombre}</td>
                      <td>{persona.apellido}</td>
                      <td className="text-center">
                        <Button
                          style={buttonStyle}
                          onMouseEnter={(e) =>
                            (e.target.style.transform = 'scale(1.05)')
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.transform = 'scale(1)')
                          }
                          onClick={() => seleccionarPersona(persona.LLAVE)}
                        >
                          Subir Imágenes
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </Table>
            </motion.div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
