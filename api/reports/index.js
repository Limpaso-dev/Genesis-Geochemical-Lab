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
      const body = parseBody(request);
      if (body?._action === "delete") {
        const id = String(body.id || "").trim();
        if (!id) return sendJson(response, 400, { error: "Report ID is required." });
        const result = await collection.deleteOne({ id });
        if (!result.deletedCount) return sendJson(response, 404, { error: "Report not found." });
        return sendJson(response, 200, { deleted: true });
      }

      if (body?._action === "update") {
        const id = String(body.id || "").trim();
        if (!id) return sendJson(response, 400, { error: "Report ID is required." });

        const report = cleanReport({ ...body, id });
        const validationError = validateReport(report);
        if (validationError) return sendJson(response, 400, { error: validationError });

        const result = await collection.findOneAndUpdate(
          { id },
          { $set: { ...report, updatedAt: new Date().toISOString() } },
          { returnDocument: "after" },
        );
        if (!result) return sendJson(response, 404, { error: "Report not found." });
        return sendJson(response, 200, { report: publicReport(result) });
      }

      const report = cleanReport(body);
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
