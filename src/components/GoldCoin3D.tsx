
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

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 2;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <cylinderGeometry args={[1, 1, 0.2, 32]} />
      <meshPhongMaterial
        color="#ffd700"
        shininess={100}
        specular="#ffffff"
      />
      {/* Coin edge */}
      <mesh>
        <torusGeometry args={[1, 0.1, 8, 32]} />
        <meshPhongMaterial
          color="#b8860b"
          shininess={80}
        />
      </mesh>
      {/* Inner shine */}
      <mesh position={[0, 0.11, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 0.01, 32]} />
        <meshPhongMaterial
          color="#ffed4e"
          shininess={150}
          transparent
          opacity={0.8}
        />
      </mesh>
    </mesh>
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
        camera={{ position: [0, 0, 3], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffa500" />
        <CoinMesh />
      </Canvas>
      {children && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-amber-900 font-bold text-xs">
          {children}
        </div>
      )}
    </div>
  );
};

export default GoldCoin3D;
