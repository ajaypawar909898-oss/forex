import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const VerifyEmail = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("verify_email");
    if (!storedEmail) {
      navigate("/signup");
    } else {
      setEmail(storedEmail);
    }
  }, [navigate]);

  const handleVerify = async () => {
    if (!otp) {
      alert("Please enter OTP");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (!data.success) {
        alert("Invalid OTP");
        return;
      }

      localStorage.removeItem("verify_email");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/resend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!data.success) {
        alert("Failed to resend OTP");
        return;
      }

      alert("OTP resent successfully");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero relative px-4">
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative z-10 w-full max-w-md bg-black/60 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/10">
        <h1 className="text-3xl font-bold text-crypto-purple mb-2">
          Verify Your Email
        </h1>
        <p className="text-gray-300 mb-8">
          Enter the OTP sent to your registered email
        </p>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full mb-6 px-4 py-3 rounded-lg bg-white/10 text-gray-300 border border-white/10 focus:ring-2 focus:ring-crypto-purple"
        />

        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full bg-crypto-purple hover:bg-crypto-dark-purple text-gray-300 hover:text-white font-semibold py-3 rounded-lg disabled:opacity-50"
        >
          {loading ? "VERIFYING..." : "VERIFY"}
        </button>

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handleResendOtp}
            className="text-crypto-purple text-sm hover:text-white"
          >
            Resend OTP
          </button>

          <Link to="/login" className="text-gray-400 text-sm hover:text-white">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
