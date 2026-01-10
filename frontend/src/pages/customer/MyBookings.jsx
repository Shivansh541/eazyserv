import React, { useState } from "react";
import "./css/MyBookings.css";
import { Link } from "react-router-dom";

const bookingsData = [
  {
    id: "EZ12345",
    service: "Electrician",
    date: "05 Jan 2026",
    time: "10:00 AM",
    address: "Alambagh, Lucknow",
    worker: "Rahul Sharma",
    price: 499,
    status: "Upcoming",
  },
  {
    id: "EZ12346",
    service: "Plumber",
    date: "02 Jan 2026",
    time: "01:30 PM",
    address: "Gomti Nagar, Lucknow",
    worker: "Amit Verma",
    price: 699,
    status: "Completed",
  },
  {
    id: "EZ12347",
    service: "AC Repair",
    date: "01 Jan 2026",
    time: "11:00 AM",
    address: "Indira Nagar, Lucknow",
    worker: "Suresh Yadav",
    price: 999,
    status: "Cancelled",
  },
];

const filters = ["All", "Upcoming", "In Progress", "Completed", "Cancelled"];

export default function MyBookings() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredBookings =
    activeFilter === "All"
      ? bookingsData
      : bookingsData.filter((b) => b.status === activeFilter);

  return (
    <section className="customerBookingsPage">
      <div className="filters">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`filterBtn ${activeFilter === filter ? "active" : ""}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="bookingsList">
        {filteredBookings.length === 0 ? (
          <div className="emptyState">
            <h3>No bookings found</h3>
            <p>You haven’t booked any services yet.</p>
            <Link to={'/services'} className="primaryBtn">Book a Service</Link>
          </div>
        ) : (
          filteredBookings.map((booking) => (
            <div className="bookingCard" key={booking.id}>
              <div className="bookingLeft">
                <div className="serviceIcon">🛠️</div>
                <div className="serviceType">
                  <h3>{booking.service}</h3>
                  <p className="booking-id">Booking ID: {booking.id}</p>
                </div>
              </div>
              <div className="bookingMiddle">
                <p>📅 {booking.date} • {booking.time}</p>
                <p>📍 {booking.address}</p>
                <p>👨‍🔧 {booking.worker}</p>
              </div>
              <div className="bookingRight">
                <span className={`statusBadge ${booking.status.toLowerCase()}`}>
                  {booking.status}
                </span>
                <Link to={`/mybookings/${booking.id}`} className="primaryBtn">View Details</Link>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}


