import { useState } from 'react';
import './SeatInfoCard.css'

const SeatInfoCard = ({ level, seat, style, price }: any) => {
  const [expanded, setExpanded] = useState(false)

  const expand = () => {
    setExpanded(s => !s);
  }

  const wrapperClass = expanded ? 'seat-info expanded' : 'seat-info';

  return (
    <div className={wrapperClass}>
      <span className="seat-info-expand-toggle" onClick={expand}>&#62;</span>

      <div className="seat-info-content">
        <div className="seat-info-summary">
          <h2>{level}</h2>

          <div className="seat-info-item">
            <h3>Seat:</h3>
            <p>{seat}</p>
          </div>

          <div className="seat-info-item">
            <h3>Style:</h3>
            <p> <a>{style}</a></p>
          </div>

          <div className="seat-info-item">
            <h3>Price:</h3>
            <p>{price}</p>
          </div>

          <span className="seat-info-back"></span>

          <button>Select This Seat</button>
        </div>

        <div className="seat-info-details">
          <h2>Details</h2>
          <ul>
            <li>Comfy Seats</li>
            <li>More Leg Room</li>
            <li>Free Food and Drink Service</li>
          </ul>
        </div>
      </div>
    </div>
  )
}


export default SeatInfoCard
