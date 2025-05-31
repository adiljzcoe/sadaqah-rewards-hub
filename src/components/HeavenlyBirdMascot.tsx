
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DonationTinProps {
  isActive: boolean;
}

function DonationTin({ isActive }: DonationTinProps) {
  const tinRef = useRef<THREE.Group>(null);
  const eyesRef = useRef<THREE.Group>(null);
  const eyebrowsRef = useRef<THREE.Group>(null);
  const beardRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (tinRef.current) {
      const time = state.clock.elapsedTime;
      
      // Add slow rotation to show different angles - limited to front, left, and right (no back)
      tinRef.current.rotation.y = Math.sin(time * 0.2) * 0.6; // Oscillates between -0.6 and +0.6 radians (~±34 degrees)
      
      // More personality: excited bouncing when active, gentle sway when not
      if (isActive) {
        // Excited bouncing animation
        const bounceIntensity = 0.1;
        tinRef.current.position.y = Math.abs(Math.sin(time * 5)) * bounceIntensity;
        
        // Wiggle side to side with excitement
        tinRef.current.position.x = Math.sin(time * 7) * 0.05;
        
        // More pronounced rotation when excited (in addition to the base rotation)
        tinRef.current.rotation.z = Math.sin(time * 6) * 0.08;
        
        // Eyebrow animation when excited
        if (eyebrowsRef.current) {
          eyebrowsRef.current.position.y = Math.sin(time * 8) * 0.01 + 0.25;
        }

        // Enhanced beard movement when excited - more dramatic for dwarf beard
        if (beardRef.current) {
          beardRef.current.rotation.z = Math.sin(time * 6) * 0.03;
          beardRef.current.rotation.x = Math.sin(time * 4) * 0.02;
        }
      } else {
        // Gentle swaying when idle
        const swayIntensity = 0.03;
        tinRef.current.position.y = Math.sin(time * 2) * swayIntensity;
        
        // Very subtle side movement
        tinRef.current.position.x = Math.sin(time * 1.8) * (swayIntensity * 0.5);
        
        // Gentle tilt
        tinRef.current.rotation.z = Math.sin(time * 1.5) * 0.015;
        
        // Subtle eyebrow movement
        if (eyebrowsRef.current) {
          eyebrowsRef.current.position.y = Math.sin(time * 3) * 0.005 + 0.25;
        }

        // Subtle beard sway - gentle movement for dwarf beard
        if (beardRef.current) {
          beardRef.current.rotation.z = Math.sin(time * 2.5) * 0.015;
          beardRef.current.rotation.x = Math.sin(time * 2) * 0.01;
        }
      }
      
      // Blinking animation
      if (eyesRef.current && time % 4 < 0.1) {
        eyesRef.current.scale.y = 0.1;
      } else if (eyesRef.current) {
        eyesRef.current.scale.y = 1;
      }
    }
  });

  return (
    <group ref={tinRef} position={[0, 0, 0]}>
      {/* Main donation tin body - white/cream */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.7, 16]} />
        <meshStandardMaterial 
          color="#F8F8F8" 
          metalness={0.1} 
          roughness={0.4}
        />
      </mesh>

      {/* Blue base/bottom */}
      <mesh position={[0, -0.45, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.2, 16]} />
        <meshStandardMaterial 
          color="#2563EB" 
          metalness={0.2} 
          roughness={0.3}
        />
      </mesh>

      {/* Blue lid/top */}
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 0.15, 16]} />
        <meshStandardMaterial 
          color="#2563EB" 
          metalness={0.2} 
          roughness={0.3}
        />
      </mesh>

      {/* Coin slot on top */}
      <mesh position={[0, 0.53, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.2, 0.02, 0.06]} />
        <meshStandardMaterial color="#1E40AF" />
      </mesh>

      {/* Eyes group for blinking - made larger and more friendly */}
      <group ref={eyesRef}>
        {/* Left eye - larger and rounder */}
        <mesh position={[-0.12, 0.15, 0.41]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        {/* Right eye - larger and rounder */}
        <mesh position={[0.12, 0.15, 0.41]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color="#000000" />
        </mesh>

        {/* Eye highlights for more life - larger */}
        <mesh position={[-0.11, 0.18, 0.42]}>
          <sphereGeometry args={[0.022, 6, 6]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
        <mesh position={[0.13, 0.18, 0.42]}>
          <sphereGeometry args={[0.022, 6, 6]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>

        {/* Secondary eye highlights for sparkle */}
        <mesh position={[-0.105, 0.19, 0.425]}>
          <sphereGeometry args={[0.01, 6, 6]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
        <mesh position={[0.135, 0.19, 0.425]}>
          <sphereGeometry args={[0.01, 6, 6]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
      </group>

      {/* Friendlier eyebrows - less angular, more curved */}
      <group ref={eyebrowsRef} position={[0, 0.25, 0]}>
        <mesh position={[-0.12, 0, 0.41]} rotation={[0, 0, -0.1]}>
          <boxGeometry args={[0.09, 0.018, 0.01]} />
          <meshStandardMaterial color="#8B5A3C" />
        </mesh>
        <mesh position={[0.12, 0, 0.41]} rotation={[0, 0, 0.1]}>
          <boxGeometry args={[0.09, 0.018, 0.01]} />
          <meshStandardMaterial color="#8B5A3C" />
        </mesh>
      </group>

      {/* Enhanced Dwarf Beard - much fuller and more textured */}
      <group ref={beardRef} position={[0, -0.08, 0.35]}>
        {/* Main beard body - larger and more prominent */}
        <mesh position={[0, -0.15, 0.05]}>
          <sphereGeometry args={[0.22, 12, 12]} />
          <meshStandardMaterial color="#8B5A3C" roughness={0.9} />
        </mesh>
        
        {/* Extended beard length - classic dwarf style */}
        <mesh position={[0, -0.3, 0.02]}>
          <sphereGeometry args={[0.18, 10, 10]} />
          <meshStandardMaterial color="#8B5A3C" roughness={0.9} />
        </mesh>

        {/* Beard tip - pointed dwarf style */}
        <mesh position={[0, -0.42, 0]}>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshStandardMaterial color="#8B5A3C" roughness={0.9} />
        </mesh>

        {/* Fuller beard sides */}
        <mesh position={[-0.12, -0.1, 0.03]} rotation={[0, 0.4, 0]}>
          <sphereGeometry args={[0.12, 10, 10]} />
          <meshStandardMaterial color="#8B5A3C" roughness={0.9} />
        </mesh>
        <mesh position={[0.12, -0.1, 0.03]} rotation={[0, -0.4, 0]}>
          <sphereGeometry args={[0.12, 10, 10]} />
          <meshStandardMaterial color="#8B5A3C" roughness={0.9} />
        </mesh>

        {/* Additional side volume for fuller dwarf beard */}
        <mesh position={[-0.18, -0.2, 0]} rotation={[0, 0.6, 0]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color="#8B5A3C" roughness={0.9} />
        </mesh>
        <mesh position={[0.18, -0.2, 0]} rotation={[0, -0.6, 0]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color="#8B5A3C" roughness={0.9} />
        </mesh>

        {/* Mustache - bushier dwarf style */}
        <mesh position={[-0.08, 0.08, 0.06]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#8B5A3C" roughness={0.9} />
        </mesh>
        <mesh position={[0.08, 0.08, 0.06]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#8B5A3C" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.06, 0.08]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#8B5A3C" roughness={0.9} />
        </mesh>

        {/* Beard texture details - multiple layers for dwarf-like appearance */}
        <mesh position={[-0.05, -0.12, 0.08]}>
          <sphereGeometry args={[0.02, 6, 6]} />
          <meshStandardMaterial color="#A0674A" roughness={0.95} />
        </mesh>
        <mesh position={[0.05, -0.12, 0.08]}>
          <sphereGeometry args={[0.02, 6, 6]} />
          <meshStandardMaterial color="#A0674A" roughness={0.95} />
        </mesh>
        <mesh position={[0, -0.18, 0.06]}>
          <sphereGeometry args={[0.018, 6, 6]} />
          <meshStandardMaterial color="#A0674A" roughness={0.95} />
        </mesh>
        <mesh position={[-0.08, -0.25, 0.04]}>
          <sphereGeometry args={[0.015, 6, 6]} />
          <meshStandardMaterial color="#A0674A" roughness={0.95} />
        </mesh>
        <mesh position={[0.08, -0.25, 0.04]}>
          <sphereGeometry args={[0.015, 6, 6]} />
          <meshStandardMaterial color="#A0674A" roughness={0.95} />
        </mesh>

        {/* Additional texture for fuller appearance */}
        <mesh position={[-0.03, -0.35, 0.02]}>
          <sphereGeometry args={[0.012, 6, 6]} />
          <meshStandardMaterial color="#9B6347" roughness={0.98} />
        </mesh>
        <mesh position={[0.03, -0.35, 0.02]}>
          <sphereGeometry args={[0.012, 6, 6]} />
          <meshStandardMaterial color="#9B6347" roughness={0.98} />
        </mesh>
      </group>

      {/* Bigger, friendlier smile - curved using multiple small spheres */}
      <mesh position={[-0.09, 0.05, 0.42]}>
        <sphereGeometry args={[0.018, 6, 6]} />
        <meshStandardMaterial color="#FF6B6B" />
      </mesh>
      <mesh position={[-0.045, 0.02, 0.42]}>
        <sphereGeometry args={[0.018, 6, 6]} />
        <meshStandardMaterial color="#FF6B6B" />
      </mesh>
      <mesh position={[0, 0.01, 0.42]}>
        <sphereGeometry args={[0.018, 6, 6]} />
        <meshStandardMaterial color="#FF6B6B" />
      </mesh>
      <mesh position={[0.045, 0.02, 0.42]}>
        <sphereGeometry args={[0.018, 6, 6]} />
        <meshStandardMaterial color="#FF6B6B" />
      </mesh>
      <mesh position={[0.09, 0.05, 0.42]}>
        <sphereGeometry args={[0.018, 6, 6]} />
        <meshStandardMaterial color="#FF6B6B" />
      </mesh>

      {/* Enhanced cheek blushes for friendliness */}
      <mesh position={[-0.25, 0.1, 0.35]} rotation={[0, 0.3, 0]}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshStandardMaterial color="#FFB6C1" opacity={0.8} transparent />
      </mesh>
      <mesh position={[0.25, 0.1, 0.35]} rotation={[0, -0.3, 0]}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshStandardMaterial color="#FFB6C1" opacity={0.8} transparent />
      </mesh>

      {/* DONATE text area - slightly raised white label */}
      <mesh position={[0, -0.05, 0.41]}>
        <boxGeometry args={[0.6, 0.15, 0.02]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>

      {/* Blue stripe at bottom of white section */}
      <mesh position={[0, -0.2, 0.41]}>
        <boxGeometry args={[0.6, 0.08, 0.01]} />
        <meshStandardMaterial color="#2563EB" />
      </mesh>

      {/* Handle/rope attachment point */}
      <mesh position={[0.5, -0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.06, 0.015, 8, 16]} />
        <meshStandardMaterial 
          color="#2563EB" 
          metalness={0.3} 
          roughness={0.4}
        />
      </mesh>

      {/* Rope/cord - simplified as a curved line */}
      <mesh position={[0.4, -0.25, 0]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.012, 0.012, 0.3, 8]} />
        <meshStandardMaterial color="#1E40AF" />
      </mesh>

      {/* Small knot at end of rope */}
      <mesh position={[0.55, -0.4, 0]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color="#1E40AF" />
      </mesh>

      {/* Multiple heart decorations on the side */}
      <mesh position={[0.35, 0.1, 0]} rotation={[0, -Math.PI / 4, 0]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#FF6B6B" />
      </mesh>
      <mesh position={[0.33, 0.12, 0]} rotation={[0, -Math.PI / 4, 0]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="#FF6B6B" />
      </mesh>
      <mesh position={[0.37, 0.12, 0]} rotation={[0, -Math.PI / 4, 0]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="#FF6B6B" />
      </mesh>

      {/* Additional small heart */}
      <mesh position={[0.32, 0.25, 0.1]} rotation={[0, -Math.PI / 6, 0]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="#FF69B4" />
      </mesh>
      <mesh position={[0.305, 0.265, 0.1]} rotation={[0, -Math.PI / 6, 0]}>
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshStandardMaterial color="#FF69B4" />
      </mesh>
      <mesh position={[0.335, 0.265, 0.1]} rotation={[0, -Math.PI / 6, 0]}>
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshStandardMaterial color="#FF69B4" />
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
    <div className={`${className} w-full h-full`}>
      <Canvas 
        camera={{ position: [1, 0.3, 2.2], fov: 75 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 3, 3]} intensity={1} />
        <pointLight position={[-3, 3, 3]} intensity={0.4} />
        <DonationTin isActive={isActive} />
      </Canvas>
    </div>
  );
};

export default HeavenlyBirdMascot;
