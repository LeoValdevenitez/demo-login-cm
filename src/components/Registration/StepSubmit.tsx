import React, { useEffect, useState } from 'react';
import { useUserAuth } from '../../contexts/UserAuthContext';
import { CheckCircle } from 'lucide-react';
import axios from 'axios';

interface StepSubmitProps {
  onDone: () => void;
}

const StepSubmit: React.FC<StepSubmitProps> = ({ onDone }) => {
  const { registrationData, resetRegistrationData } = useUserAuth();
  const [isSubmitting, setIsSubmitting] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const mockApiCall = async () => {
      try {
        // Simular progreso
        let currentProgress = 0;
        const interval = setInterval(() => {
          currentProgress += 10;
          setProgress(currentProgress);
          
          if (currentProgress >= 100) {
            clearInterval(interval);
          }
        }, 2500);

        // Simular API call con axios
        await new Promise(resolve => setTimeout(resolve, 15000));
        
        // Mock response
        setIsSubmitting(false);
        setIsSuccess(true);
        resetRegistrationData();
      } catch (err) {
        setIsSubmitting(false);
        setError('Hubo un error al procesar tu solicitud. Inténtalo de nuevo más tarde.');
        console.error('Error submitting data:', err);
      }
    };

    mockApiCall();
  }, [resetRegistrationData]);

  if (isSubmitting) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center p-4">
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Estamos verificando tu identidad...</h2>
          <p className="text-gray-600">
            Por favor, espera mientras procesamos tus datos. Esto puede tomar unos momentos.
          </p>
        </div>

        <div className="w-full max-w-md">
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div
              className="bg-[#e50046] h-4 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-center text-sm text-gray-500">{progress}%</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center p-4">
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-red-500 mb-4">Ha ocurrido un error</h2>
          <p className="text-gray-600">{error}</p>
        </div>

        <button
          onClick={onDone}
          className="w-full max-w-md py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#e50046] hover:bg-[#d60042] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e50046]"
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center p-4">
      <div className="text-center mb-8">
        <div className="mb-6 flex justify-center">
          <CheckCircle className="w-20 h-20 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">¡Verificación exitosa!</h2>
        <p className="text-gray-600">
          Tu identidad ha sido verificada correctamente. Ya puedes utilizar todas las funcionalidades de nuestra aplicación.
        </p>
      </div>

      <button
        onClick={onDone}
        className="w-full max-w-md py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#e50046] hover:bg-[#d60042] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e50046]"
      >
        Ir al inicio de sesión
      </button>
    </div>
  );
};

export default StepSubmit;