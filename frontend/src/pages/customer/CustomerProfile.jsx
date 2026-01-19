import "./css/CustomerProfile.css";
import {
    FaTrash,
    FaLock,
    FaPhone,
    FaQuestionCircle,
    FaFileAlt,
    FaShieldAlt,
    FaChevronRight,
} from "react-icons/fa";

const CustomerProfile = () => {
    const addresses = [
        "123 Maple Street, Springfield, IL",
        "456 Oak Avenue, Chicago, IL",
        "799 Pine Road, Dallas, TX",
    ];

    return (
        <div className="profilePage">

            {/* Profile Card */}
            <div className="sectionBox profileCard" >
                <img
                    src="\static\images\gray-picture-person-with-gray-background.png"
                    alt="Profile"
                    className="profileImage"
                />

                <div className="profileInfo">
                    <div className="nameRow">
                        <h2>Sarah Johnson</h2>
                    </div>

                    <p className="infoText">sarah.johnson@email.com</p>

                    <div className="phoneRow">
                        <p>+1 234 567 8900</p>
                        <span className="editLink">Edit</span>
                    </div>

                    <p className="infoMuted">Age: 32 | Gender: Female</p>
                </div>
                <div style={{width:'100%',display:'flex',alignItems:'flex-start',justifyContent:'flex-end'}}>
                    <button style={{ padding: '12px 24px', fontSize: '16px' }} className="primaryBtn">Logout</button>
                </div>

            </div>

            {/* Addresses */}
            <div className="sectionBox">
                <div className="sectionHeader">
                    <h2>Addresses</h2>
                </div>

                {addresses.map((addr, i) => (
                    <div className="listRow" key={i}>
                        <span>{addr}</span>
                        <FaTrash className="iconMuted" />
                    </div>
                ))}

                <button className="addAddressBtn">+ Add Address</button>
            </div>

            {/* Account Security */}
            <div className="sectionBox">
                <h2 className="sectionTitle">Account Security</h2>

                <div className="listRow">
                    <FaLock />
                    <span>Change Password</span>
                    <FaChevronRight className="chevron" />
                </div>

                <div className="listRow danger">
                    <FaTrash />
                    <span>Delete / Deactivate Account</span>
                    <FaChevronRight className="chevron" />
                </div>
            </div>

            {/* Support */}
            <div className="sectionBox">
                <h2 className="sectionTitle">Support</h2>

                <div className="listRow">
                    <FaFileAlt />
                    <span>Raise a Complaint</span>
                    <FaChevronRight className="chevron" />
                </div>

                <div className="listRow">
                    <FaPhone />
                    <span>Contact Support</span>
                    <FaChevronRight className="chevron" />
                </div>

                <div className="listRow">
                    <FaQuestionCircle />
                    <span>FAQ</span>
                    <FaChevronRight className="chevron" />
                </div>
            </div>

            {/* Legal */}
            <div className="sectionBox">
                <h2 className="sectionTitle">Legal</h2>

                <div className="listRow">
                    <FaFileAlt />
                    <span>Terms & Conditions</span>
                    <FaChevronRight className="chevron" />
                </div>

                <div className="listRow">
                    <FaShieldAlt />
                    <span>Privacy Policy</span>
                    <FaChevronRight className="chevron" />
                </div>
            </div>

        </div>
    );
};

export default CustomerProfile;
