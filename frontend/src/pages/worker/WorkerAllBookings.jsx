import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // ✅ IMPORTANT
import "./css/WorkerHome.css"; // reuse same CSS

const WorkerAllBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setBookings([
      {
        id: 1,
        client: "Amit Patel",
        service: "AC Installation",
        time: "14 Nov 2025 (10:00–12:00)",
        status: "✅ Completed",
        icon: "🔌",
      },
      {
        id: 2,
        client: "Rohit Sharma",
        service: "Cleaning",
        time: "15 Nov 2025 (01:00–03:00)",
        status: "❌ Cancelled",
        icon: "🧹",
      },
      {
        id: 3,
        client: "Neha Singh",
        service: "Plumbing",
        time: "16 Nov 2025 (09:00–11:00)",
        status: "❌ Cancelled",
        icon: "🛠️",
      },
       {
        id: 3,
        client: "Neha Singh",
        service: "Plumbing",
        time: "16 Nov 2025 (09:00–11:00)",
        status: "❌ Cancelled",
        icon: "🛠️",
      },
       {
        id: 3,
        client: "Neha Singh",
        service: "Plumbing",
        time: "16 Nov 2025 (09:00–11:00)",
        status: "❌ Cancelled",
        icon: "🛠️",
      },
       {
        id: 3,
        client: "Neha Singh",
        service: "Plumbing",
        time: "16 Nov 2025 (09:00–11:00)",
        status: "❌ Cancelled",
        icon: "🛠️",
      },
    ]);
  }, []);

  return (
    <section className="recentBookings">
      <h2>Recent Bookings</h2>

      <div className="bookingItems">
        {bookings.map((booking) => (
          <div key={booking.id} className="bookingItem">
            <div className="bookingInfo">
              <span className="icon">{booking.icon}</span>
              <div>
                <h3>Client: {booking.client}</h3>
                <p>
                  {booking.service} • {booking.time}
                </p>
              </div>
            </div>

            <div className="statusBox">
              <span className={`status ${booking.status}`}>
                {booking.status}
              </span>
              <Link to={`/myjobs/${booking.id}`} className="linkBtn">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkerAllBookings;
