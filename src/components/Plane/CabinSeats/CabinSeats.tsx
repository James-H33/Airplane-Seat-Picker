import Row from "../Row/Row";

const CabinSeats = ({ level, seatStart = 1, seatCount = 10, price, position, model }: any) => {
  const rowsCount = seatCount;
  let rows = [];

  for (let i = 0; i < rowsCount; i++) {
    rows.push(
      <Row
        key={level + i}
        level={level}
        row={`${i + seatStart}`}
        model={model.nodes.Backing}
        price={price}
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

export default CabinSeats
