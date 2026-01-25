import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './css/Workers.css'
import { useSelector } from 'react-redux';
const workersData = [
    {
        id: 1,
        name: "Rohit Sharma",
        experience: 5,
        location: "Sector 21, Noida",
        rating: 4.8,
        reviews: 120,
        price: 250,
    },
    {
        id: 2,
        name: "Amit Verma",
        experience: 2,
        location: "Sector 62, Noida",
        rating: 4.2,
        reviews: 60,
        price: 180,
    },
    {
        id: 3,
        name: "Suresh Kumar",
        experience: 8,
        location: "Indirapuram, Ghaziabad",
        rating: 4.9,
        reviews: 200,
        price: 350,
    },
    {
        id: 4,
        name: "Deepak Singh",
        experience: 6,
        location: "Vaishali, Ghaziabad",
        rating: 4.6,
        reviews: 95,
        price: 280,
    },
    {
        id: 5,
        name: "Manoj Yadav",
        experience: 3,
        location: "Sector 15, Noida",
        rating: 4.1,
        reviews: 40,
        price: 200,
    },
    {
        id: 6,
        name: "Rakesh Gupta",
        experience: 10,
        location: "Greater Noida West",
        rating: 4.9,
        reviews: 310,
        price: 400,
    },
    {
        id: 7,
        name: "Ankit Mishra",
        experience: 4,
        location: "Crossings Republik",
        rating: 4.4,
        reviews: 75,
        price: 230,
    },
    {
        id: 8,
        name: "Vikas Chauhan",
        experience: 7,
        location: "Sector 76, Noida",
        rating: 4.7,
        reviews: 160,
        price: 300,
    },
    {
        id: 9,
        name: "Pankaj Sharma",
        experience: 1,
        location: "Sector 18, Noida",
        rating: 3.9,
        reviews: 25,
        price: 150,
    },
    {
        id: 10,
        name: "Naveen Patel",
        experience: 9,
        location: "Noida Extension",
        rating: 4.8,
        reviews: 220,
        price: 370,
    },
];
const Workers = () => {
    const { slug } = useParams();

    const formatSlug = (slug) => {
        if (!slug) return "";

        return slug
            .split('-')
            .map(word =>
                word.charAt(0).toUpperCase() + word.slice(1)
            )
            .join(' ');
    };

    const [workers, setWorkers] = useState(workersData);
    const handleSort = (type) => {
        let sorted = [...workers];

        switch (type) {
            case "priceLowHigh":
                sorted.sort((a, b) => a.price - b.price);
                break;

            case "priceHighLow":
                sorted.sort((a, b) => b.price - a.price);
                break;

            case "ratingHighLow":
                sorted.sort((a, b) => b.rating - a.rating);
                break;

            case "ratingLowHigh":
                sorted.sort((a, b) => a.rating - b.rating);
                break;

            default:
                return;
        }

        setWorkers(sorted);
    };

    return (

        <section className='workers'>
            <div className="filterBox">
                <select
                    className="primaryBtn"
                    onChange={(e) => handleSort(e.target.value)}
                >
                    <option value="">Sort By</option>
                    <option value="priceLowHigh">Price (Low → High)</option>
                    <option value="priceHighLow">Price (High → Low)</option>
                    <option value="ratingHighLow">Rating (High → Low)</option>
                    <option value="ratingLowHigh">Rating (Low → High)</option>
                </select>
            </div>
            {workers.map((worker) => (
                <div key={worker.id} className="workersList">
                    <div className="workerDetails">
                        <div className="leftDetails">
                            <img src="/static/images/gray-picture-person-with-gray-background.png" alt="" />
                            <div className="workerInfo">
                                <h5 className='workerName'>{worker.name}</h5>
                                <p>{formatSlug(slug)} - {worker.experience} years experience</p>
                                <p className='rating'>⭐ {worker.rating} <span>({worker.reviews} reviews)</span></p>
                                <p>📍 {worker.location}</p>
                            </div>
                        </div>
                        <div className="rightDetails">
                            <div className="buttons">
                                <Link to={`/worker/${worker.id}`} className='primaryBtn'>View Details</Link>
                                <Link to={`/book/${worker.id}`} className='secondaryBtn'>Book Now</Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    )
}

export default Workers
