import { useRef } from 'react';
import { useFrame } from '@react-three/fiber'
import React from 'react';
import { Environment, Sky, useHelper } from '@react-three/drei';
import { DirectionalLightHelper,  } from 'three';
import * as THREE from 'three'
const Lights: React.FC = () => {


    return (
        <>
            <Environment preset="sunset" />
            <Sky sunPosition={[100, 10, 100]} />
        </>
    );
}

export default Lights

