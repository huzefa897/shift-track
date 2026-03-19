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

  export async function updateCompany(id, companyData) {
    try {
      const response = await api.put(`/companies/${id}`, companyData);
      return response.data;
    } catch (err) {
      console.error("Failed to update company:", err);
      throw err;
    }
  }

  export async function deleteCompany(id) {
    try {
      const response = await api.delete(`/companies/${id}`);
      return response.data;
    } catch (err) {
      console.error("Failed to delete company:", err);
      throw err;
    }
  }