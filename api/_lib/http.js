import { timingSafeEqual } from "node:crypto";

export function sendJson(response, status, body) {
  response.status(status).setHeader("Content-Type", "application/json");
  response.setHeader("Cache-Control", "no-store");
  response.end(JSON.stringify(body));
}

export function isAdmin(request) {
  const expected = process.env.ADMIN_API_KEY;
  const authorization = request.headers.authorization || "";
  const supplied = authorization.startsWith("Bearer ") ? authorization.slice(7) : "";

  if (!expected || !supplied) return false;

  const expectedBuffer = Buffer.from(expected);
  const suppliedBuffer = Buffer.from(supplied);
  return expectedBuffer.length === suppliedBuffer.length
    && timingSafeEqual(expectedBuffer, suppliedBuffer);
}

export function requireAdmin(request, response) {
  if (isAdmin(request)) return true;
  sendJson(response, 401, { error: "Invalid or missing admin access key." });
  return false;
}

export function parseBody(request) {
  if (typeof request.body === "string") return JSON.parse(request.body);
  return request.body || {};
}

function cleanImage(value) {
  const image = String(value || "");
  if (!image) return "";
  if (!/^data:image\/(png|jpeg|webp);base64,/.test(image)) return "";
  return image.slice(0, 2_000_000);
}

export function cleanReport(input) {
  const results = Array.isArray(input.results)
    ? input.results.map((row) => ({
      sampleId: String(row.sampleId || "").trim(),
      au: String(row.au || "").trim(),
      cu: String(row.cu || "").trim(),
      unit: "ppm",
    }))
    : [];

  return {
    id: String(input.id || "").trim(),
    reportNumber: String(input.reportNumber || "").trim(),
    clientName: String(input.clientName || "").trim(),
    sampleType: String(input.sampleType || "").trim(),
    dateReceived: String(input.dateReceived || "").trim(),
    assayMethod: String(input.assayMethod || "").trim(),
    technicalStaff: String(input.technicalStaff || "").trim(),
    technicalStaffSignature: cleanImage(input.technicalStaffSignature),
    authorizer: String(input.authorizer || "").trim(),
    authorizerSignature: cleanImage(input.authorizerSignature),
    stampImage: cleanImage(input.stampImage),
    stampDate: String(input.stampDate || "").trim(),
    disclaimer: String(input.disclaimer || "").trim(),
    results,
  };
}

export function validateReport(report) {
  if (!report.id) return "Report ID is required.";
  if (!report.reportNumber) return "Job number is required.";
  if (!report.clientName) return "Client name is required.";
  if (!report.results.length) return "At least one sample result is required.";
  if (report.results.length > 200) return "A report cannot contain more than 200 samples.";
  return null;
}

export function publicReport(document) {
  if (!document) return null;
  const { _id, ...report } = document;
  return report;
}

export function handleApiError(response, error) {
  console.error(error);
  if (error?.code === 11000) {
    return sendJson(response, 409, { error: "That report ID or job number already exists." });
  }
  return sendJson(response, 500, { error: "The report service is temporarily unavailable." });
}
