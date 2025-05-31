
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HeavenlyBirdProps {
  isActive: boolean;
}

function HeavenlyBird({ isActive }: HeavenlyBirdProps) {
  const birdRef = useRef<THREE.Group>(null);
  const wingsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (birdRef.current) {
      if (!isActive) {
        // Gentle floating animation like floating in heaven
        birdRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
        birdRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
      } else {
        // Excited shaking animation when active
        birdRef.current.position.x = Math.sin(state.clock.elapsedTime * 20) * 0.08;
        birdRef.current.position.y = Math.cos(state.clock.elapsedTime * 25) * 0.06;
        birdRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 22) * 0.1;
      }
    }

    // Wing flapping animation
    if (wingsRef.current) {
      const flapSpeed = isActive ? 15 : 8;
      wingsRef.current.rotation.z = Math.sin(state.clock.elapsedTime * flapSpeed) * 0.3;
    }
  });

  return (
    <group ref={birdRef} position={[0, 0.2, 0]}>
      {/* Parakeet Body - More elongated and vibrant green */}
      <mesh position={[0, 0, 0]} scale={[0.7, 1.2, 0.6]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial 
          color="#10b981" 
          metalness={0.1} 
          roughness={0.2}
        />
      </mesh>

      {/* Parakeet Head - Smaller and more rounded */}
      <mesh position={[0, 0.6, 0.1]}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial 
          color="#22c55e" 
          metalness={0.1} 
          roughness={0.2}
        />
      </mesh>

      {/* Distinctive Parakeet Curved Beak */}
      <mesh position={[0, 0.62, 0.32]} rotation={[0.4, 0, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.4} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.58, 0.36]} rotation={[0.6, 0, 0]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#d97706" metalness={0.4} roughness={0.3} />
      </mesh>

      {/* Large Parakeet Eyes */}
      <mesh position={[-0.1, 0.7, 0.26]}>
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.1, 0.7, 0.26]}>
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Eye pupils with parakeet-like dark centers */}
      <mesh position={[-0.08, 0.72, 0.31]}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.08, 0.72, 0.31]}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Parakeet Wing Markings - Darker green stripes */}
      <mesh position={[-0.35, 0.15, 0]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[0.5, 0.08, 0.35]} />
        <meshStandardMaterial 
          color="#065f46" 
          metalness={0.2} 
          roughness={0.3}
        />
      </mesh>
      <mesh position={[0.35, 0.15, 0]} rotation={[0, 0, 0.2]}>
        <boxGeometry args={[0.5, 0.08, 0.35]} />
        <meshStandardMaterial 
          color="#065f46" 
          metalness={0.2} 
          roughness={0.3}
        />
      </mesh>

      {/* Wings Group - Longer parakeet wings */}
      <group ref={wingsRef}>
        {/* Left Wing */}
        <mesh position={[-0.4, 0.1, 0]} rotation={[0, 0, -0.3]}>
          <boxGeometry args={[0.7, 0.12, 0.4]} />
          <meshStandardMaterial 
            color="#16a34a" 
            metalness={0.2} 
            roughness={0.3}
          />
        </mesh>

        {/* Right Wing */}
        <mesh position={[0.4, 0.1, 0]} rotation={[0, 0, 0.3]}>
          <boxGeometry args={[0.7, 0.12, 0.4]} />
          <meshStandardMaterial 
            color="#16a34a" 
            metalness={0.2} 
            roughness={0.3}
          />
        </mesh>
      </group>

      {/* Parakeet tail feathers - Longer and more pointed */}
      <mesh position={[0, -0.4, -0.3]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.2, 0.8, 0.08]} />
        <meshStandardMaterial 
          color="#059669" 
          metalness={0.1} 
          roughness={0.2}
        />
      </mesh>

      {/* Additional tail feathers for parakeet look */}
      <mesh position={[-0.08, -0.45, -0.32]} rotation={[0.25, -0.1, 0]}>
        <boxGeometry args={[0.12, 0.7, 0.06]} />
        <meshStandardMaterial 
          color="#10b981" 
        />
      </mesh>
      <mesh position={[0.08, -0.45, -0.32]} rotation={[0.25, 0.1, 0]}>
        <boxGeometry args={[0.12, 0.7, 0.06]} />
        <meshStandardMaterial 
          color="#10b981" 
        />
      </mesh>

      {/* Donation Tin held in bird's claws */}
      <group position={[0, -0.6, 0.2]}>
        {/* Main tin body */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.25, 0.3, 0.5, 12]} />
          <meshStandardMaterial 
            color="#E8E8E8" 
            metalness={0.4} 
            roughness={0.3}
          />
        </mesh>

        {/* Tin lid */}
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.28, 0.28, 0.05, 12]} />
          <meshStandardMaterial 
            color="#D0D0D0" 
            metalness={0.5} 
            roughness={0.2}
          />
        </mesh>

        {/* Coin slot */}
        <mesh position={[0, 0.27, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <boxGeometry args={[0.15, 0.01, 0.03]} />
          <meshStandardMaterial color="#404040" />
        </mesh>

        {/* Charity label */}
        <mesh position={[0, 0, 0.31]}>
          <boxGeometry args={[0.5, 0.25, 0.01]} />
          <meshStandardMaterial color="#22c55e" />
        </mesh>

        {/* Small handle */}
        <mesh position={[0.35, 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.1, 0.02, 6, 12]} />
          <meshStandardMaterial 
            color="#C0C0C0" 
            metalness={0.8} 
            roughness={0.1}
          />
        </mesh>
      </group>

      {/* Parakeet claws - More detailed */}
      <mesh position={[-0.12, -0.4, 0.1]}>
        <cylinderGeometry args={[0.015, 0.025, 0.2, 6]} />
        <meshStandardMaterial color="#d97706" />
      </mesh>
      <mesh position={[0.12, -0.4, 0.1]}>
        <cylinderGeometry args={[0.015, 0.025, 0.2, 6]} />
        <meshStandardMaterial color="#d97706" />
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
    <div className={className}>
      <Canvas camera={{ position: [1, 1, 2.5], fov: 50 }}>
        {/* Lighting setup */}
        <ambientLight intensity={0.8} color="#f0f9ff" />
        <directionalLight 
          position={[5, 10, 5]} 
          intensity={1.2} 
          color="#ffffff"
          castShadow
        />
        <pointLight 
          position={[-5, 5, 5]} 
          intensity={0.6} 
          color="#22c55e"
        />
        <pointLight 
          position={[0, -5, 5]} 
          intensity={0.4} 
          color="#86efac"
        />
        <HeavenlyBird isActive={isActive} />
      </Canvas>
    </div>
  );
};

export default HeavenlyBirdMascot;
