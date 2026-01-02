import React from 'react'
import './css/BookService.css'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const BookService = () => {
    const navigate = useNavigate()
    const { user, loading } = useSelector(state => state.auth)
    if (loading) return "Loading User Details"
    return (
        <div className='bookServicePage'>
            <section className="leftBookService">
                <div className="orderSummary">
                    <div className="workerAvatar">
                        <img
                            src="/static/images/gray-picture-person-with-gray-background.png"
                            alt="Worker Profile"
                        />
                    </div>
                    <div className="workerInfo">
                        <h2 onClick={() => navigate('/worker/1')}>Ramesh Kumar <span className='badge'>Verified</span></h2>
                        <p className='serviceCategory'>Electrician | 5 yrs experience</p>
                        <p className="rating">⭐ 4.8 <span>(24 reviews)</span></p>
                        <p className="genderAge"><span>Male</span><span className="dot">•</span><span>20 Years</span></p>
                    </div>
                </div>
                <div className="customerDetailsForm">
                    <h3>Customer Details</h3>
                    <div className="customerDetailsGrid">
                        <div>
                            <label htmlFor="name">Name:</label>
                            <input type="text" name="name" value={user?.name} readOnly />
                        </div>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input type="email" name="email" value={user?.email} readOnly />
                        </div>
                        <div>
                            <label htmlFor="phone">Phone:</label>
                            <input type="tel" name="phone" value={user?.phone} readOnly />
                        </div>
                        <div>
                            <label htmlFor="email">Address:</label>
                            <input type="text" name="address" value={"Lucknow, UP, IN"} readOnly />
                        </div>
                    </div>
                </div>
                <div className="serviceDetailsForm">
                    <h3>Service Details</h3>
                    <div className="serviceDetailsBox">
                        <textarea name="problem" placeholder='Describe Your Problem'></textarea>
                        <div className="imageUploadBlock">
                            {/* Label */}
                            <label className="fieldLabel">
                                Upload Image (Optional):
                            </label>

                            {/* Upload Area */}
                            <div className="uploadArea">
                                <span className="uploadLabel">
                                    + Upload Image
                                </span>
                            </div>

                            {/* Image Preview Thumbnails */}
                            <div className="imagePreviewList">

                                <div className="imagePreview">
                                    <img
                                        src="/static/images\pexels-energepic-com-27411-175039.jpg"
                                        alt="Service preview"
                                    />
                                    <span className="removeImage">✕</span>
                                </div>

                                <div className="imagePreview">
                                    <img
                                        src="/static/images\pexels-energepic-com-27411-175039.jpg"
                                        alt="Service preview"
                                    />
                                    <span className="removeImage">✕</span>
                                </div>

                                <div className="imagePreview">
                                    <img
                                        src="/static/images\pexels-energepic-com-27411-175039.jpg"
                                        alt="Service preview"
                                    />
                                    <span className="removeImage">✕</span>
                                </div>

                            </div>
                        </div>

                        <div>
                            <label htmlFor="issue">Type of Issue: </label>
                            <select name="serviceType" >
                                <option value="faninstallation">Fan Installation</option>
                                <option value="wiring">Wiring</option>
                                <option value="fixswitches">Fix Switches</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="datetime">Schedule Service: </label>
                            <input type="datetime-local" name="datetime" />
                        </div>

                    </div>
                </div>
                <div className="paymentModeSection">
                    <h3>Payment Mode</h3>
                    {/* Payment Options */}
                    <div className="paymentOptions">

                        {/* Pay Online */}
                        <div className="paymentOption selected">
                            <div className="paymentLeft">
                                <span className="paymentRadio"></span>

                                <div className="paymentInfo">
                                    <h4>Pay Online</h4>
                                    <p>UPI, Cards, Wallets</p>
                                </div>
                            </div>

                            <span className="paymentBadge">Recommended</span>
                        </div>

                        {/* Pay After Service */}
                        <div className="paymentOption">
                            <div className="paymentLeft">
                                <span className="paymentRadio"></span>

                                <div className="paymentInfo">
                                    <h4>Pay After Service</h4>
                                    <p>Cash or UPI after work completion</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Info Note */}
                    <div className="paymentNote">
                        Visit charges are payable online and non-refundable once the worker is assigned
                    </div>
                </div>

            </section>
            <section className="rightBookService">
                <div className="priceBreakdownWrapper">
                    <div className="priceBreakdownCard">

                        {/* Header */}
                        <div className="priceHeader">
                            <h3>Price Details</h3>
                        </div>

                        {/* Price Rows */}
                        <div className="priceRows">
                            <div className="priceRow">
                                <span>Visit Charge</span>
                                <span>₹149</span>
                            </div>

                            <div className="priceRow">
                                <span>Per Hour Charge</span>
                                <span>₹199 / hr</span>
                            </div>

                            <div className="priceRow">
                                <span>EazyServ Convenience Fee</span>
                                <span>₹39</span>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="priceDivider"></div>

                        {/* Total */}
                        <div className="priceTotal">
                            <span>Total (Estimated)</span>
                            <span>₹387</span>
                        </div>

                        {/* Disclaimer */}
                        <p className="priceNote">
                            Final price may vary after inspection if extra work is required
                        </p>

                        {/* Confirm Button */}
                        <button className="confirmBookingBtn">
                            Confirm Booking
                        </button>

                    </div>
                </div>

            </section>
        </div>
    )
}

export default BookService
