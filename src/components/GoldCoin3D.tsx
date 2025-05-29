
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface GoldCoin3DProps {
  size?: number;
  className?: string;
  children?: React.ReactNode;
}

const CoinMesh = () => {
  const meshRef = useRef<Mesh>(null);
  const edgeRef = useRef<Mesh>(null);
  const shineRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Slower, more weighty rotation
      meshRef.current.rotation.y += delta * 0.8;
      // Subtle floating motion
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      // Gentle tilt that follows the rotation
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
    
    if (edgeRef.current) {
      edgeRef.current.rotation.y += delta * 0.8;
    }
    
    if (shineRef.current) {
      // Shine pulses independently for premium effect
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.3 + 0.7;
      shineRef.current.material.opacity = pulse;
      shineRef.current.rotation.y += delta * 0.8;
    }
  });

  return (
    <group>
      {/* Main coin body */}
      <mesh ref={meshRef}>
        <cylinderGeometry args={[1, 1, 0.25, 64]} />
        <meshPhysicalMaterial
          color="#ffd700"
          metalness={0.9}
          roughness={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          reflectivity={1.0}
        />
      </mesh>

      {/* Coin edge with detailed ridging */}
      <mesh ref={edgeRef}>
        <torusGeometry args={[1, 0.15, 16, 64]} />
        <meshPhysicalMaterial
          color="#b8860b"
          metalness={0.8}
          roughness={0.2}
          clearcoat={0.8}
        />
      </mesh>

      {/* Inner decorative ring */}
      <mesh position={[0, 0.13, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 0.02, 64]} />
        <meshPhysicalMaterial
          color="#daa520"
          metalness={0.95}
          roughness={0.05}
          clearcoat={1.0}
        />
      </mesh>

      {/* Bottom inner ring */}
      <mesh position={[0, -0.13, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 0.02, 64]} />
        <meshPhysicalMaterial
          color="#daa520"
          metalness={0.95}
          roughness={0.05}
          clearcoat={1.0}
        />
      </mesh>

      {/* Premium shine effect */}
      <mesh ref={shineRef} position={[0, 0.14, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.01, 32]} />
        <meshPhysicalMaterial
          color="#fffacd"
          metalness={0.1}
          roughness={0.0}
          transparent
          opacity={0.8}
          clearcoat={1.0}
          emissive="#fffacd"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Center emboss effect */}
      <mesh position={[0, 0.14, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.02, 32]} />
        <meshPhysicalMaterial
          color="#ffed4e"
          metalness={0.9}
          roughness={0.1}
          clearcoat={1.0}
        />
      </mesh>
    </group>
  );
};

const GoldCoin3D: React.FC<GoldCoin3DProps> = ({ 
  size = 48, 
  className = "",
  children 
}) => {
  return (
    <div 
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        style={{ width: '100%', height: '100%' }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        {/* Enhanced lighting setup for premium look */}
        <ambientLight intensity={0.3} color="#fff4e6" />
        
        {/* Key light */}
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1.2} 
          color="#ffffff"
          castShadow
        />
        
        {/* Fill light */}
        <directionalLight 
          position={[-3, -3, 3]} 
          intensity={0.6} 
          color="#ffd700"
        />
        
        {/* Rim light for edge definition */}
        <pointLight 
          position={[0, 0, -5]} 
          intensity={0.8} 
          color="#ffed4e"
        />
        
        {/* Warm accent light */}
        <pointLight 
          position={[3, -2, 2]} 
          intensity={0.4} 
          color="#ffa500"
        />

        <CoinMesh />
      </Canvas>
      
      {children && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-amber-900 font-bold drop-shadow-lg" 
             style={{ fontSize: `${size * 0.25}px` }}>
          {children}
        </div>
      )}
    </div>
  );
};

export default GoldCoin3D;
