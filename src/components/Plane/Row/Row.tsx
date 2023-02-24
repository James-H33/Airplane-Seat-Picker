import { Text } from "@react-three/drei";
import { useState } from "react";
import { useExperience } from "../../../context/ExperienceContext";

const Row = ({ model, level, price, position = [0, 0, 0], row }: any) => {
  const [state, setState] = useExperience();
  const seats = [-1.4, -0.8, 0.3, 0.9];
  const color = '#523b47';
  const seatLetters = ['A', 'B', 'C', 'D']
  const [hoveredInfo, setHoveredInfo]: any = useState({
    seat: '',
    isHovered: false,
    position: [0, 0, 0]
  });

  const getSeatLetter = (index: number) => {
    const letter = seatLetters[index];
    return`${row}${letter}`;
  }

  const onHover = (m: any, seatIndex: number) => {
    m.stopPropagation();

    if (!state.activeSeat || state.activeSeat.seat !== getSeatLetter(seatIndex)) {
      m.eventObject.material.color.set('#6b371d')
    }

    const zPos = m.eventObject.position.z;

    setHoveredInfo({
      seat: getSeatLetter(seatIndex),
      isHovered: true,
      position: [0.8, 0.5, zPos + 0.1]
    })
  }

  const onHoverOut = (m: any, index: number) => {
    m.stopPropagation();

    if (!state.activeSeat || state.activeSeat?.seat !== getSeatLetter(index)) {
      m.eventObject.material.color.set(color)
    }

    setHoveredInfo({
      isHovered: false
    })
  }

  const onSeatClick =  (m: any, seatIndex: number) => {
    m.stopPropagation();

    const activeSeat = {
      level,
      seat: getSeatLetter(seatIndex),
      style: seatIndex === 0 || seatIndex === 4 ? 'Window' : 'Aisle',
      price: "$" + price
    }

    setState((s: any) => ({ ...s, activeSeat }));
  }

  return (
    <>
      <group position={position}>
        <Text
          visible={hoveredInfo.isHovered}
          color="#fff"
          position={hoveredInfo.position}
          fontSize={0.3}
          rotation={[0, Math.PI * 0.25, 0]}>
          {hoveredInfo.seat}
        </Text>

        {
          seats.map((zPos, index) => {
            return (
              <>
                <mesh
                  key={level + '-row-' + index}
                  castShadow
                  receiveShadow
                  geometry={model.geometry}
                  material={model.material}
                  position={[0.8, -1, zPos]}
                  rotation={[0, Math.PI, 0]}
                  scale={[1, 1, 1]}
                  onClick={(m) => onSeatClick(m, index)}
                  onPointerEnter={(m) => onHover(m, index)}
                  onPointerLeave={(m) => onHoverOut(m, index)}
                >
                  <meshStandardMaterial
                    color={state.activeSeat && state.activeSeat.seat === getSeatLetter(index) ? 'brown' : color}
                  />
                </mesh>
              </>
            )
          })
        }
      </group>
    </>
  )
}

export default Row
