import { useEffect } from 'react';

function useRequestPermissions() {
  useEffect(() => {
    async function requestCameraPermission() {
      try {
        // Solicita acceso a la cámara
        await navigator.mediaDevices.getUserMedia({ video: true });
      } catch (error) {
        console.error('Error al solicitar permiso de cámara:', error);
      }
    }

    async function requestGeolocationPermission() {
      try {
        await navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log('Ubicación obtenida:', position);
          },
          (error) => {
            console.error('Error al obtener la ubicación:', error);
          }
        );
      } catch (error) {
        console.error('Error al solicitar permiso de geolocalización:', error);
      }
    }

    requestCameraPermission();
    requestGeolocationPermission();
  }, []);
}

export default useRequestPermissions;
