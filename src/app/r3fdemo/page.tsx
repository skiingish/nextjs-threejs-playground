'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { useRef } from 'react';
import { Mesh } from 'three'; //types

function Cube() {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (!meshRef.current) return;

    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 2, 2]} />
      <meshStandardMaterial color='blue' />
    </mesh>
  );
}

export default function Home() {
  return (
    <main className='h-screen w-screen bg-white'>
      <Canvas>
        <PerspectiveCamera position={[0, 0, 5]} />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Cube />
      </Canvas>
    </main>
  );
}
