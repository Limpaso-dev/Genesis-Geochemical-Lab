import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import QRCode from "qrcode";
import ReportDocument from "../components/ReportDocument";
import {
  createReportNumber,
  emptyReport,
} from "../utils/reportStore";
import {
  clearAdminKey,
  createReport,
  getStoredAdminKey,
  listReports,
  storeAdminKey,
  updateReport,
} from "../utils/reportApi";
import logo from "../assets/genesis-logo.jpeg";

async function prepareImage(file, maxWidth = 700, maxHeight = 300) {
  if (!file?.type.startsWith("image/")) throw new Error("Please select a PNG, JPG, or WebP image.");
  if (file.size > 5_000_000) throw new Error("The image must be smaller than 5 MB.");

  const image = new Image();
  const source = URL.createObjectURL(file);

  try {
    await new Promise((resolve, reject) => {
      image.onload = resolve;
      image.onerror = () => reject(new Error("The selected image could not be read."));
      image.src = source;
    });

    const scale = Math.min(1, maxWidth / image.width, maxHeight / image.height);
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.width * scale));
    canvas.height = Math.max(1, Math.round(image.height * scale));
    canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/webp", 0.82);
  } finally {
    URL.revokeObjectURL(source);
  }
}

function newReport() {
  return {
    ...emptyReport,
    id: crypto.randomUUID(),
    reportNumber: createReportNumber(),
    results: emptyReport.results.map((row) => ({ ...row })),
  };
}

function normalizeReport(report) {
  return {
    ...emptyReport,
    ...report,
    assayMethod: report.assayMethod || report.method || emptyReport.assayMethod,
    disclaimer: report.disclaimer || report.remarks || emptyReport.disclaimer,
    authorizer: report.authorizer || report.approvedBy || "",
    results: report.results?.length ? report.results : emptyReport.results.map((row) => ({ ...row })),
  };
}

