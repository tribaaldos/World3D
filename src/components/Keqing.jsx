import React, { useEffect, useRef, useState } from 'react';
import { useAnimations, useGLTF } from '@react-three/drei';
import { AnimationAction, Group, Mesh } from 'three';

const Player = ({ action }) => {
  const { scene, animations } = useGLTF('/models/keqing.glb');

  const [currentAction, /*setCurrentAction*/] = useState('idle');

  // manually add shadows to all meshes in the model
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  const playerRef = useRef(null);
  const { actions, mixer } = useAnimations(animations, playerRef);

  useEffect(() => {
    actions['idle'].play();
  }, [actions]);

  useEffect(() => {
    actions[action]?.reset().fadeIn(0.5).play();

    return () => {
      // Cleanup function to stop the mixer on unmount
      actions[action].fadeOut(0.5);
    };
  }, [action, actions]);

  return (
    <group castShadow ref={playerRef}>
      <primitive castShadow object={scene} />
    </group>
  );
};

export default Player;
