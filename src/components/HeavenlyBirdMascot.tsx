
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CharityTinProps {
  isActive: boolean;
}

function CharityTin({ isActive }: CharityTinProps) {
  const tinRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (tinRef.current) {
      // Calculate shake every 3 seconds
      const time = state.clock.elapsedTime;
      const shakeInterval = 3; // seconds
      const shakePhase = (time % shakeInterval) / shakeInterval;
      
      // Shake for 0.5 seconds every 3 seconds
      const isShaking = shakePhase < 0.17; // shake for first 0.5 seconds of each 3-second cycle
      
      if (isShaking || isActive) {
        // Shaking animation like a real collection tin
        tinRef.current.position.x = Math.sin(time * 25) * 0.08;
        tinRef.current.position.y = Math.cos(time * 30) * 0.06;
        tinRef.current.rotation.z = Math.sin(time * 28) * 0.1;
      } else {
        // Gentle floating when not shaking
        tinRef.current.position.x = 0;
        tinRef.current.position.y = Math.sin(time * 2) * 0.02;
        tinRef.current.rotation.z = 0;
      }
    }
  });

  return (
    <group ref={tinRef} position={[0, 0, 0]}>
      {/* Main tin body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.6, 0.7, 1.2, 16]} />
        <meshStandardMaterial 
          color="#E8E8E8" 
          metalness={0.3} 
          roughness={0.4}
        />
      </mesh>

      {/* Tin lid */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.65, 0.65, 0.1, 16]} />
        <meshStandardMaterial 
          color="#D0D0D0" 
          metalness={0.4} 
          roughness={0.3}
        />
      </mesh>

      {/* Coin slot */}
      <mesh position={[0, 0.65, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.3, 0.02, 0.05]} />
        <meshStandardMaterial color="#404040" />
      </mesh>

      {/* Charity label - main body */}
      <mesh position={[0, 0.1, 0.71]}>
        <boxGeometry args={[1.1, 0.6, 0.02]} />
        <meshStandardMaterial color="#FF6B35" />
      </mesh>

      {/* Charity text area (white background) */}
      <mesh position={[0, 0.1, 0.72]}>
        <boxGeometry args={[1.0, 0.4, 0.01]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>

      {/* Bottom label */}
      <mesh position={[0, -0.3, 0.71]}>
        <boxGeometry args={[1.0, 0.3, 0.02]} />
        <meshStandardMaterial color="#2E8B57" />
      </mesh>

      {/* Handle */}
      <mesh position={[0.8, 0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.25, 0.05, 8, 16]} />
        <meshStandardMaterial 
          color="#C0C0C0" 
          metalness={0.8} 
          roughness={0.2}
        />
      </mesh>

      {/* Donation amount indicator on tin */}
      <mesh position={[0, -0.4, 0.71]}>
        <boxGeometry args={[0.4, 0.15, 0.01]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>

      {/* Floating coins around the tin */}
      <mesh position={[0.3, 0.8, 0.2]} rotation={[0, Math.PI / 4, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.008, 12]} />
        <meshStandardMaterial 
          color="#fbbf24" 
          metalness={0.9}
          roughness={0.1}
          emissive="#fbbf24"
          emissiveIntensity={0.1}
        />
      </mesh>

      <mesh position={[-0.3, 0.9, 0.1]} rotation={[0, Math.PI / 3, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.008, 12]} />
        <meshStandardMaterial 
          color="#fbbf24" 
          metalness={0.9}
          roughness={0.1}
          emissive="#fbbf24"
          emissiveIntensity={0.1}
        />
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
    <div className={className} style={{ width: '300px', height: '300px' }}>
      <Canvas camera={{ position: [1.5, 1, 2], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, 5, 5]} intensity={0.4} />
        <CharityTin isActive={isActive} />
      </Canvas>
    </div>
  );
};

export default HeavenlyBirdMascot;
