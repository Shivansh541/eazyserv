import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './css/Services.css'
const Services = () => {
      const services = [
    {
      "name": "Electrician",
      "desc": "Safe electrical repair, wiring, and installation."
    },
    {
      "name": "Plumber",
      "desc": "Fix leaks, install pipes, and maintain your water systems."
    },
    {
      "name": "Cleaning",
      "desc": "Deep home, kitchen, and bathroom cleaning."
    },
    {
      "name": "AC & Appliance Repair",
      "desc": "AC, refrigerator, and appliance servicing."
    },
    {
        "name": "Carpenter",
        "desc": "Furniture repairs and custom woodwork."
    },
    {
        "name": "Painter",
        "desc": "Professional wall painting and polishing."
    },
    {
        "name": "Interior Designer",
        "desc": "Design your dream home with our creative experts."
    },
    {
        "name": "Flooring and Tiles Work",
        "desc":"Tile installation and floor polishing services."
    }
  ]
  return (
    <div className='servicesPage'>
      <Navbar/>
      <section className="serviceGrid categoriesGrid">
          {services.map((service, index) => (
            <div key={index} className="categoryBox">
              <img src={`/static/images/services/${service.name}.jpg`} alt="" />
              <div className="aboutCategory">
                <h3>{service.name}</h3>
                <p>{service.desc}</p>
              </div>
              <button className="primaryBtn">View Details</button>
            </div>
          ))
          }
      </section>
      <Footer/>
    </div>
  )
}

export default Services
