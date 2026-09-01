import { reportsCollection } from "../_lib/mongodb.js";
import {
  applyCors,
  cleanReport,
  handleApiError,
  parseBody,
  publicReport,
  requireAdmin,
  sendJson,
  validateReport,
} from "../_lib/http.js";

export default async function handler(request, response) {
  if (request.method === "OPTIONS") {
    applyCors(response);
    return response.status(204).end();
  }

  if (!requireAdmin(request, response)) return;

  try {
    const collection = await reportsCollection();

    if (request.method === "GET") {
      const reports = await collection.find({})
        .sort({ updatedAt: -1 })
        .limit(250)
        .toArray();
      return sendJson(response, 200, { reports: reports.map(publicReport) });
    }

    if (request.method === "POST") {
      const report = cleanReport(parseBody(request));
      const validationError = validateReport(report);
      if (validationError) return sendJson(response, 400, { error: validationError });

      const now = new Date().toISOString();
      const document = { ...report, createdAt: now, updatedAt: now };
      await collection.insertOne(document);
      return sendJson(response, 201, { report: publicReport(document) });
    }

    response.setHeader("Allow", "GET, POST");
    return sendJson(response, 405, { error: "Method not allowed." });
  } catch (error) {
    return handleApiError(response, error);
  }
}