export default function AdminReports() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const editId = searchParams.get("edit");
  const [report, setReport] = useState(newReport);
  const [reports, setReports] = useState([]);
  const [qrCode, setQrCode] = useState("");
  const [saved, setSaved] = useState(false);
  const [adminKey, setAdminKey] = useState(getStoredAdminKey);
  const [keyInput, setKeyInput] = useState(getStoredAdminKey);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(Boolean(getStoredAdminKey()));
  const [error, setError] = useState("");

  const publicUrl = useMemo(
    () => `${window.location.origin}/results/${report.id}`,
    [report.id],
  );

  useEffect(() => {
    if (!adminKey) return;

    let cancelled = false;
    setLoading(true);
    setError("");

    listReports(adminKey)
      .then((items) => {
        if (cancelled) return;
        const normalized = items.map(normalizeReport);
        setReports(normalized);
        const selected = editId && normalized.find((item) => item.id === editId);
        if (selected) setReport(selected);
        setAuthenticated(true);
      })
      .catch((loadError) => {
        if (cancelled) return;
        clearAdminKey();
        setAdminKey("");
        setAuthenticated(false);
        setError(loadError.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [adminKey, editId]);

  useEffect(() => {
    QRCode.toDataURL(publicUrl, {
      width: 180,
      margin: 1,
      color: { dark: "#17324d", light: "#ffffff" },
      errorCorrectionLevel: "M",
    }).then(setQrCode);
  }, [publicUrl]);

  function updateField(event) {
    const { name, value } = event.target;
    setReport((current) => ({ ...current, [name]: value }));
    setSaved(false);
  }

  function updateResult(index, field, value) {
    setReport((current) => ({
      ...current,
      results: current.results.map((row, rowIndex) => (
        rowIndex === index ? { ...row, [field]: value } : row
      )),
    }));
    setSaved(false);
  }

  async function updateImage(field, file, maxWidth, maxHeight) {
    if (!file) return;
    setError("");
    try {
      const dataUrl = await prepareImage(file, maxWidth, maxHeight);
      setReport((current) => ({ ...current, [field]: dataUrl }));
      setSaved(false);
    } catch (imageError) {
      setError(imageError.message);
    }
  }

  function removeImage(field) {
    setReport((current) => ({ ...current, [field]: "" }));
    setSaved(false);
  }

  function addRow() {
    setReport((current) => ({
      ...current,
      results: [...current.results, { sampleId: "", au: "", cu: "", unit: "ppm" }],
    }));
  }

  function removeRow(index) {
    if (report.results.length === 1) return;
    setReport((current) => ({
      ...current,
      results: current.results.filter((_, rowIndex) => rowIndex !== index),
    }));
  }

  async function saveCurrentReport() {
    setLoading(true);
    setError("");
    try {
      const exists = reports.some((item) => item.id === report.id);
      const completed = exists
        ? await updateReport(report, adminKey)
        : await createReport(report, adminKey);
      const normalized = normalizeReport(completed);
      setReport(normalized);
      setReports((current) => exists
        ? current.map((item) => (item.id === normalized.id ? normalized : item))
        : [normalized, ...current]);
      setSaved(true);
      navigate(`/admin/reports?edit=${normalized.id}`, { replace: true });
      return normalized;
    } catch (saveError) {
      setError(saveError.message);
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function printReport() {
    const completed = await saveCurrentReport();
    if (completed) window.setTimeout(() => window.print(), 100);
  }

  function startNew() {
    setReport(newReport());
    setSaved(false);
    navigate("/admin/reports", { replace: true });
  }

  function openReport(item) {
    setReport(normalizeReport(item));
    setSaved(false);
    navigate(`/admin/reports?edit=${item.id}`);
  }

  function handleLogin(event) {
    event.preventDefault();
    const value = keyInput.trim();
    if (!value) return;
    storeAdminKey(value);
    setAdminKey(value);
  }

  function handleLogout() {
    clearAdminKey();
    setAdminKey("");
    setKeyInput("");
    setAuthenticated(false);
    setReports([]);
    setError("");
  }

  if (!authenticated) {
    return (
      <div className="admin-shell">
        <header className="admin-topbar">
          <Link to="/" className="admin-brand"><img src={logo} alt="" /><span>Genesis Lab</span></Link>
          <div><Link to="/">View website</Link></div>
        </header>
        <main className="admin-login-page">
          <form className="admin-login-card" onSubmit={handleLogin}>
            <img src={logo} alt="Genesis Geochemical Laboratory" />
            <span>SECURE ADMIN</span>
            <h1>Laboratory report access</h1>
            <p>Enter the admin access key configured for this deployment.</p>
            <label>Admin access key
              <input type="password" value={keyInput} onChange={(event) => setKeyInput(event.target.value)} autoFocus />
            </label>
            {error && <p className="admin-error">{error}</p>}
            <button disabled={loading}>{loading ? "Connecting…" : "Open report editor"}</button>
          </form>
        </main>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <header className="admin-topbar">
        <Link to="/" className="admin-brand">
          <img src={logo} alt="" />
          <span>Genesis Lab</span>
        </Link>
        <div>
          <Link to="/verify">Customer verification</Link>
          <Link to="/">View website</Link>
          <button className="logout-button" onClick={handleLogout}>Log out</button>
        </div>
      </header>

      <main className="admin-main">
        <aside className="admin-sidebar">
          <div className="admin-sidebar-heading">
            <div><span>LAB REPORTS</span><h2>Recent reports</h2></div>
            <button onClick={startNew} title="Create new report">+</button>
          </div>
          <div className="report-list">
            {reports.length === 0 && <p>No saved reports yet.</p>}
            {reports.map((item) => (
              <button
                key={item.id}
                className={item.id === report.id ? "active" : ""}
                onClick={() => openReport(item)}
              >
                <strong>{item.clientName || "Unnamed client"}</strong>
                <span>{item.reportNumber}</span>
              </button>
            ))}
          </div>
        </aside>

        <section className="admin-workspace">
          <div className="mobile-report-nav">
            <label>
              Saved reports
              <select
                value={reports.some((item) => item.id === report.id) ? report.id : ""}
                onChange={(event) => {
                  const selected = reports.find((item) => item.id === event.target.value);
                  if (selected) openReport(selected);
                }}
              >
                <option value="">New unsaved report</option>
                {reports.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.reportNumber} — {item.clientName || "Unnamed client"}
                  </option>
                ))}
              </select>
            </label>
            <button type="button" onClick={startNew}>+ New report</button>
          </div>

          <div className="admin-page-title">
            <div>
              <span>REPORT EDITOR</span>
              <h1>Certificate of analysis</h1>
              <p>Enter the laboratory results, save, then print the final certificate.</p>
            </div>
            <div className="admin-actions">
              {saved && <span className="saved-label">Saved</span>}
              <button className="secondary-button" onClick={saveCurrentReport} disabled={loading}>{loading ? "Saving…" : "Save report"}</button>
              <button className="primary-button" onClick={printReport} disabled={loading}>Print / Save PDF</button>
            </div>
          </div>
          {error && <div className="admin-error-banner">{error}</div>}

          <div className="editor-layout">
            <form className="report-form" onSubmit={(event) => event.preventDefault()}>
              <div className="form-card">
                <h3>Report details</h3>
                <div className="form-grid">
                  <label>Report number<input name="reportNumber" value={report.reportNumber} onChange={updateField} /></label>
                  <label>Client name<input name="clientName" value={report.clientName} onChange={updateField} placeholder="Client or company" /></label>
                  <label>Sample type<input name="sampleType" value={report.sampleType} onChange={updateField} /></label>
                  <label>Date received<input type="date" name="dateReceived" value={report.dateReceived} onChange={updateField} /></label>
                  <label>Technical staff<input name="technicalStaff" value={report.technicalStaff} onChange={updateField} placeholder="Laboratory technician" /></label>
                  <label>Authorizer<input name="authorizer" value={report.authorizer} onChange={updateField} placeholder="Report authorizer" /></label>
                </div>
              </div>

              <div className="form-card">
                <div className="card-heading">
                  <h3>Sample results</h3>
                  <button type="button" onClick={addRow}>+ Add sample</button>
                </div>
                <div className="result-editor">
                  <div className="result-editor-head"><span>Sample ID</span><span>Au</span><span>Cu</span><span>Unit</span><span /></div>
                  {report.results.map((row, index) => (
                    <div className="result-editor-row" key={index}>
                      <input value={row.sampleId} onChange={(e) => updateResult(index, "sampleId", e.target.value)} placeholder="e.g. GGL-001" />
                      <input value={row.au} onChange={(e) => updateResult(index, "au", e.target.value)} inputMode="decimal" placeholder="0.00" />
                      <input value={row.cu} onChange={(e) => updateResult(index, "cu", e.target.value)} inputMode="decimal" placeholder="0.00" />
                      <span className="fixed-unit">ppm</span>
                      <button type="button" onClick={() => removeRow(index)} aria-label="Remove row">×</button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-card">
                <h3>Method and disclaimer</h3>
                <label>Assay method<textarea name="assayMethod" value={report.assayMethod} onChange={updateField} /></label>
                <label>Disclaimer<textarea name="disclaimer" value={report.disclaimer} onChange={updateField} /></label>
              </div>

              <div className="form-card">
                <h3>Signatures and laboratory stamp</h3>
                <p className="upload-help">Use cropped PNG, JPG, or WebP images. Transparent PNG files give the cleanest result.</p>
                <div className="upload-grid">
                  <ImageUpload
                    label="Technical staff signature"
                    value={report.technicalStaffSignature}
                    onChange={(file) => updateImage("technicalStaffSignature", file, 700, 250)}
                    onRemove={() => removeImage("technicalStaffSignature")}
                  />
                  <ImageUpload
                    label="Authorizer signature"
                    value={report.authorizerSignature}
                    onChange={(file) => updateImage("authorizerSignature", file, 700, 250)}
                    onRemove={() => removeImage("authorizerSignature")}
                  />
                  <ImageUpload
                    label="Rubber stamp"
                    value={report.stampImage}
                    onChange={(file) => updateImage("stampImage", file, 500, 500)}
                    onRemove={() => removeImage("stampImage")}
                  />
                  <label>Stamp date
                    <input type="date" name="stampDate" value={report.stampDate} onChange={updateField} />
                  </label>
                </div>
              </div>
            </form>

            <div className="report-preview-wrap">
              <div className="preview-label"><span>LIVE PREVIEW</span><small>A4 certificate</small></div>
              <ReportDocument report={report} qrCode={qrCode} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function ImageUpload({ label, value, onChange, onRemove }) {
  return (
    <div className="image-upload">
      <span>{label}</span>
      {value && <img src={value} alt={`${label} preview`} />}
      <div>
        <label className="upload-button">
          {value ? "Replace image" : "Choose image"}
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={(event) => {
              onChange(event.target.files?.[0]);
              event.target.value = "";
            }}
          />
        </label>
        {value && <button type="button" onClick={onRemove}>Remove</button>}
      </div>
    </div>
  );
}
