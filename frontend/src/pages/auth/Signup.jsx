import React, { useState } from "react";
import "./css/Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    gender: "",
    dob: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
            gender: formData.gender,
            dob: formData.dob,
            role: formData.role,
          }),
        }
      );

      const data = await response.json();
      console.log(data)
      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

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
        <h2>Create Account</h2>
        <p>Join HomeHelp to access trusted home services</p>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} required />

        <div className="row">
          <select name="gender" onChange={handleChange} required>
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <input type="date" name="dob" onChange={handleChange} required />
        </div>

        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          required
        />

        <select name="role" onChange={handleChange} required>
          <option value="">Select Role</option>
          <option value="customer">Customer</option>
          <option value="worker">Worker</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Create Account"}
        </button>

        <span className="loginLink">
          Already have an account? <a href="/login">Login</a>
        </span>
      </form>
    </div>
  );
};

export default Signup;
