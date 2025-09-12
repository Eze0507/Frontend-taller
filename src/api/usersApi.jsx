import axios from 'axios';

// Centraliza todas las llamadas a la API de usuarios y roles.
const BACKEND_API_URL = 'http://127.0.0.1:8000/api';

export const fetchAllUsers = async () => {
  try {
    const response = await axios.get(`${BACKEND_API_URL}/users/`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener los usuarios.');
  }
};

export const fetchAllRoles = async () => {
  try {
    const response = await axios.get(`${BACKEND_API_URL}/groupsAux/`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener los roles.');
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${BACKEND_API_URL}/users/`, userData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(JSON.stringify(error.response.data));
    }
    throw new Error('Error de conexión al registrar el usuario.');
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${BACKEND_API_URL}/users/${userId}/`, userData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(JSON.stringify(error.response.data));
    }
    throw new Error('Error de conexión al actualizar el usuario.');
  }
};

export const deleteUser = async (userId) => {
  try {
    await axios.delete(`${BACKEND_API_URL}/users/${userId}/`);
  } catch (error) {
    throw new Error('Error al eliminar el usuario.');
  }
};
