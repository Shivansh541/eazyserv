import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './css/CustomerHome.css'
import SearchBar from '../../components/SearchBar'
const bookingsData = [
    {
        id: "EZ12345",
        service: "Electrician",
        date: "05 Jan 2026",
        time: "10:00 AM",
        address: "Alambagh, Lucknow",
        worker: "Rahul Sharma",
        price: 499,
        status: "Upcoming",
    },
    {
        id: "EZ12346",
        service: "Plumber",
        date: "02 Jan 2026",
        time: "01:30 PM",
        address: "Gomti Nagar, Lucknow",
        worker: "Amit Verma",
        price: 699,
        status: "Completed",
    },
    {
        id: "EZ12347",
        service: "AC Repair",
        date: "01 Jan 2026",
        time: "11:00 AM",
        address: "Indira Nagar, Lucknow",
        worker: "Suresh Yadav",
        price: 999,
        status: "Cancelled",
    },
];

const CustomerHome = () => {

    const categories = [
        {
            "name": "Electrician",
            "slug": "electrician",
            "desc": "Certified electricians for wiring, fittings, and quick electrical repairs at home."
        },
        {
            "name": "Plumber",
            "slug": "plumber",
            "desc": "Expert plumbers for leak repairs, pipe fitting, and bathroom installations."
        },
        {
            "name": "Cleaning",
            "slug": "cleaning",
            "desc": "Professional home, kitchen, and deep cleaning services for a spotless living space."
        },
        {
            "name": "AC & Appliance Repair",
            "slug": "ac-and-appliance-repair",
            "desc": "Reliable technicians to fix ACs, refrigerators, washing machines, and more."
        },
    ]
    const user = useSelector((state) => state.auth.user)
    return (
        <div className='home customerHome'>
            <section className="homeHero">
                <div className="leftHero">
                    <div className="heroHead">
                        <h3>Hello, {user.name.split(" ")[0]} 👋</h3>
                        <p>Here are your recent bookings and quick actions.</p>
                    </div>
                    <div className="heroBtns">
                        <Link to={'/services'} className="primaryBtn">Book a Service</Link>
                        <Link to={'/mybookings'} className="secondaryBtn">View My Bookings</Link>
                    </div>
                    <SearchBar class={"heroSearchBar"} />
                </div>
                <div className="rightHero">
                    <img src="/static/images/istockphoto-1363376686-612x612.jpg" alt="" />
                </div>
            </section>

            {/* RECENT BOOKINGS */}
            <section className="recentBookings">
                <h2>Recent Bookings</h2>
                <div className="bookingsList">
                    {bookingsData.length === 0 ? (
                        <div className="emptyState">
                            <h3>No bookings found</h3>
                            <p>You haven’t booked any services yet.</p>
                            <Link to={'/services'} className="primaryBtn">Book a Service</Link>
                        </div>
                    ) : (
                        bookingsData.map((booking) => (
                            <div className="bookingCard" key={booking.id}>
                                <div className="bookingLeft">
                                    <div className="serviceIcon">🛠️</div>
                                    <div className="serviceType">
                                        <h3>{booking.service}</h3>
                                        <p className="booking-id">Booking ID: {booking.id}</p>
                                    </div>
                                </div>
                                <div className="bookingMiddle">
                                    <p>📅 {booking.date} • {booking.time}</p>
                                    <p>📍 {booking.address}</p>
                                    <p>👨‍🔧 {booking.worker}</p>
                                </div>
                                <div className="bookingRight">
                                    <span className={`statusBadge ${booking.status.toLowerCase()}`}>
                                        {booking.status}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>

            {/* RECOMMENDED SERVICES */}
            <section className="recommended serviceSection">
                <h1>Recommended Services</h1>
                <div className="categoriesGrid">
                    {categories.map((category, index) => (
                        <div key={index} className="categoryBox">
                            <img src={`/static/images/services/${category.name}.jpg`} alt="" />
                            <div className="aboutCategory">
                                <h3>{category.name}</h3>
                                <p>{category.desc}</p>
                            </div>
                            <Link to={`/services/${category.slug}`} className="primaryBtn">Book Now</Link>
                        </div>
                    ))
                    }
                </div>
                <Link to={'/services'}>Explore All Services &rarr;</Link>
            </section>
        </div>
    )
}

export default CustomerHome
