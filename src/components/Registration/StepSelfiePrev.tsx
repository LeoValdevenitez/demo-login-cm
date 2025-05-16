import React from 'react';
import { useUserAuth } from '../../contexts/UserAuthContext';
import { RotateCcw, Check } from 'lucide-react';

interface StepSelfiePrevProps {
  onNext: () => void;
  onBack: () => void;
}

const StepSelfiePrev: React.FC<StepSelfiePrevProps> = ({ onNext, onBack }) => {
  const { registrationData } = useUserAuth();

  return (
    <div className="flex flex-col flex-1 items-center justify-between">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Confirma tu selfie</h2>
        <p className="text-gray-600">
          Asegúrate que tu rostro se vea claramente
        </p>
      </div>

      <div className="flex-1 w-full flex items-center justify-center">
        {registrationData?.selfieImage ? (
          <div className="relative w-64 h-64 overflow-hidden rounded-full border-4 border-[#e50046]">
            <img 
              src={registrationData.selfieImage} 
              alt="Selfie" 
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="bg-gray-200 w-64 h-64 rounded-full flex items-center justify-center">
            <p className="text-gray-500">No hay imagen</p>
          </div>
        )}
      </div>

      <div className="w-full mt-4 flex space-x-4">
        <button
          onClick={onBack}
          className="flex-1 flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e50046]"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Repetir
        </button>
        
        <button
          onClick={onNext}
          className="flex-1 flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#e50046] hover:bg-[#d60042] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e50046]"
        >
          <Check className="w-5 h-5 mr-2" />
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default StepSelfiePrev;