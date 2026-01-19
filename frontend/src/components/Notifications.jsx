import React from 'react'
import { Link } from 'react-router-dom'
import './css/Notifications.css'
const notifications = [
  {
    "id": 1,
    "icon": "booking_confirmed",
    "name": "Booking Confirmed",
    "description": "Your service booking has been successfully confirmed. The worker will visit as scheduled.",
    "link": "/bookings/ESV10234"
  },
  {
    "id": 2,
    "icon": "worker_assigned",
    "name": "Worker Assigned",
    "description": "A service professional has been assigned to your booking. You can view their profile now.",
    "link": "/bookings/ESV10234/worker"
  },
  {
    "id": 3,
    "icon": "worker_on_way",
    "name": "Worker On The Way",
    "description": "Your service professional is on the way and will reach your location shortly.",
    "link": "/live-tracking/ESV10234"
  },
  {
    "id": 4,
    "icon": "service_started",
    "name": "Service Started",
    "description": "The service has started. You can track the progress in real time.",
    "link": "/bookings/ESV10234"
  },
  {
    "id": 5,
    "icon": "service_completed",
    "name": "Service Completed",
    "description": "Your service has been completed successfully. Please check the final bill and details.",
    "link": "/bookings/ESV10234/summary"
  },
  {
    "id": 6,
    "icon": "payment_due",
    "name": "Payment Pending",
    "description": "Your payment is pending. Complete the payment to close this booking.",
    "link": "/payments/ESV10234"
  },
  {
    "id": 7,
    "icon": "payment_success",
    "name": "Payment Successful",
    "description": "Your payment has been received successfully. Thank you for using EasyServ.",
    "link": "/payments/history"
  },
  {
    "id": 8,
    "icon": "booking_cancelled",
    "name": "Booking Cancelled",
    "description": "Your booking has been cancelled. You can create a new booking anytime.",
    "link": "/services"
  },
  {
    "id": 9,
    "icon": "rating_request",
    "name": "Rate Your Experience",
    "description": "Please rate your service experience to help us improve our quality.",
    "link": "/ratings/ESV10234"
  },
  {
    "id": 10,
    "icon": "support_message",
    "name": "Support Update",
    "description": "You have received a response from EasyServ support regarding your query.",
    "link": "/support/tickets/7845"
  }
]

const Notifications = () => {
  return (
    <section className='notificationsPage'>
       {notifications.map((notification)=>(
        <Link to={notification.link} className='notiBox' key={notification.id}>
            <img src="/static\images\pexels-energepic-com-27411-175039.jpg" alt="" />
            <div className="aboutNoti">
                <h5>{notification.name}</h5>
                <p>{notification.description}</p>
            </div>
        </Link>
       ))}
    </section>
  )
}

export default Notifications
