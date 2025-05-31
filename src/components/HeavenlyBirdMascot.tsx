
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

  useFrame((state) => {
    if (characterRef.current) {
      if (!isActive) {
        // Gentle floating animation
        characterRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.03;
        characterRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
      } else {
        // Excited animation when active
        characterRef.current.position.x = Math.sin(state.clock.elapsedTime * 12) * 0.04;
        characterRef.current.position.y = Math.cos(state.clock.elapsedTime * 15) * 0.03;
        characterRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 14) * 0.05;
      }
    }

    // Keffiyeh flowing animation
    if (keffiyehRef.current) {
      const flowSpeed = isActive ? 6 : 3;
      keffiyehRef.current.rotation.z = Math.sin(state.clock.elapsedTime * flowSpeed) * 0.1;
    }

    // Floating coins animation
    if (coinsRef.current) {
      const floatSpeed = isActive ? 4 : 2;
      coinsRef.current.position.y = Math.sin(state.clock.elapsedTime * floatSpeed) * 0.05;
      coinsRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }

    // Individual coin rotations
    if (coin1Ref.current) {
      coin1Ref.current.rotation.y = state.clock.elapsedTime * 2;
    }
    if (coin2Ref.current) {
      coin2Ref.current.rotation.y = state.clock.elapsedTime * -1.5;
    }
    if (coin3Ref.current) {
      coin3Ref.current.rotation.y = state.clock.elapsedTime * 1.8;
    }
    if (coin4Ref.current) {
      coin4Ref.current.rotation.y = state.clock.elapsedTime * -2.2;
    }
  });

  return (
    <group ref={characterRef} position={[0, 0, 0]}>
      {/* Character Head */}
      <mesh position={[0, 0.2, 0]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial 
          color="#f4d4a7" 
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>

      {/* Eyes */}
      <group ref={eyesRef}>
        {/* Left Eye */}
        <group position={[-0.08, 0.25, 0.2]}>
          {/* Eye white */}
          <mesh>
            <sphereGeometry args={[0.04, 12, 12]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          
          {/* Iris */}
          <mesh position={[0, 0, 0.03]}>
            <sphereGeometry args={[0.025, 10, 10]} />
            <meshStandardMaterial color="#2563eb" />
          </mesh>
          
          {/* Pupil */}
          <mesh position={[0, 0, 0.035]}>
            <sphereGeometry args={[0.015, 8, 8]} />
            <meshStandardMaterial color="#000000" />
          </mesh>
          
          {/* Highlight */}
          <mesh position={[0.01, 0.01, 0.04]}>
            <sphereGeometry args={[0.005, 6, 6]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        </group>

        {/* Right Eye */}
        <group position={[0.08, 0.25, 0.2]}>
          {/* Eye white */}
          <mesh>
            <sphereGeometry args={[0.04, 12, 12]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          
          {/* Iris */}
          <mesh position={[0, 0, 0.03]}>
            <sphereGeometry args={[0.025, 10, 10]} />
            <meshStandardMaterial color="#2563eb" />
          </mesh>
          
          {/* Pupil */}
          <mesh position={[0, 0, 0.035]}>
            <sphereGeometry args={[0.015, 8, 8]} />
            <meshStandardMaterial color="#000000" />
          </mesh>
          
          {/* Highlight */}
          <mesh position={[0.01, 0.01, 0.04]}>
            <sphereGeometry args={[0.005, 6, 6]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        </group>
      </group>

      {/* Mouth */}
      <mesh position={[0, 0.15, 0.22]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.08, 0.03, 0.01]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>

      {/* Character Body */}
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.2, 0.25, 0.4, 12]} />
        <meshStandardMaterial 
          color="#f4d4a7" 
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>

      {/* Keffiyeh on head */}
      <group ref={keffiyehRef}>
        {/* Main keffiyeh fabric on head */}
        <mesh position={[0, 0.35, 0]} rotation={[0.1, 0, 0]}>
          <sphereGeometry args={[0.32, 12, 12]} />
          <meshStandardMaterial 
            color="#f8f8f8" 
            roughness={0.8}
            metalness={0.05}
          />
        </mesh>

        {/* Keffiyeh checkered pattern - horizontal stripes */}
        <mesh position={[0, 0.35, 0.3]} rotation={[0.1, 0, 0]}>
          <boxGeometry args={[0.6, 0.03, 0.01]} />
          <meshStandardMaterial color="#2d3748" />
        </mesh>
        <mesh position={[0, 0.4, 0.25]} rotation={[0.3, 0, 0]}>
          <boxGeometry args={[0.5, 0.03, 0.01]} />
          <meshStandardMaterial color="#2d3748" />
        </mesh>
        <mesh position={[0, 0.3, 0.25]} rotation={[-0.1, 0, 0]}>
          <boxGeometry args={[0.5, 0.03, 0.01]} />
          <meshStandardMaterial color="#2d3748" />
        </mesh>

        {/* Vertical stripes for checkered effect */}
        <mesh position={[-0.15, 0.35, 0.28]} rotation={[0.1, 0, Math.PI/2]}>
          <boxGeometry args={[0.4, 0.03, 0.01]} />
          <meshStandardMaterial color="#2d3748" />
        </mesh>
        <mesh position={[0.15, 0.35, 0.28]} rotation={[0.1, 0, Math.PI/2]}>
          <boxGeometry args={[0.4, 0.03, 0.01]} />
          <meshStandardMaterial color="#2d3748" />
        </mesh>

        {/* Red accent lines */}
        <mesh position={[0, 0.37, 0.28]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.4, 0.02, 0.005]} />
          <meshStandardMaterial color="#dc2626" />
        </mesh>
        <mesh position={[0, 0.33, 0.28]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.4, 0.02, 0.005]} />
          <meshStandardMaterial color="#dc2626" />
        </mesh>

        {/* Keffiyeh draping on sides */}
        <mesh position={[-0.3, 0.1, 0]} rotation={[0.2, -0.6, 0.4]}>
          <boxGeometry args={[0.4, 0.3, 0.02]} />
          <meshStandardMaterial 
            color="#f8f8f8" 
            roughness={0.8}
            metalness={0.05}
          />
        </mesh>
        <mesh position={[0.3, 0.1, 0]} rotation={[0.2, 0.6, -0.4]}>
          <boxGeometry args={[0.4, 0.3, 0.02]} />
          <meshStandardMaterial 
            color="#f8f8f8" 
            roughness={0.8}
            metalness={0.05}
          />
        </mesh>

        {/* Pattern on side drapes */}
        <mesh position={[-0.3, 0.1, 0.02]} rotation={[0.2, -0.6, 0.4]}>
          <boxGeometry args={[0.3, 0.02, 0.005]} />
          <meshStandardMaterial color="#2d3748" />
        </mesh>
        <mesh position={[0.3, 0.1, 0.02]} rotation={[0.2, 0.6, -0.4]}>
          <boxGeometry args={[0.3, 0.02, 0.005]} />
          <meshStandardMaterial color="#2d3748" />
        </mesh>
      </group>

      {/* Floating Golden Coins around the character */}
      <group ref={coinsRef}>
        {/* Coin 1 */}
        <mesh ref={coin1Ref} position={[-0.4, 0.3, 0.3]}>
          <cylinderGeometry args={[0.04, 0.04, 0.01, 12]} />
          <meshStandardMaterial 
            color="#fbbf24" 
            metalness={0.8}
            roughness={0.2}
            emissive="#fbbf24"
            emissiveIntensity={0.1}
          />
        </mesh>

        {/* Coin 2 */}
        <mesh ref={coin2Ref} position={[0.4, 0.2, 0.2]}>
          <cylinderGeometry args={[0.04, 0.04, 0.01, 12]} />
          <meshStandardMaterial 
            color="#fbbf24" 
            metalness={0.8}
            roughness={0.2}
            emissive="#fbbf24"
            emissiveIntensity={0.1}
          />
        </mesh>

        {/* Coin 3 */}
        <mesh ref={coin3Ref} position={[0.2, -0.3, 0.4]}>
          <cylinderGeometry args={[0.04, 0.04, 0.01, 12]} />
          <meshStandardMaterial 
            color="#fbbf24" 
            metalness={0.8}
            roughness={0.2}
            emissive="#fbbf24"
            emissiveIntensity={0.1}
          />
        </mesh>

        {/* Coin 4 */}
        <mesh ref={coin4Ref} position={[-0.2, -0.2, 0.4]}>
          <cylinderGeometry args={[0.04, 0.04, 0.01, 12]} />
          <meshStandardMaterial 
            color="#fbbf24" 
            metalness={0.8}
            roughness={0.2}
            emissive="#fbbf24"
            emissiveIntensity={0.1}
          />
        </mesh>

        {/* Magical sparkles around coins */}
        <mesh position={[-0.35, 0.35, 0.25]}>
          <sphereGeometry args={[0.01, 6, 6]} />
          <meshStandardMaterial 
            color="#fbbf24"
            emissive="#fbbf24"
            emissiveIntensity={0.5}
          />
        </mesh>
        <mesh position={[0.35, 0.25, 0.15]}>
          <sphereGeometry args={[0.01, 6, 6]} />
          <meshStandardMaterial 
            color="#fbbf24"
            emissive="#fbbf24"
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>

      {/* Arms holding invisible donation sign */}
      <mesh position={[-0.15, -0.05, 0.15]} rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.03, 0.03, 0.15, 8]} />
        <meshStandardMaterial color="#f4d4a7" />
      </mesh>
      <mesh position={[0.15, -0.05, 0.15]} rotation={[0, 0, 0.3]}>
        <cylinderGeometry args={[0.03, 0.03, 0.15, 8]} />
        <meshStandardMaterial color="#f4d4a7" />
      </mesh>

      {/* Hands */}
      <mesh position={[-0.2, -0.1, 0.2]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#f4d4a7" />
      </mesh>
      <mesh position={[0.2, -0.1, 0.2]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#f4d4a7" />
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
        {/* Warm lighting setup */}
        <ambientLight intensity={0.7} color="#fff5e1" />
        <directionalLight 
          position={[5, 10, 5]} 
          intensity={1.0} 
          color="#ffffff"
          castShadow
        />
        <pointLight 
          position={[-3, 3, 3]} 
          intensity={0.4} 
          color="#fbbf24"
        />
        <pointLight 
          position={[3, -2, 4]} 
          intensity={0.3} 
          color="#f59e0b"
        />
        <KeffiyehCharacter isActive={isActive} />
      </Canvas>
    </div>
  );
};

export default HeavenlyBirdMascot;
