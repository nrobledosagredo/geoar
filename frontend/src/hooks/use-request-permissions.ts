import { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface Permissions {
  geolocation: boolean;
  camera: boolean;
}

export function useRequestPermissions(): Permissions {
  const { toast } = useToast();
  const [permissionsGranted, setPermissionsGranted] = useState<Permissions>({
    geolocation: false,
    camera: false,
  });

  useEffect(() => {
    // Solicitar permiso de geolocalización
    navigator.geolocation.getCurrentPosition(
      () => setPermissionsGranted((prev) => ({ ...prev, geolocation: true })),
      () => {
        toast({
          title: 'Permiso de geolocalización denegado',
          description: 'La aplicación necesita acceso a la geolocalización.',
          variant: 'destructive',
        });
        setPermissionsGranted((prev) => ({ ...prev, geolocation: false }));
      }
    );

    // Solicitar permiso de cámara
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(() => setPermissionsGranted((prev) => ({ ...prev, camera: true })))
      .catch(() => {
        toast({
          title: 'Permiso de cámara denegado',
          description: 'La aplicación necesita acceso a la cámara.',
          variant: 'destructive',
        });
        setPermissionsGranted((prev) => ({ ...prev, camera: false }));
      });
  }, [toast]);

  return permissionsGranted;
}