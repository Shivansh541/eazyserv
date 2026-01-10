import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./css/WorkerHome.css";

const WorkerHome = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="home workerHome">

      {/* HERO SECTION */}
      <section className="homeHero">
        <div className="leftHero">
          <div className="heroHead">
            <h3>Hello, {user?.name?.split(" ")[0] || "Worker"} 👋</h3>
            <p>Here are your assigned jobs and quick actions.</p>
          </div>

          <div className="heroBtns">
            <Link to="/jobs" className="primaryBtn">
              View My Bookings
            </Link>
            <Link to="/myjobs" className="secondaryBtn">
              My Jobs
            </Link>
          </div>
        </div>

        <div className="rightHero">
          <img src="/static/images/istockphoto-1363376686-612x612.jpg" alt="" />
        </div>
      </section>

      {/* RECENT JOBS */}
      <section className="recentBookings">
        <h2>Recent Jobs</h2>

        <div className="bookingItems">

          <div className="bookingItem">
            <div className="bookingInfo">
              <span className="icon">🔌</span>
              <div>
                <h3>Client: Amit Patel</h3>
                <p>AC Installation • 14 Nov 2025 (10:00–12:00)</p>
              </div>
            </div>
            <div className="statusBox">
              <span className="status completed">✅ Completed</span>
              <Link to="/myjobs/1" className="linkBtn">
                View Details
              </Link>
            </div>
          </div>

          <div className="bookingItem">
            <div className="bookingInfo">
              <span className="icon">🧹</span>
              <div>
                <h3>Client: Rohit Sharma</h3>
                <p>Cleaning • 15 Nov 2025 (01:00–03:00)</p>
              </div>
            </div>
            <div className="statusBox">
              <span className="status ongoing">🔄 Ongoing</span>
              <Link to="/myjobs/2" className="linkBtn">
                View Details
              </Link>
            </div>
          </div>

          <div className="bookingItem">
            <div className="bookingInfo">
              <span className="icon">🛠️</span>
              <div>
                <h3>Client: Neha Singh</h3>
                <p>Plumbing • 16 Nov 2025 (09:00–11:00)</p>
              </div>
            </div>
            <div className="statusBox">
              <span className="status cancelled">❌ Cancelled</span>
              <Link to="/myjobs/3" className="linkBtn">
                View Details
              </Link>
            </div>
          </div>

        </div>

        <a
          href="/worker/bookings"
          target="_blank"
          rel="noopener noreferrer"
          className="viewAllLink"
        >
          View All Bookings →
        </a>
      </section>

    </div>
  );
};

export default WorkerHome;
