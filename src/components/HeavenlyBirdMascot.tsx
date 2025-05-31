
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
      
      // More personality: excited bouncing when active, gentle sway when not
      if (isActive) {
        // Excited bouncing animation
        const bounceIntensity = 0.08;
        tinRef.current.position.y = Math.abs(Math.sin(time * 4)) * bounceIntensity;
        
        // Wiggle side to side with excitement
        tinRef.current.position.x = Math.sin(time * 6) * 0.04;
        
        // More pronounced rotation when excited
        tinRef.current.rotation.z = Math.sin(time * 5) * 0.05;
      } else {
        // Gentle swaying when idle
        const swayIntensity = 0.03;
        tinRef.current.position.y = Math.sin(time * 2) * swayIntensity;
        
        // Very subtle side movement
        tinRef.current.position.x = Math.sin(time * 1.8) * (swayIntensity * 0.5);
        
        // Gentle tilt
        tinRef.current.rotation.z = Math.sin(time * 1.5) * 0.015;
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

      {/* Eyes - giving it character */}
      <mesh position={[-0.12, 0.15, 0.41]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.12, 0.15, 0.41]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Eye highlights for more life */}
      <mesh position={[-0.11, 0.17, 0.42]}>
        <sphereGeometry args={[0.015, 6, 6]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0.13, 0.17, 0.42]}>
        <sphereGeometry args={[0.015, 6, 6]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>

      {/* Smile - curved using multiple small spheres */}
      <mesh position={[-0.06, 0.05, 0.42]}>
        <sphereGeometry args={[0.012, 6, 6]} />
        <meshStandardMaterial color="#FF6B6B" />
      </mesh>
      <mesh position={[0, 0.03, 0.42]}>
        <sphereGeometry args={[0.012, 6, 6]} />
        <meshStandardMaterial color="#FF6B6B" />
      </mesh>
      <mesh position={[0.06, 0.05, 0.42]}>
        <sphereGeometry args={[0.012, 6, 6]} />
        <meshStandardMaterial color="#FF6B6B" />
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

      {/* Small heart decoration on the side */}
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
        camera={{ position: [1, 0.3, 1.2], fov: 60 }}
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
