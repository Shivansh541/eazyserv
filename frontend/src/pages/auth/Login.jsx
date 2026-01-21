import React, { useState } from "react";
import "./css/Signup.css"; // same theme as signup
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../redux/slices/authSlice";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [step, setStep] = useState("login");
  const [otp, setOtp] = useState(null)
  const [newPassword, setNewPassword] = useState(null)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Login failed");
      }

      localStorage.setItem("token", data.authtoken);

      const user = dispatch(fetchUser())

      if (user.role === "worker") navigate("/worker/dashboard");
      else if (user.role === "customer") navigate("/customer/dashboard");
      else navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const sendOtp = async () => {
    const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: formData.email }),
    });

    if (res.ok) setStep("otp");
  };

  const verifyOtp = async () => {
    const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: formData.email, otp }),
    });

    if (res.ok) setStep("reset");
  };


  const resetPassword = async () => {
    const res = await fetch("http://localhost:5000/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.email,
        password: newPassword,
      }),
    });

    if (res.ok) setStep("login");
  };
  return (
    <div className="signupContainer">
      {step === 'login' && (

        <form className="signupCard" onSubmit={handleSubmit}>
          <h2>Welcome Back</h2>
          <p>Login to continue using HomeHelp</p>

          {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <span className="forgot" onClick={() => setStep("forgot")}>
            Forgotten Password?
          </span>
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <span className="loginLink">
            Don’t have an account? <a href="/signup">Create one</a>
          </span>
        </form>
      )}
      {step === "forgot" && (
        <div className="signupCard">
          <h2>Forgot Password</h2>
          <p>Enter your registered email</p>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <button onClick={sendOtp}>Send OTP</button>
          <span className="forgot loginLink" onClick={() => setStep("login")}>
            Back To Login
          </span>
        </div>
      )}
      {step === "otp" && (
        <div className="signupCard">
          <h2>Verify OTP</h2>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </div>
      )}
      {step === "reset" && (
        <div className="signupCard">
          <h2>Set New Password</h2>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={resetPassword}>Update Password</button>
        </div>
      )}

    </div>
  );
};

export default Login;
