
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh, MeshPhysicalMaterial } from 'three';

interface GoldCoin3DProps {
  size?: number;
  className?: string;
  children?: React.ReactNode;
}

const CoinMesh = () => {
  const meshRef = useRef<Mesh>(null);
  const cloudGroupRef = useRef<any>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Slower, more weighty rotation
      meshRef.current.rotation.y += delta * 0.8;
      // Subtle floating motion
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      // Gentle tilt that follows the rotation
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }

    if (cloudGroupRef.current) {
      // Cloud rotates opposite direction slower
      cloudGroupRef.current.rotation.y -= delta * 0.3;
      cloudGroupRef.current.rotation.z += delta * 0.1;
      
      // Soul-like glow effect - pulsing intensity
      const glowIntensity = Math.sin(state.clock.elapsedTime * 1.2) * 0.3 + 0.7;
      
      // Apply glow to all cloud meshes
      cloudGroupRef.current.children.forEach((child: any) => {
        if (child.material) {
          child.material.emissiveIntensity = glowIntensity * 0.4;
        }
      });
    }
  });

  return (
    <group>
      {/* Main coin body - Pure Gold Ring */}
      <mesh ref={meshRef}>
        <torusGeometry args={[1.4, 0.35, 16, 64]} />
        <meshPhysicalMaterial
          color="#FFD700"
          metalness={0.98}
          roughness={0.02}
          clearcoat={1.0}
          clearcoatRoughness={0.01}
          reflectivity={1.0}
          emissive="#FFD700"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Glowing Platinum Soul Cloud */}
      <group ref={cloudGroupRef} position={[0, 0, 0]}>
        {/* Main cloud body - center - glowing platinum soul */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.45, 16, 16]} />
          <meshPhysicalMaterial
            color="#F0F8FF"
            metalness={0.9}
            roughness={0.1}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
            reflectivity={1.0}
            emissive="#E5E4E2"
            emissiveIntensity={0.4}
            transmission={0.1}
            thickness={0.1}
          />
        </mesh>

        {/* Left cloud puff - solid with glow */}
        <mesh position={[-0.3, 0.08, 0]}>
          <sphereGeometry args={[0.28, 12, 12]} />
          <meshPhysicalMaterial
            color="#F0F8FF"
            metalness={0.9}
            roughness={0.1}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
            reflectivity={1.0}
            emissive="#E5E4E2"
            emissiveIntensity={0.4}
            transmission={0.1}
            thickness={0.1}
          />
        </mesh>

        {/* Right cloud puff - solid with glow */}
        <mesh position={[0.3, 0.08, 0]}>
          <sphereGeometry args={[0.28, 12, 12]} />
          <meshPhysicalMaterial
            color="#F0F8FF"
            metalness={0.9}
            roughness={0.1}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
            reflectivity={1.0}
            emissive="#E5E4E2"
            emissiveIntensity={0.4}
            transmission={0.1}
            thickness={0.1}
          />
        </mesh>

        {/* Top cloud puff - solid with glow */}
        <mesh position={[0, 0.35, 0]}>
          <sphereGeometry args={[0.22, 10, 10]} />
          <meshPhysicalMaterial
            color="#F0F8FF"
            metalness={0.9}
            roughness={0.1}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
            reflectivity={1.0}
            emissive="#E5E4E2"
            emissiveIntensity={0.4}
            transmission={0.1}
            thickness={0.1}
          />
        </mesh>

        {/* Bottom cloud base - solid with glow */}
        <mesh position={[0, -0.25, 0]}>
          <sphereGeometry args={[0.25, 10, 10]} />
          <meshPhysicalMaterial
            color="#F0F8FF"
            metalness={0.9}
            roughness={0.1}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
            reflectivity={1.0}
            emissive="#E5E4E2"
            emissiveIntensity={0.4}
            transmission={0.1}
            thickness={0.1}
          />
        </mesh>

        {/* Ethereal glow outer layer */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.65, 12, 12]} />
          <meshPhysicalMaterial
            color="#FFFFFF"
            metalness={0.1}
            roughness={0.8}
            clearcoat={0.3}
            clearcoatRoughness={0.8}
            reflectivity={0.2}
            emissive="#F0F8FF"
            emissiveIntensity={0.2}
            transmission={0.8}
            thickness={0.2}
            transparent={true}
            opacity={0.3}
          />
        </mesh>
      </group>
    </group>
  );
};

const GoldCoin3D: React.FC<GoldCoin3DProps> = ({ 
  size = 100,
  className = "",
  children 
}) => {
  const [renderFallback, setRenderFallback] = useState(false);

  // Error boundary for 3D canvas
  const handleCanvasError = () => {
    console.log('3D Canvas error, rendering fallback');
    setRenderFallback(true);
  };

  if (renderFallback) {
    // Enhanced fallback coin with glowing cloud design
    return (
      <div 
        className={`relative ${className}`}
        style={{ width: size, height: size }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 shadow-lg flex items-center justify-center border-2 border-yellow-300">
          <div className="w-3/5 h-3/5 rounded-full bg-gradient-to-br from-gray-200 via-white to-gray-100 flex items-center justify-center relative shadow-inner">
            {/* Glowing cloud symbol */}
            <div className="text-2xl animate-pulse">☁️</div>
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-white opacity-30 animate-pulse"></div>
          </div>
        </div>
        {children && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-amber-900 font-bold drop-shadow-lg" 
               style={{ fontSize: `${size * 0.25}px` }}>
            {children}
          </div>
        )}
      </div>
    );
  }

  return (
    <div 
      className={`relative ${className}`}
      style={{ 
        width: size, 
        height: size,
        // Add padding to prevent cutoff
        padding: '10px',
        boxSizing: 'content-box'
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        style={{ 
          width: '100%', 
          height: '100%',
          // Ensure canvas doesn't overflow
          overflow: 'visible'
        }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
        onError={handleCanvasError}
      >
        {/* Enhanced lighting setup for soul-like glow */}
        <ambientLight intensity={0.4} color="#F0F8FF" />
        
        {/* Key light - Soft ethereal */}
        <directionalLight 
          position={[3, 3, 3]} 
          intensity={1.5} 
          color="#FFFFFF"
          castShadow
        />
        
        {/* Soul glow light - centered on cloud */}
        <pointLight 
          position={[0, 0, 2]} 
          intensity={2.0} 
          color="#F0F8FF"
          distance={10}
          decay={2}
        />
        
        {/* Rim light for edge definition */}
        <pointLight 
          position={[0, 0, -3]} 
          intensity={1.0} 
          color="#FFFFFF"
        />
        
        {/* Golden accent light for coin */}
        <pointLight 
          position={[2, -2, 1]} 
          intensity={1.2} 
          color="#FFD700"
        />

        {/* Additional ethereal lights */}
        <pointLight 
          position={[-2, 2, 1]} 
          intensity={0.8} 
          color="#E6E6FA"
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
