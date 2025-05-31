
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Character3DProps {
  isActive: boolean;
}

function CharityCollector({ isActive }: Character3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const tinRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      if (!isActive) {
        // Gentle floating animation
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
        groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      } else {
        // Active shaking animation
        groupRef.current.position.x = Math.sin(state.clock.elapsedTime * 20) * 0.1;
        groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 25) * 0.1;
      }
    }

    if (tinRef.current && isActive) {
      // Extra shaking for the collection tin
      tinRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 30) * 0.2;
      tinRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 25) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Head */}
      <mesh position={[0, 1.8, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#F4A460" />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.1, 1.9, 0.25]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.1, 1.9, 0.25]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Smile */}
      <mesh position={[0, 1.75, 0.28]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.08, 0.01, 4, 16, Math.PI]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Body */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.35, 0.4, 0.8, 12]} />
        <meshStandardMaterial color="#4A90E2" />
      </mesh>

      {/* Charity vest/tabard */}
      <mesh position={[0, 1.1, 0.35]}>
        <boxGeometry args={[0.7, 0.6, 0.05]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.5, 1.2, 0]} rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.08, 0.1, 0.6, 8]} />
        <meshStandardMaterial color="#F4A460" />
      </mesh>
      <mesh position={[0.5, 1.2, 0]} rotation={[0, 0, 0.3]}>
        <cylinderGeometry args={[0.08, 0.1, 0.6, 8]} />
        <meshStandardMaterial color="#F4A460" />
      </mesh>

      {/* Collection tin */}
      <mesh ref={tinRef} position={[0, 0.4, 0.4]} rotation={[0.2, 0, 0]}>
        <cylinderGeometry args={[0.25, 0.3, 0.4, 16]} />
        <meshStandardMaterial color="#C0C0C0" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Tin label */}
      <mesh position={[0, 0.4, 0.65]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.4, 0.2, 0.02]} />
        <meshStandardMaterial color="#FF6B6B" />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.15, 0.2, 0]}>
        <cylinderGeometry args={[0.1, 0.12, 0.6, 8]} />
        <meshStandardMaterial color="#2C3E50" />
      </mesh>
      <mesh position={[0.15, 0.2, 0]}>
        <cylinderGeometry args={[0.1, 0.12, 0.6, 8]} />
        <meshStandardMaterial color="#2C3E50" />
      </mesh>

      {/* Feet */}
      <mesh position={[-0.15, -0.15, 0.1]}>
        <boxGeometry args={[0.15, 0.1, 0.3]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.15, -0.15, 0.1]}>
        <boxGeometry args={[0.15, 0.1, 0.3]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Hat */}
      <mesh position={[0, 2.15, 0]}>
        <cylinderGeometry args={[0.25, 0.32, 0.15, 16]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
    </group>
  );
}

interface Custom3DCharacterProps {
  isActive: boolean;
  className?: string;
}

const Custom3DCharacter: React.FC<Custom3DCharacterProps> = ({ isActive, className }) => {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />
        <directionalLight position={[0, 5, 5]} intensity={0.5} />
        <CharityCollector isActive={isActive} />
      </Canvas>
    </div>
  );
};

export default Custom3DCharacter;
