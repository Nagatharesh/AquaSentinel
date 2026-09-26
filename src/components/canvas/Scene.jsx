import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Lighting } from './Lighting';
import { ModelViewer } from './ModelViewer';

/**
 * Main 3D Canvas Scene Viewport Component
 * Keep line count < 100 lines by delegating lighting and mesh handling
 */
export function Scene() {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '400px' }}>
      <Canvas camera={{ position: [0, 2, 5], fov: 60 }}>
        <Lighting />
        <ModelViewer />
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  );
}
