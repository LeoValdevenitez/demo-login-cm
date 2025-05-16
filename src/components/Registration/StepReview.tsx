import React from 'react';
import { useUserAuth } from '../../contexts/UserAuthContext';
import { Check, ChevronLeft } from 'lucide-react';

interface StepReviewProps {
  onNext: () => void;
  onBack: () => void;
}

const StepReview: React.FC<StepReviewProps> = ({ onNext, onBack }) => {
  const { registrationData } = useUserAuth();

  return (
    <div className="flex flex-col flex-1 items-center justify-between">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Revisa tus fotos</h2>
        <p className="text-gray-600">
          Verifica que todas las imágenes sean claras y legibles antes de enviarlas
        </p>
      </div>

      <div className="flex-1 w-full grid grid-cols-1 gap-6 py-4">
        <div className="flex flex-col items-center">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Selfie</h3>
          {registrationData?.selfieImage ? (
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#e50046]">
              <img 
                src={registrationData.selfieImage} 
                alt="Selfie" 
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
              <p className="text-xs text-gray-500">No disponible</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Frente del documento</h3>
            {registrationData?.idFrontImage ? (
              <div className="w-full aspect-[3/2] rounded-lg overflow-hidden border-2 border-[#e50046]">
                <img 
                  src={registrationData.idFrontImage} 
                  alt="Frente del documento" 
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-full aspect-[3/2] bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-xs text-gray-500">No disponible</p>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Dorso del documento</h3>
            {registrationData?.idBackImage ? (
              <div className="w-full aspect-[3/2] rounded-lg overflow-hidden border-2 border-[#e50046]">
                <img 
                  src={registrationData.idBackImage} 
                  alt="Dorso del documento" 
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-full aspect-[3/2] bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-xs text-gray-500">No disponible</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full mt-4 flex space-x-4">
        <button
          onClick={onBack}
          className="flex-1 flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e50046]"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Atrás
        </button>
        
        <button
          onClick={onNext}
          className="flex-1 flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#e50046] hover:bg-[#d60042] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e50046]"
        >
          <Check className="w-5 h-5 mr-2" />
          Enviar
        </button>
      </div>
    </div>
  );
};

export default StepReview;