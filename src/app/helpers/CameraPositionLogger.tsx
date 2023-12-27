import { useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';

function CameraPositionLogger({ event = {} } = {}) {
  const { camera } = useThree();

  const cameraRef = useRef(camera);

  useEffect(() => {
    const logCameraPosition = () => {
      const { x, y, z } = cameraRef.current.position;
      const roundedX = Math.round(x * 100) / 100;
      const roundedY = Math.round(y * 100) / 100;
      const roundedZ = Math.round(z * 100) / 100;
      console.log(
        `Camera position: (x ${roundedX}, y ${roundedY}, z ${roundedZ})`
      );
    };

    cameraRef.current = camera;
    window.addEventListener('click', logCameraPosition);

    return () => window.removeEventListener('click', logCameraPosition);
  }, []);

  return null;
}

export default CameraPositionLogger;
