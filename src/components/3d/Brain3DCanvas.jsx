import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function BrainParticles() {
  const count = 350;
  const meshRef = useRef();

  // Create points forming a stylized brain silhouette / sphere cluster
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);

    const baseColor1 = new THREE.Color('#6B609E');
    const baseColor2 = new THREE.Color('#FF9A8B');
    const baseColor3 = new THREE.Color('#8B80C3');

    for (let i = 0; i < count; i++) {
      // Shape points like two brain hemispheres
      const isLeft = Math.random() > 0.5;
      const u = Math.random() * Math.PI;
      const v = Math.random() * Math.PI * 2;

      const r = 2.2 + (Math.random() - 0.5) * 0.6;
      let x = r * Math.sin(u) * Math.cos(v);
      let y = r * Math.sin(u) * Math.sin(v) * 0.8;
      let z = r * Math.cos(u) * 0.9;

      // Separate slightly into left & right lobes
      if (isLeft) x -= 0.35;
      else x += 0.35;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      // Color gradient mixing
      const mixRatio = Math.random();
      const mixedColor = isLeft
        ? baseColor1.clone().lerp(baseColor3, mixRatio)
        : baseColor2.clone().lerp(baseColor3, mixRatio);

      cols[i * 3] = mixedColor.r;
      cols[i * 3 + 1] = mixedColor.g;
      cols[i * 3 + 2] = mixedColor.b;
    }
    return [pos, cols];
  }, [count]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.08;
    }
  });

  return (
    <group ref={meshRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={count}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
        />
      </points>

      {/* Core glowing 3D center orb */}
      <Sphere args={[1.2, 32, 32]}>
        <meshStandardMaterial
          color="#8B80C3"
          emissive="#6B609E"
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.1}
          transparent
          opacity={0.35}
        />
      </Sphere>
    </group>
  );
}

function FloatingOrbs() {
  return (
    <>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
        <mesh position={[-3.2, 1.8, -1]}>
          <sphereGeometry args={[0.45, 16, 16]} />
          <meshStandardMaterial color="#FF9A8B" transparent opacity={0.6} />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={2}>
        <mesh position={[3.5, -1.2, -0.5]}>
          <torusGeometry args={[0.4, 0.15, 16, 32]} />
          <meshStandardMaterial color="#6B609E" transparent opacity={0.5} />
        </mesh>
      </Float>

      <Float speed={2.4} rotationIntensity={0.4} floatIntensity={1.2}>
        <mesh position={[2.8, 2.2, -1.5]}>
          <icosahedronGeometry args={[0.35]} />
          <meshStandardMaterial color="#FCD34D" transparent opacity={0.7} />
        </mesh>
      </Float>
    </>
  );
}

export default function Brain3DCanvas() {
  return (
    <div className="w-full h-full min-h-[380px] lg:min-h-[480px] relative rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} color="#FAF8F5" />
        <pointLight position={[-5, -5, -5]} intensity={1} color="#FF9A8B" />

        <BrainParticles />
        <FloatingOrbs />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 2.5}
          rotateSpeed={0.5}
        />
      </Canvas>

      {/* Interactive Helper Overlay */}
      <div className="absolute bottom-4 right-4 bg-white/70 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-medium text-mindful-purple shadow-sm border border-white/80 pointer-events-none flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-mindful-purple animate-ping"></span>
        3D Interactive • Drag to rotate
      </div>
    </div>
  );
}
