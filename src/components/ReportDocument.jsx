import { forwardRef } from "react";
import { FIXED_ASSAY_METHOD, FIXED_DISCLAIMER, formatDate } from "../utils/reportStore";

function formatStampDate(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`)).toUpperCase();
}

const ReportDocument = forwardRef(function ReportDocument({ report }, ref) {
  return (
    <article ref={ref} className="report-document template-report">
      <header className="template-header">
        <img src="/genesis-logo.jpeg" alt="Genesis Geochemical Laboratory logo" />
        <div>
          <h1>GENESIS GEOCHEMICAL LABORATORY</h1>
          <p>LOCATION: KEHANCHA, KEHANCHA-MIGORI ROAD</p>
          <p className="template-postal-address">P.O BOX 110-40413, KEHANCHA</p>
        </div>
      </header>

      <table className="template-details">
        <tbody>
          <tr><th>Client Name</th><td colSpan="3">{report.clientName || ""}</td></tr>
          <tr><th>Job Number</th><td colSpan="3">{report.reportNumber}</td></tr>
          <tr><th>No. of Samples</th><td colSpan="3">{report.results.length}</td></tr>
          <tr>
            <th>Type of sample</th><td>{report.sampleType || ""}</td>
            <th>Date Received</th><td>{formatDate(report.dateReceived)}</td>
          </tr>
          <tr><th>Assay Method</th><td colSpan="3">{FIXED_ASSAY_METHOD}</td></tr>
        </tbody>
      </table>

      <section className="template-results">
        <table>
          <thead><tr><th>S/NO</th><th>Sample ID</th><th>AU ppm</th><th>Cu ppm</th></tr></thead>
          <tbody>
            {report.results.map((result, index) => (
              <tr key={`${result.sampleId}-${index}`}>
                <td>{index + 1}</td><td>{result.sampleId || ""}</td>
                <td>{result.au || ""}</td><td>{result.cu || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <table className="method-table">
        <thead>
          <tr><th colSpan="4">ANALYTICAL METHOD AND TOLERANCE LIMIT</th></tr>
          <tr><th></th><th>Sample Type</th><th>Analysis Method</th><th>Tolerance Limit</th></tr>
        </thead>
        <tbody>
          <tr><th>A</th><td>Soil, Core, Rock</td><td>Aqua regia digest, AAS Finish</td><td>+/- 10%</td></tr>
          <tr><th>B</th><td>Carbon</td><td>Aqua regia digest, AAS Finish</td><td>+/- 10%</td></tr>
          <tr><th>C</th><td>Solution</td><td>AAS Finish</td><td>+/- 10%</td></tr>
        </tbody>
      </table>

      <p className="template-disclaimer"><strong>Disclaimer:</strong> {FIXED_DISCLAIMER}</p>

      <section className="template-approval-row">
      <footer className="template-signoff">
        <div className="signature-block">
          <span>Technical staff</span>
          <img
            className="fixed-technical-signature"
            src="/fred-meja-signature.png"
            alt="Fred Meja signature"
          />
          <strong>{report.technicalStaff || ""}</strong>
        </div>
        <div className="signature-block">
          <span>Authorizer</span>
          <img
            className="fixed-authorizer-signature"
            src="/vitalis-justus-signature.png"
            alt="Vitalis Justus signature"
          />
          <strong>{report.authorizer || report.approvedBy || ""}</strong>
        </div>
      </footer>

      <section className="template-stamp-row" aria-label="Laboratory date stamp">
        <div className="template-date-stamp">
          <strong className="stamp-title">GENESIS GEOCHEMICAL LABORATORY</strong>
          <span className="stamp-star stamp-star-left">★</span>
          {report.stampDate && (
            <strong className="stamp-date-overlay">{formatStampDate(report.stampDate)}</strong>
          )}
          <span className="stamp-star stamp-star-right">★</span>
          <span className="stamp-address">R O BOX 110-40413, KEHANCHA</span>
          <span className="stamp-phone">PHONE: 0119993932</span>
        </div>
      </section>
      </section>

    </article>
  );
});

export default ReportDocument;
