import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./css/WorkerAllJob.css";

// Dummy data (replace with API later)
const jobsData = [
  {
    id: "EZ12345",
    service: "Electrician",
    date: "05 Jan 2026",
    time: "10:00 AM",
    address: "Alambagh, Lucknow",
    customer: "Rahul Sharma",
    status: "Upcoming",
  },
  {
    id: "EZ12346",
    service: "Plumber",
    date: "02 Jan 2026",
    time: "01:30 PM",
    address: "Gomti Nagar, Lucknow",
    customer: "Amit Verma",
    status: "Completed",
  },
  {
    id: "EZ12347",
    service: "AC Repair",
    date: "01 Jan 2026",
    time: "11:00 AM",
    address: "Indira Nagar, Lucknow",
    customer: "Suresh Yadav",
    status: "Cancelled",
  },
  {
    id: "EZ12348",
    service: "Cleaning",
    date: "06 Jan 2026",
    time: "02:00 PM",
    address: "Hazratganj, Lucknow",
    customer: "Rohit Sharma",
    status: "In Progress",
  },
];

const filters = ["All", "Upcoming", "In Progress", "Completed", "Cancelled"];


const getStatusClass = (status) =>
  status.toLowerCase().replace(/\s+/g, "-");

export default function WorkerAllJob() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filteredJobs =
    activeFilter === "All"
      ? jobsData
      : jobsData.filter((job) => job.status === activeFilter);

  return (
    <section className="workerJobsPage">
      {/* Filters */}
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

      {/* Jobs */}
      {filteredJobs.length === 0 ? (
        <div className="emptyState">
          <h3>No jobs found</h3>
          <p>No jobs assigned to you yet.</p>
        </div>
      ) : (
        filteredJobs.map((job) => (
          <div className="workerJobCard" key={job.id}>
            {/* Left */}
            <div className="workerJobLeft">
              <h3 className="clientName">
               🛠️ Client: {job.customer}
              </h3>
              <p className="jobMeta">
                {job.service} • {job.date} ({job.time})
              </p>
              <p className="jobAddress">
                📍 {job.address}
              </p>
            </div>

            {/* Right */}
            <div className="workerJobRight">
              <span
                className={`statusBadge ${getStatusClass(job.status)}`}
              >
                {job.status}
              </span>
              <Link
                to={`/myjobs/${job.id}`}
                className="detailsLink"
              >
                View Details
              </Link>
            </div>
          </div>
        ))
      )}
    </section>
  );
}