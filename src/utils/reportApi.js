const ADMIN_KEY_STORAGE = "genesis-lab-admin-key";

async function request(path, options = {}) {
  const response = await fetch(path, options);
  const contentType = response.headers.get("content-type") || "";
  const rawText = await response.text();
  let data = null;

  if (rawText) {
    try {
      data = JSON.parse(rawText);
    } catch {
      data = null;
    }
  }

  if (!response.ok) {
    throw new Error(data?.error || `Request failed (${response.status}).`);
  }

  if (!contentType.includes("application/json") && rawText) {
    throw new Error(
      "The report API is not running. Restart the development server with npm run dev.",
    );
  }

  return data || {};
}

function authHeaders(adminKey) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${adminKey}`,
  };
}

export function getStoredAdminKey() {
  return sessionStorage.getItem(ADMIN_KEY_STORAGE) || "";
}

export function storeAdminKey(value) {
  sessionStorage.setItem(ADMIN_KEY_STORAGE, value);
}

export function clearAdminKey() {
  sessionStorage.removeItem(ADMIN_KEY_STORAGE);
}

export async function listReports(adminKey) {
  const data = await request("/api/reports", {
    headers: authHeaders(adminKey),
  });
  if (!Array.isArray(data.reports)) {
    throw new Error("The report API returned an invalid report list.");
  }
  return data.reports;
}

export async function createReport(report, adminKey) {
  const data = await request("/api/reports", {
    method: "POST",
    headers: authHeaders(adminKey),
    body: JSON.stringify(report),
  });
  return data.report;
}

export async function updateReport(report, adminKey) {
  const data = await request(`/api/reports/${encodeURIComponent(report.id)}`, {
    method: "PUT",
    headers: authHeaders(adminKey),
    body: JSON.stringify(report),
  });
  return data.report;
}

export async function deleteReport(id, adminKey) {
  await request(`/api/reports/${encodeURIComponent(id)}`, {
    method: "POST",
    headers: authHeaders(adminKey),
    body: JSON.stringify({ _action: "delete" }),
  });
}

export async function fetchPublicReport(id) {
  const data = await request(`/api/reports/${encodeURIComponent(id)}`);
  return data.report;
}
