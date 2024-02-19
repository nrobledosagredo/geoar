// use-get-orientation.ts
import { useState, useEffect } from 'react';

export function useGetOrientation() {
  const [orientation, setOrientation] = useState(0);

useEffect(() => {
    function handleGetOrientation (event: DeviceOrientationEvent){
        let { alpha } = event;
        alpha = (360 - (alpha ?? 0)) % 360;
        if (alpha !== null) {
            setOrientation(alpha);
        }
    };

    window.addEventListener('deviceorientation', handleGetOrientation, true);

    return () => {
        window.removeEventListener('deviceorientation', handleGetOrientation, true);
    };
}, []);

  return orientation;
};