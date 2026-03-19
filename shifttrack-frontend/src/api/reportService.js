import api from "../axios";

export async function getSummary(filters) {
  const params = {
    from: filters.from,
    to: filters.to,
    ...(filters.companyId && { companyId: filters.companyId }),
  };

  const response = await api.get("/reports/summary", { params });
  return response.data;
}