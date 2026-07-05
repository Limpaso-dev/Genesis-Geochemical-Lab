import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FIXED_ASSAY_METHOD, formatDate } from "../utils/reportStore";
import { fetchPublicReport } from "../utils/reportApi";
import logo from "../assets/genesis-logo.jpeg";

export default function PublicResult() {
  const { id } = useParams();
  const [resultState, setResultState] = useState({
    id,
    status: "loading",
    report: null,
    error: "",
  });

  useEffect(() => {
    let cancelled = false;

    fetchPublicReport(id)
      .then((result) => {
        if (!cancelled) {
          setResultState({ id, status: "ready", report: result, error: "" });
        }
      })
      .catch((loadError) => {
        if (!cancelled) {
          setResultState({ id, status: "error", report: null, error: loadError.message });
        }
      });

    return () => { cancelled = true; };
  }, [id]);

  const loading = resultState.id !== id || resultState.status === "loading";
  const report = resultState.id === id ? resultState.report : null;
  const error = resultState.id === id ? resultState.error : "";

  if (loading) {
    return (
      <main className="verification-page">
        <div className="verification-card empty">
          <img src={logo} alt="Genesis Geochemical Laboratory" />
          <h1>Loading report…</h1>
          <p>Checking the Genesis laboratory database.</p>
        </div>
      </main>
    );
  }

  if (!report) {
    return (
      <main className="verification-page">
        <div className="verification-card empty">
          <img src={logo} alt="Genesis Geochemical Laboratory" />
          <h1>Report not found</h1>
          <p>{error || "The verification link is invalid or the report is unavailable."}</p>
          <Link to="/verify">Search for a report</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="verification-page">
      <div className="verification-card">
        <header className="verification-header">
          <img src={logo} alt="Genesis Geochemical Laboratory" />
          <div><span>GENESIS GEOCHEMICAL LABORATORY</span><small>Digital report verification</small></div>
        </header>
        <div className="verified-banner">
          <span>✓</span>
          <div><strong>Verified laboratory report</strong><small>Live database record for {report.reportNumber}.</small></div>
        </div>
        <section className="public-report-meta">
          <div><span>Client</span><strong>{report.clientName || "—"}</strong></div>
          <div><span>Sample type</span><strong>{report.sampleType || "—"}</strong></div>
          <div><span>Report number</span><strong>{report.reportNumber}</strong></div>
          <div><span>Date received</span><strong>{formatDate(report.dateReceived)}</strong></div>
        </section>
        <div className="public-results">
          <h2>Analytical results</h2>
          <div className="public-table-wrap">
            <table>
              <thead><tr><th>Sample ID</th><th>Au</th><th>Cu</th><th>Unit</th></tr></thead>
              <tbody>
                {report.results.map((row, index) => (
                  <tr key={index}><td>{row.sampleId || "—"}</td><td>{row.au || "—"}</td><td>{row.cu || "—"}</td><td>{row.unit}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p><strong>Assay method:</strong> {FIXED_ASSAY_METHOD}</p>
        </div>
        <footer>This report was issued by Genesis Geochemical Laboratory, Kehancha.</footer>
      </div>
    </main>
  );
}
