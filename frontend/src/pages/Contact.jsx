import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faLocationArrow, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'
import './css/Contact.css'
const Contact = () => {
    return (
        <div className='contactPage'>
            <Navbar />
            <section className="contactBox">
                <h1>Contact Us</h1>
                <div className="contactRow">
                    <ul className="contactInfoBox">
                        <li><Link to={'mailto:support@eazyserv.com'}><FontAwesomeIcon className='contactInfoIcon' icon={faEnvelope}/> support@eazyserv.com</Link></li>
                        <li><Link to={'tel:+919876543210'}><FontAwesomeIcon className='contactInfoIcon' icon={faPhone}/> +91 98765 43210</Link></li>
                        <li><Link to={''}><FontAwesomeIcon className='contactInfoIcon' icon={faLocationDot}/> 123 Main Street, Bhopal, MP</Link></li>
                        <div className="contactSocial footerSocial">
                            <Link to={'https://facebook.com/eazyserv'}><FontAwesomeIcon className='socialIcon' icon={faFacebook} /></Link>
                            <Link to={'https://instagram.com/eazyserv'}><FontAwesomeIcon className='socialIcon' icon={faInstagram} /></Link>
                            <Link to={'https://x.com/eazyserv'}><FontAwesomeIcon className='socialIcon' icon={faXTwitter} /></Link>
                            <Link to={'https://linkedin.com/company/eazyserv'}><FontAwesomeIcon className='socialIcon' icon={faLinkedin} /></Link>
                        </div>
                    </ul>
                    <form className="contactForm">
                        <div className="formInputs">
                            <input type="text" placeholder='Enter Your Name' />
                            <input type="email" placeholder='Enter Your Email' />
                            <input type='text' placeholder='Enter Your Message'></input>
                        </div>
                        <button className='primaryBtn'><FontAwesomeIcon icon={faLocationArrow}/> Submit</button>
                    </form>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Contact
