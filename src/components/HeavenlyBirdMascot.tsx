
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
      {/* Cute Parakeet Body - More rounded and plump */}
      <mesh position={[0, 0, 0]} scale={[0.8, 1.1, 0.7]}>
        <sphereGeometry args={[0.35, 20, 20]} />
        <meshStandardMaterial 
          color="#22c55e" 
          metalness={0.05} 
          roughness={0.4}
        />
      </mesh>

      {/* Adorable rounded head - Bigger and more proportional */}
      <mesh position={[0, 0.55, 0.05]}>
        <sphereGeometry args={[0.25, 20, 20]} />
        <meshStandardMaterial 
          color="#34d399" 
          metalness={0.05} 
          roughness={0.3}
        />
      </mesh>

      {/* Cute small curved beak - More realistic and petite */}
      <mesh position={[0, 0.58, 0.28]} rotation={[0.3, 0, 0]}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.2} roughness={0.4} />
      </mesh>
      
      {/* Beak tip - smaller and more natural */}
      <mesh position={[0, 0.55, 0.31]} rotation={[0.5, 0, 0]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color="#d97706" metalness={0.3} roughness={0.3} />
      </mesh>

      {/* Large expressive eyes - Bigger and more appealing */}
      <mesh position={[-0.12, 0.65, 0.22]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.1} />
      </mesh>
      <mesh position={[0.12, 0.65, 0.22]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.1} />
      </mesh>

      {/* Cute pupils with friendly look */}
      <mesh position={[-0.1, 0.67, 0.28]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      <mesh position={[0.1, 0.67, 0.28]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>

      {/* Tiny eye highlights for sparkle */}
      <mesh position={[-0.09, 0.69, 0.3]}>
        <sphereGeometry args={[0.015, 6, 6]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.09, 0.69, 0.3]}>
        <sphereGeometry args={[0.015, 6, 6]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Soft wing markings - More subtle and natural */}
      <mesh position={[-0.32, 0.1, 0]} rotation={[0, 0, -0.15]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial 
          color="#16a34a" 
          metalness={0.1} 
          roughness={0.5}
        />
      </mesh>
      <mesh position={[0.32, 0.1, 0]} rotation={[0, 0, 0.15]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial 
          color="#16a34a" 
          metalness={0.1} 
          roughness={0.5}
        />
      </mesh>

      {/* Wings Group - More natural wing shape */}
      <group ref={wingsRef}>
        {/* Left Wing - More rounded and natural */}
        <mesh position={[-0.35, 0.05, 0]} rotation={[0, 0, -0.25]} scale={[1, 0.8, 1]}>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshStandardMaterial 
            color="#10b981" 
            metalness={0.1} 
            roughness={0.4}
          />
        </mesh>

        {/* Right Wing */}
        <mesh position={[0.35, 0.05, 0]} rotation={[0, 0, 0.25]} scale={[1, 0.8, 1]}>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshStandardMaterial 
            color="#10b981" 
            metalness={0.1} 
            roughness={0.4}
          />
        </mesh>
      </group>

      {/* Elegant tail feathers - More graceful and curved */}
      <mesh position={[0, -0.35, -0.25]} rotation={[0.15, 0, 0]} scale={[0.8, 1.2, 1]}>
        <sphereGeometry args={[0.15, 12, 12]} />
        <meshStandardMaterial 
          color="#059669" 
          metalness={0.1} 
          roughness={0.3}
        />
      </mesh>

      {/* Side tail feathers for fuller look */}
      <mesh position={[-0.06, -0.4, -0.28]} rotation={[0.2, -0.08, 0]} scale={[0.6, 1, 1]}>
        <sphereGeometry args={[0.12, 10, 10]} />
        <meshStandardMaterial color="#10b981" />
      </mesh>
      <mesh position={[0.06, -0.4, -0.28]} rotation={[0.2, 0.08, 0]} scale={[0.6, 1, 1]}>
        <sphereGeometry args={[0.12, 10, 10]} />
        <meshStandardMaterial color="#10b981" />
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

      {/* Cute little feet - More proportional */}
      <mesh position={[-0.1, -0.38, 0.08]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="#f59e0b" />
      </mesh>
      <mesh position={[0.1, -0.38, 0.08]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="#f59e0b" />
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
        {/* Soft lighting setup for cute appearance */}
        <ambientLight intensity={0.9} color="#f8fafc" />
        <directionalLight 
          position={[5, 10, 5]} 
          intensity={1} 
          color="#ffffff"
          castShadow
        />
        <pointLight 
          position={[-5, 5, 5]} 
          intensity={0.5} 
          color="#34d399"
        />
        <pointLight 
          position={[0, -5, 5]} 
          intensity={0.3} 
          color="#86efac"
        />
        <HeavenlyBird isActive={isActive} />
      </Canvas>
    </div>
  );
};

export default HeavenlyBirdMascot;
