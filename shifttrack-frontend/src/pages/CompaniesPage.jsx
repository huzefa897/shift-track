import { useEffect, useState } from "react";
import api from "@/api/axios";
import CompanyForm from "@/components/CompanyForm";
import CompanyList from "@/components/CompanyList";

function CompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchCompanies() {
    try {
      setLoading(true);
      const response = await api.get("/companies");
      setCompanies(response.data);
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
      const response = await api.post("/companies", newCompany);
      setCompanies((prev) => [...prev, response.data]);
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
    <div className="min-h-screen bg-black text-zinc-100">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <p className="mb-2 text-sm uppercase tracking-[0.2em] text-zinc-500">
            ShiftTrack
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">Companies</h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-400">
            Manage companies and store the pay rates that will be used later for
            work entry calculations.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-900 bg-red-950/40 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
          <CompanyForm onAddCompany={handleAddCompany} />

          {loading ? (
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-400">
              Loading companies...
            </div>
          ) : (
            <CompanyList companies={companies} />
          )}
        </div>
      </div>
    </div>
  );
}

export default CompaniesPage;