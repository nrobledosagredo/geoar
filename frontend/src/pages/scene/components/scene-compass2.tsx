import React, { useEffect, useState } from 'react';

const compassPoints = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

export const SceneCompass: React.FC = () => {
  const [orientation, setOrientation] = useState<number>(0);

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      const { alpha } = event;
      if (alpha !== null) {
        setOrientation(alpha);
      }
    };

    window.addEventListener('deviceorientation', handleOrientation);

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-20 bg-black">
      <div className="relative w-full max-w-lg">
        {compassPoints.map((point, index) => (
          <div
            key={index}
            className="absolute top-1/2 transform -translate-y-1/2"
            style={{ left: `${(index * 45 - orientation + 360) % 360}vw` }}
          >
            <span className="text-white text-lg">{point}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
