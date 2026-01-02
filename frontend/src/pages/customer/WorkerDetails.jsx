import React from "react";
import "./css/WorkerDetails.css";
import { Link } from "react-router-dom";

const WorkerDetails = () => {
  return (
    <div className="workerDetailsPage">

      {/* ================= HERO SECTION ================= */}
      <section className="personalDetails">
        <div className="workerAvatar">
          <img
            src="/static/images/gray-picture-person-with-gray-background.png"
            alt="Worker Profile"
          />
        </div>

        <div className="workerInfo">
          <h2>Ramesh Kumar</h2>
          <p className="rating">⭐ 4.8 <span>(24 reviews)</span></p>
          <p className="genderAge"><span>Male</span><span className="dot">•</span><span>20 Years</span></p>
          <p className="address">📍 Gomti Nagar, Lucknow</p>
        </div>

        <Link to={`/book/1`} className="primaryBtn btn">Book Now</Link>
      </section>

      {/* ================= ABOUT + SKILLS ================= */}
      <section className="professionalDetails">
        <h2>Professional Info</h2>
        <div className="workerMidContainer">

          <div className="aboutStats">
            <h3>About</h3>
            <p>
              I am a professional plumber with more than 5 years of experience
              in residential and commercial plumbing. I specialize in pipe
              fitting, leakage fixing, bathroom fittings, and emergency services.
            </p>

            <div className="statsRow">
              <div className="statBox">
                <span>Rating</span>
                <strong>⭐ 4.8 </strong>
              </div>

              <div className="statBox">
                <span>Jobs Completed</span>
                <strong>120+</strong>
              </div>

              <div className="statBox">
                <span>Average Response Time</span>
                <strong>30 Min</strong>
              </div>

              <div className="statBox">
                <span>Working Hours</span>
                <strong>9:00 AM - 11:00 PM</strong>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="skillsSection">
            <h3>Skills & Experience</h3>

            <div className="skillsList">
              <div className="skillItem">
                <span>Pipe Fitting</span>
                <strong>3 Years</strong>
              </div>

              <div className="skillItem">
                <span>Leak Repair</span>
                <strong>5 Years</strong>
              </div>

              <div className="skillItem">
                <span>Bathroom Fitting</span>
                <strong>4 Years</strong>
              </div>

              <div className="skillItem">
                <span>Drain Cleaning</span>
                <strong>4 Years</strong>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="verificationAndPricing">
        <div className="verificationStatus">
          <h2>Verification Status</h2>
            <div className="verifiedList list">
              <p>✅ Adhaar Verified</p>
              <p>✅ Phone Verified</p>
              <p>✅ Background Checked</p>
            </div>
        </div>
        <div className="pricing">
          <h2>Pricing</h2>
            <div className="pricingList list">
              <p>Starting Price: <span>₹299</span></p>
              <p>Price per hour: <span>₹100</span></p>
            </div>
        </div>
      </section>
      {/* ================= REVIEWS ================= */}
      <section className="workerReviews">
        <div className="reviewsContainer">
          <h3>Customer Reviews</h3>

          <div className="reviewsList">

            <div className="reviewCard">
              <div className="reviewHeader">
                <strong>Rajesh Singh</strong>
                <span className="reviewRating">⭐ 5.0</span>
              </div>
              <span className="reviewDate">12 Dec 2025</span>
              <p>
                Excellent plumber! Fixed my leakage within an hour.
              </p>
            </div>

            <div className="reviewCard">
              <div className="reviewHeader">
                <strong>Suman Verma</strong>
                <span className="reviewRating">⭐ 4.5</span>
              </div>
              <span className="reviewDate">05 Dec 2025</span>
              <p>
                Very professional and polite. Work quality was great.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default WorkerDetails;
