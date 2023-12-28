'use client';
import { Canvas } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import {
  Stats,
  Environment,
  Loader,
  Html,
  CameraControls,
} from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Suspense } from 'react';
import CameraPositionLogger from '../../helpers/CameraPositionLogger';

interface AnnotationProps {
  children: React.ReactNode;
  position: [number, number, number];
}

function Annotation({ children, ...props }: AnnotationProps) {
  return (
    <Html
      {...props}
      transform
      occlude='blending'
      // geometry={
      //   /** The geometry is optional, it allows you to use any shape.
      //    *  By default it would be a plane. We need round edges here ...
      //    */
      //   // <planeGeometry args={[4.5, 1, 2]} />
      // }
    >
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

export default function Home() {
  return (
    <main className=' h-[100vh] w-[100vw]'>
      <h1 className='text-center text-xl fixed z-10 left-[50%] top-40 text-black'>
        Coming Soon...
      </h1>
      <Canvas className='' shadows camera={{ position: [0, 8.5, 15], fov: 75 }}>
        <Suspense fallback={null}>
          <CameraControls
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2}
            minAzimuthAngle={-Math.PI / 2}
            maxAzimuthAngle={Math.PI / 2}
          />
          <CameraPositionLogger event='mousedown' />
          <ambientLight intensity={1} />
          <Environment
            files='https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@environment/public/img/venice_sunset_1k.hdr'
            background
            blur={0.5}
          />
          <Model />
          <Plane />
          <Annotation position={[10, 3.5, 0]}>
            <p className='text-lg hover:text-blue-600'>Camera 1</p>
          </Annotation>
          <Annotation position={[-7, 3.5, 5]}>
            <p className='text-lg hover:text-blue-600'>Camera 1</p>
          </Annotation>
          <Stats />
        </Suspense>
      </Canvas>
      <Loader />
    </main>
  );
}
