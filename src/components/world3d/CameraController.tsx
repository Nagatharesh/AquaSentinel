import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import type { SelectedEntity } from '../../types/worldModel';

interface CameraControllerProps {
  selectedEntity: SelectedEntity;
  viewPreset: 'overview' | 'industrial' | 'cetp' | 'river' | 'borewell' | null;
  resetTrigger: number;
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
}

export const CameraController: React.FC<CameraControllerProps> = ({
  selectedEntity,
  viewPreset,
  resetTrigger,
  controlsRef,
}) => {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 24, 30));
  const targetLook = useRef(new THREE.Vector3(0, 1, 2));
  const isTransitioning = useRef(false);
  const transitionTimer = useRef(0);

  // Trigger smooth transition only on state changes
  useEffect(() => {
    isTransitioning.current = true;
    transitionTimer.current = 0;

    if (selectedEntity) {
      if (selectedEntity.type === 'industry') {
        const [x, y, z] = selectedEntity.data.position3D;
        targetLook.current.set(x, y + 1.2, z);
        targetPos.current.set(x + 3.5, y + 5.5, z + 7.5);
      } else if (selectedEntity.type === 'cetp') {
        const [x, y, z] = selectedEntity.data.position3D;
        targetLook.current.set(x, y + 1, z);
        targetPos.current.set(x + 4.5, y + 7, z + 8.5);
      } else if (selectedEntity.type === 'monitoring') {
        const [x, y, z] = selectedEntity.data.position3D;
        targetLook.current.set(x, y + 0.5, z);
        targetPos.current.set(x - 3.5, y + 4.5, z + 6.5);
      } else if (selectedEntity.type === 'borewell') {
        const [x, y, z] = selectedEntity.data.position3D;
        targetLook.current.set(x, y + 0.5, z);
        targetPos.current.set(x + 3.5, y + 4.5, z + 5.5);
      }
      return;
    }

    if (viewPreset === 'industrial') {
      targetLook.current.set(-2, 1, -8);
      targetPos.current.set(-2, 14, 12);
    } else if (viewPreset === 'cetp') {
      targetLook.current.set(0, 1, 3);
      targetPos.current.set(0, 10, 14);
    } else if (viewPreset === 'river') {
      targetLook.current.set(2, 0.5, 14);
      targetPos.current.set(2, 12, 26);
    } else if (viewPreset === 'borewell') {
      targetLook.current.set(-11, 0.5, -2);
      targetPos.current.set(-8, 6, 4);
    } else {
      // Default Full Basin Overview
      targetLook.current.set(0, 1, 2);
      targetPos.current.set(0, 24, 30);
    }
  }, [selectedEntity, viewPreset, resetTrigger]);

  // Listen to user orbit controls start interaction to instantly release lerp control
  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    const handleStart = () => {
      isTransitioning.current = false;
    };

    controls.addEventListener('start', handleStart);
    return () => {
      controls.removeEventListener('start', handleStart);
    };
  }, [controlsRef]);

  useFrame((_, delta) => {
    if (!isTransitioning.current) return;

    transitionTimer.current += delta;
    const lerpSpeed = Math.min(1, delta * 4.0);

    camera.position.lerp(targetPos.current, lerpSpeed);

    if (controlsRef.current) {
      controlsRef.current.target.lerp(targetLook.current, lerpSpeed);
      controlsRef.current.update();
    }

    // Stop lerp once close to target or after 1.5s timeout
    if (
      camera.position.distanceTo(targetPos.current) < 0.08 ||
      transitionTimer.current > 1.5
    ) {
      isTransitioning.current = false;
    }
  });

  return null;
};
