import { Text, useGLTF, useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"

const Row = ({ model,  position = [0, 0, 0], row, setActiveSeat }: any) => {
  const seats = [-1.4, -0.8, 0.3, 0.9];
  const color = '#523b47';
  const seatLetters = ['A', 'B', 'C', 'D']

  const onHover = (m: any, seatIndex: number) => {
    m.stopPropagation();
    m.eventObject.material.color.set('#6b371d')
    const letter = seatLetters[seatIndex];
    setActiveSeat({
      seat: `${row}${letter}`,
      style: seatIndex === 0 || seatIndex === 4 ? 'Window' : 'Aisle',
      price: '$100'
    });
  }

  const onHoverOut = (m: any) => {
    m.stopPropagation();
    m.eventObject.material.color.set(color)
  }


  return (
    <>
      <group position={position}>
        <Text>

        </Text>
        {
          seats.map((zPos, index) => {
            return (
              <mesh
                key={index}
                castShadow
                receiveShadow
                geometry={model.geometry}
                material={model.material}
                position={[0.8, -1, zPos]}
                rotation={[0, Math.PI, 0]}
                scale={[1, 1, 1]}
                onPointerEnter={(m) => onHover(m, index)}
                onPointerLeave={(m) => onHoverOut(m)}
              >
                <meshStandardMaterial
                  color={color}
                />
              </mesh>
            )
          })
        }
      </group>
    </>
  )
}

const Cabin = ({ level, position, model, ...props }: any) => {
  const rowsCount = 10;

  let rows = [];

  const setActiveSeat = (rowInfo: any) => {
    props.setActiveSeat({
      level,
      ...rowInfo,
    });
  }

  for (let i = 0; i < rowsCount; i++) {
    rows.push(
      <Row
        setActiveSeat={setActiveSeat}
        row={`${i + 1}`}
        model={model.nodes.Backing}
        position={[-(i), 0, 0]}
      />
    );
  }

  return (
    <group position={position}>
      {rows}
    </group>
  )
}

const Plane = (props: any) => {
  const [cabin]: any = useGLTF(['/cabin.glb'])
  const [seat]: any = useGLTF(['/seat.glb'])
  const ref: any = useRef()
  const scroll = useScroll()
  useFrame(() => (ref.current.position.x = scroll.offset * 120))

  return (
    <>
    <group ref={ref} position={[0, 0, 0]}>
      <Text fontSize={2.5} color="coral" position={[-3, 0.5, -4]} rotation={[-0.1, 0, 0]}>
        First Class
      </Text>

      <mesh
        castShadow
        receiveShadow
        geometry={cabin.nodes.Cylinder.geometry}
        material={cabin.scene.material}
        position={[-4, -2, 0]}
        rotation={[0, 0, 0]}
        scale={[1, 1, 1]}
      >
        <meshStandardMaterial
          color="#252525"
        />
      </mesh>

      <Cabin
        {...props}
        position={[0, 0, 0]}
        level="First Class"
        model={seat}
      />


      <Text fontSize={2.5} color="coral" position={[-21, 0.5, -4]} rotation={[-0.1, 0, 0]}>
        Business Class
      </Text>

      <mesh
        castShadow
        receiveShadow
        geometry={cabin.nodes.Cylinder.geometry}
        material={cabin.scene.material}
        position={[-20, -2, 0]}
        rotation={[0, 0, 0]}
        scale={[1, 1, 1]}
      >
        <meshStandardMaterial
          color="#252525"
        />
      </mesh>

      <Cabin
        {...props}
        position={[-16, 0, 0]}
        level="Business Class"
        model={seat}
      />
    </group>
    </>
  )
}

export default Plane
