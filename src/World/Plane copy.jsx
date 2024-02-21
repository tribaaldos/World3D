// import React from 'react';
// import { useGLTF } from '@react-three/drei';
// import * as THREE from 'three';
// import { Physics, RigidBody } from '@react-three/rapier';
// import { useRef } from 'react';

// const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
// const floor1Material = new THREE.MeshStandardMaterial({ color: 'red' })

// const Plane = () => {

//     const plane = useGLTF('/static/models/grass.glb');

//     return (
//         <>

//                 <RigidBody position={[0, -5, 0]} type="fixed" colliders="box">
//                     <primitive object={grass.scene} />;
//                     {/* <mesh geometry={boxGeometry} material={floor1Material} position={[0, - 0.1, 0]} scale={[10, 0.2, 10]} receiveShadow /> */}
//                 </RigidBody>

//         </>
//     )
// };

// export default Plane;
