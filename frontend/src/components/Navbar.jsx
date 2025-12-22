import React from 'react'
import './css/Navbar.css'
import { Link, useLocation } from 'react-router-dom'
const Navbar = () => {
    const location = useLocation()
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
                    <li><Link to="/" className={`navlink ${location.pathname === '/'?"active":""}`}>Home</Link></li>
                    <li><Link to="/about" className={`navlink ${location.pathname === '/about'?"active":""}`}>About</Link></li>
                    <li><Link to="/services" className={`navlink ${location.pathname === '/services'?"active":""}`}>Services</Link></li>
                    <li><Link to="/contact" className={`navlink ${location.pathname === '/contact'?"active":""}`}>Contact</Link></li>
                </ul>
                <button className='primaryBtn'>Login</button>
            </div>
        </nav>
    )
}

export default Navbar
