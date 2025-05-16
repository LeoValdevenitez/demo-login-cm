export const getCamera = async (facingMode: 'user' | 'environment' = 'user') => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode },
      audio: false,
    });
    return { stream, error: null };
  } catch (err) {
    console.error('Error accessing camera:', err);
    return { 
      stream: null, 
      error: 'No se pudo acceder a la cámara. Por favor, verifica los permisos.' 
    };
  }
};

export const captureImageFromVideo = (videoElement: HTMLVideoElement): string | null => {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    
    const context = canvas.getContext('2d');
    if (!context) return null;
    
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg');
  } catch (error) {
    console.error('Error capturing image:', error);
    return null;
  }
};

export const stopStream = (stream: MediaStream | null) => {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
  }
};