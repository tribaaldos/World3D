import { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { KeyboardControls, OrbitControls, useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import PlayerController from '../components/PlayerController'
import Plane from './Plane'
import { Perf } from 'r3f-perf'
import Lights from './Lights'
  
export const Controls = {
  forward: 'forward',
  back: 'back',
  left: 'left',
  right: 'right',
  run: 'run',
  jump: 'jump'
}

const Experience = ({ perfVisible, planeScale, }) => {
  const map = useMemo(
    () => [
      { name: Controls.forward, keys: ['KeyW', 'ArrowUp'] },
      { name: Controls.back, keys: ['KeyS', 'ArrowDown'] },
      { name: Controls.left, keys: ['KeyA', 'ArrowLeft'] },
      { name: Controls.right, keys: ['KeyD', 'ArrowRight'] },
      { name: Controls.run, keys: ['ShiftLeft'] },
      { name: Controls.jump, keys: ['Space'] }
    ],
    []
  )

  return (
    <>

      <KeyboardControls map={map}>
        <Canvas shadows camera={{ position: [0, 6, 8], fov: 75 }}>
          {/* <primitive position={[0, -1, 0]} object={plane.scene} />; */}
          {/* <OrbitControls /> */}
          {/* <CameraControlss /> */}
          <Suspense fallback={null}>
            <Physics debug={true}>
              {perfVisible ? <Perf position="top-left" /> : null}
              <Perf />
              <Lights />
              {/* <Keqing /> */}
              <RigidBody type="fixed" colliders="trimesh">

                <Plane args={planeScale} />
              </RigidBody>
              {/* <GrassTile /> */}
              <PlayerController />
              <RigidBody position={[2, 2, 0]}>

                <mesh>
                  <boxGeometry args={[1, 1, 1]} />
                  <meshStandardMaterial color="green" />
                </mesh>
              </RigidBody>
            </Physics>
          </Suspense>
        </Canvas>
      </KeyboardControls>
    </>
  )
}

export default Experience
