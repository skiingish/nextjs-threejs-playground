'use client';
import { Canvas } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { Stats, Environment, OrbitControls, Loader } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Suspense } from 'react';

const Model = () => {
  const gltf = useLoader(GLTFLoader, './scene.gltf');
  return (
    <>
      <primitive object={gltf.scene} scale={0.01} position={[0, -45, 0]} rota />
    </>
  );
};

export default function Home() {
  return (
    <main className=' h-[100vh] w-[100vw]'>
      <h1 className='text-center fixed z-10 right-40 text-black'>
        three js nextjs + floorplan
      </h1>
      <Canvas className=''>
        <Suspense fallback={null}>
          <Model />
          <OrbitControls />
          <Environment
            files='https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@environment/public/img/venice_sunset_1k.hdr'
            background
            blur={0.5}
          />
          <Stats />
        </Suspense>
      </Canvas>
      <Loader />
    </main>
  );
}
