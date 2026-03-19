import api from "@/api/axios";

export async function getAllCompanies() {
  const response = await api.get("/companies");
  return response.data;
}

export async function getCompanyById(id) {
  const response = await api.get(`/companies/${id}`);
  return response.data;
}

export async function addCompany(newCompany) {
    try {
      const response = await api.post("/companies", newCompany);
      return response.data;
    } catch (err) {
      console.error("Failed to add company:", err);
      throw err;
    }
  }