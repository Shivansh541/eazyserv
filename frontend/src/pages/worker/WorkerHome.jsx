import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const jobsData = [
  {
    id: "BK10234",
    customerName: "Rahul Sharma",
    customerPhoto: "/static/images/gray-picture-person-with-gray-background.png",
    service: "Plumbing",
    date: "12 Jan 2026",
    time: "10:30 AM",
    address: "Indore, MP",
    status: "In Progress"
  },
  {
    id: "BK10235",
    customerName: "Rajat Sharma",
    customerPhoto: "/static/images/gray-picture-person-with-gray-background.png",
    service: "Plumbing",
    date: "13 Jan 2026",
    time: "10:30 AM",
    address: "Indore, MP",
    status: "Completed"
  },
  {
    id: "BK10236",
    customerName: "Vijay Sharma",
    customerPhoto: "/static/images/gray-picture-person-with-gray-background.png",
    service: "Plumbing",
    date: "14 Jan 2026",
    time: "10:30 AM",
    address: "Indore, MP",
    status: "Cancelled"
  }
];


const WorkerHome = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="home workerHome customerHome">

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
      <section className="recentBookings recentJobs">
        <h2>Recent Jobs</h2>

        <div className="bookingsList">
          {jobsData.length === 0 ? (
            <div className="emptyState">
              <h3>No jobs yet</h3>
              <p>You haven’t completed any jobs yet.</p>
            </div>
          ) : (
            jobsData.map((job) => (
              <div className="bookingCard" key={job.id}>

                {/* LEFT */}
                <div className="bookingLeft">
                  <img
                    src={job.customerPhoto}
                    alt={job.customerName}
                    className="profileAvatar"
                  />
                  <div className="serviceType">
                    <h3>{job.customerName}</h3>
                    <p className="booking-id">Booking ID: {job.id}</p>
                    <p className="serviceLabel">{job.service}</p>
                  </div>
                </div>

                {/* MIDDLE */}
                <div className="bookingMiddle">
                  <p>📅 {job.date} • {job.time}</p>
                  <p>📍 {job.address}</p>
                </div>

                {/* RIGHT */}
                <div className="bookingRight">
                  <span className={`statusBadge ${job.status.toLowerCase()}`}>
                    {job.status}
                  </span>
                </div>

              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default WorkerHome;
