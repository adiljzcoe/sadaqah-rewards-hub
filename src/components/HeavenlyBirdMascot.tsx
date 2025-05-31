
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DonationTinProps {
  isActive: boolean;
}

function DonationTin({ isActive }: DonationTinProps) {
  const tinRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (tinRef.current) {
      const time = state.clock.elapsedTime;
      
      // Gentle up and down shaking animation
      const shakeIntensity = 0.03;
      tinRef.current.position.y = Math.sin(time * 3) * shakeIntensity;
      
      // Very subtle side to side movement
      tinRef.current.position.x = Math.sin(time * 2.5) * (shakeIntensity * 0.5);
      
      // Slight rotation for more natural movement
      tinRef.current.rotation.z = Math.sin(time * 2.8) * 0.01;
    }
  });

  return (
    <group ref={tinRef} position={[0, 0, 0]}>
      {/* Main donation tin body - white/cream */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.8, 16]} />
        <meshStandardMaterial 
          color="#F8F8F8" 
          metalness={0.1} 
          roughness={0.4}
        />
      </mesh>

      {/* Blue base/bottom */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.2, 16]} />
        <meshStandardMaterial 
          color="#2563EB" 
          metalness={0.2} 
          roughness={0.3}
        />
      </mesh>

      {/* Blue lid/top */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 0.15, 16]} />
        <meshStandardMaterial 
          color="#2563EB" 
          metalness={0.2} 
          roughness={0.3}
        />
      </mesh>

      {/* Coin slot on top */}
      <mesh position={[0, 0.58, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.25, 0.02, 0.08]} />
        <meshStandardMaterial color="#1E40AF" />
      </mesh>

      {/* DONATE text area - slightly raised white label */}
      <mesh position={[0, 0.1, 0.51]}>
        <boxGeometry args={[0.7, 0.3, 0.02]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>

      {/* Blue stripe at bottom of white section */}
      <mesh position={[0, -0.25, 0.51]}>
        <boxGeometry args={[0.7, 0.1, 0.01]} />
        <meshStandardMaterial color="#2563EB" />
      </mesh>

      {/* Handle/rope attachment point */}
      <mesh position={[0.6, -0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.08, 0.02, 8, 16]} />
        <meshStandardMaterial 
          color="#2563EB" 
          metalness={0.3} 
          roughness={0.4}
        />
      </mesh>

      {/* Rope/cord - simplified as a curved line */}
      <mesh position={[0.5, -0.3, 0]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.015, 0.015, 0.4, 8]} />
        <meshStandardMaterial color="#1E40AF" />
      </mesh>

      {/* Small knot at end of rope */}
      <mesh position={[0.7, -0.5, 0]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#1E40AF" />
      </mesh>
    </group>
  );
}

interface HeavenlyBirdMascotProps {
  isActive: boolean;
  className?: string;
}

const HeavenlyBirdMascot: React.FC<HeavenlyBirdMascotProps> = ({ isActive, className }) => {
  return (
    <div className={className} style={{ width: '200px', height: '200px' }}>
      <Canvas camera={{ position: [1.2, 0.5, 1.5], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, 5, 5]} intensity={0.3} />
        <DonationTin isActive={isActive} />
      </Canvas>
    </div>
  );
};

export default HeavenlyBirdMascot;
