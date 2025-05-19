import React, { useState, useRef, useEffect } from 'react';
import { useUserAuth } from '../../contexts/UserAuthContext';
import { Camera } from 'lucide-react';
import { getCamera, stopStream, captureImageFromVideo } from '../../utils/cameraUtils';

interface StepSelfieProps {
  onNext: () => void;
}

const StepSelfie: React.FC<StepSelfieProps> = ({ onNext }) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const { updateRegistrationData } = useUserAuth();

  useEffect(() => {
    const initCamera = async () => {
      const { stream: cameraStream, error: cameraError } = await getCamera('user');
      
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
      if (stream) {
        stopStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
        setStream(null);
      }
    };
  }, []);

  const takePicture = () => {
    if (!videoRef.current) return;

    const imageData = captureImageFromVideo(videoRef.current);
    if (imageData) {
      updateRegistrationData({ selfieImage: imageData });
      // Detener la cámara después de capturar
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
        <h2 className="text-xl font-bold text-gray-800 mb-2">Toma una selfie</h2>
        <p className="text-gray-600">
          Coloca tu rostro dentro del marco oval y toma una foto clara
        </p>
      </div>

      <div className="relative flex-1 w-full flex items-center justify-center">
        {error ? (
          <div className="bg-red-50 p-4 rounded-lg text-red-500">{error}</div>
        ) : (
          <>
            <div className="absolute w-64 h-64 border-4 border-[#e50046] rounded-full opacity-70 z-10"></div>
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              className="h-full w-full object-cover transform -scale-x-100" 
            />
          </>
        )}
      </div>

      <div className="w-full mt-4">
        <button
          onClick={takePicture}
          disabled={!!error}
          className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#e50046] hover:bg-[#d60042] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e50046] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Camera className="w-5 h-5 mr-2" />
          Tomar foto
        </button>
      </div>
    </div>
  );
};

export default StepSelfie;