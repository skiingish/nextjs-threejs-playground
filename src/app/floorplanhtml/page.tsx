'use client';
import { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useLoader, useFrame, useThree } from '@react-three/fiber';
import {
  Stats,
  Environment,
  Loader,
  Html,
  CameraControls,
  Billboard,
  Text,
  SpotLight,
  useDepthBuffer,
} from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Suspense } from 'react';
import CameraPositionLogger from '../../helpers/CameraPositionLogger';
import { Mesh, Vector3 } from 'three';

interface HtmlProps {
  children: React.ReactNode;
  position: [number, number, number];
}

// function Cube({ ...props }) {
//   const meshRef = useRef<Mesh>(null);

//   useFrame(({ camera }) => {
//     meshRef.current.lookAt(camera.position);
//   });

//   return (
//     <mesh {...props} ref={meshRef}>
//       <boxGeometry args={[5, 3.5, 3]} />
//       <meshStandardMaterial color='blue' />
//     </mesh>
//   );
// }

// const RotatingText = ({ position, children }) => {
//   const textRef = useRef();

//   // Update the text's rotation to face the camera
//   useFrame(({ camera }) => {
//     textRef.current.lookAt(camera.position);
//   });

//   return (
//     <Text ref={textRef} position={position} fontSize={1} color='white'>
//       {children}
//     </Text>
//   );
// };

const RotatingHtml = ({ children, ...props }: HtmlProps) => {
  const htmlMeshRef = useRef<Mesh>(null);

  useFrame(({ camera }) => {
    if (htmlMeshRef.current) htmlMeshRef.current.lookAt(camera.position);
  });

  return (
    <mesh {...props} ref={htmlMeshRef}>
      <Html transform>
        <div className='text-white bg-black w-70 hover:cursor-pointer border rounded-lg'>
          {children}
        </div>
      </Html>
    </mesh>
  );
};

function Annotation({ children, ...props }: HtmlProps) {
  return (
    <Html {...props} transform occlude='blending'>
      <div className='annotation' onClick={() => console.log('.')}>
        {children}
      </div>
    </Html>
  );
}

const Model = () => {
  const gltf = useLoader(GLTFLoader, './scene.gltf');
  return (
    <>
      <primitive object={gltf.scene} scale={0.001} position={[0, 0, 0]} rota />
    </>
  );
};

const Plane = () => {
  return (
    <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry attach='geometry' args={[2000, 2000]} />
      <meshLambertMaterial attach='material' color='darkgrey' />
    </mesh>
  );
};

// function MovingSpot({ vec = new Vector3(), ...props }) {
//   const light = useRef<spotLight>();
//   const viewport = useThree((state) => state.viewport);
//   useFrame((state) => {
//     light.current.target.position.lerp(
//       vec.set(
//         (state.mouse.x * viewport.width) / 2,
//         (state.mouse.y * viewport.height) / 2,
//         0
//       ),
//       0.1
//     );
//     light.current.target.updateMatrixWorld();
//   });
//   return (
//     <SpotLight
//       castShadow
//       ref={light}
//       penumbra={1}
//       distance={6}
//       angle={0.35}
//       attenuation={5}
//       anglePower={4}
//       intensity={2}
//       {...props}
//     />
//   );
// }

function CamSpotLight() {
  return (
    <SpotLight
      position={[10, 4, 5]}
      castShadow
      penumbra={0.2}
      radiusTop={0.2}
      radiusBottom={40}
      distance={200}
      angle={0.45}
      attenuation={20}
      anglePower={5}
      intensity={6.5}
      opacity={0.6}
      color={'red'}
    />
  );
}

export default function Home() {
  return (
    <main className=' h-[100vh] w-[100vw]'>
      {/* <h1 className='text-center text-xl fixed z-10 left-[50%] top-40 text-black'>
        Coming Soon...
      </h1> */}
      <Canvas className='' shadows camera={{ position: [0, 8.5, 15], fov: 75 }}>
        <Suspense fallback={null}>
          <CameraControls
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2}
            minAzimuthAngle={-Math.PI / 2}
            maxAzimuthAngle={Math.PI / 2}
          />
          <CameraPositionLogger event='mousedown' />
          <ambientLight intensity={0.5} />
          <Environment
            files='https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@environment/public/img/venice_sunset_1k.hdr'
            background
            blur={0.5}
          />
          <Model />
          <Plane />
          <RotatingHtml position={[-5, 3.5, 3]}>
            <p className='text-lg hover:text-blue-600 p-1'>Camera 1</p>
          </RotatingHtml>
          <RotatingHtml position={[10, 3.5, 5]}>
            <p className='text-lg hover:text-blue-600 p-1'>Camera 2</p>
          </RotatingHtml>
          <CamSpotLight />
          <Stats />
        </Suspense>
      </Canvas>
      <Loader />
    </main>
  );
}
