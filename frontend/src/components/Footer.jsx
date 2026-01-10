import React from 'react'
import './css/Footer.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons'
const Footer = () => {
    return (
        <>
            <section className="footer">
                <div className="footerAbout">
                    <h3>EazyServ</h3>
                    <p>We provide trusted home services including electricians, plumbing, cleaning, and AC & appliance repair. <br />Our certified professionals ensure quick, reliable, and affordable solutions — all at your doorstep.  </p>
                </div>
                <div className="footerServices">
                    <h5>Services</h5>
                    <ul>
                        <li><Link to={'/services/electricians'}>Electricians</Link></li>
                        <li><Link to={'/services/plumbers'}>Plumbers</Link></li>
                        <li><Link to={'/services/cleaning'}>Cleaning</Link></li>
                        <li><Link to={'/services/painting'}>Painting</Link></li>
                        <li><Link to={'/services/carpentry'}>Carpentry</Link></li>
                        <li><Link to={'/services'}>More services</Link></li>
                    </ul>
                </div>
                <div className="footerLinks footerServices">
                    <h5>Quick Links</h5>
                    <ul>
                        <li><Link to={'/'}>Home</Link></li>
                        <li><Link to={'/about'}>About Us</Link></li>
                        <li><Link to={'/services'}>Services</Link></li>
                        <li><Link to={'/contact'}>Contact Us</Link></li>
                        <li><Link to={'/signup'}>Become a Provider</Link></li>
                        <li><Link to={'/privacypolicy'}>Privacy Policy</Link></li>
                        <li><Link to={'/tnc'}>Terms & Conditions</Link></li>
                    </ul>
                </div>
                <div className='footerContact footerServices'>
                    <h5>Contact Us</h5>
                    <ul>
                        <li>📍 123 Main Street, Bhopal, MP</li>
                        <li><Link to={'tel:+919876543210'}>📞 +91 98765 43210</Link></li>
                        <li><Link to={'mailto:support@eazyserv.com'}>✉️ support@eazyserv.com</Link></li>
                    </ul>
                    <div className="footerSocial">
                        <Link to={'https://facebook.com/eazyserv'}><FontAwesomeIcon className='socialIcon' icon={faFacebook} /></Link>
                        <Link to={'https://instagram.com/eazyserv'}><FontAwesomeIcon className='socialIcon' icon={faInstagram} /></Link>
                        <Link to={'https://x.com/eazyserv'}><FontAwesomeIcon className='socialIcon' icon={faXTwitter} /></Link>
                        <Link to={'https://linkedin.com/company/eazyserv'}><FontAwesomeIcon className='socialIcon' icon={faLinkedin} /></Link>
                    </div>
                </div>
            </section>
            <section className='copyright'>
                <p>&copy; 2025 EazyServ. All rights reserved. </p>
            </section>
        </>
    )
}

export default Footer
