import { useEffect, useState } from "react";
import api from "@/api/axios";
import CompanyForm from "@/components/CompanyForm";
import CompanyList from "@/components/CompanyList";
import AppShell from "@/components/ui/AppShell";
import PageHeader from "@/components/ui/PageHeader";
import { getAllCompanies, addCompany } from "../api/companyService";

function CompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        <CompanyForm onAddCompany={handleAddCompany} />

        {loading ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 text-sm text-zinc-400 shadow-sm">
            Loading companies...
          </div>
        ) : (
          <CompanyList companies={companies} />
        )}
      </div>
    </AppShell>
  );
}

export default CompaniesPage;