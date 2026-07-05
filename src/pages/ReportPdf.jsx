import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import QRCode from "qrcode";
import ReportDocument from "../components/ReportDocument";
import { fetchPublicReport } from "../utils/reportApi";
import logo from "../assets/genesis-logo.jpeg";

export default function ReportPdf() {
  const { id } = useParams();
  const [state, setState] = useState({
    id,
    status: "loading",
    report: null,
    error: "",
  });
  const [qrCode, setQrCode] = useState("");

  const certificateUrl = useMemo(() => `${window.location.origin}/results/${id}/pdf`, [id]);

  useEffect(() => {
    let cancelled = false;

    fetchPublicReport(id)
      .then((report) => {
        if (!cancelled) setState({ id, status: "ready", report, error: "" });
      })
      .catch((loadError) => {
        if (!cancelled) setState({ id, status: "error", report: null, error: loadError.message });
      });

    return () => { cancelled = true; };
  }, [id]);

  useEffect(() => {
    QRCode.toDataURL(certificateUrl, {
      width: 180,
      margin: 1,
      color: { dark: "#17324d", light: "#ffffff" },
      errorCorrectionLevel: "M",
    }).then(setQrCode);
  }, [certificateUrl]);

  const loading = state.id !== id || state.status === "loading";
  const report = state.id === id ? state.report : null;
  const error = state.id === id ? state.error : "";

  if (loading) {
    return (
      <main className="pdf-public-shell">
        <div className="verification-card empty">
          <img src={logo} alt="Genesis Geochemical Laboratory" />
          <h1>Loading certificate...</h1>
          <p>Checking the Genesis laboratory database.</p>
        </div>
      </main>
    );
  }

  if (!report) {
    return (
      <main className="pdf-public-shell">
        <div className="verification-card empty">
          <img src={logo} alt="Genesis Geochemical Laboratory" />
          <h1>Certificate not found</h1>
          <p>{error || "The certificate link is invalid or the report is unavailable."}</p>
          <Link to="/verify">Search for a report</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pdf-public-shell">
      <div className="pdf-toolbar">
        <Link to={`/results/${id}`}>Verification summary</Link>
        <button type="button" onClick={() => window.print()}>Print / Save PDF</button>
      </div>
      <div className="pdf-page-wrap">
        <ReportDocument report={report} qrCode={qrCode} />
      </div>
    </main>
  );
}
