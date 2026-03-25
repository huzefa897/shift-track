import api from "./axios";

export async function fetchCompanies() {
  const response = await api.get("/companies");
  return response.data;
}

export async function fetchFilteredWorkEntries(filters) {
  const params = {
    from: filters.from,
    to: filters.to,
    ...(filters.companyId && { companyId: filters.companyId }),
  };

  const response = await api.get("/work-entries/filter", { params });
  return response.data;
}

export async function fetchSummary(filters) {
  const params = {
    from: filters.from,
    to: filters.to,
    ...(filters.companyId && { companyId: filters.companyId }),
  };

  const response = await api.get("/reports/summary", { params });
  console.log("Summary response:", response.data);
  return response.data;
}