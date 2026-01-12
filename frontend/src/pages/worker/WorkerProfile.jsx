import React from "react";
import {
  FaBriefcase,
  FaRupeeSign,
  FaCalendarAlt,
  FaStar,
  FaUserCircle,
} from "react-icons/fa";
import "./css/WorkerProfile.css";
import { Link } from "react-router-dom";

const WorkerProfile = () => {
  return (
    <div className="workerProfile">

      {/* LEFT PANEL */}
      <div className="profileLeft">
        <div className="profileHeader">
          <FaUserCircle className="avatarIcon" />
          <h2>Ravi Sharma</h2>
          <p className="profession">Electrician</p>
          <span className="status available">● Available</span>
        </div>

        <div className="infoSection">
          <h4>Personal Information</h4>
          <p><b>Age:</b> 28</p>
          <p><b>Gender:</b> Male</p>
          <p><b>Location:</b> Jaipur, Rajasthan</p>
          <p><b>Phone:</b> +91 98765 43210</p>
          <p><b>Email:</b> ravi.sharma@example.com</p>
        </div>

        <button className="editBtn">Edit Info</button>

        <div className="infoSection">
          <h4>Professional Information</h4>
          <p><b>Joined:</b> 12 Jan 2023</p>
          <p><b>Experience:</b> 4 years</p>
          <p><b>Skills:</b> Wiring, Installation, AC Repair</p>
          <p className="verified">✔ Verified by EazyServ</p>
          <p className="rating">⭐ 4.8 / 5 (120 Reviews)</p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="profileRight">

        {/* STATS */}
        <div className="stats">
          <div className="statCard">
            <FaBriefcase className="statIcon blue" />
            <p>Total Jobs Completed</p>
            <h3>154</h3>
          </div>

          <div className="statCard">
            <FaRupeeSign className="statIcon green" />
            <p>Earnings (This Month)</p>
            <h3>₹18,450</h3>
          </div>

          <div className="statCard">
            <FaCalendarAlt className="statIcon orange" />
            <p>Active Bookings</p>
            <h3>03</h3>
          </div>

          <div className="statCard">
            <FaStar className="statIcon yellow" />
            <p>Rating</p>
            <h3>4.8</h3>
          </div>
        </div>

        {/* BOOKINGS */}
        <div className="bookings">
          <h3>Upcoming Bookings</h3>

          <div className="bookingCard">
            <div>
              <p><b>Client:</b> Amit Patel</p>
              <p><b>Service:</b> AC Installation</p>
              <p className="time">
                <b>Time:</b> 14 Nov 2025 · 10:00 AM – 12:00 PM
              </p>
            </div>
            <span className="statusTag confirmed">Confirmed</span>
          </div>

          <div className="bookingCard">
            <div>
              <p><b>Client:</b> Amit Patel</p>
              <p><b>Service:</b> AC Installation</p>
              <p className="time">
                <b>Time:</b> 14 Nov 2025 · 1:00 PM – 3:00 PM
              </p>
            </div>
            <span className="statusTag pending">Pending</span>
          </div>

          <Link to="/worker/bookings" className="viewAll">
            View All Bookings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfile;
