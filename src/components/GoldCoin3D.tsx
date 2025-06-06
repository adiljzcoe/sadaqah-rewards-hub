
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
      
      // Make cloud puffs gently pulse
      const pulseFactor = Math.sin(state.clock.elapsedTime * 2) * 0.05 + 1;
      cloudGroupRef.current.scale.setScalar(pulseFactor);
    }
  });

  return (
    <group>
      {/* Main coin body - Pure Gold Ring - Made bigger */}
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

      {/* Cloud Group - More realistic cloud shape */}
      <group ref={cloudGroupRef} position={[0, 0, 0]}>
        {/* Main cloud body - center */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshPhysicalMaterial
            color="#E5E4E2"
            metalness={0.95}
            roughness={0.05}
            clearcoat={1.0}
            emissive="#E5E4E2"
            emissiveIntensity={0.4}
            transparent
            opacity={0.95}
          />
        </mesh>

        {/* Left cloud puff - larger */}
        <mesh position={[-0.35, 0.1, 0]}>
          <sphereGeometry args={[0.28, 12, 12]} />
          <meshPhysicalMaterial
            color="#E5E4E2"
            metalness={0.9}
            roughness={0.1}
            clearcoat={0.9}
            emissive="#E5E4E2"
            emissiveIntensity={0.25}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Right cloud puff - larger */}
        <mesh position={[0.35, 0.1, 0]}>
          <sphereGeometry args={[0.28, 12, 12]} />
          <meshPhysicalMaterial
            color="#E5E4E2"
            metalness={0.9}
            roughness={0.1}
            clearcoat={0.9}
            emissive="#E5E4E2"
            emissiveIntensity={0.25}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Top cloud puffs - multiple smaller ones for fluffiness */}
        <mesh position={[-0.15, 0.35, 0]}>
          <sphereGeometry args={[0.18, 10, 10]} />
          <meshPhysicalMaterial
            color="#E5E4E2"
            metalness={0.85}
            roughness={0.15}
            clearcoat={0.8}
            emissive="#E5E4E2"
            emissiveIntensity={0.2}
            transparent
            opacity={0.75}
          />
        </mesh>

        <mesh position={[0.15, 0.35, 0]}>
          <sphereGeometry args={[0.18, 10, 10]} />
          <meshPhysicalMaterial
            color="#E5E4E2"
            metalness={0.85}
            roughness={0.15}
            clearcoat={0.8}
            emissive="#E5E4E2"
            emissiveIntensity={0.2}
            transparent
            opacity={0.75}
          />
        </mesh>

        {/* Additional small puffs for more cloud-like appearance */}
        <mesh position={[-0.25, 0.25, 0.1]}>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshPhysicalMaterial
            color="#E5E4E2"
            metalness={0.8}
            roughness={0.2}
            clearcoat={0.7}
            emissive="#E5E4E2"
            emissiveIntensity={0.15}
            transparent
            opacity={0.65}
          />
        </mesh>

        <mesh position={[0.25, 0.25, -0.1]}>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshPhysicalMaterial
            color="#E5E4E2"
            metalness={0.8}
            roughness={0.2}
            clearcoat={0.7}
            emissive="#E5E4E2"
            emissiveIntensity={0.15}
            transparent
            opacity={0.65}
          />
        </mesh>

        {/* Bottom cloud base */}
        <mesh position={[0, -0.25, 0]}>
          <sphereGeometry args={[0.22, 10, 10]} />
          <meshPhysicalMaterial
            color="#E5E4E2"
            metalness={0.85}
            roughness={0.15}
            clearcoat={0.8}
            emissive="#E5E4E2"
            emissiveIntensity={0.2}
            transparent
            opacity={0.75}
          />
        </mesh>
      </group>
    </group>
  );
};

const GoldCoin3D: React.FC<GoldCoin3DProps> = ({ 
  size = 60, // Increased default size from 48 to 60
  className = "",
  children 
}) => {
  const [renderFallback, setRenderFallback] = useState(false);
  const [canvasKey, setCanvasKey] = useState(0);

  // Force re-render every few seconds to ensure updates are visible
  useEffect(() => {
    const interval = setInterval(() => {
      setCanvasKey(prev => prev + 1);
    }, 10000); // Re-render every 10 seconds

    return () => clearInterval(interval);
  }, []);

  // Error boundary for 3D canvas
  const handleCanvasError = () => {
    console.log('3D Canvas error, rendering fallback');
    setRenderFallback(true);
  };

  if (renderFallback) {
    // Enhanced fallback coin with better cloud design
    return (
      <div 
        className={`relative ${className}`}
        style={{ width: size, height: size }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 shadow-lg flex items-center justify-center border-2 border-yellow-300">
          <div className="w-3/5 h-3/5 rounded-full bg-gradient-to-br from-gray-300 via-gray-200 to-gray-100 flex items-center justify-center relative overflow-hidden">
            {/* Cloud-like pattern */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full opacity-80"></div>
              <div className="w-3 h-3 bg-white rounded-full opacity-60 -ml-1 mt-1"></div>
              <div className="w-3 h-3 bg-white rounded-full opacity-60 -ml-1 -mt-1"></div>
            </div>
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
      style={{ width: size, height: size }}
    >
      <Canvas
        key={`canvas-${canvasKey}-${Date.now()}`}
        camera={{ position: [0, 0, 4], fov: 45 }}
        style={{ width: '100%', height: '100%' }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
        onError={handleCanvasError}
      >
        {/* Enhanced lighting setup for premium gold look */}
        <ambientLight intensity={0.5} color="#FFF8DC" />
        
        {/* Key light - Warmer for gold */}
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1.8} 
          color="#FFFACD"
          castShadow
        />
        
        {/* Fill light - Golden */}
        <directionalLight 
          position={[-3, -3, 3]} 
          intensity={1.0} 
          color="#FFD700"
        />
        
        {/* Rim light for edge definition */}
        <pointLight 
          position={[0, 0, -5]} 
          intensity={1.2} 
          color="#FFF8DC"
        />
        
        {/* Platinum accent light for cloud */}
        <pointLight 
          position={[3, -2, 2]} 
          intensity={0.8} 
          color="#E5E4E2"
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
