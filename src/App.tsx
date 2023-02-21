import './App.css'
import { Canvas } from '@react-three/fiber'
import Experience from './components/Experience'
import { Environment, MeshReflectorMaterial } from '@react-three/drei'
import { useState } from 'react'
import SeatInfoCard from './components/SeatInfoCard/SeatInfoCard'

function App(): JSX.Element {
  const [activeSeat, setActiveSeat] = useState<any>(null)

  return (
    <>
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [11, 11, 10], fov: 35 }}
        gl={{ alpha: false }}
      >
        <fog attach="fog" args={['#17171b', 20, 28]} />
        <color attach="background" args={['#17171b']} />

        <Experience setActiveSeat={setActiveSeat} />

        <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <MeshReflectorMaterial
            blur={[400, 100]}
            resolution={1024}
            mixBlur={1}
            mixStrength={15}
            depthScale={1}
            minDepthThreshold={0.85}
            color="#151515"
            metalness={0.6}
            roughness={1}
          />
        </mesh>


        <Environment preset="dawn" />
      </Canvas>

      { activeSeat && <SeatInfoCard {...activeSeat} /> }
    </>
  )
}

export default App
