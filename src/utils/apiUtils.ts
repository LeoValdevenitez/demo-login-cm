import axios from 'axios';
import { RegistrationData } from '../contexts/UserAuthContext';

const API_URL = 'https://api.example.com'; // Reemplazar con la URL real de la API

// Configuración global de Axios
axios.defaults.baseURL = API_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';

export const submitRegistrationData = async (data: RegistrationData) => {
  try {
    // En un entorno real, aquí enviarías los datos a tu API
    // Esta es una simulación de una llamada API que tarda 2 segundos
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simular una respuesta exitosa
    return {
      success: true,
      message: 'Registro completado con éxito',
    };
  } catch (error) {
    console.error('Error submitting registration data:', error);
    throw new Error('No se pudo completar el registro. Por favor, inténtalo de nuevo.');
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    // En un entorno real, aquí enviarías los datos a tu API
    // Esta es una simulación de una llamada API que tarda 1 segundo
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simular una respuesta exitosa
    if (email && password) {
      return {
        success: true,
        token: 'sample-token-123456',
        user: {
          id: '1',
          email,
        },
      };
    } else {
      throw new Error('Credenciales inválidas');
    }
  } catch (error) {
    console.error('Error logging in:', error);
    throw new Error('No se pudo iniciar sesión. Por favor, verifica tus credenciales.');
  }
};