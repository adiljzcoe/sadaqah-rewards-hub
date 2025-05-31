
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';
import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js
env.allowLocalModels = false;
env.useBrowserCache = false;

const MAX_IMAGE_DIMENSION = 512;

function resizeImageIfNeeded(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, image: HTMLImageElement) {
  let width = image.naturalWidth;
  let height = image.naturalHeight;

  if (width > MAX_IMAGE_DIMENSION || height > MAX_IMAGE_DIMENSION) {
    if (width > height) {
      height = Math.round((height * MAX_IMAGE_DIMENSION) / width);
      width = MAX_IMAGE_DIMENSION;
    } else {
      width = Math.round((width * MAX_IMAGE_DIMENSION) / height);
      height = MAX_IMAGE_DIMENSION;
    }

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0, width, height);
    return true;
  }

  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(image, 0, 0);
  return false;
}

const removeBackground = async (imageElement: HTMLImageElement): Promise<string> => {
  try {
    console.log('Starting background removal process...');
    const segmenter = await pipeline('image-segmentation', 'Xenova/segformer-b0-finetuned-ade-512-512', {
      device: 'webgpu',
    });
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) throw new Error('Could not get canvas context');
    
    resizeImageIfNeeded(canvas, ctx, imageElement);
    const imageData = canvas.toDataURL('image/jpeg', 0.8);
    
    console.log('Processing with segmentation model...');
    const result = await segmenter(imageData);
    
    if (!result || !Array.isArray(result) || result.length === 0 || !result[0].mask) {
      throw new Error('Invalid segmentation result');
    }
    
    const outputCanvas = document.createElement('canvas');
    outputCanvas.width = canvas.width;
    outputCanvas.height = canvas.height;
    const outputCtx = outputCanvas.getContext('2d');
    
    if (!outputCtx) throw new Error('Could not get output canvas context');
    
    outputCtx.drawImage(canvas, 0, 0);
    
    const outputImageData = outputCtx.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
    const data = outputImageData.data;
    
    for (let i = 0; i < result[0].mask.data.length; i++) {
      const alpha = Math.round((1 - result[0].mask.data[i]) * 255);
      data[i * 4 + 3] = alpha;
    }
    
    outputCtx.putImageData(outputImageData, 0, 0);
    
    return outputCanvas.toDataURL('image/png', 1.0);
  } catch (error) {
    console.error('Error removing background:', error);
    throw error;
  }
};

interface Character3DProps {
  textureUrl: string;
  isActive: boolean;
}

function Character3D({ textureUrl, isActive }: Character3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(TextureLoader, textureUrl);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      if (!isActive) {
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
        meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      } else {
        // Shaking animation when active
        meshRef.current.position.x = Math.sin(state.clock.elapsedTime * 20) * 0.05;
        meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 25) * 0.1;
      }
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[2, 2]} />
      <meshStandardMaterial 
        map={texture} 
        transparent 
        alphaTest={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

interface CharityCharacter3DProps {
  isActive: boolean;
  className?: string;
}

const CharityCharacter3D: React.FC<CharityCharacter3DProps> = ({ isActive, className }) => {
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const processImage = async () => {
      setIsProcessing(true);
      try {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = async () => {
          try {
            const processedUrl = await removeBackground(img);
            setProcessedImageUrl(processedUrl);
          } catch (error) {
            console.error('Failed to process image:', error);
            // Fallback to original image
            setProcessedImageUrl('/lovable-uploads/1a8b9a72-1fd0-4905-8f8f-cd7b8b5e9096.png');
          } finally {
            setIsProcessing(false);
          }
        };
        img.onerror = () => {
          console.error('Failed to load image');
          setProcessedImageUrl('/lovable-uploads/1a8b9a72-1fd0-4905-8f8f-cd7b8b5e9096.png');
          setIsProcessing(false);
        };
        img.src = '/lovable-uploads/1a8b9a72-1fd0-4905-8f8f-cd7b8b5e9096.png';
      } catch (error) {
        console.error('Error in processImage:', error);
        setProcessedImageUrl('/lovable-uploads/1a8b9a72-1fd0-4905-8f8f-cd7b8b5e9096.png');
        setIsProcessing(false);
      }
    };

    processImage();
  }, []);

  if (isProcessing) {
    return (
      <div className={className}>
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-100 to-blue-100 rounded-lg">
          <div className="text-xs text-emerald-600 animate-pulse">Processing...</div>
        </div>
      </div>
    );
  }

  if (!processedImageUrl) {
    return (
      <div className={className}>
        <img 
          src="/lovable-uploads/1a8b9a72-1fd0-4905-8f8f-cd7b8b5e9096.png" 
          alt="Charity Collection Character"
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />
        <Character3D textureUrl={processedImageUrl} isActive={isActive} />
      </Canvas>
    </div>
  );
};

export default CharityCharacter3D;
