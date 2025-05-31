
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface KeffiyehCharacterProps {
  isActive: boolean;
}

function KeffiyehCharacter({ isActive }: KeffiyehCharacterProps) {
  const characterRef = useRef<THREE.Group>(null);
  const eyesRef = useRef<THREE.Group>(null);
  const keffiyehRef = useRef<THREE.Group>(null);
  const coinsRef = useRef<THREE.Group>(null);
  const coin1Ref = useRef<THREE.Mesh>(null);
  const coin2Ref = useRef<THREE.Mesh>(null);
  const coin3Ref = useRef<THREE.Mesh>(null);
  const coin4Ref = useRef<THREE.Mesh>(null);
  const coin5Ref = useRef<THREE.Mesh>(null);
  const coin6Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (characterRef.current) {
      if (!isActive) {
        // Gentle floating animation
        characterRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.02;
        characterRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.01;
      } else {
        // Excited animation when active
        characterRef.current.position.x = Math.sin(state.clock.elapsedTime * 8) * 0.03;
        characterRef.current.position.y = Math.cos(state.clock.elapsedTime * 10) * 0.02;
        characterRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 9) * 0.03;
      }
    }

    // Keffiyeh flowing animation
    if (keffiyehRef.current) {
      const flowSpeed = isActive ? 4 : 2;
      keffiyehRef.current.rotation.z = Math.sin(state.clock.elapsedTime * flowSpeed) * 0.05;
    }

    // Floating coins animation
    if (coinsRef.current) {
      const floatSpeed = isActive ? 3 : 1.5;
      coinsRef.current.position.y = Math.sin(state.clock.elapsedTime * floatSpeed) * 0.03;
    }

    // Individual coin rotations
    if (coin1Ref.current) {
      coin1Ref.current.rotation.y = state.clock.elapsedTime * 2;
      coin1Ref.current.position.y = Math.sin(state.clock.elapsedTime * 2.1) * 0.02;
    }
    if (coin2Ref.current) {
      coin2Ref.current.rotation.y = state.clock.elapsedTime * -1.5;
      coin2Ref.current.position.y = Math.sin(state.clock.elapsedTime * 1.8) * 0.02;
    }
    if (coin3Ref.current) {
      coin3Ref.current.rotation.y = state.clock.elapsedTime * 1.8;
      coin3Ref.current.position.y = Math.sin(state.clock.elapsedTime * 2.3) * 0.02;
    }
    if (coin4Ref.current) {
      coin4Ref.current.rotation.y = state.clock.elapsedTime * -2.2;
      coin4Ref.current.position.y = Math.sin(state.clock.elapsedTime * 1.9) * 0.02;
    }
    if (coin5Ref.current) {
      coin5Ref.current.rotation.y = state.clock.elapsedTime * 1.3;
      coin5Ref.current.position.y = Math.sin(state.clock.elapsedTime * 2.5) * 0.02;
    }
    if (coin6Ref.current) {
      coin6Ref.current.rotation.y = state.clock.elapsedTime * -1.7;
      coin6Ref.current.position.y = Math.sin(state.clock.elapsedTime * 2.0) * 0.02;
    }
  });

  return (
    <group ref={characterRef} position={[0, 0, 0]}>
      {/* Dark face/head */}
      <mesh position={[0, 0.1, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Big cartoon eyes */}
      <group ref={eyesRef}>
        {/* Left Eye */}
        <group position={[-0.06, 0.15, 0.12]}>
          {/* Eye white */}
          <mesh>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          
          {/* Iris */}
          <mesh position={[0, 0, 0.04]}>
            <sphereGeometry args={[0.03, 10, 10]} />
            <meshStandardMaterial color="#8b4513" />
          </mesh>
          
          {/* Pupil */}
          <mesh position={[0, 0, 0.045]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshStandardMaterial color="#000000" />
          </mesh>
          
          {/* Highlight */}
          <mesh position={[0.01, 0.01, 0.05]}>
            <sphereGeometry args={[0.008, 6, 6]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        </group>

        {/* Right Eye */}
        <group position={[0.06, 0.15, 0.12]}>
          {/* Eye white */}
          <mesh>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          
          {/* Iris */}
          <mesh position={[0, 0, 0.04]}>
            <sphereGeometry args={[0.03, 10, 10]} />
            <meshStandardMaterial color="#8b4513" />
          </mesh>
          
          {/* Pupil */}
          <mesh position={[0, 0, 0.045]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshStandardMaterial color="#000000" />
          </mesh>
          
          {/* Highlight */}
          <mesh position={[0.01, 0.01, 0.05]}>
            <sphereGeometry args={[0.008, 6, 6]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        </group>
      </group>

      {/* Eyebrows */}
      <mesh position={[-0.06, 0.22, 0.12]} rotation={[0, 0, 0.2]}>
        <boxGeometry args={[0.04, 0.01, 0.01]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
      <mesh position={[0.06, 0.22, 0.12]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[0.04, 0.01, 0.01]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>

      {/* Mouth */}
      <mesh position={[0, 0.05, 0.14]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.06, 0.02, 0.01]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Keffiyeh scarf */}
      <group ref={keffiyehRef}>
        {/* Main keffiyeh fabric - triangular shape */}
        <mesh position={[0, 0.25, -0.1]} rotation={[0.2, 0, 0]}>
          <coneGeometry args={[0.4, 0.6, 8]} />
          <meshStandardMaterial 
            color="#f5d5ae" 
            roughness={0.7}
            metalness={0.05}
          />
        </mesh>

        {/* Red checkered pattern stripes */}
        <mesh position={[0, 0.3, 0.05]} rotation={[0.1, 0, 0]}>
          <boxGeometry args={[0.6, 0.02, 0.01]} />
          <meshStandardMaterial color="#dc2626" />
        </mesh>
        <mesh position={[0, 0.2, 0.05]} rotation={[0.1, 0, 0]}>
          <boxGeometry args={[0.6, 0.02, 0.01]} />
          <meshStandardMaterial color="#dc2626" />
        </mesh>
        <mesh position={[0, 0.1, 0.05]} rotation={[0.1, 0, 0]}>
          <boxGeometry args={[0.6, 0.02, 0.01]} />
          <meshStandardMaterial color="#dc2626" />
        </mesh>

        {/* Vertical stripes for checkered effect */}
        <mesh position={[-0.15, 0.2, 0.06]} rotation={[0.1, 0, Math.PI/2]}>
          <boxGeometry args={[0.4, 0.02, 0.01]} />
          <meshStandardMaterial color="#dc2626" />
        </mesh>
        <mesh position={[0, 0.2, 0.06]} rotation={[0.1, 0, Math.PI/2]}>
          <boxGeometry args={[0.4, 0.02, 0.01]} />
          <meshStandardMaterial color="#dc2626" />
        </mesh>
        <mesh position={[0.15, 0.2, 0.06]} rotation={[0.1, 0, Math.PI/2]}>
          <boxGeometry args={[0.4, 0.02, 0.01]} />
          <meshStandardMaterial color="#dc2626" />
        </mesh>

        {/* Keffiyeh side draping */}
        <mesh position={[-0.25, 0, 0]} rotation={[0.3, -0.5, 0.3]}>
          <boxGeometry args={[0.3, 0.4, 0.02]} />
          <meshStandardMaterial 
            color="#f5d5ae" 
            roughness={0.7}
            metalness={0.05}
          />
        </mesh>
        <mesh position={[0.25, 0, 0]} rotation={[0.3, 0.5, -0.3]}>
          <boxGeometry args={[0.3, 0.4, 0.02]} />
          <meshStandardMaterial 
            color="#f5d5ae" 
            roughness={0.7}
            metalness={0.05}
          />
        </mesh>

        {/* Pattern on side drapes */}
        <mesh position={[-0.25, 0, 0.02]} rotation={[0.3, -0.5, 0.3]}>
          <boxGeometry args={[0.2, 0.02, 0.005]} />
          <meshStandardMaterial color="#dc2626" />
        </mesh>
        <mesh position={[0.25, 0, 0.02]} rotation={[0.3, 0.5, -0.3]}>
          <boxGeometry args={[0.2, 0.02, 0.005]} />
          <meshStandardMaterial color="#dc2626" />
        </mesh>

        {/* Fringe details */}
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={i} position={[-0.3 + i * 0.08, -0.2, 0]} rotation={[0, 0, 0]}>
            <cylinderGeometry args={[0.002, 0.002, 0.05, 4]} />
            <meshStandardMaterial color="#f5d5ae" />
          </mesh>
        ))}
      </group>

      {/* Golden coins spilling out */}
      <group ref={coinsRef}>
        {/* Coins inside the keffiyeh */}
        <mesh ref={coin1Ref} position={[0, 0, 0.1]}>
          <cylinderGeometry args={[0.03, 0.03, 0.008, 12]} />
          <meshStandardMaterial 
            color="#fbbf24" 
            metalness={0.9}
            roughness={0.1}
            emissive="#fbbf24"
            emissiveIntensity={0.1}
          />
        </mesh>

        <mesh ref={coin2Ref} position={[-0.05, -0.02, 0.08]}>
          <cylinderGeometry args={[0.03, 0.03, 0.008, 12]} />
          <meshStandardMaterial 
            color="#fbbf24" 
            metalness={0.9}
            roughness={0.1}
            emissive="#fbbf24"
            emissiveIntensity={0.1}
          />
        </mesh>

        <mesh ref={coin3Ref} position={[0.05, -0.01, 0.09]}>
          <cylinderGeometry args={[0.03, 0.03, 0.008, 12]} />
          <meshStandardMaterial 
            color="#fbbf24" 
            metalness={0.9}
            roughness={0.1}
            emissive="#fbbf24"
            emissiveIntensity={0.1}
          />
        </mesh>

        {/* Coins falling/spilling out */}
        <mesh ref={coin4Ref} position={[-0.2, -0.3, 0.2]}>
          <cylinderGeometry args={[0.03, 0.03, 0.008, 12]} />
          <meshStandardMaterial 
            color="#fbbf24" 
            metalness={0.9}
            roughness={0.1}
            emissive="#fbbf24"
            emissiveIntensity={0.1}
          />
        </mesh>

        <mesh ref={coin5Ref} position={[0.1, -0.35, 0.15]}>
          <cylinderGeometry args={[0.03, 0.03, 0.008, 12]} />
          <meshStandardMaterial 
            color="#fbbf24" 
            metalness={0.9}
            roughness={0.1}
            emissive="#fbbf24"
            emissiveIntensity={0.1}
          />
        </mesh>

        <mesh ref={coin6Ref} position={[0.25, -0.28, 0.18]}>
          <cylinderGeometry args={[0.03, 0.03, 0.008, 12]} />
          <meshStandardMaterial 
            color="#fbbf24" 
            metalness={0.9}
            roughness={0.1}
            emissive="#fbbf24"
            emissiveIntensity={0.1}
          />
        </mesh>

        {/* Magical sparkles around coins */}
        <mesh position={[-0.15, -0.25, 0.25]}>
          <sphereGeometry args={[0.008, 6, 6]} />
          <meshStandardMaterial 
            color="#fbbf24"
            emissive="#fbbf24"
            emissiveIntensity={0.6}
          />
        </mesh>
        <mesh position={[0.2, -0.3, 0.2]}>
          <sphereGeometry args={[0.008, 6, 6]} />
          <meshStandardMaterial 
            color="#fbbf24"
            emissive="#fbbf24"
            emissiveIntensity={0.6}
          />
        </mesh>
      </group>
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
      <Canvas camera={{ position: [0.8, 0.5, 1.5], fov: 60 }}>
        {/* Warm lighting setup */}
        <ambientLight intensity={0.8} color="#fff5e1" />
        <directionalLight 
          position={[3, 5, 3]} 
          intensity={1.2} 
          color="#ffffff"
          castShadow
        />
        <pointLight 
          position={[-2, 2, 2]} 
          intensity={0.5} 
          color="#fbbf24"
        />
        <pointLight 
          position={[2, -1, 3]} 
          intensity={0.4} 
          color="#f59e0b"
        />
        <KeffiyehCharacter isActive={isActive} />
      </Canvas>
    </div>
  );
};

export default HeavenlyBirdMascot;
