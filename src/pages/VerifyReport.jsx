import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/genesis-logo.jpeg";

export default function VerifyReport() {
  const [id, setId] = useState("");
  const navigate = useNavigate();

  return (
    <main className="verification-page">
      <form
        className="verification-card search-card"
        onSubmit={(event) => {
          event.preventDefault();
          if (id.trim()) navigate(`/results/${id.trim()}`);
        }}
      >
        <img src={logo} alt="Genesis Geochemical Laboratory" />
        <span>REPORT VERIFICATION</span>
        <h1>Check a laboratory result</h1>
        <p>Enter the job number shown on your certificate. You can also scan the QR code for instant verification.</p>
        <label>Job number<input value={id} onChange={(event) => setId(event.target.value)} placeholder="e.g. GEN.LAB-20260621-123" /></label>
        <button>Verify report</button>
      </form>
    </main>
  );
}
