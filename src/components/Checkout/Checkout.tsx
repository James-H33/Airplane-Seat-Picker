import { useEffect, useState } from 'react';
import { useExperience } from '../../context/ExperienceContext';
import './Checkout.css';

const CheckoutInfoSnippet = ({ label, text }: any) => {
  return (
      <div className="checkout-info-snippet">
        <p>{label}</p>
        <h5>{text}</h5>
      </div>
  );
}

const Checkout = () => {
  const [state, setState] = useExperience();
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isComplete) {
      setTimeout(() => {
        (window.location as any).reload();
      }, 2500)
    }
  }, [isComplete])

  return (
    <div className="checkout-container">
      <div className="checkout-wrapper">
        <span className="checkout-background"></span>

        {
          isComplete ? (
            <div className="checkout-complete">
              <h1>It's just a Demo!</h1>
              <p>Reloading...</p>
            </div>
          ) :

          (
            <div className="checkout">
              <h1>Your Flight</h1>

              <div className="checkout-destination">
                <div className="checkout-destination-group">
                  <h3>BCN</h3>
                  <span>9:55</span>
                </div>

                <div>to</div>

                <div className="checkout-destination-group">
                  <h3>ZRH</h3>
                  <span>16:30</span>
                </div>
              </div>

              <div className="checkout-snippet-group">
                <CheckoutInfoSnippet label={'Flying'} text={'EZY136'} />
                <CheckoutInfoSnippet label={'Date'} text={'April 6, 2023'} />
              </div>

              <div className="checkout-snippet-group">
                <CheckoutInfoSnippet label={'Terminal'} text={'T6'} />
                <CheckoutInfoSnippet label={'Gate'} text={'B2'} />
                <CheckoutInfoSnippet label={'Boarding'} text={'9:00'} />
              </div>

              <div className="checkout-snippet-group">
                <CheckoutInfoSnippet label={'Passenger'} text={'John Doe'} />
                <CheckoutInfoSnippet label={'Seat'} text={state?.activeSeat?.level} />
              </div>

              <div className="checkout-actions">
                <h3>Total: <span>{state?.activeSeat?.price}</span></h3>
                <button onClick={() => setIsComplete(true)}>Confirm</button>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Checkout
