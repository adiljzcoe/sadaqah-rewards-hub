
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
  const edgeRef = useRef<Mesh>(null);
  const shineRef = useRef<Mesh<any, MeshPhysicalMaterial>>(null);
  const cloudRef = useRef<Mesh<any, MeshPhysicalMaterial>>(null);

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
    
    if (shineRef.current && shineRef.current.material) {
      // Shine pulses independently for premium effect
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.3 + 0.7;
      (shineRef.current.material as MeshPhysicalMaterial).opacity = pulse;
      shineRef.current.rotation.y += delta * 0.8;
    }

    if (cloudRef.current && cloudRef.current.material) {
      // Cloud rotates opposite direction and shines platinum
      cloudRef.current.rotation.y -= delta * 0.6;
      cloudRef.current.rotation.z += delta * 0.2;
      const platinumPulse = Math.sin(state.clock.elapsedTime * 3) * 0.4 + 0.8;
      (cloudRef.current.material as MeshPhysicalMaterial).emissiveIntensity = platinumPulse * 0.5;
    }
  });

  return (
    <group>
      {/* Main coin body - Pure Gold */}
      <mesh ref={meshRef}>
        <cylinderGeometry args={[1, 1, 0.25, 64]} />
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

      {/* Coin edge with detailed ridging - Rich Gold */}
      <mesh ref={edgeRef}>
        <torusGeometry args={[1, 0.15, 16, 64]} />
        <meshPhysicalMaterial
          color="#B8860B"
          metalness={0.95}
          roughness={0.05}
          clearcoat={0.9}
          emissive="#B8860B"
          emissiveIntensity={0.05}
        />
      </mesh>

      {/* Inner decorative ring - Bright Gold */}
      <mesh position={[0, 0.13, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 0.02, 64]} />
        <meshPhysicalMaterial
          color="#FFDF00"
          metalness={0.99}
          roughness={0.01}
          clearcoat={1.0}
          emissive="#FFDF00"
          emissiveIntensity={0.08}
        />
      </mesh>

      {/* Bottom inner ring - Bright Gold */}
      <mesh position={[0, -0.13, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 0.02, 64]} />
        <meshPhysicalMaterial
          color="#FFDF00"
          metalness={0.99}
          roughness={0.01}
          clearcoat={1.0}
          emissive="#FFDF00"
          emissiveIntensity={0.08}
        />
      </mesh>

      {/* Premium shine effect - Golden glow */}
      <mesh ref={shineRef} position={[0, 0.14, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.01, 32]} />
        <meshPhysicalMaterial
          color="#FFFACD"
          metalness={0.1}
          roughness={0.0}
          transparent
          opacity={0.8}
          clearcoat={1.0}
          emissive="#FFFACD"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Cloud shape in center - Main body (Platinum) */}
      <mesh ref={cloudRef} position={[0, 0.15, 0]}>
        <sphereGeometry args={[0.18, 16, 16]} />
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

      {/* Cloud puffs - Left side */}
      <mesh position={[-0.15, 0.15, 0]}>
        <sphereGeometry args={[0.1, 12, 12]} />
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

      {/* Cloud puffs - Right side */}
      <mesh position={[0.15, 0.15, 0]}>
        <sphereGeometry args={[0.1, 12, 12]} />
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

      {/* Cloud puffs - Top */}
      <mesh position={[0, 0.25, 0]}>
        <sphereGeometry args={[0.08, 10, 10]} />
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

      {/* Cloud puffs - Bottom */}
      <mesh position={[0, 0.05, 0]}>
        <sphereGeometry args={[0.08, 10, 10]} />
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

      {/* Additional cloud wisps for more cloud-like appearance */}
      <mesh position={[-0.08, 0.22, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshPhysicalMaterial
          color="#E5E4E2"
          metalness={0.8}
          roughness={0.2}
          clearcoat={0.7}
          emissive="#E5E4E2"
          emissiveIntensity={0.15}
          transparent
          opacity={0.6}
        />
      </mesh>

      <mesh position={[0.08, 0.22, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshPhysicalMaterial
          color="#E5E4E2"
          metalness={0.8}
          roughness={0.2}
          clearcoat={0.7}
          emissive="#E5E4E2"
          emissiveIntensity={0.15}
          transparent
          opacity={0.6}
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
    // Simple fallback coin
    return (
      <div 
        className={`relative ${className}`}
        style={{ width: size, height: size }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 shadow-lg flex items-center justify-center border-2 border-yellow-300">
          <div className="w-3/4 h-3/4 rounded-full bg-gradient-to-br from-gray-300 via-gray-200 to-gray-100 flex items-center justify-center">
            <div className="text-xs">☁</div>
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
        key={`canvas-${canvasKey}-${Date.now()}`} // Force unique key for re-render
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

        {/* Additional light for cloud shimmer */}
        <pointLight 
          position={[0, 3, 1]} 
          intensity={0.6} 
          color="#FFFFFF"
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
