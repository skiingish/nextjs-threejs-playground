'use client';
import { Canvas } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { Stats, Environment, OrbitControls, Loader } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Suspense } from 'react';
import CameraPositionLogger from '../../helpers/CameraPositionLogger';

const Model = () => {
  const gltf = useLoader(GLTFLoader, './scene.gltf');
  return (
    <>
      <primitive object={gltf.scene} scale={0.008} position={[0, 0, 0]} rota />
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
      <Canvas
        className=''
        shadows
        camera={{ position: [4.5, 300, 495], fov: 25 }}
      >
        <Suspense fallback={null}>
          <OrbitControls />
          <CameraPositionLogger event='mousedown' />

          {/* <color attach='background' args={['skyblue']} /> */}
          <spotLight position={[10, 15, 10]} angle={0.8} />
          <ambientLight intensity={1} />
          <Environment
            files='https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@environment/public/img/venice_sunset_1k.hdr'
            background
            blur={0.5}
          />
          <Model />
          <Plane />
          <Stats />
        </Suspense>
      </Canvas>
      <Loader />
    </main>
  );
}
