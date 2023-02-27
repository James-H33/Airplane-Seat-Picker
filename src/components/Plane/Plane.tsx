import { Text, useGLTF, useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import CabinSeats from './CabinSeats/CabinSeats'
import * as THREE from 'three'
import { assets } from "../../utils/assets"

const Plane = (props: any) => {
  const [cabin]: any = useGLTF([assets.cabin])
  const [seat]: any = useGLTF([assets.seat])
  const [front]: any = useGLTF([assets.front])
  const [back]: any = useGLTF([assets.back])
  const [firstClass]: any = useGLTF([assets.firstClass])
  const [wings]: any = useGLTF([assets.wings])
  const ref: any = useRef()
  const scroll = useScroll()
  const planePositionOffsetMultiplier = 30;
  useFrame(() => (ref.current.position.x = scroll.offset * planePositionOffsetMultiplier))

  const planeMaterial = new THREE.MeshStandardMaterial({
    color: '#333',
    metalness: 0.5,
    roughness: 0.5,
    transparent: true,
    opacity: 0.5
  })

  const textSize = 2;
  const textColor = '#ddd';
  const textY = 0.6;

  return (
    <>
      <group ref={ref} position={[0, 0, 0]}>

        <mesh
          castShadow
          receiveShadow
          geometry={front.nodes.Cylinder003.geometry}
          material={planeMaterial}
          position={[6, -2, -0.2]}
          rotation={[0, Math.PI, 0]}
          scale={[1, 1, 1]}
        >
        </mesh>

        <mesh
          castShadow
          receiveShadow
          geometry={wings.nodes.Wings.geometry}
          material={planeMaterial}
          position={[-14, 0, -1.7]}
          rotation={[0, Math.PI, 0]}
          scale={[1, 1, 1]}
        >
        </mesh>

        {/* First Class */}
        <group position={[-2, 0, 0]}>
          <Text
            fontSize={textSize}
            color={textColor}
            position={[1.5, textY, -4]}
            rotation={[-0.1, 0, 0]}>
            First Class
          </Text>

          <mesh
            castShadow
            receiveShadow
            geometry={firstClass.nodes.First_Class.geometry}
            material={planeMaterial}
            position={[-0.5, -2, 0]}
            rotation={[0, 0, 0]}
            scale={[1, 1, 1]}
          >
          </mesh>

          <CabinSeats
            {...props}
            seatCount={5}
            position={[2, 0, 0.2]}
            level="First Class"
            price="1000"
            model={seat}
          />
        </group>

        {/* Business */}
        <group position={[-11.5, 0, 0]}>
          <Text
            fontSize={textSize}
            color={textColor}
            position={[-0.2, textY, -4]}
            rotation={[-0.1, 0, 0]}>
            Business
          </Text>

          <mesh
            castShadow
            receiveShadow
            geometry={cabin.nodes.Cylinder.geometry}
            material={planeMaterial}
            position={[0, -2, 0]}
            rotation={[0, 0, 0]}
            scale={[1, 1, 1]}
          >
          </mesh>

          <CabinSeats
            {...props}
            seatStart={6}
            position={[4, 0, 0.2]}
            level="Business"
            price="500"
            model={seat}
          />
        </group>


        {/* Economy */}
        <group position={[-24, 0, 0]}>
        <Text
            fontSize={textSize}
            color={textColor}
            position={[-0.2, textY, -4]}
            rotation={[-0.1, 0, 0]}>
            Economy
          </Text>

          <mesh
            castShadow
            receiveShadow
            geometry={cabin.nodes.Cylinder.geometry}
            material={planeMaterial}
            position={[0, -2, 0]}
            rotation={[0, 0, 0]}
            scale={[1, 1, 1]}
          >
          </mesh>

          <CabinSeats
            {...props}
            seatStart={17}
            position={[4, 0, 0.2]}
            level="Economy"
            price="200"
            model={seat}
          />
        </group>

        {/* Back of Plane */}
        <mesh
          castShadow
          receiveShadow
          geometry={back.nodes.Back.geometry}
          material={planeMaterial}
          position={[-34, 0.4, -0.5]}
          rotation={[0, Math.PI, 0]}
          scale={[1, 1, 1]}
        >
        </mesh>
      </group>
    </>
  )
}

export default Plane
