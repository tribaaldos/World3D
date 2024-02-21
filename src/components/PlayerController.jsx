import React, { useState, useRef } from 'react';
import { CapsuleCollider, RapierRigidBody, RigidBody } from '@react-three/rapier';
import { useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Controls } from '../World/World';
import * as THREE from 'three';
import Keqing from './Keqing';

const JUMP_FORCE = 1;
const MOVE_SPEED = 0.4;
const MAX_VEL = 1;

const PlayerController = () => {
  const forward = useKeyboardControls((state) => state[Controls.forward]);
  const back = useKeyboardControls((state) => state[Controls.back]);
  const left = useKeyboardControls((state) => state[Controls.left]);
  const right = useKeyboardControls((state) => state[Controls.right]);
  const shift = useKeyboardControls((state) => state[Controls.run]);
  const jump = useKeyboardControls((state) => state[Controls.jump]);

  const [action, setAction] = useState('idle');

  const rigidBody = useRef(null);
  const [isOnFloor, setIsOnFloor] = useState(true);

  const handlePlayerInput = () => {
    if (forward || back || left || right) {
      setAction(shift ? 'running' : 'walking');
    } else if (jump) {
      setAction(action === 'running' ? 'jumping' : 'jumping');
    } else {
      setAction('idle');
    }
  };

  const playerRef = useRef(null);

  useFrame((state) => {
    const impulse = { x: 0, y: 0, z: 0 };
    if (jump && isOnFloor) {
      impulse.y += JUMP_FORCE;
      setIsOnFloor(false);
    }

    handlePlayerInput();

    const linvel = rigidBody.current.linvel();
    let changeRotation = false;

    if (right && linvel.x < MAX_VEL) {
      impulse.x += MOVE_SPEED;
      changeRotation = true;
    }
    if (left && linvel.x > -MAX_VEL) {
      impulse.x -= MOVE_SPEED;
      changeRotation = true;
    }
    if (forward && linvel.z > -MAX_VEL) {
      impulse.z -= MOVE_SPEED;
      changeRotation = true;
    }
    if (back && linvel.z < MAX_VEL) {
      impulse.z += MOVE_SPEED;
      changeRotation = true;
    }

    rigidBody.current.applyImpulse(impulse, true);
    if (changeRotation) {
      const angle = Math.atan2(linvel.x, linvel.z);
      playerRef.current.rotation.y = angle;
    }

    const followConfig = {
      distanceFromPlayer: 3,
      verticalOffset: 1.5,
      followSpeed: 0.1
    };

    const playerWorldPosition = playerRef.current.getWorldPosition(new THREE.Vector3());

    const targetPosition = new THREE.Vector3();
    targetPosition.x = playerWorldPosition.x;
    targetPosition.z = playerWorldPosition.z + followConfig.distanceFromPlayer;
    targetPosition.y = playerWorldPosition.y + followConfig.verticalOffset;

    state.camera.position.lerp(targetPosition, followConfig.followSpeed);
    state.camera.lookAt(playerWorldPosition);
  });

  return (
    <group>
      <RigidBody
        ref={rigidBody}
        colliders={false}
        scale={[0.75, 0.75, 0.75]}
        enabledRotations={[false, false, false]}
        onCollisionEnter={() => {
          setIsOnFloor(true);
        }}
      >
        <CapsuleCollider args={[0.7, 0.4]} position={[0, 1.1, 0]} />
        <group ref={playerRef}>
          <Keqing action={action} />
        </group>
      </RigidBody>
    </group>
  );
};

export default PlayerController;
