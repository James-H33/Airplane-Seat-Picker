import { ScrollControls } from '@react-three/drei';
import './Experience.css';
import Plane from "./Plane/Plane";

const Experience = (props: any) => {
  return (
    <>
      <ScrollControls pages={2} distance={0.5}>
        <Plane {...props} />
      </ScrollControls>

      <ambientLight intensity={0.5} />

      <spotLight position={[10, 10, 5]} angle={0.15} penumbra={1} intensity={1} castShadow />
    </>
  )
}

export default Experience;
