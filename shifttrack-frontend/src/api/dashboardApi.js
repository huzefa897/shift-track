import api from "./axios";

export async function fetchCompanies() {
  const response = await api.get("/companies");
  return response.data;
}

export async function fetchFilteredWorkEntries(filters, page = 0, size = 10) {
  const response = await api.get("/work-entries/paginated", {
    params: {
      from: filters.from,
      to: filters.to,
      companyId: filters.companyId || undefined,
      page,
      size,
    },
  });

  return response.data;
}
export async function fetchSummary(filters) {
  const params = {
    from: filters.from,
    to: filters.to,
    ...(filters.companyId && { companyId: filters.companyId }),
  };

  const response = await api.get("/reports/summary", { params });
  return response.data;
}