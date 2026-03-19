import { useEffect, useState } from "react";
import CompanyForm from "@/components/CompanyForm";
import CompanyList from "@/components/CompanyList";
import AppShell from "@/components/ui/AppShell";
import PageHeader from "@/components/ui/PageHeader";
import {
  getAllCompanies,
  addCompany,
  updateCompany,
  deleteCompany,
} from "../api/companyService";

function CompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingCompany, setEditingCompany] = useState(null);
  
  async function fetchCompanies() {
    try {
      setLoading(true);
      const response = await getAllCompanies();
      setCompanies(response);
      setError("");
    } catch (err) {
      console.error("Failed to fetch companies:", err);
      setError("Failed to load companies. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  }

  async function handleAddCompany(newCompany) {
    try {
      const response = await addCompany(newCompany);
      setCompanies((prev) => [...prev, response]);
      setError("");
    } catch (err) {
      console.error("Failed to add company:", err);
      setError("Failed to add company.");
      throw err;
    }
  }

  async function handleUpdateCompany(companyId, updatedCompany) {
    try {
      const response = await updateCompany(companyId, updatedCompany);

      setCompanies((prev) =>
        prev.map((company) =>
          company.id === companyId ? response : company
        )
      );

      setEditingCompany(null);
      setError("");
    } catch (err) {
      console.error("Failed to update company:", err);
      setError("Failed to update company.");
      throw err;
    }
  }

  function handleEditCompany(company) {
    setEditingCompany(company);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDeleteCompany(companyId) {
  try {
    await deleteCompany(companyId);

    setCompanies((prev) =>
      prev.filter((company) => company.id !== companyId)
    );

    if (editingCompany && editingCompany.id === companyId) {
      setEditingCompany(null);
    }

    setError("");
  } catch (err) {
    console.error("Failed to delete company:", err);
    setError("Failed to delete company.");
  }
}

  function handleCancelEdit() {
    setEditingCompany(null);
  }

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <AppShell>
      <PageHeader
        title="Companies"
        subtitle="Manage companies and store the pay rates that will be used later for work entry calculations."
      />

      {error && (
        <div className="mb-6 rounded-xl border border-red-900 bg-red-950/40 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <CompanyForm
          onAddCompany={handleAddCompany}
          onUpdateCompany={handleUpdateCompany}
          editingCompany={editingCompany}
          onCancelEdit={handleCancelEdit}
        />

        {loading ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 text-sm text-zinc-400 shadow-sm">
            Loading companies...
          </div>
        ) : (
          <CompanyList
            companies={companies}
            onEdit={handleEditCompany}
            onDelete={handleDeleteCompany}
          />
        )}
      </div>
    </AppShell>
  );
}

export default CompaniesPage;