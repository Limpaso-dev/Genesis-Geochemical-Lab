export const emptyReport = {
  reportNumber: "",
  clientName: "",
  sampleType: "Rock",
  dateReceived: "",
  assayMethod: "Aqua regia digest, AAS Finish",
  technicalStaff: "",
  technicalStaffSignature: "",
  authorizer: "",
  authorizerSignature: "",
  stampImage: "",
  stampDate: new Date().toISOString().slice(0, 10),
  disclaimer: "This result portrays ONLY to the sample brought for analysis to the laboratory. It should NOT be compared to any sample, not even from the same source.",
  results: [{ sampleId: "", au: "", cu: "", unit: "ppm" }],
};

export function createReportNumber() {
  const date = new Date();
  const stamp = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
  return `GEN.LAB-${stamp}-${Math.floor(100 + Math.random() * 900)}`;
}

export function formatDate(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}
