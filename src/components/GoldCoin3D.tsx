
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
      
      // Subtle shine effect - no scaling, just slight metallic shimmer
      const shineIntensity = Math.sin(state.clock.elapsedTime * 0.8) * 0.2 + 0.8;
      
      // Apply shine to all cloud meshes
      cloudGroupRef.current.children.forEach((child: any) => {
        if (child.material) {
          child.material.emissiveIntensity = shineIntensity * 0.1;
        }
      });
    }
  });

  return (
    <group>
      {/* Main coin body - Pure Gold Ring */}
      <mesh ref={meshRef}>
        <torusGeometry args={[1.6, 0.4, 16, 64]} />
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

      {/* Solid Platinum Cloud - Simple and Metallic */}
      <group ref={cloudGroupRef} position={[0, 0, 0]}>
        {/* Main cloud body - center - solid platinum */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshPhysicalMaterial
            color="#E5E4E2"
            metalness={1.0}
            roughness={0.1}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
            reflectivity={1.0}
            emissive="#E5E4E2"
            emissiveIntensity={0.1}
          />
        </mesh>

        {/* Left cloud puff - solid */}
        <mesh position={[-0.35, 0.1, 0]}>
          <sphereGeometry args={[0.32, 12, 12]} />
          <meshPhysicalMaterial
            color="#E5E4E2"
            metalness={1.0}
            roughness={0.1}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
            reflectivity={1.0}
            emissive="#E5E4E2"
            emissiveIntensity={0.1}
          />
        </mesh>

        {/* Right cloud puff - solid */}
        <mesh position={[0.35, 0.1, 0]}>
          <sphereGeometry args={[0.32, 12, 12]} />
          <meshPhysicalMaterial
            color="#E5E4E2"
            metalness={1.0}
            roughness={0.1}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
            reflectivity={1.0}
            emissive="#E5E4E2"
            emissiveIntensity={0.1}
          />
        </mesh>

        {/* Top cloud puff - solid */}
        <mesh position={[0, 0.4, 0]}>
          <sphereGeometry args={[0.25, 10, 10]} />
          <meshPhysicalMaterial
            color="#E5E4E2"
            metalness={1.0}
            roughness={0.1}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
            reflectivity={1.0}
            emissive="#E5E4E2"
            emissiveIntensity={0.1}
          />
        </mesh>

        {/* Bottom cloud base - solid */}
        <mesh position={[0, -0.3, 0]}>
          <sphereGeometry args={[0.28, 10, 10]} />
          <meshPhysicalMaterial
            color="#E5E4E2"
            metalness={1.0}
            roughness={0.1}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
            reflectivity={1.0}
            emissive="#E5E4E2"
            emissiveIntensity={0.1}
          />
        </mesh>
      </group>
    </group>
  );
};

const GoldCoin3D: React.FC<GoldCoin3DProps> = ({ 
  size = 80, // Increased size to prevent cutoff
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
    // Enhanced fallback coin with solid cloud design
    return (
      <div 
        className={`relative ${className}`}
        style={{ width: size, height: size }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 shadow-lg flex items-center justify-center border-2 border-yellow-300">
          <div className="w-3/5 h-3/5 rounded-full bg-gradient-to-br from-gray-300 via-gray-200 to-gray-100 flex items-center justify-center relative">
            {/* Solid cloud symbol */}
            <div className="text-2xl">☁️</div>
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
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ width: '100%', height: '100%' }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
        onError={handleCanvasError}
      >
        {/* Enhanced lighting setup for premium metallic look */}
        <ambientLight intensity={0.6} color="#FFF8DC" />
        
        {/* Key light - Warmer for gold */}
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={2.0} 
          color="#FFFACD"
          castShadow
        />
        
        {/* Fill light - Golden */}
        <directionalLight 
          position={[-3, -3, 3]} 
          intensity={1.2} 
          color="#FFD700"
        />
        
        {/* Rim light for edge definition */}
        <pointLight 
          position={[0, 0, -5]} 
          intensity={1.5} 
          color="#FFF8DC"
        />
        
        {/* Platinum accent light for cloud */}
        <pointLight 
          position={[3, -2, 2]} 
          intensity={1.0} 
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
