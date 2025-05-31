
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DonationBoxProps {
  isActive: boolean;
}

function DonationBox({ isActive }: DonationBoxProps) {
  const boxRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (boxRef.current) {
      const time = state.clock.elapsedTime;
      
      // Gentle shaking animation - up/down and side to side
      const shakeIntensity = 0.05;
      boxRef.current.position.x = Math.sin(time * 2) * shakeIntensity;
      boxRef.current.position.y = Math.cos(time * 1.5) * shakeIntensity;
      
      // Slight rotation for more natural movement
      boxRef.current.rotation.z = Math.sin(time * 1.8) * 0.02;
    }
  });

  return (
    <group ref={boxRef} position={[0, 0, 0]}>
      {/* Main donation box body - blue */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1.2, 1]} />
        <meshStandardMaterial 
          color="#3B82F6" 
          metalness={0.1} 
          roughness={0.3}
        />
      </mesh>

      {/* Box lid - darker blue */}
      <mesh position={[0, 0.65, 0]}>
        <boxGeometry args={[1.1, 0.1, 1.1]} />
        <meshStandardMaterial 
          color="#1E40AF" 
          metalness={0.2} 
          roughness={0.2}
        />
      </mesh>

      {/* Coin slot */}
      <mesh position={[0, 0.7, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.4, 0.03, 0.1]} />
        <meshStandardMaterial color="#1F2937" />
      </mesh>

      {/* Front label */}
      <mesh position={[0, 0.1, 0.51]}>
        <boxGeometry args={[0.8, 0.6, 0.02]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>

      {/* Handle */}
      <mesh position={[0.6, 0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.15, 0.03, 8, 16]} />
        <meshStandardMaterial 
          color="#6B7280" 
          metalness={0.8} 
          roughness={0.2}
        />
      </mesh>

      {/* Small donation indicator */}
      <mesh position={[0, -0.3, 0.51]}>
        <boxGeometry args={[0.3, 0.1, 0.01]} />
        <meshStandardMaterial color="#10B981" />
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
      <Canvas camera={{ position: [1.5, 1, 2], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, 5, 5]} intensity={0.3} />
        <DonationBox isActive={isActive} />
      </Canvas>
    </div>
  );
};

export default HeavenlyBirdMascot;
