
import api from '../../api/api';

const API_CONSULTAR_DATOS = '/datos'; // Cambia esta URL a la URL de tu backend

export const getDataById = async (id) => {
  
  try {
    const response = await api.get(`${API_CONSULTAR_DATOS}/Id/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;
  }
};