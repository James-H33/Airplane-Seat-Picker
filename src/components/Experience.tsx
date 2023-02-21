import { OrbitControls, ScrollControls } from '@react-three/drei';
import './Experience.css'
import Plane from "./Plane/Plane"

const Experience = (props: any) => {
  return (
    <>
      {/* <OrbitControls makeDefault /> */}

      <ScrollControls pages={3}>
        <Plane {...props} />
      </ScrollControls>

      <ambientLight intensity={0.5} />

      <spotLight position={[10, 10, 5]} angle={0.15} penumbra={1} intensity={1} castShadow />

      {/* <directionalLight
        castShadow
        position={[2, 20, -1]}
        intensity={1}
        shadow-mapSize-height={1024}
        shadow-mapSize-width={1024}
        shadow-camera-far={20}
      /> */}
    </>
  )
}

export default Experience;
