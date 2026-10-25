import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';

const moodConfigs = {
  'very-bad': { color: '#FF7B6E', distort: 0.6, speed: 4, label: 'Very Bad' },
  'bad': { color: '#FF9A8B', distort: 0.45, speed: 3, label: 'Bad' },
  'okay': { color: '#FCD34D', distort: 0.3, speed: 2, label: 'Okay' },
  'good': { color: '#8B80C3', distort: 0.2, speed: 1.5, label: 'Good' },
  'great': { color: '#6B609E', distort: 0.15, speed: 1.2, label: 'Great' }
};

function AnimatedSphere({ mood = 'good' }) {
  const meshRef = useRef();
  const config = moodConfigs[mood] || moodConfigs['good'];

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.4;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1.5, 64, 64]} scale={1.2}>
      <MeshDistortMaterial
        color={config.color}
        attach="material"
        distort={config.distort}
        speed={config.speed}
        roughness={0.2}
        metalness={0.1}
        clearcoat={0.8}
        clearcoatRoughness={0.1}
      />
    </Sphere>
  );
}

export default function MoodSphere3D({ currentMood = 'good' }) {
  return (
    <div className="w-full h-48 md:h-64 relative rounded-2xl overflow-hidden bg-gradient-to-b from-mindful-purple-subtle/40 to-transparent flex items-center justify-center">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.8} color="#FFFFFF" />
        <pointLight position={[-5, -5, 5]} intensity={1.2} color="#FAF8F5" />
        
        <AnimatedSphere mood={currentMood} />
      </Canvas>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-semibold text-mindful-textDark border border-white shadow-sm flex items-center gap-1.5">
        <span
          className="w-2.5 h-2.5 rounded-full"
          style={{ backgroundColor: moodConfigs[currentMood]?.color || '#8B80C3' }}
        ></span>
        Active Mood Aura: {moodConfigs[currentMood]?.label || 'Good'}
      </div>
    </div>
  );
}
