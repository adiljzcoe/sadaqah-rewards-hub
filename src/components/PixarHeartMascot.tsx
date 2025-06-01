
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PixarHeartProps {
  isActive: boolean;
}

function PixarHeart({ isActive }: PixarHeartProps) {
  const heartRef = useRef<THREE.Group>(null);
  const eyesRef = useRef<THREE.Group>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const legsRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const eyebrowsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (heartRef.current) {
      const time = state.clock.elapsedTime;
      
      if (!isActive) {
        // Gentle floating animation with blessed glow pulse
        heartRef.current.position.y = Math.sin(time * 1.2) * 0.08;
        heartRef.current.rotation.y = Math.sin(time * 0.4) * 0.06;
        
        // Gentle leg movement
        if (legsRef.current) {
          legsRef.current.rotation.z = Math.sin(time * 1.8) * 0.03;
        }
      } else {
        // Excited bouncing with joy - Pixar style
        heartRef.current.position.y = Math.abs(Math.sin(time * 5)) * 0.2;
        heartRef.current.position.x = Math.sin(time * 7) * 0.1;
        heartRef.current.rotation.z = Math.sin(time * 6) * 0.12;
        
        // More animated legs during excitement
        if (legsRef.current) {
          legsRef.current.rotation.z = Math.sin(time * 10) * 0.2;
          legsRef.current.children.forEach((leg, index) => {
            if (leg instanceof THREE.Mesh) {
              leg.rotation.x = Math.sin(time * 12 + index * Math.PI) * 0.4;
            }
          });
        }
      }
      
      // Halo rotation - always spinning gently
      if (haloRef.current) {
        haloRef.current.rotation.z = time * 0.6;
        haloRef.current.position.y = 1.2 + Math.sin(time * 2.5) * 0.06;
      }
      
      // Pixar-style blinking animation
      if (eyesRef.current && time % 3.5 < 0.2) {
        eyesRef.current.scale.y = 0.1;
      } else if (eyesRef.current) {
        eyesRef.current.scale.y = 1;
      }
      
      // Eyebrow expressions
      if (eyebrowsRef.current) {
        if (isActive) {
          eyebrowsRef.current.position.y = 0.4 + Math.sin(time * 8) * 0.02;
          eyebrowsRef.current.rotation.z = Math.sin(time * 6) * 0.05;
        } else {
          eyebrowsRef.current.position.y = 0.4 + Math.sin(time * 2) * 0.01;
        }
      }
      
      // Gentle glow pulsing
      if (glowRef.current) {
        const glowIntensity = 0.8 + Math.sin(time * 2.2) * 0.2;
        glowRef.current.scale.setScalar(glowIntensity);
        const material = glowRef.current.material as THREE.MeshBasicMaterial;
        if (material) {
          material.opacity = 0.25 + Math.sin(time * 2.2) * 0.1;
        }
      }
    }
  });

  // Create heart shape using curves - more rounded Pixar style
  const heartShape = new THREE.Shape();
  heartShape.moveTo(0, 0);
  heartShape.bezierCurveTo(0, -0.4, -0.8, -0.4, -0.8, 0.1);
  heartShape.bezierCurveTo(-0.8, 0.6, -0.3, 0.9, 0, 1.4);
  heartShape.bezierCurveTo(0.3, 0.9, 0.8, 0.6, 0.8, 0.1);
  heartShape.bezierCurveTo(0.8, -0.4, 0, -0.4, 0, 0);

  return (
    <group ref={heartRef} position={[0, 0, 0]}>
      {/* Magical glow aura */}
      <mesh ref={glowRef} position={[0, 0, -0.1]}>
        <sphereGeometry args={[1.5, 20, 20]} />
        <meshBasicMaterial 
          color="#FFD700" 
          transparent 
          opacity={0.2}
        />
      </mesh>

      {/* Main heart body - Pixar style with rounded edges */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI]} castShadow receiveShadow>
        <extrudeGeometry 
          args={[heartShape, { 
            depth: 0.4, 
            bevelEnabled: true, 
            bevelThickness: 0.08, 
            bevelSize: 0.06, 
            bevelSegments: 12 
          }]} 
        />
        <meshStandardMaterial 
          color="#FF69B4" 
          metalness={0.1} 
          roughness={0.2}
          emissive="#FF1493"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Heart inner highlight for depth */}
      <mesh position={[0, 0, 0.1]} rotation={[0, 0, Math.PI]}>
        <extrudeGeometry 
          args={[heartShape, { depth: 0.25, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.03 }]} 
        />
        <meshBasicMaterial 
          color="#FFB6C1" 
          transparent 
          opacity={0.7}
        />
      </mesh>

      {/* Big Pixar-style eyes with personality */}
      <group ref={eyesRef} position={[0, 0.3, 0.25]}>
        {/* Left eye - larger and more expressive */}
        <mesh position={[-0.3, 0, 0]} castShadow>
          <sphereGeometry args={[0.18, 20, 20]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.1} metalness={0.05} />
        </mesh>
        {/* Left pupil - larger for Pixar look */}
        <mesh position={[-0.3, 0.03, 0.16]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        {/* Left eye primary highlight */}
        <mesh position={[-0.27, 0.08, 0.22]}>
          <sphereGeometry args={[0.04, 12, 12]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.3} />
        </mesh>
        {/* Left eye secondary highlight */}
        <mesh position={[-0.32, 0.06, 0.2]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.5} />
        </mesh>

        {/* Right eye */}
        <mesh position={[0.3, 0, 0]} castShadow>
          <sphereGeometry args={[0.18, 20, 20]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.1} metalness={0.05} />
        </mesh>
        {/* Right pupil */}
        <mesh position={[0.3, 0.03, 0.16]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        {/* Right eye primary highlight */}
        <mesh position={[0.33, 0.08, 0.22]}>
          <sphereGeometry args={[0.04, 12, 12]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.3} />
        </mesh>
        {/* Right eye secondary highlight */}
        <mesh position={[0.28, 0.06, 0.2]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.5} />
        </mesh>
      </group>

      {/* Pixar-style expressive eyebrows */}
      <group ref={eyebrowsRef} position={[0, 0.4, 0]}>
        <mesh position={[-0.3, 0, 0.25]} rotation={[0, 0, -0.15]}>
          <capsuleGeometry args={[0.03, 0.15, 4, 8]} />
          <meshStandardMaterial color="#8B4513" roughness={0.8} />
        </mesh>
        <mesh position={[0.3, 0, 0.25]} rotation={[0, 0, 0.15]}>
          <capsuleGeometry args={[0.03, 0.15, 4, 8]} />
          <meshStandardMaterial color="#8B4513" roughness={0.8} />
        </mesh>
      </group>

      {/* Sweet Pixar smile - more curved and expressive */}
      <mesh position={[0, -0.05, 0.22]} rotation={[0.1, 0, 0]}>
        <torusGeometry args={[0.2, 0.03, 8, 20, Math.PI]} />
        <meshStandardMaterial color="#FF1493" roughness={0.3} />
      </mesh>

      {/* Cute little cheek blushes */}
      <mesh position={[-0.4, 0.1, 0.15]} rotation={[0, 0.4, 0]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color="#FFB6C1" transparent opacity={0.6} />
      </mesh>
      <mesh position={[0.4, 0.1, 0.15]} rotation={[0, -0.4, 0]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color="#FFB6C1" transparent opacity={0.6} />
      </mesh>

      {/* Adorable stubby legs - Pixar character style */}
      <group ref={legsRef} position={[0, -1.0, 0]}>
        {/* Left leg */}
        <mesh position={[-0.25, 0, 0]} castShadow>
          <capsuleGeometry args={[0.08, 0.5, 4, 12]} />
          <meshStandardMaterial 
            color="#FFB6C1" 
            roughness={0.4} 
            metalness={0.1}
          />
        </mesh>
        {/* Left foot */}
        <mesh position={[-0.25, -0.35, 0.12]} castShadow>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial 
            color="#FF69B4" 
            roughness={0.4} 
            metalness={0.1}
          />
        </mesh>

        {/* Right leg */}
        <mesh position={[0.25, 0, 0]} castShadow>
          <capsuleGeometry args={[0.08, 0.5, 4, 12]} />
          <meshStandardMaterial 
            color="#FFB6C1" 
            roughness={0.4} 
            metalness={0.1}
          />
        </mesh>
        {/* Right foot */}
        <mesh position={[0.25, -0.35, 0.12]} castShadow>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial 
            color="#FF69B4" 
            roughness={0.4} 
            metalness={0.1}
          />
        </mesh>
      </group>

      {/* Blessed golden halo - more detailed */}
      <mesh ref={haloRef} position={[0, 1.2, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.5, 0.04, 12, 32]} />
        <meshStandardMaterial 
          color="#FFD700" 
          metalness={0.9} 
          roughness={0.1}
          emissive="#FFA500"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Halo inner glow */}
      <mesh position={[0, 1.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.45, 0.02, 8, 24]} />
        <meshStandardMaterial 
          color="#FFFFFF" 
          transparent 
          opacity={0.9}
          emissive="#FFFFFF"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Magical sparkles floating around - using MeshStandardMaterial for emissive */}
      <mesh position={[0.6, 0.4, 0.3]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[-0.5, 0.2, 0.4]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="#FFA500" emissive="#FFA500" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.4, -0.3, 0.35]}>
        <sphereGeometry args={[0.022, 8, 8]} />
        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[-0.4, 0.5, 0.3]}>
        <sphereGeometry args={[0.018, 8, 8]} />
        <meshStandardMaterial color="#FFA500" emissive="#FFA500" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.2, 0.7, 0.2]}>
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.5} />
      </mesh>

      {/* Additional heart decorations on the sides */}
      <mesh position={[0.7, 0.2, 0]} rotation={[0, -Math.PI / 3, 0]}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshStandardMaterial color="#FF69B4" emissive="#FF1493" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0.65, 0.25, 0]} rotation={[0, -Math.PI / 3, 0]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color="#FF69B4" emissive="#FF1493" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0.75, 0.25, 0]} rotation={[0, -Math.PI / 3, 0]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color="#FF69B4" emissive="#FF1493" emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
}

interface PixarHeartMascotProps {
  isActive: boolean;
  className?: string;
}

const PixarHeartMascot: React.FC<PixarHeartMascotProps> = ({ isActive, className }) => {
  return (
    <div className={`${className} w-full h-full`}>
      <Canvas 
        camera={{ position: [2, 0.5, 3], fov: 70 }}
        style={{ width: '100%', height: '100%' }}
        shadows
      >
        <ambientLight intensity={0.6} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1.5} 
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-5, 5, 5]} intensity={0.8} color="#FFD700" />
        <pointLight position={[0, -2, 3]} intensity={0.6} color="#FF69B4" />
        <spotLight 
          position={[0, 8, 0]} 
          angle={0.3} 
          penumbra={1} 
          intensity={0.5} 
          color="#FFFFFF"
          castShadow
        />
        <PixarHeart isActive={isActive} />
      </Canvas>
    </div>
  );
};

export default PixarHeartMascot;
