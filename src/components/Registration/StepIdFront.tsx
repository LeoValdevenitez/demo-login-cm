import React, { useState, useRef, useEffect } from 'react';
import { useUserAuth } from '../../contexts/UserAuthContext';
import { Camera } from 'lucide-react';
import { getCamera, stopStream, captureImageFromVideo } from '../../utils/cameraUtils';

interface StepIdFrontProps {
  onNext: () => void;
  onBack: () => void;
}

const StepIdFront: React.FC<StepIdFrontProps> = ({ onNext, onBack }) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const { updateRegistrationData } = useUserAuth();

  useEffect(() => {
    const initCamera = async () => {
      const { stream: cameraStream, error: cameraError } = await getCamera('environment');
      
      if (cameraError) {
        setError(cameraError);
        return;
      }

      if (cameraStream && videoRef.current) {
        setStream(cameraStream);
        videoRef.current.srcObject = cameraStream;
        setError('');
      }
    };

    initCamera();

    return () => {
      stopStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, []);

  const takePicture = () => {
    if (!videoRef.current) return;

    const imageData = captureImageFromVideo(videoRef.current);
    if (imageData) {
      updateRegistrationData({ idFrontImage: imageData });
      if (stream) {
        stopStream(stream);
        videoRef.current.srcObject = null;
        setStream(null);
      }
      onNext();
    } else {
      setError('No se pudo capturar la imagen. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-between">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Frente del documento</h2>
        <p className="text-gray-600">
          Coloca el frente de tu documento dentro del recuadro y asegúrate que sea legible
        </p>
      </div>

      <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden">
        {error ? (
          <div className="bg-red-50 p-4 rounded-lg text-red-500">{error}</div>
        ) : (
          <>
            <div 
              className="absolute z-10"
              style={{
                width: 'calc(85.60vw * 0.9)', // 85.60mm ajustado a viewport width
                height: 'calc(53.98vw * 0.9)', // 53.98mm ajustado a viewport width
                maxWidth: '500px', // Límite máximo para pantallas grandes
                maxHeight: '314px', // Proporción mantenida para el límite máximo
                border: '4px solid #e50046',
                borderRadius: '8px',
                opacity: 0.7,
              }}
            ></div>
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              className="w-full h-full object-cover"
              style={{
                maxHeight: '80vh', // Limitar altura máxima al 80% del viewport
              }}
            />
          </>
        )}
      </div>

      <div className="w-full mt-4 flex space-x-4">
        <button
          onClick={onBack}
          className="flex-1 py-3 px-4 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e50046]"
        >
          Atrás
        </button>
        
        <button
          onClick={takePicture}
          disabled={!!error}
          className="flex-1 flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#e50046] hover:bg-[#d60042] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e50046] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Camera className="w-5 h-5 mr-2" />
          Tomar foto
        </button>
      </div>
    </div>
  );
};

export default StepIdFront;