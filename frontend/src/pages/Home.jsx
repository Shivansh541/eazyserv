import React from 'react'
import './css/Home.css'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
const Home = () => {
  const categories = [
    {
      "name": "Electrician",
      "desc": "Certified electricians for wiring, fittings, and quick electrical repairs at home."
    },
    {
      "name": "Plumber",
      "desc": "Expert plumbers for leak repairs, pipe fitting, and bathroom installations."
    },
    {
      "name": "Cleaning",
      "desc": "Professional home, kitchen, and deep cleaning services for a spotless living space."
    },
    {
      "name": "AC & Appliance Repair",
      "desc": "Reliable technicians to fix ACs, refrigerators, washing machines, and more."
    },
  ]
  return (
    <div className='home'>
      <Navbar />
      <section className="homeHero">
        <div className="leftHero">
          <div className="heroHead">
            <h3>Find Trusted Professionals for Every Home Service</h3>
            <p>Verified Experts. Transparent Pricing. Quick Booking.</p>
          </div>
          <div className="heroBtns">
            <button className="primaryBtn">Book a Service</button>
            <button className="secondaryBtn">Become a Provider</button>
          </div>
          <div className="heroSearchBar">
            <input type="search" placeholder='What Service do you need?' />
          </div>
        </div>
        <div className="rightHero">
          <img src="/static/images/hero-right.svg" alt="" />
        </div>
      </section>
      <section className="serviceSection">
        <h1>Popular Categories</h1>
        <div className="categoriesGrid">
          {categories.map((category, index) => (
            <div key={index} className="categoryBox">
              <img src={`/static/images/services/${category.name}.jpg`} alt="" />
              <div className="aboutCategory">
                <h3>{category.name}</h3>
                <p>{category.desc}</p>
              </div>
              <button className="primaryBtn">Book Now</button>
            </div>
          ))
          }
        </div>
        <Link to={'/services'}>Explore All Services &rarr;</Link>
      </section>
      <section className="howItWorks">
        <div className="hiwHead">
          <h1>How It Works</h1>
          <p>Getting things done in just 4 simple steps</p>
        </div>
        <div className="steps">
          {[
            {
              "name": "Search",
              "desc": "Find the service you need."
            },
            {
              "name": "Book",
              "desc": "Select date, time and confirm Booking."
            },
            {
              "name": "Worker Arrives",
              "desc": "Professional comes to your doorstep."
            },
            {
              "name": "Pay",
              "desc": "Hassle-free payment after service."
            }
          ].map((step, index) => (
            <div key={index} className="step">
              <h1>{index + 1}</h1>
              <h3>{step.name}</h3>
              <p>{step.desc}</p>
            </div>
          ))
          }
        </div>
      </section>
      <section className="whyChooseUs">
        <h1>Why Choose Us?</h1>
        <div className="features">
          <div className="featuresLeft">
            <div className="featureBox">
              <h3>Verified Experts</h3>
              <p>Every professional is background-checked and trained.</p>
            </div>
            <div className='featureBox'></div>
            <div className="featureBox">
              <h3>Affordable Pricing</h3>
              <p>Transparent rates with no hidden charges.</p>
            </div>
            <div className='featureBox'></div>
          </div>
          <div className="centerLine"></div>
          <div className="featureIcons">
            <div className="box">
              <div className="featureIcon">👷</div>
            </div>
            <div className="box">
              <div className="featureIcon">⏰</div>
            </div>
            <div className="box">
              <div className="featureIcon">💸</div>
            </div>
            <div className="box">
              <div className="featureIcon">💬</div>
            </div>
          </div>
          <div className="featuresRight">
            <div className='featureBox'></div>
            <div className="featureBox">
              <h3>On-Time Service</h3>
              <p>Get your service exactly when you need it.</p>
            </div>
            <div className='featureBox'></div>
            <div className="featureBox">
              <h3>24/7 Support</h3>
              <p>Always available for queries and rescheduling.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  )
}

export default Home
