
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BlessedHeartProps {
  isActive: boolean;
}

function BlessedHeart({ isActive }: BlessedHeartProps) {
  const heartRef = useRef<THREE.Group>(null);
  const eyesRef = useRef<THREE.Group>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const legsRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (heartRef.current) {
      const time = state.clock.elapsedTime;
      
      if (!isActive) {
        // Gentle floating animation with blessed glow pulse
        heartRef.current.position.y = Math.sin(time * 1.5) * 0.1;
        heartRef.current.rotation.y = Math.sin(time * 0.3) * 0.1;
        
        // Gentle leg movement
        if (legsRef.current) {
          legsRef.current.rotation.z = Math.sin(time * 2) * 0.05;
        }
      } else {
        // Excited bouncing with joy
        heartRef.current.position.y = Math.abs(Math.sin(time * 4)) * 0.15;
        heartRef.current.position.x = Math.sin(time * 6) * 0.08;
        heartRef.current.rotation.z = Math.sin(time * 5) * 0.1;
        
        // Animated legs during excitement
        if (legsRef.current) {
          legsRef.current.rotation.z = Math.sin(time * 8) * 0.15;
          legsRef.current.children.forEach((leg, index) => {
            if (leg instanceof THREE.Mesh) {
              leg.rotation.x = Math.sin(time * 10 + index * Math.PI) * 0.3;
            }
          });
        }
      }
      
      // Halo rotation - always spinning gently
      if (haloRef.current) {
        haloRef.current.rotation.z = time * 0.5;
        haloRef.current.position.y = 0.8 + Math.sin(time * 2) * 0.05;
      }
      
      // Blinking animation for big eyes
      if (eyesRef.current && time % 3 < 0.15) {
        eyesRef.current.scale.y = 0.1;
      } else if (eyesRef.current) {
        eyesRef.current.scale.y = 1;
      }
      
      // Gentle glow pulsing
      if (glowRef.current) {
        const glowIntensity = 0.7 + Math.sin(time * 2) * 0.3;
        glowRef.current.scale.setScalar(glowIntensity);
        const material = glowRef.current.material as THREE.MeshBasicMaterial;
        if (material) {
          material.opacity = 0.3 + Math.sin(time * 2) * 0.1;
        }
      }
    }
  });

  // Heart shape geometry
  const heartShape = new THREE.Shape();
  heartShape.moveTo(0, 0);
  heartShape.bezierCurveTo(0, -0.3, -0.6, -0.3, -0.6, 0);
  heartShape.bezierCurveTo(-0.6, 0.3, 0, 0.6, 0, 1);
  heartShape.bezierCurveTo(0, 0.6, 0.6, 0.3, 0.6, 0);
  heartShape.bezierCurveTo(0.6, -0.3, 0, -0.3, 0, 0);

  return (
    <group ref={heartRef} position={[0, 0, 0]}>
      {/* Gentle glow aura behind everything */}
      <mesh ref={glowRef} position={[0, 0, -0.1]}>
        <sphereGeometry args={[1.2, 16, 16]} />
        <meshBasicMaterial 
          color="#FFD700" 
          transparent 
          opacity={0.2}
        />
      </mesh>

      {/* Main heart body - 3D extruded heart */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI]}>
        <extrudeGeometry 
          args={[heartShape, { 
            depth: 0.3, 
            bevelEnabled: true, 
            bevelThickness: 0.05, 
            bevelSize: 0.02, 
            bevelSegments: 8 
          }]} 
        />
        <meshStandardMaterial 
          color="#FF69B4" 
          metalness={0.2} 
          roughness={0.3}
          emissive="#FF1493"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Heart inner glow */}
      <mesh position={[0, 0, 0.05]} rotation={[0, 0, Math.PI]}>
        <extrudeGeometry 
          args={[heartShape, { depth: 0.2 }]} 
        />
        <meshBasicMaterial 
          color="#FFB6C1" 
          transparent 
          opacity={0.6}
        />
      </mesh>

      {/* Big adorable eyes */}
      <group ref={eyesRef} position={[0, 0.2, 0.2]}>
        {/* Left eye */}
        <mesh position={[-0.25, 0, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
        {/* Left pupil */}
        <mesh position={[-0.25, 0.02, 0.11]}>
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        {/* Left eye shine */}
        <mesh position={[-0.23, 0.05, 0.15]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>

        {/* Right eye */}
        <mesh position={[0.25, 0, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
        {/* Right pupil */}
        <mesh position={[0.25, 0.02, 0.11]}>
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        {/* Right eye shine */}
        <mesh position={[0.27, 0.05, 0.15]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
      </group>

      {/* Sweet smile */}
      <mesh position={[0, -0.1, 0.18]}>
        <torusGeometry args={[0.15, 0.02, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#FF1493" />
      </mesh>

      {/* Small cute legs */}
      <group ref={legsRef} position={[0, -0.8, 0]}>
        {/* Left leg */}
        <mesh position={[-0.2, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.08, 0.4, 12]} />
          <meshStandardMaterial 
            color="#FFB6C1" 
            metalness={0.1} 
            roughness={0.6}
          />
        </mesh>
        {/* Left foot */}
        <mesh position={[-0.2, -0.25, 0.08]}>
          <sphereGeometry args={[0.1, 12, 12]} />
          <meshStandardMaterial 
            color="#FF69B4" 
            metalness={0.1} 
            roughness={0.6}
          />
        </mesh>

        {/* Right leg */}
        <mesh position={[0.2, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.08, 0.4, 12]} />
          <meshStandardMaterial 
            color="#FFB6C1" 
            metalness={0.1} 
            roughness={0.6}
          />
        </mesh>
        {/* Right foot */}
        <mesh position={[0.2, -0.25, 0.08]}>
          <sphereGeometry args={[0.1, 12, 12]} />
          <meshStandardMaterial 
            color="#FF69B4" 
            metalness={0.1} 
            roughness={0.6}
          />
        </mesh>
      </group>

      {/* Blessed halo */}
      <mesh ref={haloRef} position={[0, 0.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.4, 0.03, 8, 24]} />
        <meshStandardMaterial 
          color="#FFD700" 
          metalness={0.8} 
          roughness={0.1}
          emissive="#FFA500"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Halo inner light */}
      <mesh position={[0, 0.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.35, 0.01, 6, 16]} />
        <meshBasicMaterial 
          color="#FFFFFF" 
          transparent 
          opacity={0.8}
        />
      </mesh>

      {/* Sparkles around the heart */}
      <mesh position={[0.5, 0.3, 0.2]}>
        <sphereGeometry args={[0.02, 6, 6]} />
        <meshBasicMaterial color="#FFD700" />
      </mesh>
      <mesh position={[-0.4, 0.1, 0.3]}>
        <sphereGeometry args={[0.015, 6, 6]} />
        <meshBasicMaterial color="#FFA500" />
      </mesh>
      <mesh position={[0.3, -0.2, 0.25]}>
        <sphereGeometry args={[0.018, 6, 6]} />
        <meshBasicMaterial color="#FFD700" />
      </mesh>
      <mesh position={[-0.3, 0.4, 0.2]}>
        <sphereGeometry args={[0.012, 6, 6]} />
        <meshBasicMaterial color="#FFA500" />
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
      <Canvas camera={{ position: [1.5, 0.5, 2.5], fov: 60 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <pointLight position={[-5, 5, 5]} intensity={0.6} color="#FFD700" />
        <pointLight position={[0, -2, 2]} intensity={0.4} color="#FF69B4" />
        <BlessedHeart isActive={isActive} />
      </Canvas>
    </div>
  );
};

export default Custom3DCharacter;
