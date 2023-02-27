import { Environment, MeshReflectorMaterial } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import './App.css'
import Checkout from './components/Checkout/Checkout'
import Experience from './components/Experience'
import SeatInfoCard from './components/SeatInfoCard/SeatInfoCard'
import { useExperience } from './context/ExperienceContext'

function App(): JSX.Element {
  const [state, _] = useExperience();

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

        <Experience />

        <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <MeshReflectorMaterial
            blur={[400, 100]}
            mirror={1}
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

        {
          <div
            className={ state.activeSeat && !state.selectedSeat ? "animated-div active" : 'animated-div' }
          >
            <SeatInfoCard {...state.activeSeat} />
          </div>
        }

        {
          <div
            className={ state.selectedSeat ? "animated-div active" : 'animated-div' }
          >
            <Checkout />
          </div>
        }

    </>
  )
}

export default App
