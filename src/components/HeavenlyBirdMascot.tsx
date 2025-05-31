
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface KeffiyehPotProps {
  isActive: boolean;
}

function KeffiyehPot({ isActive }: KeffiyehPotProps) {
  const potRef = useRef<THREE.Group>(null);
  const eyesRef = useRef<THREE.Group>(null);
  const scarlRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (potRef.current) {
      if (!isActive) {
        // Gentle floating animation
        potRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.05;
        potRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.03;
      } else {
        // Excited shaking animation when active
        potRef.current.position.x = Math.sin(state.clock.elapsedTime * 18) * 0.06;
        potRef.current.position.y = Math.cos(state.clock.elapsedTime * 22) * 0.04;
        potRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 20) * 0.08;
      }
    }

    // Floating eyes animation
    if (eyesRef.current) {
      const floatSpeed = isActive ? 3 : 2;
      eyesRef.current.position.y = 0.8 + Math.sin(state.clock.elapsedTime * floatSpeed) * 0.08;
      eyesRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.1;
    }

    // Scarf flowing animation
    if (scarlRef.current) {
      const flowSpeed = isActive ? 8 : 4;
      scarlRef.current.rotation.z = Math.sin(state.clock.elapsedTime * flowSpeed) * 0.15;
    }
  });

  return (
    <group ref={potRef} position={[0, 0, 0]}>
      {/* Main Collection Pot - Made from keffiyeh pattern */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.35, 0.4, 0.6, 16]} />
        <meshStandardMaterial 
          color="#f8f8f8" 
          metalness={0.1} 
          roughness={0.8}
        />
      </mesh>

      {/* Keffiyeh pattern stripes on pot */}
      {/* Black diagonal stripes */}
      <mesh position={[0, -0.15, 0.36]}>
        <boxGeometry args={[0.7, 0.04, 0.02]} />
        <meshStandardMaterial color="#2d3748" />
      </mesh>
      <mesh position={[0, -0.25, 0.36]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.7, 0.04, 0.02]} />
        <meshStandardMaterial color="#2d3748" />
      </mesh>
      <mesh position={[0, -0.35, 0.36]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[0.7, 0.04, 0.02]} />
        <meshStandardMaterial color="#2d3748" />
      </mesh>

      {/* Red accent stripes */}
      <mesh position={[0, -0.2, 0.37]}>
        <boxGeometry args={[0.6, 0.02, 0.01]} />
        <meshStandardMaterial color="#dc2626" />
      </mesh>
      <mesh position={[0, -0.3, 0.37]} rotation={[0, 0, 0.2]}>
        <boxGeometry args={[0.6, 0.02, 0.01]} />
        <meshStandardMaterial color="#dc2626" />
      </mesh>

      {/* Pot rim */}
      <mesh position={[0, 0.1, 0]}>
        <torusGeometry args={[0.37, 0.03, 8, 16]} />
        <meshStandardMaterial 
          color="#e2e8f0" 
          metalness={0.3} 
          roughness={0.4}
        />
      </mesh>

      {/* Coin slot */}
      <mesh position={[0, 0.12, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.2, 0.01, 0.04]} />
        <meshStandardMaterial color="#1a202c" />
      </mesh>

      {/* Keffiyeh scarf draped around pot */}
      <group ref={scarlRef}>
        {/* Main scarf body - flowing around the pot */}
        <mesh position={[-0.3, -0.1, 0.2]} rotation={[0.2, -0.8, 0.3]}>
          <boxGeometry args={[0.8, 0.4, 0.02]} />
          <meshStandardMaterial 
            color="#f7fafc" 
            metalness={0.05} 
            roughness={0.9}
          />
        </mesh>

        {/* Scarf with keffiyeh pattern */}
        <mesh position={[0.3, -0.15, 0.15]} rotation={[0.1, 0.8, -0.2]}>
          <boxGeometry args={[0.7, 0.35, 0.02]} />
          <meshStandardMaterial 
            color="#f7fafc" 
            metalness={0.05} 
            roughness={0.9}
          />
        </mesh>

        {/* Pattern details on scarf */}
        <mesh position={[-0.3, -0.1, 0.22]} rotation={[0.2, -0.8, 0.3]}>
          <boxGeometry args={[0.6, 0.02, 0.01]} />
          <meshStandardMaterial color="#2d3748" />
        </mesh>
        <mesh position={[-0.28, -0.15, 0.22]} rotation={[0.2, -0.8, 0.6]}>
          <boxGeometry args={[0.4, 0.02, 0.01]} />
          <meshStandardMaterial color="#dc2626" />
        </mesh>

        <mesh position={[0.32, -0.15, 0.17]} rotation={[0.1, 0.8, -0.2]}>
          <boxGeometry args={[0.5, 0.02, 0.01]} />
          <meshStandardMaterial color="#2d3748" />
        </mesh>
        <mesh position={[0.28, -0.2, 0.17]} rotation={[0.1, 0.8, 0.1]}>
          <boxGeometry args={[0.3, 0.02, 0.01]} />
          <meshStandardMaterial color="#dc2626" />
        </mesh>

        {/* Scarf ends with tassels */}
        <mesh position={[-0.5, -0.4, 0.1]} rotation={[0.3, -0.5, 0.2]}>
          <boxGeometry args={[0.15, 0.3, 0.01]} />
          <meshStandardMaterial color="#f7fafc" />
        </mesh>
        <mesh position={[0.5, -0.45, 0.05]} rotation={[-0.2, 0.6, -0.1]}>
          <boxGeometry args={[0.12, 0.25, 0.01]} />
          <meshStandardMaterial color="#f7fafc" />
        </mesh>

        {/* Tassel details */}
        <mesh position={[-0.5, -0.55, 0.1]}>
          <cylinderGeometry args={[0.02, 0.02, 0.1, 6]} />
          <meshStandardMaterial color="#e2e8f0" />
        </mesh>
        <mesh position={[0.5, -0.6, 0.05]}>
          <cylinderGeometry args={[0.02, 0.02, 0.08, 6]} />
          <meshStandardMaterial color="#e2e8f0" />
        </mesh>
      </group>

      {/* Floating Eyes above the pot */}
      <group ref={eyesRef} position={[0, 0.8, 0]}>
        {/* Left Eye */}
        <group position={[-0.15, 0, 0]}>
          {/* Eye white */}
          <mesh>
            <sphereGeometry args={[0.08, 12, 12]} />
            <meshStandardMaterial 
              color="#ffffff" 
              metalness={0.1} 
              roughness={0.2}
            />
          </mesh>
          
          {/* Iris */}
          <mesh position={[0, 0, 0.06]}>
            <sphereGeometry args={[0.05, 10, 10]} />
            <meshStandardMaterial color="#3b82f6" />
          </mesh>
          
          {/* Pupil */}
          <mesh position={[0, 0, 0.08]}>
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshStandardMaterial color="#1f2937" />
          </mesh>
          
          {/* Eye highlight */}
          <mesh position={[0.02, 0.02, 0.09]}>
            <sphereGeometry args={[0.01, 6, 6]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        </group>

        {/* Right Eye */}
        <group position={[0.15, 0, 0]}>
          {/* Eye white */}
          <mesh>
            <sphereGeometry args={[0.08, 12, 12]} />
            <meshStandardMaterial 
              color="#ffffff" 
              metalness={0.1} 
              roughness={0.2}
            />
          </mesh>
          
          {/* Iris */}
          <mesh position={[0, 0, 0.06]}>
            <sphereGeometry args={[0.05, 10, 10]} />
            <meshStandardMaterial color="#3b82f6" />
          </mesh>
          
          {/* Pupil */}
          <mesh position={[0, 0, 0.08]}>
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshStandardMaterial color="#1f2937" />
          </mesh>
          
          {/* Eye highlight */}
          <mesh position={[0.02, 0.02, 0.09]}>
            <sphereGeometry args={[0.01, 6, 6]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        </group>

        {/* Magical floating effect around eyes */}
        <mesh position={[0, 0, -0.1]}>
          <torusGeometry args={[0.25, 0.01, 8, 32]} />
          <meshStandardMaterial 
            color="#60a5fa" 
            transparent 
            opacity={0.6}
            emissive="#3b82f6"
            emissiveIntensity={0.2}
          />
        </mesh>
      </group>

      {/* Collection label */}
      <mesh position={[0, -0.45, 0.35]}>
        <boxGeometry args={[0.5, 0.15, 0.01]} />
        <meshStandardMaterial color="#10b981" />
      </mesh>

      {/* Small handle on the side */}
      <mesh position={[0.42, -0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.08, 0.015, 6, 12]} />
        <meshStandardMaterial 
          color="#94a3b8" 
          metalness={0.6} 
          roughness={0.2}
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
    <div className={className}>
      <Canvas camera={{ position: [1, 1, 2.5], fov: 50 }}>
        {/* Soft lighting setup */}
        <ambientLight intensity={0.8} color="#f8fafc" />
        <directionalLight 
          position={[5, 10, 5]} 
          intensity={1.2} 
          color="#ffffff"
          castShadow
        />
        <pointLight 
          position={[-3, 3, 3]} 
          intensity={0.4} 
          color="#3b82f6"
        />
        <pointLight 
          position={[0, -3, 3]} 
          intensity={0.3} 
          color="#60a5fa"
        />
        <KeffiyehPot isActive={isActive} />
      </Canvas>
    </div>
  );
};

export default HeavenlyBirdMascot;
