import React from 'react'
import './css/Navbar.css'
import { Link } from 'react-router-dom'
const Navbar = () => {
    return (
        <nav className='navbar'>
            <div className="leftNav">
                <h3>EazyServ</h3>
                <div className="searchBar">
                    <input type="search" name='search' placeholder='What service do you need?' />
                </div>
            </div>
            <div className="rightNav">
                <ul className='navlinks'>
                    <li><Link to="/" className="navlink">Home</Link></li>
                    <li><Link to="/about" className="navlink">About</Link></li>
                    <li><Link to="/services" className="navlink">Services</Link></li>
                    <li><Link to="/contact" className="navlink">Contact</Link></li>
                </ul>
                <button className='primaryBtn'>Login</button>
            </div>
        </nav>
    )
}

export default Navbar
