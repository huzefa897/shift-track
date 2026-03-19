import api from "../axios";

export async function getFilteredWorkEntries(filters) {
  const params = {
    from: filters.from,
    to: filters.to,
    ...(filters.companyId && { companyId: filters.companyId }),
  };

  const response = await api.get("/work-entries/filter", { params });
  return response.data;
}