import dns from "node:dns";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

function localReportApi() {
  return {
    name: "genesis-local-report-api",
    configureServer(server) {
      const env = loadEnv("development", process.cwd(), "");
      process.env.MONGODB_URI = env.MONGODB_URI;
      process.env.MONGODB_DATABASE = env.MONGODB_DATABASE;
      process.env.ADMIN_API_KEY = env.ADMIN_API_KEY;

      // Some Windows/network combinations reject Node's default Atlas SRV lookup.
      dns.setServers(["8.8.8.8", "1.1.1.1"]);

      server.middlewares.use(async (request, response, next) => {
        const url = new URL(request.url, "http://localhost");
        if (!url.pathname.startsWith("/api/reports")) return next();

        try {
          response.status = (statusCode) => {
            response.statusCode = statusCode;
            return response;
          };

          request.query = {};
          const match = url.pathname.match(/^\/api\/reports\/([^/]+)$/);
          if (match) request.query.id = match[1];

          if (request.method === "POST" || request.method === "PUT") {
            const chunks = [];
            for await (const chunk of request) chunks.push(chunk);
            const rawBody = Buffer.concat(chunks).toString("utf8");
            request.body = rawBody ? JSON.parse(rawBody) : {};
          }

          if (url.pathname === "/api/reports") {
            const { default: handler } = await import("./api/reports/index.js");
            return handler(request, response);
          }

          if (match) {
            const { default: handler } = await import("./api/reports/[id].js");
            return handler(request, response);
          }

          response.statusCode = 404;
          response.end(JSON.stringify({ error: "API route not found." }));
        } catch (error) {
          console.error(error);
          if (!response.headersSent) {
            response.statusCode = 500;
            response.setHeader("Content-Type", "application/json");
          }
          response.end(JSON.stringify({ error: "Local API request failed." }));
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), localReportApi()],
});
