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

  const lookup = decodeURIComponent(request.query.id || "").trim();
  if (!lookup) return sendJson(response, 400, { error: "Report ID is required." });

  try {
    const collection = await reportsCollection();

    if (request.method === "GET") {
      const document = await collection.findOne({
        $or: [{ id: lookup }, { reportNumber: lookup }],
      });
      if (!document) return sendJson(response, 404, { error: "Report not found." });
      return sendJson(response, 200, { report: publicReport(document) });
    }

    if (request.method === "POST" || request.method === "PUT") {
      if (!requireAdmin(request, response)) return;
      const body = parseBody(request);

      if (request.method === "POST" && body?._action === "delete") {
        const result = await collection.deleteOne({ id: lookup });
        if (!result.deletedCount) return sendJson(response, 404, { error: "Report not found." });
        return sendJson(response, 200, { deleted: true });
      }

      const report = cleanReport({ ...body, id: lookup });
      const validationError = validateReport(report);
      if (validationError) return sendJson(response, 400, { error: validationError });

      const updatedAt = new Date().toISOString();
      const result = await collection.findOneAndUpdate(
        { id: lookup },
        { $set: { ...report, updatedAt } },
        { returnDocument: "after" },
      );
      if (!result) return sendJson(response, 404, { error: "Report not found." });
      return sendJson(response, 200, { report: publicReport(result) });
    }

    if (request.method === "DELETE") {
      if (!requireAdmin(request, response)) return;
      const result = await collection.deleteOne({ id: lookup });
      if (!result.deletedCount) return sendJson(response, 404, { error: "Report not found." });
      return sendJson(response, 200, { deleted: true });
    }

    response.setHeader("Allow", "GET, POST, PUT, DELETE");
    return sendJson(response, 405, { error: "Method not allowed." });
  } catch (error) {
    return handleApiError(response, error);
  }
}
