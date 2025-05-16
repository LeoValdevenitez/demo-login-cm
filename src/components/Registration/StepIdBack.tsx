import React, { useState, useRef, useEffect } from 'react';
import { useUserAuth } from '../../contexts/UserAuthContext';
import { Camera, Smartphone } from 'lucide-react';

interface StepIdBackProps {
  onNext: () => void;
  onBack: () => void;
}

const StepIdBack: React.FC<StepIdBackProps> = ({ onNext, onBack }) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string>('');
  const [isLandscape, setIsLandscape] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { updateRegistrationData } = useUserAuth();

  useEffect(() => {
    const handleOrientation = () => {
      const isLandscapeMode = window.matchMedia("(orientation: landscape)").matches;
      setIsLandscape(isLandscapeMode);
      
      if (isLandscapeMode && !stream) {
        startCamera();
      } else if (!isLandscapeMode && stream) {
        stopCamera();
      }
    };

    window.addEventListener('orientationchange', handleOrientation);
    window.addEventListener('resize', handleOrientation);
    
    // Check initial orientation
    handleOrientation();

    return () => {
      window.removeEventListener('orientationchange', handleOrientation);
      window.removeEventListener('resize', handleOrientation);
      stopCamera();
    };
  }, [stream]);

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

  const startCamera = async () => {
    try {
      const constraints = {
        video: {
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        },
        audio: false
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setError('');
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('No se pudo acceder a la cámara. Por favor, verifica los permisos.');
    }
  };

  const takePicture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = canvas.toDataURL('image/jpeg');
        updateRegistrationData({ idBackImage: imageData });
        onNext();
      }
    }
  };

  if (!isLandscape) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center p-4">
        <div className="text-center mb-8">
          <Smartphone className="w-16 h-16 mx-auto mb-4 text-[#e50046] animate-pulse" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Gira tu dispositivo</h2>
          <p className="text-gray-600">
            Para una mejor captura del documento, por favor gira tu teléfono en posición horizontal
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-between">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Dorso del documento</h2>
        <p className="text-gray-600">
          Coloca el dorso de tu documento dentro del recuadro y asegúrate que sea legible
        </p>
      </div>

      <div className="relative flex-1 w-full flex items-center justify-center">
        {error ? (
          <div className="bg-red-50 p-4 rounded-lg text-red-500">{error}</div>
        ) : (
          <>
            <div className="absolute w-11/12 h-4/5 border-4 border-[#e50046] rounded-lg opacity-70 z-10"></div>
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              className="h-full w-full object-cover" 
            />
            <canvas ref={canvasRef} className="hidden" />
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

export default StepIdBack;