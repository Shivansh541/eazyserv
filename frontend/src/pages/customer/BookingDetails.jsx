import React from 'react'
import { useParams } from 'react-router-dom'
import './css/BookingDetails.css'

const BookingDetails = () => {
  const bookingId = useParams();
  return (
    <section className='bookingDetails'>
      <div className="serviceDetails bookingCard">
        <div className="bookingLeft">
          <div className="serviceIcon">🛠️</div>
          <div className="serviceType">
            <h3>Electrician</h3>
            <p className="booking-id">Booking ID: {bookingId.bookingid}</p>
          </div>
        </div>
        <div className="bookingMiddle">
          <p>📅 01 Jan 2026 • 11:00 AM</p>
          <p>📍 Indira Nagar, Lucknow</p>
        </div>
        <div className="bookingRight">
          <span className={`statusBadge in progress`}>
            In Progress
          </span>
        </div>
      </div>
      <div className="workerDetails">
        <div className="leftDetails">
          <img src="/static/images/gray-picture-person-with-gray-background.png" alt="" />
          <div className="workerInfo">
            <h5 className='workerName'>Rohit Sharma</h5>
            <p>Electrician - 5 years experience</p>
            <p className='rating'>⭐ 4.8 <span>(124 reviews)</span></p>
            <p>📍 Gomti Nagar, Lucknow</p>
          </div>
        </div>
        <div className="priceBreakdown pricing">
          <h2>Price Breakdown</h2>
          <div className="list pricingList">
            <p>Payment Mode: <span>Cash</span></p>
            <p>
              Visit Charge: <span>₹99</span>
            </p>
            <div className="pricingNote">
              <p>✔ Pay only the visit charge at booking.</p>
              <p>✔ Final service price will be decided after inspection.</p>
              <p>✔ Visit charge will be adjusted in the final bill.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="actionsBar">
        <button className="secondaryBtn">Cancel Booking</button>
        <button className="primaryBtn">Reschedule</button>
        <button className="secondaryBtn">Help & Support</button>
      </div>
    </section>
  )
}

export default BookingDetails
