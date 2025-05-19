export const getCamera = async (facingMode: 'user' | 'environment' = 'user') => {
  try {
    // Intentar primero con configuración específica
    const constraints = {
      video: {
        facingMode,
        width: { ideal: 1920 },
        height: { ideal: 1080 }
      },
      audio: false
    };

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      return { stream, error: null };
    } catch (initialError) {
      // Si falla, intentar con configuración más básica
      const fallbackConstraints = {
        video: { facingMode },
        audio: false
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(fallbackConstraints);
      return { stream, error: null };
    }
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
    
    // Para Safari en iOS, necesitamos manejar la orientación
    if (videoElement.videoWidth > videoElement.videoHeight) {
      context.translate(canvas.width, 0);
      context.scale(-1, 1);
    }
    
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    
    // Limpiar el canvas después de capturar
    context.clearRect(0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg', 0.8);
  } catch (error) {
    console.error('Error capturing image:', error);
    return null;
  }
};

export const stopStream = (stream: MediaStream | null) => {
  if (stream) {
    const tracks = stream.getTracks();
    tracks.forEach(track => {
      track.stop();
      stream.removeTrack(track);
    });
    
    // Asegurarse de que todos los tracks estén detenidos
    if (tracks.some(track => track.readyState === 'live')) {
      console.warn('Some tracks are still active, forcing stop...');
      tracks.forEach(track => {
        try {
          track.enabled = false;
          track.stop();
        } catch (e) {
          console.error('Error stopping track:', e);
        }
      });
    }
  }
};