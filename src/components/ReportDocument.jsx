import { forwardRef } from "react";
import { formatDate } from "../utils/reportStore";

const ReportDocument = forwardRef(function ReportDocument({ report, qrCode }, ref) {
  return (
    <article ref={ref} className="report-document template-report">
      <header className="template-header">
        <img src="/genesis-report-seal.jpeg" alt="Genesis Geochemical Laboratory seal" />
        <h1>GENESIS GEOCHEMICAL LABORATORY</h1>
        <p>LOCATION: KEHANCHA, KEHANCHA-MIGORI ROAD</p>
        <p>P.O BOX 110-40413, KEHANCHA</p>
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
          <tr><th>Assay Method</th><td colSpan="3">{report.assayMethod || report.method || ""}</td></tr>
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
          <tr><th>A</th><td>Soil, Core, Rock</td><td>Aqua regia digest, AAS Finish</td><td></td></tr>
          <tr><th>B</th><td>Carbon</td><td>Aqua regia digest, AAS Finish</td><td></td></tr>
          <tr><th>C</th><td>Solution</td><td>AAS Finish</td><td></td></tr>
        </tbody>
      </table>

      <p className="template-disclaimer"><strong>Disclaimer:</strong> {report.disclaimer || report.remarks}</p>

      <footer className="template-signoff">
        <div className="signature-block">
          <span>Technical staff</span>
          {report.technicalStaffSignature
            ? <img src={report.technicalStaffSignature} alt="Technical staff signature" />
            : <div className="signature-space" />}
          <strong>{report.technicalStaff || ""}</strong>
        </div>
        <div className="signature-block">
          <span>Authorizer</span>
          {report.authorizerSignature
            ? <img src={report.authorizerSignature} alt="Authorizer signature" />
            : <div className="signature-space" />}
          <strong>{report.authorizer || report.approvedBy || ""}</strong>
        </div>
        <div className="stamp-block">
          {report.stampImage ? (
            <>
              <img src={report.stampImage} alt="Genesis laboratory stamp" />
              {report.stampDate && <strong>{formatDate(report.stampDate)}</strong>}
            </>
          ) : <div className="stamp-placeholder">UPLOAD<br />STAMP</div>}
        </div>
        <div className="template-qr">
          {qrCode ? <img src={qrCode} alt="QR code for online results" /> : <div className="qr-placeholder" />}
          <strong>SCAN TO VIEW RESULTS</strong>
          <span>{report.reportNumber}</span>
        </div>
      </footer>
    </article>
  );
});

export default ReportDocument;
