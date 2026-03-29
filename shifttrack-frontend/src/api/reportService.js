import api from "./axios";

export async function getSummary(filters) {
  const params = {
    from: filters.from,
    to: filters.to,
    ...(filters.companyId && { companyId: filters.companyId }),
  };

  const response = await api.get("/reports/summary", { params });
  return response.data;
}

export async function fetchWeeklyIncome(filters) {
  const response = await api.get("/reports/analytics/weekly-income", {
    params: {
      from: filters.from,
      to: filters.to,
      companyId: filters.companyId || undefined,
    },
  });
  console.log("Weekly income response:", response);
  return response.data;
}