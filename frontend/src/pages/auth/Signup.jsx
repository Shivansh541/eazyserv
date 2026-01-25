import React, { useState } from "react";
import "./css/Signup.css";
import { Link } from "react-router-dom";
const SERVICES = [
  "Plumber",
  "Electrician",
  "AC Repair",
  "Carpenter",
  "Painter",
  "Cleaning",
  "Appliance Repair",
];

const Signup = () => {
  const [role, setRole] = useState("customer")
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    gender: "",
    dob: "",
    skills: [],
    address: {
      street: "",
      city: "",
      state: "",
      zipcode: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const validateStep1 = () => {
    // if (!formData.name.trim()) return "Name is required";
    // if (!formData.email.trim()) return "Email is required";
    // if (!formData.phone.trim()) return "Phone is required";
    // if (!formData.gender) return "Gender is required";
    // if (!formData.dob) return "Date of birth is required";
    // if (!formData.password) return "Password is required";
    // if (formData.password.length < 6)
    //   return "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      return "Passwords do not match";

    return "";
  };

  const nextStep = () => {
    const validationError = validateStep1();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    setStep(2);
  };

  const toggleSkill = (skill) => {
    setFormData((prev) => {
      const exists = prev.skills.find((s) => s.name === skill);

      if (exists) {
        return {
          ...prev,
          skills: prev.skills.filter((s) => s.name !== skill),
        };
      } else {
        return {
          ...prev,
          skills: [...prev.skills, { name: skill, experience: "" }],
        };
      }
    });
  };
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        gender: formData.gender,
        dob: formData.dob,
        password: formData.password,
        addresses: [formData.address],
        role,
      };
      if (role === "worker") {
        payload.workerInfo = {
          skills: formData.skills,
        };
      }

      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");

      alert("Account created successfully!");
      window.location.href = "/login";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signupContainer">

      <form className="signupCard" onSubmit={handleSubmit}>
        <h2>
          {role === "customer"
            ? "Create Customer Account"
            : step === 1
              ? "Provider Account Setup"
              : "Complete Your Profile"}
        </h2>
        <p>
          {role === "customer"
            ? "Book trusted home services"
            : step === 1
              ? "Create your provider account"
              : "Tell us about your services"}
        </p>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {role === "worker" && (
          <div className="stepIndicator">
            <div
              onClick={() => setStep(1)}
              className={`step ${step >= 1 ? "active" : ""}`}
            >
              <span>1</span>
              <p>Account</p>
            </div>

            <div className="stepLine" />

            <div
              onClick={() => {
                const validationError = validateStep1();
                if (validationError) {
                  setError(validationError);
                  return;
                }
                setError("");
                setStep(2);
              }}
              className={`step ${step === 2 ? "active" : ""}`}
            >
              <span>2</span>
              <p>Services</p>
            </div>
          </div>
        )}

        {step === 1 && (
          <>
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />

            <div className="row">
              <select name="gender" value={formData.gender} onChange={handleChange} required>
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>

              <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
            </div>

            <input type="password" name="password" value={formData.password} placeholder="Password" onChange={handleChange} required />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {role === "worker" ? (
              <button type="button" onClick={nextStep}>
                Continue
              </button>
            ) : (
              <button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create Customer Account"}
              </button>
            )}
          </>
        )}
        {step === 2 && role === "worker" && (
          <>
            <div className="addressSection">
              <p>Service Address</p>

              <div className="row">
                <input
                  type="text"
                  name="street"
                  placeholder="Street / Area"
                  value={formData.address.street}
                  onChange={handleAddressChange}
                  required
                />

                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.address.city}
                  onChange={handleAddressChange}
                  required
                />
              </div>
              <div className="row">


                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.address.state}
                  onChange={handleAddressChange}
                  required
                />

                <input
                  type="text"
                  name="zipcode"
                  placeholder="Zip / Pincode"
                  value={formData.address.zipcode}
                  onChange={handleAddressChange}
                  required
                />
              </div>
            </div>

            <div className="skillsSection">
              <p>Select Services & Experience</p>

              <div className="skillsGrid">
                {SERVICES.map((service) => {
                  const selectedSkill = formData.skills.find(
                    (s) => s.name === service
                  );

                  return (
                    <div key={service} className="skillItem">
                      <label>
                        <input
                          type="checkbox"
                          checked={!!selectedSkill}
                          onChange={() => toggleSkill(service)}
                        />
                        {service}
                      </label>

                      {selectedSkill && (
                        <input
                          type="text"
                          placeholder="Experience (e.g. 2 years)"
                          value={selectedSkill.experience}
                          onChange={(e) => {
                            const value = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              skills: prev.skills.map((s) =>
                                s.name === service
                                  ? { ...s, experience: value }
                                  : s
                              ),
                            }));
                          }}
                          required
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Provider Account"}
            </button>
          </>
        )}

        <span className="loginLink">
          Already have an account? <Link to={"/login"}>Login</Link>
        </span>

        {role === 'worker' ?
          <span onClick={() => {
            setRole('customer')
            setStep(1)
          }} className="toggleRole">Signup as Customer</span> :
          <span onClick={() => {
            setRole('worker')
            setStep(1)
          }} className="toggleRole">Signup as Service Provider</span>
        }
      </form>
    </div>
  );
};

export default Signup;
